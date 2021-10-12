import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import browserRoute from "../../Routes/browserRoutes";
import Images from "../Helper/AllImages";
import data from "../Helper/Data/Funds";
const Assets = () => {
  const [tableData, setTableData] = useState(data);

  const searchFilter = (e) => {
    if (!e.target.value) {
      setTableData(data);
    } else {
      const res = data.filter((data) => data.Asset === e.target.value);
      setTableData(res);
    }
  };

  return (
    <div className="col-lg-7 marginleftcol mt-2">
      <div className="sidebarcoleight pt-3">
        <h2 style={{ fontFamily: "Poppins", fontWeight: "bold" }}>Assets</h2>
        <div className="d-flex justify-content-between pt-3">
          <div>
            <p style={{ margin: "0px",fontFamily:"Poppins" }}>Total balance</p>
            <p style={{ fontWeight: "bold", margin: "0px",fontFamily:"Poppins",paddingTop:"5px",color:"#23262F",fontSize:"24px" }}>
              7.25495219{" "}
              <span
                style={{
                  backgroundColor: "#58BD7D",
                  fontSize: "10px",
                  padding: "5px",
                  marginLeft:"15px",
                  color: "#fff",
                  borderRadius:"5px"
                }}
              >
                BTC
              </span>
            </p>
            <p style={{fontFamily:"Poppins",paddingTop:"5px",color:"#777E90"}}>$278,523.42</p>
          </div>
        </div>
      </div>
      <p className="pt-3 pl-4" style={{ color: "#777E90", fontWeight: "400",fontSize:"12px",fontFamily:"Poppins" }}>
        Funds
      </p>
      <div className="sidebarcoleight pt-3">
        <div className="d-flex justify-content-between">
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
                placeholder="Search coin"
                aria-label="Search"
                 onChange={searchFilter}
              />
              <span
                style={{ paddingTop: "15px", marginLeft: "-30px" }}
                class=" fa fa-search form-control-feedback"
              ></span>
            </div>
          </form>
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
              style={{ color: "#777E90", textDecoration: "none",fontSize:"12px",fontWeight:"600",fontFamily:"Poppins" }}
            >
              Transaction History
              <i
                className="fa fa-chevron-right ml-2 "
                style={{ fontSize: "8px" }}
              ></i>
            </Link>
          </p>
        </div>
        <div id="starred" className="bg-white px-2  mt-3 pb-5">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th style={{borderTop:"none"}} class="pt-3 pb-3 overview-tableheadss" scope="col">Asset </th>
                  <th  style={{borderTop:"none"}} class="pt-3 pb-3 overview-tableheadss" scope="col">Price</th>
                  <th  style={{borderTop:"none"}} class="pt-3 pb-3 overview-tableheadss" scope="col">Total quantity</th>
                  <th  style={{borderTop:"none"}} class="pt-3 pb-3 overview-tableheadss" scope="col">Holding in $</th>
                  <th  style={{borderTop:"none",textAlign:"right"}} class="pt-3 pb-3 overview-tableheadss"  scope="col" className="d-flex justify-content-end pt-3 pb-3 overview-tablehead">
                    Interest
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((d, key) => {
                  return (
                    <tr>
                      <td style={{paddingLeft:"0px"}}>
                        <div className="d-flex">
                          <img style={{width:"32px",height:"35px"}} src={Images.btc4} />
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
                                style={{ fontSize: "12px", fontWeight: "bold",fontFamily:"Poppins" }}
                              >
                                {d.FullName}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <div>
                            <b className="assetsprice-b">${d.Price}</b>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <div>
                            <b className="asset-totalquantity">{d.Quantity} USDT</b>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <div>
                            <b className="assetsprice-b">${d.Holding}</b>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div
                          className="d-flex justify-content-end"
                          className="asset-totalquantity"
                          style={{textAlign:"right"}}
                        >
                          {d.Interest} BTC
                        </div>
                        <div className="d-flex justify-content-end">
                          <div
                            className=" text-muted assetsprice-b"
                            
                          >
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
