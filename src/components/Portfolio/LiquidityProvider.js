import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import browserRoute from "../../Routes/browserRoutes";
import Images from "../Helper/AllImages";
import data from "../Helper/Data/LiquidityProvider_Funds";
import { AddLiquidity } from "../PopModals/AddLiquidity_Modal";
import TableBody from "./TableBody";
const LiquidityProvider = () => {
  const [tableData, setTableData] = useState(data);

  return (
    <div class="col-lg-7 marginleftcol mt-2">
      <div class="sidebarcoleight pt-3">
        <h4 style={{fontFamily:"DM Sans",fontWeight:"bold"}}>Liquidity providing </h4>
        <div class="d-flex justify-content-between pt-3">
          <div>
            <p style={{ margin: "0px",fontFamily:"DM Sans" }}>Total balance in pools</p>
            <p style={{ fontWeight: "bold", margin: "0px",fontFamily:"DM Sans" }}>
              7.25495219{" "}
              <span
                style={{
                  backgroundColor: "#58BD7D",
                  fontSize: "10px",
                  padding: "5px",
                  fontFamily:"DM Sans",
                  color: "#fff",
                  paddingLeft: "10px",
                  marginLeft:"10px",
                  paddingRight: "10px",
                  borderRadius: "5px",
                }}
              >
                BTC
              </span>
            </p>
            <p style={{fontFamily:"DM Sans"}}>$278,523.42</p>
          </div>
          <div class="d-flex">
            <div>
              <img src={Images.percentage} />
            </div>
            <div class="pl-4">
              <p style={{ margin: "0px",fontFamily:"Poppins",fontSize:"14px",color:"#353945",fontWeight:"500" }}>APY percentage</p>
              <p
                style={{ fontWeight: "bold", margin: "0px", color: "#58BD7D",fontFamily:"DM Sans" }}
              >
                11%{" "}
                <span
                  style={{
                    backgroundColor: "#58BD7D",
                    fontSize: "10px",
                    padding: "5px",
                    fontFamily:"DM Sans",
                    color: "#fff",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    marginLeft:"10px",
                    borderRadius: "5px",
                  }}
                >
                  Low Risk
                </span>
              </p>
            </div>
          </div>
          <div class="pr-5">
            <p style={{ margin: "0px",fontFamily:"DM Sans" }}>Current estimated APY</p>
            <p style={{ fontWeight: "bold", margin: "0px",fontFamily:"DM Sans" }}>
              0.82047819{" "}
              <span
                style={{
                  backgroundColor: "#B1B5C3",
                  fontSize: "10px",
                  padding: "5px",
                  color: "#fff",
                  fontFamily:"DM Sans",
                  paddingLeft: "10px",
                  marginLeft:"10px",
                  paddingRight: "10px",
                  borderRadius: "5px",
                }}
              >
                BTC
              </span>
            </p>
          </div>
        </div>
      </div>
      <p class="pt-3 pl-5" style={{ color: "#777E90", fontWeight: "bold",fontFamily:"DM Sans" }}>
        Funds
      </p>
      <div class="sidebarcoleight pt-3">
        <div class="d-flex justify-content-between">
        <form className="pr-5">
            <div class=" d-flex form-group has-search">
              <input
                style={{
                  borderRadius: "25px",
                  width: "250px",
                  paddingTop:"20px",
                  paddingBottom:"20px",
                  fontFamily: "DM Sans",
                }}
                type="text"
                class="form-control"
                placeholder="Search pool"
                aria-label="Search"
            
              />
              <span
                style={{ paddingTop: "15px", marginLeft: "-30px" }}
                class=" fa fa-search form-control-feedback"
              ></span>
            </div>
          </form>
          {/* <input
            style={{ width: "25%", borderRadius: "20px" }}
            class="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
          /> */}
          <p class="pr-5" style={{ color: "#777E90" }}>
            <Link
              to={browserRoute.PORTFOLIO_ACTIVITY}
              style={{ color: "rgb(119, 126, 144)",
                textDecoration: "none",
                fontSize: "12px",
                fontWeight: "600",
                fontFamily: "Poppins" }}
            >
              Transaction History
              <i
                className="fa fa-chevron-right ml-2 pt-1"
                style={{ fontSize: "10px" }}
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
                    style={{ color: "#353945", fontSize: "15px",fontFamily:"DM Sans"}}
                    scope="col"
                  >
                    Pools
                  </th>
                  <th
                    style={{ color: "#353945", fontSize: "15px",fontFamily:"DM Sans" }}
                    scope="col"
                  >
                    Yield rate
                  </th>
                  <th
                    style={{ color: "#353945", fontSize: "15px",fontFamily:"DM Sans" }}
                    scope="col"
                  >
                    Toatal Balance
                  </th>
                  <th
                    style={{ color: "#353945", fontSize: "15px",fontFamily:"DM Sans" }}
                    scope="col"
                  >
                    Available balance
                  </th>
                  <th
                    style={{ color: "#353945", fontSize: "15px",fontFamily:"DM Sans" }}
                    scope="col"
                    class="d-flex justify-content-end"
                  >
                    Interest
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((d, key) => {
                  return <TableBody d={d} key={key} />;
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
