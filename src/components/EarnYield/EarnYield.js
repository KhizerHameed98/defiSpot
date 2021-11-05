import React, { useState, useEffect } from "react";
import Images from "../Helper/AllImages";
import withMainLayout from "../HOC/withMainLayout";
import { AddLiquidity } from "../PopModals/AddLiquidity_Modal";
import YieldData from "../Helper/Data/EarnYield";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import loadimg from "../../assets/images/Shape.svg";

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

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
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
    let res = mainStateRedux.filter((data) => data.blockchain === "ETH");
    setFilterType(Enum.erc20);
    setPoolData(res);
    setTempPool(res);
  }
  function filterBEP2() {
    setSearchInput("");
    let res = mainStateRedux.filter((data) => data.blockchain === "BNB");
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
          value?.assetFullName
            ?.toLowerCase()
            ?.includes(e.target.value.toLowerCase()) && value
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

  return (
    <>
      {loading ? (
        <div style={{ justifyContent: "center", marginLeft: "40%" }}>
          <Loader />
        </div>
      ) : (
        <>
          <section style={{ backgroundColor: "#C0E1FF" }}>
            <div class="container">
              <div class="row">
                <div class="col-lg-6">
                  <div class="marketbanner">
                    <h2 class="marketbannerhed">Earn yield now</h2>
                    <p
                      style={{
                        fontSize: "24px",
                        fontFamily: "Poppins",
                        fontWeight: "400",
                      }}
                    >
                      Provide your tokens to earn annual yield.
                    </p>
                  </div>
                </div>
                <div class="col-lg-6">
                  <img className="earnyield-pagepic" src={Images.pageyeild} />
                </div>
              </div>
            </div>
          </section>

          <section style={{ backgroundColor: "#FCFCFD" }}>
            <div class="container pt-5">
              <div class="d-flex justify-content-between">
                <ul class="list-unstyled d-flex">
                  <li>
                    <button
                      className={
                        filterType === Enum.allType
                          ? "alltype"
                          : "alltype-nonActive"
                      }
                      onClick={filterAllType}
                    >
                      All type
                    </button>
                  </li>

                  <li>
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

                  <li>
                    <button
                      className={
                        filterType === Enum.erc20
                          ? "alltype"
                          : "alltype-nonActive"
                      }
                      style={{ color: "#fff", fontFamily: "DM Sans" }}
                      onClick={filterERC20}
                    >
                      ERC-20
                    </button>
                  </li>

                  <li>
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
                <div className="pr-5">
                  <div class=" d-flex form-group has-search">
                    <input
                      style={{
                        borderRadius: "10px",
                        width: "300px",
                        fontFamily: "DM Sans",
                        backgroundColor: "#fcfcfd",
                      }}
                      type="text"
                      class="form-control"
                      placeholder="Search after pool..."
                      onChange={inputSearch}
                      value={searchInput}
                    />
                    <span
                      style={{ paddingTop: "10px", marginLeft: "-22px" }}
                      class=" fa fa-search form-control-feedback"
                    ></span>
                  </div>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr style={{borderBottom: "1.5px solid #E6E8EC"}}>
                      <th
                        className="pt-5 pb-5"
                        style={{
                          border: "none",
                          color: "#777E90",
                          fontFamily: "Poppins",
                          fontSize: "12px ",
                          fontWeight: "600",
                          paddingLeft: "70px",
                          position: "relative",
                        }}
                        scope="col"
                      >
                        Name{" "}
                        <div
                          style={{
                            display: "inline-grid",
                            paddingBottom: "4px",
                            marginLeft: "3px",
                            position: "absolute",
                            bottom: "47px"
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
                            onClick={handleAscendingName}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </th>
                      <th
                        className="pt-5 pb-5"
                        style={{
                          border: "none",
                          color: "#777E90",
                          fontFamily: "Poppins",
                          fontSize: "12px ",
                          fontWeight: "600",
                          textAlign: "right",
                          position: "relative",
                        }}
                        scope="col"
                      >
                        APY{" "}
                        <div
                          style={{
                            display: "inline-grid",
                            paddingBottom: "4px",
                            marginLeft: "3px",
                            position: "absolute",
                            top: "52px"
                          }}
                        >
                          <img
                            class="pl-1"
                            src={Images.FilterUp}
                            onClick={handleDescendingAPY}
                            style={{
                              marginBottom: "3px",
                              cursor: "pointer",
                            }}
                          />
                          <img
                            class="pl-1"
                            src={Images.FilterDown}
                            onClick={handleAscendingAPY}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </th>
                      <th
                        className="pt-5 pb-5"
                        style={{
                          border: "none",
                          color: "#777E90",
                          fontFamily: "Poppins",
                          fontSize: "12px ",
                          fontWeight: "600",
                          textAlign: "right",
                          position: "relative",
                        }}
                        scope="col"
                      >
                        Liquidity{" "}
                        <div
                          style={{
                            display: "inline-grid",
                            paddingBottom: "4px",
                            marginLeft: "3px",
                            position: "absolute",
                            top: "52px"
                          }}
                        >
                          <img
                            class="pl-1"
                            src={Images.FilterUp}
                            onClick={handleDescendingLiquidity}
                            style={{
                              marginBottom: "3px",
                              cursor: "pointer",
                            }}
                          />
                          <img
                            class="pl-1"
                            src={Images.FilterDown}
                            onClick={handleAscendingLiquidity}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </th>
                      <th
                        className="pt-5 pb-5"
                        style={{
                          border: "none",
                          color: "#777E90",
                          fontFamily: "Poppins",
                          fontSize: "12px ",
                          fontWeight: "600",
                          textAlign: "right",
                        }}
                        scope="col"
                      >
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
                            <tr className="maintdclasshover" style={{borderBottom: "1.5px solid #E6E8EC"}}>
                              <td style={{border: "none"}}>
                                <div class="d-flex">
                                  <img
                                    class="mt-1"
                                    style={{ width: "35px", height: "35px" }}
                                    src={d.logo}
                                  />
                                  <div class="d-block pl-3">
                                    <div
                                      style={{
                                        paddingLeft: "5px",
                                        fontWeight: "bold",
                                        fontFamily: "Poppins",
                                        fontSize: "14px",
                                        fontWeight: "400",
                                      }}
                                    >
                                      {d.assetFullName}
                                    </div>
                                    <div class="d-flex align-items-center">
                                      <div class="pl-1 text-muted">
                                        {d.blockchain}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td
                                className="pt-4"
                                style={{ textAlign: "right", border: "none" }}
                              >
                                <div>
                                  <span
                                    style={{
                                      backgroundColor:
                                        "rgba(88, 189, 125, 0.5)",
                                      color: "#23262F",
                                      fontSize: "14px",
                                      fontWeight: "400",
                                      borderRadius: "4px",
                                    }}
                                    class="depositclasss"
                                  >
                                    {financial(d.poolAPY)}% APR{" "}
                                  </span>
                                </div>
                              </td>
                              <td
                                style={{ textAlign: "right", border: "none" }}
                                className="earnyield-value pt-4"
                              >
                                ${d.liquidityUnits}
                              </td>
                              <td
                                style={{ textAlign: "right", border: "none" }}
                                className="earnyield-value pt-4"
                              >
                                ${d.volume24h}
                              </td>
                              <td
                                className="pt-4"
                                style={{ textAlign: "right", border: "none" }}
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
          <section style={{ backgroundColor: "#FCFCFD" }}>
            <div class="container">
              <div style={{ marginTop: "136px", marginBottom: "64px" }}>
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
                  }}
                >
                  Browse our library of resources to learn more about DeFi and
                  how
                  <br /> to use it to yield or trade
                </p>
              </div>
              <div class="row mt-3">
                <div class="col-lg-4">
                  <div class="card cardborder">
                    <img
                      class="card-img-top"
                      src={Images.mediacontainer}
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h6 class="marketcardone">Learn & Earn</h6>
                      <p class="cardtext pt-4">
                        Earn yield by providing liquidity to pools
                      </p>
                    </div>
                  </div>
                  {/* <hr class="solid earnyieldclasssolid" /> */}
                </div>
                <div class="col-lg-4">
                  <div class="card cardborder">
                    <img
                      class="card-img-top"
                      src={Images.mediacontainer}
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h6 class="marketcardtwo">WEEKLY WATCHLIST AIRDROP</h6>
                      <p class="cardtext pt-4">
                        The biggest advantages of decentralized exchange
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="card cardborder">
                    <img
                      class="card-img-top"
                      src={Images.mediacontainer}
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h6 class="marketcardthree">FEATURED</h6>
                      <p class="cardtext pt-4">
                        Submit your watchlist and win USDT
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div
            class="d-flex justify-content-center"
            style={{ marginBottom: "136px", marginTop: "64px" }}
          >
            <button type="button" class="btn loaderbutton">
              <img className="pr-2" src={loadimg} />
              Load more
            </button>
          </div>
        </>
      )}
    </>
  );
};
export default withMainLayout(EarnYield);
