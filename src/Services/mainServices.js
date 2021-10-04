import axios from "axios";
import {
  COINMARKETCAP_FAIL,
  COINMARKETCAP_SUCCESS,
  MIDGARDPOOL_FAIL,
  MIDGARDPOOL_SUCCESS,
  MIDGARDPOOL_REQUESTING,
} from "../Redux/actions/types";
import { mainRoute } from "../Routes/serverRoutes";
import { toast } from "react-toastify";
import browserRoute from "../Routes/browserRoutes";
import { config } from "../config";
import { TokenName } from "../components/Helper/api-names";
import { MIDGARD_POOL } from "../Routes/serverRoutes";
import Web3 from "web3";

import {
  generatePhrase,
  encryptToKeyStore,
  decryptFromKeystore,
} from "@xchainjs/xchain-crypto";
// import { Network } from "@xchainjs/xchain-client";
// import { Client as binanceClient } from "@xchainjs/xchain-binance";
// import { Client as bitcoinClient } from "@xchainjs/xchain-bitcoin";
// import { Client as thorchainClient } from "@xchainjs/xchain-thorchain";
// import { Client as ethereumClient } from "@xchainjs/xchain-ethereum/lib";
// import { Client as litecoinClient } from "@xchainjs/xchain-litecoin";
// import { Client as bitcoinCashClient } from "@xchainjs/xchain-bitcoincash";
// import {
//   AssetRuneNative,
//   BaseAmount,
//   assetAmount,
//   assetToBase,
//   baseAmount,
//   AssetETH,
//   AssetBNB,
// } from "@xchainjs/xchain-util";
import { environment } from "./environment";

//alert toast
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
//COnnect MetaMask
let web3, account;

export const MetaMaskConnection = (setMainModel) => async (dispatch) => {
  if (!window.ethereum) {
    alert("Please install metamask first");
  } else {
    try {
      web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      account = await web3.eth.getAccounts();
      console.log("accounts====>>>", account);

      localStorage.setItem("walletAccount", account);
      localStorage.setItem("isLoggedin", true);
      setMainModel(false);
      alertToast(false, "MetaMask Connected Successfully!");
    } catch (error) {
      console.log(error);
    }
  }
};

const downloadTextFile = (key) => {
  const element = document.createElement("a");
  const file = new Blob([JSON.stringify(key)], {
    // const file = new Blob([document.getElementById('input').value],{
    type: "text/plain;charset=utf-8",
  });

  // console.log("file==========", file)

  element.href = URL.createObjectURL(file);
  element.download = "Thor_Custom_Keystore";
  document.body.appendChild(element);
  element.click();
};
//Create KeyStore
export const createKeyStore = (password) => async (dispatch) => {
  try {
    const phrase = generatePhrase();
    console.log("phrase===>", phrase);
    const key = await encryptToKeyStore(phrase, password);
    console.log("key========>", key);
    downloadTextFile(key);

    return key;
  } catch (error) {
    console.log(error);
  }
};

//Connect KeyStore
let fileReader;

