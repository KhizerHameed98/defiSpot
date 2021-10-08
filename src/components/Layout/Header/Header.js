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
import { useDispatch } from "react-redux";
import Images from "./../../Helper/AllImages";

import {
  createKeyStore,
  connectKeyStore,
  MetaMaskConnection,
} from "../../../Services/mainServices";
export const Header = () => {
  const [createKeyStoreModal, setCreateKeyStoreModal] = useState(false);
  const [connectKeyStoreModal, setConnectKeyStoreModal] = useState(false);
  const [mainModal, setMainModel] = useState(false);
  const [selectionModal, setSelectionModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [response, setResponse] = React.useState("");
  const [fileKeyStore, setFileKeyStore] = useState("");
  const [keyStoreObject, setKeyStoreObject] = useState({});
  const [connectKeyStore_password, setConnectKeyStore_password] = useState("");
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

  const submitKeyStore = async (e) => {
    e.preventDefault();
    disptach(createKeyStore(password, setCreateKeyStoreModal));
  };

  const connectKeyStoreFunction = async (e) => {
    e.preventDefault();
    disptach(connectKeyStore(connectKeyStore_password, fileKeyStore, setConnectKeyStoreModal));
  };
  const connectMetaMask = async () => {
    disptach(MetaMaskConnection(setMainModel));
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
            <div class="">
              <div>
                <div class="modal-header">
                  <button
                    type="button"
                    class="close"
                    aria-label="Close"
                    onClick={() => {
                      setCreateKeyStoreModal(false);
                    }}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="d-flex justify-content-center  mb-3">
                    <h3 style={{ fontFamily: "sans-serif" }}>
                      CREATE KEYSTORE
                    </h3>
                  </div>
                  <div>
                    <div class="form-group">
                      <label for="pwd">Input Password:</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        placeholder="Password"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group">
                      {/* <label for="pwd">Confirm Password:</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                        }}
                        placeholder="Confirm Password"
                        class="form-control"
                        id="pwd"
                        name="password"
                      /> */}
                      {/*file Input*/}
                      {/* <input
                        type="file"
                        className="mt-3"
                        onChange={(e) => {
                          setFileKeyStore(e.target.files[0]);
                        }}
                      /> */}
                    </div>
                    <div class="d-flex justify-content-center">
                      <button
                        className="btn btn-primary"
                        onClick={submitKeyStore}
                      >
                        Create
                      </button>
                      {/* <button
                        className="btn btn-primary ml-3"
                        onClick={decryptKeyStore}
                      >
                        Connect
                      </button> */}

                      {/* <button type="submit" class="btn btn-primary ml-2">
                        Connect Wallet
                      </button> */}
                    </div>
                  </div>
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
        <Modal.Body>
          {/* <!-- Modal --> */}
          <div
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
          >
            <div class="">
              <div>
                <div class="modal-header">
                  <button
                    type="button"
                    class="close"
                    aria-label="Close"
                    onClick={() => {
                      setConnectKeyStoreModal(false);
                    }}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="d-flex justify-content-center  mb-3">
                    <h3 style={{ fontFamily: "sans-serif" }}>
                      CONNECT KEYSTORE
                    </h3>
                  </div>
                  <div>
                    <div class="form-group">
                      <label for="pwd">Input Password:</label>
                      <input
                        type="password"
                        value={connectKeyStore_password}
                        onChange={(e) => {
                          setConnectKeyStore_password(e.target.value);
                        }}
                        placeholder="Password"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group">
                      {/*file Input*/}
                      <input
                        type="file"
                        className="mt-3"
                        onChange={(e) => {
                          setFileKeyStore(e.target.files[0]);
                        }}
                      />
                    </div>
                    <div class="d-flex justify-content-center">
                      <button
                        className="btn btn-primary ml-3"
                        onClick={connectKeyStoreFunction}
                      >
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- modal end --> */}
        </Modal.Body>
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
                      fontSize: "30px",
                    }}
                  >
                    Connect wallet
                  </h5>
                  <button
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
                  </button>
                </div>
                <div class="modal-body">
                  <div class="d-flex justify-content-center modalparagraph mb-3">
                    <p
                      style={{
                        color: "#777E90",
                        fontSize: "17px",
                        fontFamily: "DM Sans",
                      }}
                    >
                      To use our platform you will need to connect a wallet.
                      Please choose one of the listed.
                    </p>
                  </div>
                  <h5
                    style={{
                      fontSize: "17px",
                      color: "#B1B5C3",
                      fontFamily: "DM Sans",
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
                          fontSize: "16px",
                          paddingLeft: "5px",
                          fontWeight: "600",
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
                          fontSize: "16px",
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
                          fontSize: "16px",
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
                        style={{ paddingRight: "4px", paddingLeft: "7px" }}
                        src={ledger}
                      />
                      <a
                        style={{
                          color: "#23262F",
                          fontSize: "16px",
                          paddingLeft: "15px",
                          fontWeight: "600",
                        }}
                      >
                        LEDGER
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
                        fontSize: "16px",
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
                      fontFamily: "sans-serif",
                      fontWeight: "bold",
                      fontSize: "30px",
                    }}
                  >
                    Select
                  </h5>
                  <button
                    type="button"
                    class="close"
                    aria-label="Close"
                    onClick={() => {
                      setSelectionModal(false);
                    }}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="d-flex justify-content-center modalparagraph mb-3">
                    <p style={{ color: "#777E90", fontWeight: "600" }}>
                      Please choose one of the listed.
                    </p>
                  </div>
                  <h5
                    style={{
                      fontSize: "16px",
                      color: "#B1B5C3",
                      fontFamily: "Sans-sarif",
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
                          fontSize: "16px",
                          paddingLeft: "5px",
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
                          fontSize: "16px",
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
          <Link className="navbar-brand" to={browserRoute.HOME}>
            <img
              style={{
                width: "115px",
                borderRight: "1px solid #E6E8EC",
                paddingRight: "15px",
              }}
              src={Images.defilogo}
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
                  Earn Yield
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
                <div class="d-flex">
                  <a class="nav-link" href="#">
                    Learn
                  </a>
                  <img
                    class="pt-4"
                    style={{ height: "40px" }}
                    src={headerdown}
                  />
                </div>
              </li>
            </ul>
            <select
              class="mt-2 mr-4 styled-select"
              style={{
                width: "70px",
                listStyle: "none",
                border: "none",
                fontWeight: "bold",
                background: "none",
                fontFamily: "DM Sans",
              }}
            >
              <option style={{ color: "#23262F" }}>ENG</option>
              <option style={{ color: "#23262F" }}>ESP</option>
            </select>
            <Link className="navbar-brand pr-3" to="/">
              <img src={bell} />
            </Link>
            <Link className="navbar-brand pr-3" to="/">
              <img src={doticon} />
            </Link>

            <button
              class="btn walletbutton my-2 my-sm-0"
              type="submit"
              onClick={() => {
                setMainModel(true);
              }}
            >
              Wallet
            </button>
          </div>
        </nav>
      </div>
      <hr className="solid" />
    </div>
  );
};
export default Header;
