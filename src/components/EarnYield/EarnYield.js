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
    let res = mainStateRedux.filter(
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
    let res = mainStateRedux.filter(
      (data) => data.blockchain === "ETH" && data.blockchain !== data.asset
    );
    setFilterType(Enum.erc20);
    setPoolData(res);
    setTempPool(res);
  }
  function filterBEP2() {
    setSearchInput("");
    let res = mainStateRedux.filter(
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
    let res = check.sort((a, b) =>
      a?.assetFullName?.toLowerCase() > b?.assetFullName?.toLowerCase() ? 1 : -1
    );
    setMainState(res);
    let check2 = [...poolData];
    let res2 = check2.sort((a, b) =>
      a?.assetFullName?.toLowerCase() > b?.assetFullName?.toLowerCase() ? 1 : -1
    );
    setPoolData(res2);
    let check3 = [...tempPool];
    let res3 = check3.sort((a, b) =>
      a?.assetFullName?.toLowerCase() > b?.assetFullName?.toLowerCase() ? 1 : -1
    );
    setTempPool(res3);
  };

  //Descending Order Filter Name
  const handleDescendingName = () => {
    let check = [...mainState];
    let res = check.sort((a, b) =>
      a?.assetFullName?.toLowerCase() < b?.assetFullName?.toLowerCase() ? 1 : -1
    );
    setMainState(res);
    let check2 = [...poolData];
    let res2 = check2.sort((a, b) =>
      a?.assetFullName?.toLowerCase() < b?.assetFullName?.toLowerCase() ? 1 : -1
    );
    setPoolData(res2);
    let check3 = [...tempPool];
    let res3 = check3.sort((a, b) =>
      a?.assetFullName?.toLowerCase() < b?.assetFullName?.toLowerCase() ? 1 : -1
    );
    setTempPool(res3);
  };
  //Ascending Order Filter APY
  const handleAscendingAPY = () => {
    let check = [...mainState];
    let res = check.sort((a, b) => a.poolAPY - b.poolAPY);
    setMainState(res);
    let check2 = [...poolData];
    let res2 = check2.sort((a, b) => a.poolAPY - b.poolAPY);
    setPoolData(res2);
    let check3 = [...tempPool];
    let res3 = check3.sort((a, b) => a.poolAPY - b.poolAPY);
    setTempPool(res3);
  };
  //Descending Order Filter APY
  const handleDescendingAPY = () => {
    let check = [...mainState];
    let res = check.sort((a, b) => b.poolAPY - a.poolAPY);
    setMainState(res);
    let check2 = [...poolData];
    let res2 = check2.sort((a, b) => b.poolAPY - a.poolAPY);
    setPoolData(res2);
    let check3 = [...tempPool];
    let res3 = check3.sort((a, b) => b.poolAPY - a.poolAPY);
    setTempPool(res3);
  };

  //Ascending Order Filter Liquidity
  const handleAscendingLiquidity = () => {
    let check = [...mainState];
    let res = check.sort((a, b) => a.liquidityUnits - b.liquidityUnits);
    setMainState(res);
    let check2 = [...poolData];
    let res2 = check2.sort((a, b) => a.liquidityUnits - b.liquidityUnits);
    setPoolData(res2);
    let check3 = [...tempPool];
    let res3 = check3.sort((a, b) => a.liquidityUnits - b.liquidityUnits);
    setTempPool(res3);
  };
  //Descending Order Filter Liquidity
  const handleDescendingLiquidity = () => {
    let check = [...mainState];
    let res = check.sort((a, b) => b.liquidityUnits - a.liquidityUnits);
    setMainState(res);
    let check2 = [...poolData];
    let res2 = check2.sort((a, b) => b.liquidityUnits - a.liquidityUnits);
    setPoolData(res2);
    let check3 = [...tempPool];
    let res3 = check3.sort((a, b) => b.liquidityUnits - a.liquidityUnits);
    setTempPool(res3);
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
      {loading ? (
        <div style={{ justifyContent: "center", marginLeft: "40%" }}>
          <Loader height="40%" width="40%" />
        </div>
      ) : (
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

          <section style={{ backgroundColor: "#FCFCFD" }} class="">
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
                    class="form-control n-tableSearch n-responsiveSearch"
                    placeholder="Search"
                    onChange={inputSearch}
                    value={searchInput}
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
                  {/* <span
                      style={{ paddingTop: "10px", marginLeft: "-27px" }}
                      class=" fa fa-search form-control-feedback"
                    ></span> */}
                </div>
                {/* </div> */}
              </div>
              <div class="table-responsive w-comon-table-style n-earnYeildSection">
                <table class="table">
                  <thead>
                    <tr style={{ borderBottom: "1.5px solid #E6E8EC" }}>
                      <th scope="col">
                        Name{" "}
                        <div
                          style={{
                            display: "inline-grid",
                            paddingBottom: "4px",
                            marginLeft: "3px",
                            position: "absolute",
                            bottom: "31px",
                            cursor: "pointer",
                          }}
                          onClick={handleAscendingDescendingName}
                        >
                          <img
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
                          />
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
                            }}
                          >
                            <img
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
                            />
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
                            }}
                          >
                            <img
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
                            />
                          </span>
                        </div>
                      </th>
                      <th className="text-right" scope="col">
                        Volume(24h)
                        <img class="pl-2" src={Images.hourr} />
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
                                      style={{
                                        paddingLeft: "10px",
                                        fontWeight: "500",
                                        fontFamily: "Poppins",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {d.asset}
                                    </div>
                                    <div class="d-flex align-items-center">
                                      <div
                                        class="pl-2 text-muted"
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
            </div>
          </section>
          <section
            class="n-marketSection"
            style={{ backgroundColor: "#FCFCFD" }}
          >
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
                  Browse our library of resources to learn more about DeFi and
                  how
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
            <div class="d-flex justify-content-center w-marketLoadMore">
              <Link to={browserRoute.LEARN}>
                <button type="button" class="btn n-secondaryButton">
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
      )}
    </>
  );
};
export default withMainLayout(EarnYield);
