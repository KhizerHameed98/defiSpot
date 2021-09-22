import React from "react";
import { Link } from "react-router-dom";
import browserRoute from "../../Routes/browserRoutes";
import Images from "../Helper/AllImages";
const Assets = () => {
  return (
    <div className="col-lg-7 marginleftcol mt-2">
      <div className="sidebarcoleight pt-3">
        <h2 style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>Assets</h2>
        <div className="d-flex justify-content-between pt-3">
          <div>
            <p style={{ margin: "0px" }}>Total balance</p>
            <p style={{ fontWeight: "bold", margin: "0px" }}>
              7.25495219{" "}
              <span
                style={{
                  backgroundColor: "#58BD7D",
                  fontSize: "10px",
                  padding: "5px",
                  color: "#fff",
                }}
              >
                BTC
              </span>
            </p>
            <p>$278,523.42</p>
          </div>
        </div>
      </div>
      <p className="pt-3 pl-3" style={{ color: "#777E90", fontWeight: "bold" }}>
        Funds
      </p>
      <div className="sidebarcoleight pt-3">
        <div className="d-flex justify-content-between">
          <input
            style={{ width: "25%", borderRadius: "20px" }}
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
          <p className="pr-5" style={{ color: "#777E90" }}>
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
        <div id="starred" className="bg-white px-2  mt-3 pb-5">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Asset</th>
                  <th scope="col">Price</th>
                  <th scope="col">Total quantity</th>
                  <th scope="col">Holding in $</th>
                  <th scope="col" className="d-flex justify-content-end">
                    Interest
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="d-flex">
                      <img src={Images.btc4} />
                      <div className="pl-3">
                        <div
                          style={{
                            fontWeight: "bold",
                            fontFamily: "sans-serif",
                          }}
                        >
                          USDT
                        </div>
                        <div className="d-flex align-items-center">
                          <div
                            className=" text-muted"
                            style={{ fontSize: "12px", fontWeight: "bold" }}
                          >
                            Tether USD
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div>
                        <b style={{ color: "#777E90" }}>$10,098,36</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div>
                        <b>0.2785689852 USDT</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div>
                        <b style={{ color: "#777E90" }}>$10,098,36</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex justify-content-end"
                      style={{ fontWeight: "bold" }}
                    >
                      0.2785689852 BTC
                    </div>
                    <div className="d-flex justify-content-end">
                      <div className=" text-muted" style={{ color: "#777E90" }}>
                        $10,098.36
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex">
                      <img src={Images.bnb} />
                      <div className="pl-3" style={{ fontWeight: "bold" }}>
                        BNB
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div>
                        <b style={{ color: "#777E90" }}>$10,098,36</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div>
                        <b>0.2785689852 USDT</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div>
                        <b style={{ color: "#777E90" }}>$10,098,36</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex justify-content-end"
                      style={{ fontWeight: "bold" }}
                    >
                      0.2785689852 BTC
                    </div>
                    <div className="d-flex justify-content-end">
                      <div className=" text-muted" style={{ color: "#777E90" }}>
                        $10,098.36
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Assets;