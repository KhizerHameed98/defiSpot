import React, { useState } from "react";
import withMainLayout from "../HOC/withMainLayout";
import { Button, Modal } from "react-bootstrap";
import Images from "../Helper/AllImages";
import { Link } from "react-router-dom";
import browserRoute from "../../Routes/browserRoutes";
// import Images from "../../Helper/AllImages";
const BuyPlatform = () => {
  const [YayModal, setYayModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const handleCloseYay = () => setYayModal(false);
  const handleShowYay = () => {
    setConfirmModal(false);
    setYayModal(true);
  };
  const handleCloseConfirm = () => {
    setConfirmModal(false);
  };
  const handleShowConfirm = () => {
    setConfirmModal(true);
  };

  return (
    <>
      {/*Yay Pop Up Modal*/}

      <Modal
        show={YayModal}
        onHide={handleCloseYay}
        // backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          closeButton
          style={{ borderBottom: "none" }}
        ></Modal.Header>
        <Modal.Body>
          {/* <!-- Modal --> */}

          <div
            // class="modal fade"
            id="successBuy"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div>
                <div class="modal-body">
                  <div class="d-flex justify-content-center  mb-3">
                    <h1
                      style={{
                        fontWeight: "bold",
                        paddingTop: "12px",
                        paddingRight: "10px",
                      }}
                    >
                      Yay!
                    </h1>
                    <img src={Images.Yay} />
                  </div>
                  <div class="d-flex justify-content-center ">
                    <p class="yahparagraph">You successfully bought</p>
                  </div>
                  <div class="d-flex justify-content-center">
                    <p style={{ fontWeight: "bold" }}>
                      <span style={{ color: "#58BD7D", fontWeight: "bold" }}>
                        1.1123 BTC
                      </span>{" "}
                      for{" "}
                      <span style={{ color: "#07C078", fontWeight: "bold" }}>
                        35,000 USDT
                      </span>
                      !
                    </p>
                  </div>
                  <div class="transactionclasss">
                    <div class="d-flex justify-content-between pt-2">
                      <p style={{ color: "#777E90", fontSize: "18px" }}>
                        Status
                      </p>
                      <p
                        style={{
                          color: "#777E90",
                          fontSize: "18px",
                          paddingRight: "60px",
                        }}
                      >
                        Transaction ID
                      </p>
                    </div>
                    <div class="d-flex justify-content-between">
                      <p style={{ color: "#58BD7D", fontWeight: "bold" }}>
                        Completed
                      </p>
                      <p style={{ fontWeight: "bold" }}>0msx836930...87r398</p>
                    </div>
                    <hr class="solid" />
                    <p style={{ color: "#777E90", fontSize: "18px" }}>
                      Address
                    </p>
                    <p style={{ fontWeight: "bold" }}>0msx836930...87r398</p>
                  </div>
                </div>
                <div class="d-flex justify-content-center pb-3 pt-2 pl-3 pr-3">
                  <button
                    type="button"
                    class="btn btn-primary btn-lg btn-block"
                  >
                    Wallet
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- modal end --> */}
        </Modal.Body>
      </Modal>

      {/*Confirm PopUp Modal */}

      <Modal
        show={confirmModal}
        onHide={handleCloseConfirm}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        {/* <Modal.Header
          closeButton
          style={{ borderBottom: "none" }}
        ></Modal.Header> */}
        <Modal.Body>
          {/* <!-- Modal --> */}
          <div
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div role="document">
              <div>
                <div class="modal-body">
                  <div class="d-flex justify-content-between pt-2 pb-2">
                    <div class="d-flex">
                      <img
                        class="pt-3"
                        style={{ height: "25px" }}
                        onClick={handleCloseConfirm}
                        src={Images.lefttwoline}
                      />
                      <p class="yahparagraph pl-2 pt-1">Confirm</p>
                    </div>
                    <div>
                      <img style={{ height: "25px" }} src={Images.setting} />
                    </div>
                  </div>
                  <div
                    class="d-flex justify-content-between mt-5 pl-5 pr-5 pt-3 pb-3"
                    style={{ backgroundColor: "#F4F5F6", borderRadius: "10px" }}
                  >
                    <div class="d-flex">
                      <img
                        class="pt-1"
                        style={{ height: "45px" }}
                        src={Images.From}
                      />
                      <div class="pl-2">
                        <p class="tranparagraph" style={{ margin: "0px" }}>
                          From
                        </p>
                        <p style={{ fontWeight: "bold" }}>35,000 USDT</p>
                      </div>
                    </div>
                    <div class="d-flex">
                      <img
                        class="pt-1"
                        style={{ height: "45px" }}
                        src={Images.to}
                      />
                      <div class="pl-2">
                        <p class="tranparagraph" style={{ margin: "0px" }}>
                          {" "}
                          To
                        </p>
                        <p style={{ fontWeight: "bold" }}>1.1137 BTC</p>
                      </div>
                    </div>
                    <div class="d-flex">
                      <img
                        class="pt-1"
                        style={{ height: "45px" }}
                        src={Images.proto}
                      />
                      <div class="pl-2">
                        <p class="tranparagraph" style={{ margin: "0px" }}>
                          {" "}
                          Protocol
                        </p>
                        <p style={{ fontWeight: "bold" }}>THORChain</p>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between pt-5">
                    <p style={{ fontWeight: "bold" }}>1.1137</p>
                    <p style={{ fontWeight: "bold" }}>BTC</p>
                  </div>
                  <hr class="solid" />
                  <div class="d-flex justify-content-between">
                    <p class="servicefee">Service fee</p>
                    <p style={{ fontWeight: "bold" }}>0.0045 ETH</p>
                  </div>
                  <div class="d-flex justify-content-between ">
                    <p class="servicefee">You will get</p>
                    <p style={{ fontWeight: "bold" }}>1.1123 BTC</p>
                  </div>
                </div>
                <div class="d-flex justify-content-between pb-3 pt-2 pl-3 pr-3">
                  <button
                    style={{
                      paddingLeft: "30px",
                      paddingRight: "30px",
                      borderColor: "#E6E8EC",
                      borderRadius: "20px",
                      color: "#000",
                    }}
                    type="button"
                    class="btn btn-outline-secondary"
                    onClick={handleCloseConfirm}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    style={{ fontSize: "16px" }}
                    class="btn btn-primary btn-lg"
                    onClick={handleShowYay}
                  >
                    I understand, continue
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- modal end --> */}
        </Modal.Body>
      </Modal>
      {/* Div Started */}
      <section>
        <div class="container mt-5">
          <div class="row">
            <div class="col-lg-2">
              <h4 style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
                BTC/USDT
              </h4>
              <p class="marketparatwow">Bitcoin</p>
            </div>
            <div class="col-lg-2">
              <div class="d-flex">
                <h4 class="numberheading">36,641.20</h4>
                <img class="pl-3" src={Images.goup3} />
              </div>
              <p class="marketparatwow">
                {" "}
                <img src={Images.sss} /> 36,641.20
              </p>
            </div>
            <div class="col-lg-2">
              <p class="marketparatwow">
                {" "}
                <img src={Images.clock} /> 24h chnage
              </p>
              <h5 style={{ color: "#00C076" }}>520.80 +1.25%</h5>
            </div>
            <div class="col-lg-2">
              <p class="marketparatwow">
                {" "}
                <img src={Images.up} /> 24h high
              </p>
              <h5>520.80 +1.25%</h5>
            </div>
            <div class="col-lg-2">
              <p class="marketparatwow">
                {" "}
                <img src={Images.down} /> 24h low
              </p>
              <h5>520.80 +1.25%</h5>
            </div>
            <div class="col-lg-2">
              <p class="marketparatwow">
                {" "}
                <img src={Images.hourr} /> 24h volume
              </p>
              <h5>520.80 +1.25%</h5>
            </div>
          </div>
        </div>
      </section>
      <section style={{ backgroundColor: "#F1F2F4" }}>
        <div class="container mt-4">
          <div class="row">
            <div
              class="col-lg-4 mt-3 mb-3 pt-4 pb-4"
              style={{ backgroundColor: "#fff", height: "325px" }}
            >
              <button
                class="mt-2"
                style={{
                  padding: "5px 15px 5px 15px",
                  border: "none",
                  borderRadius: "15px",
                  fontWeight: "bold",
                }}
              >
                <Link
                  to={browserRoute.MARKET}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Market
                </Link>
              </button>
              <div class="d-flex justify-content-between pt-4">
                <h2>Buy BTC</h2>
                <div class="d-flex">
                  <img
                    style={{
                      height: "20px",
                      width: "20px",
                      paddingTop: "5px",
                    }}
                    src={Images.bbbtc}
                  />
                  <p class="pl-2">10,098,36 USDT</p>
                </div>
              </div>
              <div class="input-group mb-3 mt-3">
                <input
                  style={{ borderRight: "none" }}
                  type="text"
                  class="form-control"
                  placeholder="From"
                  aria-label="From"
                  aria-describedby="basic-addon2"
                />
                <div class="input-group-append">
                  <button
                    style={{ borderLeft: "none", borderColor: "#ced4da" }}
                    class="btn btn-outline-secondary"
                    type="button"
                  >
                    USDT
                  </button>
                </div>
              </div>

              <div class="input-group mb-3 mt-3">
                <input
                  style={{ borderRight: "none" }}
                  type="text"
                  class="form-control"
                  placeholder="To"
                  aria-label="To"
                  aria-describedby="basic-addon2"
                />
                <div class="input-group-append">
                  <button
                    style={{ borderLeft: "none", borderColor: "#ced4da" }}
                    class="btn btn-outline-secondary"
                    type="button"
                  >
                    BTC
                  </button>
                </div>
              </div>

              <button
                style={{ fontSize: "15px" }}
                type="button"
                class="btn btn-primary btn-lg btn-block mb-2"
                onClick={handleShowConfirm}
              >
                Buy BTC
              </button>
            </div>
            <div class="col-lg-8  mt-3 mb-3">
              <div class="pl-3 pt-5" style={{ backgroundColor: "#fff" }}>
                <div class="d-flex justify-content-between">
                  <p style={{ fontSize: "30px", fontWeight: "bold" }}>
                    19,761.52 USD{" "}
                    <span style={{ color: "#4FBF67", fontSize: "16px" }}>
                      +0.92%
                    </span>
                  </p>
                  <div class="d-flex" style={{ paddingRight: "40px" }}>
                    <img
                      style={{ width: "15px", height: "15px" }}
                      src={Images.clock}
                    />
                    <button class="graphbutton">1D</button>
                    <button class="graphbutton">1W</button>
                    <button class="graphbutton">1M</button>
                    <button class="graphbutton">3M</button>
                    <button class="graphbutton">1Y</button>
                    <button class="graphbutton">ALL TIME</button>
                  </div>
                </div>
                <img
                  class="pt-5 pb-4"
                  style={{ width: "670px" }}
                  src={Images.linechart}
                />
                <div class="d-flex justify-content-between pr-3">
                  <p>09:00</p>
                  <p>09:00</p>
                  <p>09:00</p>
                  <p>09:00</p>
                  <p>09:00</p>
                  <p>09:00</p>
                  <p>09:00</p>
                </div>
                <hr class="solid" style={{ margin: "0px" }} />
                <div class="row">
                  <div
                    class="col-lg-6"
                    style={{ borderRight: "1px solid lightgrey" }}
                  >
                    <div class="d-flex pl-5 pt-5">
                      <img style={{ height: "40px" }} src={Images.pt1} />
                      <div class="pl-2">
                        <p style={{ margin: "0px", color: "#808191" }}>
                          Market cap
                          {/* <i class="pl-2 fa fa-exclamation-circle"></i> */}
                          <img class="pl-1 pt-1" src={Images.exclamation} />
                        </p>
                        <p class="font-weight-bold">329,553,663,671 USD</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="d-flex pl-5 pt-5">
                      <img style={{ height: "40px" }} src={Images.pt2} />
                      <div class="pl-2">
                        <p style={{ margin: "0px", color: "#808191" }}>
                          Volume(24h)
                          <img class="pl-1 pt-1" src={Images.exclamation} />
                        </p>
                        <p class="font-weight-bold">329,553,663,671 USD</p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="solid" style={{ margin: "0px" }} />
                <div class="row">
                  <div
                    class="col-lg-6"
                    style={{ borderRight: "1px solid lightgrey" }}
                  >
                    <div class="d-flex pl-5 pt-5">
                      <img style={{ height: "40px" }} src={Images.pt3} />
                      <div class="pl-2">
                        <p style={{ margin: "0px", color: "#808191" }}>
                          Circulating Supply
                          <img class="pl-1 pt-1" src={Images.exclamation} />
                        </p>
                        <p class="font-weight-bold">329,553,663,671 USD</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="d-flex pl-5 pt-5">
                      <img style={{ height: "40px" }} src={Images.pt4} />
                      <div class="pl-2">
                        <p style={{ margin: "0px", color: "#808191" }}>
                          Total Supply
                          <img class="pl-1 pt-1" src={Images.exclamation} />
                        </p>
                        <p class="font-weight-bold">329,553,663,671 USD</p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="solid" style={{ margin: "0px" }} />
                <div class="row">
                  <div class="col-lg-8 pl-5 pt-5 pb-4">
                    <h2 class="bitcoinheadeing">About Bitcoin</h2>
                    <p style={{ color: "#5e5b5b" }}>
                      The worlds first Cryptocurrency, Bitcoin is stored and
                      exchange securely on the internet through a digital ledger
                      known as a blochchain. Bitcoins are divisible into smaller
                      units known as satoshis-each satoshi is worth 0.00000001
                      bitcoin.
                    </p>
                  </div>
                  <div class="col-lg-4 pt-5">
                    <div class="d-flex">
                      <img
                        class="pt-2"
                        style={{ width: "20px", height: "25px" }}
                        src={Images.warrr}
                      />
                      <a
                        class="pt-1 pl-3"
                        href="#"
                        style={{ fontWeight: "700" }}
                      >
                        Official Website
                      </a>
                    </div>
                    <div class="d-flex">
                      <img
                        class="pt-2"
                        style={{ width: "20px", height: "25px" }}
                        src={Images.warrr}
                      />
                      <a
                        class="pt-1 pl-3"
                        href="#"
                        style={{ fontWeight: "700" }}
                      >
                        White Paper
                      </a>
                    </div>
                    <div class="d-flex">
                      <img
                        class="pt-2"
                        style={{ width: "20px", height: "25px" }}
                        src={Images.warrr}
                      />
                      <a
                        class="pt-1 pl-3"
                        href="#"
                        style={{ fontWeight: "700" }}
                      >
                        Source Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default withMainLayout(BuyPlatform);
