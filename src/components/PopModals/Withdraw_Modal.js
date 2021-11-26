import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Images from "../Helper/AllImages";

const Withdraw_Modal = () => {
  const [withdraw_Modal, setWithdraw_Modal] = useState(false);
  const [settingModal, setSettingModal] = useState(false);
  const [btnOptions, setBtnOptions] = useState({
    first: true,
    second: false,
    third: false,
    fourth: false,
  });
  const [btnOptions2, setBtnOptions2] = useState({
    first: false,
    second: false,
    third: false,
  });
  return (
    <div>
      {/* settong modal */}
      <Modal
        show={settingModal}
        onHide={() => {
          setSettingModal(false);
          setWithdraw_Modal(true);
        }}
        keyboard={false}
        size="md"
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
                  <div class="d-flex justify-content-between">
                    <div class="d-flex">
                      <img
                        class="backArrow"
                        style={{
                          height: "10px",
                          marginTop: "15px",
                          paddingRight: "12px",
                        }}
                        onClick={() => {
                          setSettingModal(false);
                          setWithdraw_Modal(true);
                        }}
                        src={Images.lefttwoline}
                      />
                      <p class="yahparagraph">Settings</p>
                    </div>
                    <div>
                    <svg className="u-widtradre8777" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    setSettingModal(false);
                    setWithdraw_Modal(true);
                  }}>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#23262F"/>
</svg>
                      {/* <img
                        className="popupcrosss"
                        onClick={() => {
                          setSettingModal(false);
                          setWithdraw_Modal(true);
                        }}
                        src={Images.crossicon}
                      /> */}
                    </div>
                  </div>
                  <div>
                    <p style={{ fontFamily: "Poppins", marginTop: "32px" }}>
                      Slipperage tollerance
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      class="btn n-secondaryButton settingPercentage"
                      style={{
                        boxShadow: btnOptions.first
                          ? "0 0 0 0.2rem rgb(0 123 255 / 25%)"
                          : "none",
                      }}
                      onClick={() =>
                        setBtnOptions({
                          first: true,
                          second: false,
                          third: false,
                          fourth: false,
                        })
                      }
                    >
                      1%
                      {/* <img className="mb-1" src={Images.morearticle}/> */}
                    </button>
                    <button
                      type="button"
                      class="btn n-secondaryButton settingPercentage"
                      style={{
                        boxShadow: btnOptions.second
                          ? "0 0 0 0.2rem rgb(0 123 255 / 25%)"
                          : "none",
                      }}
                      onClick={() =>
                        setBtnOptions({
                          first: false,
                          second: true,
                          third: false,
                          fourth: false,
                        })
                      }
                    >
                      0.5%
                      {/* <img className="mb-1" src={Images.morearticle}/> */}
                    </button>
                    <button
                      type="button"
                      class="btn n-secondaryButton settingPercentage"
                      style={{
                        boxShadow: btnOptions.third
                          ? "0 0 0 0.2rem rgb(0 123 255 / 25%)"
                          : "none",
                      }}
                      onClick={() =>
                        setBtnOptions({
                          first: false,
                          second: false,
                          third: true,
                          fourth: false,
                        })
                      }
                    >
                      1%
                      {/* <img className="mb-1" src={Images.morearticle}/> */}
                    </button>
                    <button
                      type="button"
                      class="btn n-secondaryButton settingPercentage"
                      style={{
                        boxShadow: btnOptions.fourth
                          ? "0 0 0 0.2rem rgb(0 123 255 / 25%)"
                          : "none",
                      }}
                      onClick={() =>
                        setBtnOptions({
                          first: false,
                          second: false,
                          third: false,
                          fourth: true,
                        })
                      }
                    >
                      3%
                      {/* <img className="mb-1" src={Images.morearticle}/> */}
                    </button>
                  </div>
                  <p style={{ fontFamily: "Poppins", marginTop: "32px" }}>
                    Transaction Speed
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      class="btn n-secondaryButton settingPercentage  "
                      style={{
                        boxShadow: btnOptions2.first
                          ? "0 0 0 0.2rem rgb(0 123 255 / 25%)"
                          : "none",
                      }}
                      onClick={() =>
                        setBtnOptions2({
                          first: true,
                          second: false,
                          third: false,
                        })
                      }
                    >
                      Normal
                      {/* <img className="mb-1" src={Images.morearticle}/> */}
                    </button>
                    <button
                      type="button"
                      class="btn n-secondaryButton settingPercentage"
                      style={{
                        boxShadow: btnOptions2.second
                          ? "0 0 0 0.2rem rgb(0 123 255 / 25%)"
                          : "none",
                      }}
                      onClick={() =>
                        setBtnOptions2({
                          first: false,
                          second: true,
                          third: false,
                        })
                      }
                    >
                      Fast
                      {/* <img className="mb-1" src={Images.morearticle}/> */}
                    </button>
                    <button
                      type="button"
                      class="btn n-secondaryButton settingPercentage"
                      style={{
                        boxShadow: btnOptions2.third
                          ? "0 0 0 0.2rem rgb(0 123 255 / 25%)"
                          : "none",
                      }}
                      onClick={() =>
                        setBtnOptions2({
                          first: false,
                          second: false,
                          third: true,
                        })
                      }
                    >
                      Instant
                      {/* <img className="mb-1" src={Images.morearticle}/> */}
                    </button>
                  </div>
                  <div
                    style={{ marginTop: "32px" }}
                    class="d-flex justify-content"
                  >
                    <button
                      style={{ width: "100%" }}
                      className="btn btn n-primaryButton"
                      onClick={() => {
                        setSettingModal(false);
                        setWithdraw_Modal(true);
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- modal end --> */}
        </Modal.Body>
      </Modal>
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
                      {/* <img
                        class="pt-3 backArrow"
                        style={{ height: "25px", marginTop: "6px" }}
                        onClick={() => {
                          setWithdraw_Modal(false);
                        }}
                        src={Images.lefttwoline}
                      /> */}
                      <p class="yahparagraph pl-2 pt-2">Withdraw</p>
                      <img
                        onClick={() => {
                          // setModal(false);
                          setSettingModal(true);
                          setWithdraw_Modal(false);
                        }}
                        style={{
                          height: "25px",
                          marginTop: "15px",
                          marginLeft:"10px",
                          cursor: "pointer",
                        }}
                        src={Images.setting}
                      />
                    </div>
                    <div>
                    <svg style={{marginTop:"20px"}} className="u-widtradre8777" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      setSettingModal(false);
                      setWithdraw_Modal(true);
                    }}>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#23262F"/>
