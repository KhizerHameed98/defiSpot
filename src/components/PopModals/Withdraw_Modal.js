import { da } from "date-fns/locale";
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Images from "../Helper/AllImages";

const Withdraw_Modal = ({ data }) => {
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
                      {/* <img
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
                      /> */}
                      <svg
                        className="backArrow mr-2"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          setSettingModal(false);
                          setWithdraw_Modal(true);
                        }}
                        style={{
                          marginTop: "2px",
                        }}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M18.9428 10.3905C19.4635 10.9112 19.4635 11.7554 18.9428 12.2761L15.219 16L18.9428 19.7239C19.4635 20.2446 19.4635 21.0888 18.9428 21.6095C18.4221 22.1302 17.5779 22.1302 17.0572 21.6095L12.3905 16.9428C11.8698 16.4221 11.8698 15.5779 12.3905 15.0572L17.0572 10.3905C17.5779 9.86983 18.4221 9.86983 18.9428 10.3905Z"
                          fill="#23262F"
                        />
                      </svg>
                      <p class="yahparagraph">Settings</p>
                    </div>
                    <div>
                      {/* <svg
                        className="u-widtradre8777"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          setSettingModal(false);
                          setWithdraw_Modal(true);
                        }}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                          fill="#23262F"
                        />
                      </svg> */}
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="n-modalCloseIcon"
                        onClick={() => {
                          setSettingModal(false);
                          setWithdraw_Modal(true);
                        }}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                          fill="#23262F"
                        />
                        <rect
                          x="1"
                          y="1"
                          width="38"
                          height="38"
                          rx="19"
                          stroke="#E6E8EC"
                          stroke-width="2"
                        />
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
                      Slipperage Tolerance
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
                      <p class="yahparagraph pl-2">Withdraw</p>
                    </div>
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
                          setWithdraw_Modal(true);
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
                        onClick={() => {
                          // setModal(false);
                          setSettingModal(true);
                          setWithdraw_Modal(false);
                        }}
                        style={{
                          height: "25px",
                          marginTop: "15px",
                          marginLeft: "10px",
                          cursor: "pointer",
                        }}
                      /> */}
                      {/* <img
                        className="popupcrosss"
                        onClick={() => {
                          setSettingModal(false);
                          setWithdraw_Modal(true);
                        }}
                        src={Images.crossicon}
                      /> */}
                      {/* <img
                        onClick={() => {
                          // setModal(false);
                          setSettingModal(true);
                          setWithdraw_Modal(false);
                        }}
                        style={{
                          height: "25px",
                          marginTop: "15px",
                          marginLeft: "10px",
                          cursor: "pointer",
                        }}
                        src={Images.setting}
                      /> */}
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          setSettingModal(true);
                          setWithdraw_Modal(false);
                        }}
                        style={{cursor: "pointer", marginTop: "6px"}}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19.9495 7.09139C19.9599 6.31029 19.6671 5.52591 19.0711 4.92991C18.4751 4.33391 17.6907 4.04111 16.9096 4.0515C16.9093 4.0515 16.9099 4.05149 16.9096 4.0515C16.4779 4.05737 16.0463 4.15587 15.649 4.34699C15.5066 4.41548 15.3685 4.49587 15.2362 4.58815C15.1852 4.62369 15.1196 4.6318 15.0623 4.608C15.0049 4.58422 14.9642 4.5321 14.9533 4.47099C14.925 4.31217 14.8842 4.15768 14.832 4.00856C14.6862 3.59249 14.4513 3.2183 14.1501 2.90888C14.1499 2.90867 14.1503 2.90909 14.1501 2.90888C13.6052 2.34921 12.8429 2.00098 12 2.00098C11.1571 2.00098 10.3954 2.34858 9.85047 2.90824C9.85027 2.90845 9.85068 2.90803 9.85047 2.90824C9.54935 3.21766 9.31383 3.59249 9.16804 4.00856C9.11578 4.15768 9.07498 4.31217 9.04667 4.47099C9.03577 4.5321 8.99509 4.58422 8.93775 4.608C8.88036 4.6318 8.81477 4.62369 8.76382 4.58815C8.6315 4.49587 8.4934 4.41548 8.35102 4.34699C7.95371 4.15587 7.52302 4.05738 7.09129 4.05151C7.091 4.05151 7.09159 4.05151 7.09129 4.05151C6.3102 4.04112 5.52493 4.33391 4.92893 4.92991C4.33293 5.52591 4.04013 6.31029 4.05052 7.09139C4.05053 7.09168 4.05052 7.0911 4.05052 7.09139C4.05639 7.52311 4.15489 7.95468 4.34601 8.35199C4.4145 8.49437 4.49489 8.63247 4.58717 8.76479C4.62271 8.81575 4.63082 8.88133 4.60702 8.93872C4.58325 8.99607 4.53113 9.03675 4.47001 9.04765C4.31119 9.07596 4.15669 9.11677 4.00757 9.16902C3.5915 9.31482 3.21732 9.54972 2.9079 9.85083C2.90769 9.85104 2.90811 9.85063 2.9079 9.85083C2.34823 10.3958 2 11.1581 2 12.001C2 12.8438 2.3476 13.6055 2.90727 14.1505C2.90748 14.1507 2.90706 14.1503 2.90727 14.1505C3.21669 14.4516 3.5915 14.6871 4.00757 14.8329C4.15669 14.8852 4.31119 14.926 4.47001 14.9543C4.53113 14.9652 4.58325 15.0059 4.60702 15.0632C4.63082 15.1206 4.62271 15.1862 4.58717 15.2372C4.49489 15.3695 4.4145 15.5076 4.34601 15.65C4.15489 16.0473 4.0564 16.478 4.05053 16.9097C4.05053 16.91 4.05054 16.9094 4.05053 16.9097C4.04014 17.6908 4.33293 18.476 4.92893 19.072C5.52493 19.668 6.30932 19.9608 7.09041 19.9505C7.09071 19.9505 7.09012 19.9505 7.09041 19.9505C7.52213 19.9446 7.9537 19.8461 8.351 19.655C8.49339 19.5865 8.63149 19.5061 8.76381 19.4138C8.81477 19.3783 8.88036 19.3702 8.93775 19.394C8.99509 19.4177 9.03578 19.4699 9.04667 19.531C9.07498 19.6898 9.11579 19.8443 9.16805 19.9934C9.31385 20.4095 9.54874 20.7837 9.84986 21.0931C9.85006 21.0933 9.84965 21.0929 9.84986 21.0931C10.3948 21.6527 11.1571 22.001 12 22.001C12.8429 22.001 13.6046 21.6534 14.1495 21.0937C14.1497 21.0935 14.1493 21.0939 14.1495 21.0937C14.4506 20.7843 14.6862 20.4095 14.832 19.9934C14.8842 19.8443 14.925 19.6898 14.9533 19.531C14.9642 19.4699 15.0049 19.4177 15.0623 19.394C15.1196 19.3702 15.1852 19.3783 15.2362 19.4138C15.3685 19.5061 15.5066 19.5865 15.649 19.655C16.0463 19.8461 16.477 19.9446 16.9087 19.9504C16.909 19.9504 16.9084 19.9504 16.9087 19.9504C17.6898 19.9608 18.4751 19.668 19.0711 19.072C19.6671 18.476 19.9599 17.6917 19.9495 16.9106C19.9495 16.9103 19.9495 16.9109 19.9495 16.9106C19.9436 16.4788 19.8451 16.0473 19.654 15.65C19.5855 15.5076 19.5051 15.3695 19.4128 15.2372C19.3773 15.1862 19.3692 15.1206 19.393 15.0632C19.4168 15.0059 19.4689 14.9652 19.53 14.9543C19.6888 14.926 19.8433 14.8852 19.9924 14.8329C20.4085 14.6871 20.7827 14.4522 21.0921 14.1511C21.0923 14.1509 21.0919 14.1513 21.0921 14.1511C21.6518 13.6061 22 12.8439 22 12.001C22 11.1581 21.6524 10.3964 21.0927 9.85145C21.0925 9.85124 21.0929 9.85166 21.0927 9.85145C20.7833 9.55033 20.4085 9.31482 19.9924 9.16902C19.8433 9.11677 19.6888 9.07596 19.53 9.04765C19.4689 9.03675 19.4168 8.99607 19.393 8.93872C19.3692 8.88133 19.3773 8.81575 19.4128 8.76479C19.5051 8.63247 19.5855 8.49436 19.654 8.35198C19.8451 7.95467 19.9436 7.5231 19.9495 7.09139C19.9495 7.0911 19.9495 7.09168 19.9495 7.09139ZM17.6569 6.34412C17.3104 5.9977 16.7691 5.95742 16.3803 6.22859C15.7904 6.64002 15.0069 6.7502 14.2962 6.45546C13.5872 6.16149 13.1107 5.53082 12.9844 4.82196C12.9012 4.35527 12.4899 4.00098 12 4.00098C11.5101 4.00098 11.0988 4.35527 11.0156 4.82196C10.8893 5.53081 10.4128 6.16148 9.70384 6.45546C8.99308 6.75019 8.20964 6.64002 7.61972 6.22859C7.2309 5.95741 6.68956 5.9977 6.34314 6.34412C5.99673 6.69054 5.95644 7.23187 6.22762 7.6207C6.63904 8.21062 6.74922 8.99406 6.45448 9.70482C6.16051 10.4137 5.52984 10.8903 4.82098 11.0166C4.35429 11.0998 4 11.5111 4 12.001C4 12.4909 4.35429 12.9022 4.82098 12.9853C5.52984 13.1117 6.16051 13.5882 6.45448 14.2971C6.74922 15.0079 6.63904 15.7913 6.22762 16.3813C5.95644 16.7701 5.99673 17.3114 6.34315 17.6578C6.68957 18.0042 7.2309 18.0445 7.61972 17.7734C8.20963 17.3619 8.99307 17.2518 9.70384 17.5465C10.4128 17.8405 10.8893 18.4711 11.0156 19.18C11.0988 19.6467 11.5101 20.001 12 20.001C12.4899 20.001 12.9012 19.6467 12.9844 19.18C13.1107 18.4711 13.5872 17.8405 14.2961 17.5465C15.0069 17.2517 15.7904 17.3619 16.3803 17.7734C16.7691 18.0445 17.3104 18.0042 17.6569 17.6578C18.0033 17.3114 18.0436 16.7701 17.7724 16.3813C17.361 15.7913 17.2508 15.0079 17.5455 14.2971C17.8395 13.5882 18.4702 13.1117 19.179 12.9853C19.6457 12.9022 20 12.4909 20 12.001C20 11.5111 19.6457 11.0998 19.179 11.0166C18.4702 10.8903 17.8395 10.4137 17.5455 9.70482C17.2508 8.99405 17.361 8.21061 17.7724 7.6207C18.0436 7.23187 18.0033 6.69054 17.6569 6.34412Z"
                          fill="#777E91"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 14.001C13.1046 14.001 14 13.1055 14 12.001C14 10.8964 13.1046 10.001 12 10.001C10.8954 10.001 10 10.8964 10 12.001C10 13.1055 10.8954 14.001 12 14.001ZM12 16.001C14.2091 16.001 16 14.2101 16 12.001C16 9.79184 14.2091 8.00098 12 8.00098C9.79086 8.00098 8 9.79184 8 12.001C8 14.2101 9.79086 16.001 12 16.001Z"
                          fill="#777E91"
                        />
                      </svg>
                    </div>
                  </div>
                  <p
                    class="pt-3 pl-2"
                    style={{ fontWeight: "bold", fontFamily: "DM Sans", color: "rgb(119, 126, 144)" }}
                  >
                    Recieve in
                  </p>
                  <div
                    class="d-flex justify-content-between mt-2 pl-5 pr-5 pt-1 pb-1 n-liquidityTabs"
                    style={{
                      backgroundColor: "#F4F5F6",
                      // borderCollapse: "55px",
                      borderRadius: "55px",
                    }}
                  >
                    <div class="d-flex">
                      <p class="popupaddliquidty">{data?.asset}</p>
                    </div>
                    <div class="d-flex">
                      <p class="popupaddliquidty">{data?.asset} + RUNE</p>
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
                          <p
                            class="btcnativewithdraw pl-3 mt-3"
                            style={{ fontWeight: "500", fontFamily: "DM Sans",color: "rgb(119, 126, 144)" }}
                          >
                            {data?.asset}
                            <br />
                            <span
                              style={{
                                color: "rgb(119, 126, 144)",
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
                          style={{ fontWeight: "600", fontFamily: "DM Sans",color: "rgb(119, 126, 144)" }}
                        >
                          Pool Share: 0.7054%
                        </p>
                      </div>
                    </div>
                    {/* <hr class="solid" /> */}
                    <div class="pl-5 pr-5  ">
                      <div class="d-flex justify-content-between">
                        <p class="servicefee pt-4">{data?.asset} share</p>
                        <p
                          class="pt-4"
                          style={{ fontWeight: "600", fontFamily: "DM Sans", color: "rgb(119, 126, 144)" }}
                        >
                          5 {data?.asset}
                        </p>
                      </div>
                      <div class="d-flex justify-content-between">
                        <p class="servicefee">RUNE share</p>
                        <p style={{ fontWeight: "600", fontFamily: "DM Sans", color: "rgb(119, 126, 144)" }}>
                          2,222,369.93 RUNE
                        </p>
                      </div>
                      <div class="d-flex justify-content-between ">
                        <p class="servicefee">LP Units</p>
                        <p style={{ fontWeight: "600", fontFamily: "DM Sans", color: "rgb(119, 126, 144)" }}>
                          17.19
                        </p>
                      </div>
                      <div class="d-flex justify-content-between ">
                        <p class="servicefee">Last added</p>
                        <p style={{ fontWeight: "600", fontFamily: "DM Sans" }}>
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
                    <p class="servicefee">{ data?.asset}</p>
                    <p style={{ fontWeight: "600", fontFamily: "DM Sans", color: "rgb(119, 126, 144)" }}>
                      2.5
                    </p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="servicefee">RUNE</p>
                    <p style={{ fontWeight: "600", fontFamily: "DM Sans", color: "rgb(119, 126, 144)" }}>
                      1,142,761.32
                    </p>
                  </div>
                  <div class="d-flex justify-content-between ">
                    <p style={{ fontWeight: "600", fontFamily: "DM Sans", color: "rgb(119, 126, 144)" }}>
                      Total Fee
                    </p>
                    <p style={{ fontWeight: "600", fontFamily: "DM Sans", color: "rgb(119, 126, 144)" }}>
                      $0.927
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
                      paddingTop: "10px",
                      paddingBottom: "10px",
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
        class="btn n-secondaryButton n-secndaryDark ml-2 "
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
