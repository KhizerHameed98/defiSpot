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
import Images from "./../../Helper/AllImages";
import {
  generatePhrase,
  encryptToKeyStore,
  decryptFromKeystore,
} from "@xchainjs/xchain-crypto";

export const Header = () => {
  const [createKeyStoreModal, setCreateKeyStoreModal] = useState(false);
  const [mainModal, setMainModel] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [response, setResponse] = React.useState("");
  const [fileKeyStore, setFileKeyStore] = useState("");
  const [keyStoreObject, setKeyStoreObject] = useState({});
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

  useEffect(() => {
    // keystore();
  }, []);

  const submitKeyStore = async () => {
    try {
      const phrase = generatePhrase();
      console.log("phrase===>", phrase);
      key = await encryptToKeyStore(phrase, password);
      console.log("key========>", key);

      setResponse(key);
      downloadTextFile();

      return key;
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileRead = async (e) => {
    const content = JSON.parse(fileReader.result);
    console.log(content);
    let res = await decryptFromKeystore(content, password);
    console.log("decryption=====>", res);
    // … do something with the 'content' …
  };
  const decryptKeyStore = async () => {
    // console.log("password====>", password);
    // console.log("fileKeyStroe====>", fileKeyStore);
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(fileKeyStore);

    // let res = decryptFromKeystore(fileKeyStore, password);
    // console.log("decryption=====>", res);
  };
  const downloadTextFile = () => {
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
                      <label for="pwd">Confirm Password:</label>
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
                      />
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
                        className="btn btn-primary"
                        onClick={submitKeyStore}
                      >
                        Create
                      </button>
                      <button
                        className="btn btn-primary ml-3"
                        onClick={decryptKeyStore}
                      >
                        Connect
                      </button>

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
          >
            <div role="document">
              <div class="">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
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
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="d-flex justify-content-center modalparagraph mb-3">
                    <p>
                      To use our platform you will need to connect a wallet.
                      Please choose one of the listed.
                    </p>
                  </div>
                  <h5 style={{ fontSize: "16px" }}>CHOOSE WALLET</h5>
                  <button
                    class="d-flex justify-content-between connectwallet"
                    style={{ width: "100%", background: "none" }}
                  >
                    <a style={{ color: "#23262F", fontSize: "16px" }}>
                      <img style={{ paddingRight: "8px" }} src={walleto} />
                      WALLETCONNECT
                    </a>
                    <img
                      style={{
                        width: "20px",
                        height: "15px",
                        paddingTop: "5px",
                        paddingRight: "10px",
                      }}
                      src={Images.rightarr}
                    />
                  </button>
                  <button
                    class="d-flex justify-content-between connectwallet mt-3"
                    style={{ width: "100%", background: "none" }}
                  >
                    <a style={{ color: "#23262F", fontSize: "16px" }}>
                      <img style={{ paddingRight: "8px" }} src={meta} />
                      METAMASK WALLET
                    </a>
                    <img
                      style={{
                        width: "20px",
                        height: "15px",
                        paddingTop: "5px",
                        paddingRight: "10px",
                      }}
                      src={Images.rightarr}
                    />
                  </button>
                  <button
                    class="d-flex justify-content-between connectwallet mt-3"
                    style={{ width: "100%", background: "none" }}
                  >
                    <a style={{ color: "#23262F", fontSize: "16px" }}>
                      <img style={{ paddingRight: "8px" }} src={defi} />
                      XDEFI WALLET
                    </a>
                    <img
                      style={{
                        width: "20px",
                        height: "15px",
                        paddingTop: "5px",
                        paddingRight: "10px",
                      }}
                      src={Images.rightarr}
                    />
                  </button>

                  <button
                    class="d-flex justify-content-between connectwallet mt-3"
                    style={{ width: "100%", background: "none" }}
                  >
                    {" "}
                    <a style={{ color: "#23262F", fontSize: "16px" }}>
                      <img style={{ paddingRight: "8px" }} src={ledger} />
                      LEDGER
                    </a>
                    <img
                      style={{
                        width: "20px",
                        height: "15px",
                        paddingTop: "5px",
                        paddingRight: "10px",
                      }}
                      src={Images.rightarr}
                    />
                  </button>
                  <button
                    class="d-flex justify-content-between connectwallet mt-3 mb-3"
                    style={{ width: "100%", background: "none" }}
                    // onClick={() => {
                    //   setMainModel(false);
                    //   setCreateKeyStoreModal(true);
                    // }}
                  >
                    {" "}
                    <a style={{ color: "#23262F", fontSize: "16px" }}>
                      CUSTOM KEYSTORE
                    </a>
                    <img
                      style={{
                        width: "20px",
                        height: "15px",
                        paddingTop: "5px",
                        paddingRight: "10px",
                      }}
                      src={Images.rightarr}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- modal end --> */}
        </Modal.Body>
      </Modal>

      <div class="container" style={{ padding: "0px" }}>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to={browserRoute.HOME}>
            <img src={Logo} />
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
                <a class="nav-link" href="#">
                  Earn yield
                </a>
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
              class="mt-2 mr-3"
              style={{
                width: "56px",
                border: "none",
                fontWeight: "bold",
                background: "none",
              }}
            >
              <option>ENG</option>
              <option>ESP</option>
            </select>
            <Link className="navbar-brand" to="/">
              <img src={bell} />
            </Link>
            <Link className="navbar-brand" to="/">
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
    </div>
  );
};
export default Header;
