import React, { useState, useEffect } from "react";
import Images from "../Helper/AllImages";
import { AddLiquidity } from "../PopModals/AddLiquidity_Modal";
import Withdraw_Modal from "../PopModals/Withdraw_Modal";

const TableBody = ({
  d,
  Key,
  setKeyState,
  keyState,
  closeAll,
  setCloseAll,
}) => {
  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    if (Key !== keyState) {
      setShowModal(false);
    }
  }, [closeAll]);
  const handlePopUpModal = () => {
    setKeyState(Key);
    setCloseAll(!closeAll);
    setShowModal(true);
  };

  return (
    <>
      <tr>
        <td>
          <div
            class="d-flex"
            style={{ cursor: "pointer" }}
            onClick={handlePopUpModal}
          >
            <img src={d.image} style={{ width: "32px", height: "32px" }} />
            <div class="pl-3">
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "14px",
                  fontFamily: "Poppins",
                  color: "#23262f",
                }}
              >
                {d.Pool}
              </div>
              <div class="d-flex align-items-center">
                <div
                  class=" text-muted"
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    fontFamily: "Poppins",
                  }}
                >
                  {d.FullName}
                </div>
              </div>
            </div>
          </div>
          {showModal ? (
            <div className="mt-3" style={{ display: "flex" }}>
              <AddLiquidity />
              <Withdraw_Modal />
            </div>
          ) : null}
        </td>

        <td style={{ cursor: "pointer" }} onClick={handlePopUpModal}>
          <div class="d-flex flex-column">
            <div>
              <span className="depositclasss">{d.Yield_Rate}% APR</span>
            </div>
          </div>
        </td>
        <td style={{ cursor: "pointer" }} onClick={handlePopUpModal}>
          <div
            style={{
              fontWeight: "600",
              fontSize: "14px",
              fontFamily: "Poppins",
              color: "#23262f",
            }}
          >
            {d.Total_Balance} BTC
          </div>
          <div>
            <div
              class=" text-muted "
              style={{
                color: "#777E90",
                fontFamily: "Poppins",
                fontSize: "14px",
              }}
            >
              ${d.Price}
            </div>
          </div>
        </td>
        <td style={{ cursor: "pointer" }} onClick={handlePopUpModal}>
          <div
            style={{
              fontWeight: "600",
              fontSize: "14px",
              fontFamily: "Poppins",
              color: "#23262f",
            }}
          >
            {d.Available_Balance} BTC
          </div>
          <div>
            <div
              class=" text-muted "
              style={{
                color: "#777E90",
                fontFamily: "Poppins",
                fontSize: "14px",
              }}
            >
              ${d.Price}
            </div>
          </div>
        </td>
        <td style={{ cursor: "pointer" }} onClick={handlePopUpModal}>
          <div
            class="d-flex justify-content-end"
            style={{
              fontWeight: "600",
              fontSize: "14px",
              fontFamily: "Poppins",
              color: "#23262f",
            }}
          >
            {d.Interest} BTC
          </div>
          <div class="d-flex justify-content-end">
            <div
              class=" text-muted"
              style={{
                color: "#777E90",
                fontFamily: "Poppins",
                fontSize: "14px",
              }}
            >
              ${d.Price}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TableBody;
