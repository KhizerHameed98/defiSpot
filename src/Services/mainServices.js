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
import CryptoJS from "crypto-js";
import { formatBaseAsAssetAmount } from "@xchainjs/xchain-util";
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
  alertToast(true, "Wallet Disconnected");
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

// serverDecryption - Function is used to decrypt data with server key

async function serverDecryption(encryptedData) {
  try {
    let bytes = CryptoJS.AES.decrypt(encryptedData, "OptimusFox");

    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return e.message;
  }
}

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
      localStorage.clear();
      dispatch({ type: LOGOUT });
      localStorage.setItem("walletAccount", account);
      // localStorage.setItem("isLoggedin", true);

      dispatch({ type: LOGIN });

      // localStorage.setItem(TYPE, METAMASK);
      setMainModel(false);
      alertToast(false, "MetaMask Connected Successfully!");
    } catch (error) {
      console.log(error);
    }
  }
};

export const connectKeyStore =
  (password, fileKeyStore, setConnectKeyStoreModal, setLoading) =>
  async (dispatch) => {
    try {
      // localStorage.clear();
      dispatch({ type: LOGOUT });
      setLoading(true);
      const handleFileRead = async () => {
        const content = JSON.parse(fileReader.result);
        console.log(content);
        let res = await decryptFromKeystore(content, password);
        console.log("decryption=====>", res);
        // … do something with the 'content' …

        //Network is defined here for all the general networks
        let clients = {};
        let mainClients = [];
        const network =
          environment.network === "testnet" ? Network.Testnet : Network.Mainnet;
        console.log("Enabled Network: ---------------> ", network);
        //Binance Address is getting from here
        const userBinanceClient = new binanceClient({ network, phrase: res });
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

        //Bitcoin Client is set here
        const userBtcClient = new bitcoinClient({
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

        console.log("balance Of BTC: ---------------> ", balanceBtc);
        //Transactions history of BTC Client getting here
        const transationResultOfBTCClient = await userBtcClient.getTransactions(
          {
            address: addressBtc,
          }
        );
        console.log(
          "Transaction Data of BTC CLient",
          transationResultOfBTCClient
        );
        clients.Address = addressBtc;
        clients.Balance = balanceBtc;
        clients.Transactions = transationResultOfBTCClient;
        mainClients.push({ ...clients });

        //Thorchain Client is set here
        const userThorchainClient = new thorchainClient({
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

        // Ethereum CLinet is set here
        const userEthereumClient = new ethereumClient({
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
        console.log("Ethereum Client Balance: ---------------> ", balance1eth);
        console.log(res);
        let check = balance1eth[0];
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

        //LTC Client is setup here
        const userLtcClient = new litecoinClient({
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
        // clients.Address = addressBCH;
        // clients.Balance = balanceBCH;
        // clients.Transactions = transationResultOfBCH;
        // mainClients.push({ ...clients });
        mainClients.map((d, key) => {
          d.Transactions.txs.map((t, key) => {
            let res =
              Number(t?.to[0]?.amount?.amount()?.c[0]) /
              Math.pow(10, Number(t?.to[0]?.amount?.decimal));
            t.transferAmount = res;
          });
        });
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

        setConnectKeyStoreModal(false);
        alertToast(false, "KeyStore Connected Successfully!");
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

    console.log("balance Of BTC: ---------------> ", balanceBtc);
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
  await axios
    .get(mainRoute.MIDGARD_POOL)
    .then((res) => {
      poolData = res;
      let data = res.data;
      if (data) {
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
