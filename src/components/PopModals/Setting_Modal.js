import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Images from "../Helper/AllImages";

const Setting_Modal = ({ setModal }) => {
  const [settingModal, setSettingModal] = useState(false);

  return (
    <div>
      {/* settong modal */}

      {/*AddLiquidity PopUp Modal BTC */}
      <Modal
        show={settingModal}
        onHide={() => {
          setSettingModal(false);
          setModal(true);
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
                        class=""
                        style={{
                          height: "10px",
                          marginTop: "15px",
                          paddingRight: "12px",
                        }}
                        src={Images.lefttwoline}
                      />
                      <p class="yahparagraph">Setting</p>
                    </div>
                    <div>
                      <img
                        className="popupcrosss"
                        onClick={() => {
                          setSettingModal(false);
                          setModal(true);
                        }}
                        src={Images.crossicon}
                      />
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
                      class="btn n-secondaryButton 123"
                      style={{ width: "80px" }}
                    >
                      1%
                      {/* <img className="mb-1" src={Images.morearticle}/> */}
                    </button>
                    <button
                      style={{ width: "80px" }}
                      type="button"
                      class="btn n-secondaryButton"
                    >
                      0.5%
                      {/* <img className="mb-1" src={Images.morearticle}/> */}
                    </button>
                    <button
                      style={{ width: "80px" }}
                      style={{ width: "80px" }}
                      type="button"
                      class="btn n-secondaryButton"
                    >
                      1%
                      {/* <img className="mb-1" src={Images.morearticle}/> */}
                    </button>
                    <button
                      style={{ width: "80px" }}
                      type="button"
                      class="btn n-secondaryButton"
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
                      style={{ width: "80px" }}
                      type="button"
                      class="btn n-secondaryButton"
                    >
                      Normal
                      {/* <img className="mb-1" src={Images.morearticle}/> */}
                    </button>
                    <button
                      style={{ width: "80px" }}
                      type="button"
                      class="btn n-secondaryButton"
                    >
                      Fast
                      {/* <img className="mb-1" src={Images.morearticle}/> */}
                    </button>
                    <button
                      style={{ width: "80px" }}
                      type="button"
                      class="btn n-secondaryButton"
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

      <div>
        <img
          onClick={() => {
            // setModal(false);
            setSettingModal(true);
            setModal(false);
          }}
          style={{ height: "25px", marginTop: "15px" }}
          src={Images.setting}
        />
      </div>
    </div>
  );
};

export default Setting_Modal;
