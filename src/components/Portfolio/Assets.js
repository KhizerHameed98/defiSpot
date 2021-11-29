import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import browserRoute from "../../Routes/browserRoutes";
import Images from "../Helper/AllImages";
import data from "../Helper/Data/Assets";
import { useSelector, useDispatch } from "react-redux";

const Assets = () => {
  const mainInstance = useSelector((state) => state.main);

  const [tableData, setTableData] = useState(data);
  const [overallBalance_BTC, setOverallBalance_BTC] = useState(0);
  const [overallBalance_USD, setOverallBalance_USD] = useState(0);
  const [assetBalance, setAssetBalance] = useState([]);
  const [tempData, setTempData] = useState([]);

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
    <div className="col-lg-10 n-assetMainArea"
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
                class="form-control n-tableSearch"
                placeholder="Search"
                aria-label="Search"
                onChange={searchFilter}
              />
              <img
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "-35px",
                  // marginTop: "10px",
                  marginBottom: "10px",
                }}
                src={Images.searchicon}
              />
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
          <div className="table-responsive w-comon-table-style">
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
                    {tempData.map((d, key) => {
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
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Assets;
