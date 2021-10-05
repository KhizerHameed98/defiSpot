import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Images from "../Helper/AllImages";

const Withdraw_Modal = () => {
  const [withdraw_Modal, setWithdraw_Modal] = useState(false);

  return (
    <div>
      {/*AddLiquidity PopUp Modal BTC */}

      <Modal
        show={withdraw_Modal}
        onHide={() => {
          setWithdraw_Modal(false);
        }}
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
                        style={{ height: "25px", marginTop: "6px" }}
                        onClick={() => {
                          setWithdraw_Modal(false);
                        }}
                        src={Images.lefttwoline}
                      />
                      <p class="yahparagraph pl-2 pt-1">Withdraw</p>
                    </div>
                    <div>
                      <img
                        style={{ height: "25px", marginTop: "15px" }}
                        src={Images.setting}
                      />
                    </div>
                  </div>
                  <p
                    class="pt-3 pl-2"
                    style={{ fontWeight: "bold", fontFamily: "DM Sans" }}
                  >
                    Recieve in
                  </p>
                  <div
                    class="d-flex justify-content-between mt-2 pl-5 pr-5 pt-3"
                    style={{
                      backgroundColor: "#F4F5F6",
                      borderCollapse: "55px",
                    }}
                  >
                    <div class="d-flex">
                      <p class="popupaddliquidty">BTC</p>
                    </div>
                    <div class="d-flex">
                      <p class="popupaddliquidty">BTC + RUNE</p>
                    </div>
                    <div class="d-flex">
                      <p class="popupaddliquidty">Rune</p>
                    </div>
                  </div>
                  <div class="pl-5 pr-5 mt-5 bordewithdraw">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex ">
                        <img
                          class="mt-4"
                          style={{ width: "35px", height: "35px" }}
                          src={Images.btc}
                        />
                        <p class="btcnativewithdraw pl-3 mt-3">
                          BTC
                          <br />
                          <span
                            style={{
                              color: "#23262F",
                              fontSize: "12px",
                              fontFamily: "DM Sans",
                            }}
                          >
                            Native
                          </span>
                        </p>
                      </div>
                      <p
                        class="pt-4"
                        style={{ fontWeight: "bold", fontFamily: "DM Sans" }}
                      >
                        Pool Share:0.7054%
                      </p>
                    </div>
                    <hr class="solid" />
                    <div class="d-flex justify-content-between">
                      <p class="servicefee">BTC share</p>
                      <p style={{ fontWeight: "bold", fontFamily: "DM Sans" }}>
                        5 BTC
                      </p>
                    </div>
                    <div class="d-flex justify-content-between">
                      <p class="servicefee">RUNE share</p>
                      <p style={{ fontWeight: "bold", fontFamily: "DM Sans" }}>
                        2,222,369.93 RUNE
                      </p>
                    </div>
                    <div class="d-flex justify-content-between ">
                      <p class="servicefee">LP Units</p>
                      <p style={{ fontWeight: "bold", fontFamily: "DM Sans" }}>
                        17.19
                      </p>
                    </div>
                    <div class="d-flex justify-content-between ">
                      <p class="servicefee">Last added</p>
                      <p style={{ fontWeight: "bold", fontFamily: "DM Sans" }}>
                        17.19
                      </p>
                    </div>
                  </div>
                  <div class="pt-5 pb-5 pl-3 pr-3">
                    <div class="progress">
                      <div
                        class="progress-bar bg-c-blue"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                  </div>
                  <hr class="solid" />
                  <div class="d-flex justify-content-between">
                    <p class="servicefee">BTC</p>
                    <p style={{ fontWeight: "bold", fontFamily: "DM Sans" }}>
                      2.5
                    </p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="servicefee">RUNE</p>
                    <p style={{ fontWeight: "bold", fontFamily: "DM Sans" }}>
                      1,142,761.32
                    </p>
                  </div>
                  <div class="d-flex justify-content-between ">
                    <p style={{ fontWeight: "bold", fontFamily: "DM Sans" }}>
                      Total Fee
                    </p>
                    <p style={{ fontWeight: "bold", fontFamily: "DM Sans" }}>
                      $0.927
                    </p>
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
                    onClick={() => {
                      setWithdraw_Modal(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    style={{ fontSize: "16px", fontFamily: "DM Sans" }}
                    type="button"
                    class="btn btn-primary btn-lg pl-5 pr-5"
                    onClick={() => {
                      setWithdraw_Modal(false);
                    }}
                  >
                    Withdraw
                  </button>{" "}
                </div>
              </div>
            </div>
          </div>
          {/* <!-- modal end --> */}
        </Modal.Body>
      </Modal>

      <button
        class="btn marketbuttonss ml-2 "
        onClick={() => {
          setWithdraw_Modal(true);
        }}
      >
        Withdraw
      </button>
    </div>
  );
};

export default Withdraw_Modal;
