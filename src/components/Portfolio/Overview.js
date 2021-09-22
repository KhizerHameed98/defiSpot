import React from "react";
import Images from "../Helper/AllImages";
const Overview = () => {
  return (
    <div className="col-lg-7 marginleftcol mt-2">
      <div className="sidebarcoleight pt-3">
        <div className="d-flex justify-content-between">
          <h2 style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
            Overview
          </h2>
          <button
            type="button"
            className="btn btn-dark mr-5 pl-3 pr-3"
            style={{ borderRadius: "20px" }}
          >
            Hide Balance
          </button>
        </div>
        <div className="d-flex justify-content-between pt-3">
          <div>
            <p style={{ margin: "0px" }}>Your Net Worth</p>
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
        Account Balance
      </p>
      <div className="row">
        <div className="col-lg-8 sidebarcoleight ml-3 mb-2  pt-3 pr-4">
          <div className="row">
            <div className="col-lg-6">
              <div className="d-flex justify-content-between pl-3 ">
                <div className="d-flex">
                  <img
                    style={{ width: "12px", height: "12px", marginTop: "4px" }}
                    src={Images.frame2}
                  />
                  <p className="marketsidetitle pl-2">Assets</p>
                </div>
                <div>
                  <p style={{ fontWeight: "bold", margin: "0px" }}>
                    3.12194287 BTC
                  </p>
                  <p
                    className="d-flex justify-content-end"
                    style={{ magin: "0px" }}
                  >
                    $10,095.35
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="d-flex justify-content-between pl-3 ">
                <div className="d-flex">
                  <img
                    style={{ width: "12px", height: "12px", marginTop: "4px" }}
                    src={Images.frame3}
                  />
                  <p className="marketsidetitle pl-2">Liquidity providing</p>
                </div>
                <div>
                  <p style={{ fontWeight: "bold", margin: "0px" }}>
                    3.1219 BTC
                  </p>
                  <p
                    className="d-flex justify-content-end"
                    style={{ magin: "0px" }}
                  >
                    $10,095.35
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <img
                  style={{ width: "12px", height: "12px", marginTop: "4px" }}
                  src={Images.frame2}
                />
                <p className="marketsidetitle pl-2">Total</p>
              </div>
              <div>
                <p className="my-sm-0" style={{ fontWeight: "bold" }}>
                  10.376987555 BTC
                </p>
                <p className="d-flex justify-content-end">$398,50286</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div
            className="sidebarcoleight ml-1 pr-3 pt-3 pb-2"
            style={{ marginBottom: "-48px" }}
          >
            <p style={{ fontSize: "10px" }}>
              Your holding{" "}
              <span
                className="pl-2 pr-2"
                style={{ backgroundColor: "#58BD7D", borderRadius: "12px" }}
              >
                +12.98%
              </span>
            </p>
            <h3 style={{ fontWeight: "bold", fontSize: "20px" }}>$398.5K</h3>
            <img src={Images.qwq} />
          </div>
        </div>
      </div>
      <p className="pt-3 pl-3" style={{ color: "#777E90", fontWeight: "bold" }}>
        Transaction history
      </p>
      <div className="sidebarcoleight pt-3">
        <div className="d-flex justify-content-between">
          <ul className="list-unstyled d-flex">
            <li className="alltype">
              <a style={{ color: "#fff" }} href="#">
                All type{" "}
              </a>
            </li>
            <li className="pl-3 pt-2 marketparagraph">
              <a style={{ color: "#777E90" }} href="#">
                Withdraws
              </a>
            </li>
            <li className="pl-3 pt-2 marketparagraph">
              <a style={{ color: "#777E90" }} href="#">
                Deposit
              </a>
            </li>
            <li className="pl-3 pt-2 marketparagraph">
              <a style={{ color: "#777E90" }} href="#">
                Converting
              </a>
            </li>
          </ul>
          <form className="pr-5">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search after coin.."
              />
              <div className="input-group-btn">
                <button className="btn btn-default" type="submit">
                  <i className="glyphicon glyphicon-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="d-flex justify-content-between"></div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Coin</th>
                <th scope="col">Amount</th>
                <th scope="col">Address</th>
                <th scope="col">Transaction</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody style={{ padding: "5px" }}>
              <tr>
                <td>
                  <div className="d-flex flex-column">
                    <div>
                      <span className="depositclass">Withdraw</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex ">
                    <img
                      style={{ width: "25px" }}
                      style={{ width: "25px" }}
                      src={Images.btc}
                    />
                    <div style={{ paddingLeft: "5px" }}>Bitcoin</div>
                    <div className="d-flex align-items-center"></div>
                  </div>
                </td>
                <td>1,641.20 BTC</td>
                <td>
                  <div className="d-flex flex-column">
                    <div>
                      <b>3DkQyAdif6kqlpMBu</b>
                    </div>
                  </div>
                </td>
                <td>3DkQyAdif6kqlpMBu</td>
                <td>2021-06-05 04:12:30</td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex flex-column">
                    <div>
                      <span className="depositclasss">Deposit</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex ">
                    <img style={{ width: "25px" }} src={Images.btc} />
                    <div style={{ paddingLeft: "5px" }}>Bitcoin</div>
                    <div className="d-flex align-items-center"></div>
                  </div>
                </td>
                <td>1,641.20 BTC</td>
                <td>
                  <div className="d-flex flex-column">
                    <div>
                      <b>3DkQyAdif6kqlpMBu</b>
                    </div>
                  </div>
                </td>
                <td>3DkQyAdif6kqlpMBu</td>
                <td>2021-06-05 04:12:30</td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex flex-column">
                    <div>
                      <span className="depositclass">Withdraw</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex ">
                    <img style={{ width: "25px" }} src={Images.btc} />
                    <div style={{ paddingLeft: "5px" }}>Bitcoin</div>
                    <div className="d-flex align-items-center"></div>
                  </div>
                </td>
                <td>1,641.20 BTC</td>
                <td>
                  <div className="d-flex flex-column">
                    <div>
                      <b>3DkQyAdif6kqlpMBu</b>
                    </div>
                  </div>
                </td>
                <td>3DkQyAdif6kqlpMBu</td>
                <td>2021-06-05 04:12:30</td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex flex-column">
                    <div>
                      <span className="depositclasss">Deposit</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex ">
                    <img style={{ width: "25px" }} src={Images.btc} />
                    <div style={{ paddingLeft: "5px" }}>Bitcoin</div>
                    <div className="d-flex align-items-center"></div>
                  </div>
                </td>
                <td>1,641.20 BTC</td>
                <td>
                  <div className="d-flex flex-column">
                    <div>
                      <b>3DkQyAdif6kqlpMBu</b>
                    </div>
                  </div>
                </td>
                <td>3DkQyAdif6kqlpMBu</td>
                <td>2021-06-05 04:12:30</td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex flex-column">
                    <div>
                      <span className="depositclasss">Deposit</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex ">
                    <img style={{ width: "25px" }} src={Images.btc} />
                    <div style={{ paddingLeft: "5px" }}>Bitcoin</div>
                    <div className="d-flex align-items-center"></div>
                  </div>
                </td>
                <td>1,641.20 BTC</td>
                <td>
                  <div className="d-flex flex-column">
                    <div>
                      <b>3DkQyAdif6kqlpMBu</b>
                    </div>
                  </div>
                </td>
                <td>3DkQyAdif6kqlpMBu</td>
                <td>2021-06-05 04:12:30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
