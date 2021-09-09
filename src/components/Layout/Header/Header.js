import React from "react";
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
import Images from "./../../Helper/AllImages";
export const Header = () => {
  return (
    <div>
      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Connect wallet
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="d-flex justify-content-center modalparagraph mb-3">
                <p>
                  To use our platform you will need to connect a wallet. Please
                  choose one of the listed.
                </p>
              </div>
              <h5 style={{ fontSize: "16px" }}>CHOOSE WALLET</h5>
              <div class="d-flex justify-content-between connectwallet">
                <a style={{ color: "#23262F", fontSize: "16px" }} href="#">
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
              </div>
              <div class="d-flex justify-content-between connectwallet mt-3">
                <a style={{ color: "#23262F", fontSize: "16px" }} href="#">
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
              </div>
              <div class="d-flex justify-content-between connectwallet mt-3">
                <a style={{ color: "#23262F", fontSize: "16px" }} href="#">
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
              </div>

              <div class="d-flex justify-content-between connectwallet mt-3">
                <a style={{ color: "#23262F", fontSize: "16px" }} href="#">
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
              </div>
              <div class="d-flex justify-content-between connectwallet mt-3 mb-3">
                <a style={{ color: "#23262F", fontSize: "16px" }} href="#">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- modal end --> */}
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
                <a class="nav-link" href="#">
                  Portfolio
                </a>
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
              data-toggle="modal"
              data-target="#exampleModal"
              type="submit"
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
