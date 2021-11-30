import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import browserRoute from "../../Routes/browserRoutes";
import Images from "../Helper/AllImages";
import data from "../Helper/Data/LiquidityProvider_Funds";
import { AddLiquidity } from "../PopModals/AddLiquidity_Modal";
import TableBody from "./TableBody";
import { useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";

const LiquidityProvider = () => {
  const mainInstance = useSelector((state) => state.main);

  const [tableData, setTableData] = useState(data);
  const [keyState, setKeyState] = useState("");
  const [closeAll, setCloseAll] = useState(false);
  const [overallBalance_BTC, setOverallBalance_BTC] = useState(0);
  const [overallBalance_USD, setOverallBalance_USD] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [cardsPerPage, setCardsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const countData = tableData?.length;

  useEffect(() => {
    if (countData % cardsPerPage === 0) {
      setCount(Math.floor(countData / cardsPerPage));
    } else {
      setCount(Math.floor(countData / cardsPerPage) + 1);
    }
  }, [countData, cardsPerPage]);

  const myRef = useRef(null);

  const handleChange = (event, value) => {
    // window.scrollTo(0, 0);
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    setPage(value);
  };

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
    <div
      class="col-lg-10 n-liquidityMainArea"
      //  style={{ paddingRight: "8px" }} pl-0
    >
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
              {/* <img src={Images.percentage} /> */}
              <svg
                width="87"
                height="70"
                viewBox="0 0 87 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 40C6.5 34.7471 7.53463 29.5457 9.54482 24.6927C11.555 19.8396 14.5014 15.4301 18.2157 11.7157C21.9301 8.00138 26.3396 5.055 31.1927 3.04481C36.0457 1.03463 41.2471 -1.94121e-06 46.5 0C51.7529 1.94122e-06 56.9543 1.03463 61.8074 3.04483C66.6604 5.05502 71.0699 8.0014 74.7843 11.7157C78.4986 15.4301 81.445 19.8397 83.4552 24.6927C85.4654 29.5457 86.5 34.7472 86.5 40L78.5 40C78.5 35.7977 77.6723 31.6366 76.0642 27.7541C74.456 23.8717 72.0989 20.3441 69.1274 17.3726C66.156 14.4011 62.6283 12.044 58.7459 10.4359C54.8635 8.82771 50.7023 8 46.5 8C42.2977 8 38.1366 8.8277 34.2541 10.4359C30.3717 12.044 26.8441 14.4011 23.8726 17.3726C20.9011 20.3441 18.544 23.8717 16.9359 27.7541C15.3277 31.6365 14.5 35.7977 14.5 40H6.5Z"
                  fill="#FF6838"
                />
                <path
                  d="M6.5 40C6.5 32.6133 8.54543 25.3708 12.4096 19.0753C16.2737 12.7799 21.8056 7.67741 28.3921 4.33345C34.9786 0.98948 42.3624 -0.465346 49.7251 0.130227C57.0878 0.725799 64.1418 3.34851 70.1052 7.70764L65.3841 14.1661C60.6134 10.6788 54.9702 8.58064 49.0801 8.10418C43.1899 7.62772 37.2829 8.79158 32.0137 11.4668C26.7445 14.1419 22.3189 18.2239 19.2276 23.2603C16.1363 28.2966 14.5 34.0906 14.5 40H6.5Z"
                  fill="#FFB45D"
                />
                <path
                  d="M6.5 40C6.5 32.193 8.7846 24.5566 13.0722 18.0323C17.3597 11.508 23.4628 6.38103 30.6289 3.28339L33.8032 10.6267C28.0702 13.1048 23.1878 17.2064 19.7577 22.4259C16.3277 27.6453 14.5 33.7544 14.5 40H6.5Z"
                  fill="#58BD7D"
                />
                <g filter="url(#filter0_d_2194_587)">
                  <circle cx="12.75" cy="27.5" r="2.5" fill="#FCFCFD" />
                </g>
                <defs>
                  <filter
                    id="filter0_d_2194_587"
                    x="0.25"
                    y="25"
                    width="25"
                    height="45"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feMorphology
                      radius="20"
                      operator="erode"
                      in="SourceAlpha"
                      result="effect1_dropShadow_2194_587"
                    />
                    <feOffset dy="30" />
                    <feGaussianBlur stdDeviation="15" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.0583333 0 0 0 0 0.0583333 0 0 0 0 0.0583333 0 0 0 0.2 0"
                    />
                    <feBlend
                      mode="multiply"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_2194_587"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_2194_587"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
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
        <div class="d-flex justify-content-between flex-wrap">
          <div className="n-liquiditySearch">
            <div class=" d-flex form-group has-search">
              <input
                // style={{
                //   borderRadius: "25px",
                //   width: "250px",
                //   paddingTop: "15px",
                //   paddingBottom: "15px",
                //   fontFamily: "DM Sans",
                // }}
                value={searchInput}
                onChange={searchInputHandler}
                type="text"
                class="form-control n-tableSearch n-tableSeachDark"
                placeholder="Search"
                aria-label="Search"
              />
              {/* <img
              class="n-liquiditySearchIcon"
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "-35px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
                src={Images.searchicon}
              /> */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  marginLeft: "-35px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.4207 13.5992C11.2918 14.4768 9.87327 14.9993 8.33268 14.9993C4.65078 14.9993 1.66602 12.0146 1.66602 8.33268C1.66602 4.65078 4.65078 1.66602 8.33268 1.66602C12.0146 1.66602 14.9993 4.65078 14.9993 8.33268C14.9993 9.87327 14.4768 11.2918 13.5992 12.4207L18.0886 16.9101C18.414 17.2355 18.414 17.7632 18.0886 18.0886C17.7632 18.414 17.2355 18.414 16.9101 18.0886L12.4207 13.5992ZM13.3327 8.33268C13.3327 11.0941 11.0941 13.3327 8.33268 13.3327C5.57126 13.3327 3.33268 11.0941 3.33268 8.33268C3.33268 5.57126 5.57126 3.33268 8.33268 3.33268C11.0941 3.33268 13.3327 5.57126 13.3327 8.33268Z"
                  fill="#777E91"
                />
              </svg>
            </div>
          </div>
          {/* <input
            style={{ width: "25%", borderRadius: "20px" }}
            class="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
          /> */}
          <p class="trans-history" style={{ color: "#777E90" }}>
            <Link
              to={browserRoute.PORTFOLIO_ACTIVITY}
              style={{
                color: "rgb(119, 126, 144)",
                textDecoration: "none",
                fontSize: "12px",
                fontWeight: "600",
                fontFamily: "Poppins",
              }}
              className="text-bold"
            >
              Transaction History
              <i
                className="fa fa-chevron-right ml-2 pt-1"
                style={{ fontSize: "10px" }}
              ></i>
            </Link>
          </p>
        </div>
        <div id="starred" class="mt-3 pb-5">
          <div class="table-responsive w-comon-table-style" ref={myRef}>
            <table class="table u-liquiditytavblw98">
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
                {tableData ? (
                  tableData
                    ?.slice(
                      page * cardsPerPage - cardsPerPage,
                      cardsPerPage * page
                    )
                    ?.map((d, key) => {
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
                    })
                ) : (
                  <tr>
                    <td
                      colspan="6"
                      class="text-center text-muted"
                      style={{ padding: "148px 0px" }}
                    >
                      No Transaction Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="paging-center">
              {tableData?.length ? (
                <Pagination count={count} page={page} onChange={handleChange} />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidityProvider;
