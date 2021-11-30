import {
  assetAmount,
  assetFromString,
  assetToBase,
  baseAmount,
} from "@xchainjs/xchain-util";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
// import Web3Modal from "web3modal";
import { BehaviorSubject } from "rxjs";
import { erc20ABI } from "./erc20.abi";

import { toast } from "react-toastify";

import { ETH_DECIMAL, getTokenAddress } from "@xchainjs/xchain-ethereum";
import { TCAbi } from "./thorchain.abi";

import {
  LOGIN,
  SWAPPING_REQUEST,
  SWAPPING_SUCCESS,
} from "../../Redux/actions/types";
import Web3 from "web3";
import { CRYPTOCOMPARE_KEY } from "../environment";
import axios from "axios";
import { ETHERSCAN_URL, INBOUND_ADDRESSES } from "../../Routes/serverRoutes";

const walletConnectprovider = new WalletConnectProvider({
  infuraId: "ece2a3079cb54d0883716a41e515eb44",

  // rpc: {
  //   1: "https://mainnet.infura.io/v3/9573d5cdaf724c6c9a8dff83c3278d63",
  //   3: "https://ropsten.infura.io/v3/9573d5cdaf724c6c9a8dff83c3278d63",
  // }, // ...},});
});

let web3;
let balance;
let acc;
let signer;
let provider;

// walletConnectprovider = walletConnectprovider || {};
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
export class WalletConnectService {
  _provider = new BehaviorSubject(null);
  provider$ = this._provider.asObservable();

  _metaMaskNetwork = new BehaviorSubject(null);
  metaMaskNetwork$ = this._metaMaskNetwork.asObservable();

  constructor(userService) {
    if (walletConnectprovider && walletConnectprovider) {
      walletConnectprovider.on("accountsChanged", (a) =>
        this.handleAccountsChanged(a, this._provider)
      );

      // provider.on('chainChanged', (_chainId) => {
      //     switch (+_chainId) {
      //         case 1:
      //             window.location.href = 'https://app.asgard.exchange';
      //             this._metaMaskNetwork.next('mainnet');
      //             break;

      //         case 3:
      //             window.location.href = 'https://testnet.asgard.exchange';
      //             this._metaMaskNetwork.next('testnet');
      //             break;

      //         default:
      //             this._metaMaskNetwork.next(null);
      //             window.location.reload();
      //             break;
      //     }
      // });
      this.init();
    }
  }

  async handleAccountsChanged(accounts, provider) {
    const ethProvider = new ethers.providers.Web3Provider(
      walletConnectprovider
    );
    if (provider && accounts.length > 0) {
      provider.next(ethProvider);
      this.setMetaMaskNetwork(ethProvider);
    } else {
      this.userService.setUser(null);
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
    const provider = new ethers.providers.Web3Provider(walletConnectprovider);
    const lastLoginType = localStorage.getItem("lastLoginType");
    if (provider && lastLoginType === "metamask") {
      this.setProvider(provider);
      this.setMetaMaskNetwork(provider);
    } else {
      this.setProvider(null);
    }
  }

  setProvider(provider) {
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
    try {
      web3 = new Web3(walletConnectprovider);

      const enable = await walletConnectprovider.enable();
      // let signer = this.provider$.getSigner();
      // console.log("signer======", signer);
      provider = new ethers.providers.Web3Provider(walletConnectprovider);

      let network = await provider.getNetwork();
      console.log("heyNetwork========", network);
      if (Number(network.chainId) === 1 || Number(network.chainId) === 3) {
        let assetBalance = [];

        let overallBalance_BTC, overallBalance_USD;

        if (enable instanceof Array && enable.length > 0) {
          signer = await provider.getSigner();
          console.log("signer=======", signer);
          acc = await signer.getAddress();
          console.log("acc=======", acc);
          balance = await signer.getBalance();
          const etherValue = ethers.utils.formatEther(balance);

          console.log("balance=========", etherValue);

          let apiDataBTC = await axios.get(
            `https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=ETH&api_key=${CRYPTOCOMPARE_KEY}`
          );
          let apiDataUSD = await axios.get(
            `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=ETH&api_key=${CRYPTOCOMPARE_KEY}`
          );

          overallBalance_BTC = Number(etherValue) / Number(apiDataBTC.data.ETH);
          overallBalance_USD = Number(etherValue) / Number(apiDataUSD.data.ETH);

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
          dispatch({
            type: LOGIN,
            payload: {
              walletType: "WALLETCONNECT",
              assetBalance: assetBalance,
              overallBalance_BTC: overallBalance_BTC,
              overallBalance_USD: overallBalance_USD,
              walletAddress: acc[0],
            },
          });

          setMainModel(false);
          this.handleAccountsChanged(enable, this._provider);
          alertToast(false, "Wallet connected!");
          return enable;
        }
      } else {
        alertToast(true, "Please Select Correct Network");
        localStorage.removeItem("walletconnect");
        setTimeout(() => {
          window.location.reload();
        }, 2000);

        return;
      }

      // acc = await web3.eth.getAccounts();
      // balance = await web3.eth.getBalance(acc[0]);
      // console.log("accounts======", balance);
    } catch (e) {
      if (e) {
        console.log("err=========", e);
        // window.location.reload();
        alertToast(false, e?.message || e);
      }
    }
    // }
  }

  //Swapping

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
        const Memo = `=:${toAsset?.rawData}:${acc}`;
        console.log("Memo=====>>", Memo);
        const send_amount = Number(amount) * Number(Math.pow(10, 0));
        console.log("in=====>>", ethInboundAddress);

        let response = await this.callDeposit({
          ethInboundAddress: ethInboundAddress,
          asset: assetFromString(fromAsset?.rawData),
          input: Number(send_amount),
          memo: Memo,
          userAddress: acc,
          signer: signer,
        });

        const etherScan = `https://${ETHERSCAN_URL}etherscan.io/tx/${response}`;
        setStatusLink(etherScan);
        setTransactionHash(response);
        setLoading(false);
        setConfirmModal(false);
        setYayModal(true);
        const data = {
          coin: toAsset?.asset,
          amount: send_amount,
          address: acc,
          transactionId: response,
          date: new Date().toString(),
          client: acc,
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

  async disconnect() {
    try {
      walletConnectprovider.disconnect();
      return;
    } catch {
      console.log("Error disconnecting");
    }
  }
}
