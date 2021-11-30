import React, { useState, useEffect, useRef } from "react";
import withMainLayout from "../HOC/withMainLayout";
import { Link, useHistory } from "react-router-dom";
import Images from "../Helper/AllImages";
import browserRoute from "../../Routes/browserRoutes";
import Loader from "../Loader/Loader";
import { MidgardPool_Action } from "../../Redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { mainRoute, SERVER_URL_MAIN } from "../../Routes/serverRoutes";
import Pagination from "@mui/material/Pagination";
import { handleMainModal } from "../../Services/mainServices";
import { Bar, Pie, Line } from "react-chartjs-2";
import LineChartSmartCard from "../GraphChart";
import LogoShapeImage from "./LogoShape";
import axios from "axios";

const Market = () => {
  const [poolData, setPoolData] = useState([]);
  const [tempPool, setTempPool] = useState([]);
  const [Enum, set_Enum] = useState({
    allType: "allType",
    native: "native",
    erc20: "erc20",
    bep2: "bep2",
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const [filterType, setFilterType] = useState(Enum.allType);
  const [searchInput, setSearchInput] = useState("");
  const mainStateRedux = useSelector((state) => state.main.midgardPool);

  const loading = useSelector((state) => state.main.loading);
  const loggedIn = useSelector((state) => state.main.isLoggedin);
  const [arrSortSrNo, setArrSortSrNo] = useState(false);
  const [mainState, setMainState] = useState([]);

  const [cardsPerPage, setCardsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [globalMarketCap, setGlobalMarketCap] = useState(0);

  const myRef = useRef(null);

  const countData = poolData?.length;
  useEffect(() => {
    if (countData % cardsPerPage === 0) {
      setCount(Math.floor(countData / cardsPerPage));
    } else {
      setCount(Math.floor(countData / cardsPerPage) + 1);
    }
  }, [countData, cardsPerPage]);

  const handleChange = (event, value) => {
    // window.scrollTo(0, 0);
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    setPage(value);
  };

  function handleRoute(data) {
    if (loggedIn) {
      history.push(`${browserRoute.BUYMARKET}/${data._id}/1`);
    } else {
      dispatch(handleMainModal(true));
    }
  }

  useEffect(() => {
    setPoolData(mainStateRedux);
    setTempPool(mainStateRedux);
    setMainState(mainStateRedux);
  }, [mainStateRedux]);

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(async () => {
    try {
      let market = await axios.get(`${SERVER_URL_MAIN}/globalmarketcap`);
      console.log("market=============", market);
      setGlobalMarketCap(market.data.globalMarketCap);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // useEffect(() => {
  //   filterAllType();
  // }, []);

  function filterAllType() {
    setPage(1);
    setSearchInput("");
    setFilterType(Enum.allType);
    setPoolData(mainState);
    setTempPool(mainState);
  }
  function filterNative() {
    setPage(1);
    setSearchInput("");
    let res = mainState?.filter(
      (data) =>
        data?.blockchain === "LTC" ||
        data?.blockchain === "BTC" ||
        data?.blockchain === "BCH" ||
        (data?.blockchain === "ETH" && data?.asset === "ETH") ||
        (data?.blockchain === "BNB" && data?.asset === "BNB")
    );
    setFilterType(Enum.native);
    setPoolData(res);
    setTempPool(res);
  }
  function filterERC20() {
    setPage(1);
    setSearchInput("");
    let res = mainState?.filter((data) => data?.blockchain === "ETH");
    console.log("resERC=====>>", res);
    setFilterType(Enum.erc20);
    setPoolData(res);
    setTempPool(res);
  }
  function filterBEP2() {
    setPage(1);
    setSearchInput("");
    let res = mainState?.filter((data) => data.blockchain === "BNB");
    console.log("res=====>>", res);
    setFilterType(Enum.bep2);
    setPoolData(res);
    setTempPool(res);
  }
  function InputSearch(e) {
    setPage(1);
    setSearchInput(e.target.value);

    if (!e.target.value) {
      setPoolData(tempPool);

      // setFilterType(Enum.allType);
    } else {
      let result2 = tempPool.filter(
        (value) =>
          value?.asset?.toLowerCase()?.includes(e.target.value.toLowerCase()) ||
          (value?.assetFullName
            ?.toLowerCase()
            ?.includes(e.target.value.toLowerCase()) &&
            value)
      );
      setPoolData(result2);
    }
  }

  //Ascending Order Filter Name
  const [ascendingDescendingName, setAscendingDescendingName] = useState(false);
  const [ascendingDescendingPrice, setAscendingDescendingPrice] =
    useState(false);

  const handleAscendingDescendingName = () => {
    setAscendingDescendingName(!ascendingDescendingName);
    if (ascendingDescendingName) {
      handleAscendingName();
    } else {
      handleDescendingName();
    }
  };

  // useEffect(() => {
  //   if (ascendingDescendingName) {
  //     handleAscendingName();
  //   } else {
  //     handleDescendingName();
  //   }
  // }, [ascendingDescendingName]);

  const handleAscendingDescendingPrice = () => {
    setAscendingDescendingPrice(!ascendingDescendingPrice);
    if (ascendingDescendingPrice) {
      handleAscendingPrice();
    } else {
      handleDescendingPrice();
    }
  };
  // useEffect(() => {
  //   if (ascendingDescendingPrice) {
  //     handleAscendingPrice();
  //   } else {
  //     handleDescendingPrice();
  //   }
  // }, [ascendingDescendingPrice]);

  const handleAscendingName = () => {
    let check = [...mainState];
    let res = check?.sort((a, b) =>
      a.assetFullName?.toLowerCase() > b.assetFullName?.toLowerCase() ? 1 : -1
    );
    setMainState(res);
    let check2 = [...poolData];
    let res2 = check2?.sort((a, b) =>
      a.assetFullName?.toLowerCase() > b.assetFullName?.toLowerCase() ? 1 : -1
    );
    setPoolData(res2);
    let check3 = [...tempPool];
    let res3 = check3?.sort((a, b) =>
      a.assetFullName?.toLowerCase() > b.assetFullName?.toLowerCase() ? 1 : -1
    );
    setTempPool(res3);
  };

  const handleReverse = () => {
    let check = [...mainState];
    let res = check?.reverse();
    setMainState(res);
    let check2 = [...poolData];
    let res2 = check2?.reverse();
    setPoolData(res2);
    let check3 = [...tempPool];
    let res3 = check3?.reverse();
    setTempPool(res3);
  };

  //Descending Order Filter Name
  const handleDescendingName = () => {
    let check = [...mainState];
    let res = check?.sort((a, b) =>
      a.assetFullName?.toLowerCase() < b.assetFullName?.toLowerCase() ? 1 : -1
    );
    setMainState(res);
    let check2 = [...poolData];
    let res2 = check2?.sort((a, b) =>
      a.assetFullName?.toLowerCase() < b.assetFullName?.toLowerCase() ? 1 : -1
    );
    setPoolData(res2);
    let check3 = [...tempPool];
    let res3 = check3?.sort((a, b) =>
      a.assetFullName?.toLowerCase() < b.assetFullName?.toLowerCase() ? 1 : -1
    );
    setTempPool(res3);
  };

  //Ascending Order Filter Price
  const handleAscendingPrice = () => {
    let check = [...mainState];
    let res = check?.sort((a, b) => a.assetPriceUSD - b.assetPriceUSD);
    setMainState(res);
    let check2 = [...poolData];
    let res2 = check2?.sort((a, b) => a.assetPriceUSD - b.assetPriceUSD);
    setPoolData(res2);
    let check3 = [...tempPool];
    let res3 = check3?.sort((a, b) => a.assetPriceUSD - b.assetPriceUSD);
    setTempPool(res3);
  };

  //Descending Order Filter Price
  const handleDescendingPrice = () => {
    let check = [...mainState];
    let res = check?.sort((a, b) => b.assetPriceUSD - a.assetPriceUSD);
    setMainState(res);
    let check2 = [...poolData];
    let res2 = check2?.sort((a, b) => b.assetPriceUSD - a.assetPriceUSD);
    setPoolData(res2);
    let check3 = [...tempPool];
    let res3 = check3?.sort((a, b) => b.assetPriceUSD - a.assetPriceUSD);
    setTempPool(res3);
  };

  const toMil = (v) => {
    console.log(v);
    return Math.abs(Number(v)) >= 1.0e9
      ? (Math.abs(Number(v)) / 1.0e9).toFixed(2) + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(v)) >= 1.0e6
      ? (Math.abs(Number(v)) / 1.0e6).toFixed(2) + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(v)) >= 1.0e3
      ? (Math.abs(Number(v)) / 1.0e3).toFixed(2) + "K"
      : Math.abs(Number(v));
  };

  return (
    <div>
      <section className="u-market876662">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 n-marketHero">
              <div class="marketbanner">
                <h2 class="marketbannerhed">
                  Today's <br />
                  Cryptocurrency
                  <br /> Prices
                </h2>
                <p className="umarketp3456">
                  The global crypto market cap is{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Poppins",
                      fontSize: "24px",
                    }}
                  >
                    {/* $1.86T */}${toMil(globalMarketCap)}
                  </span>
                </p>
              </div>
            </div>
            <div class="col-lg-6 n-marketHeroImage">
              <img className="marketmainimage" src={Images.market} />
            </div>
          </div>
          <div class="row bitcoinclasss">
            {loading ? (
              <>
                <div class="mainhover">
                  <div class="">
                    <div
                      style={{ justifyContent: "center", marginLeft: "40%" }}
                    >
                      <Loader height="70%" width="70%" />
                    </div>
                  </div>
                </div>{" "}
                <div class="mainhover">
                  <div class="">
                    <div style={{ marginLeft: "40%" }}>
                      <Loader height="70%" width="70%" />
                    </div>
                  </div>
                </div>{" "}
                <div class="mainhover">
                  <div class="">
                    <div
                      style={{ justifyContent: "center", marginLeft: "40%" }}
                    >
                      <Loader height="70%" width="70%" />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {" "}
                {mainStateRedux ? (
                  <>
                    {mainStateRedux?.slice(0, 3)?.map((d, key) => {
                      return (
                        <>
                          <div class="col-lg-4 umarketsect22222">
                            <div class="d-flex markethover">
                              <div class="nn-marketGraph">
                                <img
                                  style={{ width: "32px", height: "32px" }}
                                  src={d?.logo}
                                />
                                <div
                                  style={{
                                    paddingLeft: "15px",
                                    fontFamily: "Poppins",
                                    color: "#23262F",
                                    fontSize: "12px",
                                    marginBottom: "0px",
                                  }}
                                >
                                  <p
                                    class="marketparagraph d-flex"
                                    // style={{ width: "122px" }}
                                  >
                                    {d?.asset}/USDT{" "}
                                    {d?.change_24h >= 0 ? (
                                      <span className="spanclassmarkets n-darkSpanClassMarkets">
                                        +{financial(d?.change_24h)}%
                                      </span>
                                    ) : (
                                      <span className="spanclassmarket n-darkSpanClassMarket">
                                        {financial(d?.change_24h)}%
                                      </span>
                                    )}{" "}
                                  </p>
                                  <p
                                    className="w-text-23262f"
                                    style={{
                                      marginBottom: "0",
                                      fontSize: "24px",
                                      fontWeight: "600",
                                      fontFamily: "Poppins",
                                    }}
                                  >
                                    {" "}
                                    {numberWithCommas(
                                      financial(d?.assetPriceUSD)
                                    )}{" "}
                                  </p>
                                  <p
                                    class="n-marketAssetPriceValue"
                                    style={{
                                      fontFamily: "Poppins",
                                      // color: "#23262F",
                                      fontSize: "12px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    {numberWithCommas(
                                      financial(d?.assetPriceUSD)
                                    )}
                                  </p>
                                </div>
                              </div>
                              <div
                                // style={{ paddingLeft: "10px" }}
                                class="n-marketLineGraph"
                              >
                                <LineChartSmartCard
                                  color={
                                    d?.change_24h >= 0 ? "#45B26B" : "#ff6838"
                                  }
                                  data={[
                                    {
                                      id: "Parent",

                                      data: d?.graphData?.map((data) => {
                                        return {
                                          x: new Date(
                                            Number(data.timeStamp) * 1000
                                          )
                                            .toString()
                                            .substring(4, 16),
                                          y: data.assetPriceUSD,
                                        };
                                      }),
                                    },
                                  ]}
                                />
                                {/* {d.change_24h > 0 ? (
                                  <>
                                    <img src={Images.crt1} />
                                  </>
                                ) : (
                                  <>
                                    <img
                                      class="n-marketGraphImage"
                                      src={Images.chartmarket}
                                    />
                                  </>
                                )} */}
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : null}
              </>
            )}
          </div>
        </div>
      </section>
      <section style={{ backgroundColor: "#FCFCFD" }}>
        <div class="container pb-5 px-0">
          <div>
            <div
              // className="row"
              style={{
                backgroundColor: "#FCFCFD",
                boxShadow: "0px 30px 25px rgba(15,15,15,0.1)",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                paddingTop: "32px",
                paddingBottom: "32px",
              }}
            >
              <div className="" style={{ padding: "0 32px" }}>
                <div class="d-flex flex-row justify-content-between align-items-center flex-wrap">
                  <ul class="list-unstyled d-flex flex-row align-items-center justify-content-between mb-0">
                    <li
                      className="d-flex flex-row justify-content-center align-items-center"
                      style={{ marginRight: "16px" }}
                    >
                      <button
                        className={
                          filterType === Enum.allType
                            ? "alltype"
                            : "alltype-nonActive"
                        }
                        onClick={filterAllType}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        All type
                      </button>
                    </li>

                    <li
                      className="d-flex flex-row justify-content-center align-items-center"
                      style={{ marginRight: "16px" }}
                    >
                      <button
                        className={
                          filterType === Enum.native
                            ? "alltype"
                            : "alltype-nonActive"
                        }
                        style={{ color: "#fff", fontFamily: "DM Sans" }}
                        onClick={filterNative}
                      >
                        Native
                      </button>
                    </li>

                    <li
                      className="d-flex flex-row justify-content-center align-items-center"
                      style={{ marginRight: "16px" }}
                    >
                      <button
                        className={
                          filterType === Enum.erc20
                            ? "alltype"
                            : "alltype-nonActive"
                        }
                        style={{
                          color: "#fff",
                          fontFamily: "DM Sans",
                          whiteSpace: "nowrap",
                        }}
                        onClick={filterERC20}
                      >
                        ERC-20
                      </button>
                    </li>

                    <li
                      className="d-flex flex-row justify-content-center align-items-center"
                      style={{ marginRight: "16px" }}
                    >
                      <button
                        className={
                          filterType === Enum.bep2
                            ? "alltype"
                            : "alltype-nonActive"
                        }
                        style={{ color: "#fff", fontFamily: "DM Sans" }}
                        onClick={filterBEP2}
                      >
                        BEP2
                      </button>
                    </li>
                  </ul>
                  <div class=" d-flex form-group has-search mb-0 n-inputSearch">
                    <input
                      // style={{
                      //   borderRadius: "30px",
                      //   width: "280px",
                      //   height: "35px",
                      //   fontFamily: "DM Sans",
                      //   backgroundColor: "#FCFCFD",
                      // }}
                      type="text"
                      class="form-control n-tableSearch n-responsiveSearch n-tableSearch2"
                      placeholder="Search"
                      value={searchInput}
                      onChange={InputSearch}
                    />
                    {/* <img
                      style={{
                        width: "20px",
                        height: "20px",
                        marginLeft: "-35px",
                        marginTop: "10px",
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
                        width: "20px",
                        height: "20px",
                        marginLeft: "-35px",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.4207 13.6002C11.2918 14.4778 9.87327 15.0003 8.33268 15.0003C4.65078 15.0003 1.66602 12.0156 1.66602 8.33366C1.66602 4.65176 4.65078 1.66699 8.33268 1.66699C12.0146 1.66699 14.9993 4.65176 14.9993 8.33366C14.9993 9.87425 14.4768 11.2928 13.5992 12.4217L18.0886 16.9111C18.414 17.2365 18.414 17.7641 18.0886 18.0896C17.7632 18.415 17.2355 18.415 16.9101 18.0896L12.4207 13.6002ZM13.3327 8.33366C13.3327 11.0951 11.0941 13.3337 8.33268 13.3337C5.57126 13.3337 3.33268 11.0951 3.33268 8.33366C3.33268 5.57224 5.57126 3.33366 8.33268 3.33366C11.0941 3.33366 13.3327 5.57224 13.3327 8.33366Z"
                        fill="#777E91"
                      />
                    </svg>
                    {/* <span
                    style={{
                      paddingTop: "10px",
                      marginLeft: "-20px",
                      fontSize: "15px",
                      color: "#777E90",
                    }}
                    <img src={Images.searchicon}/>
                  </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ backgroundColor: "#FCFCFD" }}>
        <div class="container n-marketSectionTable" ref={myRef}>
          {loading ? (
            <div
              style={{
                justifyContent: "center",
                marginLeft: "30%",
              }}
            >
              <Loader height="40%" width="40%" />
            </div>
          ) : (
            <>
              {" "}
              {poolData ? (
                <div class="table-responsive w-comon-table-style">
                  <table class="table">
                    <thead>
                      <tr style={{ borderBottom: "1.5px solid #E6E8EC" }}>
                        <th scope="col">
                          #
                          <div
                            style={{
                              display: "inline-grid",

                              marginLeft: "3px",
                              position: "absolute",
                              bottom: "31px",
                              cursor: "pointer",
                            }}
                            // onClick={() => setArrSortSrNo(!arrSortSrNo)}
                            onClick={handleReverse}
                          >
                            {/* <img
                              class="pl-1"
                              src={Images.FilterUp}
                              // onClick={() => {
                              //   setArrSortSrNo(true);
                              // }}
                              style={{
                                marginBottom: "3px",
                                cursor: "pointer",
                                position: "relative",
                                top: "-5px",
                              }}
                            />
                            <img
                              class="pl-1"
                              src={Images.FilterDown}
                              // onClick={() => {
                              //   setArrSortSrNo(false);
                              // }}
                              style={{
                                cursor: "pointer",
                                position: "relative",
                                top: "-5px",
                              }}
                            /> */}
                            <svg
                              width="17"
                              height="16"
                              viewBox="0 0 17 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{
                                marginBottom: "3px",
                                cursor: "pointer",
                                position: "relative",
                                // top: "-2px",
                              }}
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M5.36128 6.80441C5.62163 7.06476 6.04374 7.06476 6.30409 6.80441L8.16602 4.94248L10.0279 6.80441C10.2883 7.06476 10.7104 7.06476 10.9708 6.80441C11.2311 6.54406 11.2311 6.12195 10.9708 5.8616L8.63742 3.52827C8.37707 3.26792 7.95496 3.26792 7.69461 3.52827L5.36128 5.8616C5.10093 6.12195 5.10093 6.54406 5.36128 6.80441Z"
                                fill="#777E91"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M5.36128 9.19461C5.62163 8.93426 6.04374 8.93426 6.30409 9.19461L8.16602 11.0565L10.0279 9.19461C10.2883 8.93426 10.7104 8.93426 10.9708 9.19461C11.2311 9.45496 11.2311 9.87707 10.9708 10.1374L8.63742 12.4708C8.37707 12.7311 7.95496 12.7311 7.69461 12.4708L5.36128 10.1374C5.10093 9.87707 5.10093 9.45496 5.36128 9.19461Z"
                                fill="#777E91"
                              />
                            </svg>
                          </div>
                        </th>
                        <th scope="col">
                          Name{" "}
                          <div
                            style={{
                              display: "inline-grid",
                              // paddingBottom: "4px",
                              marginLeft: "3px",
                              position: "absolute",
                              bottom: "31px",
                              cursor: "pointer",
                            }}
                            onClick={handleAscendingDescendingName}
                          >
                            {/* <img
                              class="pl-1"
                              src={Images.FilterUp}
                              // onClick={handleDescendingName}
                              style={{
                                marginBottom: "3px",
                                cursor: "pointer",
                                position: "relative",
                                top: "-5px",
                              }}
                            />
                            <img
                              class="pl-1"
                              src={Images.FilterDown}
                              // onClick={handleAscendingName}
                              style={{
                                cursor: "pointer",
                                position: "relative",
                                top: "-5px",
                              }}
                            /> */}
                            <svg
                              width="17"
                              height="16"
                              viewBox="0 0 17 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{
                                marginBottom: "3px",
                                cursor: "pointer",
                                position: "relative",
                                // top: "-2px",
                              }}
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M5.36128 6.80441C5.62163 7.06476 6.04374 7.06476 6.30409 6.80441L8.16602 4.94248L10.0279 6.80441C10.2883 7.06476 10.7104 7.06476 10.9708 6.80441C11.2311 6.54406 11.2311 6.12195 10.9708 5.8616L8.63742 3.52827C8.37707 3.26792 7.95496 3.26792 7.69461 3.52827L5.36128 5.8616C5.10093 6.12195 5.10093 6.54406 5.36128 6.80441Z"
                                fill="#777E91"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M5.36128 9.19461C5.62163 8.93426 6.04374 8.93426 6.30409 9.19461L8.16602 11.0565L10.0279 9.19461C10.2883 8.93426 10.7104 8.93426 10.9708 9.19461C11.2311 9.45496 11.2311 9.87707 10.9708 10.1374L8.63742 12.4708C8.37707 12.7311 7.95496 12.7311 7.69461 12.4708L5.36128 10.1374C5.10093 9.87707 5.10093 9.45496 5.36128 9.19461Z"
                                fill="#777E91"
                              />
                            </svg>
                          </div>
                        </th>
                        <th className="text-right" scope="col">
                          Price{" "}
                          <div
                            style={{
                              display: "inline-grid",

                              marginLeft: "3px",

                              cursor: "pointer",
                            }}
                            onClick={handleAscendingDescendingPrice}
                          >
                            <img
                              class="pl-1"
                              src={Images.FilterUp}
                              // onClick={handleDescendingPrice}
                              style={{
                                marginBottom: "3px",
                                position: "relative",
                                top: "-5px",
                                cursor: "pointer",
                              }}
                            />
                            <img
                              class="pl-1"
                              src={Images.FilterDown}
                              // onClick={handleAscendingPrice}
                              style={{
                                cursor: "pointer",
                                position: "relative",
                                top: "-5px",
                              }}
                            />
                          </div>
                        </th>
                        <th className="text-right" scope="col">
                          24h %
                        </th>
                        <th className="text-right" scope="col">
                          7d %
                        </th>
                        <th
                          className="text-right"
                          scope="col"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Marketcap
                          {/* <img class="pl-1" src={Images.dolaar} /> */}
                          <svg
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="pl-1"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M10.429 16.667C14.1109 16.667 17.0957 13.6822 17.0957 10.0003C17.0957 6.31843 14.1109 3.33366 10.429 3.33366C6.74714 3.33366 3.76237 6.31843 3.76237 10.0003C3.76237 13.6822 6.74714 16.667 10.429 16.667ZM10.429 18.3337C15.0314 18.3337 18.7624 14.6027 18.7624 10.0003C18.7624 5.39795 15.0314 1.66699 10.429 1.66699C5.82666 1.66699 2.0957 5.39795 2.0957 10.0003C2.0957 14.6027 5.82666 18.3337 10.429 18.3337Z"
                              fill="#777E91"
                            />
                            <path
                              d="M9.5957 5.83333C9.5957 5.3731 9.9688 5 10.429 5C10.8893 5 11.2624 5.3731 11.2624 5.83333C12.6431 5.83333 13.7624 6.95262 13.7624 8.33333C13.7624 8.79357 13.3893 9.16667 12.929 9.16667C12.4688 9.16667 12.0957 8.79357 12.0957 8.33333C12.0957 7.8731 11.7226 7.5 11.2624 7.5H9.38188C9.03974 7.5 8.76237 7.77737 8.76237 8.11951C8.76237 8.38617 8.933 8.62291 9.18598 8.70724L12.1991 9.71162C13.1327 10.0228 13.7624 10.8964 13.7624 11.8805C13.7624 13.1431 12.7388 14.1667 11.4762 14.1667H11.2624C11.2624 14.6269 10.8893 15 10.429 15C9.9688 15 9.5957 14.6269 9.5957 14.1667C8.21499 14.1667 7.0957 13.0474 7.0957 11.6667C7.0957 11.2064 7.4688 10.8333 7.92904 10.8333C8.38927 10.8333 8.76237 11.2064 8.76237 11.6667C8.76237 12.1269 9.13547 12.5 9.5957 12.5H11.4762C11.8183 12.5 12.0957 12.2226 12.0957 11.8805C12.0957 11.6138 11.9251 11.3771 11.6721 11.2928L8.65893 10.2884C7.72539 9.97719 7.0957 9.10356 7.0957 8.11951C7.0957 6.85689 8.11926 5.83333 9.38188 5.83333H9.5957Z"
                              fill="#777E91"
                            />
                          </svg>
                        </th>
                        <th
                          className="text-right"
                          scope="col"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Volume(24h)
                          {/* <img class="pl-1" src={Images.hourr} /> */}
                          <svg
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="pl-1"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M2.38021 2.5C2.84045 2.5 3.21354 2.8731 3.21354 3.33333V15C3.21354 15.4602 3.58664 15.8333 4.04687 15.8333H19.0469C19.5071 15.8333 19.8802 16.2064 19.8802 16.6667C19.8802 17.1269 19.5071 17.5 19.0469 17.5H4.04687C2.66616 17.5 1.54688 16.3807 1.54688 15V3.33333C1.54688 2.8731 1.91997 2.5 2.38021 2.5Z"
                              fill="#777E91"
                            />
                            <path
                              d="M15.7142 4.16699C15.254 4.16699 14.8809 4.54009 14.8809 5.00033V13.3337C14.8809 13.7939 15.254 14.167 15.7142 14.167C16.1744 14.167 16.5475 13.7939 16.5475 13.3337V5.00033C16.5475 4.54009 16.1744 4.16699 15.7142 4.16699Z"
                              fill="#777E91"
                            />
                            <path
                              d="M9.04753 5.83366C8.58729 5.83366 8.21419 6.20675 8.21419 6.66699V13.3337C8.21419 13.7939 8.58729 14.167 9.04753 14.167C9.50776 14.167 9.88086 13.7939 9.88086 13.3337V6.66699C9.88086 6.20675 9.50776 5.83366 9.04753 5.83366Z"
                              fill="#777E91"
                            />
                            <path
                              d="M5.71419 10.8337C5.25396 10.8337 4.88086 11.2068 4.88086 11.667V13.3337C4.88086 13.7939 5.25396 14.167 5.71419 14.167C6.17443 14.167 6.54753 13.7939 6.54753 13.3337V11.667C6.54753 11.2068 6.17443 10.8337 5.71419 10.8337Z"
                              fill="#777E91"
                            />
                            <path
                              d="M11.5475 8.33366C11.5475 7.87342 11.9206 7.50033 12.3809 7.50033C12.8411 7.50033 13.2142 7.87342 13.2142 8.33366V13.3337C13.2142 13.7939 12.8411 14.167 12.3809 14.167C11.9206 14.167 11.5475 13.7939 11.5475 13.3337V8.33366Z"
                              fill="#777E91"
                            />
                          </svg>
                        </th>
                        <th className="text-right" scope="col">
                          Chart
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {arrSortSrNo &&
                        poolData
                          // .slice(0, 10)
                          ?.slice(
                            page * cardsPerPage - cardsPerPage,
                            cardsPerPage * page
                          )
                          ?.reverse()
                          ?.map((d, key) => {
                            return (
                              <tr style={{ borderBottom: "1px solid #E6E8EC" }}>
                                <td
                                  style={{
                                    color: "#777E90",
                                    border: "none",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                  }}
                                  scope="row"
                                >
                                  {
                                    // .slice(0, 10)
                                    poolData.slice(
                                      page * cardsPerPage - cardsPerPage,
                                      cardsPerPage * page
                                    ).length - key
                                  }
                                </td>
                                <td>
                                  <div class="d-flex flex-row align-items-center">
                                    <img
                                      style={{ width: "32px" }}
                                      src={d?.logo}
                                    />
                                    <div
                                      style={{
                                        fontWeight: "500",
                                        fontFamily: "Poppins",
                                        marginLeft: "10px",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {d?.assetFullName}
                                    </div>
                                    <div class="d-flex align-items-center">
                                      <div
                                        class="pl-2 text-muted"
                                        style={{ fontSize: "14px" }}
                                      >
                                        {d?.asset}
                                      </div>
                                    </div>
                                  </div>
                                </td>

                                <td className="text-right">
                                  $
                                  {numberWithCommas(
                                    financial(d?.assetPriceUSD)
                                  )}
                                </td>
                                <td className="text-right">
                                  <div class="d-flex flex-column">
                                    <div>
                                      {d?.change_24h >= 0 ? (
                                        <span className="percentage">
                                          +{financial(d?.change_24h)}%
                                        </span>
                                      ) : (
                                        <span className="percentagetwo">
                                          {financial(d?.change_24h)}%
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="text-right">
                                  <div class="d-flex flex-column">
                                    <div>
                                      {d?.change_7d >= 0 ? (
                                        <span className="percentage">
                                          +{financial(d?.change_7d)}%
                                        </span>
                                      ) : (
                                        <span className="percentagetwo">
                                          {financial(d?.change_7d)}%
                                        </span>
                                      )}{" "}
                                    </div>
                                  </div>
                                </td>
                                <td className="text-right">
                                  ${numberWithCommas(financial(d?.marketCap))}
                                </td>
                                <td className="text-right">${d?.volume24h}</td>
                                <td
                                  className="text-right"
                                  style={{ Height: "42px" }}
                                >
                                  <div>
                                    <span className="buyTokenGraph">
                                      <LineChartSmartCard
                                        color={
                                          d?.change_24h >= 0
                                            ? "#45B26B"
                                            : "#ff6838"
                                        }
                                        data={[
                                          {
                                            id: "Parent",

                                            data: d?.graphData?.map((data) => {
                                              return {
                                                x: new Date(
                                                  Number(data.timeStamp) * 1000
                                                )
                                                  .toString()
                                                  .substring(4, 16),
                                                y: data.assetPriceUSD,
                                              };
                                            }),
                                          },
                                        ]}
                                      />
                                    </span>
                                    {/* <span className="buyTokenbtn">
                                      <Link
                                        to={`${browserRoute.BUYMARKET}/${d?.asset}`}
                                      >
                                        <button
                                          style={{ fontFamily: "DM Sans" }}
                                          className=" btn btn-primary buybutttonmarket"
                                        >
                                          Buy
                                        </button>
                                      </Link>
                                    </span> */}
                                  </div>
                                </td>
                                <td
                                  className="text-right"
                                  style={{ Height: "42px" }}
                                >
                                  <Link
                                    to="#"
                                    style={{ fontFamily: "DM Sans" }}
                                    className=" btn btn-primary buybutttonmarket"
                                    onClick={() => handleRoute(d)}
                                  >
                                    Buy
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}

                      {!arrSortSrNo &&
                        poolData
                          // .slice(0, 10)
                          ?.slice(
                            page * cardsPerPage - cardsPerPage,
                            cardsPerPage * page
                          )
                          ?.map((d, key) => {
                            return (
                              <>
                                <tr
                                  style={{ borderBottom: "1px solid #E6E8EC" }}
                                >
                                  <td
                                    style={{
                                      color: "#777E90",
                                      border: "none",
                                      fontSize: "12px",
                                      fontWeight: "600",
                                    }}
                                    scope="row"
                                  >
                                    {/* {key + 1} */}
                                    {page * cardsPerPage -
                                      cardsPerPage +
                                      1 +
                                      key}
                                  </td>
                                  <td style={{ border: "none" }}>
                                    <div class="d-flex flex-row align-items-center">
                                      <img
                                        style={{ width: "32px" }}
                                        src={d?.logo}
                                      />
                                      <div
                                        style={{
                                          fontWeight: "500",
                                          fontFamily: "Poppins",
                                          marginLeft: "10px",
                                          whiteSpace: "nowrap",
                                        }}
                                        class="n-darkAssetFullName"
                                      >
                                        {d?.assetFullName}
                                      </div>
                                      <div class="d-flex align-items-center">
                                        <div
                                          style={{ fontSize: "14px" }}
                                          class="pl-2 text-muted n-darkTextMuted"
                                        >
                                          {d?.asset}
                                        </div>
                                      </div>
                                    </div>
                                  </td>

                                  <td
                                    className="text-right n-darkAssetFullName"
                                    style={{
                                      border: "none",
                                    }}
                                  >
                                    $
                                    {numberWithCommas(
                                      financial(d?.assetPriceUSD)
                                    )}
                                  </td>
                                  <td
                                    className="text-right"
                                    style={{ border: "none" }}
                                  >
                                    <div class="d-flex flex-column">
                                      <div>
                                        {d?.change_24h >= 0 ? (
                                          <span className="percentage">
                                            +{financial(d?.change_24h)}%
                                          </span>
                                        ) : (
                                          <span className="percentagetwo">
                                            {financial(d?.change_24h)}%
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                  <td
                                    className="text-right"
                                    style={{ border: "none" }}
                                  >
                                    <div class="d-flex flex-column">
                                      <div>
                                        {d?.change_7d >= 0 ? (
                                          <span className="percentage">
                                            +{financial(d?.change_7d)}%
                                          </span>
                                        ) : (
                                          <span className="percentagetwo">
                                            {financial(d?.change_7d)}%
                                          </span>
                                        )}{" "}
                                      </div>
                                    </div>
                                  </td>
                                  <td
                                    className="text-right n-darkAssetFullName"
                                    style={{
                                      border: "none",
                                    }}
                                  >
                                    <div
                                      style={{
                                        textAlign: "right",
                                      }}
                                    >
                                      {toMil(financial(d?.marketCap))}
                                      {/* ${numberWithCommas(financial(d?.marketCap))} */}
                                    </div>
                                  </td>
                                  <td
                                    className="text-right n-darkAssetFullName"
                                    style={{
                                      border: "none",
                                    }}
                                  >
                                    <div
                                      style={{
                                        textAlign: "right",
                                      }}
                                    >
                                      ${toMil(d?.volume24h)}
                                      {/* ${d?.volume24h} */}
                                    </div>
                                  </td>
                                  <td>
                                    <div class="graph">
                                      {/* <img src={Images.crt1} alt="" />
                                      {/* <Graph /> */}
                                      {console.log(
                                        `<><><><><>>>>>>>>><<<<<<<<>>>>>>> d `,
                                        d
                                      )}
                                      <LineChartSmartCard
                                        color={
                                          d?.change_24h >= 0
                                            ? "#45B26B"
                                            : "#ff6838"
                                        }
                                        data={[
                                          {
                                            id: "Parent",
                                            color: "hsl(6, 70%, 50%)",
                                            data: d?.graphData?.map((data) => {
                                              return {
                                                x: new Date(
                                                  Number(data.timeStamp) * 1000
                                                )
                                                  .toString()
                                                  .substring(4, 16),
                                                y: data.assetPriceUSD,
                                              };
                                            }),
                                          },
                                        ]}
                                      />
                                    </div>
                                  </td>
                                  <td
                                    className="text-right"
                                    style={{ Height: "42px" }}
                                  >
                                    <Link
                                      to="#"
                                      style={{ fontFamily: "DM Sans" }}
                                      className=" btn btn-primary buybutttonmarket"
                                      onClick={() => handleRoute(d)}
                                    >
                                      Buy
                                    </Link>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                    </tbody>
                  </table>
                  <div className="paging-center">
                    <Pagination
                      count={count}
                      page={page}
                      onChange={handleChange}
                      // showFirstButton
                      // showLastButton
                    />
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
      <section class="n-marketSection" style={{ backgroundColor: "#FCFCFD" }}>
        <div class="container">
          <div style={{ marginBottom: "64px" }}>
            <h2 class="d-flex justify-content-center marketmainheade">
              Learn about DeFi
            </h2>
            <p
              class="d-flex justify-content-center n-learnSectionParag"
              style={{
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: "400",
                // color: "#353945",
                margin: "0",
              }}
            >
              Browse our library of resources to learn more about DeFi and how
              <br /> to use it to yield or trade
            </p>
          </div>
          <div class="mt-3 n-marketLearnCard">
            <div class="n-marketCardInv">
              <div class="card cardborder">
                <img
                  class="card-img-top"
                  style={{ borderRadius: "12px" }}
                  src={Images.mediacontainer}
                  alt="Card image cap"
                />
                <div class="card-body n-learnCard">
                  {/* <h6 class="marketcardone">Learn & Earn</h6> */}
                  <p class="cardtext">
                    Earn yield by providing liquidity to pools
                  </p>
                </div>
              </div>
              {/* <hr class="solid earnyieldclasssolid" /> */}
            </div>
            <div class="n-marketCardInv">
              <div class="card cardborder">
                <img
                  class="card-img-top"
                  style={{ borderRadius: "12px" }}
                  src={Images.mediacontainer}
                  alt="Card image cap"
                />
                <div class="card-body n-learnCard">
                  {/* <h6 class="marketcardtwo">WEEKLY WATCHLIST AIRDROP</h6> */}
                  <p class="cardtext">
                    The biggest advantages of decentralized exchange
                  </p>
                </div>
              </div>
            </div>
            <div class="n-marketCardInv">
              <div class="card cardborder">
                <img
                  class="card-img-top"
                  src={Images.mediacontainer}
                  style={{ borderRadius: "12px" }}
                  alt="Card image cap"
                />
                <div class="card-body n-learnCard">
                  {/* <h6 class="marketcardthree">FEATURED</h6> */}
                  <p class="cardtext">Submit your watchlist and win USDT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="d-flex justify-content-center"
          style={{ backgroundColor: "#fcfcfd" }}
          // style={{ marginTop: "64px", marginBottom: "130px" }}
        >
          <Link to={browserRoute.LEARN}>
            <button
              type="button"
              class="btn n-secondaryButton n-marketLoadMore"
            >
              {/* <img className="pr-2" src={Images.loadicon} /> */}
              Load more
            </button>
          </Link>
          {/* On loading Add button with loaing img */}
          {/* <button type="button" class="btn loaderbutton">
            <div
              class="d-flex justify-content-center n-marketLoadMore"
            >
              <Link to={browserRoute.LEARN}>
                <button type="button" class="btn n-secondaryButton">
                  Load more
                </button>
              </Link>
              {/* On loading Add button with loaing img */}
          {/* <button type="button" class="btn loaderbutton">
              <img className="pr-2" src={Images.loadicon} />
              Load more
            </button> */}
        </div>
      </section>
    </div>
  );
};

export default withMainLayout(Market);
