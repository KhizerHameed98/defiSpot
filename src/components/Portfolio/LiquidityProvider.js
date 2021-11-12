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
  const [searchInput, setSearchInput] = useState("");
  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  useEffect(() => {
    setOverallBalance_BTC(mainInstance.overallBalance_BTC);
    setOverallBalance_USD(mainInstance.overallBalance_USD);
  }, [mainInstance.KeyStoreClient, mainInstance]);

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
    if (!e.target.value) {
      setTableData(data);
    } else {
      let res = data?.filter(
        (value) =>
          value.Pool.toLocaleLowerCase().includes(
            e.target.value.toLocaleLowerCase()
          ) && value
      );
      setTableData(res);
    }
  };

  return (
    <div class="col-lg-10 pl-0" style={{ paddingRight: "8px" }}>
      <div class="w-sidebarcoleight">
        <h4 className="u-overview09888">Liquidity providing </h4>
        <div class="d-flex justify-content-between flex-column flex-sm-row">
          <div>
            <p className="w-over-text">Total balance in pools</p>
            <p className="u-mainclassliquidity6788">
              {overallBalance_USD ? <>{financial(overallBalance_BTC)}</> : 0}
              <span
                style={{
                  backgroundColor: "#58BD7D",
                  fontSize: "12px",
                  padding: "5px",
                  fontFamily: "Poppins",
                  color: "#fff",
                  position: "relative",
                  top: "-4px",
                  paddingLeft: "10px",
                  fontWeight: "700",
                  marginLeft: "8px",
                  paddingRight: "8px",
                  borderRadius: "5px",
                }}
              >
                BTC
              </span>
            </p>
            <p
              style={{
                fontFamily: "Poppins",
                color: "#777e90",
                lineHeight: "32px",
                marginBottom: "0px",
              }}
            >
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
                  fontSize: "14px",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  color: "#353945",
                  lineHeight: "24px",
                  paddingBottom: "4px",
                }}
              >
                APY percentage
              </p>
              <p className="u-mainclassliquidity6788">
                11%{" "}
                <span
                  style={{
                    backgroundColor: "#58BD7D",
                    fontSize: "12px",
                    padding: "5px",
                    fontFamily: "Poppins",
                    color: "#fff",
                    position: "relative",
                    top: "-4px",
                    paddingLeft: "10px",
                    fontWeight: "700",
                    marginLeft: "8px",
                    paddingRight: "8px",
                    borderRadius: "5px",
                  }}
                >
                  LOW RISK
                </span>
              </p>
            </div>
          </div>
          <div class="">
            <p
              style={{
                margin: "0px",
                fontSize: "16px",
                fontFamily: "Poppins",
                fontWeight: "400",
                color: "#777E90",
                lineHeight: "24px",
                paddingBottom: "4px",
              }}
            >
              Current estimated APY
            </p>
            <p className="u-mainclassliquidity6788">
              0.82047819{" "}
              <span
                style={{
                  backgroundColor: "#58BD7D",
                  fontSize: "12px",
                  padding: "5px",
                  fontFamily: "Poppins",
                  color: "#fff",
                  position: "relative",
                  top: "-4px",
                  paddingLeft: "10px",
                  fontWeight: "700",
                  marginLeft: "8px",
                  paddingRight: "8px",
                  borderRadius: "5px",
                }}
              >
                BTC
              </span>
            </p>
          </div>
        </div>
      </div>
      <p className="w-over-center-heading">Funds</p>
      <div class="w-sidebarcoleight">
        <div class="d-flex justify-content-between">
          <div className="pr-5">
            <div class=" d-flex form-group has-search">
              <input
                style={{
                  borderRadius: "25px",
                  width: "250px",
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  fontFamily: "DM Sans",
                }}
                value={searchInput}
                onChange={searchInputHandler}
                type="text"
                class="form-control"
                placeholder="Search pool"
                aria-label="Search"
              />
              <img
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "-32px",
                  marginTop: "10px",
                }}
                src={Images.searchicon}
              />
            </div>
          </div>
          {/* <input
            style={{ width: "25%", borderRadius: "20px" }}
            class="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
          /> */}
          <p class="" style={{ color: "#777E90" }}>
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
        <div id="starred" class="mr-3 mt-3 pb-5">
          <div class="table-responsive w-comon-table-style">
            <table class="table">
              <thead>
                <tr style={{ borderBottom: "1.5px solid #E6E8EC" }}>
                  <th scope="col">Pools</th>
                  <th className="text-right" scope="col">
                    Yield rate
                  </th>
                  <th className="text-right" scope="col">
                    Total balance
                  </th>
                  <th className="text-right" scope="col">
                    Available balance
                  </th>
                  <th
                    className="text-right"
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
