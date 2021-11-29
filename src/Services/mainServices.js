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
  SET_SETTINGS,
  LOGIN,
  MAINMODAL,
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
import { Network } from "@xchainjs/xchain-client";
import { Client as binanceClient } from "@xchainjs/xchain-binance";
import { Client as bitcoinClient } from "@xchainjs/xchain-bitcoin";
import { Client as thorchainClient } from "@xchainjs/xchain-thorchain";
import { Client as ethereumClient } from "@xchainjs/xchain-ethereum/lib";
import { Client as litecoinClient } from "@xchainjs/xchain-litecoin";
import { Client as bitcoinCashClient } from "@xchainjs/xchain-bitcoincash";
import {
  AssetRuneNative,
  BaseAmount,
  assetAmount,
  assetToBase,
  baseAmount,
  AssetETH,
  AssetBNB,
  formatAssetAmountCurrency,
} from "@xchainjs/xchain-util";
import { environment } from "./environment";
import CryptoJS, { algo } from "crypto-js";
import { formatBaseAsAssetAmount } from "@xchainjs/xchain-util";
import { KeystoreWallet } from "./KeystoreWalletService/KeystoreWallet";
import { WalletConnectService } from "./WalletConnectService/walletConnect-service";
import { XDEFIService } from "./XdefiService/xdefi-service";
import { MetamaskService } from "./MetaMaskService/metamask.service";

const web3 = new Web3(window.ethereum);
const walletConnectService = new WalletConnectService();
const xdefiService = new XDEFIService();
const keyStoreInstance = new KeystoreWallet();
const metaMaskService = new MetamaskService();

export const NGROK = "https://defispot-testnet.herokuapp.com/api/v1";

// https:defispot.herokuapp.com/
// http://1dce-103-105-211-114.ngrok.io/api/v1

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

export const getUserSettingsFromAddress = async (dispatch, addr) => {
  console.log(addr);
  await axios.get(`${NGROK}/get/user/data/${addr}`).then((res) => {
    dispatch({
      type: SET_SETTINGS,
      payload: {
        settings: {
          custom: res?.data?.user?.custom,
          slip: res?.data?.user?.slip,
          speed: res?.data?.user?.speed,
        },
      },
    });
    console.log("RESSSSS =<><><><<><><><><><><<><><><>>< ", res?.data.user);
  });
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

//For mainModal
export const handleMainModal = (val) => async (dispatch) => {
  dispatch({
    type: MAINMODAL,
    payload: {
      mainModal: val,
    },
  });
};

//logout
export const handleLogout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  if (localStorage.walletconnect) walletConnectService.disconnect();
  alertToast(true, "Wallet Disconnected");

  setTimeout(function () {
    window.location.reload();
  }, 500);
};

//Create KeyStore
export const createKeyStore =
  (password, setCreateKeyStoreModal) => async (dispatch) => {
    try {
      const phrase = generatePhrase();
      console.log("phrase===>", phrase);
      const key = await encryptToKeyStore(phrase, password);
      console.log("key========>", key);
      setCreateKeyStoreModal(false);
      alertToast(false, "KeyStore Created Successfully!");
      downloadTextFile(key);

      return key;
    } catch (error) {
      console.log(error);
    }
  };

//Connect KeyStore
let fileReader;
// serverEncryption - Function is used to encrypt data with server key

export async function serverEncryptionAndRouting(unencryptedData, history) {
  try {
    let res = CryptoJS.AES.encrypt(
      unencryptedData.toString(),
      "OptimusFox"
    ).toString();
    console.log("ENCRYPTED======>>", res);
    // let dec = serverDecryption(res);
    // console.log("DECRYPTED======>>", dec);
    // let bytes = await CryptoJS.AES.decrypt(res, "OptimusFox")
    //   .toString(CryptoJS.enc.Utf8, getCircularReplacer)
    //   .toString();
    // console.log("BYTES====>>", bytes);
    history.push(`${browserRoute.BUYMARKET}/${res}`);
  } catch (e) {
    return e.message;
  }
}

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

// serverDecryption - Function is used to decrypt data with server key

export async function serverDecryption(encryptedData) {
  try {
    let bytes = await CryptoJS.AES.decrypt(
      encryptedData,
      "OptimusFox"
    ).toString(getCircularReplacer(), CryptoJS.enc.Utf8);
    console.log("BYTES====>>", bytes);
    return bytes;
    // return bytes.toString(CryptoJS.enc.Utf8);
    // console.log("DATA======>>>", bytes.toString(CryptoJS.enc.Utf8));
  } catch (e) {
    return e.message;
  }
}

//COnnect MetaMask
// let web3, account;

