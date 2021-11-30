import React, { useState, useEffect } from "react";
import Images from "../Helper/AllImages";
import withMainLayout from "../HOC/withMainLayout";
import { AddLiquidity } from "../PopModals/AddLiquidity_Modal";
import YieldData from "../Helper/Data/EarnYield";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import loadimg from "../../assets/images/Shape.svg";
import browserRoute from "../../Routes/browserRoutes";
import { Link } from "react-router-dom";

const EarnYield = () => {
  const dispatch = useDispatch();
  const [mainState, setMainState] = useState([]);
  const [poolData, setPoolData] = useState([]);
  const [tempPool, setTempPool] = useState([]);


  const [Enum, set_Enum] = useState({
    allType: "allType",
    native: "native",
    erc20: "erc20",
    bep2: "bep2",
  });
  const [filterType, setFilterType] = useState(Enum.allType);
  const [searchInput, setSearchInput] = useState("");

  const mainStateRedux = useSelector((state) => state.main.midgardPool);
  const loading = useSelector((state) => state.main.loading);

  useEffect(() => {
    setPoolData(mainStateRedux);
    setTempPool(mainStateRedux);
    setMainState(mainStateRedux);
  }, [mainStateRedux]);

  const [ascendingDescendingName, setAscendingDescendingName] = useState(false);
  const [ascendingDescendingAPY, setAscendingDescendingAPY] = useState(false);
  const [ascendingDescendingLiquidity, setAscendingDescendingLiquidity] =
    useState(false);

  const handleAscendingDescendingName = () => {
    setAscendingDescendingName(!ascendingDescendingName);
  };
  useEffect(() => {
    if (ascendingDescendingName) {
      handleAscendingName();
    } else {
      handleDescendingName();
    }
  }, [ascendingDescendingName]);

  const handleAscendingDescendingAPY = () => {
    setAscendingDescendingAPY(!ascendingDescendingAPY);
  };
  useEffect(() => {
    if (ascendingDescendingAPY) {
      handleAscendingAPY();
    } else {
      handleDescendingAPY();
    }
  }, [ascendingDescendingAPY]);

  const handleAscendingDescendingLiquidity = () => {
    setAscendingDescendingLiquidity(!ascendingDescendingLiquidity);
  };
  useEffect(() => {
    if (ascendingDescendingLiquidity) {
      handleAscendingLiquidity();
    } else {
      handleDescendingLiquidity();
    }
  }, [ascendingDescendingLiquidity]);

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    filterAllType();
  }, []);

  function filterAllType() {
    setSearchInput("");
    setFilterType(Enum.allType);
    setPoolData(mainStateRedux);
    setTempPool(mainStateRedux);
    setMainState(mainStateRedux);
  }
  function filterNative() {
    setSearchInput("");
    let res = mainStateRedux?.filter(
      (data) =>
        data.blockchain === "LTC" ||
        data.blockchain === "BTC" ||
        data.blockchain === "BCH"
    );
    setFilterType(Enum.native);
    setPoolData(res);
    setTempPool(res);
  }
  function filterERC20() {
    setSearchInput("");
    let res = mainStateRedux?.filter(
      (data) => data.blockchain === "ETH" && data.blockchain !== data.asset
    );
    setFilterType(Enum.erc20);
    setPoolData(res);
    setTempPool(res);
  }
  function filterBEP2() {
    setSearchInput("");
    let res = mainStateRedux?.filter(
      (data) => data.blockchain === "BNB" && data.blockchain !== data.asset
    );
    console.log("res=====>>", res);
    setFilterType(Enum.bep2);
    setPoolData(res);
    setTempPool(res);
  }

  function inputSearch(e) {
    setSearchInput(e.target.value);

    if (!e.target.value) {
      setPoolData(tempPool);

      // setFilterType(Enum.allType);
    } else {
      let result2 = tempPool?.filter(
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
  const handleAscendingName = () => {
    if (mainState) {
      let check = [...mainState];
      let res = check.sort((a, b) =>
        a?.assetFullName?.toLowerCase() > b?.assetFullName?.toLowerCase()
          ? 1
          : -1
      );
      setMainState(res);
      let check2 = [...poolData];
      let res2 = check2.sort((a, b) =>
        a?.assetFullName?.toLowerCase() > b?.assetFullName?.toLowerCase()
          ? 1
          : -1
      );
      setPoolData(res2);
      let check3 = [...tempPool];
      let res3 = check3.sort((a, b) =>
        a?.assetFullName?.toLowerCase() > b?.assetFullName?.toLowerCase()
          ? 1
          : -1
      );
      setTempPool(res3);
    }
  };

  //Descending Order Filter Name
  const handleDescendingName = () => {
    if (mainState) {
      let check = [...mainState];
      let res = check.sort((a, b) =>
        a?.assetFullName?.toLowerCase() < b?.assetFullName?.toLowerCase()
          ? 1
          : -1
      );
      setMainState(res);
      let check2 = [...poolData];
      let res2 = check2.sort((a, b) =>
        a?.assetFullName?.toLowerCase() < b?.assetFullName?.toLowerCase()
          ? 1
          : -1
      );
      setPoolData(res2);
      let check3 = [...tempPool];
      let res3 = check3.sort((a, b) =>
        a?.assetFullName?.toLowerCase() < b?.assetFullName?.toLowerCase()
          ? 1
          : -1
      );
      setTempPool(res3);
    }
  };
  //Ascending Order Filter APY
  const handleAscendingAPY = () => {
    if (mainState) {
      let check = [...mainState];
      let res = check.sort((a, b) => a.poolAPY - b.poolAPY);
      setMainState(res);
      let check2 = [...poolData];
      let res2 = check2.sort((a, b) => a.poolAPY - b.poolAPY);
      setPoolData(res2);
      let check3 = [...tempPool];
      let res3 = check3.sort((a, b) => a.poolAPY - b.poolAPY);
      setTempPool(res3);
    }
  };
  //Descending Order Filter APY
  const handleDescendingAPY = () => {
    if (mainState) {
      let check = [...mainState];
      let res = check.sort((a, b) => b.poolAPY - a.poolAPY);
      setMainState(res);
      let check2 = [...poolData];
      let res2 = check2.sort((a, b) => b.poolAPY - a.poolAPY);
      setPoolData(res2);
      let check3 = [...tempPool];
      let res3 = check3.sort((a, b) => b.poolAPY - a.poolAPY);
      setTempPool(res3);
    }
  };

  //Ascending Order Filter Liquidity
  const handleAscendingLiquidity = () => {
    if (mainState) {
      let check = [...mainState];
      let res = check.sort((a, b) => a.liquidityUnits - b.liquidityUnits);
      setMainState(res);
      let check2 = [...poolData];
      let res2 = check2.sort((a, b) => a.liquidityUnits - b.liquidityUnits);
      setPoolData(res2);
      let check3 = [...tempPool];
      let res3 = check3.sort((a, b) => a.liquidityUnits - b.liquidityUnits);
      setTempPool(res3);
    }
  };
  //Descending Order Filter Liquidity
  const handleDescendingLiquidity = () => {
    if (mainState) {
      let check = [...mainState];
      let res = check.sort((a, b) => b.liquidityUnits - a.liquidityUnits);
      setMainState(res);
      let check2 = [...poolData];
      let res2 = check2.sort((a, b) => b.liquidityUnits - a.liquidityUnits);
      setPoolData(res2);
      let check3 = [...tempPool];
      let res3 = check3.sort((a, b) => b.liquidityUnits - a.liquidityUnits);
      setTempPool(res3);
    }
  };

  const getType = (d) => {
    let type;
    if (d.asset === d.blockchain) {
      type = "Native";
    } else if (d.blockchain === "ETH" && d.asset !== d.blockchain) {
      type = "ERC-20";
    } else if (d.blockchain === "BNB" && d.asset !== d.blockchain) {
      type = "BEP2";
    }

    return <>{type}</>;
  };

  return (
    <>
      <section className="u-market876662">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 n-earnYeildContent">
              <div class="marketbanner">
                <h2 class="marketbannerhed">Earn yield now</h2>
                <p
                  className="uearnyidledpage66555"
                  // style={{
                  //   fontSize: "24px",
                  //   fontFamily: "Poppins",
                  //   fontWeight: "400",
                  // }}
                >
                  Provide your tokens to earn annual yield.
                </p>
              </div>
            </div>
            <div class="col-lg-6 n-earnYeildImage">
              <img className="earnyield-pagepic" src={Images.pageyeild} />
            </div>
          </div>
        </div>
      </section>

      <section
        style={{ backgroundColor: "#FCFCFD" }}
        class="n-earnYeildTableSection"
      >
        <div class="container n-earnYeildContainer">
          <div class="d-flex flex-row justify-content-between align-items-center flex-wrap mb-5">
            <ul class="list-unstyled d-flex flex-row align-items-center mb-0">
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
                    filterType === Enum.native ? "alltype" : "alltype-nonActive"
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
                    filterType === Enum.erc20 ? "alltype" : "alltype-nonActive"
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
                    filterType === Enum.bep2 ? "alltype" : "alltype-nonActive"
                  }
                  style={{ color: "#fff", fontFamily: "DM Sans" }}
                  onClick={filterBEP2}
                >
                  BEP2
                </button>
              </li>
            </ul>
            {/* <div className="pr-5"> */}
            <div class=" d-flex form-group has-search mb-0 n-inputSearch">
              <input
                style={{
                  borderRadius: "100px",
                  // width: "300px",
                  fontFamily: "DM Sans",
                  backgroundColor: "#fcfcfd",
                }}
                type="text"
                class="form-control n-tableSearch n-responsiveSearch n-tableSearch2"
                placeholder="Search"
                onChange={inputSearch}
                value={searchInput}
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
                      style={{ paddingTop: "10px", marginLeft: "-27px" }}
                      class=" fa fa-search form-control-feedback"
                    ></span> */}
            </div>
            {/* </div> */}
          </div>
          {loading ? (
            <>
              <div
                style={{
                  justifyContent: "center",
                  marginLeft: "30%",
                }}
              >
                <Loader height="40%" width="40%" />
              </div>
            </>
          ) : (
            <>
              <div class="table-responsive w-comon-table-style n-earnYeildSection">
                <table class="table">
                  <thead>
                    <tr style={{ borderBottom: "1.5px solid #E6E8EC" }}>
                      <th scope="col">
                        Name{" "}
                        <div
                          style={{
                            display: "inline-grid",
                            paddingBottom: "2px",
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
                            }}
                          />
                          <img
                            class="pl-1"
                            src={Images.FilterDown}
                            // onClick={handleAscendingName}
                            style={{ cursor: "pointer" }}
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
                              d="M5.43257 6.80441C5.69292 7.06476 6.11503 7.06476 6.37538 6.80441L8.2373 4.94248L10.0992 6.80441C10.3596 7.06476 10.7817 7.06476 11.042 6.80441C11.3024 6.54406 11.3024 6.12195 11.042 5.8616L8.70871 3.52827C8.44836 3.26792 8.02625 3.26792 7.7659 3.52827L5.43257 5.8616C5.17222 6.12195 5.17222 6.54406 5.43257 6.80441Z"
                              fill="#777E91"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M5.43257 9.19461C5.69292 8.93426 6.11503 8.93426 6.37538 9.19461L8.2373 11.0565L10.0992 9.19461C10.3596 8.93426 10.7817 8.93426 11.042 9.19461C11.3024 9.45496 11.3024 9.87707 11.042 10.1374L8.70871 12.4708C8.44836 12.7311 8.02625 12.7311 7.7659 12.4708L5.43257 10.1374C5.17222 9.87707 5.17222 9.45496 5.43257 9.19461Z"
                              fill="#777E91"
                            />
                          </svg>
                        </div>
                      </th>
                      <th className="text-right" scope="col">
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          APY{" "}
                          <span
                            onClick={handleAscendingDescendingAPY}
                            style={{
                              display: "inline-flex",
                              flexDirection: "column",
                              paddingBottom: "2px",
                            }}
                          >
                            {/* <img
                              class="pl-1"
                              src={Images.FilterUp}
                              style={{
                                marginBottom: "3px",
                                cursor: "pointer",
                              }}
                            />
                            <img
                              class="pl-1"
                              src={Images.FilterDown}
                              style={{ cursor: "pointer" }}
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
                                d="M5.43257 6.80441C5.69292 7.06476 6.11503 7.06476 6.37538 6.80441L8.2373 4.94248L10.0992 6.80441C10.3596 7.06476 10.7817 7.06476 11.042 6.80441C11.3024 6.54406 11.3024 6.12195 11.042 5.8616L8.70871 3.52827C8.44836 3.26792 8.02625 3.26792 7.7659 3.52827L5.43257 5.8616C5.17222 6.12195 5.17222 6.54406 5.43257 6.80441Z"
                                fill="#777E91"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M5.43257 9.19461C5.69292 8.93426 6.11503 8.93426 6.37538 9.19461L8.2373 11.0565L10.0992 9.19461C10.3596 8.93426 10.7817 8.93426 11.042 9.19461C11.3024 9.45496 11.3024 9.87707 11.042 10.1374L8.70871 12.4708C8.44836 12.7311 8.02625 12.7311 7.7659 12.4708L5.43257 10.1374C5.17222 9.87707 5.17222 9.45496 5.43257 9.19461Z"
                                fill="#777E91"
                              />
                            </svg>
                          </span>
                        </div>
                      </th>
                      <th className="text-right" scope="col">
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          Liquidity{" "}
                          <span
                            onClick={handleAscendingDescendingLiquidity}
                            style={{
                              display: "inline-flex",
                              flexDirection: "column",
                              paddingBottom: "2px",
                            }}
                          >
                            {/* <img
                              class="pl-1"
                              src={Images.FilterUp}
                              // onClick={handleDescendingLiquidity}
                              style={{
                                marginBottom: "3px",
                                cursor: "pointer",
                              }}
                            />
                            <img
                              class="pl-1"
                              src={Images.FilterDown}
                              // onClick={handleAscendingLiquidity}
                              style={{ cursor: "pointer" }}
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
                                d="M5.43257 6.80441C5.69292 7.06476 6.11503 7.06476 6.37538 6.80441L8.2373 4.94248L10.0992 6.80441C10.3596 7.06476 10.7817 7.06476 11.042 6.80441C11.3024 6.54406 11.3024 6.12195 11.042 5.8616L8.70871 3.52827C8.44836 3.26792 8.02625 3.26792 7.7659 3.52827L5.43257 5.8616C5.17222 6.12195 5.17222 6.54406 5.43257 6.80441Z"
                                fill="#777E91"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M5.43257 9.19461C5.69292 8.93426 6.11503 8.93426 6.37538 9.19461L8.2373 11.0565L10.0992 9.19461C10.3596 8.93426 10.7817 8.93426 11.042 9.19461C11.3024 9.45496 11.3024 9.87707 11.042 10.1374L8.70871 12.4708C8.44836 12.7311 8.02625 12.7311 7.7659 12.4708L5.43257 10.1374C5.17222 9.87707 5.17222 9.45496 5.43257 9.19461Z"
                                fill="#777E91"
                              />
                            </svg>
                          </span>
                        </div>
                      </th>
                      <th className="text-right" scope="col">
                        Volume(24h)
                        {/* <img class="pl-2" src={Images.hourr} /> */}
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
                    </tr>
                  </thead>
                  <tbody>
                    {poolData ? (
                      <>
                        {poolData.map((d, key) => {
                          return (
                            <tr
                              className="maintdclasshover"
                              style={{ borderBottom: "1.5px solid #E6E8EC" }}
                            >
                              <td>
                                <div class="d-flex align-items-center">
                                  <img
                                    style={{ width: "35px", height: "35px" }}
                                    src={d.logo}
                                  />
                                  <div class="d-flex">
                                    <div
                                      class="n-earnYeildCurrencyName"
                                      style={{
                                        paddingLeft: "10px",
                                        fontWeight: "500",
                                        fontFamily: "Poppins",
                                        fontSize: "14px",
                                        lineHeight: "24px",
                                      }}
                                    >
                                      {d.asset}
                                    </div>
                                    <div class="d-flex align-items-center">
                                      <div
                                        class="pl-2 n-earnYeildCurrencyType"
                                        style={{
                                          fontSize: "14px",
                                          fontWeight: "500",
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        {getType(d)}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="text-right">
                                <div>
                                  <span
                                    // style={{
                                    //   backgroundColor:
                                    //     "rgba(88, 189, 125, 0.5)",
                                    //   color: "#23262F",
                                    //   fontSize: "14px",
                                    //   fontWeight: "400",
                                    //   borderRadius: "4px",
                                    //   whiteSpace: "nowrap",
                                    // }}
                                    class="depositclasss"
                                  >
                                    {financial(d.poolAPY)}% APY{" "}
                                  </span>
                                </div>
                              </td>
                              <td className="text-right">
                                ${d.liquidityUnits}
                              </td>
                              <td className="text-right">${d.volume24h}</td>
                              <td
                                className="text-right"
                                style={{
                                  textAlign: "right",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {" "}
                                <AddLiquidity data={d} />
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    ) : null}
                  </tbody>
                </table>
              </div>
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
              class="d-flex justify-content-center n-learnDefiSectionP"
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
          {/* <hr class="solid earnyieldclasssolid" /> */}
        </div>

        <div class="d-flex justify-content-center w-marketLoadMore">
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
              <img className="pr-2" src={Images.loadicon} />
              Load more
            </button> */}
        </div>
      </section>
    </>
  );
};
export default withMainLayout(EarnYield);
