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
  const [Enum, set_Enum] = useState({
    allType: "allType",
    native: "native",
    erc20: "erc20",
    bep2: "bep2",
  });
  const [filterType, setFilterType] = useState(Enum.allType);
  const mainState = useSelector((state) => state.main.midgardPool);
  const loading = useSelector((state) => state.main.loading);

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function filterAllType() {
    setFilterType(Enum.allType);
    setPoolData(mainState);
  }
  function filterNative() {
    let res = mainState.filter(
      (data) =>
        data.blockchain === "LTC" ||
        data.blockchain === "BTC" ||
        data.blockchain === "BCH"
    );
    setFilterType(Enum.native);
    setPoolData(res);
  }
  function filterERC20() {
    let res = mainState.filter((data) => data.blockchain === "ETH");
    setFilterType(Enum.erc20);
    setPoolData(res);
  }
  function filterBEP2() {
    let res = mainState.filter((data) => data.blockchain === "BNB");
    console.log("res=====>>", res);
    setFilterType(Enum.bep2);
    setPoolData(res);
  }

  function InputSearch(e) {
    if (!e.target.value) {
      setPoolData(mainState);
    } else {
      let result2 = mainState.filter(
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
                    <p style={{ fontFamily: "Poppins" }}>
                      The global crypto market cap is{" "}
                      <span
                        style={{ fontWeight: "bold", fontFamily: "Poppins" }}
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
                          <div class="col-lg-4 pt-4">
                            <div class="d-flex">
                              <img
                                style={{ width: "30px", height: "30px" }}
                                src={Images.btc}
                              />
                              <div
                                style={{
                                  paddingLeft: "15px",
                                  
                                }}
                              >
                                <p class="marketparagraph">
                                  {d.asset}/USDT{" "}
                                  {d.change_24h >= 0 ? (
                                    <span className="spanclassmarket">
                                      +{financial(d.change_24h)}%
                                    </span>
                                  ) : (
                                    <span className="spanclassmarkets">
                                      {financial(d.change_24h)}%
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
                                    financial(d.assetPriceUSD)
                                  )}{" "}
                                </p>
                                <p style={{ fontFamily: "Poppins",color:"#23262F",fontSize:"12px" }}>
                                  {numberWithCommas(financial(d.assetPriceUSD))}
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
                  {/* {filterType === Enum.allType ? (
                    <li>
                      <button
                        className="alltype"
                        style={{ color: "#fff", fontFamily: "DM Sans" }}
                        onClick={filterAllType}
                      >
                        All type
                      </button>
                    </li>
                  ) : (
                    <li class="pl-3 pt-2 marketparagraph">
                      <span
                        style={{
                          color: "#777E90",
                          cursor: "pointer",
                          fontFamily: "DM Sans",
                        }}
                        onClick={filterAllType}
                      >
                        All Type
                      </span>
                    </li>
                  )} */}
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
                      height:"35px",
                      fontFamily: "DM Sans",
                      backgroundColor:"#FCFCFD",
                    }}
                    type="text"
                    class="form-control"
                    placeholder="Search after coin..."
                    onChange={InputSearch}
                  />
                  <span
                    style={{ paddingTop: "10px", marginLeft: "-20px",fontSize:"15px",color:"#777E90" }}
                    class=" fa fa-search form-control-feedback"
                  ></span>
                </div>
              </div>
              {poolData ? (
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th
                         style={{border:"none",color:"#777E90",fontFamily:"Poppins",fontSize:"14px ",fontWeight:"400"}}
                          scope="col"
                        >
                          #  <img class="pl-1" src={Images.nameup} />
                        </th>
                        <th
                          style={{border:"none",color:"#777E90",fontFamily:"Poppins",fontSize:"14px ",fontWeight:"400"}}
                          scope="col"
                        >
                          Name <img class="pl-1" src={Images.nameup} />
                        </th>
                        <th
                         style={{border:"none",color:"#777E90",fontFamily:"Poppins",fontSize:"14px ",fontWeight:"400"}}
                          scope="col"
                        >
                          Price <img class="pl-1" src={Images.nameup} />
                        </th>
                        <th
                          style={{border:"none",color:"#777E90",fontFamily:"Poppins",fontSize:"14px ",fontWeight:"400"}}
                          scope="col"
                        >
                          24h %
                        </th>
                        <th
                       style={{border:"none",color:"#777E90",fontFamily:"Poppins",fontSize:"14px ",fontWeight:"400"}}
                          scope="col"
                        >
                          7d %
                        </th>
                        <th
                          style={{border:"none",color:"#777E90",fontFamily:"Poppins",fontSize:"14px ",fontWeight:"400"}}
                          scope="col"
                        >
                          Marketcap <img src={Images.dolaar} />
                        </th>
                        <th
                          style={{border:"none",color:"#777E90",fontFamily:"Poppins",fontSize:"14px ",fontWeight:"400"}}
                          scope="col"
                        >
                          Volume(24h)
                          <img class="pl-2" src={Images.hourr} />
                        </th>
                        <th
                         style={{border:"none",color:"#777E90",fontFamily:"Poppins",fontSize:"14px ",fontWeight:"400",textAlign:"right",paddingRight:"30px"}}
                          scope="col"
                        >
                          Chart
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {poolData.slice(0, 10).map((d, key) => {
                        return (
                          <tr>
                            <th
                              style={{
                                color: "#777E90",
                                fontFamily: "Poppins",
                                fontSize:"12px",
                                paddingTop:"17px"
                              }}
                              scope="row"
                            >
                              {key + 1}
                            </th>
                            <td>
                              <div class="d-flex ">
                                <img
                                  style={{ width: "25px" }}
                                  src={Images.btc1}
                                />
                                <div
                                  style={{
                                    fontWeight: "bold",
                                    fontFamily: "Poppins",
                                    paddingLeft: "5px",
                                    fontSize:"14px",
                                    paddingLeft:"12px",
                                    paddingTop:"3px"
                                  }}
                                >
                                  {d.assetFullName}
                                </div>
                                <div class="d-flex align-items-center">
                                  <div
                                    style={{ fontFamily: "DM Sans" }}
                                    class="pl-2 text-muted"
                                  >
                                    {d.asset}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td
                              style={{
                                fontWeight: "bold",
                                fontFamily: "Poppins",
                                fontSize:"14px",
                                paddingTop:"17px"
                              }}
                            >
                              {numberWithCommas(financial(d.assetPriceUSD))}
                            </td>
                            <td>
                              <div class="d-flex flex-column">
                                <div>
                                  {d.change_24h >= 0 ? (
                                    <b className="percentage">
                                      +{financial(d.change_24h)}
                                    </b>
                                  ) : (
                                    <b className="percentagetwo">
                                      {financial(d.change_24h)}
                                    </b>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div class="d-flex flex-column">
                                <div>
                                  {d.change_7d >= 0 ? (
                                    <b className="percentage">
                                      +{financial(d.change_7d)}
                                    </b>
                                  ) : (
                                    <b className="percentagetwo">
                                      {financial(d.change_7d)}
                                    </b>
                                  )}{" "}
                                </div>
                              </div>
                            </td>
                            <td
                              style={{
                                fontWeight: "bold",
                                fontFamily: "Poppins",
                                fontSize:"14px",
                                paddingTop:"17px"
                              }}
                            >
                              ${numberWithCommas(financial(d.marketCap))}
                            </td>
                            <td
                             style={{
                              fontWeight: "bold",
                              fontFamily: "Poppins",
                              fontSize:"14px",
                              paddingTop:"17px"
                            }}
                            >
                              ${d.volume24h}
                            </td>
                            <td >
                              <img src={Images.crt1} className="buyTokenGraph"/>
                            </td>

                            <td className="buyTokenbtn">
                              <Link to={`${browserRoute.BUYMARKET}/${d.asset}`}>
                                <button
                                  style={{ fontFamily: "DM Sans" }}
                                  className=" mt-1 ml-3 pl-5 pr-5 btn btn-primary"
                                >
                                  Buy
                                </button>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                      {/* 
                      <tr>
                        <th scope="row">2</th>
                        <td>
                          <div class="d-flex ">
                            <img style={{ width: "25px" }} src={Images.btc2} />
                            <div style={{ paddingLeft: "5px" }}>Ethereum</div>
                            <div class="d-flex align-items-center">
                              <div class="pl-2 text-muted">ETH</div>
                            </div>
                          </div>
                        </td>
                        <td>36,641.20</td>
                        <td>
                          <div class="d-flex flex-column">
                            <div>
                              <b class="percentage">+6.09%</b>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex flex-column">
                            <div>
                              <b class="percentagetwo">-2.04%</b>
                            </div>
                          </div>
                        </td>
                        <td>$328,564,656,654</td>
                        <td>$328,564,656,654</td>
                        <td className="buyTokenGraph">
                          <img src={Images.crt1} />
                        </td>
                        <td className="buyTokenbtn">
                          <Link to={browserRoute.BUYMARKET}>
                            <button className=" mt-1 ml-3 btn btn-primary">
                              Buy Token
                            </button>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>
                          <div class="d-flex ">
                            <img style={{ width: "25px" }} src={Images.btc3} />
                            <div style={{ paddingLeft: "5px" }}>Ethereum</div>
                            <div class="d-flex align-items-center">
                              <div class="pl-2 text-muted">ETH</div>
                            </div>
                          </div>
                        </td>
                        <td>36,641.20</td>
                        <td>
                          <div class="d-flex flex-column">
                            <div>
                              <b class="percentage">+6.09%</b>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex flex-column">
                            <div>
                              <b class="percentagetwo">-2.04%</b>
                            </div>
                          </div>
                        </td>
                        <td>$328,564,656,654</td>
                        <td>$328,564,656,654</td>
                        <td className="buyTokenGraph">
                          <img src={Images.crt1} />
                        </td>
                        <td className="buyTokenbtn">
                          <Link to={browserRoute.BUYMARKET}>
                            <button className=" mt-1 ml-3 btn btn-primary">
                              Buy Token
                            </button>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">4</th>
                        <td>
                          <div class="d-flex ">
                            <img style={{ width: "25px" }} src={Images.btc4} />
                            <div style={{ paddingLeft: "5px" }}>Ethereum</div>
                            <div class="d-flex align-items-center">
                              <div class="pl-2 text-muted">ETH</div>
                            </div>
                          </div>
                        </td>
                        <td>36,641.20</td>
                        <td>
                          <div class="d-flex flex-column">
                            <div>
                              <b class="percentage">+6.09%</b>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex flex-column">
                            <div>
                              <b class="percentagetwo">-2.04%</b>
                            </div>
                          </div>
                        </td>
                        <td>$328,564,656,654</td>
                        <td>$328,564,656,654</td>
                        <td className="buyTokenGraph">
                          <img src={Images.crt2} />
                        </td>
                        <td className="buyTokenbtn">
                          <Link to={browserRoute.BUYMARKET}>
                            <button className=" mt-1 ml-3 btn btn-primary">
                              Buy Token
                            </button>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">5</th>
                        <td>
                          <div class="d-flex ">
                            <img style={{ width: "25px" }} src={Images.btc5} />
                            <div style={{ paddingLeft: "5px" }}>Ethereum</div>
                            <div class="d-flex align-items-center">
                              <div class="pl-2 text-muted">ETH</div>
                            </div>
                          </div>
                        </td>
                        <td>36,641.20</td>
                        <td>
                          <div class="d-flex flex-column">
                            <div>
                              <b class="percentage">+6.09%</b>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex flex-column">
                            <div>
                              <b class="percentagetwo">-2.04%</b>
                            </div>
                          </div>
                        </td>
                        <td>$328,564,656,654</td>
                        <td>$328,564,656,654</td>
                        <td className="buyTokenGraph">
                          <img src={Images.crt1} />
                        </td>
                        <td className="buyTokenbtn">
                          <Link to={browserRoute.BUYMARKET}>
                            <button className=" mt-1 ml-3 btn btn-primary">
                              Buy Token
                            </button>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">6</th>
                        <td>
                          <div class="d-flex ">
                            <img style={{ width: "25px" }} src={Images.btc6} />
                            <div style={{ paddingLeft: "5px" }}>Ethereum</div>
                            <div class="d-flex align-items-center">
                              <div class="pl-2 text-muted">ETH</div>
                            </div>
                          </div>
                        </td>
                        <td>36,641.20</td>
                        <td>
                          <div class="d-flex flex-column">
                            <div>
                              <b class="percentage">+6.09%</b>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex flex-column">
                            <div>
                              <b class="percentagetwo">-2.04%</b>
                            </div>
                          </div>
                        </td>
                        <td>$328,564,656,654</td>
                        <td>$328,564,656,654</td>
                        <td className="buyTokenGraph">
                          <img src={Images.crt1} />
                        </td>
                        <td className="buyTokenbtn">
                          <Link to={browserRoute.BUYMARKET}>
                            <button className=" mt-1 ml-3 btn btn-primary">
                              Buy Token
                            </button>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">7</th>
                        <td>
                          <div class="d-flex ">
                            <img style={{ width: "25px" }} src={Images.btc7} />
                            <div style={{ paddingLeft: "5px" }}>Ethereum</div>
                            <div class="d-flex align-items-center">
                              <div class="pl-2 text-muted">ETH</div>
                            </div>
                          </div>
                        </td>
                        <td>36,641.20</td>
                        <td>
                          <div class="d-flex flex-column">
                            <div>
                              <b class="percentage">+6.09%</b>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex flex-column">
                            <div>
                              <b class="percentagetwo">-2.04%</b>
                            </div>
                          </div>
                        </td>
                        <td>$328,564,656,654</td>
                        <td>$328,564,656,654</td>
                        <td className="buyTokenGraph">
                          <img src={Images.crt2} />
                        </td>
                        <td className="buyTokenbtn">
                          <Link to={browserRoute.BUYMARKET}>
                            <button className=" mt-1 ml-3 btn btn-primary">
                              Buy Token
                            </button>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">8</th>
                        <td>
                          <div class="d-flex ">
                            <img style={{ width: "25px" }} src={Images.btc8} />
                            <div style={{ paddingLeft: "5px" }}>Ethereum</div>
                            <div class="d-flex align-items-center">
                              <div class="pl-2 text-muted">ETH</div>
                            </div>
                          </div>
                        </td>
                        <td>36,641.20</td>
                        <td>
                          <div class="d-flex flex-column">
                            <div>
                              <b class="percentage">+6.09%</b>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex flex-column">
                            <div>
                              <b class="percentagetwo">-2.04%</b>
                            </div>
                          </div>
                        </td>
                        <td>$328,564,656,654</td>
                        <td>$328,564,656,654</td>
                        <td className="buyTokenGraph">
                          <img src={Images.crt1} />
                        </td>
                        <td className="buyTokenbtn">
                          <Link to={browserRoute.BUYMARKET}>
                            <button className=" mt-1 ml-3 btn btn-primary">
                              Buy Token
                            </button>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">9</th>
                        <td>
                          <div class="d-flex ">
                            <img style={{ width: "25px" }} src={Images.btc9} />
                            <div style={{ paddingLeft: "5px" }}>Ethereum</div>
                            <div class="d-flex align-items-center">
                              <div class="pl-2 text-muted">ETH</div>
                            </div>
                          </div>
                        </td>
                        <td>36,641.20</td>
                        <td>
                          <div class="d-flex flex-column">
                            <div>
                              <b class="percentage">+6.09%</b>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex flex-column">
                            <div>
                              <b class="percentagetwo">-2.04%</b>
                            </div>
                          </div>
                        </td>
                        <td>$328,564,656,654</td>
                        <td>$328,564,656,654</td>
                        <td className="buyTokenGraph">
                          <img src={Images.crt2} />
                        </td>
                        <td className="buyTokenbtn">
                          <Link to={browserRoute.BUYMARKET}>
                            <button className=" mt-1 ml-3 btn btn-primary">
                              Buy Token
                            </button>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">10</th>
                        <td>
                          <div class="d-flex ">
                            <img style={{ width: "25px" }} src={Images.btc10} />
                            <div style={{ paddingLeft: "5px" }}>Ethereum</div>
                            <div class="d-flex align-items-center">
                              <div class="pl-2 text-muted">ETH</div>
                            </div>
                          </div>
                        </td>
                        <td>36,641.20</td>
                        <td>
                          <div class="d-flex flex-column">
                            <div>
                              <b class="percentage">+6.09%</b>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex flex-column">
                            <div>
                              <b class="percentagetwo">-2.04%</b>
                            </div>
                          </div>
                        </td>
                        <td>$328,564,656,654</td>
                        <td>$328,564,656,654</td>
                        <td className="buyTokenGraph">
                          <img src={Images.crt1} />
                        </td>
                        <td className="buyTokenbtn">
                          <Link to={browserRoute.BUYMARKET}>
                            <button className=" mt-1 ml-3 btn btn-primary">
                              Buy Token
                            </button>
                          </Link>
                        </td>
                      </tr> */}
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
                    fontSize:"16px",
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
                  <div class="card" style={{ border: "none" }}>
                    <img
                      class="card-img-top"
                      src={Images.comp}
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h6 class="marketcardone">Learn and Earn</h6>
                      <p
                        // style={{ fontFamily: "DM Sans" }}
                        class="cardtext pt-4"
                      >
                        Earn yield by providing liquidity to pools
                      </p>
                    </div>
                  </div>
                  <hr class="solid" />
                </div>
                <div class="col-lg-4">
                  <div class="card" style={{ border: "none" }}>
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
                  <hr class="solid" />
                </div>
                <div class="col-lg-4">
                  <div class="card" style={{ border: "none" }}>
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
                  <hr class="solid" />
                </div>
              </div>
            </div>
          </section>
          <div class="d-flex justify-content-center mb-5">
            <button type="button" class="btn loaderbutton">
              <i class="mr-2 fa fa-spinner"></i>
              Load more
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default withMainLayout(Market);
