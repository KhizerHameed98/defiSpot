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
                        style={{ height: "25px", marginTop: "12px" }}
                        onClick={() => {
                          setAddLiquidity_Modal(false);
                        }}
                        src={Images.lefttwoline}
                      />
                      <p class="yahparagraph pl-2 pt-3">Add Liquidity</p>
                    </div>
                    <div>
                      <img
                        style={{ height: "25px", marginTop: "15px" }}
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
                    <div class="pt-4 pl-3">
                      <p style={{ fontWeight: "bold", fontFamily: "DM Sans" }}>
                        Select BTC amount
                      </p>
                      <div class="d-flex">
                        <div class="input-group">
                          <input
                            type="number"
                            class="form-control"
                            style={{
                              color: "#23262f",
                              fontSize: "14px",
                              fontFamily: "Poppins",
                              paddingBottom: "25px",
                              borderRadius: "10px",
                              border: "2px solid #E6E8EC",
                              paddingTop: "25px",
                              fontWeight: "400",
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
                    </div>
                  ) : null}
                  {/*BTC_RUNE*/}
                  {liquidityType === Enum.BTC_RUNE ? (
                    <div class="pt-4 pl-3">
                      <div class="d-flex justify-content-between">
                        <p
                          style={{ fontWeight: "bold", fontFamily: "Poppins" }}
                        >
                          Select BTC amount
                        </p>
                        <p
                          style={{
                            fontWeight: "bold",
                            fontFamily: "Poppins",
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
                            class="form-control"
                            style={{
                              color: "#23262f",
                              fontSize: "14px",
                              fontFamily: "Poppins",
                              paddingBottom: "25px",
                              borderRadius: "10px",
                              border: "2px solid #E6E8EC",
                              paddingTop: "25px",
                              fontWeight: "400",
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

                        <div class="input-group ml-3">
                          <input
                            type="number"
                            class="form-control"
                            style={{
                              color: "#23262f",
                              fontSize: "14px",
                              fontFamily: "Poppins",
                              paddingBottom: "25px",
                              borderRadius: "10px",
                              border: "2px solid #E6E8EC",
                              paddingTop: "25px",
                              fontWeight: "400",
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
                    <div class="pt-4 pl-3">
                      <p style={{ fontWeight: "bold", fontFamily: "DM Sans" }}>
                        Select RUNE amount
                      </p>
                      <div class="d-flex">
                        <div class="input-group">
                          <input
                            type="number"
                            class="form-control"
                            style={{
                              color: "#23262f",
                              fontSize: "14px",
                              fontFamily: "Poppins",
                              paddingBottom: "25px",
                              borderRadius: "10px",
                              border: "2px solid #E6E8EC",
                              paddingTop: "25px",
                              fontWeight: "400",
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
                      fontFamily: "Poppins",
                      borderRadius: "25px",
                      fontWeight: "bold",
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
