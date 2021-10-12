import React, {useState, useEffect} from "react";
import Images from "../Helper/AllImages";
import data from "../Helper/Data/TransactionHistory";
import { useSelector, useDispatch } from "react-redux";

const Overview = () => {
  const keyStoreInstance = useSelector((state) => state.main);

  const [tableData, setTableData] = useState([]);
  const [showBalance, setShowBalance] = useState(false);
  const [KeyStoreClients, setKeyStoreClients] = useState([]);
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
  useEffect(() => {
    console.log("my keyStore Instance===>>", keyStoreInstance);
    setKeyStoreClients(keyStoreInstance.KeyStoreClient);
  }, [keyStoreInstance]);

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
              fontSize: "32px",
              lineHeight: "40px",
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
            {showBalance ? <>Hide balance</> : <>Show balance</>}
          </button>
        </div>
        <div className="d-flex justify-content-between pt-3">
          <div>
            <p
              style={{
                margin: "0px",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "24px",
                color: "#353945",
              }}
            >
              Your Net Worth
            </p>
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
              {showBalance ? <>7.25495219 </> : <>**** </>}

              <span
                style={{
                  backgroundColor: "#58BD7D",
                  fontSize: "10px",
                  padding: "5px",
                  color: "#fff",
                  fontFamily: "DM Sans",
                  marginLeft: "50px",
                  borderRadius: "5px",
                }}
              >
                BTC
              </span>
            </p>
            <p
              style={{
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "24px",
                color: "#777E90",
              }}
            >
              ${showBalance ? <>278,523.42</> : <>****</>}
            </p>
          </div>
        </div>
      </div>
      <p
        className="pt-3 pl-5"
        style={{ color: "#777E90", fontWeight: "bold", fontFamily: "DM Sans" }}
      >
        Account Balances
      </p>
      {showBalance ? (
        <>
          <div className="row">
            <div
              style={{ paddingLeft: "15px", paddingRight: "5px" }}
              className="col-lg-8"
            >
              <div className="row">
                <div style={{ paddingRight: "0px" }} className="col-lg-6">
                  <div className="overview_portfoliobg">
                    <div className="d-flex justify-content-between">
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
                </div>
                <div style={{ paddingLeft: "5px" }} className="col-lg-6">
                  <div className="overview_portfoliobg">
                    <div className="d-flex justify-content-between ">
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
              </div>
              <div
                style={{ paddingLeft: "0px", paddingRight: "0px" }}
                className="col-lg-12"
              >
                <div className="overview_portfoliobg mt-1">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
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
            </div>
            <div style={{ paddingLeft: "0px" }} className="col-lg-4">
              <div className="sidebarcoleight">
                <div style={{ paddingLeft: "5px" }}>
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
                  <img style={{ paddingBottom: "8px" }} src={Images.overview} />
                </div>
              </div>
            </div>
          </div>
          {/*check end*/}
        </>
      ) : (
        <>
          <div className="row">
            <div
              style={{ paddingLeft: "15px", paddingRight: "5px" }}
              className="col-lg-8"
            >
              <div className="row">
                <div style={{ paddingRight: "0px" }} className="col-lg-6">
                  <div className="overview_portfoliobg">
                    <div className="d-flex justify-content-between">
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
                </div>
                <div style={{ paddingLeft: "5px" }} className="col-lg-6">
                  <div className="overview_portfoliobg">
                    <div className="d-flex justify-content-between ">
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
              </div>
              <div
                style={{ paddingLeft: "0px", paddingRight: "0px" }}
                className="col-lg-12"
              >
                <div className="overview_portfoliobg mt-1">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
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
            </div>
            <div style={{ paddingLeft: "0px" }} className="col-lg-4">
              <div className="sidebarcoleight">
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
                    $****K
                  </h3>
                  <img style={{ paddingBottom: "8px" }} src={Images.overview} />
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
                style={{ color: "#fff" }}
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
          <div class="d-flex">
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
                  placeholder="Search"
                  onChange={SearchFilter}
                />
                <span
                  style={{ paddingTop: "10px", marginLeft: "-22px" }}
                  class=" fa fa-search form-control-feedback"
                ></span>
              </div>
            </form>
            <button class="mb-4  mr-4 seeallbutton">
              See all{" "}
              <img src={Images.seeall} style={{ paddingLeft: "10px" }} />
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-between"></div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th class="pt-3 pb-3 overview-tablehead" scope="col">
                  Type <img class="pl-1" src={Images.nameup} />
                </th>
                <th class="pt-3 pb-3 overview-tablehead" scope="col">
                  Coin <img class="pl-1" src={Images.nameup} />
                </th>
                <th class="pt-3 pb-3 overview-tablehead" scope="col">
                  Amount <img class="pl-1" src={Images.nameup} />
                </th>
                <th class="pt-3 pb-3 overview-tablehead" scope="col">
                  Address <img class="pl-1" src={Images.nameup} />
                </th>
                <th class="pt-3 pb-3 overview-tablehead" scope="col">
                  Transaction ID <img class="pl-1" src={Images.nameup} />
                </th>
                <th
                  class="pt-3 pb-3"
                  style={{
                    color: "#777E90",
                    fontFamily: "Poppins",
                    textAlign: "right",
                    paddingRight: "55px",
                    fontSize: "12px",
                    lineHeight: "20px",
                  }}
                  scope="col"
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody style={{ padding: "5px" }}>
              {KeyStoreClients ? (
                <>
                  {KeyStoreClients.map((d, key) => {
                    return (
                      <>
                        {d.Transactions.txs.map((t, key2) => {
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
                                      {t.type.toUpperCase()}
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
                                    style={{
                                      paddingLeft: "5px",
                                      fontFamily: "DM Sans",
                                    }}
                                  >
                                    {t.asset.symbol}
                                  </div>
                                  <div className="d-flex align-items-center"></div>
                                </div>
                              </td>
                              <td style={{ fontFamily: "DM Sans" }}>
                                {Number(t.to[0].amount.amount().c[0]) /
                                  Math.pow(10, Number(t.to[0].amount.decimal))}
                                {/* {t.to[0].amount.amount().c[0]} */}
                              </td>
                              <td>
                                <div className="d-flex flex-column">
                                  <div>
                                    <b style={{ fontFamily: "DM Sans" }}>
                                      {t.to[0].to}
                                    </b>
                                  </div>
                                </div>
                              </td>
                              <td style={{ fontFamily: "DM Sans" }}>
                                {t.hash}
                              </td>
                              <td style={{ fontFamily: "DM Sans" }}>
                                {t.date.toString().substring(0, 24)}
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    );
                  })}
                </>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
