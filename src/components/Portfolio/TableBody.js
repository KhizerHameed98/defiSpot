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
      <tr class="n-tableHover"

      // style={{ borderBottom: "1px solid #E6E8EC" }}
      >
        <td>
          <div
            class="d-flex"
            style={{ cursor: "pointer" }}
            onClick={handlePopUpModal}
          >
            <img src={d.image} style={{ width: "32px", height: "32px" }} />
            <div class="pl-3">
              <div class="n-tabelDark">{d.Pool}</div>
              <div class="d-flex align-items-center">
                <div class=" text-muted">{d.FullName}</div>
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

        <td
          className="text-right"
          style={{ cursor: "pointer" }}
          onClick={handlePopUpModal}
        >
          <span className="depositclasss">{d.Yield_Rate}% APY</span>
        </td>
        <td
          className="text-right"
          style={{ cursor: "pointer" }}
          onClick={handlePopUpModal}
        >
          <div
            style={{
              textAlign: "end",
            }}
            class="n-tabelDark"
          >
            {d.Total_Balance} BTC
          </div>
          <div>
            <div
              class=" text-muted "
              style={{
                textAlign: "end",
              }}
            >
              ${d.Price}
            </div>
          </div>
        </td>
        <td
          className="text-right"
          style={{ cursor: "pointer" }}
          onClick={handlePopUpModal}
        >
          <div
            style={{
              textAlign: "end",
            }}
            class="n-tabelDark"
          >
            {d.Available_Balance} BTC
          </div>
          <div>
            <div
              class=" text-muted "
              style={{
                textAlign: "end",
              }}
            >
              ${d.Price}
            </div>
          </div>
        </td>
        <td
          className="text-right"
          style={{ cursor: "pointer" }}
          onClick={handlePopUpModal}
        >
          <div
            class="d-flex justify-content-end n-tabelDark"
            style={{
              textAlign: "end",
            }}
          >
            {d.Interest} BTC
          </div>
          <div class="d-flex justify-content-end">
            <div
              class=" text-muted"
              style={{
                textAlign: "end",
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