export const MetaMaskConnection = (setMainModel) => async (dispatch) => {
  if (!window.ethereum.isMetaMask) {
    alert("Please install MetaMask Extension");
  } else {
    // console.log("in else", window.ethereum);
    // await window.ethereum.enable();
    try {
      const metamask = await metaMaskService.connect(
        dispatch,
        setMainModel,
        alertToast
      );
      const account = await web3.eth.getAccounts();

      const data = {
        accountAddress: account[0],
      };

      await axios.post(`${NGROK}/add/user`, data).then((res) => {
        console.log("RESSSSS =<><><><<><><><><><><<><><><>>< ", res);
      });

      getUserSettingsFromAddress(dispatch, account[0]);

      // console.log(metamask);

      // web3 = new Web3(window.ethereum);
      // await window.ethereum.enable();
      // account = await web3.eth.getAccounts();
      // console.log("accounts====>>>", account);
      // localStorage.clear();
      // dispatch({ type: LOGOUT });
      // localStorage.setItem("walletAccount", account);
      // // localStorage.setItem("isLoggedin", true);

      // dispatch({ type: LOGIN });

      // // localStorage.setItem(TYPE, METAMASK);
      // setMainModel(false);
      // alertToast(false, "MetaMask Connected Successfully!");
    } catch (error) {
      // console.log("in catch");
      console.log(error);
    }
  }
};

export const WalletConnectConnection = (setMainModel) => async (dispatch) => {
  if (web3.eth) {
    const acc = await web3.eth.getAccounts();
    if (acc.length > 0) {
      alert("Please disconnect your MetaMask from the extension");
    } else {
      walletConnectService.connect(dispatch, setMainModel, alertToast);
    }
  } else {
    walletConnectService.connect(dispatch, setMainModel, alertToast);
  }
  // }
};

export const XDEFIConnection = (setMainModel) => async (dispatch) => {
  if (window.xfi) {
    const eth = await window.xfi;
    if (
      eth?.binance &&
      eth?.bitcoin &&
      eth?.ethereum &&
      eth?.terra &&
      eth?.thorchain
    ) {
      const eth = await window.xfi;
      const acc = await window.xfi.ethereum.getaccounts();
      console.log("eth-=-=-= ", eth);
      console.log("acc-=-=-= ", acc);
      // if (acc.length > 0) {
      // alert("Please disconnect your MetaMask");
      // } else {
      xdefiService.connectXDEFI(dispatch, setMainModel, alertToast);
      // }
    } else {
      alert("Please proritise XDEFI");
    }
  } else {
    alert("Please install XDEFI extension");
  }
};

export const connectKeyStore =
  (password, fileKeyStore, setConnectKeyStoreModal, setLoading) =>
  async (dispatch) => {
    // const acc = await web3.eth.getAccounts();
    // if (acc.length > 0) {
    //   alert("Please disconnect your MetaMask");
    // } else {
    keyStoreInstance.connect(
      dispatch,
      password,
      fileKeyStore,
      setConnectKeyStoreModal,
      setLoading
    );
    // }
  };

//Native Token Swapping
export const nativeSwapping =
  (
    fromAsset,
    toAsset,
    amount,
    decimal,
    midgardPool,
    setYayModal,
    setConfirmModal,
    setTransactionHash,
    setStatusLink,
    setLoading,
    walletType
  ) =>
  async (dispatch) => {
    switch (walletType) {
      case "METAMASK":
        await metaMaskService.swapping(
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
        );

        break;
      case "KEYSTORE":
        await keyStoreInstance.nativeSwapping(
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
        );
        break;
      // case "XDEFI":
      // xdefiService.swapping(
      //   dispatch,
      //   fromAsset,
      //   toAsset,
      //   amount,
      //   decimal,
      //   midgardPool,
      //   setYayModal,
      //   setConfirmModal,
      //   setTransactionHash,
      //   setStatusLink,
      //   setLoading
      // );

      default:
        break;
    }
  };

//KeyStore Transaction History

