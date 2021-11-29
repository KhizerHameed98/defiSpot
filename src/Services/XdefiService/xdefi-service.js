// import { Injectable } from "@angular/core";
import { get } from "lodash";
import { environment } from "../../environments";
import {
  ApproveParams,
  estimateDefaultFeesWithGasPricesAndLimits,
  ETHAddress,
  getTokenAddress,
  TxOverrides,
} from "@xchainjs/xchain-ethereum/lib";
import { User } from "../WalletConnectService/user";
import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from "ethers";
import { erc20ABI } from "../WalletConnectService/erc20.abi";
import { AssetETH, assetToString } from "@xchainjs/xchain-util";
import { toUtf8Bytes } from "@ethersproject/strings";
import { Address } from "@xchainjs/xchain-client";
import { hexlify } from "@ethersproject/bytes";
import { MockClientService } from "../WalletConnectService/mock-client.service";
import { Client as binanceClient } from "@xchainjs/xchain-binance";
import { Client as bitcoinClient } from "@xchainjs/xchain-bitcoin";
import { Client as thorchainClient } from "@xchainjs/xchain-thorchain";
import { Client as litecoinClient } from "@xchainjs/xchain-litecoin";
import { Client as bitcoinCashClient } from "@xchainjs/xchain-bitcoincash";
import { Client as ethereumClient } from "@xchainjs/xchain-ethereum/lib";
import { Chain } from "@xchainjs/xchain-util";
import { Network } from "@xchainjs/xchain-client";
import { Web3 } from "web3";
import { Alert } from "react-bootstrap";

import { LOGIN, LOGOUT } from "../../Redux/actions/types";
import axios from "axios";
import { CRYPTOCOMPARE_KEY } from "../environment";

let binanceAddress;

let bitcoinAddress;

let litecoinAddress;

let etherAddress;

let bitcoinCashAddress;

let thorchainAddress;

let lunaAddress;




let userBinanceClient;

let userBtcClient;

let userThorchainClient;

let userEthereumClient;

let userLtcClient;

let userbchClient;

export class XDEFIService {
  MOCK_PHRASE =
    "image rally need wedding health address purse army antenna leopard sea gain";
  mockBinanceClient;
  mockBtcClient;
  mockThorchainClient;
  mockEthereumClient;
  mockLtcClient;
  mockBchClient;

  static listProvider = [
    {
      title: "Ethereum Provider",
      providerPath: "ethereum",
      enabled: true,
      disableNetworkValidation: true,
    },
    {
      title: "Bitcoin Provider",
      providerPath: ["xfi", "bitcoin"],
      enabled: true,
    },
    {
      title: "BinanceDEX Provider",
      providerPath: ["xfi", "binance"],
      enabled: true,
    },
    {
      title: "BitcoinCash Provider",
      providerPath: ["xfi", "bitcoincash"],
      enabled: true,
    },
    {
      title: "LiteCoin Provider",
      providerPath: ["xfi", "litecoin"],
      enabled: true,
    },
    {
      title: "Thorchain Provider",
      providerPath: ["xfi", "thorchain"],
      enabled: true,
    },
  ];
  constructor() {
    // console.log("mockClientService",mockClientService.mockBchClient())
    // console.log("mockClientService",mockClientService)
    // this.mockClientService = mockClientService
    const network =
      environment.network === "testnet" ? Network.Testnet : Network.Mainnet;
    const phrase = this.MOCK_PHRASE;

    this.mockBinanceClient = new binanceClient({ network, phrase });

    this.mockBtcClient = new bitcoinClient({
      network,
      phrase,
      sochainUrl: "https://sochain.com/api/v2",
      blockstreamUrl: "https://blockstream.info",
    });
    this.mockThorchainClient = new thorchainClient({ network, phrase });
    this.mockEthereumClient = new ethereumClient({
      network,
      phrase,
      etherscanApiKey: environment.etherscanKey,
      infuraCreds: { projectId: environment.infuraProjectId },
    });
    this.mockLtcClient = new litecoinClient({ network, phrase });
    this.mockBchClient = new bitcoinCashClient({ network, phrase });
  }

