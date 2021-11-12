import React, { useState, useEffect } from "react";
import Logo from "../../../assets/images/logo.png";
import headerdown from "../../../assets/images/headerdown.png";
import doticon from "../../../assets/images/doticon.png";
import bell from "../../../assets/images/bell.png";
import walleto from "../../../assets/images/walleto.png";
import meta from "../../../assets/images/meta.png";
import defi from "../../../assets/images/defi.png";
import ledger from "../../../assets/images/ledger.png";
import browserRoute from "../../../Routes/browserRoutes";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Images from "./../../Helper/AllImages";
import Darkmode from "darkmode-js";

import { LOGOUT } from "../../../Redux/actions/types";

import {
  createKeyStore,
  connectKeyStore,
  MetaMaskConnection,
  handleMainModal,
  handleLogout,
} from "../../../Services/mainServices";
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
    disptach(handleMainModal(val));
  };
  const submitKeyStore = async () => {
    disptach(createKeyStore(password, setCreateKeyStoreModal));
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
  const connectMetaMask = async () => {
    disptach(MetaMaskConnection(setMainModel));
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
        option[i].innerHTML = "English";
      }
      if (option[i].innerHTML === "RU") {
        option[i].innerHTML = "Russian";
      }
      if (option[i].innerHTML === "VIE") {
        option[i].innerHTML = "Vietnamese";
      }
    }
    // setSelectedLang(event.target.value);
  };

  const handleAbort = () => {
    const option = document.getElementsByClassName("option");
    for (let i = 0; i < option.length; i++) {
      console.log("options=======", option[i].innerHTML);
      // if(option[i])
      if (option[i].innerHTML === "English") {
        option[i].innerHTML = "ENG";
      }
      if (option[i].innerHTML === "Russian") {
        option[i].innerHTML = "RU";
      }
      if (option[i].innerHTML === "Vietnamese") {
        option[i].innerHTML = "VIE";
      }
    }
  };

  const handleDisconnect = () => {
    disptach(handleLogout());
  };

  return (
    <div>
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
                      class=""
                      style={{
                        height: "10px",
                        marginTop: "15px",
                        paddingRight: "12px",
                      }}
                      src={Images.lefttwoline}
                    />
                    <p class="yahparagraph">Create Keystore</p>
                  </div>

                  <div>
                    <img
                      className="popupcrosss"
                      onClick={() => {
                        setConnectKeyStoreModal(false);
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
                      style={{ borderRadius: "20px" }}
                      type="password"
                      value={password}
                      placeholder="Confirm Password"
                      class="form-control"
                    />
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
                    <button
                      className="btn btn n-secondaryButton mt-3"
                      onClick={connectKeyStore}
                    >
                      Connect Wallet
                    </button>
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
          setConnectKeyStoreModal(false);
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
                        class=""
                        style={{
                          height: "10px",
                          marginTop: "15px",
                          paddingRight: "12px",
                        }}
                        src={Images.lefttwoline}
                      />
                      <p class="yahparagraph">Connect Keystore</p>
                    </div>
                    <div>
                      <img
                        className="popupcrosss"
                        onClick={() => {
                          setConnectKeyStoreModal(false);
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
                      <input
                        type="file"
                        placeholder="choose filesss"
                        onChange={(e) => {
                          setFileKeyStore(e.target.files[0]);
                        }}
                      />
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
                      />
                    </div>
                    <div
                      style={{ marginTop: "32px" }}
                      class="d-flex justify-content"
                    >
                      <button
                        style={{ width: "100%" }}
                        className="btn btn n-primaryButton"
                        onClick={connectKeyStoreFunction}
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
                    class="d-flex justify-content-between connectwallet"
                    style={{ width: "100%", background: "none" }}
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
                    class="d-flex justify-content-between connectwallet mt-3"
                    style={{ width: "100%", background: "none" }}
                    onClick={connectMetaMask}
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
                        METAMASK WALLET
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
                    class="d-flex justify-content-between connectwallet mt-3"
                    style={{ width: "100%", background: "none" }}
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
                    class="d-flex justify-content-between connectwallet mt-3"
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
                    class="d-flex justify-content-between connectwallet mt-3 mb-3"
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
                        class=""
                        style={{
                          height: "10px",
                          marginTop: "15px",
                          paddingRight: "12px",
                        }}
                        src={Images.lefttwoline}
                      />
                      <p class="yahparagraph">Select</p>
                    </div>
                    <div>
                      <img
                        className="popupcrosss"
                        onClick={() => {
                          setConnectKeyStoreModal(false);
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
                    class="d-flex justify-content-between connectwallet"
                    style={{ width: "100%", background: "none" }}
                    onClick={() => {
                      setSelectionModal(false);
                      setCreateKeyStoreModal(true);
                    }}
                  >
                    <div class="d-flex">
                      <a
                        style={{
                          color: "#23262F",
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
                    class="d-flex justify-content-between connectwallet mt-3"
                    style={{ width: "100%", background: "none" }}
                    onClick={() => {
                      setSelectionModal(false);
                      setConnectKeyStoreModal(true);
                    }}
                  >
                    <div class="d-flex">
                      <a
                        style={{
                          color: "#23262F",
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
        <nav class="navbar navbar-expand-lg navbar-light bg-light pb-2">
          <Link
            className="navbar-brand"
            to={browserRoute.HOME}
            style={{ marginRight: "0px" }}
          >
            <img
              style={{
                borderRight: "1px solid #E6E8EC",
                paddingRight: "20px",
                marginRight: "12px",
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

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li className="nav-item">
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
                <div class="d-flex flex-row justify-content-center">
                  <Link
                    to={browserRoute.LEARN}
                    className={
                      "nav-link " +
                      (window.location.href.indexOf(browserRoute.LEARN) !== -1
                        ? "active"
                        : null)
                    }
                  >
                    Learn
                    <img
                      className="w-header-learn-arrow"
                      // src={headerdown}
                      src={Images.iconarowdown}
                    />
                    <ul class="n-learnDropDown" role="menu">
                      <li>
                        <a href="">Algo</a>
                      </li>
                      <li>
                        <a href="">Gate</a>
                      </li>
                      <li>
                        <a href="">Subject</a>
                      </li>
                      <li>
                        <a href="">Practise</a>
                      </li>
                    </ul>
                  </Link>
                </div>
              </li>
            </ul>
            <div class="nav-link">
              <select
                class="select"
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
                // value={selectedLang}
                onChange={handleLanguageChange}
                onClick={handleOnClick}
                onAbort={handleAbort}
              >
                {/* <option
                  className="option"
                  style={{ color: "#23262F" }}
                  selected
                  hidden
                >
                  {selectedLang}
                </option> */}
                <option
                  className="option"
                  style={{ color: "#23262F" }}
                  value="ENG"
                >
                  {selectedLang === "ENG" ? "ENG" : "English"}
                  {/* English */}
                </option>
                <option
                  className="option"
                  style={{ color: "#23262F" }}
                  value="VIE"
                >
                  {/* Vietnamese
                   */}
                  {selectedLang === "VIE" ? "VIE" : "Vietnamese"}
                </option>
                <option
                  className="option"
                  style={{ color: "#23262F" }}
                  value="RU"
                >
                  {/* Russian */}
                  {selectedLang === "RU" ? "RU" : "Russian"}
                </option>
              </select>
              {/* <img
                style={{
                  marginRight: "40px",
                  marginTop: "2px",
                  cursor: "pointer",
                }}
                src={Images.iconarowdown}
              /> */}
              <img
                className="w-header-learn-arrow"
                style={{
                  marginRight: "4px",
                  marginTop: "-1px",
                  cursor: "pointer",
                }}
                // src={headerdown}
                src={Images.iconarowdown}
              />
            </div>
            <Link className="navbar-brand pr-3" to="/">
              <img src={bell} />
            </Link>
            <span className="navbar-brand pr-3" to="/">
              <img
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
