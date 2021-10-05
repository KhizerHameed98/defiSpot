import React from "react";
import Images from "../Helper/AllImages";
import { AddLiquidity } from "../PopModals/AddLiquidity_Modal";
import Withdraw_Modal from "../PopModals/Withdraw_Modal";

const TableBody = ({ d }) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <tr>
        <td>
          <div
            class="d-flex"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            <img src={Images.bnb} />
            <div class="pl-3">
              <div
                style={{
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
              >
                {d.Pool}
              </div>
              <div class="d-flex align-items-center">
                <div
                  class=" text-muted"
                  style={{ fontSize: "12px", fontWeight: "bold" }}
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

        <td
          style={{ cursor: "pointer" }}
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          <div class="d-flex flex-column">
            <div>
              <span
                class="pl-2 pr-2 pt-1 pb-1"
                style={{
                  backgroundColor: "#58BD7D",
                  borderRadius: "10px",
                }}
              >
                {d.Yield_Rate}% APR
              </span>
            </div>
          </div>
        </td>
        <td
          style={{ cursor: "pointer" }}
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          <div style={{ fontWeight: "bold" }}>{d.Total_Balance} BTC</div>
          <div>
            <div class=" text-muted " style={{ color: "#777E90" }}>
              ${d.Price}
            </div>
          </div>
        </td>
        <td
          style={{ cursor: "pointer" }}
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          <div style={{ fontWeight: "bold" }}>{d.Available_Balance} BTC</div>
          <div>
            <div class=" text-muted " style={{ color: "#777E90" }}>
              ${d.Price}
            </div>
          </div>
        </td>
        <td
          style={{ cursor: "pointer" }}
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          <div
            class="d-flex justify-content-end"
            style={{ fontWeight: "bold" }}
          >
            {d.Interest} BTC
          </div>
          <div class="d-flex justify-content-end">
            <div class=" text-muted" style={{ color: "#777E90" }}>
              ${d.Price}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TableBody;
