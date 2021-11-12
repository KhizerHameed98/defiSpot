import React, { useState, useEffect } from "react";
import withMainLayout from "../HOC/withMainLayout";
import { Link } from "react-router-dom";
import Images from "../Helper/AllImages";
import browserRoute from "../../Routes/browserRoutes";
import Loader from "../Loader/Loader";
import { MidgardPool_Action } from "../../Redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { mainRoute } from "../../Routes/serverRoutes";

const Market = () => {
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
  const [arrSortSrNo, setArrSortSrNo] = useState(false);
  const [mainState, setMainState] = useState([]);

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
  function filterAllType() {
    setSearchInput("");
    setFilterType(Enum.allType);
    setPoolData(mainState);
    setTempPool(mainState);
  }
  function filterNative() {
    setSearchInput("");
    let res = mainState?.filter(
      (data) =>
        data?.blockchain === "LTC" ||
        data?.blockchain === "BTC" ||
        data?.blockchain === "BCH"
    );
    setFilterType(Enum.native);
    setPoolData(res);
    setTempPool(res);
  }
  function filterERC20() {
    setSearchInput("");
    let res = mainState?.filter((data) => data?.blockchain === "ETH");
    setFilterType(Enum.erc20);
    setPoolData(res);
    setTempPool(res);
  }
  function filterBEP2() {
    setSearchInput("");
    let res = mainState.filter((data) => data.blockchain === "BNB");
    console.log("res=====>>", res);
    setFilterType(Enum.bep2);
    setPoolData(res);
    setTempPool(res);
  }
  function InputSearch(e) {
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
    // console.log(v.length);
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
      <section style={{ backgroundColor: "#C0E1FF", overflow: "hidden" }}>
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
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
                    $1.86T
                  </span>
                </p>
              </div>
            </div>
            <div class="col-lg-6">
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
                    {mainStateRedux.slice(0, 3).map((d, key) => {
                      return (
                        <>
                          <div class="col-lg-4 umarketsect22222">
                            <div class="d-flex markethover">
                              <img
                                style={{ width: "32px", height: "32px" }}
                                src={d?.logo}
                              />
                              <div
                                style={{
                                  paddingLeft: "15px",
                                }}
                              >
                                <p
                                  class="marketparagraph d-flex"
                                  style={{ width: "122px" }}
                                >
                                  {d?.asset}/USDT{" "}
                                  {d?.change_24h >= 0 ? (
                                    <span className="spanclassmarkets">
                                      +{financial(d?.change_24h)}%
                                    </span>
                                  ) : (
                                    <span className="spanclassmarket">
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
                                  style={{
                                    fontFamily: "Poppins",
                                    color: "#23262F",
                                    fontSize: "12px",
                                  }}
                                >
                                  {numberWithCommas(
                                    financial(d?.assetPriceUSD)
                                  )}
                                </p>
                              </div>
                              <div style={{ paddingLeft: "7px" }}>
                                {d.change_24h > 0 ? (
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
                                )}
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
                      class="form-control n-tableSearch"
                      placeholder="Search after coin..."
                      value={searchInput}
                      onChange={InputSearch}
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
        <div class="container n-marketSectionTable">
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
                            }}
                          >
                            <img
                              class="pl-1"
                              src={Images.FilterUp}
                              onClick={() => {
                                setArrSortSrNo(true);
                              }}
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
                              onClick={() => {
                                setArrSortSrNo(false);
                              }}
                              style={{
                                cursor: "pointer",
                                position: "relative",
                                top: "-5px",
                              }}
                            />
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
                            }}
                          >
                            <img
                              class="pl-1"
                              src={Images.FilterUp}
                              onClick={handleDescendingName}
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
                              onClick={handleAscendingName}
                              style={{
                                cursor: "pointer",
                                position: "relative",
                                top: "-5px",
                              }}
                            />
                          </div>
                        </th>
                        <th className="text-right" scope="col">
                          Price{" "}
                          <div
                            style={{
                              display: "inline-grid",
                              // paddingBottom: "4px",
                              marginLeft: "3px",
                              position: "absolute",
                              bottom: "31px",
                            }}
                          >
                            <img
                              class="pl-1"
                              src={Images.FilterUp}
                              onClick={handleDescendingPrice}
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
                              onClick={handleAscendingPrice}
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
                          <img class="pl-1" src={Images.dolaar} />
                        </th>
                        <th
                          className="text-right"
                          scope="col"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Volume(24h)
                          <img class="pl-1" src={Images.hourr} />
                        </th>
                        <th className="text-right" scope="col">
                          Chart
                        </th>
                        <th className="text-right" scope="col">
                          Buy
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {arrSortSrNo &&
                        poolData
                          .slice(0, 10)
                          .reverse()
                          .map((d, key) => {
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
                                  {poolData.slice(0, 10).length - key}
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
                                      {d.change_24h > 0 ? (
                                        <>
                                          <img
                                            style={{
                                              width: "96px",
                                              height: "33px",
                                            }}
                                            src={Images.crt1}
                                          />
                                        </>
                                      ) : (
                                        <>
                                          <img
                                            style={{
                                              width: "96px",
                                              height: "33px",
                                            }}
                                            src={Images.chartmarket}
                                          />
                                        </>
                                      )}
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
                                    to={`${browserRoute.BUYMARKET}/${d?.asset}`}
                                  >
                                    <button
                                      style={{ fontFamily: "DM Sans" }}
                                      className=" btn btn-primary buybutttonmarket"
                                    >
                                      Buy
                                    </button>
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                      {!arrSortSrNo &&
                        poolData
                          .slice(0, 10)

                          .map((d, key) => {
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
                                  {key + 1}
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
                                    >
                                      {d?.assetFullName}
                                    </div>
                                    <div class="d-flex align-items-center">
                                      <div
                                        style={{ fontSize: "14px" }}
                                        class="pl-2 text-muted"
                                      >
                                        {d?.asset}
                                      </div>
                                    </div>
                                  </div>
                                </td>

                                <td
                                  className="text-right"
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
                                  className="text-right"
                                  style={{
                                    border: "none",
                                  }}
                                >
                                  <div
                                    style={{
                                      textAlign: "right",
                                      width: "80px",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {toMil(financial(d?.marketCap))}
                                    {/* ${numberWithCommas(financial(d?.marketCap))} */}
                                  </div>
                                </td>
                                <td
                                  className="text-right"
                                  style={{
                                    border: "none",
                                  }}
                                >
                                  <div
                                    style={{
                                      textAlign: "right",
                                      width: "80px",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {toMil(d?.volume24h)}
                                    {/* ${d?.volume24h} */}
                                  </div>
                                </td>
                                <td
                                  className="text-right"
                                  style={{ Height: "42px", border: "none" }}
                                >
                                  <div>
                                    <span className="buyTokenGraph">
                                      {d.change_24h > 0 ? (
                                        <>
                                          <img
                                            style={{
                                              width: "96px",
                                              height: "33px",
                                            }}
                                            src={Images.crt1}
                                          />
                                        </>
                                      ) : (
                                        <>
                                          <img
                                            style={{
                                              width: "96px",
                                              height: "33px",
                                            }}
                                            src={Images.chartmarket}
                                          />
                                        </>
                                      )}
                                    </span>
                                    {/* <span className="buyTokenbtn text-right">
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
                                    to={`${browserRoute.BUYMARKET}/${d?.asset}`}
                                  >
                                    <button
                                      style={{ fontFamily: "DM Sans" }}
                                      className=" btn btn-primary buybutttonmarket"
                                    >
                                      Buy
                                    </button>
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
      <section class="n-marketSection">
        <div class="container">
          <div style={{ marginBottom: "64px" }}>
            <h2 class="d-flex justify-content-center marketmainheade">
              Learn about DeFi
            </h2>
            <p
              class="d-flex justify-content-center"
              style={{
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: "400",
                color: "#353945",
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
                  <h6 class="marketcardone">Learn & Earn</h6>
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
                  <h6 class="marketcardtwo">WEEKLY WATCHLIST AIRDROP</h6>
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
                  <h6 class="marketcardthree">FEATURED</h6>
                  <p class="cardtext">Submit your watchlist and win USDT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="d-flex justify-content-center"
          style={{ marginTop: "64px", marginBottom: "130px" }}
        >
          <Link to={browserRoute.LEARN}>
            <button type="button" class="btn n-secondaryButton">
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
