import React, { useState, useEffect, useRef } from "react";

import doticon from "../../../assets/images/doticon.png";
import bell from "../../../assets/images/bell.png";
import walleto from "../../../assets/images/walleto.png";
import meta from "../../../assets/images/meta.png";
import defi from "../../../assets/images/defi.png";
import ledger from "../../../assets/images/ledger.png";
import browserRoute from "../../../Routes/browserRoutes";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Images from "./../../Helper/AllImages";
import Darkmode from "darkmode-js";
import Web3 from "web3";
import {
  createKeyStore,
  connectKeyStore,
  MetaMaskConnection,
  handleMainModal,
  handleLogout,
  WalletConnectConnection,
  XDEFIConnection,
  NGROK,
} from "../../../Services/mainServices";
import axios from "axios";
import { SET_SETTINGS } from "../../../Redux/actions/types";

const web3 = new Web3(window.ethereum);

export const Header = () => {
  const options = {
    bottom: "64px", // default: '32px'
    right: "unset", // default: '32px'
    left: "32px", // default: 'unset'
    time: "0.5s", // default: '0.3s'
    mixColor: "#fff", // default: '#fff'
    backgroundColor: "#fff", // default: '#fff'
    buttonColorDark: "#100f2c", // default: '#100f2c'
    buttonColorLight: "#fff", // default: '#fff'
    saveInCookies: false, // default: true,
    autoMatchOsTheme: true, // default: true
  };
  const darkmode = new Darkmode(options);
  const [loading, setLoading] = useState(false);
  const [createKeyStoreModal, setCreateKeyStoreModal] = useState(false);
  const [connectKeyStoreModal, setConnectKeyStoreModal] = useState(false);
  // const [mainModal, setMainModel] = useState(false);
  const [selectionModal, setSelectionModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [response, setResponse] = React.useState("");
  const [fileKeyStore, setFileKeyStore] = useState("");
  const [keyStoreObject, setKeyStoreObject] = useState({});
  const [selectedLang, setSelectedLang] = useState("ENG");
  const [connectKeyStore_password, setConnectKeyStore_password] = useState("");
  const [title, setTitle] = useState("");
  const [notificationPopup, setNotificationPopup] = useState(false);
  const [languageDropDown, setLanguageDropDown] = useState(false);
  const [learnDropDown, setLearnDropDown] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [xdefiExtension, setXdefiExtension] = useState(false);
  const [passwordEmptyError, setPasswordEmptyError] = useState(false);
  const myRef = useRef();
  const myRefLanguage = useRef();
  const myRefLearn = useRef();
  const hiddenFileInput = useRef(null);
  const [responseMsg, setResponseMsg] = useState("");
  const mainState = useSelector((state) => state.main);
  const mainModal = useSelector((state) => state.main.mainModal);
  const loggedIn = useSelector((state) => state.main.isLoggedin);
  const walletAddress = useSelector((state) => state.main.walletAddress);

  const transactionHistoryModal = useSelector(
    (state) => state.main.transactionHistoryModal
  );
  const transationHash = useSelector((state) => state.main.transactionHash);
  let timeOut;

  const res = "";

  let tHash = "";

  const checkTransaction = async () => {
    console.log("HELLLLLLLLLLLLLLLOOOOO");
    axios.get(`${NGROK}/get/transaction/by/hash/${tHash}`).then((res) => {
      console.log("CHECKING_HASH=============", res);
      clearTimeout(timeOut);
      setResponseMsg(res.data);
    });
  };

  const setNewUserAddress = async () => {
    const data = {
      accountAddress: walletAddress,
    };

    await axios.post(`${NGROK}/add/user`, data).then((res) => {
      console.log("RESSSSS =<><><><<><><><><><><<><><><>>< ", res);
    });
  };

  const getUserSettingsFromAddress = async () => {
    // console.log(addr);
    await axios.get(`${NGROK}/get/user/data/${walletAddress}`).then((res) => {
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

  const addHoldingAsset = async () => {
    const data = {
      accountAddress: mainState?.walletAddress,
      amount: mainState?.overallBalance_USD,
      date: new Date().toString(),
    };
    axios.post(`${NGROK}/add/holding/asset`, data).then((res) => {
      console.log("CHECKING_HOLDING RES=============", res);
    });
  };

  // useEffect(() => {
  //   if (mainState?.walletAddress) {
  //     if (mainState?.walletAddress) {
  //       // setWalletAddressState(walletAddress)
  //     }
  //   }
  // }, [mainState]);

  useEffect(() => {
    if (walletAddress) {
      setNewUserAddress();
      addHoldingAsset();
      getUserSettingsFromAddress();
    }
  }, [walletAddress]);

  // useEffect(() => {
  //   if (transationHash) {
  //     console.log("I am here3 -------------------->");

  //     tHash = transationHash;
  //     console.log("thash-=================", tHash);
  //     timeOut = setTimeout(checkTransaction(tHash), 20000);
  //   }
  // }, [mainState, mainState.transactionHash]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e) {
      if (myRef && myRef.current) {
        const ref = myRef.current;
        if (!ref.contains(e.target)) {
          setNotificationPopup(false);
        }
      }
      if (myRefLanguage && myRefLanguage.current) {
        const ref2 = myRefLanguage.current;
        if (!ref2.contains(e.target)) {
          setLanguageDropDown(false);
        }
      }
      if (myRefLearn && myRefLearn.current) {
        const ref2 = myRefLearn.current;
        if (!ref2.contains(e.target)) {
          setLearnDropDown(false);
        }
      }
    }
  }, []);

  // Crypto Constants for xchain
  const cipher = "aes-128-ctr";
  const kdf = "pbkdf2";
  const prf = "hmac-sha256";
  const dklen = 32;
  const c = 262144;
  const hashFunction = "sha256";
  // const meta = "xchain-keystore";
  let key;
  let fileReader;
  const dispatch = useDispatch();

  // console.log(loggedIn);
  useEffect(() => {
    if (loggedIn) {
      setTitle("Disconnect");
    } else {
      setTitle("Connect");
    }
  }, [loggedIn]);

  const setMainModel = async (val) => {
    const acc = await web3.eth;
    const xdf = await window.xfi;

    // const prov = await window.ethereum.enable();
    // console.log("modal prov==== ", prov);
    // console.log("modal eth==== ", acc);
    // console.log("modal xdf==== ", xdf);

    // const bal = await web3.eth.getBalance(acc[0]);
    // console.log("modal bal==== ", bal);

    if (val == true) {
      const eth = await window.xfi;
      if (
        eth?.binance &&
        eth?.bitcoin &&
        eth?.ethereum &&
        eth?.terra &&
        eth?.thorchain
      ) {
        setXdefiExtension(true);
        dispatch(handleMainModal(val));
      } else {
        dispatch(handleMainModal(val));
      }
    } else {
      setXdefiExtension(false);
      dispatch(handleMainModal(val));
    }
  };
  const submitKeyStore = async () => {
    if (password.length < 1) {
      setPasswordEmptyError(true);
    } else if (password != confirmPassword) {
      setPasswordMatchError(true);
    } else {
      if (!passwordEmptyError && !passwordMatchError) {
        dispatch(createKeyStore(password, setCreateKeyStoreModal));
      } else {
        setPasswordMatchError(true);
      }
    }
  };

  const connectKeyStoreFunction = async () => {
    dispatch(
      connectKeyStore(
        connectKeyStore_password,
        fileKeyStore,
        setConnectKeyStoreModal,
        setLoading
      )
    );
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const connectMetaMask = async () => {
    dispatch(MetaMaskConnection(setMainModel));
  };

  const connectWalletConnect = async () => {
    dispatch(WalletConnectConnection(setMainModel));
  };

  const connectXdefi = async () => {
    setLoading(true);
    dispatch(XDEFIConnection(setMainModel, setLoading));
  };

  const handleLanguageChange = (event) => {
    console.log(event.target.value);
    // const option = document.getElementsByClassName("option");
    // console.log("options=======", option);
    setSelectedLang(event.target.value);
  };
  const handleOnClick = (event) => {
    console.log(event.target.value);
    const option = document.getElementsByClassName("option");
    for (let i = 0; i < option.length; i++) {
      console.log("options=======", option[i].innerHTML);
      // if(option[i])
      if (option[i].innerHTML === "ENG") {
        option[i].innerHTML = "ENG";
      }
      if (option[i].innerHTML === "RU") {
        option[i].innerHTML = "RU";
      }
      if (option[i].innerHTML === "VIE") {
        option[i].innerHTML = "VIE";
      }
    }
    // setSelectedLang(event.target.value);
  };

  const handleAbort = () => {
    const option = document.getElementsByClassName("option");
    for (let i = 0; i < option.length; i++) {
      console.log("options=======", option[i].innerHTML);
      // if(option[i])
      if (option[i].innerHTML === "ENG") {
        option[i].innerHTML = "ENG";
      }
      if (option[i].innerHTML === "RU") {
        option[i].innerHTML = "RU";
      }
      if (option[i].innerHTML === "VIE") {
        option[i].innerHTML = "VIE";
      }
    }
  };

  const handleDisconnect = () => {
    dispatch(handleLogout());
  };

  const enterKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (connectKeyStore_password.length > 0) {
        if (fileKeyStore?.name) connectKeyStoreFunction();
      }
    }
  };

  const enterKeyDownNewPswd = (e) => {
    if (e.keyCode === 13) {
      if (password.length < 1) {
        setPasswordEmptyError(true);
      } else {
        if (password != confirmPassword) {
          setPasswordMatchError(true);
        } else {
          setPasswordMatchError(false);
          submitKeyStore();
        }
      }
    }
  };

  return (
    <div style={{ backgroundColor: "#fcfcfd" }} class="n-navbarContainer">
      {transactionHistoryModal && (
        <div
          style={{
            position: "fixed",
            right: "50px",
            top: "40px",
            width: "400px",
            padding: "26px",
            height: "auto",
            backgroundColor: "lightgray",
            zIndex: "999",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>Transaction is Pending</div>
        </div>
      )}
      {/* <!-- Create KeyStore Modal  --> */}
      <Modal
        show={createKeyStoreModal}
        onHide={() => {
          setCreateKeyStoreModal(false);
        }}
        // backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          {/* <!-- Modal --> */}
          <div
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
          >
            <div>
              <div class="modal-body">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    {/* <img
                      className="backArrow"
                      style={{
                        height: "10px",
                        marginTop: "15px",
                        paddingRight: "12px",
                      }}
                      src={Images.lefttwoline}
                      onClick={() => {
                        setCreateKeyStoreModal(false);
                        setSelectionModal(true);
                        // setMainModel(true);
                      }}
                    /> */}
                    <svg
                      className="backArrow mr-2"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => {
                        setCreateKeyStoreModal(false);
                        setSelectionModal(true);
                      }}
                      style={{
                        marginTop: "2px",
                      }}
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18.9428 10.3905C19.4635 10.9112 19.4635 11.7554 18.9428 12.2761L15.219 16L18.9428 19.7239C19.4635 20.2446 19.4635 21.0888 18.9428 21.6095C18.4221 22.1302 17.5779 22.1302 17.0572 21.6095L12.3905 16.9428C11.8698 16.4221 11.8698 15.5779 12.3905 15.0572L17.0572 10.3905C17.5779 9.86983 18.4221 9.86983 18.9428 10.3905Z"
                        fill="#23262F"
                      />
                    </svg>
                    <p class="yahparagraph">Create Keystore</p>
                  </div>

                  <div>
                    {/* <img
                      className="popupcrosss"
                      onClick={() => {
                        setCreateKeyStoreModal(false);
                      }}
                      src={Images.crossicon}
                    /> */}
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="n-modalCloseIcon"
                      onClick={() => {
                        setCreateKeyStoreModal(false);
                      }}
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                        fill="#23262F"
                      />
                      <rect
                        x="1"
                        y="1"
                        width="38"
                        height="38"
                        rx="19"
                        stroke="#E6E8EC"
                        stroke-width="2"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <div
                    style={{ marginTop: "32px", fontFamily: "Poppins" }}
                    class="form-group"
                  >
                    <label for="pwd" style={{ color: "#777e90" }}>
                      Input Password
                    </label>
                    <input
                      autoComplete="new-password"
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      placeholder="Enter Password"
                      class="form-control n-connectModalInput"
                      onFocus={() => setPasswordEmptyError(false)}
                      onBlur={() =>
                        password.length < 1
                          ? setPasswordEmptyError(true)
                          : setPasswordEmptyError(false)
                      }
                    />
                    {passwordEmptyError && (
                      <div
                        style={{
                          fontSize: "10px",
                          marginLeft: "14px",
                          color: "red",
                        }}
                      >
                        Password is required
                      </div>
                    )}
                  </div>
                  <div
                    style={{ marginTop: "32px", fontFamily: "Poppins" }}
                    class="form-group"
                  >
                    <label for="pwd" style={{ color: "#777e90" }}>
                      Confirm Password
                    </label>
                    <input
                      autoComplete="new-password"
                      type="password"
                      value={confirmPassword}
                      placeholder="Confirm Password"
                      class="form-control n-connectModalInput"
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      onFocus={() => setPasswordMatchError(false)}
                      onBlur={() =>
                        password != confirmPassword
                          ? setPasswordMatchError(true)
                          : setPasswordMatchError(false)
                      }
                      onKeyDown={enterKeyDownNewPswd}
                    />
                    {passwordMatchError && (
                      <div
                        style={{
                          fontSize: "10px",
                          marginLeft: "14px",
                          color: "red",
                        }}
                      >
                        Passwords do not match
                      </div>
                    )}
                  </div>
                  <div
                    style={{ marginTop: "32px", display: "grid" }}
                    className="display-grid justify-content"
                  >
                    <button
                      className="btn btn n-primaryButton n-primaryDark"
                      onClick={submitKeyStore}
                    >
                      Create
                    </button>
                    {/* <button
                      className="btn btn n-secondaryButton mt-3"
                      onClick={connectKeyStore}
                    >
                      Connect Wallet
                    </button> */}
                  </div>
                  {/* <button type="submit" class="btn btn-primary ml-2">
                        Connect Wallet
                      </button> */}
                </div>
              </div>
            </div>
          </div>
          {/* <!-- modal end --> */}
        </Modal.Body>
      </Modal>
      {/* <!-- Create KeyStore Modal END  --> */}

      {/* <!-- Connect KeyStore Modal  --> */}
      <Modal
        show={connectKeyStoreModal}
        onHide={() => {
          if (loading) {
            setConnectKeyStoreModal(false);
            window.location.reload();
          } else {
            setConnectKeyStoreModal(false);
          }
        }}
        // backdrop="static"
        keyboard={false}
      >
        <>
          {/* <!-- Modal --> */}
          <div
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
          >
            <div class="modal-body">
              <div>
                <div class="modal-body">
                  <div class="d-flex justify-content-between">
                    <div class="d-flex">
                      {/* <img
                        className="backArrow"
                        style={{
                          height: "10px",
                          marginTop: "15px",
                          paddingRight: "12px",
                        }}
                        src={Images.lefttwoline}
                        onClick={() => {
                          if (loading) {
                            setConnectKeyStoreModal(false);
                            window.location.reload();
                          } else {
                            setConnectKeyStoreModal(false);
                            setSelectionModal(true);
                          }
                        }}
                      /> */}
                      <svg
                        className="backArrow mr-2"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          if (loading) {
                            setConnectKeyStoreModal(false);
                            window.location.reload();
                          } else {
                            setConnectKeyStoreModal(false);
                            setSelectionModal(true);
                          }
                        }}
                        style={{
                          marginTop: "2px",
                        }}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M18.9428 10.3905C19.4635 10.9112 19.4635 11.7554 18.9428 12.2761L15.219 16L18.9428 19.7239C19.4635 20.2446 19.4635 21.0888 18.9428 21.6095C18.4221 22.1302 17.5779 22.1302 17.0572 21.6095L12.3905 16.9428C11.8698 16.4221 11.8698 15.5779 12.3905 15.0572L17.0572 10.3905C17.5779 9.86983 18.4221 9.86983 18.9428 10.3905Z"
                          fill="#23262F"
                        />
                      </svg>
                      <p class="yahparagraph">Connect Keystore</p>
                    </div>
                    <div>
                      {/* <img
                        className="popupcrosss"
                        onClick={() => {
                          if (loading) {
                            setConnectKeyStoreModal(false);
                            window.location.reload();
                          } else {
                            setConnectKeyStoreModal(false);
                          }
                        }}
                        src={Images.crossicon}
                      /> */}
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="n-modalCloseIcon"
                        onClick={() => {
                          if (loading) {
                            setConnectKeyStoreModal(false);
                            window.location.reload();
                          } else {
                            setConnectKeyStoreModal(false);
                          }
                        }}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                          fill="#23262F"
                        />
                        <rect
                          x="1"
                          y="1"
                          width="38"
                          height="38"
                          rx="19"
                          stroke="#E6E8EC"
                          stroke-width="2"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div
                      style={{ marginTop: "32px", fontFamily: "Poppins" }}
                      class="form-group"
                    >
                      {/*file Input*/}
                      <label for="file" style={{ color: "#777e90" }}>
                        Please Select Keystore File
                      </label>
                      <div>
                        <Button className="btnHoverWhite" onClick={handleClick}>
                          Choose File
                        </Button>
                        <input
                          ref={hiddenFileInput}
                          style={{ display: "none" }}
                          type="file"
                          accept=".txt"
                          placeholder="choose filesss"
                          onChange={(e) => {
                            setFileKeyStore(e.target.files[0]);
                          }}
                        />
                        <label style={{ marginLeft: "4px", color: "#777e90" }}>
                          {fileKeyStore.name
                            ? fileKeyStore.name
                            : "No file chosen"}
                        </label>
                      </div>
                    </div>
                    <div
                      style={{ marginTop: "32px", fontFamily: "Poppins" }}
                      class="form-group"
                    >
                      <label for="pwd" style={{ color: "#777e90" }}>
                        Decryption password
                      </label>
                      <input
                        type="password"
                        value={connectKeyStore_password}
                        onChange={(e) => {
                          setConnectKeyStore_password(e.target.value);
                        }}
                        placeholder="Password"
                        class="form-control n-connectModalInput"
                        onKeyDown={enterKeyDown}
                      />
                    </div>
                    <div
                      style={{ marginTop: "32px" }}
                      class="d-flex justify-content"
                    >
                      <button
                        style={{ width: "100%" }}
                        className="btn btn n-primaryButton n-primaryDark"
                        onClick={
                          connectKeyStore_password.length > 0
                            ? fileKeyStore?.name
                              ? connectKeyStoreFunction
                              : null
                            : null
                        }
                      >
                        Connect
                        {loading ? (
                          <div
                            class="spinner-border"
                            style={{
                              height: "20px",
                              width: "20px",
                              marginLeft: "10px",
                            }}
                            role="status"
                          ></div>
                        ) : null}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- modal end --> */}
        </>
      </Modal>
      {/* <!-- Connect KeyStore Modal END  --> */}

      {/* <!-- Main Modal  --> */}

      <Modal
        show={mainModal}
        onHide={() => {
          setMainModel(false);
        }}
        // backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          {/* <!-- Main Modal  --> */}
          <div
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingBottom: "20px",
            }}
          >
            <div role="document">
              <div class="">
                <div class="modal-header" style={{ border: "none" }}>
                  <h5
                    class="modal-title n-modalHeader"
                    id="exampleModalLabel"
                    style={{
                      // color: "#23262F",
                      fontFamily: "DM Sans",
                      fontWeight: "bold",
                      fontSize: "32px",
                    }}
                  >
                    Connect wallet
                  </h5>
                  {/* <button
                    type="button"
                    class="close"
                    aria-label="Close"
                    onClick={() => {
                      setMainModel(false);
                    }}
                  >
                    <span className="popupcrosss" aria-hidden="true">
                      &times;
                    </span>
                  </button> */}
                  {/* <img
                    className="popupcrosss"
                    onClick={() => {
                      setMainModel(false);
                    }}
                    src={Images.crossicon}
                  /> */}
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="n-modalCloseIcon"
                    onClick={() => {
                      setMainModel(false);
                    }}
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                      fill="#23262F"
                    />
                    <rect
                      x="1"
                      y="1"
                      width="38"
                      height="38"
                      rx="19"
                      stroke="#E6E8EC"
                      stroke-width="2"
                    />
                  </svg>
                </div>
                <div class="modal-body">
                  <div class="d-flex justify-content-center modalparagraph mb-3">
                    <p
                      style={{
                        color: "#777E90",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Poppins",
                      }}
                    >
                      To use our platform you will need to connect a wallet.
                      Please choose one of the listed.
                    </p>
                  </div>
                  <h5
                    style={{
                      fontSize: "12px",
                      color: "#B1B5C3",
                      fontWeight: "400",
                      fontFamily: "Poppins",
                      paddingBottom: "10px",
                      paddingTop: "10px",
                    }}
                  >
                    CHOOSE WALLET
                  </h5>
                  <button
                    class="d-flex justify-content-between connectwallet btnHoverWhite"
                    style={{ width: "100%", background: "none" }}
                    onClick={connectWalletConnect}
                  >
                    <div class="d-flex">
                      <img style={{ paddingRight: "8px" }} src={walleto} />
                      <a
                        class="n-walletType"
                        style={{
                          // color: "#23262F",
                          fontSize: "14px",
                          fontFamily: "Poppins",
                          paddingLeft: "5px",
                          fontWeight: "600",
                          paddingTop: "4px",
                        }}
                      >
                        WALLETCONNECT
                      </a>
                    </div>
                    <img
                      style={{
                        width: "16px",
                        height: "15px",
                        paddingTop: "8px",
                        paddingRight: "10px",
                      }}
                      src={Images.moreright}
                    />
                  </button>
                  <button
                    class="d-flex justify-content-between connectwallet btnHoverWhite mt-3"
                    style={{
                      width: "100%",
                      background: "none",
                    }}
                    onClick={xdefiExtension ? null : connectMetaMask}
                  >
                    <div class="d-flex">
                      <img style={{ paddingRight: "8px" }} src={meta} />
                      <a
                        class="n-walletType"
                        style={{
                          // color: "#23262F",
                          fontSize: "14px",
                          fontFamily: "Poppins",
                          paddingLeft: "10px",
                          fontWeight: "600",
                        }}
                      >
                        {xdefiExtension
                          ? "DISABLE XDEFI WALLET"
                          : "METAMASK WALLET"}
                      </a>
                    </div>
                    <img
                      style={{
                        width: "16px",
                        height: "15px",
                        paddingTop: "8px",
                        paddingRight: "10px",
                      }}
                      src={Images.moreright}
                    />
                  </button>
                  <button
                    class="d-flex justify-content-between connectwallet btnHoverWhite mt-3"
                    style={{ width: "100%", background: "none" }}
                    onClick={connectXdefi}
                  >
                    <div class="d-flex">
                      <img
                        style={{ paddingRight: "6px", paddingLeft: "4px" }}
                        src={defi}
                      />
                      <a
                        class="n-walletType"
                        style={{
                          // color: "#23262F",
                          fontSize: "14px",
                          fontFamily: "Poppins",
                          paddingLeft: "14px",
                          fontWeight: "600",
                        }}
                      >
                        XDEFI WALLET
                      </a>
                    </div>
                    {loading ? (
                      <div
                        class="spinner-border"
                        style={{
                          height: "20px",
                          width: "20px",
                          // marginLeft: "10px",
                          marginRight: "10px",
                        }}
                        role="status"
                      ></div>
                    ) : (
                      <img
                        style={{
                          width: "16px",
                          height: "15px",
                          paddingTop: "8px",
                          paddingRight: "10px",
                        }}
                        src={Images.moreright}
                      />
                    )}
                  </button>

                  {/* <button
                    class="d-flex justify-content-between connectwallet btnHoverWhite mt-3"
                    style={{ width: "100%", background: "none" }}
                  >
                    {" "}
                    <div class="d-flex">
                      <img
                        style={{
                          paddingRight: "5px",
                          paddingLeft: "8px",
                          height: "20px",
                          width: "30px",
                          paddingTop: "3px",
                        }}
                        src={ledger}
                      />
                      <a
                        style={{
                          color: "#23262F",
                          fontSize: "14px",
                          paddingLeft: "15px",
                          fontFamily: "Poppins",
                          fontWeight: "600",
                        }}
                      >
                        LEDGER
                      </a>
                    </div>
                    <img
                      style={{
                        width: "16px",
                        height: "16px",
                        paddingTop: "8px",
                        paddingRight: "10px",
                      }}
                      src={Images.moreright}
                    />
                  </button> */}
                  <button
                    class="d-flex justify-content-between connectwallet btnHoverWhite mt-3 mb-3"
                    style={{ width: "100%", background: "none" }}
                    onClick={() => {
                      setMainModel(false);
                      setSelectionModal(true);
                    }}
                  >
                    {" "}
                    <a
                      class="n-walletType"
                      style={{
                        // color: "#23262F",
                        fontSize: "14px",
                        fontFamily: "Poppins",
                        fontWeight: "600",
                      }}
                    >
                      CUSTOM KEYSTORE
                    </a>
                    <img
                      style={{
                        width: "16px",
                        height: "15px",
                        paddingTop: "8px",
                        paddingRight: "10px",
                      }}
                      src={Images.moreright}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- modal end --> */}
        </Modal.Body>
      </Modal>

      {/* <!-- Selection Modal  --> */}

      <Modal
        show={selectionModal}
        onHide={() => {
          setSelectionModal(false);
        }}
        // backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          {/* <!-- Main Modal  --> */}
          <div
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div role="document">
              <div class="">
                <div class="modal-body">
                  <div class="d-flex justify-content-between">
                    <div class="d-flex">
                      {/* <img
                        className="backArrow"
                        style={{
                          height: "10px",
                          marginTop: "15px",
                          paddingRight: "12px",
                        }}
                        src={Images.lefttwoline}
                        onClick={() => {
                          setSelectionModal(false);
                          setMainModel(true);
                        }}
                      /> */}
                      <svg
                        className="backArrow mr-2"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          setSelectionModal(false);
                          setMainModel(true);
                        }}
                        style={{
                          marginTop: "2px",
                        }}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M18.9428 10.3905C19.4635 10.9112 19.4635 11.7554 18.9428 12.2761L15.219 16L18.9428 19.7239C19.4635 20.2446 19.4635 21.0888 18.9428 21.6095C18.4221 22.1302 17.5779 22.1302 17.0572 21.6095L12.3905 16.9428C11.8698 16.4221 11.8698 15.5779 12.3905 15.0572L17.0572 10.3905C17.5779 9.86983 18.4221 9.86983 18.9428 10.3905Z"
                          fill="#23262F"
                        />
                      </svg>
                      <p class="yahparagraph">Select</p>
                    </div>
                    <div>
                      {/* <img
                        className="popupcrosss"
                        onClick={() => {
                          setSelectionModal(false);
                        }}
                        src={Images.crossicon}
                      /> */}
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="n-modalCloseIcon"
                        onClick={() => {
                          setSelectionModal(false);
                        }}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                          fill="#23262F"
                        />
                        <rect
                          x="1"
                          y="1"
                          width="38"
                          height="38"
                          rx="19"
                          stroke="#E6E8EC"
                          stroke-width="2"
                        />
                      </svg>
                    </div>
                  </div>
                  <div
                    style={{ marginTop: "32px" }}
                    class="d-flex justify-content"
                  >
                    <p style={{ color: "#777E90", fontWeight: "600" }}>
                      Please choose one of the listed.
                    </p>
                  </div>
                  <h5
                    style={{
                      fontSize: "16px",
                      color: "#B1B5C3",
                      marginTop: "32px",
                      marginBottom: "32px",
                      fontFamily: "Poppins",
                    }}
                  >
                    CHOOSE WALLET
                  </h5>
                  <button
                    class="d-flex justify-content-between connectwalletss btnHoverBlue"
                    style={{ width: "100%", background: "none" }}
                    onClick={() => {
                      setSelectionModal(false);
                      setCreateKeyStoreModal(true);
                    }}
                  >
                    <div class="d-flex">
                      <a
                        class="n-walletType"
                        style={{
                          // color: "#23262F",
                          fontSize: "14px",
                          paddingLeft: "5px",
                          fontFamily: "Poppins",
                          fontWeight: "600",
                        }}
                      >
                        Create KeyStore
                      </a>
                    </div>
                    <img
                      style={{
                        width: "16px",
                        height: "15px",
                        paddingTop: "8px",
                        paddingRight: "10px",
                      }}
                      src={Images.moreright}
                    />
                  </button>
                  <button
                    class="d-flex justify-content-between connectwalletss mt-3 btnHoverBlue"
                    style={{ width: "100%", background: "none" }}
                    onClick={() => {
                      setSelectionModal(false);
                      setConnectKeyStoreModal(true);
                    }}
                  >
                    <div class="d-flex">
                      <a
                        class="n-walletType"
                        style={{
                          // color: "#23262F",
                          fontSize: "14px",
                          fontFamily: "Poppins",
                          paddingLeft: "10px",
                          fontWeight: "600",
                        }}
                      >
                        Connect KeyStore
                      </a>
                    </div>

                    <img
                      style={{
                        width: "16px",
                        height: "15px",
                        paddingTop: "8px",
                        paddingRight: "10px",
                      }}
                      src={Images.moreright}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- modal end --> */}
        </Modal.Body>
      </Modal>

      <div class="container n-navbarContainer" style={{ padding: "0px" }}>
        <nav
          class="navbar navbar-expand-lg navbar-light"
          style={{
            backgroundColor: "#fcfcfd",
            // height: "80px",
            padding: "20px 0px",
            margin: "0px 15px",
          }}
        >
          <Link
            className="navbar-brand"
            to={browserRoute.HOME}
            // style={{ marginRight: "0px", borderRight: "1px solid #E6E8EC" }}
            class="n-defiLogo"
          >
            <svg
              width="141"
              height="34"
              viewBox="0 0 141 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4768 0.181053C7.9099 0.740967 5.81282 1.8496 3.99077 3.60772C-0.627401 8.07583 -1.24621 14.0781 2.18017 21.077C3.75012 24.3021 6.68374 28.2327 9.85801 31.3906C12.1843 33.7087 12.5624 33.9214 13.6511 33.6639C14.1209 33.5407 14.396 33.3391 15.5648 32.2305C21.3404 26.7097 25.0533 20.7299 26.0732 15.3099C26.2794 14.2237 26.2794 11.3345 26.0732 10.3827C25.1908 6.20572 22.5666 2.93583 18.6818 1.13291C16.8712 0.293036 15.7826 0.0690708 13.4563 0.0130794C11.7947 -0.0205154 11.279 0.00188117 10.4768 0.181053ZM15.0606 6.81043C16.367 7.15757 17.1806 7.6391 18.212 8.64694C19.2319 9.63239 19.8392 10.629 20.1486 11.7937C20.4122 12.7903 20.3893 14.6828 20.1028 15.7914C19.4725 18.2551 17.5702 21.2226 14.946 23.843L13.7428 25.0524H13.1813H12.6083L11.4509 23.9102C8.98709 21.4466 7.21088 18.7814 6.40871 16.3178C6.15661 15.5787 6.07639 15.0635 6.03055 14.0333C5.96179 12.432 6.08785 11.7825 6.71812 10.5059C7.32547 9.27405 8.65477 7.93025 9.82364 7.35914C11.5196 6.54167 13.3761 6.3513 15.0606 6.81043Z"
                fill="#3772FF"
              />
              <path
                d="M79.0618 5.83629C78.8784 5.92588 78.5805 6.12745 78.4086 6.30662C77.6064 7.15769 77.6752 8.3447 78.5919 9.12858C79.0961 9.56531 79.3826 9.6437 80.2535 9.57651C81.4224 9.49813 82.11 8.77024 82.11 7.63921C82.11 6.75455 81.8006 6.26183 80.987 5.85869C80.54 5.64592 79.5431 5.63473 79.0618 5.83629Z"
                fill="#23262F"
              />
              <path
                d="M74.0081 5.90351C71.3151 6.29544 69.9514 7.80721 69.9514 10.4052V11.2787H69.1493H68.3471V12.6785V14.067L69.1264 14.1006L69.8941 14.1342L69.9285 19.5318L69.9514 24.9406H71.7277H73.5039V19.5094V14.0782H74.7071H75.9104V12.6785V11.2787H74.7071H73.5039V10.6068C73.5039 9.64372 73.7216 9.19579 74.329 8.92704C74.604 8.80386 75.0394 8.70307 75.3145 8.70307H75.8072L75.7728 7.26969L75.7385 5.84751L75.1655 5.83632C74.8561 5.82512 74.329 5.85871 74.0081 5.90351Z"
                fill="#23262F"
              />
              <path
                d="M89.9825 7.58308C88.9054 7.70626 87.8396 8.0758 87.026 8.60212C86.2353 9.12844 85.7655 9.66596 85.33 10.573C85.055 11.1665 85.0206 11.3457 85.0206 12.5103C85.0206 13.6637 85.055 13.8653 85.3185 14.414C85.7196 15.2539 86.5562 16.049 87.5417 16.5081C87.9771 16.7097 89.3064 17.1912 90.4868 17.5607C92.0453 18.0423 92.7672 18.3334 93.1224 18.591C94.0965 19.3189 94.2799 20.5955 93.5235 21.4353C92.9964 22.0288 92.4005 22.2528 91.3806 22.2528C90.3492 22.2528 89.7648 22.0288 89.2262 21.4241C89.0314 21.2002 88.8022 20.7858 88.7335 20.5171L88.6074 20.0132H86.728H84.8602L84.9175 20.3715C85.1696 21.8609 85.5363 22.5776 86.4759 23.4286C87.6792 24.526 89.2835 25.0524 91.3691 25.0524C93.8788 25.0524 95.6894 24.2461 96.7551 22.6895C97.3625 21.7937 97.6146 20.8418 97.5458 19.5988C97.4885 18.3222 97.1447 17.5831 96.2509 16.7769C95.4487 16.0714 94.8414 15.7914 92.1828 14.9291C89.1918 13.9661 88.6303 13.5406 88.6303 12.2752C88.6303 11.5137 88.9283 11.0209 89.6044 10.629C90.0055 10.405 90.1774 10.3826 91.0597 10.4162C91.9077 10.4498 92.114 10.4946 92.5151 10.7522C93.0308 11.0881 93.4089 11.5921 93.5235 12.0848L93.5923 12.3983H95.506H97.4198L97.3281 11.8608C97.1562 10.7634 96.778 10.0355 95.9759 9.25162C95.1622 8.46774 94.4059 8.04221 93.2714 7.77345C92.3776 7.56068 90.9566 7.4823 89.9825 7.58308Z"
                fill="#23262F"
              />
              <path
                d="M35.9168 16.3739V24.963L39.9047 24.907C44.477 24.851 44.9812 24.7726 46.9064 23.8656C48.8545 22.9361 50.4474 21.0548 50.986 19.0167C51.3068 17.7849 51.41 16.4971 51.2725 15.2653C50.9172 12.141 49.3702 9.94614 46.6314 8.70314C44.901 7.90806 44.7062 7.88566 40.0766 7.84087L35.9168 7.79608V16.3739ZM43.3769 10.7636C44.5343 10.9652 45.474 11.4243 46.1845 12.1186C47.2846 13.1936 47.7315 14.4366 47.7315 16.3739C47.7315 18.3448 47.296 19.5319 46.173 20.5621C44.9583 21.6819 43.7894 22.0291 41.1652 22.0291H39.4692V16.318V10.6068H40.9933C41.8184 10.618 42.8956 10.6852 43.3769 10.7636Z"
                fill="#23262F"
              />
              <path
                d="M134.354 9.59893V11.2787H133.551H132.749V12.6785V14.0782H133.54H134.331L134.376 18.02C134.422 21.7714 134.434 22.0066 134.674 22.5889C135.373 24.3134 136.668 24.9294 139.602 24.9406H141V23.4848V22.029H139.911C138.685 22.029 138.192 21.8722 138.021 21.4019C137.952 21.2451 137.906 19.5654 137.906 17.5945V14.0782H139.453H141V12.6785V11.2787H139.453H137.906V9.59893V7.9192H136.13H134.354V9.59893Z"
                fill="#23262F"
              />
              <path
                d="M58.8587 11.1778C55.3521 11.7042 53.2207 14.3021 53.2092 18.0536C53.1978 20.0021 53.6103 21.3347 54.6302 22.6449C57.0023 25.702 62.2278 26.0155 65.0125 23.272C65.7001 22.6001 66.3532 21.6034 66.571 20.9315L66.6397 20.6852H64.7718H62.8925L62.5258 21.2003C61.46 22.6673 58.8014 22.6784 57.5294 21.2227C57.1398 20.7859 56.8304 20.0581 56.7502 19.4533L56.7158 19.1734L61.8497 19.1398L66.9721 19.1174V17.908C66.9721 15.7243 66.4335 14.3133 65.0927 13.0031C64.2332 12.1633 63.1331 11.5474 62.033 11.2898C61.2423 11.1106 59.6838 11.0547 58.8587 11.1778ZM61.6663 14.2462C62.4341 14.6157 63.0185 15.2652 63.2363 15.9931C63.3394 16.3178 63.4196 16.6538 63.4196 16.7322C63.4196 16.8442 62.7664 16.8777 60.0964 16.8777C56.3377 16.8777 56.6012 16.9561 56.9565 15.9595C57.5638 14.1902 59.8213 13.3727 61.6663 14.2462Z"
                fill="#23262F"
              />
              <path
                d="M108.054 11.1218C106.748 11.3233 105.762 11.7937 104.823 12.6559L104.215 13.2158V12.2416V11.2785H102.439H100.663V21.357V31.4354H102.439H104.215V27.2249V23.0255L104.788 23.5742C107.607 26.2842 112.489 25.366 114.288 21.7937C114.964 20.4499 115.147 19.6436 115.147 18.0535C115.147 17.0009 115.09 16.5193 114.884 15.8138C114.082 13.0143 112.008 11.2897 109.234 11.1218C108.776 11.0994 108.249 11.0994 108.054 11.1218ZM108.994 14.2461C111.217 14.8956 112.271 17.7063 111.171 20.0468C110.839 20.7523 110.117 21.4802 109.395 21.8273C108.959 22.0401 108.673 22.0849 107.882 22.0849C107.046 22.0849 106.828 22.0401 106.335 21.7825C104.88 21.0322 104.135 19.6436 104.238 17.8407C104.376 15.2091 106.576 13.5518 108.994 14.2461Z"
                fill="#23262F"
              />
              <path
                d="M122.883 11.1777C120.201 11.5584 118.184 13.1934 117.256 15.7578C116.935 16.6313 116.855 18.7701 117.096 19.8899C117.841 23.3502 121.141 25.5339 124.911 25.0747C128.406 24.638 130.687 22.4432 131.156 19.0389C131.523 16.3177 130.4 13.7197 128.223 12.2975C126.687 11.2897 124.808 10.8977 122.883 11.1777ZM125.163 14.246C125.942 14.47 126.894 15.3211 127.26 16.1161C127.501 16.6425 127.535 16.8776 127.535 18.1094C127.535 19.4196 127.512 19.554 127.214 20.1475C126.183 22.208 123.41 22.8127 121.702 21.3457C120.889 20.6514 120.579 19.8676 120.511 18.4342C120.476 17.5607 120.511 17.0904 120.637 16.6425C121.244 14.638 123.1 13.6525 125.163 14.246Z"
                fill="#23262F"
              />
              <path
                d="M78.2022 18.1096V24.9406H79.9784H81.7546V18.1096V11.2787H79.9784H78.2022V18.1096Z"
                fill="#23262F"
              />
            </svg>

            {/* <img
              style={{
                borderRight: "1px solid #E6E8EC",
                paddingRight: "20px",
                marginRight: "20px",
                width: "120px",
              }}
              src={Images.defilogo}
              src="https://i.ibb.co/kgDCN45/Logo.png"
            /> */}
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* <span class="navbar-toggler-icon"></span> */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66683 10.667C5.93045 10.667 5.3335 11.2639 5.3335 12.0003C5.3335 12.7367 5.93045 13.3337 6.66683 13.3337H25.3335C26.0699 13.3337 26.6668 12.7367 26.6668 12.0003C26.6668 11.2639 26.0699 10.667 25.3335 10.667H6.66683Z"
                fill="#777E91"
              />
              <path
                d="M6.66683 18.667C5.93045 18.667 5.3335 19.2639 5.3335 20.0003C5.3335 20.7367 5.93045 21.3337 6.66683 21.3337H25.3335C26.0699 21.3337 26.6668 20.7367 26.6668 20.0003C26.6668 19.2639 26.0699 18.667 25.3335 18.667H6.66683Z"
                fill="#777E91"
              />
            </svg>
          </button>

          <div
            class="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{ height: "40px" }}
          >
            <ul class="navbar-nav mr-auto n-navbarNav">
              <li className="nav-item d-flex flex-row align-items-center">
                <Link
                  to={browserRoute.MARKET}
                  className={
                    "nav-link " +
                    (window.location.href.indexOf(browserRoute.MARKET) !== -1
                      ? "active"
                      : null)
                  }
                >
                  Market
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  to={browserRoute.EARNYIELD}
                  className={
                    "nav-link " +
                    (window.location.href.indexOf(browserRoute.EARNYIELD) !== -1
                      ? "active"
                      : null)
                  }
                >
                  Earn yield
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  to={browserRoute.PORTFOLIO}
                  className={
                    "nav-link " +
                    (window.location.href.indexOf(browserRoute.PORTFOLIO) !== -1
                      ? "active"
                      : null)
                  }
                >
                  Portfolio
                </Link>
              </li>
              <li class="nav-item">
                <div class="n-menuLearnLink">
                  <Link
                    // to={browserRoute.LEARN}
                    to="#"
                    className={
                      "nav-link nn-learnDropDown" +
                      (window.location.href.indexOf(browserRoute.LEARN) !== -1
                        ? "active"
                        : null)
                    }
                  >
                    <Link className="learn-menuItem" to={browserRoute.LEARN}>
                      Learn
                    </Link>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-header-learn-arrow"
                      ref={myRefLearn}
                      onClick={() => setLearnDropDown(!learnDropDown)}
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.8047 6.5286C10.5444 6.26825 10.1223 6.26825 9.86193 6.5286L8 8.39052L6.13807 6.52859C5.87772 6.26825 5.45561 6.26825 5.19526 6.52859C4.93491 6.78894 4.93491 7.21105 5.19526 7.4714L7.5286 9.80474C7.78894 10.0651 8.21105 10.0651 8.4714 9.80474L10.8047 7.4714C11.0651 7.21105 11.0651 6.78894 10.8047 6.5286Z"
                        fill="#777E91"
                      />
                    </svg>
                    {/* <img
                      ref={myRefLearn}
                      onClick={() => setLearnDropDown(!learnDropDown)}
                      className="w-header-learn-arrow"
                      // src={headerdown}
                      src={Images.iconarowdown}
                    /> */}
                    {/* <div class="n-learnDropDownCap">
                      <img src={Images.cap} />
                    </div> */}
                    {
                      <div className="n-learnMainDropDown">
                        <span class="triangle1"></span>
                        <ul class="n-learnDropDown" role="menu">
                          <li>
                            <a href="">Tutorial</a>
                          </li>
                          <hr />
                          <li>
                            <a href="">Liquidity Providing</a>
                          </li>
                          <hr />
                          <li>
                            <a href="">Trading</a>
                          </li>
                          <hr />
                          <li>
                            <a href="">Wallet</a>
                          </li>
                        </ul>
                      </div>
                    }
                  </Link>
                </div>
              </li>
            </ul>
            <div class="n-languageSelect">
              {/* <select
                class="select n-languageSelect"
                style={{
                  width: "70px",
                  listStyle: "none",
                  border: "none",
                  fontWeight: "bold",
                  background: "none",
                  color: "#23262F",
                  marginRight: "-32px",
                  fontFamily: "DM Sans",
                  cursor: "pointer",
                }}
                value={selectedLang}
                onChange={handleLanguageChange}
                onClick={handleOnClick}
                onAbort={handleAbort}
              > */}
              {/* <option
                  className="option"
                  style={{ color: "#23262F" }}
                  selected
                  hidden
                >
                  {selectedLang}
                </option> */}
              {/* <option
                  className="option"
                  style={{ color: "#23262F" }}
                  value="ENG"
                >
                  {selectedLang === "ENG" ? "ENG" : "ENG"}
                  English
                </option>
                <option
                  className="option"
                  style={{ color: "#23262F" }}
                  value="VIE"
                >
                  Vietnamese
                  {selectedLang === "VIE" ? "VIE" : "VIE"}
                </option>
                <option
                  className="option"
                  style={{ color: "#23262F" }}
                  value="RU"
                >
                  Russian
                  {selectedLang === "RU" ? "RU" : "RU"}
                </option> */}
              {/* </select> */}
              {/* <img
                style={{
                  marginRight: "40px",
                  marginTop: "2px",
                  cursor: "pointer",
                }}
                src={Images.iconarowdown}
              /> */}
              {/* <img
                className="w-header-learn-arrow"
                style={{
                  marginRight: "32px",
                  marginTop: "-1px",
                  cursor: "pointer",
                }}
                // src={headerdown}
                src={Images.iconarowdown}
              /> */}
              {/* New Language DropDown */}
              <div
                onClick={() => setLanguageDropDown(!languageDropDown)}
                ref={myRefLanguage}
              >
                ENG
                {/* <img
                  className="n-languageArrow"
                  // src={headerdown}
                  src={Images.iconarowdown}
                  style={{ marginBottom: "1px" }}
                /> */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginBottom: "2px" }}
                  className="n-languageArrow"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.8047 6.5286C10.5444 6.26825 10.1223 6.26825 9.86193 6.5286L8 8.39052L6.13807 6.52859C5.87772 6.26825 5.45561 6.26825 5.19526 6.52859C4.93491 6.78894 4.93491 7.21105 5.19526 7.4714L7.5286 9.80474C7.78894 10.0651 8.21105 10.0651 8.4714 9.80474L10.8047 7.4714C11.0651 7.21105 11.0651 6.78894 10.8047 6.5286Z"
                    fill="#777E91"
                  />
                </svg>
              </div>
              {/* <div class="n-dropDownCap">
                <img src={Images.cap} />
              </div> */}
              {languageDropDown && (
                <div className="n-languageMainDropDown">
                  <span class="triangle2"></span>
                  <ul class="n-languageDropDown" role="menu">
                    <li>
                      <img src={Images.us} />
                      ENG
                    </li>
                    <hr />
                    <li>
                      <img src={Images.vn} />
                      VIE
                    </li>
                    <hr />
                    <li>
                      <img src={Images.ru} />
                      RU
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div
              className="navbar-brand n-notificationHover position-relative"
              style={{
                height: "40px",
                marginRight: "32px",
                paddingBottom: "41px",
                // cursor: "pointer",
              }}
              onClick={() => setNotificationPopup(!notificationPopup)}
              ref={myRef}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="28" width="12" height="12" rx="6" fill="#58BD7D" />
                <path
                  d="M29 26.0233C29 26.5113 28.6043 26.907 28.1163 26.907H11.8837C11.3957 26.907 11 26.5113 11 26.0233C11 25.5352 11.3957 25.1395 11.8837 25.1395H11.9V18.9809C11.9 14.5729 15.527 11 20 11C24.473 11 28.1 14.5729 28.1 18.9809V25.1395H28.1163C28.6043 25.1395 29 25.5352 29 26.0233ZM13.7 25.1395H26.3V18.9809C26.3 15.5494 23.4794 12.7674 20 12.7674C16.5206 12.7674 13.7 15.5494 13.7 18.9809V25.1395ZM17.976 28.7558C17.7312 28.2608 18.1977 27.7907 18.75 27.7907H21.25C21.8023 27.7907 22.2688 28.2608 22.024 28.7558C21.9155 28.9751 21.7699 29.1773 21.591 29.3529C21.169 29.7672 20.5967 30 20 30C19.4033 30 18.831 29.7672 18.409 29.3529C18.2301 29.1773 18.0845 28.9751 17.976 28.7558Z"
                  fill="#777E91"
                />
              </svg>

              {/* <img src={bell} style={{ cursor: "pointer" }} /> */}
              {/* <div className="n-notificationCap">
                <img src={Images.cap} />
              </div> */}
              {notificationPopup && (
                <div className="n-notificationMainDropDown">
                  <span class="triangle"></span>
                  <div className="n-notificationDropDown">
                    <div className="n-notificationBody">
                      <h5>Notifications</h5>
                      <ul className="n-notificationsList">
                        <li className="d-flex flex-row align-items-start justify-content-between">
                          <div className="n-notificationContent">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                              <h6>Login attempted from new IP</h6>
                              <img src={Images.notificationdot} />
                            </div>
                            <p>2021-03-10 20:19:15</p>
                          </div>
                        </li>
                        <hr />
                        <li className="d-flex flex-row align-items-start justify-content-between">
                          <div className="n-notificationContent">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                              <h6>Login attempted from new IP</h6>
                              <img src={Images.notificationdot} />
                            </div>
                            <p>2021-03-10 20:19:15</p>
                          </div>
                        </li>
                        <hr />
                        <li className="d-flex flex-row align-items-start justify-content-between">
                          <div className="n-notificationContent">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                              <h6>Login attempted from new IP</h6>
                              <img src={Images.notificationdot} />
                            </div>
                            <p>2021-03-10 20:19:15</p>
                          </div>
                        </li>
                      </ul>
                      <div class="n-notificationButtons d-fex flex-row align-items-center w-100">
                        <Link
                          // style={{color:"#fcfcfd"}}
                          to={browserRoute.NOTIFICATIONS}
                          className={
                            "" +
                            (window.location.href.indexOf(
                              browserRoute.NOTIFICATIONS
                            ) !== -1
                              ? ""
                              : null)
                          }
                        >
                          <button class="n-primaryNotifactionButton btnHoverWhite">
                            View all
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <span
              className="navbar-brand"
              to="/"
              style={{ marginRight: "32px", paddingBottom: "11px" }}
            >
              {/* <img
                style={{ cursor: "pointer" }}
                src={doticon}
                onClick={() => {
                  darkmode.toggle();
                }}
              /> */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  darkmode.toggle();
                }}
                class="n-darkThemeToggle"
              >
                <path
                  d="M12 2C11.4477 2 11 2.44772 11 3C11 3.55228 11.4477 4 12 4C12.5523 4 13 3.55228 13 3C13 2.44772 12.5523 2 12 2Z"
                  fill="#777E91"
                />
                <path
                  d="M12 20C11.4477 20 11 20.4477 11 21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21C13 20.4477 12.5523 20 12 20Z"
                  fill="#777E91"
                />
                <path
                  d="M21 11C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13C20.4477 13 20 12.5523 20 12C20 11.4477 20.4477 11 21 11Z"
                  fill="#777E91"
                />
                <path
                  d="M4 12C4 11.4477 3.55228 11 3 11C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13C3.55228 13 4 12.5523 4 12Z"
                  fill="#777E91"
                />
                <path
                  d="M17.6569 4.92903C18.0474 4.53851 18.6806 4.53851 19.0711 4.92903C19.4616 5.31955 19.4616 5.95272 19.0711 6.34324C18.6806 6.73377 18.0474 6.73377 17.6569 6.34324C17.2664 5.95272 17.2664 5.31955 17.6569 4.92903Z"
                  fill="#777E91"
                />
                <path
                  d="M6.34309 17.6568C5.95257 17.2663 5.3194 17.2663 4.92888 17.6568C4.53836 18.0473 4.53836 18.6805 4.92888 19.071C5.3194 19.4616 5.95257 19.4616 6.34309 19.071C6.73362 18.6805 6.73362 18.0473 6.34309 17.6568Z"
                  fill="#777E91"
                />
                <path
                  d="M19.0711 17.6569C19.4616 18.0474 19.4616 18.6806 19.0711 19.0711C18.6806 19.4616 18.0474 19.4616 17.6569 19.0711C17.2664 18.6806 17.2664 18.0474 17.6569 17.6569C18.0474 17.2664 18.6806 17.2664 19.0711 17.6569Z"
                  fill="#777E91"
                />
                <path
                  d="M6.34319 6.34309C6.73371 5.95257 6.73371 5.3194 6.34319 4.92888C5.95266 4.53836 5.3195 4.53836 4.92897 4.92888C4.53845 5.3194 4.53845 5.95257 4.92897 6.34309C5.3195 6.73362 5.95266 6.73362 6.34319 6.34309Z"
                  fill="#777E91"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                  fill="#777E91"
                />
              </svg>
            </span>

            <button
              class="btn n-secondaryButton my-2 my-sm-0 n-secondaryHeaderDark"
              type="submit"
              onClick={() => {
                loggedIn ? handleDisconnect() : setMainModel(true);
              }}
            >
              {title}
              {/* Wallet */}
            </button>
          </div>
        </nav>
      </div>
      <div className="solid solidclasssheader"></div>
    </div>
  );
};
export default Header;
