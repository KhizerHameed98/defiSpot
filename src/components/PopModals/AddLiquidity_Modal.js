import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Images from "../Helper/AllImages";
export const AddLiquidity = () => {
  const [addLiquidity_Modal, setAddLiquidity_Modal] = useState(false);
  const [Enum, setEnum] = useState({
    BTC: "BTC",
    BTC_RUNE: "BTC + RUNE",
    RUNE: "RUNE",
  });
  const [liquidityType, setLiquidityType] = useState(Enum.BTC);
  return (
    <div>
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
                      <img
                        class="pt-3"
                        style={{ height: "25px", marginTop: "6px" }}
                        onClick={() => {
                          setAddLiquidity_Modal(false);
                        }}
                        src={Images.lefttwoline}
                      />
                      <p class="yahparagraph pl-2 pt-1">Add Liquidity</p>
                    </div>
                    <div>
                      <img
                        style={{ height: "25px", marginTop: "15px" }}
                        src={Images.setting}
                      />
                    </div>
                  </div>
                  <div
                    class="d-flex justify-content-between mt-5 pl-5 pr-5 pt-3"
                    style={{ backgroundColor: "#F4F5F6", borderRadius: "55px" }}
                  >
                    <button
                      class="d-flex"
                      style={{ border: "none", background: "none" }}
                      onClick={() => {
                        setLiquidityType(Enum.BTC);
                      }}
                    >
                      <p class="popupaddliquidty">BTC</p>
                    </button>
                    <button
                      class="d-flex"
                      style={{ border: "none", background: "none" }}
                      onClick={() => {
                        setLiquidityType(Enum.BTC_RUNE);
                      }}
                    >
                      <p class="popupaddliquidty">BTC + RUNE</p>
                    </button>
                    <button
                      class="d-flex"
                      style={{ border: "none", background: "none" }}
                      onClick={() => {
                        setLiquidityType(Enum.RUNE);
                      }}
                    >
                      <p class="popupaddliquidty">Rune</p>
                    </button>
                  </div>
                  {/*BTC*/}
                  {liquidityType === Enum.BTC ? (
                    <div class="pt-4 pl-3">
                      <p style={{ fontWeight: "bold", fontFamily: "DM Sans" }}>
                        Select BTC amount
                      </p>
                      <div class="d-flex">
                        <div class="input-group">
                          <input
                            style={{
                              borderRight: "none",
                              borderColor: "#E6E8EC",
                            }}
                            type="text"
                            class="form-control"
                            aria-label="Text input with segmented dropdown button"
                          />
                        </div>
                        <div class="input-group-append">
                          <button type="button" class="btn liquiditybutton">
                            ($234,435.50)
                          </button>
                          <img
                            src={Images.searchbarr}
                            class="search_icon_image"
                          />
                          <button
                            type="button"
                            class="btn liquiditybutton dropdown-toggle dropdown-toggle-split"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <span class="sr-only">Toggle Dropdown</span>
                          </button>
                          <div class="dropdown-menu">
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
                  ) : null}
                  {/*BTC_RUNE*/}
                  {liquidityType === Enum.BTC_RUNE ? (
                    <div class="pt-4 pl-3">
                      <div class="d-flex justify-content-between">
                        <p
                          style={{ fontWeight: "bold", fontFamily: "DM Sans" }}
                        >
                          Select BTC amount
                        </p>
                        <p
                          style={{ fontWeight: "bold", fontFamily: "DM Sans" }}
                        >
                          RUNE amount
                        </p>
                      </div>
                      <div class="d-flex justify-content-between">
                        <div class="input-group">
                          <input
                            style={{
                              borderRight: "none",
                              borderColor: "#E6E8EC",
                            }}
                            type="text"
                            class="form-control"
                            aria-label="Text input with segmented dropdown button"
                          />
                        </div>
                        <div class="input-group-append">
                          <button type="button" class="btn liquiditybutton">
                            ($234,435.50)
                          </button>
                          <img
                            src={Images.searchbarr}
                            class="search_icon_image"
                          />
                          <button
                            type="button"
                            class="btn liquiditybutton dropdown-toggle dropdown-toggle-split"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <span class="sr-only">Toggle Dropdown</span>
                          </button>
                          <div class="dropdown-menu">
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
                        <div class="input-group ml-3">
                          <input
                            style={{
                              borderRight: "none",
                              borderColor: "#E6E8EC",
                            }}
                            type="text"
                            class="form-control"
                            aria-label="Text input with segmented dropdown button"
                          />
                        </div>
                        <div class="input-group-append">
                          <button type="button" class="btn liquiditybutton">
                            ($234,435.50)
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {/*RUNE*/}
                  {liquidityType === Enum.RUNE ? (
                    <div class="pt-4 pl-3">
                      <p style={{ fontWeight: "bold", fontFamily: "DM Sans" }}>
                        Select RUNE amount
                      </p>
                      <div class="d-flex">
                        <div class="input-group">
                          <input
                            style={{
                              borderRight: "none",
                              borderColor: "#E6E8EC",
                            }}
                            type="text"
                            class="form-control"
                            aria-label="Text input with segmented dropdown button"
                          />
                        </div>
                        <div class="input-group-append">
                          <button type="button" class="btn liquiditybutton">
                            ($234,435.50)
                          </button>
                          <img
                            src={Images.searchbarr}
                            class="search_icon_image"
                          />
                          <button
                            type="button"
                            class="btn liquiditybutton dropdown-toggle dropdown-toggle-split"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <span class="sr-only">Toggle Dropdown</span>
                          </button>
                          <div class="dropdown-menu">
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
                  ) : null}
                  <hr style={{ marginTop: "3rem" }} class="solid" />
                  <div class="d-flex justify-content-between">
                    <p class="servicefee">Slip</p>
                    <p style={{ fontWeight: "bold", fontFamily: "DM Sans" }}>
                      0%
                    </p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="servicefee">Pool Share Estimated</p>
                    <p style={{ fontWeight: "bold", fontFamily: "DM Sans" }}>
                      0.363%
                    </p>
                  </div>
                  <div class="d-flex justify-content-between ">
                    <p class="servicefee">Total Fee</p>
                    <p style={{ fontWeight: "bold", fontFamily: "DM Sans" }}>
                      $0.721
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
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary btn-lg"
                    onClick={() => {
                      setAddLiquidity_Modal(false);
                    }}
                  >
                    I understand,continue
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- modal end --> */}
        </Modal.Body>
      </Modal>

      <button
        class="btn marketbuttonss "
        onClick={() => {
          setAddLiquidity_Modal(true);
        }}
      >
        Add Liquidity
      </button>
    </div>
  );
};
