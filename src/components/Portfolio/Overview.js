import React, { useState, useEffect, useRef } from "react";
import Images from "../Helper/AllImages";
import data from "../Helper/Data/TransactionHistory";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
import LineChartSmartCard from "../GraphChart/holdingGraph";
import axios from "axios";
import { NGROK } from "../../Services/mainServices";

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

  const [ascendingDescendingType, setAscendingDescendingType] = useState(false);
  const [ascendingDescendingCoin, setAscendingDescendingCoin] = useState(false);
  const [graphData, setGraphData] = useState([]);
  const [ascendingDescendingAmount, setAscendingDescendingAmount] =
    useState(false);
  const [ascendingDescendingAddress, setAscendingDescendingAddress] =
    useState(false);
  const [
    ascendingDescendingTransactionID,
    setAscendingDescendingTransactionID,
  ] = useState(false);

  const handleAscendingDescendingTransactionID = () => {
    setAscendingDescendingTransactionID(!ascendingDescendingTransactionID);
  };

  const getHoldingAsset = async () => {
    const data = {
      accountAddress: mainState?.walletAddress,
      amount: mainState?.overallBalance_USD,
      date: new Date().toString(),
    };
    axios
      .get(
        `${NGROK}/get/holding/asset/by/account/address/${keyStoreInstance.walletAddress}`
      )
      .then((res) => {
        console.log("GET_HOLDING RES=============", res?.data?.holdingAsset);
        let check = res?.data?.holdingAsset;

        console.log("in <><><><><><><> if");
        console.log("final============", res);

        let finalData = check?.map((data, k) => {
          return {
            x: data.date.toString().substring(4, 22),
            // new Date(data.date.toString()).getTime(),
            y: data.amount,
          };
        });
        setGraphData(finalData);
        console.log("<><><><< FINAL DATA ", finalData);
      })
      .catch((e) => console.log("ERR ", e.message));
  };

  useEffect(() => {
    if (keyStoreInstance) {
      if (keyStoreInstance?.walletAddress) {
        getHoldingAsset();
      }
    }
  }, [keyStoreInstance]);

  useEffect(() => {
    if (ascendingDescendingTransactionID) {
      handleAscendingTransactionID();
    } else {
      handleDescendingTransactionID();
    }
  }, [ascendingDescendingTransactionID]);

  const handleAscendingDescendingAddress = () => {
    setAscendingDescendingAddress(!ascendingDescendingAddress);
  };

  const [cardsPerPage, setCardsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const countData = transactionHistory?.length;

  useEffect(() => {
    if (countData % cardsPerPage === 0) {
      setCount(Math.floor(countData / cardsPerPage));
    } else {
      setCount(Math.floor(countData / cardsPerPage) + 1);
    }
  }, [countData, cardsPerPage]);

  useEffect(() => {
    if (ascendingDescendingAddress) {
      handleAscendingAddress();
    } else {
      handleDescendingAddress();
    }
  }, [ascendingDescendingAddress]);

  const myRef = useRef(null);

  const handleChange = (event, value) => {
    // window.scrollTo(0, 0);
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    setPage(value);
  };

  const handleAscendingDescendingType = () => {
    setAscendingDescendingType(!ascendingDescendingType);
  };
  useEffect(() => {
    if (ascendingDescendingType) {
      handleAscendingType();
    } else {
      handleDescendingType();
    }
  }, [ascendingDescendingType]);

  const handleAscendingDescendingCoin = () => {
    setAscendingDescendingCoin(!ascendingDescendingCoin);
  };
  useEffect(() => {
    if (ascendingDescendingCoin) {
      handleAscendingCoin();
    } else {
      handleDescendingCoin();
    }
  }, [ascendingDescendingCoin]);

  const handleAscendingDescendingAmount = () => {
    setAscendingDescendingAmount(!ascendingDescendingAmount);
  };
  useEffect(() => {
    if (ascendingDescendingAmount) {
      handleAscendingAmount();
    } else {
      handleDescendingAmount();
    }
  }, [ascendingDescendingAmount]);

  useEffect(() => {
    setMainState(keyStoreInstance?.transactionHistory);
    setOverallBalance_BTC(keyStoreInstance?.overallBalance_BTC);
    setOverallBalance_USD(keyStoreInstance?.overallBalance_USD);
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

    let res = mainState?.filter(
      (value) => value.type.toLowerCase() === Enum.withdraw
    );

    setTransactionHistory(res);
    setTempData(res);
  }
  function filterDepositType() {
    setSearchInput("");
    setFilterType(Enum.deposit);
    let res = mainState?.filter(
      (value) => value.type.toLowerCase() === Enum.deposit
    );

    setTransactionHistory(res);
    setTempData(res);
  }
  function filterPendingType() {
    setSearchInput("");
    setFilterType(Enum.pending);
    let res = mainState?.filter(
      (value) => value.type.toLowerCase() === Enum.pending
    );

    setTransactionHistory(res);
    setTempData(res);
  }

  //Descending Order Filter Type
  const handleDescendingType = () => {
    let res;
    if (mainState) {
      let check = [...mainState];
      res = check.sort((a, b) =>
        a.type.toLowerCase() < b.type.toLowerCase() ? 1 : -1
      );
    }

    setMainState(res);

    let res2;
    if (transactionHistory) {
      let check2 = [...transactionHistory];
      res2 = check2.sort((a, b) =>
        a.type.toLowerCase() < b.type.toLowerCase() ? 1 : -1
      );
    }
    setTransactionHistory(res2);

    let res3;
    if (tempData) {
      let check3 = [...tempData];
      res3 = check3.sort((a, b) =>
        a.type.toLowerCase() < b.type.toLowerCase() ? 1 : -1
      );
    }
    setTempData(res3);
  };

  //Ascending Order Filter Type
  const handleAscendingType = () => {
    let res;
    if (mainState) {
      let check = [...mainState];
      res = check.sort((a, b) =>
        a.type.toLowerCase() > b.type.toLowerCase() ? 1 : -1
      );
    }

    setMainState(res);

    let res2;
    if (transactionHistory) {
      let check2 = [...transactionHistory];
      res2 = check2.sort((a, b) =>
        a.type.toLowerCase() > b.type.toLowerCase() ? 1 : -1
      );
    }
    setTransactionHistory(res2);

    let res3;
    if (tempData) {
      let check3 = [...tempData];
      let res3 = check3.sort((a, b) =>
        a.type.toLowerCase() > b.type.toLowerCase() ? 1 : -1
      );
    }
    setTempData(res3);
  };

  //Descending Order Filter Coin
  const handleDescendingCoin = () => {
    let res;
    if (mainState) {
      let check = [...mainState];
      res = check.sort((a, b) =>
        a.asset.ticker.toLowerCase() < b.asset.ticker.toLowerCase() ? 1 : -1
      );
    }

    setMainState(res);

    let res2;
    if (transactionHistory) {
      let check2 = [...transactionHistory];
      res2 = check2.sort((a, b) =>
        a.asset.ticker.toLowerCase() < b.asset.ticker.toLowerCase() ? 1 : -1
      );
    }

    setTransactionHistory(res2);

    let res3;
    if (tempData) {
      let check3 = [...tempData];
      res3 = check3.sort((a, b) =>
        a.asset.ticker.toLowerCase() < b.asset.ticker.toLowerCase() ? 1 : -1
      );
    }
    setTempData(res3);
  };

  //Ascending Order Filter Coin
  const handleAscendingCoin = () => {
    let res;
    if (mainState) {
      let check = [...mainState];
      res = check.sort((a, b) =>
        a.asset.ticker.toLowerCase() > b.asset.ticker.toLowerCase() ? 1 : -1
      );
    }

    setMainState(res);

    let res2;
    if (transactionHistory) {
      let check2 = [...transactionHistory];
      res2 = check2.sort((a, b) =>
        a.asset.ticker.toLowerCase() > b.asset.ticker.toLowerCase() ? 1 : -1
      );
    }
    setTransactionHistory(res2);

    let res3;
    if (tempData) {
      let check3 = [...tempData];
      res3 = check3.sort((a, b) =>
        a.asset.ticker.toLowerCase() > b.asset.ticker.toLowerCase() ? 1 : -1
      );
    }
    setTempData(res3);
  };

  //Descending Order Filter Amount
  const handleDescendingAmount = () => {
    let res;
    if (mainState) {
      let check = [...mainState];
      res = check.sort((a, b) => b.transferAmount - a.transferAmount);
    }
    setMainState(res);

    let res2;
    if (transactionHistory) {
      let check2 = [...transactionHistory];
      res2 = check2.sort((a, b) => b.transferAmount - a.transferAmount);
    }
    setTransactionHistory(res2);

    let res3;
    if (tempData) {
      let check3 = [...tempData];
      res3 = check3.sort((a, b) => b.transferAmount - a.transferAmount);
    }
    setTempData(res3);
  };

  //Ascending Order Filter Amount
  const handleAscendingAmount = () => {
    let res;
    if (mainState) {
      let check = [...mainState];
      res = check.sort((a, b) => a.transferAmount - b.transferAmount);
    }
    setMainState(res);

    let res2;
    if (transactionHistory) {
      let check2 = [...transactionHistory];
      res2 = check2.sort((a, b) => a.transferAmount - b.transferAmount);
    }
    setTransactionHistory(res2);

    let res3;
    if (tempData) {
      let check3 = [...tempData];
      res3 = check3.sort((a, b) => a.transferAmount - b.transferAmount);
    }
    setTempData(res3);
  };

  //Descending Order Filter Address
  const handleDescendingAddress = () => {
    let res;
    if (mainState) {
      let check = [...mainState];
      res = check?.sort((a, b) =>
        a.to[0].to.toLowerCase() < b.to[0].to.toLowerCase() ? 1 : -1
      );
    }

    setMainState(res);

    let res2;
    if (transactionHistory) {
      let check2 = [...transactionHistory];
      res2 = check2?.sort((a, b) =>
        a.to[0].to.toLowerCase() < b.to[0].to.toLowerCase() ? 1 : -1
      );
    }
    setTransactionHistory(res2);

    let res3;
    if (tempData) {
      let check3 = [...tempData];
      res3 = check3?.sort((a, b) =>
        a.to[0].to.toLowerCase() < b.to[0].to.toLowerCase() ? 1 : -1
      );
    }
    setTempData(res3);
  };

  //Ascending Order Filter Type
  const handleAscendingAddress = () => {
    let res;
    if (mainState) {
      let check = [...mainState];
      res = check?.sort((a, b) =>
        a.to[0].to.toLowerCase() > b.to[0].to.toLowerCase() ? 1 : -1
      );
    }
    setMainState(res);

    let res2;
    if (transactionHistory) {
      let check2 = [...transactionHistory];
      res2 = check2?.sort((a, b) =>
        a.to[0].to.toLowerCase() > b.to[0].to.toLowerCase() ? 1 : -1
      );
    }
    setTransactionHistory(res2);

    let res3;
    if (tempData) {
      let check3 = [...tempData];
      res3 = check3?.sort((a, b) =>
        a.to[0].to.toLowerCase() > b.to[0].to.toLowerCase() ? 1 : -1
      );
    }
    setTempData(res3);
  };

  //Descending Order Filter TransactionID
  const handleDescendingTransactionID = () => {
    let res;
    if (mainState) {
      let check = [...mainState];
      res = check.sort((a, b) =>
        a.hash.toLowerCase() < b.hash.toLowerCase() ? 1 : -1
      );
    }
    setMainState(res);

    let res2;
    if (transactionHistory) {
      let check2 = [...transactionHistory];
      res2 = check2.sort((a, b) =>
        a.hash.toLowerCase() < b.hash.toLowerCase() ? 1 : -1
      );
    }
    setTransactionHistory(res2);

    let res3;
    if (tempData) {
      let check3 = [...tempData];
      let res3 = check3.sort((a, b) =>
        a.hash.toLowerCase() < b.hash.toLowerCase() ? 1 : -1
      );
    }
    setTempData(res3);
  };

  //Ascending Order Filter TransactionID
  const handleAscendingTransactionID = () => {
    let res;
    if (mainState) {
      let check = [...mainState];
      res = check.sort((a, b) =>
        a.hash.toLowerCase() > b.hash.toLowerCase() ? 1 : -1
      );
    }
    setMainState(res);
    let res2;
    if (transactionHistory) {
      let check2 = [...transactionHistory];
      res2 = check2.sort((a, b) =>
        a.hash.toLowerCase() > b.hash.toLowerCase() ? 1 : -1
      );
    }
    setTransactionHistory(res2);

    let res3;
    if (tempData) {
      let check3 = [...tempData];
      res3 = check3.sort((a, b) =>
        a.hash.toLowerCase() > b.hash.toLowerCase() ? 1 : -1
      );
    }
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
          style={{
            width: "25px",
            height: "25px",
          }}
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
    return <>{res?.assetFullName}</>;
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
                        {/* <img
                          style={{
                            width: "12px",
                            height: "12px",
                            marginTop: "4px",
                          }}
                          src={Images.frame2}
                        /> */}
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ marginTop: "4px" }}
                        >
                          <rect width="12" height="12" rx="4" fill="#9757D7" />
                        </svg>
                        <p className="w-marketsidetitle pl-2">Assets</p>
                      </div>
                      <div>
                        <p
                          style={{
                            fontWeight: "500",
                            fontSize: "16px",
                            margin: "0px",
                            fontFamily: "Poppins",
                            // color: "23262F",
                          }}
                          class="n-overviewAccountValues"
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
                        {/* <img
                          style={{
                            width: "12px",
                            height: "12px",
                            marginTop: "4px",
                          }}
                          src={Images.frame3}
                        /> */}
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ marginTop: "4px" }}
                        >
                          <rect width="12" height="12" rx="4" fill="#FFD166" />
                        </svg>
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
                            // color: "23262F",
                          }}
                          class="n-overviewAccountValues"
                        >
                          3.1219 BTC
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
              </div>
              <div
                // style={{ paddingLeft: "0px", paddingRight: "0px", paddingTop: "4px" }}
                className="col-lg-12 n-totalCard"
              >
                <div className="w-overview_portfoliobg">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      {/* <img
                        style={{
                          width: "12px",
                          height: "12px",
                          marginTop: "4px",
                        }}
                        src={Images.purple}
                      /> */}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginTop: "4px" }}
                      >
                        <rect width="12" height="12" rx="4" fill="#4BC9F0" />
                      </svg>
                      <p className="w-marketsidetitle pl-2">Total</p>
                    </div>
                    <div>
                      <p
                        className="my-sm-0 n-overviewAccountValues"
                        style={{
                          fontWeight: "500",
                          fontSize: "16px",
                          margin: "0px",
                          fontFamily: "Poppins",
                          // color: "23262F",
                        }}
                      >
                        10.376987555 BTC
                      </p>
                      <p
                        style={{
                          fontFamily: "Poppins",
                          color: "#777E90",
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
                  {overallBalance_USD ? (
                    <>
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
                      </p>{" "}
                      <h3
                        style={{
                          fontWeight: "600",
                          fontSize: "24px",
                          lineHeight: "32px",
                          paddingBottom: "19px",
                          fontFamily: "Poppins",
                          // color: "#23262F",
                        }}
                        class="n-overviewAccountHolding"
                      >
                        $ {numberWithCommas(financial(overallBalance_USD))}
                      </h3>
                      {/* <img
                        style={{
                          paddingBottom: "8px",
                          width: "220px",
                          paddingRight: "20px",
                        }}
                        src={Images.overview}
                      /> */}
                      {graphData?.length ? (
                        <div class="graph">
                          <LineChartSmartCard
                            color={
                              // grapH?.change_24h >= 0 ?
                              "#45B26B"
                              // : "#ff6838"
                            }
                            data={[
                              {
                                id: "Parent",
                                color: "hsl(6, 70%, 50%)",
                                data: graphData,
                              },
                            ]}
                          />
                        </div>
                      ) : (
                        <img
                          style={{
                            paddingBottom: "8px",
                            width: "220px",
                            paddingRight: "20px",
                          }}
                          src={Images.overview}
                        />
                      )}
                      {/* GRAPH */}
                    </>
                  ) : (
                    <>
                      <p
                        style={{
                          fontSize: "12px",
                          marginBottom: "5px",
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          color: "#777E90",
                          marginTop: "30px",
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
                          0%
                        </span>
                      </p>
                      <h3 class="n-overviewAccountHolding">$ 0.00</h3>
                    </>
                  )}
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
      <div className="w-sidebarcoleight" ref={myRef}>
        <div className="d-flex justify-content-between flex-sm-wrap flex-md-nowrap flex-sm-row flex-column">
          <ul className="list-unstyled d-block d-sm-flex flex-row align-items-center mb-0">
            <li
              className="d-inline-block d-sm-flex flex-row justify-content-center align-items-center"
              style={{ marginRight: "16px" }}
            >
              <button
                className={
                  filterType === Enum.allType
                    ? "alltype n-darkAllType"
                    : "alltype-nonActive n-darkNonActive"
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
                  filterType === Enum.withdraw
                    ? "alltype n-darkAllType"
                    : "alltype-nonActive n-darkNonActive"
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
                  filterType === Enum.deposit
                    ? "alltype n-darkAllType"
                    : "alltype-nonActive n-darkNonActive"
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
                  filterType === Enum.pending
                    ? "alltype n-darkAllType"
                    : "alltype-nonActive n-darkNonActive"
                }
                style={{ color: "#fff" }}
                onClick={filterPendingType}
              >
                Pending
              </button>
            </li>
          </ul>
          <div class="d-flex flex-column flex-sm-row align-content-start align-items-sm-center n-overviewResponsiveSearch">
            <div className="my-2 my-sm-0 n-overviewSearch">
              <div class=" d-flex form-group has-search mb-0">
                <input
                  type="text"
                  class="form-control n-tableSearch n-tableSeachDark"
                  placeholder="Search"
                  value={searchInput}
                  onChange={SearchFilter}
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
                    d="M12.4207 13.6002C11.2918 14.4778 9.87328 15.0003 8.33268 15.0003C4.65078 15.0003 1.66602 12.0156 1.66602 8.33366C1.66602 4.65176 4.65078 1.66699 8.33268 1.66699C12.0146 1.66699 14.9993 4.65176 14.9993 8.33366C14.9993 9.87425 14.4768 11.2928 13.5992 12.4217L18.0886 16.9111C18.414 17.2365 18.414 17.7641 18.0886 18.0896C17.7632 18.415 17.2355 18.415 16.9101 18.0896L12.4207 13.6002ZM13.3327 8.33366C13.3327 11.0951 11.0941 13.3337 8.33268 13.3337C5.57126 13.3337 3.33268 11.0951 3.33268 8.33366C3.33268 5.57224 5.57126 3.33366 8.33268 3.33366C11.0941 3.33366 13.3327 5.57224 13.3327 8.33366Z"
                    fill="#777E91"
                  />
                </svg>
              </div>
            </div>
            {/* <button
              class="seeallbutton btnHoverBlue"
              style={{ maxWidth: "130px", whiteSpace: "nowrap" }}
            >
              See all{" "}
              {/* <img src={Images.seeall} style={{ paddingLeft: "10px" }} /> */}
            {/* <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginLeft: "10px" }}
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.6673 3.99935H3.33398C2.96579 3.99935 2.66732 4.29783 2.66732 4.66602V12.666C2.66732 13.0342 2.96579 13.3327 3.33398 13.3327H12.6673C13.0355 13.3327 13.334 13.0342 13.334 12.666V4.66602C13.334 4.29783 13.0355 3.99935 12.6673 3.99935ZM3.33398 2.66602C2.22942 2.66602 1.33398 3.56145 1.33398 4.66602V12.666C1.33398 13.7706 2.22941 14.666 3.33398 14.666H12.6673C13.7719 14.666 14.6673 13.7706 14.6673 12.666V4.66602C14.6673 3.56145 13.7719 2.66602 12.6673 2.66602H3.33398Z"
                  fill="#777E91"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.66667 8C6.29848 8 6 8.29848 6 8.66667C6 9.03486 6.29848 9.33333 6.66667 9.33333H11.3333C11.7015 9.33333 12 9.03486 12 8.66667C12 8.29848 11.7015 8 11.3333 8H6.66667ZM4.66667 10.6667C4.29848 10.6667 4 10.9651 4 11.3333C4 11.7015 4.29848 12 4.66667 12H8.66667C9.03486 12 9.33333 11.7015 9.33333 11.3333C9.33333 10.9651 9.03486 10.6667 8.66667 10.6667H4.66667Z"
                  fill="#777E91"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.66667 1.33398C4.29848 1.33398 4 1.63246 4 2.00065V4.66732C4 5.03551 4.29848 5.33398 4.66667 5.33398C5.03486 5.33398 5.33333 5.03551 5.33333 4.66732V2.00065C5.33333 1.63246 5.03486 1.33398 4.66667 1.33398ZM11.3333 1.33398C10.9651 1.33398 10.6667 1.63246 10.6667 2.00065V4.66732C10.6667 5.03551 10.9651 5.33398 11.3333 5.33398C11.7015 5.33398 12 5.03551 12 4.66732V2.00065C12 1.63246 11.7015 1.33398 11.3333 1.33398Z"
                  fill="#777E91"
                />
              </svg> */}
            {/* </button> */}
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
                      cursor: "pointer",
                    }}
                    onClick={handleAscendingDescendingType}
                  >
                    {/* <img
                      class="pl-1"
                      src={Images.FilterUp}
                      // onClick={handleDescendingType}
                      style={{
                        marginBottom: "3px",
                        // cursor: "pointer",
                      }}
                    />
                    <img
                      class="pl-1"
                      // onClick={handleAscendingType}
                      src={Images.FilterDown}
                      // style={{ cursor: "pointer" }}
                    /> */}
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.66206 6.80539C5.92241 7.06574 6.34452 7.06574 6.60487 6.80539L8.4668 4.94346L10.3287 6.80539C10.5891 7.06574 11.0112 7.06574 11.2715 6.80539C11.5319 6.54504 11.5319 6.12293 11.2715 5.86258L8.9382 3.52925C8.67785 3.2689 8.25574 3.2689 7.99539 3.52925L5.66206 5.86258C5.40171 6.12293 5.40171 6.54504 5.66206 6.80539Z"
                        fill="#777E91"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.66206 9.19461C5.92241 8.93426 6.34452 8.93426 6.60487 9.19461L8.4668 11.0565L10.3287 9.19461C10.5891 8.93426 11.0112 8.93426 11.2715 9.19461C11.5319 9.45496 11.5319 9.87707 11.2715 10.1374L8.9382 12.4708C8.67785 12.7311 8.25574 12.7311 7.99539 12.4708L5.66206 10.1374C5.40171 9.87707 5.40171 9.45496 5.66206 9.19461Z"
                        fill="#777E91"
                      />
                    </svg>
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
                      cursor: "pointer",
                    }}
                    onClick={handleAscendingDescendingCoin}
                  >
                    {/* <img
                      class="pl-1"
                      src={Images.FilterUp}
                      // onClick={handleDescendingCoin}
                      style={{
                        marginBottom: "3px",
                        // cursor: "pointer",
                      }}
                    />
                    <img
                      class="pl-1"
                      // onClick={handleAscendingCoin}
                      src={Images.FilterDown}
                      // style={{ cursor: "pointer" }}
                    /> */}
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.66206 6.80539C5.92241 7.06574 6.34452 7.06574 6.60487 6.80539L8.4668 4.94346L10.3287 6.80539C10.5891 7.06574 11.0112 7.06574 11.2715 6.80539C11.5319 6.54504 11.5319 6.12293 11.2715 5.86258L8.9382 3.52925C8.67785 3.2689 8.25574 3.2689 7.99539 3.52925L5.66206 5.86258C5.40171 6.12293 5.40171 6.54504 5.66206 6.80539Z"
                        fill="#777E91"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.66206 9.19461C5.92241 8.93426 6.34452 8.93426 6.60487 9.19461L8.4668 11.0565L10.3287 9.19461C10.5891 8.93426 11.0112 8.93426 11.2715 9.19461C11.5319 9.45496 11.5319 9.87707 11.2715 10.1374L8.9382 12.4708C8.67785 12.7311 8.25574 12.7311 7.99539 12.4708L5.66206 10.1374C5.40171 9.87707 5.40171 9.45496 5.66206 9.19461Z"
                        fill="#777E91"
                      />
                    </svg>
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
                      cursor: "pointer",
                    }}
                    onClick={handleAscendingDescendingAmount}
                  >
                    {/* <img
                      class="pl-1"
                      src={Images.FilterUp}
                      // onClick={handleDescendingAmount}
                      style={{
                        marginBottom: "3px",
                        // cursor: "pointer",
                      }}
                    />
                    <img
                      class="pl-1"
                      // onClick={handleAscendingAmount}
                      src={Images.FilterDown}
                      // style={{ cursor: "pointer" }}
                    /> */}
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.66206 6.80539C5.92241 7.06574 6.34452 7.06574 6.60487 6.80539L8.4668 4.94346L10.3287 6.80539C10.5891 7.06574 11.0112 7.06574 11.2715 6.80539C11.5319 6.54504 11.5319 6.12293 11.2715 5.86258L8.9382 3.52925C8.67785 3.2689 8.25574 3.2689 7.99539 3.52925L5.66206 5.86258C5.40171 6.12293 5.40171 6.54504 5.66206 6.80539Z"
                        fill="#777E91"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.66206 9.19461C5.92241 8.93426 6.34452 8.93426 6.60487 9.19461L8.4668 11.0565L10.3287 9.19461C10.5891 8.93426 11.0112 8.93426 11.2715 9.19461C11.5319 9.45496 11.5319 9.87707 11.2715 10.1374L8.9382 12.4708C8.67785 12.7311 8.25574 12.7311 7.99539 12.4708L5.66206 10.1374C5.40171 9.87707 5.40171 9.45496 5.66206 9.19461Z"
                        fill="#777E91"
                      />
                    </svg>
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
                      cursor: "pointer",
                    }}
                    onClick={handleAscendingDescendingAddress}
                  >
                    {/* <img
                      class="pl-1"
                      src={Images.FilterUp}
                      // onClick={handleDescendingAddress}
                      style={{
                        marginBottom: "3px",
                        // cursor: "pointer",
                      }}
                    />
                    <img
                      class="pl-1"
                      // onClick={handleAscendingAddress}
                      src={Images.FilterDown}
                      // style={{ cursor: "pointer" }}
                    /> */}
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.66206 6.80539C5.92241 7.06574 6.34452 7.06574 6.60487 6.80539L8.4668 4.94346L10.3287 6.80539C10.5891 7.06574 11.0112 7.06574 11.2715 6.80539C11.5319 6.54504 11.5319 6.12293 11.2715 5.86258L8.9382 3.52925C8.67785 3.2689 8.25574 3.2689 7.99539 3.52925L5.66206 5.86258C5.40171 6.12293 5.40171 6.54504 5.66206 6.80539Z"
                        fill="#777E91"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.66206 9.19461C5.92241 8.93426 6.34452 8.93426 6.60487 9.19461L8.4668 11.0565L10.3287 9.19461C10.5891 8.93426 11.0112 8.93426 11.2715 9.19461C11.5319 9.45496 11.5319 9.87707 11.2715 10.1374L8.9382 12.4708C8.67785 12.7311 8.25574 12.7311 7.99539 12.4708L5.66206 10.1374C5.40171 9.87707 5.40171 9.45496 5.66206 9.19461Z"
                        fill="#777E91"
                      />
                    </svg>
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
                      cursor: "pointer",
                    }}
                    onClick={handleAscendingDescendingTransactionID}
                  >
                    {/* <img
                      class="pl-1"
                      src={Images.FilterUp}
                      // onClick={handleDescendingTransactionID}
                      style={{
                        marginBottom: "3px",
                        // cursor: "pointer",
                      }}
                    />
                    <img
                      class="pl-1"
                      // onClick={handleAscendingTransactionID}
                      src={Images.FilterDown}
                      // style={{ cursor: "pointer" }}
                    /> */}
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.66206 6.80539C5.92241 7.06574 6.34452 7.06574 6.60487 6.80539L8.4668 4.94346L10.3287 6.80539C10.5891 7.06574 11.0112 7.06574 11.2715 6.80539C11.5319 6.54504 11.5319 6.12293 11.2715 5.86258L8.9382 3.52925C8.67785 3.2689 8.25574 3.2689 7.99539 3.52925L5.66206 5.86258C5.40171 6.12293 5.40171 6.54504 5.66206 6.80539Z"
                        fill="#777E91"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.66206 9.19461C5.92241 8.93426 6.34452 8.93426 6.60487 9.19461L8.4668 11.0565L10.3287 9.19461C10.5891 8.93426 11.0112 8.93426 11.2715 9.19461C11.5319 9.45496 11.5319 9.87707 11.2715 10.1374L8.9382 12.4708C8.67785 12.7311 8.25574 12.7311 7.99539 12.4708L5.66206 10.1374C5.40171 9.87707 5.40171 9.45496 5.66206 9.19461Z"
                        fill="#777E91"
                      />
                    </svg>
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
                  {transactionHistory
                    ?.slice(
                      page * cardsPerPage - cardsPerPage,
                      cardsPerPage * page
                    )
                    ?.map((t, key) => {
                      return (
                        <tr className="maintdclasshover n-overviewTableHover">
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
                                  whiteSpace: "nowrap",
                                }}
                                class="n-tabelDark"
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
                            class="n-tabelDark"
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
                                class="n-tabelDark"
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
                            class="n-tabelDark"
                          >
                            {t.hash}
                          </td>
                          <td
                            style={{
                              fontFamily: "Poppins",
                              color: "#777e90",
                              whiteSpace: "nowrap",
                            }}
                            class="n-tabelDark"
                          >
                            {t.date.toString().substring(0, 24)}
                          </td>
                        </tr>
                      );
                    })}
                </>
              ) : (
                <tr class="n-tableHover">
                  <td colspan="6" class="text-center text-muted" style={{ padding: "148px 0px" }}>
                    No Transaction Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="paging-center">
            {transactionHistory?.length ? (
              <Pagination count={count} page={page} onChange={handleChange} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
