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
  const searchFilter = (e) => {
    if (!e.target.value) {
      setTableData(data);
    } else {
      let result2 = data.filter(
        (value) =>
          value.Asset.toLowerCase().includes(e.target.value.toLowerCase()) &&
          value
      );
      setTableData(result2);
    }
  };
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
    <div className="col-lg-7 marginleftcol mt-2">
      <div className="sidebarcoleight pt-2">
        <h2 style={{ fontFamily: "DM Sans", fontWeight: "bold",fontSize:"32px",lineHeight:"48px" }}>Assets</h2>
        <div style={{paddingTop:"12px"}} className="d-flex justify-content-between">
          <div>
            <p
               style={{
                margin: "0px",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: "600",
                lineHeight: "24px",
                color: "#353945",
                paddingBottom: "3px",
              }}
            
            >
              Total balance
            </p>
            <div class="d-flex">
              <p
                style={{
                  fontWeight: "bold",
                  marginBottom: "0px",
                  fontSize: "24px",
                  lineHeight: "36px",
                  fontFamily: "Poppins",
                  color: "#23262F",
                }}
              >
                {overallBalance_USD ? <>{financial(overallBalance_BTC)}</> : 0}
              </p>
              <p
                style={{
                  backgroundColor: "#58BD7D",
                  fontSize: "12px",
                  padding: "5px",
                  fontFamily: "Poppins",
                  color: "#fff",
                  position:"relative",
                  top:"2px",
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
                position:"relative",
                top:"-10px",
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
      <p
        className="pt-3"
        style={{
          color: "#777E90",
          fontWeight: "500",
          paddingLeft: "22px",
          fontSize: "12px",
          fontFamily: "Poppins",
        }}
      >
        Funds
      </p>
      <div className="sidebarcoleight pl-0 pt-3">
        <div className="d-flex justify-content-between">
          <div className="ml-3 pr-5">
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
                placeholder="Search coin"
                aria-label="Search"
                onChange={searchFilter}
              />
              <img
                style={{
                  width: "17px",
                  height: "17px",
                  marginLeft: "-30px",
                  marginTop: "15px",
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
          <p className="pr-5" style={{ color: "#777E90" }}>
            <Link
              to={browserRoute.PORTFOLIO_ACTIVITY}
              style={{
                color: "#777E90",
                textDecoration: "none",
                fontSize: "12px",
                fontWeight: "600",
                fontFamily: "Poppins",
              }}
            >
              Transaction History
              <i
                className="fa fa-chevron-right ml-2 "
                style={{ fontSize: "8px" }}
              ></i>
            </Link>
          </p>
        </div>
        <div id="starred" className="bg-white  mt-3 pb-5">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th
                    style={{ borderTop: "none" }}
                    class="pt-3 pb-3 overview-tableheadss"
                    scope="col"
                  >
                    Asset{" "}
                  </th>
                  <th
                    style={{ borderTop: "none" }}
                    class="pt-3 pb-3 overview-tableheadss"
                    scope="col"
                  >
                    Price
                  </th>
                  <th
                    style={{ borderTop: "none" }}
                    class="pt-3 pb-3 overview-tableheadss"
                    scope="col"
                  >
                    Total quantity
                  </th>
                  <th
                    style={{ borderTop: "none" }}
                    class="pt-3 pb-3 overview-tableheadss"
                    scope="col"
                  >
                    Holding in $
                  </th>
                  <th
                    style={{
                      borderTop: "none",
                      textAlign: "right",
                      borderBottom: "none",
                    }}
                    class="pt-3 pb-3 overview-tableheadss"
                    scope="col"
                    className="d-flex justify-content-end pt-3 pb-3 overview-tableheadss"
                  >
                    Interest
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((d, key) => {
                  return (
                    <tr commponent="div">
                      <td
                        class="pt-3"
                        style={{
                          paddingLeft: "20px",
                          borderBottom: "1px solid #dee2e6",
                        }}
                      >
                        <div className="d-flex">
                          <img
                            style={{ width: "32px", height: "35px" }}
                            src={Images.btc4}
                          />
                          <div className="pl-3">
                            <div
                              style={{
                                fontWeight: "bold",
                                fontFamily: "Poppins",
                              }}
                            >
                              {d.Asset}
                            </div>
                            <div className="d-flex align-items-center">
                              <div
                                className=" text-muted"
                                style={{
                                  fontSize: "12px",
                                  fontWeight: "bold",
                                  fontFamily: "Poppins",
                                }}
                              >
                                {d.FullName}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        class="pt-4 pl-2"
                        style={{ borderBottom: "1px solid #dee2e6" }}
                      >
                        <div className="d-flex flex-column">
                          <div>
                            <b className="assetsprice-b">${d.Price}</b>
                          </div>
                        </div>
                      </td>
                      <td
                        class="pt-4"
                        style={{ borderBottom: "1px solid #dee2e6" }}
                      >
                        <div className="d-flex flex-column">
                          <div>
                            <b className="asset-totalquantity">
                              {d.Quantity} USDT
                            </b>
                          </div>
                        </div>
                      </td>
                      <td
                        class="pt-4"
                        style={{ borderBottom: "1px solid #dee2e6" }}
                      >
                        <div className="d-flex flex-column">
                          <div>
                            <b className="assetsprice-b">${d.Holding}</b>
                          </div>
                        </div>
                      </td>
                      <td
                        class="pt-4"
                        style={{ borderBottom: "1px solid #dee2e6" }}
                      >
                        <div
                          className="d-flex justify-content-end"
                          className="asset-totalquantity"
                          style={{ textAlign: "right" }}
                        >
                          {d.Interest} BTC
                        </div>
                        <div className="d-flex justify-content-end">
                          <div className=" text-muted assetsprice-b">
                            ${d.Holding}
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
export default Assets;
