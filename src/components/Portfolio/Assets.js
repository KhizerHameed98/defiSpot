import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import browserRoute from "../../Routes/browserRoutes";
import Images from "../Helper/AllImages";
import data from "../Helper/Data/Assets";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";

const Assets = () => {
  const mainInstance = useSelector((state) => state.main);

  const [tableData, setTableData] = useState(data);
  const [overallBalance_BTC, setOverallBalance_BTC] = useState(0);
  const [overallBalance_USD, setOverallBalance_USD] = useState(0);
  const [assetBalance, setAssetBalance] = useState([]);
  const [tempData, setTempData] = useState([]);

  const [cardsPerPage, setCardsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const countData = tempData?.length;

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

  useEffect(() => {
    setOverallBalance_BTC(mainInstance.overallBalance_BTC);
    setOverallBalance_USD(mainInstance.overallBalance_USD);
    setAssetBalance(mainInstance?.assetBalance);
    setTempData(mainInstance?.assetBalance);
  }, [mainInstance.KeyStoreClient, mainInstance.assetBalance, mainInstance]);

  const searchFilter = (e) => {
    if (assetBalance) {
      if (!e.target.value) {
        setTempData(assetBalance);
      } else {
        let result = assetBalance.filter(
          (value) =>
            value?.asset?.ticker
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) && value
        );
        setTempData(result);
      }
    }
  };
  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const gettingLogos = (t) => {
    let midgardPool = mainInstance?.midgardPool;
    let ticker = t?.asset?.ticker;
    if (t.asset.ticker.toLowerCase() === "rune") {
      ticker = "XRUNE";
    }

    let res = midgardPool?.find(
      (d) => d?.asset.toLowerCase() === ticker.toLowerCase()
    );
    return (
      <>
        <img style={{ width: "32px", height: "32px" }} src={res?.logo} />
      </>
    );
  };

  const gettingFullName = (t) => {
    let midgardPool = mainInstance?.midgardPool;
    let ticker = t?.asset?.ticker;
    if (t.asset.ticker.toLowerCase() === "rune") {
      ticker = "XRUNE";
    }

    let res = midgardPool?.find(
      (d) => d?.asset.toLowerCase() === ticker.toLowerCase()
    );
    return <>{res?.assetFullName}</>;
  };
  return (
    <div
      className="col-lg-10 n-assetMainArea"
      //  style={{ paddingRight: "8px" }} pl-0
    >
      <div className="w-sidebarcoleight">
        <h2 className="u-overview09888">Assets</h2>
        <div
          style={{ paddingTop: "12px" }}
          className="d-flex justify-content-between"
        >
          <div>
            <p className="w-over-text">Total balance</p>
            <div class="d-flex">
              <p className="u-mainclassliquidity6788">
                {overallBalance_USD ? <>{financial(overallBalance_BTC)}</> : 0}
              </p>
              <p
                style={{
                  backgroundColor: "#58BD7D",
                  fontSize: "12px",
                  padding: "5px",
                  fontFamily: "Poppins",
                  color: "#fff",
                  position: "relative",
                  top: "2px",
                  paddingLeft: "10px",
                  fontWeight: "700",
                  marginLeft: "8px",
                  paddingRight: "8px",
                  borderRadius: "5px",
                }}
              >
                BTC
              </p>
            </div>
            <p
              style={{
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "24px",
                position: "relative",
                top: "-10px",
                color: "#777E90",
                marginBottom: "0px",
                marginTop: "0px",
              }}
            >
              {" "}
              $
              {overallBalance_USD ? (
                <>{numberWithCommas(financial(overallBalance_USD))}</>
              ) : (
                0
              )}
            </p>
          </div>
        </div>
      </div>
      <p className="w-over-center-heading">Funds</p>
      <div className="w-sidebarcoleight">
        <div className="d-flex justify-content-between flex-wrap">
          <div class="n-assetsSearch">
            <div class=" d-flex form-group has-search">
              <input
                style={{
                  borderRadius: "30px",
                  width: "250px",
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  fontFamily: "DM Sans",
                }}
                type="text"
                class="form-control n-tableSearch n-tableSeachDark"
                placeholder="Search"
                aria-label="Search"
                onChange={searchFilter}
              />
              {/* <img
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "-35px",
                  // marginTop: "10px",
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

              {/* <span
                style={{ paddingTop: "15px", marginLeft: "-30px" }}
                class=" fa fa-search form-control-feedback"
              ></span> */}
            </div>
          </div>
          {/* <input
            style={{ width: "25%", borderRadius: "20px" }}
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search Coin"
            aria-label="Search"
            onChange={searchFilter}
          /> */}
          <p className="trans-history" style={{ color: "#777E90" }}>
            <Link
              to={browserRoute.PORTFOLIO_ACTIVITY}
              style={{
                color: "#777E90",
                textDecoration: "none",
                fontSize: "12px",
                fontWeight: "600",
                fontFamily: "Poppins",
              }}
              className="text-bold"
            >
              Transaction History
              <i
                className="fa fa-chevron-right ml-2 "
                style={{ fontSize: "8px" }}
              ></i>
            </Link>
          </p>
        </div>
        <div
          id="starred"
          className="mt-3 pb-5"
          style={{ position: "relative" }}
        >
          <div className="table-responsive w-comon-table-style" ref={myRef}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Asset </th>
                  <th className="text-right" scope="col">
                    Price
                  </th>
                  <th className="text-right" scope="col">
                    Total quantity
                  </th>
                  <th className="text-right" scope="col">
                    Holding in $
                  </th>
                  <th className="text-right" scope="col">
                    Interest
                  </th>
                </tr>
              </thead>
              <tbody>
                {tempData ? (
                  <>
                    {" "}
                    {tempData
                      ?.slice(
                        page * cardsPerPage - cardsPerPage,
                        cardsPerPage * page
                      )
                      ?.map((d, key) => {
                        return (
                          <tr>
                            <td>
                              <div className="d-flex">
                                {gettingLogos(d)}
                                <div className="pl-3">
                                  <div style={{}}>{d.asset?.ticker}</div>
                                  <div className="d-flex align-items-center">
                                    <div className=" text-muted">
                                      {gettingFullName(d)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="text-right">
                              <div className="d-flex flex-column">
                                <div>${financial(d?.marketPriceUSD)}</div>
                              </div>
                            </td>
                            <td className="text-right">
                              <div className="d-flex flex-column">
                                <div>
                                  {financial(
                                    Number(d?.amount.amount().c[0]) /
                                      Math.pow(10, d?.amount.decimal)
                                  )}{" "}
                                  {d?.asset?.ticker}{" "}
                                </div>
                              </div>
                            </td>
                            <td className="text-right">
                              <div className="d-flex flex-column">
                                <div>${financial(d?.balanceUSD)}</div>
                              </div>
                            </td>
                            <td className="text-right">
                              <div
                                className="d-flex justify-content-end"
                                className="asset-totalquantity"
                                style={{ textAlign: "right" }}
                              >
                                {d.Interest} BTC
                              </div>
                              <div className="d-flex justify-content-end">
                                <div className=" text-muted assetsprice-b">
                                  ${financial(d?.balanceUSD)}
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </>
                ) : (
                  <tr class="n-tableHover">
                    <td
                      colspan="5"
                      class="text-center text-muted"
                      style={{ padding: "148px 0px" }}
                    >
                      No Assets Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="paging-center">
              {tempData?.length ? (
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
export default Assets;
