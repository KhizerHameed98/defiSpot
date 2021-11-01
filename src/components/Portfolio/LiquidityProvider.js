import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import browserRoute from "../../Routes/browserRoutes";
import Images from "../Helper/AllImages";
import data from "../Helper/Data/LiquidityProvider_Funds";
import { AddLiquidity } from "../PopModals/AddLiquidity_Modal";
import TableBody from "./TableBody";
import { useSelector } from "react-redux";

const LiquidityProvider = () => {
  const mainInstance = useSelector((state) => state.main);

  const [tableData, setTableData] = useState(data);
  const [keyState, setKeyState] = useState("");
  const [closeAll, setCloseAll] = useState(false);
  const [overallBalance_BTC, setOverallBalance_BTC] = useState(0);
  const [overallBalance_USD, setOverallBalance_USD] = useState(0);

  function financial(x) {
    return Number.parseFloat(x).toFixed(4);
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  useEffect(() => {
    setOverallBalance_BTC(mainInstance.overallBalance_BTC);
    setOverallBalance_USD(mainInstance.overallBalance_USD);
  }, [mainInstance.KeyStoreClient, mainInstance]);
  return (
    <div class="col-lg-7 marginleftcol mt-2">
      <div class="sidebarcoleight pt-3">
        <h4 style={{ fontFamily: "DM Sans", fontWeight: "bold" }}>
          Liquidity providing{" "}
        </h4>
        <div class="d-flex justify-content-between pt-3">
          <div>
            <p
              style={{
                margin: "0px",
                fontFamily: "Poppins",
                paddingBottom: "4px",
                color: "#353945",
              }}
            >
              Total balance in pools
            </p>
            <p
              style={{
                fontWeight: "bold",
                margin: "0px",
                fontFamily: "Poppins",
                fontSize: "24px",
              }}
            >
              {overallBalance_USD ? <>{financial(overallBalance_BTC)}</> : 0}
              <span
                style={{
                  backgroundColor: "#58BD7D",
                  fontSize: "12px",
                  padding: "5px",
                  fontFamily: "Poppins",
                  color: "#fff",
                  paddingLeft: "10px",
                  fontWeight: "100",
                  marginLeft: "10px",
                  paddingRight: "10px",
                  borderRadius: "5px",
                }}
              >
                BTC
              </span>
            </p>
            <p style={{ fontFamily: "Poppins", color: "#777e90" }}>
              $
              {overallBalance_USD ? (
                <>{numberWithCommas(financial(overallBalance_USD))}</>
              ) : (
                0
              )}
            </p>
          </div>
          <div class="d-flex">
            <div>
              <img src={Images.percentage} />
            </div>
            <div class="pl-4">
              <p
                style={{
                  margin: "0px",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  color: "#353945",
                  fontWeight: "400",
                  paddingBottom: "4px",
                }}
              >
                APY percentage
              </p>
              <p
                style={{
                  fontWeight: "bold",
                  margin: "0px",
                  color: "#58BD7D",
                  fontFamily: "Poppins",
                  fontSize: "24px",
                }}
              >
                11%{" "}
                <span
                  style={{
                    backgroundColor: "#58BD7D",
                    fontSize: "12px",
                    padding: "5px",
                    fontFamily: "Poppins",
                    color: "#fff",
                    fontWeight: "100",
                    paddingLeft: "10px",
                    fontWeight: "100",
                    paddingRight: "10px",
                    marginLeft: "10px",
                    borderRadius: "5px",
                  }}
                >
                  LOW RISK
                </span>
              </p>
            </div>
          </div>
          <div class="pr-5">
            <p
              style={{
                margin: "0px",
                fontFamily: "Poppins",
                paddingBottom: "4px",
                fontSize: "14px",
                color: "#777e90",
              }}
            >
              Current estimated APY
            </p>
            <p
              style={{
                fontWeight: "bold",
                margin: "0px",
                fontFamily: "Poppins",
                fontSize: "24px",
              }}
            >
              0.82047819{" "}
              <span
                style={{
                  backgroundColor: "#B1B5C3",
                  fontSize: "12px",
                  padding: "5px",
                  color: "#fff",
                  fontFamily: "Poppins",
                  paddingLeft: "10px",
                  marginLeft: "10px",
                  fontWeight: "100",
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
      <p
        class="pt-3 pl-5"
        style={{
          color: "#777E90",
          fontWeight: "400",
          fontFamily: "Poppins",
          fontSize: "12px",
        }}
      >
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
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  fontFamily: "DM Sans",
                }}
                type="text"
                class="form-control"
                placeholder="Search pool"
                aria-label="Search"
              />
              <img
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "-35px",
                  marginTop: "12px",
                }}
                src={Images.searchicon}
              />
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
              style={{
                color: "rgb(119, 126, 144)",
                textDecoration: "none",
                fontSize: "12px",
                fontWeight: "600",
                fontFamily: "Poppins",
              }}
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
                    style={{
                      color: "#353945",
                      fontSize: "14px",
                      fontFamily: "Poppins",
                      borderTop: "none",
                      borderBottom: "none",
                    }}
                    scope="col"
                  >
                    Pools
                  </th>
                  <th
                    style={{
                      color: "#353945",
                      fontSize: "14px",
                      fontFamily: "Poppins",
                      borderTop: "none",
                      borderBottom: "none",
                    }}
                    scope="col"
                  >
                    Yield rate
                  </th>
                  <th
                    style={{
                      color: "#353945",
                      fontSize: "14px",
                      fontFamily: "Poppins",
                      borderTop: "none",
                      borderBottom: "none",
                    }}
                    scope="col"
                  >
                    Total balance
                  </th>
                  <th
                    style={{
                      color: "#353945",
                      fontSize: "14px",
                      fontFamily: "Poppins",
                      borderTop: "none",
                      borderBottom: "none",
                    }}
                    scope="col"
                  >
                    Available balance
                  </th>
                  <th
                    style={{
                      color: "#353945",
                      fontSize: "14px",
                      fontFamily: "Poppins",
                      borderTop: "none",
                      borderBottom: "none",
                    }}
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
                    <TableBody
                      d={d}
                      key={key}
                      Key={key}
                      setKeyState={setKeyState}
                      keyState={keyState}
                      closeAll={closeAll}
                      setCloseAll={setCloseAll}
                    />
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