export const GetKeyStore_TransactionHistory = () => async (dispatch) => {
  try {
    dispatch({
      type: KEYSTORECONNECTION_REQUESTING,
    });
    let clientPhrase = localStorage.getItem("phrase");
    clientPhrase = await serverDecryption(clientPhrase);
    clientPhrase = clientPhrase.split('"')[1];
    console.log(clientPhrase);
    //Network is defined here for all the general networks
    let clients = {};
    let mainClients = [];
    const network =
      environment.network === "testnet" ? Network.Testnet : Network.Mainnet;
    console.log("Enabled Network: ---------------> ", network);
    //Binance Address is getting from here
    const userBinanceClient = new binanceClient({
      network,
      phrase: clientPhrase,
    });
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
    for (let i = 0; i < balanceBinance.length; i++) {
      console.log(
        "balance: ---------------> ",

        balanceBinance[i].amount.amount()
      );
    }
    clients.Balance = balanceBinance;
    clients.Transactions = transationResultOfBinanceClient;
    clients.Address = BinanceClientAddress;
    mainClients.push({ ...clients });

    //Bitcoin Client is set here
    const userBtcClient = new bitcoinClient({
      network,
      phrase: clientPhrase,
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

    console.log("balance Of BTCCC: ---------------> ", balanceBtc);
    console.log("balance: ---------------> ", balanceBtc[0].amount.amount());

    //Transactions history of BTC Client getting here
    const transationResultOfBTCClient = await userBtcClient.getTransactions({
      address: addressBtc,
    });
    console.log("Transaction Data of BTC CLient", transationResultOfBTCClient);
    clients.Address = addressBtc;
    clients.Balance = balanceBtc;
    clients.Transactions = transationResultOfBTCClient;
    mainClients.push({ ...clients });
    //Thorchain Client is set here
    const userThorchainClient = new thorchainClient({
      network,
      phrase: clientPhrase,
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
    console.log(3, clients);
    // Ethereum CLinet is set here
    const userEthereumClient = new ethereumClient({
      network: "testnet",
      phrase: clientPhrase,
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

    console.log("Ethereum Balance: ---------------> ", ethBalance.toString());
    console.log("Ethereum Address: ---------------> ", addressEth);
    //Ethereum Client Balance is getting from here
    const balance1eth = await userEthereumClient.getBalance(addressEth);
    console.log("Ethereum Client Balance: ---------------> ", balance1eth);

    //Transactions history of Ethereum Client getting here
    const transationResultOfEthereum = await userEthereumClient.getTransactions(
      { address: addressEth }
    );
    console.log(
      "Transaction Data of Ethereum CLient",
      transationResultOfEthereum
    );
    clients.Address = addressEth;
    clients.Balance = balance1eth;
    clients.Transactions = transationResultOfEthereum;
    mainClients.push({ ...clients });
    //LTC Client is setup here
    const userLtcClient = new litecoinClient({
      network,
      phrase: clientPhrase,
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
    //BCH Client is setup here
    const userbchClient = new bitcoinCashClient({
      network,
      phrase: clientPhrase,
    });

    //BCH Client Address generation is done here
    let addressBCH = userbchClient.getAddress();

    console.log("User BCH Client: ---------------> ", addressBCH);
    //BCH Client Balance getting is done here
    const balanceBCH = await userbchClient.getBalance(addressBCH);
    console.log("LTC Client Balance: ---------------> ", balanceBCH);

    //Transaction History of BCH Client getting here
    const transationResultOfBCH = await userbchClient.getTransactions({
      address: addressBCH,
    });
    console.log("Transaction Data of LTC CLient", transationResultOfBCH);
    clients.Address = addressBCH;
    clients.Balance = balanceBCH;
    clients.Transactions = transationResultOfBCH;
    mainClients.push({ ...clients });
    let concatAssetName = "";
    let totalAmountInBTC = 0;
    let totalAmountInUSD = 0;
    let transactionHistory = [];

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

    let apiDataBTC = await axios
      .get(
        `https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=${concatAssetName}`
      )
      .catch((err) => {
        console.log(err);
      });
    let apiDataUSD = await axios
      .get(
        `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${concatAssetName}`
      )
      .catch((err) => {
        console.log(err);
      });

    let dataBTC = apiDataBTC.data;
    let dataUSD = apiDataUSD.data;
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
        let valueBTC = value / dataBTC[asset];
        let valueUSD = value / dataUSD[asset];
        totalAmountInUSD = totalAmountInUSD + valueUSD;
        totalAmountInBTC = totalAmountInBTC + valueBTC;
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
    dispatch({
      type: KEYSTORECONNECTION_SUCCESS,
      payload: {
        KeyStoreClient: mainClients,
        overallBalance_USD: totalAmountInUSD,
        overallBalance_BTC: totalAmountInBTC,
        transactionHistory: transactionHistory,
        isLoggedin: true,
      },
    });
  } catch (error) {
    alertToast(true, error?.message || "Something Went Wrong");
  }
};
//BNB-BUSD

export const MidgardPool_Action = () => async (dispatch) => {
  dispatch({
    type: MIDGARDPOOL_REQUESTING,
  });
  let poolData = [];
  let coinMarketCapData = [];
  // let check = await axios.get(
  //   "https://viewblock.io/thorchain/tx/996DFA621B1C2CE978541381541906AF311FA7B24C39A37DAC6C76CF8FB5ABF9?network=testnet"
  // );
  // console.log("check======>>>", check);
  await axios
    .get(mainRoute.MIDGARD_POOL)
    .then((res) => {
      poolData = res;
      let data = res.data;
      if (data) {
        data?.map((d, key) => {
          if (d.asset === "XRUNE") {
            d.logo =
              "https://miro.medium.com/max/3150/1*KkoJRE6ICrE70mNegVeY_Q.png";
          }
        });

        data = data.sort((a, b) => b.assetPrice - a.assetPrice);

        dispatch({
          type: MIDGARDPOOL_SUCCESS,
          payload: { midgardPool: data },
        });
      }
    })
    .catch((err) => {
      // setLoading(false);
      console.log(err);
      dispatch({
        type: MIDGARDPOOL_FAIL,
      });
      const errorMsg = err?.response?.data?.msg || err.message;

      alertToast(true, errorMsg);
    });

  // setLoading(false);
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
