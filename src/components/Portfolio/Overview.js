import React, {useState, useEffect} from "react";
import Images from "../Helper/AllImages";
import data from "../Helper/Data/TransactionHistory";

const Overview = () => {

  const [tableData, setTableData] = useState([]);
  const [showBalance, setShowBalance] = useState(false);
  const [Enum, set_Enum] = useState({
    allType: "allType",
    withdraw: "withdraw",
    deposit: "deposit",
    pending: "pending",
  });
  const [filterType, setFilterType] = useState(Enum.allType);
  useEffect(() => {
    setTableData(data);
  }, []);

  function SearchFilter(e) {
    setFilterType("");
    if (!e.target.value) {
      setFilterType(Enum.allType);
      setTableData(data);
    } else {
      const res = data.filter((data) => data.TransactionId === e.target.value);
      setTableData(res);
    }
  }
  function filterAllType() {
    setFilterType(Enum.allType);
    setTableData(data);
  }
  function filterWithdrawType() {
    setFilterType(Enum.withdraw);
    let res = data.filter((d) => d.Type === "Withdraw");
    setTableData(res);
  }
  function filterDepositType() {
    setFilterType(Enum.deposit);
    let res = data.filter((d) => d.Type === "Deposit");
    setTableData(res);
  }
  function filterPendingType() {
    setFilterType(Enum.pending);
    let res = data.filter((d) => d.Type === "Pending");
    setTableData(res);
  }

  return (
    <div className="col-lg-7 marginleftcol mt-2">
      <div className="sidebarcoleight pt-3">
        <div className="d-flex justify-content-between">
          <h2
            style={{
              fontFamily: "DM Sans",
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            Overview
          </h2>
          <button
            type="button"
            className="btn btn-dark mr-5 pl-4 pr-4"
            style={{
              borderRadius: "30px",
              fontFamily: "DM Sans",
              backgroundColor: "#23262F",
            }}
            onClick={() => {
              setShowBalance(!showBalance);
            }}
          >
            {showBalance ? <>Hide Balance</> : <>Show Balance</>}
          </button>
        </div>
        <div className="d-flex justify-content-between pt-3">
          <div>
            <p style={{ margin: "0px", fontFamily: "DM Sans" }}>
              Your Net Worth
            </p>
            <p
              style={{
                fontWeight: "bold",
                margin: "0px",
                fontFamily: "DM Sans",
              }}
            >
              {showBalance ? <>7.25495219 </> : <>**** </>}

              <span
                style={{
                  backgroundColor: "#58BD7D",
                  fontSize: "10px",
                  padding: "5px",
                  color: "#fff",
                  fontFamily: "DM Sans",
                  marginLeft: "50px",
                }}
              >
                BTC
              </span>
            </p>
            <p style={{ fontFamily: "DM Sans" }}>
              ${showBalance ? <>278,523.42</> : <>****</>}
            </p>
          </div>
        </div>
      </div>
      <p
        className="pt-3 pl-5"
        style={{ color: "#777E90", fontWeight: "bold", fontFamily: "DM Sans" }}
      >
        Account Balance
      </p>
      {showBalance ? (
        <>
          <div className="row">
            <div className="col-lg-8  ml-3 mb-2  pt-3 pr-4">
              <div className="row">
                <div
                  className="col-lg-5"
                  style={{ backgroundColor: "#FCFCFD", marginLeft: "15px" }}
                >
                  <div
                    className="d-flex justify-content-between pl-3 pt-2"
                    style={{
                      backgroundColor: "#fff",
                      width: "240px",
                      paddingRight: "15px",
                    }}
                  >
                    <div className="d-flex">
                      <img
                        style={{
                          width: "12px",
                          height: "12px",
                          marginTop: "4px",
                        }}
                        src={Images.frame2}
                      />
                      <p className="marketsidetitle pl-2">Assets</p>
                    </div>
                    <div>
                      <p
                        style={{
                          fontWeight: "bold",
                          margin: "0px",
                          fontFamily: "DM Sans",
                        }}
                      >
                        3.12194287 BTC
                      </p>
                      <p
                        className="d-flex justify-content-end"
                        style={{ magin: "0px", fontFamily: "DM Sans" }}
                      >
                        $10,095.35
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-6"
                  style={{ backgroundColor: "#FCFCFD", marginLeft: "18px" }}
                >
                  <div className="d-flex justify-content-between pl-3 pt-2">
                    <div className="d-flex">
                      <img
                        style={{
                          width: "12px",
                          height: "12px",
                          marginTop: "4px",
                        }}
                        src={Images.frame3}
                      />
                      <p className="marketsidetitle pl-2">
                        Liquidity providing
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          fontWeight: "bold",
                          margin: "0px",
                          fontFamily: "DM Sans",
                        }}
                      >
                        3.1219 BTC
                      </p>
                      <p
                        className="d-flex justify-content-end"
                        style={{ magin: "0px", fontFamily: "DM Sans" }}
                      >
                        $10,095.35
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-12 mt-1 pt-2"
                style={{ backgroundColor: "#FCFCFD" }}
              >
                <div className="d-flex justify-content-between">
                  <div className="d-flex" style={{ paddingLeft: "20px" }}>
                    <img
                      style={{
                        width: "12px",
                        height: "12px",
                        marginTop: "4px",
                      }}
                      src={Images.frame2}
                    />
                    <p className="marketsidetitle pl-2">Total</p>
                  </div>
                  <div>
                    <p
                      className="my-sm-0"
                      style={{ fontWeight: "bold", fontFamily: "DM Sans" }}
                    >
                      10.376987555 BTC
                    </p>
                    <p
                      style={{ fontFamily: "DM Sans" }}
                      className="d-flex justify-content-end"
                    >
                      $398,50286
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 mt-2"
              style={{ marginLeft: "45px", backgroundColor: "#FCFCFD" }}
            >
              <div
                className="sidebarcoleight ml-1 pr-3 pt-2 pb-2"
                style={{ marginLeft: "65px" }}
              >
                <div style={{ paddingLeft: "20px" }}>
                  <p
                    style={{
                      fontSize: "12px",
                      paddingTop: "20px",
                      fontFamily: "DM Sans",
                      fontWeight: "bold",
                      color: "#777E90",
                    }}
                  >
                    Your holding{" "}
                    <span
                      className="pl-2 pr-2"
                      style={{
                        backgroundColor: "#58BD7D",
                        borderRadius: "12px",
                        color: "#FCFCFD",
                      }}
                    >
                      +12.98%
                    </span>
                  </p>
                  <h3
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      paddingBottom: "5px",
                      fontFamily: "DM Sans",
                    }}
                  >
                    $398.5K
                  </h3>
                  <img style={{ paddingBottom: "0px" }} src={Images.qwq} />
                </div>
              </div>
            </div>
          </div>
          {/*check end*/}
        </>
      ) : (
        <>
          <div className="row">
            <div className="col-lg-8  ml-3 mb-2  pt-3 pr-4">
              <div className="row">
                <div
                  className="col-lg-5"
                  style={{ backgroundColor: "#FCFCFD", marginLeft: "15px" }}
                >
                  <div
                    className="d-flex justify-content-between pl-3 pt-2"
                    style={{
                      backgroundColor: "#fff",
                      width: "240px",
                      paddingRight: "15px",
                    }}
                  >
                    <div className="d-flex">
                      <img
                        style={{
                          width: "12px",
                          height: "12px",
                          marginTop: "4px",
                        }}
                        src={Images.frame2}
                      />
                      <p className="marketsidetitle pl-2">Assets</p>
                    </div>
                    <div>
                      <p
                        style={{
                          fontWeight: "bold",
                          margin: "0px",
                          fontFamily: "DM Sans",
                        }}
                      >
                        **** BTC
                      </p>
                      <p
                        className="d-flex justify-content-end"
                        style={{ magin: "0px", fontFamily: "DM Sans" }}
                      >
                        $****
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-6"
                  style={{ backgroundColor: "#FCFCFD", marginLeft: "18px" }}
                >
                  <div className="d-flex justify-content-between pl-3 pt-2">
                    <div className="d-flex">
                      <img
                        style={{
                          width: "12px",
                          height: "12px",
                          marginTop: "4px",
                        }}
                        src={Images.frame3}
                      />
                      <p className="marketsidetitle pl-2">
                        Liquidity providing
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          fontWeight: "bold",
                          margin: "0px",
                          fontFamily: "DM Sans",
                        }}
                      >
                        **** BTC
                      </p>
                      <p
                        className="d-flex justify-content-end"
                        style={{ magin: "0px", fontFamily: "DM Sans" }}
                      >
                        $****
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-12 mt-1 pt-2"
                style={{ backgroundColor: "#FCFCFD" }}
              >
                <div className="d-flex justify-content-between">
                  <div className="d-flex" style={{ paddingLeft: "20px" }}>
                    <img
                      style={{
                        width: "12px",
                        height: "12px",
                        marginTop: "4px",
                      }}
                      src={Images.frame2}
                    />
                    <p className="marketsidetitle pl-2">Total</p>
                  </div>
                  <div>
                    <p
                      className="my-sm-0"
                      style={{ fontWeight: "bold", fontFamily: "DM Sans" }}
                    >
                      **** BTC
                    </p>
                    <p
                      style={{ fontFamily: "DM Sans" }}
                      className="d-flex justify-content-end"
                    >
                      $****
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 mt-2"
              style={{ marginLeft: "45px", backgroundColor: "#FCFCFD" }}
            >
              <div
                className="sidebarcoleight ml-1 pr-3 pt-2 pb-2"
                style={{ marginLeft: "65px" }}
              >
                <div style={{ paddingLeft: "20px" }}>
                  <p
                    style={{
                      fontSize: "12px",
                      paddingTop: "20px",
                      fontFamily: "DM Sans",
                      fontWeight: "bold",
                      color: "#777E90",
                    }}
                  >
                    Your holding{" "}
                    <span
                      className="pl-2 pr-2"
                      style={{
                        backgroundColor: "#58BD7D",
                        borderRadius: "12px",
                        color: "#FCFCFD",
                      }}
                    >
                      +12.98%
                    </span>
                  </p>
                  <h3
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      paddingBottom: "5px",
                      fontFamily: "DM Sans",
                    }}
                  >
                    $****
                  </h3>
                  <img style={{ paddingBottom: "0px" }} src={Images.qwq} />
                </div>
              </div>
            </div>
          </div>
          {/*check end*/}
        </>
      )}
      <p
        className="pt-3 pl-5"
        style={{ color: "#777E90", fontWeight: "bold", fontFamily: "DM Sans" }}
      >
        Transaction history
      </p>
      <div className="sidebarcoleight pt-3">
        <div className="d-flex justify-content-between">
          <ul className="list-unstyled d-flex">
            <li>
              <button
                className={
                  filterType === Enum.allType ? "alltype" : "alltype-nonActive"
                }
                style={{ color: "#fff" }}
                onClick={filterAllType}
              >
                All type
              </button>
            </li>
            <li>
              <button
                className={
                  filterType === Enum.withdraw ? "alltype" : "alltype-nonActive"
                }
                style={{ color: "#fff",  }}
                onClick={filterWithdrawType}
              >
                Withdrawals
              </button>
            </li>
            <li>
              <button
                className={
                  filterType === Enum.deposit ? "alltype" : "alltype-nonActive"
                }
                style={{ color: "#fff" }}
                onClick={filterDepositType}
              >
                Deposit
              </button>
            </li>
            <li>
              <button
                className={
                  filterType === Enum.pending ? "alltype" : "alltype-nonActive"
                }
                style={{ color: "#fff" }}
                onClick={filterPendingType}
              >
                Pending
              </button>
            </li>
          </ul>
          <form className="pr-5">
            <div class=" d-flex form-group has-search">
              <input
                style={{
                  borderRadius: "10px",
                  width: "300px",
                  fontFamily: "DM Sans",
                }}
                type="text"
                class="form-control"
                placeholder="Search after coin..."
                onChange={SearchFilter}
              />
              <span
                style={{ paddingTop: "10px", marginLeft: "-22px" }}
                class=" fa fa-search form-control-feedback"
              ></span>
            </div>
          </form>
        </div>
        <div className="d-flex justify-content-between"></div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                
                <th style={{border:"none",color:"#777E90",fontFamily:"DM Sans"}} scope="col">Type</th>
                <th style={{border:"none",color:"#777E90",fontFamily:"DM Sans"}} scope="col">Coin</th>
                <th style={{border:"none",color:"#777E90",fontFamily:"DM Sans"}} scope="col">Amount</th>
                <th style={{border:"none",color:"#777E90",fontFamily:"DM Sans"}} scope="col">Address</th>
                <th style={{border:"none",color:"#777E90",fontFamily:"DM Sans"}} scope="col">Transaction ID</th>
                <th style={{border:"none",color:"#777E90",fontFamily:"DM Sans"}} scope="col">Date</th>
              </tr>
            </thead>
            <tbody style={{ padding: "5px" }}>
              {tableData.map((d, key) => {
                return (
                  <tr>
                    <td>
                      <div className="d-flex flex-column">
                        <div>
                          <span
                            style={{ fontFamily: "DM Sans" }}
                            className={
                              d.Type === "Withdraw"
                                ? "depositclass"
                                : "depositclasss"
                            }
                          >
                            {d.Type}
                          </span>
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
                        <div
                          style={{ paddingLeft: "5px", fontFamily: "DM Sans" }}
                        >
                          {d.Coin}
                        </div>
                        <div className="d-flex align-items-center"></div>
                      </div>
                    </td>
                    <td style={{ fontFamily: "DM Sans" }}>{d.Amount}</td>
                    <td>
                      <div className="d-flex flex-column">
                        <div>
                          <b style={{ fontFamily: "DM Sans" }}>{d.Address}</b>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontFamily: "DM Sans" }}>{d.TransactionId}</td>
                    <td style={{ fontFamily: "DM Sans" }}>{d.Date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
