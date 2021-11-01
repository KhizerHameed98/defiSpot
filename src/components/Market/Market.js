import React, { useState, useEffect } from "react";
import withMainLayout from "../HOC/withMainLayout";
import { Link } from "react-router-dom";
import Images from "../Helper/AllImages";
import browserRoute from "../../Routes/browserRoutes";
import Loader from "../Loader/Loader";
import { MidgardPool_Action } from "../../Redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";

const Market = () => {
 const dispatch = useDispatch();
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
  const mainState = useSelector((state) => state.main.midgardPool);
  const loading = useSelector((state) => state.main.loading);

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
    let res = mainState.filter(
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
    let res = mainState.filter((data) => data.blockchain === "ETH");
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
          value.assetFullName
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) && value
      );
      setPoolData(result2);
    }
  }
  useEffect(() => {
    setPoolData(mainState);
    setTempPool(mainState);
  }, [mainState]);
  return (
    <div>
      {loading ? (
        <>
          <div style={{ justifyContent: "center", marginLeft: "40%" }}>
            <Loader />
          </div>
        </>
      ) : (
        <>
          <section style={{ backgroundColor: "#C0E1FF" }}>
            <div class="container">
              <div class="row">
                <div class="col-lg-6">
                  <div class="marketbanner">
                    <h2 class="marketbannerhed">
                      Today's <br />
                      Cryptocurrency
                      <br /> Prices
                    </h2>
                    <p style={{ fontFamily: "Poppins",fontSize:"24px",fontWeight:"400" }}>
                      The global crypto market cap is{" "}
                      <span
                        style={{ fontWeight: "bold", fontFamily: "Poppins",fontSize:"24px" }}
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
                {mainState ? (
                  <>
                    {mainState.slice(0, 3).map((d, key) => {
                      return (
                        <>
                          <div class="col-lg-4 pt-3 pb-3">
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
                                <p class="marketparagraph">
                                  {d?.asset}/USDT{" "}
                                  {d?.change_24h >= 0 ? (
                                    <span className="spanclassmarket">
                                      +{financial(d?.change_24h)}%
                                    </span>
                                  ) : (
                                    <span className="spanclassmarkets">
                                      {financial(d?.change_24h)}%
                                    </span>
                                  )}{" "}
                                </p>
                                <p
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
                                  {numberWithCommas(financial(d?.assetPriceUSD))}
                                </p>
                              </div>
                              <div style={{ paddingLeft: "7px" }}>
                                <img src={Images.crt1} />
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : null}
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
                      All Type
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
                <div class=" d-flex form-group has-search">
                  <input
                    style={{
                      borderRadius: "8px",
                      width: "280px",
                      height: "35px",
                      fontFamily: "DM Sans",
                      backgroundColor: "#FCFCFD",
                    }}
                    type="text"
                    class="form-control"
                    placeholder="Search after coin..."
                    value={searchInput}
                    onChange={InputSearch}
                  />
                  <img style={{width:"17px",height:"17px",marginLeft: "-25px",marginTop: "10px"}} src={Images.searchicon}/>
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
              {poolData ? (
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th  className="pt-5 pb-5"
                          style={{
                            border: "none",
                            color: "#777E90",
                            fontFamily: "Poppins",
                            fontSize: "14px ",
                            fontWeight: "600",
                          }}
                          scope="col"
                        >
                          # <img class="pl-1" src={Images.nameup} />
                        </th>
                        <th  className="pt-5 pb-5"
                          style={{
                            border: "none",
                            color: "#777E90",
                            fontFamily: "Poppins",
                            fontSize: "14px ",
                            fontWeight: "600",
                          }}
                          scope="col"
                        >
                          Name <img class="pl-1" src={Images.nameup} />
                        </th>
                        <th  className="pt-5 pb-5"
                          style={{
                            border: "none",
                            color: "#777E90",
                            fontFamily: "Poppins",
                            fontSize: "14px ",
                            fontWeight: "600",
                          }}
                          scope="col"
                        >
                          Price <img class="pl-1" src={Images.nameup} />
                        </th>
                        <th  className="pt-5 pb-5"
                          style={{
                            border: "none",
                            color: "#777E90",
                            fontFamily: "Poppins",
                            fontSize: "14px ",
                            fontWeight: "600",
                          }}
                          scope="col"
                        >
                          24h %
                        </th>
                        <th  className="pt-5 pb-5"
                          style={{
                            border: "none",
                            color: "#777E90",
                            fontFamily: "Poppins",
                            fontSize: "14px ",
                            fontWeight: "600",
                          }}
                          scope="col"
                        >
                          7d %
                        </th>
                        <th  className="pt-5 pb-5"
                          style={{
                            border: "none",
                            color: "#777E90",
                            fontFamily: "Poppins",
                            fontSize: "14px ",
                            fontWeight: "600",
                          }}
                          scope="col"
                        >
                          Marketcap <img src={Images.dolaar} />
                        </th>
                        <th  className="pt-5 pb-5"
                          style={{
                            border: "none",
                            color: "#777E90",
                            fontFamily: "Poppins",
                            fontSize: "14px ",
                            fontWeight: "600",
                          }}
                          scope="col"
                        >
                          Volume(24h)
                          <img class="pl-2" src={Images.hourr} />
                        </th>
                        <th  className="pt-5 pb-5"
                          style={{
                            border: "none",
                            color: "#777E90",
                            fontFamily: "Poppins",
                            fontSize: "14px ",
                            fontWeight: "600",
                            textAlign: "right",
                            paddingRight: "30px",
                          }}
                          scope="col"
                        >
                          Chart
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {poolData.slice(0, 10).map((d, key) => {
                        return (
                          <tr className="maintdclasshover">
                            <th className="pt-4"
                              style={{
                                color: "#777E90",
                                fontFamily: "Poppins",
                                fontSize: "12px",
                                paddingTop: "17px",
                              }}
                              scope="row"
                            >
                              {key + 1}
                            </th>
                            <td className="pt-3">
                              <div class="d-flex ">
                                <img
                                  style={{ width: "32px" }}
                                  src={d?.logo}
                                />
                                <div
                                  style={{
                                    fontWeight: "bold",
                                    fontFamily: "Poppins",
                                    paddingLeft: "5px",
                                    fontSize: "14px",
                                    paddingLeft: "12px",
                                    paddingTop: "3px",
                                  }}
                                >
                                  {d?.assetFullName}
                                </div>
                                <div class="d-flex align-items-center">
                                  <div
                                    style={{ fontFamily: "DM Sans" }}
                                    class="pl-2 text-muted"
                                  >
                                    {d?.asset}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="pt-4"
                              style={{
                                fontWeight: "bold",
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                paddingTop: "17px",
                              }}
                            >
                              ${numberWithCommas(financial(d?.assetPriceUSD))}
                            </td>
                            <td className="pt-4">
                              <div class="d-flex flex-column">
                                <div>
                                  {d?.change_24h >= 0 ? (
                                    <b className="percentage">
                                      +{financial(d?.change_24h)}%
                                    </b>
                                  ) : (
                                    <b className="percentagetwo">
                                      {financial(d?.change_24h)}%
                                    </b>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="pt-4">
                              <div class="d-flex flex-column">
                                <div>
                                  {d?.change_7d >= 0 ? (
                                    <b className="percentage">
                                      +{financial(d?.change_7d)}%
                                    </b>
                                  ) : (
                                    <b className="percentagetwo">
                                      {financial(d?.change_7d)}%
                                    </b>
                                  )}{" "}
                                </div>
                              </div>
                            </td>
                            <td className="pt-4"
                              style={{
                                fontWeight: "bold",
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                paddingTop: "17px",
                              }}
                            >
                              ${numberWithCommas(financial(d?.marketCap))}
                            </td>
                            <td className="pt-4"
                              style={{
                                fontWeight: "bold",
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                paddingTop: "17px",
                              }}
                            >
                              ${d?.volume24h}
                            </td>
                            <td style={{Height:"42px"}}>
                              <div className="buytoken-buttonvalue">
                              <span    className="buyTokenGraph">
                            {d.change_24h>0?(<><img src={Images.crt1}/></>):(<><img src={Images.crt2}/></>)}
                              </span>
                            <span  className="buyTokenbtn">
                              <Link to={`${browserRoute.BUYMARKET}/${d?.asset}`}>
                                <button
                                  style={{ fontFamily: "DM Sans" }}
                                  className=" mt-1 ml-3 pl-5 pr-5 pt-2 pb-2 btn btn-primary"
                                >
                                  Buy
                                </button>
                              </Link>
                              </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>
          </section>
          <section style={{ backgroundColor: "#FCFCFD" }}>
            <div class="container pt-5 mb-5">
              <div>
                <h2 class="d-flex justify-content-center marketmainheade">
                  Learn about DeFi
                </h2>
                <p
                  class="d-flex justify-content-center"
                  style={{
                    textAlign: "center",
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    fontSize: "16px",
                    color: "#545454",
                  }}
                >
                  Browse our library of resources to learn more about DeFi and
                  how
                  <br /> to use it to yield or trade
                </p>
              </div>
              <div class="row">
                <div class="col-lg-4">
                  <div class="card cardborder" >
                    <img
                      class="card-img-top"
                      src={Images.comp}
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h6 class="marketcardone">Learn & Earn</h6>
                      <p
                        // style={{ fontFamily: "DM Sans" }}
                        class="cardtext pt-4"
                      >
                        Earn yield by providing liquidity to pools
                      </p>
                    </div>
                  </div>
                 
                </div>
                <div class="col-lg-4">
                  <div class="card cardborder">
                    <img
                      class="card-img-top"
                      src={Images.assest}
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h6 class="marketcardtwo">WEEKLY WATCHLIST AIRDROP</h6>
                      <p
                        // style={{ fontFamily: "DM Sans" }}
                        class="cardtext pt-4"
                      >
                        The biggest advantages of decentralized exchange
                      </p>
                    </div>
                  </div>
                 
                </div>
                <div class="col-lg-4">
                  <div class="card cardborder">
                    <img
                      class="card-img-top"
                      src={Images.Yield}
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h6 class="marketcardthree">FEATURED</h6>
                      <p
                        // style={{ fontFamily: "DM Sans" }}
                        class="cardtext pt-4"
                      >
                        Submit your watchlist and win USDT
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div class="d-flex justify-content-center mb-5">
            <button type="button" class="btn loaderbutton">
              {/* <i class="mr-2 fa fa-spinner"></i> */}
              <img className="pr-2 mb-1" src={Images.loadicon}/>
              Load more
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default withMainLayout(Market);