  isValidNetwork() {
    const invalidNetworkProvider = XDEFIService.listProvider.find(
      ({ providerPath, disableNetworkValidation }) => {
        const providerInfo = get(window, providerPath);
        if (disableNetworkValidation || !providerInfo) {
          return false;
        }
        const projectNetwork =
          environment.network === "testnet" ? "testnet" : "mainnet";
        return projectNetwork !== providerInfo.network;
      }
    );
    return !invalidNetworkProvider;
  }

  listEnabledXDFIProviders() {
    return XDEFIService.listProvider.map((provider) => ({
      ...provider,
      // @ts-ignore
      enabled: get(window, provider.providerPath),
    }));
  }

  async initXDEFI() {}

  async getBnbAddress() {
    if (!window.xfi.binance) {
      return;
    }
    return new Promise((resolve, reject) => {
      window.xfi.binance.request(
        {
          method: "request_accounts",
          params: [],
        },
        (err, accounts) => {
          if (err) {
            return reject(err);
          }
          return resolve(accounts[0]);
        }
      );
    });
  }

  async getBtcAddress() {
    if (!window.xfi.bitcoin) {
      return;
    }
    return new Promise((resolve, reject) => {
      window.xfi.bitcoin.request(
        {
          method: "request_accounts",
          params: [],
        },
        (err, accounts) => {
          if (err) {
            return reject(err);
          }
          return resolve(accounts[0]);
        }
      );
    });
  }

  async getBchAddress() {
    if (!window.xfi.bitcoincash) {
      return;
    }
    return new Promise((resolve, reject) => {
      window.xfi.bitcoincash.request(
        {
          method: "request_accounts",
          params: [],
        },
        (err, accounts) => {
          if (err) {
            return reject(err);
          }
          return resolve(accounts[0]);
        }
      );
    });
  }

  async getEthAddress() {
    if (!window.xfi.ethereum) {
      return;
    }

    return window.xfi.ethereum.request({
      method: "eth_requestAccounts",
      params: [],
    });
  }

  async getThorChainAddress() {
    if (!window.xfi.thorchain) {
      return;
    }
    return new Promise((resolve, reject) => {
      window.xfi.thorchain.request(
        {
          method: "request_accounts",
          params: [],
        },
        (err, accounts) => {
          if (err) {
            return reject(err);
          }
          return resolve(accounts[0]);
        }
      );
    });
  }

  async getLtcAddress() {
    if (!window.xfi.litecoin) {
      console.log("xfi not defined");
      return;
    }
    return new Promise((resolve, reject) => {
      window.xfi.litecoin.request(
        {
          method: "request_accounts",
          params: [],
        },
        (err, accounts) => {
          if (err) {
            return reject(err);
          }
          return resolve(accounts[0]);
        }
      );
    });
  }
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
    // let check = await userBinanceClient.getBalance(binanceAddress);

    // console.log("heyBalance=======>>", check[0].amount.amount());

    console.log("from=======>>>", fromAsset.rawData.toString());
    console.log("to=======>>", toAsset, amount, decimal);
    setLoading(true);
    let walletAddressTo;
    let walletAddressFrom;
    let hash;
    console.log("address======", bitcoinAddress);

    switch (fromAsset?.blockchain) {
      case "ETH":
        walletAddressTo = etherAddress;

        break;
      case "BNB":
        walletAddressTo = binanceAddress;
        break;

      case "BTC":
        walletAddressTo = bitcoinAddress;

        break;

      case "LTC":
        walletAddressTo = litecoinAddress;

        break;

      case "BCH":
        walletAddressTo = bitcoinCashAddress;

        break;

      case "THOR":
        walletAddressTo = thorchainAddress;

        break;

      default:
        break;
    }