</svg>

                    {/* <img
                        className="popupcrosss"
                        onClick={() => {
                          setSettingModal(false);
                          setWithdraw_Modal(true);
                        }}
                        src={Images.crossicon}
                      /> */}
                    </div>
                  </div>
                  <p
                    class="pt-3 pl-2"
                    style={{ fontWeight: "bold", fontFamily: "DM Sans" }}
                  >
                    Recieve in
                  </p>
                  <div
                    class="d-flex justify-content-between mt-2 pl-5 pr-5 pt-1 pb-1"
                    style={{
                      backgroundColor: "#F4F5F6",
                      // borderCollapse: "55px",
                      borderRadius: "55px",
                    }}
                  >
                    <div class="d-flex">
                      <p class="popupaddliquidty">BTC</p>
                    </div>
                    <div class="d-flex">
                      <p class="popupaddliquidty">BTC + RUNE</p>
                    </div>
                    <div class="d-flex">
                      <p class="popupaddliquidty">RUNE</p>
                    </div>
                  </div>
                  <div className="mt-5 bordewithdraw">
                    <div class="pl-5 pr-5 bordewithdraw">
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
                                fontFamily: "Poppins",
                              }}
                            >
                              Native
                            </span>
                          </p>
                        </div>
                        <p
                          class="pt-4"
                          style={{ fontWeight: "bold", fontFamily: "Poppins" }}
                        >
                          Pool Share: 0.7054%
                        </p>
                      </div>
                    </div>
                    {/* <hr class="solid" /> */}
                    <div class="pl-5 pr-5  ">
                      <div class="d-flex justify-content-between">
                        <p class="servicefee pt-4">BTC share</p>
                        <p
                          class="pt-4"
                          style={{ fontWeight: "bold", fontFamily: "Poppins" }}
                        >
                          5 BTC
                        </p>
                      </div>
                      <div class="d-flex justify-content-between">
                        <p class="servicefee">RUNE share</p>
                        <p
                          style={{ fontWeight: "bold", fontFamily: "Poppins" }}
                        >
                          2,222,369.93 RUNE
                        </p>
                      </div>
                      <div class="d-flex justify-content-between ">
                        <p class="servicefee">LP Units</p>
                        <p
                          style={{ fontWeight: "bold", fontFamily: "Poppins" }}
                        >
                          17.19
                        </p>
                      </div>
                      <div class="d-flex justify-content-between ">
                        <p class="servicefee">Last added</p>
                        <p
                          style={{ fontWeight: "bold", fontFamily: "Poppins" }}
                        >
                          17.19
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="pt-5 pb-5 pl-3 pr-3">
                    {/* <div class="progress">
                      <div
                        class="progress-bar bg-c-blue"
                        style={{ width: "65%" }}
                      ></div>
                    </div> */}

                    <input
                      style={{ width: "700px" }}
                      type="range"
                      class="form-range n-sliderRanger"
                      onChange={(e) => {
                        console.log("e======>>", e.target.value);
                      }}
                      id="customRange1"
                    ></input>
                  </div>
                  <hr class="solid" />
                  <div class="d-flex justify-content-between">
                    <p class="servicefee">BTC</p>
                    <p style={{ fontWeight: "bold", fontFamily: "Poppins" }}>
                      2.5
                    </p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="servicefee">RUNE</p>
                    <p style={{ fontWeight: "bold", fontFamily: "Poppins" }}>
                      1,142,761.32
                    </p>
                  </div>
                  <div class="d-flex justify-content-between ">
                    <p style={{ fontWeight: "bold", fontFamily: "Poppins" }}>
                      Total Fee
                    </p>
                    <p style={{ fontWeight: "bold", fontFamily: "Poppins" }}>
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
                      fontWeight: "bold",
                      fontFamily: "DM Sans",
                      borderRadius: "25px",
                      fontSize: "16px",
                      color: "#000",
                    }}
                    type="button"
                    class="btn btn-outline-secondary btnHoverBlue"
                    onClick={() => {
                      setWithdraw_Modal(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    style={{ fontSize: "16px", fontFamily: "DM Sans" }}
                    type="button"
                    class="btn btn-primary btn-lg pl-5 pr-5 btnHoverWhite"
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
        class="btn marketbuttonrrr ml-2 "
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
