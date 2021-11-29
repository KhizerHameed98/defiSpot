import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Images from "../Helper/AllImages";
import Setting_Modal from "./Setting_Modal";
export const AddLiquidity = () => {
  const [addLiquidity_Modal, setAddLiquidity_Modal] = useState(false);
  const [Enum, setEnum] = useState({
    BTC: "BTC",
    BTC_RUNE: "BTC + RUNE",
    RUNE: "RUNE",
  });
  const [liquidityType, setLiquidityType] = useState(Enum.BTC);
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
      <Modal
        show={settingModal}
        onHide={() => {
          setSettingModal(false);
          setAddLiquidity_Modal(true);
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
                          setAddLiquidity_Modal(true);
                        }}
                        src={Images.lefttwoline}
                      />
                      <p class="yahparagraph">Setting</p>
                    </div>
                    <div>
                      <svg
                        className="u-widtradre8777"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          setSettingModal(false);
                          setAddLiquidity_Modal(true);
                        }}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                          fill="#23262F"
                        />
                      </svg>
                      {/* <img
                        className="popupcrosss"
                        onClick={() => {
                          setSettingModal(false);
                          setAddLiquidity_Modal(true);
                        }}
                        src={Images.crossicon}
                      /> */}
                    </div>
                  </div>
                  <div>
                    <p style={{ fontFamily: "Poppins", marginTop: "32px" }}>
                      Slipperage Tollerance
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                  <input 
                      type="text"
                      class="btn w-secondaryInpput 123"
                      style={{ width: "80px" }}
                      placeholder="1%"
                      // value="1"
                      onClick={() =>
                        setBtnOptions({
                          first: true,
                          second: false,
                          third: false,
                          fourth: false,
                        })
                      }
                    ></input>
                    {/* <button
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
                      
                    </button> */}
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
                        setAddLiquidity_Modal(true);
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
        show={addLiquidity_Modal}
        onHide={() => {
          setAddLiquidity_Modal(false);
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
                        style={{ height: "25px", marginTop: "12px" }}
                        onClick={() => {
                          setAddLiquidity_Modal(false);
                        }}
                        src={Images.lefttwoline}
                      /> */}
                      <p class="yahparagraph pl-2 pt-3">Add Liquidity</p>
                      
                    </div>
                    {/* <Setting_Modal setModal={setAddLiquidity_Modal} /> */}
                    <div>
                      {/* <svg
                        style={{ marginTop: "20px" }}
                        className="u-widtradre8777"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          setSettingModal(false);
                          setAddLiquidity_Modal(true);
                        }}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                          fill="#23262F"
                        />
                      </svg> */}
                     
                      {/* <img
                        className="popupcrosss"
                        onClick={() => {
                          setSettingModal(false);
                          setAddLiquidity_Modal(true);
                        }}
                        src={Images.crossicon}
                      /> */}
                      <img
                       
                        onClick={() => {
                          // setModal(false);
                          setSettingModal(true);
                          setAddLiquidity_Modal(false);
                        }}
                        style={{
                          height: "25px",
                          marginTop: "24px",
                          marginLeft: "10px",
                          cursor: "pointer",
                        }}
                        src={Images.setting}
                      />
                    </div>
                  </div>
                  <div
                    class="d-flex justify-content-between mt-5 pl-5 pr-5 pt-1 pb-1"
                    style={{ backgroundColor: "#F4F5F6", borderRadius: "55px" }}
                  >
                    <button
                      class="d-flex"
                      style={{ border: "none", background: "none" }}
                      onClick={() => {
                        setLiquidityType(Enum.BTC);
                      }}
                    >
                      <p
                        className={
                          liquidityType === Enum.BTC
                            ? "popupaddliquidtyActive"
                            : "popupaddliquidty"
                        }
                      >
                        BTC
                      </p>
                    </button>
                    <button
                      class="d-flex"
                      style={{ border: "none", background: "none" }}
                      onClick={() => {
                        setLiquidityType(Enum.BTC_RUNE);
                      }}
                    >
                      <p
                        className={
                          liquidityType === Enum.BTC_RUNE
                            ? "popupaddliquidtyActive"
                            : "popupaddliquidty"
                        }
                      >
                        BTC + RUNE
                      </p>
                    </button>
                    <button
                      class="d-flex"
                      style={{ border: "none", background: "none" }}
                      onClick={() => {
                        setLiquidityType(Enum.RUNE);
                      }}
                    >
                      <p
                        className={
                          liquidityType === Enum.RUNE
                            ? "popupaddliquidtyActive"
                            : "popupaddliquidty"
                        }
                      >
                        RUNE
                      </p>
                    </button>
                  </div>
                  {/*BTC*/}
                  {liquidityType === Enum.BTC ? (
                    <div class="pt-4">
                      <p style={{ fontWeight: "bold", fontFamily: "DM Sans" }}>
                        Select BTC amount
                      </p>
                      <div class="d-flex">
                        <div class="input-group">
                          <input
                            type="number"
                            class="form-control input-focus"
                            style={{
                              color: "#23262f",
                              fontSize: "14px",
                              // fontFamily: "Poppins",
                              // border: "2px solid #E6E8EC",
                              paddingBottom: "25px",
                              borderRadius: "10px",

                              paddingTop: "25px",
                              fontWeight: "bold",
                            }}
                            aria-label="Text input with segmented dropdown button"
                          />
                          <div
                            style={{
                              position: "absolute",
                              right: "4px",
                              zIndex: "4",
                              paddingTop: "8px",
                            }}
                            class="d-flex"
                          >
                            <button
                              type="button"
                              class="btn liquiditybuttonssss"
                            >
                              ($234,435.50)
                            </button>
                            <img
                              className="liquidtyimage"
                              src={Images.searchbarr}
                              // class="search_icon_image"
                            />
                            <button
                              type="button"
                              class="btn liquiditybutton "
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <img className="mb-1" src={Images.iconarowdown} />
                              {/* <span class="sr-only">Toggle Dropdown</span> */}
                            </button>
                            <div
                              style={{ transform: "none" }}
                              class="dropdown-menu dropdownn88777776"
                            >
                              <a class="dropdown-item" href="#">
                                BTC
                              </a>
                              <a class="dropdown-item" href="#">
                                BNB
                              </a>
                              <a class="dropdown-item" href="#">
                                ETH
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {/*BTC_RUNE*/}
                  {liquidityType === Enum.BTC_RUNE ? (
                    <div class="pt-4">
                      <div class="d-flex justify-content-between">
                        <p
                          style={{ fontWeight: "bold", fontFamily: "DM Sans" }}
                        >
                          Select BTC amount
                        </p>
                        <p
                          style={{
                            fontWeight: "bold",
                            fontFamily: "DM Sans",
                            paddingRight: "240px",
                          }}
                        >
                          RUNE amount
                        </p>
                      </div>
                      <div class="d-flex justify-content-between">
                        <div class="input-group">
                          <input
                            type="number"
                            class="form-control input-focus"
                            style={{
                              color: "#23262f",
                              fontSize: "14px",
                              fontFamily: "Poppins",
                              paddingBottom: "25px",
                              borderRadius: "10px",
                              // border: "2px solid #E6E8EC",
                              paddingTop: "25px",
                              fontWeight: "bold",
                            }}
                            aria-label="Text input with segmented dropdown button"
                          />
                          <div
                            style={{
                              position: "absolute",
                              right: "4px",
                              zIndex: "4",
                              paddingTop: "8px",
                            }}
                            class="d-flex"
                          >
                            <button
                              type="button"
                              class="btn liquiditybuttonssss"
                            >
                              ($234,435.50)
                            </button>
                            <img
                              className="liquidtyimage"
                              src={Images.searchbarr}
                              // class="search_icon_image"
                            />
                            <button
                              type="button"
                              class="btn liquiditybutton "
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <img className="mb-1" src={Images.iconarowdown} />
                              {/* <span class="sr-only">Toggle Dropdown</span> */}
                            </button>
                            <div class="dropdown-menu dropdownn88777776">
                              <a class="dropdown-item" href="#">
                                BTC
                              </a>
                              <a class="dropdown-item" href="#">
                                BNB
                              </a>
                              <a class="dropdown-item" href="#">
                                ETH
                              </a>
                            </div>
                          </div>
                        </div>

                        <div class="input-group ml-3">
                          <input
                            type="number"
                            class="form-control input-focus"
                            style={{
                              color: "#23262f",
                              fontSize: "14px",
                              fontFamily: "Poppins",
                              paddingBottom: "25px",
                              borderRadius: "10px",
                              // border: "2px solid #E6E8EC",
                              paddingTop: "25px",
                              fontWeight: "bold",
                            }}
                            aria-label="Text input with segmented dropdown button"
                          />
                          <div
                            style={{
                              position: "absolute",
                              right: "4px",
                              zIndex: "4",
                              paddingTop: "8px",
                            }}
                            class="d-flex"
                          >
                            <button
                              type="button"
                              class="btn liquiditybuttonssss"
                            >
                              ($234,435.50)
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {/*RUNE*/}
                  {liquidityType === Enum.RUNE ? (
                    <div class="pt-4">
                      <p style={{ fontWeight: "bold", fontFamily: "DM Sans" }}>
                        Select RUNE amount
                      </p>
                      <div class="d-flex">
                        <div class="input-group">
                          <input
                            type="number"
                            class="form-control input-focus"
                            style={{
                              color: "#23262f",
                              fontSize: "14px",
                              // fontFamily: "Poppins",
                              paddingBottom: "25px",
                              borderRadius: "10px",
                              paddingTop: "25px",
                              fontWeight: "bold",
                            }}
                            aria-label="Text input with segmented dropdown button"
                          />
                          <div
                            style={{
                              position: "absolute",
                              right: "4px",
                              zIndex: "4",
                              paddingTop: "8px",
                            }}
                            class="d-flex"
                          >
                            <button
                              type="button"
                              class="btn liquiditybuttonssss"
                            >
                              ($234,435.50)
                            </button>
                            <img
                              className="liquidtyimage"
                              src={Images.searchbarr}
                              // class="search_icon_image"
                            />
                            <button
                              type="button"
                              class="btn liquiditybutton "
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <img className="mb-1" src={Images.iconarowdown} />
                              {/* <span class="sr-only">Toggle Dropdown</span> */}
                            </button>
                            <div class="dropdown-menu dropdownn88777776">
                              <a class="dropdown-item" href="#">
                                BTC
                              </a>
                              <a class="dropdown-item" href="#">
                                BNB
                              </a>
                              <a class="dropdown-item" href="#">
                                ETH
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <hr style={{ marginTop: "3rem" }} class="solid" />
                  <div class="d-flex justify-content-between">
                    <p class="servicefee">Slip</p>
                    <p style={{ fontWeight: "600", fontFamily: "Poppins" }}>
                      0%
                    </p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="servicefee">Pool Share Estimated</p>
                    <p style={{ fontWeight: "600", fontFamily: "Poppins" }}>
                      0.363%
                    </p>
                  </div>
                  <div class="d-flex justify-content-between ">
                    <p class="servicefee">Total Fee</p>
                    <p style={{ fontWeight: "600", fontFamily: "Poppins" }}>
                      $0.721
                    </p>
                  </div>
                </div>
                <div class="d-flex justify-content-between pb-3 pt-2 pl-3 pr-3">
                  <button
                    style={{
                      paddingLeft: "30px",
                      paddingRight: "30px",
                      border: "2px solid #E6E8EC",
                      fontFamily: "DM Sans",
                      borderRadius: "25px",
                      fontWeight: "600",
                      color: "#000",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                    type="button"
                    class="btn btn-outline-secondary btnHoverBlue"
                    onClick={() => {
                      setAddLiquidity_Modal(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                   style={{
                    paddingLeft: "30px",
                    paddingRight: "30px",
                    fontFamily: "DM Sans",
                    borderRadius: "25px",
                    fontWeight: "500",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    letterSpacing: "0.5px",
                  }}
                    type="button"
                    class="btn btn-primary btn-lg btnHoverWhite"
                    onClick={() => {
                      setAddLiquidity_Modal(false);
                    }}
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

      <button
        class="btn marketbuttonrrr "
        onClick={() => {
          setAddLiquidity_Modal(true);
        }}
      >
        Add Liquidity
      </button>
    </div>
  );
};
