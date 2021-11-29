import {
  assetAmount,
  assetFromString,
  assetToBase,
  baseAmount,
} from "@xchainjs/xchain-util";
import { ethers } from "ethers";
import { toast } from "react-toastify";

import { INBOUND_ADDRESSES, SERVER_URL_MAIN } from "../../Routes/serverRoutes";
import WalletConnectProvider from "@walletconnect/web3-provider";
// import Web3Modal from "web3modal";
import { BehaviorSubject } from "rxjs";
import { erc20ABI } from "../WalletConnectService/erc20.abi";
import { EthUtilsService } from "../KeyStoreSwappingAsset/services/eth-utils.service";

import { ETH_DECIMAL, getTokenAddress } from "@xchainjs/xchain-ethereum";
import { TCAbi } from "../WalletConnectService/thorchain.abi";

import {
  LOGIN,
  SWAPPING_REQUEST,
  SWAPPING_SUCCESS,
} from "../../Redux/actions/types";
import { WalletConnectService } from "../WalletConnectService/walletConnect-service";
import Web3 from "web3";
import { CRYPTOCOMPARE_KEY } from "../environment";
import axios from "axios";

const alertToast = (error, message) => {
  if (!error) {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

window.ethereum = window.ethereum || {};
const walletConnectService = new WalletConnectService();

const web3 = new Web3(window.ethereum);
let signer;
let account;
export class MetamaskService {
  _provider = new BehaviorSubject(null);
  provider$ = this._provider.asObservable();

  _metaMaskNetwork = new BehaviorSubject(null);
  metaMaskNetwork$ = this._metaMaskNetwork.asObservable();

  constructor(userService) {
    if (window.ethereum && window.ethereum.on) {
      window.ethereum.on("accountsChanged", (a) =>
        this.handleAccountsChanged(a, this._provider)
      );

      window.ethereum.on("chainChanged", (_chainId) => {
        switch (+_chainId) {
          case 1:
            // window.location.href =
            //   "https://defispot-internaldeploy.netlify.app/";
            // this._metaMaskNetwork.next("mainnet");

            window.location.reload();
            break;

          case 3:
            // window.location.href =
            //   "https://defispot-internaldeploy.netlify.app/";
            // this._metaMaskNetwork.next("testnet");
            window.location.reload();
            break;

          default:
            // this._metaMaskNetwork.next(null);
            // window.location.reload();
            break;
        }
      });
      this.init();
    }
  }

  async handleAccountsChanged(accounts, provider) {
    const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
    if (provider && accounts.length > 0) {
      provider.next(ethProvider);
      this.setMetaMaskNetwork(ethProvider);
    } else {
      // this.userService.setUser(null);
    }
  }

  async callDeposit({
    ethInboundAddress,
    asset,
    input,
    memo,
    userAddress,
    signer,
  }) {
    console.log("address hey=======", memo);
    const gasPrice = baseAmount(
      ethers.utils.parseUnits(ethInboundAddress.gas_rate, "gwei").toString(),
      ETH_DECIMAL
    )
      .amount()
      .toFixed(0);

    let hash;
    let decimal;
    const vaultContract = new ethers.Contract(ethInboundAddress.router, TCAbi);

    if (asset.symbol === "ETH") {
      decimal = ETH_DECIMAL;
    } else {
      const tokenAddress = getTokenAddress(asset);
      const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);
      decimal = await tokenContract.decimals();
    }

    let amount = assetToBase(assetAmount(input, decimal)).amount();
    let resp;

    if (asset.ticker === "ETH") {
      const unsignedTx = await vaultContract.populateTransaction.deposit(
        ethInboundAddress.address,
        "0x0000000000000000000000000000000000000000",
        amount.toFixed(),
        memo,
        { from: userAddress, value: amount.toFixed(), gasPrice }
      );
      resp = await signer.sendTransaction(unsignedTx);
    } else {
      const assetAddress = asset.symbol.slice(asset.ticker.length + 1);
      const strip0x = assetAddress.substr(2);
      const checkSummedAddress = ethers.utils.getAddress(strip0x);
      const params = [
        ethInboundAddress.address, // vault
        checkSummedAddress, // asset
        amount.toFixed(), // amount
        memo,
      ];
      const unsignedTx = await vaultContract.populateTransaction.deposit(
        ...params,
        { from: userAddress, gasPrice }
      );
      resp = await signer.sendTransaction(unsignedTx);
      console.log("resp is: ", resp);
    }

    // prettier-ignore
    hash = typeof (resp) === 'string' ? resp : resp?.hash || '';
    return hash;
  }

  async init() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const lastLoginType = localStorage.getItem("lastLoginType");
    if (provider && lastLoginType === "metamask") {
      this.setProvider(provider);
      this.setMetaMaskNetwork(provider);
    } else {
      this.setProvider(null);
    }
  }
  // provider = window.ethereum;
  setProvider(provider) {
    console.log(provider);
    this._provider.next(provider);
  }

  async setMetaMaskNetwork(provider) {
    if (!provider) {
      this._metaMaskNetwork.next(null);
      return;
    }

    const network = await provider.getNetwork();

    if (network.chainId === 3) {
      this._metaMaskNetwork.next("testnet");
    } else if (network.chainId === 1) {
      this._metaMaskNetwork.next("mainnet");
    } else {
      this._metaMaskNetwork.next(null);
    }
  }

  async connect(dispatch, setMainModel, alertToast) {
    if (localStorage.walletconnect) {
      walletConnectService.disconnect();
      // localStorage.clear();
    } else {
      const enable = await window.ethereum.enable();
      if (enable instanceof Array && enable.length > 0) {
        setMainModel(false);
        let overallBalance_BTC;
        let overallBalance_USD;

        this.handleAccountsChanged(enable, this._provider);
        let acc = await web3.eth.getAccounts();
        console.log("acco====>>>", acc);

        let bal = await web3.eth.getBalance(acc[0]);
        const etherValue = Web3.utils.fromWei(bal, "ether");
        console.log("bal====>>>", etherValue);

        let network = await web3.eth.net.getId();
        console.log("network", network);
        if (network === 3 || network === 1) {
          let apiDataBTC = await axios.get(
            `https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=ETH&api_key=${CRYPTOCOMPARE_KEY}`
          );
          let apiDataUSD = await axios.get(
            `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=ETH&api_key=${CRYPTOCOMPARE_KEY}`
          );
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          account = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          console.log("accounts=========>>>", account);
          signer = provider.getSigner();
          console.log("signer====>>", signer);

          overallBalance_BTC = Number(etherValue) / Number(apiDataBTC.data.ETH);
          overallBalance_USD = Number(etherValue) / Number(apiDataUSD.data.ETH);
          let assetBalance = [];

          let asset = { chain: "ETH", symbol: "ETH", ticker: "ETH" };
          let amount = {
            type: "BASE",
            decimal: 0,
            amount: () => {
              return {
                c: [etherValue, 1],
              };
            },
          };
          assetBalance.push({
            asset: asset,
            amount: amount,
            balanceUSD: overallBalance_USD,
            marketPriceUSD: 1 / apiDataUSD.data.ETH,
          });

          alertToast(false, "MetaMask connected!");

          dispatch({
            type: LOGIN,
            payload: {
              walletType: "METAMASK",
              assetBalance: assetBalance,
              overallBalance_BTC: overallBalance_BTC,
              overallBalance_USD: overallBalance_USD,
            },
          });
        }
        // console.log("<><><>><><><>><><><><|||||||| ", enable);

        return enable;
      } else {
        alertToast(true, "Please Select Correct Network!!");
        return;
      }
    }
  }
  async requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  //swapping

  async swapping(
    dispatch,
    fromAsset,
    toAsset,
    amount,
    decimal,
    midgardPool,
    setYayModal,
    setConfirmModal,
    setTransactionHash,
    setStatusLink,
    setLoading
  ) {
    dispatch({ type: SWAPPING_REQUEST });
    let inboundApi = await axios.get(INBOUND_ADDRESSES);

    inboundApi = inboundApi.data;
    let ethInboundAddress = inboundApi.find(
      (data) => data.chain === fromAsset?.blockchain
    );
    if (toAsset?.blockchain === "ETH") {
      try {
        const Memo = `=:${toAsset?.rawData}:${account[0]}`;
        console.log("Memo=====>>", Memo);
        const send_amount = Number(amount) * Number(Math.pow(10, 0));
        console.log("in=====>>", ethInboundAddress);

        let response = await this.callDeposit({
          ethInboundAddress: ethInboundAddress,
          asset: assetFromString(fromAsset?.rawData),
          input: Number(send_amount),
          memo: Memo,
          userAddress: account[0],
          signer: signer,
        });

        const etherScan = `https://ropsten.etherscan.io/tx/${response}`;
        setStatusLink(etherScan);
        setTransactionHash(response);
        setLoading(false);
        setConfirmModal(false);
        setYayModal(true);
        const data = {
          coin: toAsset?.asset,
          amount: send_amount,
          address: account[0],
          transactionId: response,
          date: new Date().toString(),
          client: account[0],
        };
        // let apiData = axios.post(`${SERVER_URL_MAIN}`);
        dispatch({
          type: SWAPPING_SUCCESS,
          payload: {
            transactionHash: response,
            transactionHistoryModal: true,
          },
        });
      } catch (error) {
        console.log(error);
        console.log("error", error);
        alertToast(true, error?.message || error);
        setLoading(false);
      }
    } else {
      alertToast(true, "Please Select To Address of ETH");
    }
  }
}
