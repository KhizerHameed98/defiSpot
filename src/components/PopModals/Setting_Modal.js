import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SET_SETTINGS } from "../../Redux/actions/types";
import { NGROK } from "../../Services/mainServices";
import Images from "../Helper/AllImages";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

const Setting_Modal = ({ setSlippagePercent }) => {
  const mainState = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const [settingModal, setSettingModal] = useState(false);
  const [slippage, setSlippage] = useState(0);
  const [customSlippage, setCustomSlippage] = useState("");
  const [inputType, setInputType] = useState("text");
  const [customFlag, setCustomFlag] = useState();
  const [speed, setSpeed] = useState("");

  useEffect(() => {
    console.log("OUT MAIN ><><><><<>><>");
    if (mainState) {
      console.log("mainState ><><><><<><><><><> ", mainState.settings);
      setCustomFlag(mainState.settings.custom);
      setSlippage(mainState.settings.slip);
      setSpeed(mainState.settings.speed);
      setCustomSlippage(mainState.settings.slip);
    }
  }, [mainState]);

  useEffect(() => {
    console.log("+++++++======== ", customFlag);
  }, [customFlag]);

  const handleSlippageInput = (e) => {
    setCustomSlippage(e.target.value);
  };

  const handleBLurInput = () => {
    setInputType("text");
    console.log(`HHHH ${customSlippage.split("%")[0]}%`);
    if (customSlippage.split("%")[0].length > 0)
      setCustomSlippage(`${customSlippage}%`);
  };

  const handleFocusInput = () => {
    setInputType("number");
    setCustomSlippage("");
    if (Number(customSlippage?.split("%")[0]) > 0) {
      setCustomSlippage(customSlippage?.split("%")[0]);
    }
  };

  const handleSave = async () => {
    const account = await web3.eth.getAccounts();
    const data = {
      slip: customFlag ? `${customSlippage}` : `${slippage}`,

      custom: customFlag,

      speed: speed,

      accountAddress: `${account[0]}`,
    };

    console.log("DATA TO SEND <><><><<> ", data);
    await axios.post(`${NGROK}/add/user/history`, data).then((res) => {
      dispatch({
        type: SET_SETTINGS,
        payload: {
          settings: {
            custom: customFlag,
            slip: customFlag ? customSlippage : slippage,
            speed: speed,
          },
        },
      });

      setSlippagePercent(slippage);
      setSettingModal(false);
    });
  };
  return (
    <div>
      {/* settong modal */}

      {/*AddLiquidity PopUp Modal BTC */}
      <Modal
        show={settingModal}
        onHide={() => {
          setSettingModal(false);
          if (mainState?.length) {
            console.log("mainState ><><><><<><><><><> ", mainState.settings);
            setCustomFlag(mainState.settings.custom);
            setSlippage(mainState.settings.slip);
            setSpeed(mainState.settings.speed);
            setCustomSlippage(mainState.settings.slip);
          }
          // setModal(true);
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
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setSettingModal(false);
                          if (mainState?.length) {
                            console.log(
                              "mainState ><><><><<><><><><> ",
                              mainState.settings
                            );
                            setCustomFlag(mainState.settings.custom);
                            setSlippage(mainState.settings.slip);
                            setSpeed(mainState.settings.speed);
                            setCustomSlippage(mainState.settings.slip);
                          }
                        }}
                        src={Images.lefttwoline}
                      />
                      <p class="yahparagraph">Settings</p>
                    </div>
                    <div>
                      <img
                        className="popupcrosss"
                        onClick={() => {
                          setSettingModal(false);
                          if (mainState?.length) {
                            console.log(
                              "mainState ><><><><<><><><><> ",
                              mainState.settings
                            );
                            setCustomFlag(mainState.settings.custom);
                            setSlippage(mainState.settings.slip);
                            setSpeed(mainState.settings.speed);
                            setCustomSlippage(mainState.settings.slip);
                          }
                          // setModal(true);
                        }}
                        src={Images.crossicon}
                      />
                    </div>
                  </div>
                  <div>
                    <p style={{ fontFamily: "Poppins", marginTop: "32px" }}>
                      Slipperage Tolerance
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>
                      <input
                        type={inputType}
                        class="btn w-secondaryInpput 123"
                        style={{
                          textAlign: "left",
                          width: "80px",
                          boxShadow: customFlag
                            ? "0 0 0 0.2rem rgb(0 123 255 / 25%)"
                            : "none",
                        }}
                        placeholder="1%"
                        value={customSlippage}
                        onChange={handleSlippageInput}
                        onBlur={handleBLurInput}
                        onFocus={handleFocusInput}
                        onClick={() => {
                          setCustomFlag(true);
                        }}
                      />
                    </div>
                    {/* <button
                      type="button"
                      class="btn n-secondaryButton 123"
                      style={{ width: "80px" }}
                      onClick={() => {
                        setSlippage(1);
                      }}
                    >
                      1%
                     
                    </button> */}
                    <button
                      style={{
                        width: "80px",
                        boxShadow:
                          !customFlag && slippage == 0.5
                            ? "0 0 0 0.2rem rgb(0 123 255 / 25%)"
                            : "none",
                      }}
                      type="button"
                      class="btn n-secondaryButton"
                      onClick={() => {
                        setSlippage(0.5);
                        setCustomFlag(false);
                      }}
                    >
                      0.5%
                      {/* <img className="mb-1" src={Images.morearticle}/> */}
                    </button>
                    <button
                      style={{
                        width: "80px",
                        boxShadow:
                          !customFlag && slippage == 1
                            ? "0 0 0 0.2rem rgb(0 123 255 / 25%)"
                            : "none",
                      }}
                      type="button"
                      class="btn n-secondaryButton"
                      onClick={() => {
                        setSlippage(1);
                        setCustomFlag(false);
                      }}
                    >
                      1%
                      {/* <img className="mb-1" src={Images.morearticle}/> */}
                    </button>
                    <button
                      style={{
                        width: "80px",
                        boxShadow:
                          !customFlag && slippage == 3
                            ? "0 0 0 0.2rem rgb(0 123 255 / 25%)"
                            : "none",
                      }}
                      type="button"
                      class="btn n-secondaryButton"
                      onClick={() => {
                        setSlippage(3);
                        setCustomFlag(false);
                      }}
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
                      style={{
                        width: "80px",
                        boxShadow:
                          speed == "normal"
                            ? "0 0 0 0.2rem rgb(0 123 255 / 25%)"
                            : "none",
                      }}
                      type="button"
                      class="btn n-secondaryButton"
                      onClick={() => setSpeed("normal")}
                    >
                      Normal
                      {/* <img className="mb-1" src={Images.morearticle}/> */}
                    </button>
                    <button
                      style={{
                        width: "80px",
                        boxShadow:
                          speed == "fast"
                            ? "0 0 0 0.2rem rgb(0 123 255 / 25%)"
                            : "none",
                      }}
                      type="button"
                      class="btn n-secondaryButton"
                      onClick={() => setSpeed("fast")}
                    >
                      Fast
                      {/* <img className="mb-1" src={Images.morearticle}/> */}
                    </button>
                    <button
                      style={{
                        width: "80px",
                        boxShadow:
                          speed == "instant"
                            ? "0 0 0 0.2rem rgb(0 123 255 / 25%)"
                            : "none",
                      }}
                      type="button"
                      class="btn n-secondaryButton"
                      onClick={() => setSpeed("instant")}
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
                      onClick={handleSave}
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
            // setModal(false);
          }}
          style={{ height: "20px" }}
          src={Images.setting}
        />
      </div>
    </div>
  );
};

export default Setting_Modal;
