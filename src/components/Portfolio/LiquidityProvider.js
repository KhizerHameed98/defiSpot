import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import browserRoute from "../../Routes/browserRoutes";
import Images from "../Helper/AllImages";
import data from "../Helper/Data/LiquidityProvider_Funds";
const LiquidityProvider = () => {
  const [tableData, setTableData] = useState(data);

  return (
    <div class="col-lg-7 marginleftcol mt-2">
      <div class="sidebarcoleight pt-3">
        <h4>Liquidity providing </h4>
        <div class="d-flex justify-content-between pt-3">
          <div>
            <p style={{ margin: "0px" }}>Total balance in pools</p>
            <p style={{ fontWeight: "bold", margin: "0px" }}>
              7.25495219{" "}
              <span
                style={{
                  backgroundColor: "#58BD7D",
                  fontSize: "10px",
                  padding: "5px",
                  color: "#fff",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                  borderRadius: "15px",
                }}
              >
                BTC
              </span>
            </p>
            <p>$278,523.42</p>
          </div>
          <div class="d-flex">
            <div>
              <img src={Images.percentage} />
            </div>
            <div class="pl-4">
              <p style={{ margin: "0px" }}>APY percentage</p>
              <p
                style={{ fontWeight: "bold", margin: "0px", color: "#58BD7D" }}
              >
                11%{" "}
                <span
                  style={{
                    backgroundColor: "#58BD7D",
                    fontSize: "10px",
                    padding: "5px",
                    color: "#fff",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    borderRadius: "15px",
                  }}
                >
                  Low Risk
                </span>
              </p>
            </div>
          </div>
          <div class="pr-5">
            <p style={{ margin: "0px" }}>Current estimated APY</p>
            <p style={{ fontWeight: "bold", margin: "0px" }}>
              0.82047819{" "}
              <span
                style={{
                  backgroundColor: "#B1B5C3",
                  fontSize: "10px",
                  padding: "5px",
                  color: "#fff",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                  borderRadius: "15px",
                }}
              >
                BTC
              </span>
            </p>
          </div>
        </div>
      </div>
      <p class="pt-3 pl-3" style={{ color: "#777E90", fontWeight: "bold" }}>
        Funds
      </p>
      <div class="sidebarcoleight pt-3">
        <div class="d-flex justify-content-between">
          <input
            style={{ width: "25%", borderRadius: "20px" }}
            class="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
          <p class="pr-5" style={{ color: "#777E90" }}>
            <Link
              to={browserRoute.PORTFOLIO_ACTIVITY}
              style={{ color: "#777E90", textDecoration: "none" }}
            >
              Transaction History
              <i
                className="fa fa-chevron-right ml-2 "
                style={{ fontSize: "13px" }}
              ></i>
            </Link>
          </p>
        </div>
        <div id="starred" class="bg-white px-2  mt-3 pb-5">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th
                    style={{ color: "#353945", fontSize: "15px" }}
                    scope="col"
                  >
                    Pools
                  </th>
                  <th
                    style={{ color: "#353945", fontSize: "15px" }}
                    scope="col"
                  >
                    Yield rate
                  </th>
                  <th
                    style={{ color: "#353945", fontSize: "15px" }}
                    scope="col"
                  >
                    Toatal Balance
                  </th>
                  <th
                    style={{ color: "#353945", fontSize: "15px" }}
                    scope="col"
                  >
                    Available balance
                  </th>
                  <th
                    style={{ color: "#353945", fontSize: "15px" }}
                    scope="col"
                    class="d-flex justify-content-end"
                  >
                    Interest
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((d, key) => {
                  return (
                    <tr style={{ cursor: "pointer" }}>
                      <td>
                        <div class="d-flex">
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
                      </td>
                      <td>
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
                      <td>
                        <div style={{ fontWeight: "bold" }}>
                          {d.Total_Balance} BTC
                        </div>
                        <div>
                          <div
                            class=" text-muted "
                            style={{ color: "#777E90" }}
                          >
                            ${d.Price}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: "bold" }}>
                          {d.Available_Balance} BTC
                        </div>
                        <div>
                          <div
                            class=" text-muted "
                            style={{ color: "#777E90" }}
                          >
                            ${d.Price}
                          </div>
                        </div>
                      </td>
                      <td>
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidityProvider;
