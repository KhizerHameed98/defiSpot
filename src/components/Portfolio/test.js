import React, { useState, useEffect } from "react";
import Images from "../Helper/AllImages";
import data from "../Helper/Data/TransactionHistory";
import { useSelector, useDispatch } from "react-redux";

const Overview = () => {
  const keyStoreInstance = useSelector((state) => state.main);
  const [searchInput, setSearchInput] = useState("");
  const [tableData, setTableData] = useState([]);
  const [mainState, setMainState] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [reduxState, setReduxData] = useState("");
  const [overallBalance_BTC, setOverallBalance_BTC] = useState(0);
  const [overallBalance_USD, setOverallBalance_USD] = useState(0);
  const [showBalance, setShowBalance] = useState(true);
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
    const newArr = [];
    keyStoreInstance.KeyStoreClient?.map((val) =>
      val.Transactions.txs.map((val2) => newArr.push(val2))
    );
    console.log("txs at one place", newArr);
    setOverallBalance_BTC(keyStoreInstance.overallBalance_BTC);
    setOverallBalance_USD(keyStoreInstance.overallBalance_USD);
    const data = JSON.stringify(keyStoreInstance.KeyStoreClient);
    setReduxData(data);
  }, [keyStoreInstance.KeyStoreClient, keyStoreInstance]);

  useEffect(() => {
    setTempData(reduxState && JSON.parse(reduxState));
  }, [reduxState]);

  function SearchFilter(e) {
    setSearchInput(e.target.value);
    if (!e.target.value) {
      setFilterType(Enum.allType);
      setKeyStoreClients(keyStoreInstance?.KeyStoreClient);
      const data = JSON.stringify(keyStoreInstance.KeyStoreClient);
      setReduxData(data);
    } else {
      let res =
        tempData?.length &&
        tempData?.filter((d, key) => {
          // console.log("record", d);
          let res2 = d?.Transactions?.txs?.filter((value) => {
            // console.log("value========", value);
            return (
              value?.hash
                ?.toLowerCase()
                .includes(e.target.value.toLowerCase()) && value
            );
          });

          console.log("res2=====>>>", res2?.length && res2);
          d.Transactions.txs = res2;
          return d.Transactions.txs.length && d;

          // return d.Transactions.txs.length && d;
        });
      console.log("res====>>>", res);
      setKeyStoreClients(res);
    }
  }

  useEffect(() => {
    setTempData(reduxState && JSON.parse(reduxState));
  }, [searchInput]);

  //Descending Order Filter Name
  const handleDescendingName = () => {
    let check = [...keyStoreInstance.KeyStoreClient];
    let res = check.sort((a, b) => {
      // a.assetFullName.toLowerCase() < b.assetFullName.toLowerCase() ? 1 : -1
      console.log("a====>", a);
      console.log("b=========>>", b);
    });
  };

  function filterAllType() {
    setSearchInput("");
    setFilterType(Enum.allType);
    setKeyStoreClients(keyStoreInstance.KeyStoreClient);
    const data = JSON.stringify(keyStoreInstance.KeyStoreClient);
    setReduxData(data);
  }

  function filterWithdrawType() {
    setSearchInput("");
    setFilterType(Enum.withdraw);
    let res = keyStoreInstance.KeyStoreClient.filter((d, key) => {
      let res2 = d.Transactions.txs.filter(
        (value) => value.type.toLowerCase() === "withdraw"
      );
      return res2.length && res2;
    });
    setKeyStoreClients(res);
    const data = JSON.stringify(res);
    setReduxData(data);
  }

  function filterDepositType() {
    setSearchInput("");
    setFilterType(Enum.deposit);
    let res = keyStoreInstance.KeyStoreClient.filter((d, key) => {
      let res2 = d.Transactions.txs.filter(
        (value) => value.type.toLowerCase() === "deposit"
      );
      return res2.length && res2;
    });
    setKeyStoreClients(res);
    const data = JSON.stringify(res);
    setReduxData(data);
  }

  function filterPendingType() {
    setSearchInput("");
    setFilterType(Enum.pending);
    let res = keyStoreInstance.KeyStoreClient.filter((d, key) => {
      let res2 = d.Transactions.txs.filter(
        (value) => value.type.toLowerCase() === "pending"
      );
      return res2.length && res2;
    });
    setKeyStoreClients(res);
    const data = JSON.stringify(res);
    setReduxData(data);
  }

  function financial(x) {
    return Number.parseFloat(x).toFixed(4);
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="col-lg-7 marginleftcol mt-2">
      <div className="w-sidebarcoleight pt-3">
        <div className="d-flex justify-content-between">
          <h2
            style={{
              fontFamily: "DM Sans",
              fontWeight: "bold",
              fontSize: "32px",
              lineHeight: "48px",
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
                fontWeight: "600",
                lineHeight: "24px",
                color: "#353945",
                paddingBottom: "3px",
              }}
            >
              Your Net Worth
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
                {showBalance ? (
                  <>
                    {overallBalance_BTC ? (
                      <>{financial(overallBalance_BTC)}</>
                    ) : (
                      0
                    )}{" "}
                  </>
                ) : (
                  <>**** </>
                )}
              </p>
              <p
                style={{
                  backgroundColor: "#58BD7D",
                  fontSize: "12px",
                  padding: "5px",
                  fontFamily: "Poppins",
                  color: "#fff",
                  position: "relative",
                  top: "3px",
                  paddingLeft: "10px",
                  fontWeight: "700",
                  marginLeft: "8px",
                  paddingRight: "10px",
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
              }}
            >
              $
              {showBalance ? (
                <>
                  {overallBalance_USD ? (
                    <>{numberWithCommas(financial(overallBalance_USD))}</>
                  ) : (
                    0
                  )}
                </>
              ) : (
                <>****</>
              )}
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
                  <div className="w-overview_portfoliobg">
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
                        <p className="w-marketsidetitle pl-2">Assets</p>
                      </div>
                      <div>
                        <p
                          style={{
                            fontWeight: "500",
                            fontSize: "16px",
                            margin: "0px",
                            fontFamily: "Poppins",
                            color: "23262F",
                          }}
                        >
                          3.12194287 BTC
                        </p>
                        <p
                          className="d-flex justify-content-end"
                          style={{
                            magin: "0px",
                            fontFamily: "Poppins",
                            color: "#777E90",
                            fontSize: "14px",
                            fontWeight: "400",
                            margin: "0px",
                          }}
                        >
                          $10,095.35
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ paddingLeft: "5px" }} className="col-lg-6">
                  <div className="w-overview_portfoliobg">
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
                        <p className="w-marketsidetitle pl-2">
                          Liquidity providing
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            fontWeight: "500",
                            fontSize: "16px",
                            margin: "0px",
                            fontFamily: "Poppins",
                            color: "23262F",
                          }}
                        >
                          3.1219 BTC
                        </p>
                        <p
                          className="d-flex justify-content-end"
                          style={{
                            magin: "0px",
                            fontFamily: "Poppins",
                            color: "#777390",
                            fontSize: "14px",
                            fontWeight: "400",
                            margin: "0px",
                          }}
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
                <div className="w-overview_portfoliobg mt-1">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <img
                        style={{
                          width: "12px",
                          height: "12px",
                          marginTop: "4px",
                        }}
                        src={Images.purple}
                      />
                      <p className="w-marketsidetitle pl-2">Total</p>
                    </div>
                    <div>
                      <p
                        className="my-sm-0"
                        style={{
                          fontWeight: "500",
                          fontSize: "16px",
                          margin: "0px",
                          fontFamily: "Poppins",
                          color: "23262F",
                        }}
                      >
                        10.376987555 BTC
                      </p>
                      <p
                        style={{
                          fontFamily: "Poppins",
                          color: "#777390",
                          fontSize: "14px",
                          fontWeight: "400",
                          margin: "0px",
                        }}
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
              <div className="w-sidebarcoleight">
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      marginBottom: "5px",
                      fontFamily: "Poppins",
                      fontWeight: "500",
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
                      fontWeight: "600",
                      fontSize: "24px",
                      paddingBottom: "12px",
                      fontFamily: "Poppins",
                      color: "23262F",
                    }}
                  >
                    $398.5K
                  </h3>
                  <img
                    style={{
                      paddingBottom: "8px",
                      width: "220px",
                      paddingRight: "20px",
                    }}
                    src={Images.overview}
                  />
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
                  <div className="w-overview_portfoliobg">
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
                        <p className="w-marketsidetitle pl-2">Assets</p>
                      </div>
                      <div>
                        <p
                          style={{
                            fontWeight: "500",
                            fontSize: "16px",
                            margin: "0px",
                            fontFamily: "Poppins",
                            color: "23262F",
                          }}
                        >
                          **** BTC
                        </p>
                        <p
                          className="d-flex justify-content-end"
                          style={{
                            magin: "0px",
                            fontFamily: "Poppins",
                            color: "#777E90",
                            fontSize: "14px",
                            fontWeight: "400",
                            margin: "0px",
                          }}
                        >
                          $****
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ paddingLeft: "5px" }} className="col-lg-6">
                  <div className="w-overview_portfoliobg">
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
                        <p className="w-marketsidetitle pl-2">
                          Liquidity providing
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            fontWeight: "500",
                            fontSize: "16px",
                            margin: "0px",
                            fontFamily: "Poppins",
                            color: "23262F",
                          }}
                        >
                          **** BTC
                        </p>
                        <p
                          className="d-flex justify-content-end"
                          style={{
                            magin: "0px",
                            fontFamily: "Poppins",
                            color: "#777390",
                            fontSize: "14px",
                            fontWeight: "400",
                            margin: "0px",
                          }}
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
                <div className="w-overview_portfoliobg mt-1">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <img
                        style={{
                          width: "12px",
                          height: "12px",
                          marginTop: "4px",
                        }}
                        src={Images.purple}
                      />
                      <p className="w-marketsidetitle pl-2">Total</p>
                    </div>
                    <div>
                      <p
                        className="my-sm-0"
                        style={{
                          fontWeight: "500",
                          fontSize: "16px",
                          margin: "0px",
                          fontFamily: "Poppins",
                          color: "23262F",
                        }}
                      >
                        **** BTC
                      </p>
                      <p
                        style={{
                          fontFamily: "Poppins",
                          color: "#777390",
                          fontSize: "14px",
                          fontWeight: "400",
                          margin: "0px",
                        }}
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
              <div className="w-sidebarcoleight">
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      marginBottom: "5px",
                      fontFamily: "Poppins",
                      fontWeight: "500",
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
                      fontWeight: "600",
                      fontSize: "24px",
                      paddingBottom: "12px",
                      fontFamily: "Poppins",
                      color: "23262F",
                    }}
                  >
                    $****
                  </h3>
                  <img
                    style={{
                      paddingBottom: "8px",
                      width: "220px",
                      paddingRight: "20px",
                    }}
                    src={Images.overview}
                  />
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
        Transaction History
      </p>
      <div className="w-sidebarcoleight pt-3">
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
            <div className="pr-3">
              <div class=" d-flex form-group has-search">
                <input
                  style={{
                    borderRadius: "10px",
                    width: "250px",
                    fontFamily: "DM Sans",
                  }}
                  type="text"
                  class="form-control"
                  placeholder="Search"
                  value={searchInput}
                  onChange={SearchFilter}
                />
                <img
                  style={{
                    width: "17px",
                    height: "17px",
                    marginLeft: "-25px",
                    marginTop: "10px",
                  }}
                  src={Images.searchicon}
                />
                {/* <span
            style={{ paddingTop: "10px", marginLeft: "-22px" }}
            class=" fa fa-search form-control-feedback"
          ></span> */}
              </div>
            </div>
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
                  Type{" "}
                  <div
                    style={{
                      display: "inline-grid",
                      paddingBottom: "4px",
                      marginLeft: "3px",
                    }}
                  >
                    <img
                      class="pl-1"
                      src={Images.FilterUp}
                      onClick={handleDescendingName}
                      style={{
                        marginBottom: "3px",
                        cursor: "pointer",
                      }}
                    />
                    <img
                      class="pl-1"
                      src={Images.FilterDown}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
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
                    paddingRight: "20px",
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
                            <tr className="maintdclasshover">
                              <td>
                                <div className="d-flex flex-column">
                                  <div>
                                    <span
                                      style={{ fontFamily: "Poppins" }}
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
                                    src={Images.bitcoinnn}
                                  />
                                  <div
                                    style={{
                                      paddingLeft: "5px",
                                      fontFamily: "Poppins",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {t.asset.ticker}
                                  </div>
                                  <div className="d-flex align-items-center"></div>
                                </div>
                              </td>
                              <td
                                style={{
                                  fontFamily: "Poppins",
                                  fontWeight: "500",
                                }}
                              >
                                {t.transferAmount}
                                {/* {t.to[0].amount.amount().c[0]} */}
                              </td>
                              <td>
                                <div className="d-flex flex-column">
                                  <div
                                    style={{
                                      paddingLeft: "5px",
                                      fontFamily: "Poppins",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {t.to[0].to}
                                  </div>
                                </div>
                              </td>
                              <td
                                style={{
                                  fontFamily: "Poppins",
                                  color: "#777e90",
                                  fontWeight: "500",
                                }}
                              >
                                {t.hash}
                              </td>
                              <td
                                style={{
                                  fontFamily: "Poppins",
                                  color: "#777e90",
                                  whiteSpace: "nowrap",
                                }}
                              >
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