export const connectKeyStore = (password, fileKeyStore) => async (dispatch) => {
  console.log("here i am");
  const handleFileRead = async () => {
    const content = JSON.parse(fileReader.result);
    console.log(content);
    let res = await decryptFromKeystore(content, password);
    console.log("decryption=====>", res);
    // … do something with the 'content' …

    //Network is defined here for all the general networks
    // const network =
    //   environment.network === "testnet" ? Network.Testnet : Network.Mainnet;
    // console.log("Enabled Network: ---------------> ", network);
    // //Binance Address is getting from here
    // const userBinanceClient = new binanceClient({ network, phrase: res });
    // let BinanceClientAddress = userBinanceClient.getAddress();
    // console.log(
    //   "User Binance Client address: ---------------> ",
    //   BinanceClientAddress
    // );
    // //Transactions history of Binance Client getting here
    // const transationResultOfBinanceClient =
    //   await userBinanceClient.getTransactions({
    //     address: BinanceClientAddress,
    //   });
    // console.log(
    //   "Transaction Data of Binance CLient",
    //   transationResultOfBinanceClient
    // );

    // //Bitcoin Client is set here
    // const userBtcClient = new bitcoinClient({
    //   network,
    //   phrase: res,
    //   sochainUrl: "https://sochain.com/api/v2",
    //   blockstreamUrl: "https://blockstream.info",
    // });
    // //Bitcoin Client is Address generating from here
    // console.log(
    //   "User Btc Client: ---------------> ",
    //   userBtcClient.getAddress()
    // );
    // let addressBtc = userBtcClient.getAddress();
    // console.log("BTC Address: ---------------> ", addressBtc);
    // //Balance of Bitcoin is getting from here
    // const balanceBtc = await userBtcClient.getBalance(addressBtc);
    // console.log("balance Of BTC: ---------------> ", balanceBtc);
    // //Transactions history of BTC Client getting here
    // const transationResultOfBTCClient = await userBtcClient.getTransactions({
    //   address: addressBtc,
    // });
    // console.log("Transaction Data of BTC CLient", transationResultOfBTCClient);

    // //Thorchain Client is set here
    // const userThorchainClient = new thorchainClient({ network, phrase: res });
    // console.log(
    //   "User Thorchain Client: ---------------> ",
    //   userThorchainClient
    // );
    // //Thorchain Address is generation from here
    // const thorAddress = await userThorchainClient.getAddress();
    // console.log("THORChain Address: ---------------> ", thorAddress);
    // //Balance of THORChain is getting from here
    // const balanceThor = await userThorchainClient.getBalance(thorAddress);
    // console.log("THORChain Balance: ---------------> ", balanceThor);
    // //Transactions history of Thorchain Client getting here
    // const transationResultOfTHORChain =
    //   await userThorchainClient.getTransactions({ address: thorAddress });
    // console.log(
    //   "Transaction Data of THORChain CLient",
    //   transationResultOfTHORChain
    // );

    // // Ethereum CLinet is set here
    // const userEthereumClient = new ethereumClient({
    //   network: "testnet",
    //   phrase: res,
    //   etherscanApiKey: environment.etherscanKey,
    //   infuraCreds: { projectId: environment.infuraProjectId },
    // });
    // // //Ethereum Client Address is generation from here
    // // console.log("User Ethereum Client: ---------------> ", userEthereumClient.getAddress());
    // //Ethereum CLient Provider is printing here
    // const provider = userEthereumClient.getProvider();
    // console.log("Ethereum Provider: ---------------> ", provider);
    // // //Ethereum Balance is getting from here

    // let addressEth = userEthereumClient.getAddress();
    // const ethBalance = await provider.getBalance(addressEth);
    // console.log("Ethereum Balance: ---------------> ", ethBalance.toString());
    // console.log("Ethereum Address: ---------------> ", addressEth);
    // //Ethereum Client Balance is getting from here
    // const balance1eth = await userEthereumClient.getBalance(addressEth);
    // console.log("Ethereum Client Balance: ---------------> ", balance1eth);
    // console.log(res);
    // let check = balance1eth[0];
    // console.log("check====>>", check);
    // let check2 = check.amount.amount();
    // console.log("check2", check2);
    // //Transactions history of Ethereum Client getting here
    // const transationResultOfEthereum = await userEthereumClient.getTransactions(
    //   { address: addressEth }
    // );
    // console.log(
    //   "Transaction Data of Ethereum CLient",
    //   transationResultOfEthereum
    // );

    // //LTC Client is setup here
    // const userLtcClient = new litecoinClient({
    //   network,
    //   phrase: res,
    // });
    // // LTC Client Address generation is done here
    // let addressLTC = userLtcClient.getAddress();
    // console.log("User LTC Client: ---------------> ", addressLTC);
    // //LTC Client Balance is getting from here
    // const balanceLTC = await userLtcClient.getBalance(addressLTC);
    // console.log("LTC Client Balance: ---------------> ", balanceLTC);
    // //Transactions history of LTC Client getting here
    // const transationResultOfLTC = await userLtcClient.getTransactions({
    //   address: addressLTC,
    // });
    // console.log("Transaction Data of LTC CLient", transationResultOfLTC);

    // //BCH Client is setup here
    // const userbchClient = new bitcoinCashClient({ network, phrase: res });
    // //BCH Client Address generation is done here
    // let addressBCH = userbchClient.getAddress();
    // console.log("User BCH Client: ---------------> ", addressBCH);
    // //BCH Client Balance getting is done here
    // const balanceBCH = await userbchClient.getBalance(addressBCH);
    // console.log("LTC Client Balance: ---------------> ", balanceBCH);
    // //Transaction History of BCH Client getting here
    // const transationResultOfBCH = await userbchClient.getTransactions({
    //   address: addressBCH,
    // });
    // console.log("Transaction Data of LTC CLient", transationResultOfBCH);

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
};
//BNB-BUSD
export const MidgardPool_Action = () => async (dispatch) => {
  try {
    dispatch({
      type: MIDGARDPOOL_REQUESTING,
    });

    let d = "";
    let res = await axios.get(MIDGARD_POOL);
    let marketCap = await axios.get(mainRoute.MarketCap);
    marketCap = marketCap.data;
    console.log("data", res.data);
    let data = res.data;

    for (let i = 0; i < data.length; i++) {
      let v = data[i].asset.split("-");

      data[i].asset = v[0];
      let s = data[i].asset.split(".");
      data[i].blockchain = s[0];
      data[i].asset = s[1];
      data[i].address = v[1];
      data[i].assetFullName = TokenName[data[i].asset].name;
      let marketData = marketCap.find((d) => d.symbol === data[i].asset);
      data[i].coinMarketCap = marketData;
      data[i].change_24h = marketData.quote.USD.percent_change_24h;
      data[i].change_7d = marketData.quote.USD.percent_change_7d;
      data[i].marketCap = marketData.quote.USD.market_cap;
      data[i].circulating_supply = marketData.circulating_supply;
      data[i].total_supply = marketData.total_supply;

      // let check = await axios.get(
      //   `https://api.nomics.com/v1/currencies?key=74dab9ea0b25111d3692742725381a8a982c91ae&ids=${data[i].asset}&attributes=name,id`
      // );
      // console.log("check=====>", check);
      // if (i === data.length - 1) {
      //   d = d + data[i].asset;
      // } else {
      //   d = d + data[i].asset + ",";
      // }
    }
    // let des = await axios.get(
    //   `https://api.nomics.com/v1/currencies?key=74dab9ea0b25111d3692742725381a8a982c91ae&ids=${d}&attributes=name,id`
    // );
    // setPoolData(data);

    data = data.sort((a, b) => b.assetPrice - a.assetPrice);

    dispatch({
      type: MIDGARDPOOL_SUCCESS,
      payload: { midgardPool: data },
    });
    // const config = {
    //   headers: {
    //     // "Content-Type": "application/json",
    //     "X-CMC_PRO_API_KEY": "356979e7-00ff-4a80-9e94-577e22c7cf9b",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    //   },
    //   // qs: {
    //   //   start: "1",
    //   //   limit: "5000",
    //   //   convert: "USD",
    //   // },
    //   // json: true,
    //   // gzip: true,
    // };
    // let res = await axios.get(
    //   "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5&convert=USD"
    //   // config
    // );
    // console.log("res=========>>>>", res);
    alertToast(false, "Successfull");
    // setLoading(false);
  } catch (err) {
    // setLoading(false);
    console.log(err);
    dispatch({
      type: MIDGARDPOOL_FAIL,
    });
    const errorMsg = err?.response?.data?.msg || err.message;

    alertToast(true, errorMsg);
  }
};

//Forget Password
// export const forgetPassword =
//   ({ formData, history }) =>
//   (dispatch) => {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const body = JSON.stringify({ formData });
//     axios
//       .post(auth.FORGET_PASSWORD, formData, config)
//       .then(async (res) => {
//         toast.success(res.data.msg);
//         await dispatch({
//           type: FORGET_MSG,
//           payload: res.data,
//         });

//         history.push(browserRoute.SIGNIN);
//       })
//       .catch((err) => {
//         const errMsg = err?.response?.data?.msg || "Oppps, Something wrong...";
//         toast.error(errMsg);

//         dispatch({
//           type: FORGET_FAIL,
//         });
//       });
//   };

// //Register User
// export const register =
//   ({ formData, history, setLoading }) =>
//   (dispatch) => {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     setLoading(true);
//     const body = JSON.stringify(formData);
//     axios
//       .post(auth.SIGNUP, body, config)
//       .then(async (res) => {
//         await dispatch({
//           type: REGISTER_MSG,
//           payload: res.data,
//         });
//         alertToast(false, res && res.data && res.data.msg && res.data.msg);
//         setLoading(false);
//         history.push(browserRoute.SIGNUP_SUCCESS);
//       })
//       .catch((err) => {
//         setLoading(false);
//         dispatch({
//           type: REGISTER_FAIL,
//         });

//         const errorMsg =
//           (err &&
//             err.response &&
//             err.response.data &&
//             err.response.data.msg &&
//             err.response.data.msg) ||
//           err.message;
//         alertToast(true, errorMsg);
//       });
//   };
