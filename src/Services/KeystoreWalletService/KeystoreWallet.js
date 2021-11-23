import React, { memo, useEffect } from "react";
import axios from "axios";
import {
  COINMARKETCAP_FAIL,
  COINMARKETCAP_SUCCESS,
  MIDGARDPOOL_FAIL,
  MIDGARDPOOL_SUCCESS,
  MIDGARDPOOL_REQUESTING,
  KEYSTORECONNECTION_FAIL,
  KEYSTORECONNECTION_REQUESTING,
  KEYSTORECONNECTION_SUCCESS,
  KEYSTORE_TRANSACTIONHISTORY_FAIL,
  KEYSTORE_TRANSACTIONHISTORY_REQUESTING,
  KEYSTORE_TRANSACTIONHISTORY_SUCCESS,
  TYPE,
  METAMASK,
  KEYSTORE,
  LOGOUT,
  LOGIN,
  MAINMODAL,
} from "../../Redux/actions/types";
import { mainRoute } from "../../Routes/serverRoutes";
import { toast } from "react-toastify";
import browserRoute from "../../Routes/browserRoutes";
import { config } from "../../config";
import { TokenName } from "../../components/Helper/api-names";
import { MIDGARD_POOL } from "../../Routes/serverRoutes";
import Web3 from "web3";

import {
  generatePhrase,
  encryptToKeyStore,
  decryptFromKeystore,
} from "@xchainjs/xchain-crypto";
import { Network } from "@xchainjs/xchain-client";
import { Client as binanceClient } from "@xchainjs/xchain-binance";
import { Client as bitcoinClient } from "@xchainjs/xchain-bitcoin";
import { Client as thorchainClient } from "@xchainjs/xchain-thorchain";
// import { Client as ethereumClient } from "@xchainjs/xchain-ethereum/lib";
import { Client as litecoinClient } from "@xchainjs/xchain-litecoin";
import { Client as bitcoinCashClient } from "@xchainjs/xchain-bitcoincash";
import { EthUtilsService } from "../KeyStoreSwappingAsset/services/eth-utils.service";
import { MidgardService } from "../KeyStoreSwappingAsset/services/midgard.service";
import {
  TCAbi,
  TCRopstenAbi,
} from "../KeyStoreSwappingAsset/app/_abi/thorchain.abi";
import {
  AssetRuneNative,
  BaseAmount,
  assetAmount,
  assetToBase,
  baseAmount,
  AssetETH,
  AssetBNB,
  formatAssetAmountCurrency,
  assetFromString,
} from "@xchainjs/xchain-util";
import { environment } from "../environment";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";
import { formatBaseAsAssetAmount } from "@xchainjs/xchain-util";
const ethereumClient = require("@xchainjs/xchain-ethereum/lib");

const abi = environment.network === "testnet" ? TCRopstenAbi : TCAbi;

const contract = new ethers.Contract(
  "0xefA28233838f46a80AaaC8c309077a9ba70D123A",

  abi
);
const midgardService = new MidgardService();

