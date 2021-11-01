import React, { useState, useEffect, Fragment } from "react";
import withMainLayout from "../HOC/withMainLayout";
import { Link } from "react-router-dom";
import browserRoute from "../../Routes/browserRoutes";
import Images from "../Helper/AllImages";
import { MidgardPool_Action } from "../../Redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";

export const HeroHome = () => {
  const dispatch = useDispatch();
  const [poolData, setPoolData] = useState([]);
  const mainState = useSelector((state) => state.main.midgardPool);
  const loading = useSelector((state) => state.main.loading);
  // const [state, setstte] = useState({ name: "ali", age: "20", no: "1028505852" });

  // useEffect(() => {
  //   let today = new Date();
  //   let yesterday = new Date();

  //   yesterday.setDate(today.getDate() - 2);
  //   yesterday.setHours(0);
  //   yesterday.setMinutes(1);
  //   yesterday.setSeconds(0);
  //   let timeStamp1 = yesterday.getTime();
  //   yesterday.setDate(today.getDate() - 1);
  //   yesterday.setHours(0);
  //   yesterday.setMinutes(0);
  //   yesterday.setSeconds(0);
  //   let timeStamp2 = yesterday.getTime();

  //   console.log("Today: " + today);
  //   console.log("Yesterday: " + yesterday);
  //   console.log("TimeStamp1: ", timeStamp1);
  //   console.log("TimeStamp2: ", timeStamp2);
  // }, []);
  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div>
      {loading ? (
        <div style={{ justifyContent: "center", marginLeft: "40%" }}>
          <Loader />
        </div>
      ) : (
        <>
        <hr className="solid solidclasssheader" />
          <section style={{ backgroundColor: "#FCFCFD" }}>
            <div class="container">
              <div class="row">
                <div class="col-lg-6">
                  <div class="marketbanner">
                    <h2 class="marketbannerhed">
                      Buy & sell <br />
                      crypto in minutes
                    </h2>
                    <p
                      style={{
                        color: "#777E90",
                        fontSize: "16px",
                        fontFamily: "Poppins",
                        fontWeight: "400",
                      }}
                    >
                      Trade Bitcoin, Ethereum, USDT, and the top altcoins on the
                      <br />
                      legendary crypto asset exchange.{" "}
                    </p>
                    <Link to={browserRoute.MARKET}>
                      <button
                        style={{ backgroundColor: "#3772FF" }}
                        type="button"
                        class="btn btn-primary"
                      >
                        Get started now
                      </button>
                    </Link>
                  </div>
                  <img style={{ paddingTop: "80px" }} src={Images.lorarrow} />
                </div>
                <div class="col-lg-6">
                  <img
                    className="mainimaggehomepage"
                    src={Images.mainbanneri}
                  />
                </div>
              </div>
              {/*loop started*/}

              <div class="row bitcoinclasssmian">
                {mainState ? (
                  <>
                    {mainState.slice(0, 4).map((d, key) => {
                      return (
                        <Fragment key={d.address}>
                          <div class="col-lg-3 pt-4 pb-4">
                            <div
                              class="pt-3 mainhover"
                              style={{
                                paddingLeft: "20px",
                                paddingBottom: "1px",
                              }}
                            >
                              <img
                                style={{
                                  paddingLeft: "15px",
                                  paddingTop: "10px",
                                  marginBottom: "16px",
                                  width: "60px",
                                }}
                                src={d.logo}
                              />
                              <div style={{ paddingLeft: "12px" }}>
                                <p class="marketparagraph pt-1">
                                  {d.asset}/USDT
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
                                    fontSize: "24px",
                                    fontWeight: "600",
                                    fontFamily: "Poppins",
                                    lineHeight: "32px",
                                    marginBottom: "2px",
                                    color: "#23262F",
                                  }}
                                >
                                  {numberWithCommas(financial(d.assetPriceUSD))}
                                </p>
                                <p
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "400",
                                    fontFamily: "Poppins",
                                    lineHeight: "20px",
                                    height: "20px",
                                    color: "#23262F",
                                  }}
                                >
                                  {" "}
                                  {numberWithCommas(financial(d.assetPriceUSD))}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Fragment>
                      );
                    })}
                  </>
                ) : null}
              </div>

              {/*loop ended */}
            </div>
          </section>
          <section style={{ backgroundColor: "#FCFCFD" }}>
            <div class="container pt-5">
              <div class="d-flex justify-content-between">
                <h2 class="markettrend">Market trend</h2>
                <Link to={browserRoute.MARKET}>
                  <button class="btn marketbutton">Go to market</button>
                </Link>
              </div>

              <div id="starred" class="px-2 pt-1 mt-5">
                <div class="table-responsive border-0">
                  <table class="table border-0">
                    <thead>
                      <tr style={{ borderBottom: "1px solid #E6E8EC" }}>
                        <th
                          className="pb-5"
                          style={{
                            border: "none",
                            color: "#777E90",
                            fontFamily: "Poppins",
                            fontSize: "12px ",
                            fontWeight: "600",
                          }}
                          scope="col"
                        >
                          #
                        </th>
                        <th
                          className="pb-5"
                          style={{
                            border: "none",
                            color: "#777E90",
                            fontFamily: "Poppins",
                            fontSize: "12px ",
                            fontWeight: "600",
                          }}
                          scope="col"
                        >
                          Name
                        </th>
                        <th
                          className="pb-5"
                          style={{
                            border: "none",
                            color: "#777E90",
                            fontFamily: "Poppins",
                            fontSize: "12px ",
                            fontWeight: "600",
                          }}
                          scope="col"
                        >
                          Price
                        </th>
                        <th
                          className="pb-5"
                          style={{
                            border: "none",
                            color: "#777E90",
                            fontFamily: "Poppins",
                            fontSize: "12px ",
                            fontWeight: "600",
                          }}
                          scope="col"
                        >
                          24h change
                        </th>
                        <th
                          className="pb-5"
                          style={{
                            border: "none",
                            color: "#777E90",
                            fontFamily: "Poppins",
                            fontSize: "12px ",
                            fontWeight: "600",
                          }}
                          scope="col"
                        >
                          Chart
                        </th>
                        <th
                          className="pb-5"
                          style={{
                            border: "none",
                            color: "#777E90",
                            fontFamily: "Poppins",
                            fontSize: "12px ",
                            fontWeight: "600",
                          }}
                          scope="col"
                        >
                          Trade
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mainState ? (
                        <>
                          {mainState.slice(0, 5).map((d, key) => {
                            return (
                              <>
                                <tr className="maintdclasshover">
                                  <td
                                    className=""
                                    style={{
                                      border: "none",
                                      paddingTop: "66px",
                                    }}
                                  >
                                    <div class="d-flex flex-column">
                                      <div
                                        style={{
                                          border: "none",
                                          color: "#777E90",
                                          fontFamily: "Poppins",
                                        }}
                                      >
                                        {key + 1}
                                      </div>
                                    </div>
                                  </td>
                                  <td
                                    className=""
                                    style={{
                                      border: "none",
                                      paddingTop: "56px",
                                    }}
                                  >
                                    <div class="d-flex ">
                                      <img
                                        src={d.logo}
                                        style={{ width: "40px" }}
                                      />
                                      <div
                                        class="pt-2 pl-3"
                                        style={{
                                          fontWeight: "600",
                                          fontSize: "16px",
                                          fontFamily: "Poppins",
                                        }}
                                      >
                                        {" "}
                                      </div>

                                      <div
                                        class="pt-2 pl-3"
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "17px",
                                          fontFamily: "Poppins",
                                        }}
                                      >
                                        {d.assetFullName}
                                      </div>
                                      <div class="d-flex align-items-center">
                                        <div class="pl-2 text-muted">
                                          {d.asset}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td
                                    className=""
                                    style={{
                                      border: "none",
                                      paddingTop: "56px",
                                    }}
                                  >
                                    <div class="d-flex flex-column">
                                      <div>
                                        <b style={{ fontFamily: "Poppins" }}>
                                          $
                                          {numberWithCommas(
                                            financial(d.assetPriceUSD)
                                          )}
                                        </b>
                                      </div>
                                    </div>
                                  </td>
                                  <td
                                    className=""
                                    style={{
                                      border: "none",
                                      paddingTop: "56px",
                                    }}
                                  >
                                    <div class="d-flex flex-column">
                                      <div>
                                        {d.change_24h >= 0 ? (
                                          <b className="percentage">
                                            +{financial(d.change_24h)}%
                                          </b>
                                        ) : (
                                          <b className="percentagetwo">
                                            {financial(d.change_24h)}%
                                          </b>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                  <td
                                    className=""
                                    style={{
                                      border: "none",
                                      paddingTop: "40px",
                                    }}
                                  >
                                    <div class="graph">
                                      {/* <img src={Images.crt1} alt="" />
                                      {/* <Graph /> */}

                                      {d.change_24h > 0 ? (
                                        <>
                                          <img src={Images.crt1} />
                                        </>
                                      ) : (
                                        <>
                                          <img src={Images.crt2} />
                                        </>
                                      )}
                                    </div>
                                  </td>
                                  <td
                                    className=""
                                    style={{
                                      border: "none",
                                      paddingTop: "45px",
                                    }}
                                  >
                                    <Link
                                      to={`${browserRoute.BUYMARKET}/${d.asset}`}
                                    >
                                      <div class="btn tradingbutton">Trade</div>
                                    </Link>{" "}
                                  </td>
                                </tr>
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
          </section>
          <section class="cryptotraders">
            <div class="container mt-5">
              <div>
                <h2 class="d-flex justify-content-center cryptotrader-home">
                  Become a crypto
                  <br />
                  trader in seconds
                </h2>
                <p
                  class="d-flex justify-content-center"
                  style={{
                    color: "#777E90",
                    fontWeight: "400",
                    fontFamily: "Poppins",
                    fontSize: "16px",
                    marginBottom: "60px",
                  }}
                >
                  We've got everything you need to start trading.
                </p>
              </div>
              <div class="row">
                <div class="col-lg-4">
                  <div
                    class="card shadowclass"
                    // style={{ border: "none", borderRadius: "25px" }}
                  >
                    <div class="d-flex justify-content-center">
                      <img
                        style={{
                          width: "160px",
                          paddingTop: "50px",
                          paddingBottom: "30px",
                        }}
                        class="card-img-top"
                        src={Images.comp}
                        alt="Card image cap"
                      />
                    </div>
                    <div class="card-body">
                      <h5
                        class="card-title d-flex justify-content-center"
                        style={{
                          color: "#23262F",
                          fontFamily: "Poppins",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        Buy & Sell Crypto
                      </h5>
                      <p
                        class="card-text"
                        style={{
                          color: "#777E90",
                          textAlign: "center",
                          fontSize: "14px",
                          fontWeight: "400",
                          lineHeight: "24px",
                          fontFamily: "Poppins",
                        }}
                      >
                        We realize ideas from simple to complex, everything
                        becomes easy to use and reach the most potential
                        customers.
                      </p>
                      <div class="d-flex justify-content-center">
                        <Link
                          to={browserRoute.MARKET}
                          class="btn-outline-secondary mb-3 homebuttom-3444"
                        >
                          Buy crypto
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div
                    class="card shadowclass"
                    // style={{ border: "none", borderRadius: "25px" }}
                  >
                    <div class="d-flex justify-content-center">
                      <img
                        style={{
                          width: "160px",
                          paddingTop: "50px",
                          paddingBottom: "30px",
                        }}
                        class="card-img-top"
                        src={Images.assest}
                        alt="Card image cap"
                      />
                    </div>
                    <div class="card-body">
                      <h5
                        class="card-title d-flex justify-content-center"
                        style={{
                          color: "#23262F",
                          fontFamily: "Poppins",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        Trade Assets
                      </h5>
                      <p
                        class="card-text"
                        style={{
                          color: "#777E90",
                          textAlign: "center",
                          fontSize: "14px",
                          fontWeight: "400",
                          lineHeight: "24px",
                          fontFamily: "Poppins",
                        }}
                      >
                        We realize ideas from simple to complex, everything
                        becomes easy to use and reach the most potential
                        customers.
                      </p>
                      <div class="d-flex justify-content-center">
                        <Link
                          to={browserRoute.MARKET}
                          class="btn-outline-secondary mb-3 homebuttom-3444"
                        >
                          Trade now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div
                    class="card shadowclass"
                    // style={{ border: "none", borderRadius: "25px" }}
                  >
                    <div class="d-flex justify-content-center">
                      <img
                        style={{
                          width: "160px",
                          paddingTop: "50px",
                          paddingBottom: "30px",
                        }}
                        class="card-img-top"
                        src={Images.Yield}
                        alt="Card image cap"
                      />
                    </div>
                    <div class="card-body">
                      <h5
                        class="card-title d-flex justify-content-center"
                        style={{
                          color: "#23262F",
                          fontFamily: "Poppins",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        Earn yield
                      </h5>
                      <p
                        class="card-text"
                        style={{
                          color: "#777E90",
                          textAlign: "center",
                          fontSize: "14px",
                          fontWeight: "400",
                          lineHeight: "24px",
                          fontFamily: "Poppins",
                        }}
                      >
                        We realize ideas from simple to complex, everything
                        becomes easy to use and reach the most potential
                        customers.
                      </p>
                      <div class="d-flex justify-content-center">
                        <a
                          href="#"
                          class="btn-outline-secondary mb-3 homebuttom-3444"
                        >
                          Earn now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center mt-5">
                <button
                  style={{ backgroundColor: "#3772FF" }}
                  type="button"
                  class="btn btn-primary d-flex justify-content-center"
                >
                  Read more
                </button>
              </div>
            </div>
          </section>
          <section style={{ backgroundColor: "#FCFCFD" }}>
            <div class="container pt-5">
              <h2
                class="d-flex justify-content-center"
                style={{
                  color: "#23262F",
                  fontWeight: "700",
                  fontFamily: "DM Sans",
                  fontSize: "48px",
                  marginTop: "75px",
                }}
              >
                Get started in a few minutes
              </h2>
              <p
                class="d-flex justify-content-center"
                style={{
                  color: "#353945",
                  fontFamily: "Poppins",
                  fontSize: "16px",
                }}
              >
                Suipe supports a variety of the most popular digital currencies.
              </p>
              <div class="d-flex justify-content-center pt-5">
                <img class="imagewidth" src={Images.Wallet} />
              </div>
              <div class="row">
                <div class="col-lg-4">
                  <h2 class="d-flex justify-content-center minutstart">
                    Trade assets
                  </h2>
                  <p
                    // style={{ textAlign: "center",color:"#353945",fontWeight:"600" }}
                    class="d-flex justify-content-center mintparagraph"
                  >
                    Trade assets cross-chain fully
                    <br /> decentralized without warpped<br/> tokens
                  </p>
                </div>
                <div class="col-lg-4">
                  <h2 class="d-flex justify-content-center minutstart">
                    Connect wallet
                  </h2>
                  <p
                    // style={{ textAlign: "center",color:"#353945",fontWeight:"600"  }}
                    class="d-flex justify-content-center mintparagraph"
                  >
                    Simply connect your wallet without
                    <br /> any need of KYC
                  </p>
                </div>
                <div class="col-lg-4">
                  <h2 class="d-flex justify-content-center minutstart">
                    Earn yield
                  </h2>
                  <p
                    // style={{ textAlign: "center",color:"#353945",fontWeight:"600" }}
                    class="d-flex justify-content-center mintparagraph"
                  >
                    Provide liquidity to one of our pools
                    <br /> to earn passive income
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section style={{ backgroundColor: "#FCFCFD" }}>
            <div
              style={{ backgroundColor: "#FCFCFD" }}
              class="container pt-5"
            ></div>
          </section>
          <section style={{ backgroundColor: "#FCFCFD" }}>
            <section
              style={{ backgroundColor: "#FCFCFD" }}
              class="container py-4"
            >
              <div class="row">
                <div class="col-md-12">
                  <div>
                    <h2 class="markettrend">Learn about DeFi</h2>
                    <button
                      style={{ fontWeight: "bold" }}
                      type="button"
                      class="btn cryptobutton"
                    >
                      View more
                    </button>
                  </div>

                  <br />
                  <div id="tabsContent" class="tab-content">
                    <div id="home1" class="tab-pane fade active show">
                      <section style={{ backgroundColor: "#FCFCFD" }}>
                        <div class="container">
                          <div class="row">
                            <div class="col-lg-6">
                              <img
                                className="imagebannnerssss"
                                src={Images.Img}
                              />
                              <div class="   pt-5">
                                <h2
                                  style={{
                                    fontSize: "32px",
                                    fontWeight: "700",
                                    lineHeight: "40px",
                                    fontFamily: "DM Sans",
                                  }}
                                >
                                  Leveraged tokens
                                  <br /> now available
                                </h2>
                                <button
                                  type="button"
                                  class="btn cryptobutton d-flex justify-content-end"
                                >
                                  Learn more
                                  <img
                                    class="pl-3"
                                    style={{ paddingTop: "11px" }}
                                    src={Images.moreright}
                                  />
                                </button>
                              </div>
                              <p className="date-classhomess">
                                Good things come in 3s. Get 3x Leveraged
                                <br /> tokens now.
                              </p>
                            </div>
                            <div class="col-lg-3">
                              <div class="pt-0" style={{ paddingLeft: "50px" }}>
                                <h2
                                  style={{
                                    fontSize: "16px",
                                    fontFamily: "Poppins",
                                    fontWeight: "500",
                                    lineHeight: "24px",
                                  }}
                                >
                                  Leveraged tokens now available
                                </h2>
                                <p className="date-classhome pt-2">
                                  Good things come in 3s. Get 3x Leveraged
                                  tokens now.
                                </p>
                                <p className="date-classhome " style={{paddingTop:"70px",marginBottom:"0px"}}>
                                  Jun 1, 2021
                                </p>
                              </div>
                              <div class="pt-" style={{ paddingLeft: "50px" }}>
                                <h2
                                  style={{
                                    fontSize: "16px",
                                    fontFamily: "Poppins",
                                    fontWeight: "500",
                                    lineHeight: "24px",
                                  }}
                                >
                                  Leveraged token now available
                                </h2>
                                <p className="date-classhome">
                                  Good things come in 3s. Get 3x Leveraged
                                  tokens now.
                                </p>
                                <p
                                  className="date-classhome"
                                  style={{ paddingTop: "80px",marginBottom:"0px" }}
                                >
                                  Jun 1, 2021
                                </p>
                              </div>
                              <div class="" style={{ paddingLeft: "50px" }}>
                                <h2
                                  style={{
                                    fontSize: "16px",
                                    fontFamily: "Poppins",
                                    fontWeight: "500",
                                    lineHeight: "24px",
                                    paddingTop: "0px",
                                  }}
                                >
                                  Leveraged tokens now available
                                </h2>
                                <p className="date-classhome">
                                  Good things come in 3s. Get 3x Leveraged
                                  tokens now.
                                </p>
                                <p className=" date-classhome" style={{paddingTop:"70px"}}>
                                  Jun 1, 2021
                                </p>
                              </div>
                            </div>
                            <div class="col-lg-3">
                              <div>
                                <img src={Images.cr1} />
                              </div>
                              <div class="pt-2">
                                <img
                                  style={{ paddingTop: "5px" }}
                                  src={Images.cr2}
                                />
                              </div>
                              <div class="pt-2">
                                <img src={Images.cr3} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </>
      )}
    </div>
  );
};
export default withMainLayout(HeroHome);
