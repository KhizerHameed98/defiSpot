import React, { useState, useEffect, Fragment, useRef } from "react";
import withMainLayout from "../HOC/withMainLayout";
import { Link, useHistory } from "react-router-dom";
import browserRoute from "../../Routes/browserRoutes";
import Images from "../Helper/AllImages";
import { MidgardPool_Action } from "../../Redux/actions/actions";
import { handleMainModal } from "../../Services/mainServices";
import { useSelector, useDispatch } from "react-redux";
import CryptoJS from "crypto-js";
import Loader from "../Loader/Loader";
import { ResponsiveLine } from "@nivo/line";
import { Bar, Pie, Line } from "react-chartjs-2";
import LineChartSmartCard from "../GraphChart";

export const HeroHome = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [poolData, setPoolData] = useState([]);
  const mainState = useSelector((state) => state.main.midgardPool);
  const loading = useSelector((state) => state.main.loading);
  const loggedin = useSelector((state) => state.main.isLoggedin);
  // const [state, setstte] = useState({ name: "ali", age: "20", no: "1028505852" });
  const myRef = useRef(null);
  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function handleRoutingtoBuy(d) {
    if (!loggedin) {
      dispatch(handleMainModal(true));
    } else {
      history.push(`${browserRoute.BUYMARKET}/${d._id}`);
    }
  }
  // function handleRouting(data) {
  //   history.push(`${browserRoute.BUYMARKET}/${data._id}`);
  // }

  return (
    <div>
      <section style={{ overflow: "hidden" }}>
        <div class="container nn-heroSection">
          <div class="row">
            <div class="col-lg-6 n-heroContent">
              <div class="marketbanner">
                <h2 class="marketbannerhed">
                  Buy & sell <br />
                  crypto in minutes
                </h2>
                <p class="n-heroDescription">
                  Trade Bitcoin, Ethereum, USDT, and the top altcoins on the
                  <br />
                  legendary crypto asset exchange.{" "}
                </p>
                <Link to={browserRoute.MARKET}>
                  <button
                    type="button"
                    class="n-primaryButton"
                    style={{ fontSize: "16px", padding: "16px 24px" }}
                  >
                    Get started now
                  </button>
                </Link>
              </div>
              
              <svg onClick={executeScroll} class="n-downArrow" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="arr-fill" fill-rule="evenodd" clip-rule="evenodd" d="M20.7348 18.0909C21.1094 18.4968 21.0841 19.1294 20.6783 19.504L17.1783 22.7348C16.7953 23.0884 16.2048 23.0884 15.8218 22.7348L12.3217 19.504C11.9159 19.1294 11.8906 18.4968 12.2652 18.091C12.6398 17.6851 13.2724 17.6598 13.6783 18.0344L15.5 19.716L15.5 10C15.5 9.44771 15.9477 9 16.5 9C17.0523 9 17.5 9.44771 17.5 10L17.5 19.716L19.3217 18.0344C19.7275 17.6598 20.3602 17.6851 20.7348 18.0909Z"/>
              <path d="M2 16C2 8.26801 8.26801 2 16 2L16 -2C6.05887 -2 -2 6.05887 -2 16L2 16ZM16 30C8.26801 30 2 23.732 2 16L-2 16C-2 25.9411 6.05887 34 16 34L16 30ZM30 16C30 23.732 23.732 30 16 30L16 34C25.9411 34 34 25.9411 34 16L30 16ZM34 16C34 6.05887 25.9411 -2 16 -2L16 2C23.732 2 30 8.26801 30 16L34 16Z" fill="#E6E8EC"/>
              </svg>
            </div>
            <div class="col-lg-6 n-responsiveHeroImage">
              <img className="mainimaggehomepage" src={Images.mainbanneri} />
            </div>
          </div>
          {/*loop started*/}

          <div class="row bitcoinclasssmian">
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
                </div>
                <div class="mainhover">
                  <div class="">
                    <div
                      style={{ justifyContent: "center", marginLeft: "40%" }}
                    >
                      <Loader height="70%" width="70%" />
                    </div>
                  </div>
                </div>
                <div class="mainhover">
                  <div class="">
                    <div
                      style={{ justifyContent: "center", marginLeft: "40%" }}
                    >
                      <Loader height="70%" width="70%" />
                    </div>
                  </div>
                </div>
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
                {mainState ? (
                  <>
                    {mainState.slice(0, 4).map((d, key) => {
                      return (
                        <Fragment key={d.address}>
                          <div class="mainhover">
                            <div class="">
                              <img
                                style={{
                                  marginBottom: "16px",
                                  width: "40px",
                                  height: "40px",
                                }}
                                src={d.logo}
                              />
                              <div>
                                <p class="marketparagraph">
                                  {d.asset}/USDT
                                  {d.change_24h >= 0 ? (
                                    <span className="spanclassmarkets">
                                      +{financial(d.change_24h)}%
                                    </span>
                                  ) : (
                                    <span className="spanclassmarket">
                                      {financial(d.change_24h)}%
                                    </span>
                                  )}{" "}
                                </p>
                                <p
                                  style={{
                                    fontFamily: "Poppins",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    fontSize: "24px",
                                    lineHeight: "32px",
                                    color: "#23262F",
                                    marginBottom: "4px",
                                  }}
                                >
                                  {numberWithCommas(financial(d.assetPriceUSD))}
                                </p>
                                <p
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "normal",
                                    fontFamily: "Poppins",
                                    fontStyle: "normal",
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
              </>
            )}
          </div>

          {/*loop ended */}
        </div>
      </section>
      <section
        className="w-section-space-top-btm"
        style={{ backgroundColor: "#FCFCFD" }}
      >
        <div class="container nn-marketSection">
          <div class="n-marketTrendHeading">
            <h2 class="markettrend">Market trend</h2>
            <Link to={browserRoute.MARKET}>
              <button class="n-secondaryButton n-ButtonResponsive">
                Go to market
              </button>
            </Link>
          </div>

          <div id="starred" class="pt-1 n-marketTable">
            <div class="table-responsive w-comon-table-style-row-space w-mr-botom-h-tb">
              <div
                className="w-brd-tb"
                style={{ top: "74px", backgroundColor: "#E6E8EC" }}
              ></div>
              {loading ? (
                <>
                  {" "}
                  <div
                    style={{
                      justifyContent: "center",
                      marginLeft: "40%",
                    }}
                  >
                    <Loader height="40%" width="40%" />
                  </div>
                </>
              ) : (
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col" style={{ whiteSpace: "nowrap" }}>
                        24h change
                      </th>
                      <th scope="col">Chart</th>
                      <th scope="col">Trade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mainState ? (
                      <>
                        {mainState.slice(0, 5).map((d, key) => {
                          return (
                            <>
                              <tr>
                                <td>
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
                                <td>
                                  <div class="d-flex align-items-center">
                                    <img
                                      src={d.logo}
                                      style={{
                                        width: "40px",
                                      }}
                                    />

                                    <div style={{ marginLeft: "32px" }}>
                                      {d.assetFullName}
                                    </div>
                                    <div
                                      class="text-muted"
                                      style={{
                                        fontSize: "16px",
                                        marginLeft: "12px",
                                      }}
                                    >
                                      {d.asset}
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div class="d-flex flex-column">
                                    <div>
                                      $
                                      {numberWithCommas(
                                        financial(d.assetPriceUSD)
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div class="d-flex flex-column">
                                    <div>
                                      {d.change_24h >= 0 ? (
                                        <span className="percentage">
                                          +{financial(d.change_24h)}%
                                        </span>
                                      ) : (
                                        <span className="percentagetwo">
                                          {financial(d.change_24h)}%
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div class="graph">
                                    <LineChartSmartCard
                                      color={
                                        d?.change_7d >= 0
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
                                              y: data?.assetPriceUSD,
                                            };
                                          }),
                                        },
                                      ]}
                                    />

                                    {/* <img src={Images.crt1} alt="" />
                                      {/* <Graph /> */}
                                    {/* <Line
                                      width={600}
                                      height={250}
                                      style={{
                                        position: "relative",
                                        height: "40px",
                                        width: "80px",
                                      }}
                                      data={{
                                        labels: d.graphData.map((data) =>
                                          new Date(
                                            Number(data.timeStamp) * 1000
                                          )
                                            .toString()
                                            .substring(4, 16)
                                        ),

                                        datasets: [
                                          {
                                            label: d.asset,

                                            data: d.graphData.map(
                                              (data) => data.assetPriceUSD
                                            ),

                                            backgroundColor: "rgba(0,0,255,.6)",

                                            borderWidth: 1,

                                            borderColor: "#00f",

                                            hoverBorderWidth: 3,

                                            hoverBorderColor: "#000",
                                          },
                                        ],
                                      }}
                                      options={{
                                        title: {
                                          display: true,

                                          text: "Daily Corona Update",

                                          fontSize: 25,
                                        },

                                        legend: {
                                          display: false,

                                          position: "top", // top, bottom ,left, right

                                          labels: {
                                            fontColor: "#000",
                                          },
                                        },

                                        layout: {
                                          padding: {
                                            left: 0,

                                            right: 0,

                                            top: 0,

                                            bottom: 0,
                                          },
                                        },

                                        tooltips: {
                                          enabled: true, 
                                        },
                                      }}
                                    /> */}
                                  </div>
                                </td>
                                <td>
                                  <div
                                    // to={`${browserRoute.BUYMARKET}/${d.asset}`}
                                    style={{
                                      cursor: "pointer",
                                      textDecoration: "none",
                                      textAlign: "center",
                                      display: "inline-block",
                                    }}
                                  >
                                    <Link
                                      style={{
                                        cursor: "pointer",
                                        textDecoration: "none",
                                        textAlign: "center",
                                        display: "inline-block",
                                      }}
                                      class="n-secondaryButton"
                                      onClick={() => handleRoutingtoBuy(d)}
                                      to="#"
                                    >
                                      {/* <button */}
                                      {/* > */}
                                      Trade
                                      {/* </button> */}
                                    </Link>
                                  </div>{" "}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </>
                    ) : null}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </section>
      <section class="cryptotraders">
        <div class="container">
          <div>
            <h2 class="cryptotrader-home">
              Become a crypto
              <br />
              trader in seconds
            </h2>
            <p class="cryptoTraderDescription">
              We've got everything you need to start trading.
            </p>
          </div>
          <div class="row">
            <div class="col-lg-4 n-tradeCard">
              <div class="card shadowclass">
                <div class="d-flex justify-content-center">
                  <img
                    style={{
                      width: "160px",
                      margin: "50px 0px 32px",
                    }}
                    class="card-img-top"
                    src={Images.comp}
                    alt="Card image cap"
                  />
                </div>
                <div class="n-cardContent">
                  <h5
                    class="card-title d-flex justify-content-center"
                    style={{
                      color: "#23262F",
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontWeight: "500",
                      lineHeight: "24px",
                      marginBottom: "16px",
                    }}
                  >
                    Buy & Sell Crypto
                  </h5>
                  <p
                    class="card-text"
                    style={{
                      color: "#777E91",
                      textAlign: "center",
                      fontSize: "14px",
                      fontWeight: "normal",
                      lineHeight: "24px",
                      fontFamily: "Poppins",
                    }}
                  >
                    We realize ideas from simple to complex, everything becomes
                    easy to use and reach the most potential customers.
                  </p>
                  <div class="d-flex justify-content-center">
                    <Link
                      to={browserRoute.MARKET}
                      class="n-secondaryButton"
                      style={{ textDecoration: "none" }}
                    >
                      Buy crypto
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 n-tradeCard">
              <div
                class="card shadowclass"
                // style={{ border: "none", borderRadius: "25px" }}
              >
                <div class="d-flex justify-content-center">
                  <img
                    style={{
                      width: "160px",
                      margin: "50px 0px 32px",
                    }}
                    class="card-img-top"
                    src={Images.assest}
                    alt="Card image cap"
                  />
                </div>
                <div class="n-cardContent">
                  <h5
                    class="card-title d-flex justify-content-center"
                    style={{
                      color: "#23262F",
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontWeight: "500",
                      lineHeight: "24px",
                      marginBottom: "16px",
                    }}
                  >
                    Trade Assets
                  </h5>
                  <p
                    class="card-text"
                    style={{
                      color: "#777E91",
                      textAlign: "center",
                      fontSize: "14px",
                      fontWeight: "normal",
                      lineHeight: "24px",
                      fontFamily: "Poppins",
                    }}
                  >
                    We realize ideas from simple to complex, everything becomes
                    easy to use and reach the most potential customers.
                  </p>
                  <div class="d-flex justify-content-center">
                    <Link
                      to={browserRoute.MARKET}
                      class="n-secondaryButton"
                      style={{ textDecoration: "none" }}
                    >
                      Trade now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 n-tradeCard">
              <div
                class="card shadowclass"
                // style={{ border: "none", borderRadius: "25px" }}
              >
                <div class="d-flex justify-content-center">
                  <img
                    style={{
                      width: "160px",
                      margin: "50px 0px 32px",
                    }}
                    class="card-img-top"
                    src={Images.Yield}
                    alt="Card image cap"
                  />
                </div>
                <div class="n-cardContent">
                  <h5
                    class="card-title d-flex justify-content-center"
                    style={{
                      color: "#23262F",
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontWeight: "500",
                      lineHeight: "24px",
                      marginBottom: "16px",
                    }}
                  >
                    Earn yield
                  </h5>
                  <p
                    class="card-text"
                    style={{
                      color: "#777E91",
                      textAlign: "center",
                      fontSize: "14px",
                      fontWeight: "normal",
                      lineHeight: "24px",
                      fontFamily: "Poppins",
                    }}
                  >
                    We realize ideas from simple to complex, everything becomes
                    easy to use and reach the most potential customers.
                  </p>
                  <div class="d-flex justify-content-center">
                    <Link
                      to={browserRoute.EARNYIELD}
                      class="align-items-center n-secondaryButton"
                      style={{ textDecoration: "none" }}
                    >
                      Earn now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="n-cryptoReadMore">
            <button
              type="button"
              class="d-flex justify-content-center n-primaryButton"
            >
              Read more
            </button>
          </div>
        </div>
      </section>
      <section style={{ backgroundColor: "#FCFCFD" }}>
        <div class="container n-getStartedSection">
          <h2
            class="d-flex justify-content-center"
            style={{
              color: "#23262F",
              fontWeight: "700",
              fontFamily: "DM Sans",
              fontSize: "48px",
              lineHeight: "56px",
              marginBottom: "20px",
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
              fontWeight: "normal",
              lineHeight: "24px",
              marginBottom: "80px",
            }}
          >
            Suipe supports a variety of the most popular digital currencies.
          </p>
          <div class="d-flex justify-content-center n-desktopFullImage">
            <img class="imagewidth" src={Images.Wallet} />
          </div>
          <div class="row">
            <div class="col-lg-4">
              <div class="d-flex justify-content-center n-tradingSteps">
                <img src={Images.stepOne} />
              </div>
              <h2 class="d-flex justify-content-center minutstart">
                Trade assets
              </h2>
              <p
                // style={{ textAlign: "center",color:"#353945",fontWeight:"600" }}
                class="d-flex justify-content-center mintparagraph"
              >
                Trade assets cross-chain fully
                <br /> decentralized without warpped
                <br /> tokens
              </p>
            </div>
            <div class="col-lg-4">
              <div class="d-flex justify-content-center n-tradingSteps">
                <img src={Images.stepTwo} />
              </div>
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
              <div class="d-flex justify-content-center n-tradingSteps">
                <img src={Images.stepThree} />
              </div>
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
      <section ref={myRef}>
        <section style={{ backgroundColor: "#FCFCFD" }} class="container">
          <div class="row">
            <div class="col-md-12 n-learnSection">
              <div class="n-learnHeading">
                <h2 class="markettrend">Learn about DeFi</h2>
                <Link to={browserRoute.LEARN}>
                  <button
                    style={{ fontWeight: "bold" }}
                    type="button"
                    class="n-secondaryButton n-ButtonResponsive"
                  >
                    View more
                  </button>
                </Link>
              </div>
              <div id="tabsContent" class="tab-content">
                <div id="home1" class="tab-pane fade active show">
                  <section className="u-mainhomesection788882">
                    <div class="container px-0">
                      <div class="row">
                        <div class="col-lg-6">
                          <img
                            className="imagebannnerssss"
                            src={Images.Img}
                            width="100%"
                          />
                          <div class="n-articleButton n-ButtonResponsive">
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
                            <Link to={browserRoute.LEARN}>
                              <button
                                type="button"
                                class="n-secondaryButton n-ButtonResponsive"
                                style={{ float: "right" }}
                              >
                                Learn more
                                <svg
                                  width="4"
                                  height="6"
                                  viewBox="0 0 4 6"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M0.528596 0.195262C0.268246 0.455612 0.268246 0.877722 0.528596 1.13807L2.39052 3L0.528596 4.86193C0.268246 5.12228 0.268246 5.54439 0.528596 5.80474C0.788945 6.06509 1.21106 6.06509 1.4714 5.80474L3.80474 3.4714C4.06509 3.21106 4.06509 2.78895 3.80474 2.5286L1.4714 0.195262C1.21106 -0.0650874 0.788945 -0.0650874 0.528596 0.195262Z"
                                    fill="#777e90"
                                  />
                                </svg>
                                {/* <img
          </section>
          <section style={{ backgroundColor: "#FCFCFD" }} ref={myRef}>
            <section style={{ backgroundColor: "#FCFCFD" }} class="container">
              <div class="row">
                <div class="col-md-12 n-learnSection">
                  <div class="n-learnHeading">
                    <h2 class="markettrend">Learn about DeFi</h2>
                    <Link to={browserRoute.LEARN}>
                      <button
                        style={{ fontWeight: "bold" }}
                        type="button"
                        class="btn n-secondaryButton n-ButtonResponsive"
                      >
                        View more
                      </button>
                    </Link>
                  </div>
                  <div id="tabsContent" class="tab-content">
                    <div id="home1" class="tab-pane fade active show">
                      <section style={{ backgroundColor: "#FCFCFD" }}>
                        <div class="container px-0">
                          <div class="row">
                            <div class="col-lg-6">
                              <img
                                className="imagebannnerssss"
                                src={Images.Img}
                                width="100%"
                              />
                              <div class="n-articleButton n-ButtonResponsive">
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
                                <Link to={browserRoute.LEARN}>
                                  <button
                                    type="button"
                                    class="btn n-secondaryButton n-ButtonResponsive"
                                    style={{ float: "right" }}
                                  >
                                    Learn more
                                    <svg
                                      width="4"
                                      height="6"
                                      viewBox="0 0 4 6"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M0.528596 0.195262C0.268246 0.455612 0.268246 0.877722 0.528596 1.13807L2.39052 3L0.528596 4.86193C0.268246 5.12228 0.268246 5.54439 0.528596 5.80474C0.788945 6.06509 1.21106 6.06509 1.4714 5.80474L3.80474 3.4714C4.06509 3.21106 4.06509 2.78895 3.80474 2.5286L1.4714 0.195262C1.21106 -0.0650874 0.788945 -0.0650874 0.528596 0.195262Z"
                                        fill="#000000"
                                      />
                                    </svg>
                                    {/* <img
                                    class="pl-3"
                                    style={{ paddingTop: "6px" }}
                                    src={Images.moreright}
                                  /> */}
                              </button>
                            </Link>
                          </div>
                          <p className="date-classhomess">
                            Good things come in 3s. Get 3x Leveraged tokens now.
                          </p>
                        </div>
                        <div class="col-lg-6 n-articleCardList">
                          <div class="d-flex flex-row justify-content-between">
                            <div class="n-articleDetails">
                              <h2>Leveraged tokens now available</h2>
                              <p class="n-articleDesc">
                                Good things come in 3s. Get 3x Leveraged tokens
                                now.
                              </p>
                              <p className="date-classhome">Jun 1, 2021</p>
                            </div>
                            <div>
                              <img
                                src={Images.firstarticle}
                                width="100%"
                                height="100%"
                              />
                            </div>
                          </div>
                          <div
                            class="d-flex flex-row justify-content-between"
                            style={{ marginTop: "32px" }}
                          >
                            <div class="n-articleDetails">
                              <h2>Leveraged tokens now available</h2>
                              <p class="n-articleDesc">
                                Good things come in 3s. Get 3x Leveraged tokens
                                now.
                              </p>
                              <p className="date-classhome">Jun 1, 2021</p>
                            </div>
                            <div>
                              <img
                                src={Images.secondarticle}
                                width="100%"
                                height="100%"
                              />
                            </div>
                          </div>
                          <div
                            class="d-flex flex-row justify-content-between"
                            style={{ marginTop: "32px" }}
                          >
                            <div class="n-articleDetails">
                              <h2>Leveraged tokens now available</h2>
                              <p class="n-articleDesc">
                                Good things come in 3s. Get 3x Leveraged tokens
                                now.
                              </p>
                              <p className="date-classhome">Jun 1, 2021</p>
                            </div>
                            <div>
                              <img
                                src={Images.thirdarticle}
                                width="100%"
                                height="100%"
                              />
                            </div>
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
    </div>
  );
};
export default withMainLayout(HeroHome);