const ethUtilsService = new EthUtilsService();
export function KeystoreWallet() {
  let userBinanceClient;
  let userBtcClient;
  let userThorchainClient;
  let userEthereumClient;
  let userLtcClient;
  let userbchClient;
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

  async function serverEncryption(unencryptedData) {
    try {
      return CryptoJS.AES.encrypt(
        unencryptedData.toString(),
        "OptimusFox"
      ).toString();
    } catch (e) {
      return e.message;
    }
  }
  //connect

  this.connect = async function (
    dispatch,
    password,
    fileKeyStore,
    setConnectKeyStoreModal,
    setLoading
  ) {
    // const enable = await window.ethereum.enable();
    
      try {
        // localStorage.clear();
        dispatch({ type: LOGOUT });
        setLoading(true);
        let fileReader;
        const handleFileRead = async () => {
          const content = JSON.parse(fileReader.result);
          console.log(content);
          let res = await decryptFromKeystore(content, password);
          console.log("decryption=====>", res);
          // … do something with the 'content' …
          //Network is defined here for all the general networks
          let clients = {};
          let mainClients = [];
          let clientsObject = {};
          const network =
            environment.network === "testnet"
              ? Network.Testnet
              : Network.Mainnet;
          console.log("Enabled Network: ---------------> ", network);
          //Binance Address is getting from here
          userBinanceClient = new binanceClient({ network, phrase: res });
          console.log("here", userBinanceClient);
          let BinanceClientAddress = userBinanceClient.getAddress();
          // clients.Binance = userBinanceClient;
          console.log(
            "User Binance Client address: ---------------> ",
            BinanceClientAddress
          );
          //Transactions history of Binance Client getting here
          const transationResultOfBinanceClient =
            await userBinanceClient.getTransactions({
              address: BinanceClientAddress,
            });
          console.log(
            "Transaction Data of Binance CLient",
            transationResultOfBinanceClient
          );
          const balanceBinance = await userBinanceClient.getBalance(
            BinanceClientAddress
          );
          console.log("balance ee oy!!", balanceBinance);
          clients.Balance = balanceBinance;
          clients.Transactions = transationResultOfBinanceClient;
          clients.Address = BinanceClientAddress;
          mainClients.push({ ...clients });
          clientsObject.userBinanceClient = userBinanceClient;

          //Bitcoin Client is set here
          userBtcClient = new bitcoinClient({
            network,
            phrase: res,
            sochainUrl: "https://sochain.com/api/v2",
            blockstreamUrl: "https://blockstream.info",
          });
          //Bitcoin Client is Address generating from here
          console.log("User Btc Client: ---------------> ", userBtcClient);
          let addressBtc = userBtcClient.getAddress();
          console.log("BTC Address: ---------------> ", addressBtc);
          //Balance of Bitcoin is getting from here
          // const providerBTC = await userBtcClient.getProvider();
          const balanceBtc = await userBtcClient.getBalance(addressBtc);
          console.log("balance Of BTCCSCS: ---------------> ", balanceBtc);
          console.log(
            "balance: ---------------> ",
            balanceBtc[0].amount.amount().c[0] /
              Math.pow(10, balanceBtc[0].amount.decimal)
          );

          //Transactions history of BTC Client getting here
          const transationResultOfBTCClient =
            await userBtcClient.getTransactions({
              address: addressBtc,
            });
          console.log(
            "Transaction Data of BTC CLient",
            transationResultOfBTCClient
          );
          clients.Address = addressBtc;
          clients.Balance = balanceBtc;
          clients.Transactions = transationResultOfBTCClient;
          mainClients.push({ ...clients });
          clientsObject.userBtcClient = userBtcClient;
          //Thorchain Client is set here
          userThorchainClient = new thorchainClient({
            network,
            phrase: res,
          });
          console.log(
            "User Thorchain Client: ---------------> ",
            userThorchainClient
          );
          //Thorchain Address is generation from here
          const thorAddress = await userThorchainClient.getAddress();
          console.log("THORChain Address: ---------------> ", thorAddress);
          //Balance of THORChain is getting from here
          const balanceThor = await userThorchainClient.getBalance(thorAddress);
          console.log("length====>>>", balanceThor.length);
          console.log("THORChain Balance: ---------------> ", balanceThor);
          //Transactions history of Thorchain Client getting here
          const transationResultOfTHORChain =
            await userThorchainClient.getTransactions({ address: thorAddress });
          console.log(
            "Transaction Data of THORChain CLient",
            transationResultOfTHORChain
          );
          clients.Address = thorAddress;
          clients.Balance = balanceThor;
          clients.Transactions = transationResultOfTHORChain;
          mainClients.push({ ...clients });
          clientsObject.userThorchainClient = userThorchainClient;
          // Ethereum CLinet is set here
          userEthereumClient = new ethereumClient.Client({
            network: "testnet",
            phrase: res,
            etherscanApiKey: environment.etherscanKey,
            infuraCreds: { projectId: environment.infuraProjectId },
          });
          // //Ethereum Client Address is generation from here
          // console.log("User Ethereum Client: ---------------> ", userEthereumClient.getAddress());
          //Ethereum CLient Provider is printing here
          const provider = userEthereumClient.getProvider();
          console.log("Ethereum Provider: ---------------> ", provider);
          // //Ethereum Balance is getting from here
          clients.Ethereum = userEthereumClient;
          let addressEth = userEthereumClient.getAddress();
          const ethBalance = await provider.getBalance(addressEth);
          console.log(
            "Ethereum Balance: ---------------> ",
            ethBalance.toString()
          );
          console.log("Ethereum Address: ---------------> ", addressEth);
          //Ethereum Client Balance is getting from here
          const balance1eth = await userEthereumClient.getBalance(addressEth);
          console.log(
            "Ethereum Client Balance: ---------------> ",
            balance1eth
          );
          console.log(res);
          //Transactions history of Ethereum Client getting here
          const transationResultOfEthereum =
            await userEthereumClient.getTransactions({ address: addressEth });
          console.log(
            "Transaction Data of Ethereum CLient",
            transationResultOfEthereum
          );
          clients.Address = addressEth;
          clients.Balance = balance1eth;
          clients.Transactions = transationResultOfEthereum;
          mainClients.push({ ...clients });
          clientsObject.userEthereumClient = userEthereumClient;
          //LTC Client is setup here
          userLtcClient = new litecoinClient({
            network,
            phrase: res,
          });
          // LTC Client Address generation is done here
          let addressLTC = userLtcClient.getAddress();
          console.log("User LTC Client: ---------------> ", addressLTC);
          //LTC Client Balance is getting from here
          const balanceLTC = await userLtcClient.getBalance(addressLTC);
          console.log("LTC Client Balance: ---------------> ", balanceLTC);
          //Transactions history of LTC Client getting here
          const transationResultOfLTC = await userLtcClient.getTransactions({
            address: addressLTC,
          });
          console.log("Transaction Data of LTC CLient", transationResultOfLTC);
          clients.Address = addressLTC;
          clients.Balance = balanceLTC;
          clients.Transactions = transationResultOfLTC;
          mainClients.push({ ...clients });
          clientsObject.userLtcClient = userLtcClient;
          //BCH Client is setup here
          userbchClient = new bitcoinCashClient({ network, phrase: res });
          //BCH Client Address generation is done here
          let addressBCH = userbchClient.getAddress();
          console.log("User BCH Client: ---------------> ", addressBCH);
          //BCH Client Balance getting is done here
          const balanceBCH = await userbchClient.getBalance(addressBCH);
          console.log("BCH Client Balance: ---------------> ", balanceBCH);
          //Transaction History of BCH Client getting here
          const transationResultOfBCH = await userbchClient.getTransactions({
            address: addressBCH,
          });
          console.log("Transaction Data of BCH CLient", transationResultOfBCH);
          clients.Address = addressBCH;
          clients.Balance = balanceBCH;
          clients.Transactions = transationResultOfBCH;
          mainClients.push({ ...clients });
          clientsObject.userbchClient = userbchClient;

          console.log("Clients===>>>", clients);
          // localStorage.setItem("isLoggedin", true);
          // localStorage.setItem(TYPE, KEYSTORE);
          const EncryptedClients = await serverEncryption(
            // JSON.stringify(clients, getCircularReplacer())
            JSON.stringify(res)
          );
          console.log("Check====>>>", EncryptedClients);
          // localStorage.setItem("phrase", EncryptedClients);
          // let clientsDescryption = await serverDecryption(clientsEncryption);
          // console.log("Check6====>>>", JSON.parse(clientsDescryption));
          let concatAssetName = "";
          let totalAmountInBTC = 0;
          let totalAmountInUSD = 0;
          let transactionHistory = [];
          let assetBalance = [];
          console.log("MainClients=====>>", mainClients);
          mainClients.map((d, mainKey) => {
            d.Balance.map((t, key) => {
              let asset = t?.asset?.ticker?.split("/");
              if (asset[1]) {
                asset = asset[1];
              } else {
                asset = asset[0];
              }
              concatAssetName = concatAssetName + asset + ",";
              // console.log("TICKER", asset, t.amount.amount());
            });
            d.Transactions.txs.map((t, key) => {
              transactionHistory.push(t);
              let res =
                Number(t?.to[0]?.amount?.amount()?.c[0]) /
                Math.pow(10, Number(t?.to[0]?.amount?.decimal));
              t.transferAmount = res;
            });
          });
          let apiDataBTC = await axios.get(
            `https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=${concatAssetName}`
          );
          let apiDataUSD = await axios.get(
            `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${concatAssetName}`
          );
          let dataBTC = apiDataBTC.data;
          let dataUSD = apiDataUSD.data;
          console.log("DATA IN USD==========>>", dataUSD);
          mainClients.map((d, mainKey) => {
            d.Balance.map((t, key) => {
              let asset = t?.asset?.ticker?.split("/");
              if (asset[1]) {
                asset = asset[1];
              } else {
                asset = asset[0];
              }
              // console.log("heyData=====>>",asset, data[asset]);
              let value =
                Number(t.amount.amount().c[0]) /
                Math.pow(10, Number(t.amount.decimal));
              // totalAmountInBTC = totalAmountInBTC + value;
              // console.log("Value Before", asset, value);
              console.log("dataUSD=====>>", dataUSD);
              let valueBTC = value / dataBTC[asset];
              let valueUSD = value / dataUSD[asset];
              t.balanceUSD = valueUSD;
              t.marketPriceUSD = 1 / dataUSD[asset];
              totalAmountInUSD = totalAmountInUSD + valueUSD;
              totalAmountInBTC = totalAmountInBTC + valueBTC;
              assetBalance.push(t);
            });
          });
          // .then((res) => {
          // })
          // .catch((err) => {
          //   alertToast(true, "CryptoCompare: Failed");
          // });
          console.log("TOTAL AMOUNTBTC======>>>", totalAmountInBTC);
          console.log("TOTAL AMOUNTUSD======>>>", totalAmountInUSD);
          console.log("mainClients======>>>", mainClients);
          setConnectKeyStoreModal(false);
          alertToast(false, "KeyStore Connected Successfully!");
          dispatch({
            type: KEYSTORECONNECTION_SUCCESS,
            payload: {
              KeyStoreClient: mainClients,
              overallBalance_USD: totalAmountInUSD,
              overallBalance_BTC: totalAmountInBTC,
              assetBalance: assetBalance,
              transactionHistory: transactionHistory,
              clientsObject: clientsObject,
              isLoggedin: true,
            },
          });
          setLoading(false);
          //PolkaDot Client is setup here
          //  const userPolkaDotClient = new PolkadotClient({
          //    network:'testnet',
          //    phrase:res
          //  });
          //  console.log("User PolkaDot Client: ---------------> ", userPolkaDotClient.getAddress());
        };
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(fileKeyStore);
      } catch (error) {
        alertToast(true, error?.message || "Something went wrong");
        setLoading(false);
        setConnectKeyStoreModal(false);
      }
  };

  // Swapping
  this.nativeSwapping = async function (
    dispatch,
    fromAsset,
    toAsset,
    amount,
    decimal,
    midgardPool,
    setYayModal,
    setTransactionHash,
    setStatusLink,
    setLoading
  ) {
    console.log("from=======>>>", fromAsset.rawData.toString());
    console.log("to=======>>", toAsset, amount, decimal);
    setLoading(true);
    let walletAddress;
    let hash;

    switch (toAsset?.blockchain) {
      case "ETH":
        walletAddress = userEthereumClient.getAddress();

        break;
      case "BNB":
        walletAddress = userBinanceClient.getAddress();

        break;

      case "BTC":
        walletAddress = userBtcClient.getAddress();

        break;

      case "LTC":
        walletAddress = userLtcClient.getAddress();

        break;

      case "BCH":
        walletAddress = userbchClient.getAddress();

        break;

      case "THOR":
        walletAddress = userThorchainClient.getAddress();

        break;

      default:
        break;
    }

    try {
      let inboundApi = await axios.get(
        "https://testnet.midgard.thorchain.info/v2/thorchain/inbound_addresses"
      );
      inboundApi = inboundApi.data;
      let inboundAddress = inboundApi.find(
        (data) => data.chain === fromAsset.blockchain
      );
      console.log("Inbound Object===>>", inboundAddress.address.toString());
      //  const Memo = "=:THOR.RUNE:tthor1fcaf3n4h34ls3cu4euwl6f7kex0kpctkf5p8d7";

      const Memo = `=:${toAsset.rawData}:${walletAddress}`;
      const send_amount = Number(amount) * Number(Math.pow(10, decimal));
      console.log("send Amount===>>", send_amount);
      let viewblock;
      switch (fromAsset?.blockchain) {
        case "ETH":
          let response = await ethUtilsService.callDeposit({
            inboundAddress: inboundAddress,
            asset: assetFromString(fromAsset.rawData),
            // amount: amount,
            amount: Number(send_amount),
            memo: Memo,
            ethClient: userEthereumClient,
          });
          const etherScan = `https://ropsten.etherscan.io/tx/${response}`;
          setStatusLink(etherScan);
          setTransactionHash(response);
          setLoading(false);
          setYayModal(true);
          break;

        case "BNB":
          // console.log("InboundAddress====>>", inboundAddress);
          // console.log("InboundAddress====>>", fromAsset.rawData);
          // console.log("InboundAddress====>>", send_amount);
          // console.log("InboundAddress====>>", Memo);
          console.log("Hey BNB");
          let response2 = await userBinanceClient.transfer({
            recipient: inboundAddress.address,
            asset: assetFromString(fromAsset.rawData),
            amount: baseAmount(amount * 10 ** decimal),
            memo: Memo,
          });
          viewblock = `https://viewblock.io/thorchain/tx/${response2}?network=testnet`;
          setStatusLink(viewblock);
          setTransactionHash(response2);
          setLoading(false);
          setYayModal(true);
          console.log("response======>>", viewblock);

          break;

        case "BTC":
          console.log("Hey BTC");
          let response3 = await userBtcClient.transfer({
            recipient: inboundAddress.address,
            asset: assetFromString(fromAsset.rawData),
            amount: baseAmount(amount * 10 ** decimal),
            memo: Memo,
          });
          viewblock = `https://viewblock.io/thorchain/tx/${response3}?network=testnet`;
          setStatusLink(viewblock);
          setTransactionHash(response3);
          setLoading(false);
          setYayModal(true);
          break;

        case "LTC":
          console.log("Hey LTC");
          let response4 = await userLtcClient.transfer({
            recipient: inboundAddress.address,
            asset: assetFromString(fromAsset.rawData),
            amount: baseAmount(amount * 10 ** decimal),
            memo: Memo,
          });
          viewblock = `https://viewblock.io/thorchain/tx/${response4}?network=testnet`;
          setStatusLink(viewblock);
          setTransactionHash(response4);
          setLoading(false);
          setYayModal(true);
          console.log("response======>>", response4);

          break;

        case "BCH":
          console.log("Hey BTC");
          let response5 = await userbchClient.transfer({
            recipient: inboundAddress.address,
            asset: assetFromString(fromAsset.rawData),
            amount: baseAmount(amount * 10 ** decimal),
            memo: Memo,
          });
          viewblock = `https://viewblock.io/thorchain/tx/${response5}?network=testnet`;
          setStatusLink(viewblock);
          setTransactionHash(response5);
          setLoading(false);
          setYayModal(true);
          console.log("response======>>", response5);
          break;

        case "THOR":
          console.log("Hey THOR");
          let response6 = await userThorchainClient.transfer({
            recipient: inboundAddress.address,
            asset: assetFromString(fromAsset.rawData),
            amount: baseAmount(amount * 10 ** decimal),
            memo: Memo,
          });
          viewblock = `https://viewblock.io/thorchain/tx/${response6}?network=testnet`;
          setStatusLink(viewblock);
          setTransactionHash(response6);
          setLoading(false);
          setYayModal(true);
          console.log("response======>>", response6);
          break;

        default:
          break;
      }
    } catch (error) {
      console.log("error", error);
      alertToast(true, error?.message || error);
      setLoading(false);
    }
  };

  const swapBNBToRuneNative = async () => {
    const destAddress = userBinanceClient.getAddress();
    console.log(
      "User Binance Client: >>>>>>>>>>>>>>>>>>>>>>>>>---------------> ",
      destAddress
    );
    const to_address = "tbnb1gr3zze7zkz2x6p08qnl88rhd22vpypmafeplr7";
    const send_amount = baseAmount(100000, 6);
    const Memo = "=:THOR.RUNE:tthor1fcaf3n4h34ls3cu4euwl6f7kex0kpctkf5p8d7";

    // const memoCheck = `${swapping}:THOR.RUNE:${address}`
    //= swap
    //+ deposit
    // const assetString = assetFromString('BNB.BUSD-BD1');
    // console.log('assetString------------------------', assetString);
    //assetfromstring(bnb); 1*10^6 1000000 1000000 / 10^6=1
    const result = await userBinanceClient.transfer({
      asset: AssetBNB, // inBoundBNB address assetfromstring(BNB.BNB)
      amount: send_amount,
      recipient: to_address, //vault inbound address of the chain https://testnet.midgard.thorchain.info/v2/thorchain/inbound_addresses
      memo: Memo,
    });
    console.log("i am here =======================>", result);

    return result;
  };
}
