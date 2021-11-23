import React, { useState, useEffect } from "react";
import Images from "../Helper/AllImages";
import data from "../Helper/Data/TransactionHistory";
import { useSelector, useDispatch } from "react-redux";

const Overview = () => {
  const keyStoreInstance = useSelector((state) => state.main);
  const [searchInput, setSearchInput] = useState("");

  const [transactionHistory, setTransactionHistory] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [overallBalance_BTC, setOverallBalance_BTC] = useState(0);
  const [overallBalance_USD, setOverallBalance_USD] = useState(0);
  const [showBalance, setShowBalance] = useState(true);
  const [mainState, setMainState] = useState([]);
  const [Enum, set_Enum] = useState({
    allType: "allType",
    withdraw: "withdraw",
    deposit: "deposit",
    pending: "pending",
  });
  const [filterType, setFilterType] = useState(Enum.allType);

  useEffect(() => {
    setMainState(keyStoreInstance.transactionHistory);
    setOverallBalance_BTC(keyStoreInstance.overallBalance_BTC);
    setOverallBalance_USD(keyStoreInstance.overallBalance_USD);
  }, [
    keyStoreInstance.KeyStoreClient,
    keyStoreInstance.transactionHistory,
    keyStoreInstance,
  ]);

  useEffect(() => {
    setTransactionHistory(mainState);
    setTempData(mainState);
  }, [mainState]);

  function SearchFilter(e) {
    setSearchInput(e.target.value);

    if (!e.target.value) {
      setTransactionHistory(tempData);
    } else {
      let temp = tempData;
      console.log("hey Temp=====>>", temp);

      let res = temp?.filter(
        (value) =>
          value?.hash?.toLowerCase().includes(e.target.value.toLowerCase()) &&
          value
      );
      setTransactionHistory(res);
    }
  }

  function filterAllType() {
    setSearchInput("");
    setFilterType(Enum.allType);
    setTransactionHistory(mainState);
    setTempData(mainState);
  }
  function filterWithdrawType() {
    setSearchInput("");
    setFilterType(Enum.withdraw);

    let res = mainState.filter(
      (value) => value.type.toLowerCase() === Enum.withdraw
    );

    setTransactionHistory(res);
    setTempData(res);
  }
  function filterDepositType() {
    setSearchInput("");
    setFilterType(Enum.deposit);
    let res = mainState.filter(
      (value) => value.type.toLowerCase() === Enum.deposit
    );

    setTransactionHistory(res);
    setTempData(res);
  }
  function filterPendingType() {
    setSearchInput("");
    setFilterType(Enum.pending);
    let res = mainState.filter(
      (value) => value.type.toLowerCase() === Enum.pending
    );

    setTransactionHistory(res);
    setTempData(res);
  }

  //Descending Order Filter Type
  const handleDescendingType = () => {
    let check = [...mainState];
    let res = check.sort((a, b) =>
      a.type.toLowerCase() < b.type.toLowerCase() ? 1 : -1
    );

    setMainState(res);
    let check2 = [...transactionHistory];
    let res2 = check2.sort((a, b) =>
      a.type.toLowerCase() < b.type.toLowerCase() ? 1 : -1
    );
    setTransactionHistory(res2);
    let check3 = [...tempData];
    let res3 = check3.sort((a, b) =>
      a.type.toLowerCase() < b.type.toLowerCase() ? 1 : -1
    );
    setTempData(res3);
  };

  //Ascending Order Filter Type
  const handleAscendingType = () => {
    let check = [...mainState];
    let res = check.sort((a, b) =>
      a.type.toLowerCase() > b.type.toLowerCase() ? 1 : -1
    );

    setMainState(res);
    let check2 = [...transactionHistory];
    let res2 = check2.sort((a, b) =>
      a.type.toLowerCase() > b.type.toLowerCase() ? 1 : -1
    );
    setTransactionHistory(res2);
    let check3 = [...tempData];
    let res3 = check3.sort((a, b) =>
      a.type.toLowerCase() > b.type.toLowerCase() ? 1 : -1
    );
    setTempData(res3);
  };

  //Descending Order Filter Coin
  const handleDescendingCoin = () => {
    let check = [...mainState];
    let res = check.sort((a, b) =>
      a.asset.ticker.toLowerCase() < b.asset.ticker.toLowerCase() ? 1 : -1
    );

    setMainState(res);
    let check2 = [...transactionHistory];
    let res2 = check2.sort((a, b) =>
      a.asset.ticker.toLowerCase() < b.asset.ticker.toLowerCase() ? 1 : -1
    );
    setTransactionHistory(res2);
    let check3 = [...tempData];
    let res3 = check3.sort((a, b) =>
      a.asset.ticker.toLowerCase() < b.asset.ticker.toLowerCase() ? 1 : -1
    );
    setTempData(res3);
  };

  //Ascending Order Filter Coin
  const handleAscendingCoin = () => {
    let check = [...mainState];
    let res = check.sort((a, b) =>
      a.asset.ticker.toLowerCase() > b.asset.ticker.toLowerCase() ? 1 : -1
    );

    setMainState(res);
    let check2 = [...transactionHistory];
    let res2 = check2.sort((a, b) =>
      a.asset.ticker.toLowerCase() > b.asset.ticker.toLowerCase() ? 1 : -1
    );
    setTransactionHistory(res2);
    let check3 = [...tempData];
    let res3 = check3.sort((a, b) =>
      a.asset.ticker.toLowerCase() > b.asset.ticker.toLowerCase() ? 1 : -1
    );
    setTempData(res3);
  };

  //Descending Order Filter Amount
  const handleDescendingAmount = () => {
    let check = [...mainState];
    let res = check.sort((a, b) => b.transferAmount - a.transferAmount);

    setMainState(res);
    let check2 = [...transactionHistory];
    let res2 = check2.sort((a, b) => b.transferAmount - a.transferAmount);
    setTransactionHistory(res2);
    let check3 = [...tempData];
    let res3 = check3.sort((a, b) => b.transferAmount - a.transferAmount);
    setTempData(res3);
  };

  //Ascending Order Filter Amount
  const handleAscendingAmount = () => {
    let check = [...mainState];
    let res = check.sort((a, b) => a.transferAmount - b.transferAmount);

    setMainState(res);
    let check2 = [...transactionHistory];
    let res2 = check2.sort((a, b) => a.transferAmount - b.transferAmount);
    setTransactionHistory(res2);
    let check3 = [...tempData];
    let res3 = check3.sort((a, b) => a.transferAmount - b.transferAmount);
    setTempData(res3);
  };

  //Descending Order Filter Address
  const handleDescendingAddress = () => {
    let check = [...mainState];
    let res = check?.sort((a, b) =>
      a.to[0].to.toLowerCase() < b.to[0].to.toLowerCase() ? 1 : -1
    );

    setMainState(res);
    let check2 = [...transactionHistory];
    let res2 = check2?.sort((a, b) =>
      a.to[0].to.toLowerCase() < b.to[0].to.toLowerCase() ? 1 : -1
    );
    setTransactionHistory(res2);
    let check3 = [...tempData];
    let res3 = check3?.sort((a, b) =>
      a.to[0].to.toLowerCase() < b.to[0].to.toLowerCase() ? 1 : -1
    );
    setTempData(res3);
  };

  //Ascending Order Filter Type
  const handleAscendingAddress = () => {
    let check = [...mainState];
    let res = check?.sort((a, b) =>
      a.to[0].to.toLowerCase() > b.to[0].to.toLowerCase() ? 1 : -1
    );

    setMainState(res);
    let check2 = [...transactionHistory];
    let res2 = check2?.sort((a, b) =>
      a.to[0].to.toLowerCase() > b.to[0].to.toLowerCase() ? 1 : -1
    );
    setTransactionHistory(res2);
    let check3 = [...tempData];
    let res3 = check3?.sort((a, b) =>
      a.to[0].to.toLowerCase() > b.to[0].to.toLowerCase() ? 1 : -1
    );
    setTempData(res3);
  };

  //Descending Order Filter TransactionID
  const handleDescendingTransactionID = () => {
    let check = [...mainState];
    let res = check.sort((a, b) =>
      a.hash.toLowerCase() < b.hash.toLowerCase() ? 1 : -1
    );

    setMainState(res);
    let check2 = [...transactionHistory];
    let res2 = check2.sort((a, b) =>
      a.hash.toLowerCase() < b.hash.toLowerCase() ? 1 : -1
    );
    setTransactionHistory(res2);
    let check3 = [...tempData];
    let res3 = check3.sort((a, b) =>
      a.hash.toLowerCase() < b.hash.toLowerCase() ? 1 : -1
    );
    setTempData(res3);
  };

  //Ascending Order Filter TransactionID
  const handleAscendingTransactionID = () => {
    let check = [...mainState];
    let res = check.sort((a, b) =>
      a.hash.toLowerCase() > b.hash.toLowerCase() ? 1 : -1
    );

    setMainState(res);
    let check2 = [...transactionHistory];
    let res2 = check2.sort((a, b) =>
      a.hash.toLowerCase() > b.hash.toLowerCase() ? 1 : -1
    );
    setTransactionHistory(res2);
    let check3 = [...tempData];
    let res3 = check3.sort((a, b) =>
      a.hash.toLowerCase() > b.hash.toLowerCase() ? 1 : -1
    );
    setTempData(res3);
  };

  const gettingLogos = (t) => {
    let midgardPool = keyStoreInstance?.midgardPool;
    let ticker = t?.asset?.ticker;
    if (t.asset.ticker.toLowerCase() === "rune") {
      ticker = "XRUNE";
    }

    let res = midgardPool?.find(
      (d) => d?.asset.toLowerCase() === ticker.toLowerCase()
    );
    return (
      <>
        <img
          style={{ width: "25px" }}
          style={{ width: "25px" }}
          src={res?.logo}
        />
      </>
    );
  };

  const gettingFullName = (t) => {
    let midgardPool = keyStoreInstance?.midgardPool;
    let ticker = t?.asset?.ticker;
    if (t.asset.ticker.toLowerCase() === "rune") {
      ticker = "XRUNE";
    }

    let res = midgardPool?.find(
      (d) => d?.asset.toLowerCase() === ticker.toLowerCase()
    );
    return <>{res.assetFullName}</>;
  };

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="col-lg-10 w-pd-port-body">
      <div className="w-sidebarcoleight">
        <div className="d-flex justify-content-between">
          <h2 className="u-overview09888">Overview</h2>
          <button
            type="button"
            // className="btn btn-dark mr-2 pl-4 pr-4"
            className={
              showBalance ? "btn n-secondaryButton" : "btn n-primaryButton"
            }
            style={{
              minWidth: "130px",
            }}
            onClick={() => {
              setShowBalance(!showBalance);
            }}
          >
            {showBalance ? <>Hide balance</> : <>Show balance</>}
          </button>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="w-over-text">Your Net Worth</p>
            <div class="d-flex">
              <p className="u-mainclassliquidity6788">
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
              className="mb-0"
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
      <p className="w-over-center-heading">Account Balances</p>
      {showBalance ? (
        <>
          <div className="row m-0">
            <div className="col-lg-8 w-ast-pd">
              <div className="row">
                <div className="col-lg-6 w-ast-pd-1">
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
                          {overallBalance_BTC ? (
                            <>{financial(overallBalance_BTC)}</>
                          ) : (
                            0
                          )}{" "}
                          BTC
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
                          ${" "}
                          {overallBalance_USD ? (
                            <>
                              {numberWithCommas(financial(overallBalance_USD))}
                            </>
                          ) : (
                            0
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 w-ast-pd-2">
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
            <div
              style={{ paddingLeft: "0px", paddingRight: "0px" }}
              className="col-lg-4"
            >
              <div className="w-overview_portfoliobg">
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
                      lineHeight: "32px",
                      paddingBottom: "19px",
                      fontFamily: "Poppins",
                      color: "#23262F",
                    }}
                  >
                    $ {numberWithCommas(financial(overallBalance_USD))}
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
          <div className="row m-0">
            <div
              style={{ paddingLeft: "0px", paddingRight: "4px" }}
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
                <div style={{ paddingLeft: "4px" }} className="col-lg-6">
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
            <div
              style={{ paddingLeft: "0px", paddingRight: "0px" }}
              className="col-lg-4"
            >
              <div className="w-overview_portfoliobg">
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
                      paddingBottom: "19px",
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
      <p className="w-over-center-heading">Transaction History</p>
      <div className="w-sidebarcoleight">
        <div className="d-flex justify-content-between flex-sm-row flex-column">
          <ul className="list-unstyled d-block d-sm-flex flex-row align-items-center mb-0">
            <li
              className="d-inline-block d-sm-flex flex-row justify-content-center align-items-center"
              style={{ marginRight: "16px" }}
            >
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
            <li
              className="d-inline-block d-sm-flex flex-row justify-content-center align-items-center"
              style={{ marginRight: "16px" }}
            >
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
            <li
              className="d-inline-block d-sm-flex flex-row justify-content-center align-items-center"
              style={{ marginRight: "16px" }}
            >
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
            <li
              className="d-inline-block d-sm-flex flex-row justify-content-center align-items-center"
              style={{ marginRight: "16px" }}
            >
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
          <div class="d-flex flex-column flex-sm-row align-content-start align-items-sm-center ">
            <div className="pr-3 my-2 my-sm-0">
              <div class=" d-flex form-group has-search mb-0">
                <input
                  type="text"
                  class="form-control n-tableSearch"
                  placeholder="Search"
                  value={searchInput}
                  onChange={SearchFilter}
                />
                <img
                  style={{
                    width: "20px",
                    height: "20px",
                    marginLeft: "-35px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                  src={Images.searchicon}
                />
              </div>
            </div>
            <button
              class="mr-2 seeallbutton btnHoverBlue"
              style={{ maxWidth: "130px" }}
            >
              See all{" "}
              <img src={Images.seeall} style={{ paddingLeft: "10px" }} />
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-between"></div>
        <div className="table-responsive w-comon-table-style">
          <table className="table">
            <thead>
              <tr>
                <th class="text-right" scope="col">
                  Type{" "}
                  <div
                    style={{
                      display: "inline-grid",
                      marginLeft: "3px",
                      position: "absolute",
                      bottom: "34px",
                    }}
                  >
                    <img
                      class="pl-1"
                      src={Images.FilterUp}
                      onClick={handleDescendingType}
                      style={{
                        marginBottom: "3px",
                        cursor: "pointer",
                      }}
                    />
                    <img
                      class="pl-1"
                      onClick={handleAscendingType}
                      src={Images.FilterDown}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </th>
                <th class="text-right" scope="col">
                  Coin{" "}
                  <div
                    style={{
                      display: "inline-grid",
                      marginLeft: "3px",
                      position: "absolute",
                      bottom: "34px",
                    }}
                  >
                    <img
                      class="pl-1"
                      src={Images.FilterUp}
                      onClick={handleDescendingCoin}
                      style={{
                        marginBottom: "3px",
                        cursor: "pointer",
                      }}
                    />
                    <img
                      class="pl-1"
                      onClick={handleAscendingCoin}
                      src={Images.FilterDown}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </th>
                <th class="text-right" scope="col">
                  Amount{" "}
                  <div
                    style={{
                      display: "inline-grid",
                      marginLeft: "3px",
                      position: "absolute",
                      bottom: "34px",
                    }}
                  >
                    <img
                      class="pl-1"
                      src={Images.FilterUp}
                      onClick={handleDescendingAmount}
                      style={{
                        marginBottom: "3px",
                        cursor: "pointer",
                      }}
                    />
                    <img
                      class="pl-1"
                      onClick={handleAscendingAmount}
                      src={Images.FilterDown}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </th>
                <th class="text-right" scope="col">
                  Address{" "}
                  <div
                    style={{
                      display: "inline-grid",
                      marginLeft: "3px",
                      position: "absolute",
                      bottom: "34px",
                    }}
                  >
                    <img
                      class="pl-1"
                      src={Images.FilterUp}
                      onClick={handleDescendingAddress}
                      style={{
                        marginBottom: "3px",
                        cursor: "pointer",
                      }}
                    />
                    <img
                      class="pl-1"
                      onClick={handleAscendingAddress}
                      src={Images.FilterDown}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </th>
                <th class="text-right" scope="col">
                  Transaction ID{" "}
                  <div
                    style={{
                      display: "inline-grid",
                      marginLeft: "3px",
                      position: "absolute",
                      bottom: "34px",
                    }}
                  >
                    <img
                      class="pl-1"
                      src={Images.FilterUp}
                      onClick={handleDescendingTransactionID}
                      style={{
                        marginBottom: "3px",
                        cursor: "pointer",
                      }}
                    />
                    <img
                      class="pl-1"
                      onClick={handleAscendingTransactionID}
                      src={Images.FilterDown}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </th>
                <th class="text-right" scope="col">
                  Date
                </th>
              </tr>
            </thead>
            <tbody style={{ padding: "5px" }}>
              {transactionHistory ? (
                <>
                  {transactionHistory.map((t, key) => {
                    return (
                      <tr className="maintdclasshover">
                        <td>
                          <div className="d-flex flex-column">
                            <div>
                              <span
                                style={{ fontFamily: "Poppins" }}
                                className={
                                  t.type === "Withdraw"
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
                            {/* <img
                              style={{ width: "25px" }}
                              style={{ width: "25px" }}
                              src={Images.bitcoinnn}
                            /> */}
                            {gettingLogos(t)}
                            <div
                              style={{
                                paddingLeft: "5px",
                                fontFamily: "Poppins",
                                fontWeight: "500",
                              }}
                            >
                              {gettingFullName(t)}
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
                          {t.transferAmount} BTC
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
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