    console.log("walletTo==========>>", walletAddressTo);
  }
  async connectXDEFI(dispatch, setMainModel, alertToast) {
    if (window.xfi) {
      dispatch({ type: LOGOUT });
      let clients = {};
      let mainClients = [];
      userBinanceClient = this.mockBinanceClient;
      userBtcClient = this.mockBtcClient;
      userThorchainClient = this.mockThorchainClient;
      userEthereumClient = this.mockEthereumClient;
      userLtcClient = this.mockLtcClient;
      userbchClient = this.mockBchClient;
      const [thorAddress] = await Promise.all([
        this.getThorChainAddress(),
        new Promise((resolve) => setTimeout(resolve, 100)),
      ]);

      const [
        bnbAddress,
        btcAddress,
        bchAddress,
        ethAddresses,
        ltcAddress,
        thorAddresses,
      ] = await Promise.all([
        this.getBnbAddress(),
        this.getBtcAddress(),
        this.getBchAddress(),
        this.getEthAddress(),
        this.getLtcAddress(),
        this.getThorChainAddress(),
      ]);
      binanceAddress = bnbAddress;
      bitcoinAddress = btcAddress;
      litecoinAddress = ltcAddress;
      etherAddress = ethAddresses;
      bitcoinCashAddress = bchAddress;
      thorchainAddress = thorAddresses;
      //Bitcoin
      let BtcBalance = await userBtcClient.getBalance(btcAddress);
      console.log("tttttttttttttt->>>>>>", BtcBalance[0].amount.amount());
      clients.Balance = BtcBalance;
      clients.Address = btcAddress;
      mainClients.push({ ...clients });
      //BCH

      let BchBalance = await userbchClient.getBalance(bchAddress);
      clients.Balance = BchBalance;
      clients.Address = bchAddress;
      mainClients.push({ ...clients });
      //BNB

      let BnbBalance = await userBinanceClient.getBalance(bnbAddress);
      clients.Balance = BnbBalance;
      clients.Address = bnbAddress;
      mainClients.push({ ...clients });
      //LTC

      let LtcBalance = await userLtcClient.getBalance(ltcAddress);
      clients.Balance = LtcBalance;
      clients.Address = ltcAddress;
      mainClients.push({ ...clients });
      //ETH

      let EthBalance = await userEthereumClient.getBalance(ethAddresses[0]);
      console.log("hey========", EthBalance[0].amount.amount());
      clients.Balance = EthBalance;

      clients.Address = ethAddresses[0];
      mainClients.push({ ...clients });
      //THOR

      let ThorBalance = await userThorchainClient.getBalance(thorAddresses);

      clients.Balance = ThorBalance;
      clients.Address = thorAddresses;
      mainClients.push({ ...clients });
      console.log("mainClients======>>", mainClients);
      // other work
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
        // d.Transactions.txs.map((t, key) => {
        //   transactionHistory.push(t);
        //   let res =
        //     Number(t?.to[0]?.amount?.amount()?.c[0]) /
        //     Math.pow(10, Number(t?.to[0]?.amount?.decimal));
        //   t.transferAmount = res;
        // });
      });
      let apiDataBTC = await axios.get(
        `https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=${concatAssetName}&api_key=${CRYPTOCOMPARE_KEY}`
      );
      let apiDataUSD = await axios.get(
        `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${concatAssetName}&api_key=${CRYPTOCOMPARE_KEY}`
      );
      let dataBTC = apiDataBTC.data;
      let dataUSD = apiDataUSD.data;
      console.log("DATA IN USD==========>>", dataUSD);
      mainClients.map((d, mainKey) => {
        d.Balance.map((t, key) => {
          console.log(t?.asset?.ticker + "======>", t?.amount?.amount());
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
      console.log(
        "TOTAL AMOUNTBTC======>>>",
        totalAmountInBTC,
        CRYPTOCOMPARE_KEY
      );
      console.log("TOTAL AMOUNTUSD======>>>", totalAmountInUSD);
      console.log("mainClients======>>>", mainClients);

      setMainModel(false);
      dispatch({
        type: LOGIN,
        payload: {
          KeyStoreClient: mainClients,
          overallBalance_USD: totalAmountInUSD,
          overallBalance_BTC: totalAmountInBTC,
          assetBalance: assetBalance,
          isLoggedin: true,
          walletType: "XDEFI",
        },
      });
      alertToast(false, "Wallet connected!");

      userThorchainClient.getAddress = () => thorAddress;
      userBinanceClient.getAddress = () => bnbAddress;
      userBtcClient.getAddress = () => btcAddress;
      userbchClient.getAddress = () => bchAddress;
      userEthereumClient.getAddress = () => ethAddresses?.[0];
      userLtcClient.getAddress = () => ltcAddress;

      const EthAdd = userBinanceClient;
      console.log("Ethereum Address -------------->", EthAdd);
      const ethereumBalance = await userEthereumClient.getBalance();
      console.log(
        "Ethereum Balance ========================>",
        ethereumBalance
      );

      // const transactionOfEthreum =
      //   await this.mockEthereumClient.getTransactions(EthAdd);
      // console.log(
      //   "Ethereum Balance ========================>",
      //   transactionOfEthreum
      // );

      // Binance
      userBinanceClient.transfer = async (transferParams) => {
        return new Promise((resolve, reject) => {
          window.xfi.binance.request(
            {
              method: "transfer",
              params: [
                {
                  ...transferParams,
                  from: bnbAddress,
                  amount: {
                    amount: 500,
                    decimals: 8,
                  },
                },
              ],
            },
            (err, result) => {
              if (err) {
                return reject(err);
              }
              return resolve(result);
            }
          );
        });
      };

      // Bitcoin
      userBtcClient.transfer = async (transferParams) => {
        console.log("userBtcClient.transfer", transferParams);
        return new Promise((resolve, reject) => {
          window.xfi.bitcoin.request(
            {
              method: "transfer",
              params: [
                {
                  ...transferParams,
                  from: btcAddress,
                  amount: {
                    amount: 500,
                    decimals: 8,
                  },
                },
              ],
            },
            (err, result) => {
              if (err) {
                return reject(err);
              }
              return resolve(result);
            }
          );
        });
      };

      // BCH
      userbchClient.transfer = async (transferParams) => {
        console.log("userbchClient.transfer", transferParams);
        return new Promise((resolve, reject) => {
          window.xfi.bitcoincash.request(
            {
              method: "transfer",
              params: [
                {
                  ...transferParams,
                  from: bchAddress,
                  amount: {
                    amount: transferParams.amount.amount().toString(),
                    decimals: transferParams.amount.decimal,
                  },
                },
              ],
            },
            (err, result) => {
              if (err) {
                return reject(err);
              }
              return resolve(result);
            }
          );
        });
      };
      // Eth
      userEthereumClient.approve = async ({
        // spender,
        // sender,
        spenderAddress,
        contractAddress,
        amount,
        feeOptionKey,
      }) => {
        const gasPrice =
          feeOptionKey &&
          BigNumber.from(
            (
              await userEthereumClient
                .estimateGasPrices()
                .then((prices) => prices[feeOptionKey])
                .catch(() => {
                  const { gasPrices } =
                    estimateDefaultFeesWithGasPricesAndLimits();
                  return gasPrices[feeOptionKey];
                })
            )
              .amount()
              .toFixed()
          );
        const gasLimit = await userEthereumClient
          .estimateApprove({ spenderAddress, contractAddress, amount })
          .catch(() => undefined);

        const txAmount = amount
          ? BigNumber.from(amount.amount().toFixed())
          : BigNumber.from(2).pow(256).sub(1);
        const contract = new ethers.Contract(contractAddress, erc20ABI);
        const unsignedTx = await contract.populateTransaction.approve(
          spenderAddress,
          txAmount,
          {
            from: userEthereumClient.getAddress(),
            gasPrice,
            gasLimit,
          }
        );
        unsignedTx.from = ethAddresses[0];
        return window.ethereum
          .request({
            method: "eth_sendTransaction",
            params: [unsignedTx],
          })
          .then((hash) => {
            return {
              hash,
            };
          });
      };
      const oldWallet = userEthereumClient.getWallet();
      oldWallet.getAddress = async () => ethAddresses[0];
      oldWallet.sendTransaction = (unsignedTx) => {
        unsignedTx.value = hexlify(BigNumber.from(unsignedTx.value || 0));
        return window.ethereum
          .request({
            method: "eth_sendTransaction",
            params: [unsignedTx],
          })
          .then((hash) => {
            return {
              hash,
            };
          });
      };
      oldWallet.signTransaction = (unsignedTx) => {
        unsignedTx.value = hexlify(BigNumber.from(unsignedTx.value || 0));

        return window.ethereum.request({
          method: "eth_signTransaction",
          params: [unsignedTx],
        });
      };
      const newGetWallet = () => {
        return oldWallet;
      };
      userEthereumClient.getWallet = newGetWallet;
      userEthereumClient.transfer = async ({
        asset,
        memo,
        amount,
        recipient,
        feeOptionKey,
        gasPrice,
        gasLimit,
      }) => {
        console.log({
          method: "ethCLient.transfer",
          asset,
          memo,
          amount,
          recipient,
          feeOptionKey,
          gasPrice,
          gasLimit,
        });
        try {
          const txAmount = BigNumber.from(amount.amount().toFixed());

          let assetAddress;
          if (asset && assetToString(asset) !== assetToString(AssetETH)) {
            assetAddress = getTokenAddress(asset);
          }

          const isETHAddress = assetAddress === ETHAddress;

          // feeOptionKey

          const defaultGasLimit = isETHAddress
            ? BigNumber.from(21000)
            : BigNumber.from(100000);

          let overrides = {
            gasLimit: gasLimit || defaultGasLimit,
            gasPrice: gasPrice && BigNumber.from(gasPrice.amount().toFixed()),
          };

          // override `overrides` if `feeOptionKey` is provided
          if (feeOptionKey) {
            const _gasPrice = await userEthereumClient
              .estimateGasPrices()
              .then((prices) => prices[feeOptionKey])
              .catch(
                () =>
                  estimateDefaultFeesWithGasPricesAndLimits().gasPrices[
                    feeOptionKey
                  ]
              );
            const _gasLimit = await userEthereumClient
              .estimateGasLimit({ asset, recipient, amount, memo })
              .catch(() => defaultGasLimit);

            overrides = {
              gasLimit: _gasLimit,
              gasPrice: BigNumber.from(_gasPrice.amount().toFixed()),
            };
          }

          let txResult;
          if (assetAddress && !isETHAddress) {
            // Transfer ERC20
            const contract = new ethers.Contract(assetAddress, erc20ABI);
            const unsignedTx = await contract.populateTransaction.transfer(
              recipient,
              txAmount,
              Object.assign({}, overrides)
            );
            unsignedTx.from = ethAddresses[0];
            txResult = await window.ethereum.request({
              method: "eth_sendTransaction",
              params: [unsignedTx],
            });
          } else {
            // Transfer ETH
            const transactionRequest = Object.assign(
              { to: recipient, value: txAmount },
              {
                ...overrides,
                data: memo ? toUtf8Bytes(memo) : undefined,
              }
            );
            txResult = await window.ethereum.request({
              method: "eth_sendTransaction",
              params: [transactionRequest],
            });
          }

          return txResult.hash || txResult;
        } catch (error) {
          console.error(error);
          return Promise.reject(error);
        }
      };

      userEthereumClient.call = async ({
        walletIndex,
        contractAddress,
        abi,
        funcName,
        funcParams,
      }) => {
        try {
          let params = funcParams ?? [];
          if (!contractAddress) {
            return Promise.reject(new Error("address must be provided"));
          }
          const contract = new ethers.Contract(
            contractAddress,
            abi,
            userEthereumClient.getProvider()
          );
          const txResult = await contract[funcName](...params, {
            from: ethAddresses[0],
          });
          console.log({ txResult });
          return txResult;
        } catch (error) {
          console.error(error);
          console.error("stack");
          return Promise.reject(error);
        }
      };
      // Thor
      userThorchainClient.deposit = async (depositParams) => {
        console.log("userThorchainClient.deposit", depositParams);
        return new Promise((resolve, reject) => {
          window.xfi.thorchain.request(
            {
              method: "deposit",
              params: [
                {
                  ...depositParams,
                  from: thorAddress,
                  amount: {
                    amount: depositParams.amount.amount().toString(),
                    decimals: depositParams.amount.decimal,
                  },
                },
              ],
            },
            (err, result) => {
              if (err) {
                return reject(err);
              }
              return resolve(result);
            }
          );
        });
      };
      userThorchainClient.transfer = async (transferParams) => {
        console.log("userThorchainClient.transfer", transferParams);
        return new Promise((resolve, reject) => {
          window.xfi.thorchain.request(
            {
              method: "transfer",
              params: [
                {
                  ...transferParams,
                  from: thorAddress,
                  amount: {
                    amount: transferParams.amount.amount().toString(),
                    decimals: transferParams.amount.decimal,
                  },
                },
              ],
            },
            (err, result) => {
              if (err) {
                return reject(err);
              }
              return resolve(result);
            }
          );
        });
      };
      // Ltc
      userLtcClient.transfer = async (transferParams) => {
        console.log("userLtcClient.transfer", transferParams);
        return new Promise((resolve, reject) => {
          window.xfi.litecoin.request(
            {
              method: "transfer",
              params: [
                {
                  ...transferParams,
                  from: ltcAddress,
                  amount: {
                    amount: transferParams.amount.amount().toString(),
                    decimals: transferParams.amount.decimal,
                  },
                },
              ],
            },
            (err, result) => {
              if (err) {
                return reject(err);
              }
              return resolve(result);
            }
          );
        });
      };

      console.log({
        thorAddress,
        bnbAddress,
        btcAddress,
        bchAddress,
        ethAddresses,
        ltcAddress,
      });

      const newUser = new User({
        type: "XDEFI",
        wallet: thorAddress,
        clients: {
          binance: userBinanceClient,
          bitcoin: userBtcClient,
          bitcoinCash: userbchClient,
          thorchain: userThorchainClient,
          ethereum: userEthereumClient,
          litecoin: userLtcClient,
        },
      });

      window.xfi.thorchain.on("chainChanged", (obj) => {
        // console.log('changed', obj);
        // const envNetwork =
        //   environment.network === 'testnet' ? 'testnet' : 'mainnet';
        // if (obj.network !== envNetwork) {
        //   // alert("XDEFI: Incorrect network, Reloading");
        //   window.location.reload();
        // }
        window.location.reload();
      });

      return newUser;
    } else {
      alert("Please install XDEFI extension");
    }
  }
  getMockClientByChain(chain) {
    switch (chain) {
      case "BTC":
        return this.mockBtcClient;

      case "ETH":
        return this.mockEthereumClient;

      case "BNB":
        return this.mockBinanceClient;

      case "BCH":
        return this.mockBchClient;

      case "LTC":
        return this.mockLtcClient;

      case "THOR":
        return this.mockThorchainClient;
    }

    throw new Error(`mock client no matching client for chain: ${chain}`);
  }
}
