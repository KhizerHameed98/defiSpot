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
} from "../../../Services/mainServices";

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
  const myRef = useRef();
  const myRefLanguage = useRef();
  const myRefLearn = useRef();
  const hiddenFileInput = useRef(null);

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
  const disptach = useDispatch();

  const mainModal = useSelector((state) => state.main.mainModal);
  const loggedIn = useSelector((state) => state.main.isLoggedin);

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
        disptach(handleMainModal(val));
      } else {
        disptach(handleMainModal(val));
      }
    } else {
      setXdefiExtension(false);
      disptach(handleMainModal(val));
    }
  };
  const submitKeyStore = async () => {
    if (password == confirmPassword) {
      disptach(createKeyStore(password, setCreateKeyStoreModal));
    } else {
      setPasswordMatchError(true);
    }
  };

  const connectKeyStoreFunction = async () => {
    disptach(
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
    disptach(MetaMaskConnection(setMainModel));
  };

  const connectWalletConnect = async () => {
    disptach(WalletConnectConnection(setMainModel));
  };

  const connectXdefi = async () => {
    disptach(XDEFIConnection(setMainModel));
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
    disptach(handleLogout());
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
      if (password.length > 0) {
        if (password != confirmPassword) {
          setPasswordMatchError(true);
        } else {
          setPasswordMatchError(false);
        }
      } else {
      }
    }
  };

  return (
    <div style={{ backgroundColor: "#fcfcfd" }}>
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
              <div class="modal-body u-modalkeystore0999990">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <img
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
                    />
                    <p class="yahparagraph">Create Keystore</p>
                  </div>

                  <div>
                    <img
                      className="popupcrosss"
                      onClick={() => {
                        setCreateKeyStoreModal(false);
                      }}
                      src={Images.crossicon}
                    />
                  </div>
                </div>
                <div>
                  <div
                    style={{ marginTop: "32px", fontFamily: "Poppins" }}
                    class="form-group"
                  >
                    <label for="pwd">Input Password</label>
                    <input
                      autoComplete="new-password"
                      style={{ borderRadius: "20px" }}
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      placeholder="Enter Password"
                      class="form-control"
                    />
                  </div>
                  <div
                    style={{ marginTop: "32px", fontFamily: "Poppins" }}
                    class="form-group"
                  >
                    <label for="pwd">Confirm Password</label>
                    <input
                      autoComplete="new-password"
                      style={{ borderRadius: "20px" }}
                      type="password"
                      value={confirmPassword}
                      placeholder="Confirm Password"
                      class="form-control"
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
                      className="btn btn n-primaryButton"
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
            <div class="">
              <div>
                <div class="modal-body u-modalkeystore0999990">
                  <div class="d-flex justify-content-between">
                    <div class="d-flex">
                      <img
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
                      />
                      <p class="yahparagraph">Connect Keystore</p>
                    </div>
                    <div>
                      <img
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
                      />
                    </div>
                  </div>
                  <div>
                    <div
                      style={{ marginTop: "32px", fontFamily: "Poppins" }}
                      class="form-group"
                    >
                      {/*file Input*/}
                      <label for="file">Please Select Keystore File</label>
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
                        <label style={{ marginLeft: "4px" }}>
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
                      <label for="pwd">Decryption password</label>
                      <input
                        style={{ borderRadius: "20px" }}
                        type="password"
                        value={connectKeyStore_password}
                        onChange={(e) => {
                          setConnectKeyStore_password(e.target.value);
                        }}
                        placeholder="Password"
                        class="form-control"
                        onKeyDown={enterKeyDown}
                      />
                    </div>
                    <div
                      style={{ marginTop: "32px" }}
                      class="d-flex justify-content"
                    >
                      <button
                        style={{ width: "100%" }}
                        className="btn btn n-primaryButton"
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
                    class="modal-title"
                    id="exampleModalLabel"
                    style={{
                      color: "#23262F",
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
                  <img
                    className="popupcrosss"
                    onClick={() => {
                      setMainModel(false);
                    }}
                    src={Images.crossicon}
                  />
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
                        style={{
                          color: "#23262F",
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
                        style={{
                          color: "#23262F",
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
                        style={{
                          color: "#23262F",
                          fontSize: "14px",
                          fontFamily: "Poppins",
                          paddingLeft: "14px",
                          fontWeight: "600",
                        }}
                      >
                        XDEFI WALLET
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
                  </button>
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
                      style={{
                        color: "#23262F",
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
                      <img
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
                      />
                      <p class="yahparagraph">Select</p>
                    </div>
                    <div>
                      <img
                        className="popupcrosss"
                        onClick={() => {
                          setSelectionModal(false);
                        }}
                        src={Images.crossicon}
                      />
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

      <div
        class="container"
        style={{ padding: "0px", backgroundColor: "#FCFCFD" }}
      >
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
            <img
              style={{
                // borderRight: "1px solid #E6E8EC",
                paddingRight: "20px",
                marginRight: "20px",
                width: "120px",
              }}
              // src={Images.defilogo}
              src="https://i.ibb.co/kgDCN45/Logo.png"
            />
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
            <span class="navbar-toggler-icon"></span>
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
                    <img
                      ref={myRefLearn}
                      onClick={() => setLearnDropDown(!learnDropDown)}
                      className="w-header-learn-arrow"
                      // src={headerdown}
                      src={Images.iconarowdown}
                    />
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
                <img
                  className="n-languageArrow"
                  // src={headerdown}
                  src={Images.iconarowdown}
                  style={{ marginBottom: "1px" }}
                />
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
              <img src={bell} style={{ cursor: "pointer" }} />
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
                        <button class="n-primaryNotifactionButton">
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
                            View all
                          </Link>
                        </button>
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
              <img
                style={{ cursor: "pointer" }}
                src={doticon}
                onClick={() => {
                  darkmode.toggle();
                }}
              />
            </span>

            <button
              class="btn n-secondaryButton my-2 my-sm-0"
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
