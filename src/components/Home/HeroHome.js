import React, { useState, useEffect } from "react";
import withMainLayout from "../HOC/withMainLayout";
import { Link } from "react-router-dom";
import browserRoute from "../../Routes/browserRoutes";
import Images from "../Helper/AllImages";
import { MidgardPool_Action } from "../../Redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import Graph from "../GraphChart/index";


export const HeroHome = () => {
  const dispatch = useDispatch();
  const [poolData, setPoolData] = useState([]);
  const [loading, setLoading] = useState(true);
  const mainState = useSelector((state) => state.main);
  // const [state, setstte] = useState({ name: "ali", age: "20", no: "1028505852" });

  useEffect(async () => {
    await dispatch(MidgardPool_Action({ setLoading, setPoolData }));
  }, []);
 
  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  return (
    <div>
      {loading ? (
        <div style={{ justifyContent: "center", marginLeft: "40%" }}>
          <Loader />
        </div>
      ) : (
        <>
          <section style={{backgroundColor:"#FCFCFD"}}>
            <div class="container">
              <div class="row">
                <div class="col-lg-6">
                  <div class="marketbanner">
                    <h2 class="marketbannerhed">
                      Buy & sell <br />
                      crypto in minutes
                    </h2>
                    <p style={{color:"#777E90",fontSize:"16px",fontFamily:"poppins",fontWeight:"300"}}>
                      Trade Bitcoin, Ethereum, USDT, and the top altcoins on the
                      legendary
                      <br /> crypto asset exchange.{" "}
                    </p>
                    <Link to={browserRoute.MARKET}>
                      <button type="button" class="btn btn-primary">
                        Get Started now
                      </button>
                    </Link>
                  </div>
                  <img class="pt-5" src={Images.lorarrow} />
                </div>
                <div class="col-lg-6">
                  <img style={{ width: "700px" }} src={Images.mainbanneri} />
                </div>
              </div>
              {/*loop started*/}

              <div class="row bitcoinclasssmian">
                {poolData ? (
                  <>
                    {poolData.slice(0, 4).map((d, key) => {
                      return (
                        <>
                          <div class="col-lg-3 pt-4 pb-4">
                            <div class="pt-3 mainhover">
                              <img
                                style={{ paddingLeft: "15px" }}
                                src={Images.btc}
                              />
                              <div style={{ paddingLeft: "12px" }}>
                                <p class="marketparagraph pt-1">
                                  {d.asset}/USDT
                                  <span class="spanclassmarket">+0.79%</span>
                                </p>
                                <p
                                  style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {financial(d.assetPriceUSD)}
                                </p>
                                <p> {financial(d.assetPriceUSD)}</p>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : null}
              </div>

              {/*loop ended */}
            </div>
          </section>
          <section style={{backgroundColor:"#FCFCFD"}}>
            <div class="container pt-5">
              <div class="d-flex justify-content-between">
                <h2 class="markettrend">Market trend</h2>
                <Link to={browserRoute.MARKET}>
                  <button class="btn marketbutton">Go to market</button>
                </Link>
              </div>

              <div id="starred" class="bg-white px-2 pt-1 mt-5">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">24h chnage</th>
                        <th scope="col">Chart</th>
                        <th scope="col">Trade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <tr>
                        <td>
                          <div class="d-flex flex-column">
                            <div>1</div>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex ">
                            <img src={Images.btc} />
                            <div class="pt-2 pl-3">Bitcoin</div>
                            <div class="d-flex align-items-center">
                              <div class="pl-2 text-muted">BTC</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex flex-column">
                            <div>
                              <b>$146,169,768.00</b>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex flex-column">
                            <div>
                              <b class="percentage">+2.04%</b>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="graph">
                            <img src={Images.crt1} alt="" />
                            <div class="dot"></div>
                          </div>
                        </td>
                        <td>
                          <Link to={browserRoute.BUYMARKET}>
                            <div class="btn tradingbutton">Trade</div>
                          </Link>{" "}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="d-flex flex-column">
                            <div>2</div>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex ">
                            <img src={Images.btc} />
                            <div class="pt-2 pl-3">Ethereum</div>
                            <div class="d-flex align-items-center">
                              <div class="pl-2 text-muted">ETH</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex flex-column">
                            <div>
                              <b>$146,169,768.00</b>
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
                        <td>
                          <div class="graph">
                            {" "}
                            <img src={Images.crt2} alt="" />
                            <div class="dot"></div>
                          </div>
                        </td>
                        <td>
                          <Link to={browserRoute.BUYMARKET}>
                            <div class="btn tradingbutton">Trade</div>
                          </Link>{" "}
                        </td>
                      </tr> */}
                      {poolData ? (
                        <>
                          {poolData.slice(0, 10).map((d, key) => {
                            return (
                              <>
                                <tr>
                                  <td>
                                    <div class="d-flex flex-column">
                                      <div>{key + 1}</div>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="d-flex ">
                                      <img src={Images.btc} />
                                      <div class="pt-2 pl-3">{d.asset}</div>
                                      <div class="d-flex align-items-center">
                                        <div class="pl-2 text-muted">
                                          {d.blockchain}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="d-flex flex-column">
                                      <div>
                                        <b>${financial(d.assetPriceUSD)}</b>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="d-flex flex-column">
                                      <div>
                                        <b class="percentage">+2.04%</b>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="graph">
                                      <img src={Images.crt1} alt="" />
                                      {/* <Graph /> */}

                                      <div class="dot"></div>
                                    </div>
                                  </td>
                                  <td>
                                    <Link to={browserRoute.BUYMARKET}>
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
                <h2 class="d-flex justify-content-center">
                  Become a crypto
                  <br />
                  trader in seconds
                </h2>
                <p class="d-flex justify-content-center">
                  We've got everything you need to start trading.
                </p>
              </div>
              <div class="row">
                <div class="col-lg-4">
                  <div class="card" style={{border:"none",borderRadius:"25px"}}>
                    <img
                      class="card-img-top"
                      src={Images.comp}
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h5 class="card-title d-flex justify-content-center"  style={{color:"#23262F"}}>
                        Buy & Sell Crypto
                      </h5>
                      <p class="card-text" style={{color:"#777E90",textAlign:"center",fontSize:"15px",fontFamily:"sans-serif"}}>
                        We realize ideas from simple to complex, everything
                        becomes easy to use and reach the most potential
                        customers.
                      </p>
                      <div class="d-flex justify-content-center">
                        <a
                          style={{
                            border: "1px solid lightgrey",
                            color:"#23262F",
                            paddingLeft: "15px",
                            paddingRight: "15px",
                            paddingTop: "5px",
                            paddingBottom: "8px",
                            fontWeight:"bold",
                            borderRadius: "20px",
                            textDecoration: "none",
                          }}
                          href="#"
                          class="btn-outline-secondary"
                        >
                          Buy crypto
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="card" style={{border:"none",borderRadius:"25px"}}>
                    <img
                      class="card-img-top"
                      src={Images.assest}
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h5 class="card-title d-flex justify-content-center"  style={{color:"#23262F"}}>
                        Trade Assets
                      </h5>
                      <p class="card-text" style={{color:"#777E90",textAlign:"center",fontSize:"15px",fontFamily:"sans-serif"}}>
                        We realize ideas from simple to complex, everything
                        becomes easy to use and reach the most potential
                        customers.
                      </p>
                      <div class="d-flex justify-content-center">
                        <a
                          style={{
                            border: "1px solid lightgrey",
                            color:"#23262F",
                            paddingLeft: "15px",
                            paddingRight: "15px",
                            paddingTop: "5px",
                            paddingBottom: "8px",
                            fontWeight:"bold",
                            borderRadius: "20px",
                            textDecoration: "none",
                          }}
                          href="#"
                          class="btn-outline-secondary"
                        >
                          Trade now{" "}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="card" style={{border:"none",borderRadius:"25px"}}>
                    <img
                      class="card-img-top"
                      src={Images.Yield}
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h5 class="card-title d-flex justify-content-center" style={{color:"#23262F"}}>
                        Earn yield
                      </h5>
                      <p class="card-text" style={{color:"#777E90",textAlign:"center",fontSize:"15px",fontFamily:"sans-serif"}}>
                        We realize ideas from simple to complex, everything
                        becomes easy to use and reach the most potential
                        customers.
                      </p>
                      <div class="d-flex justify-content-center">
                        <a
                          style={{
                            border: "1px solid lightgrey",
                            color:"#23262F",
                            paddingLeft: "15px",
                            paddingRight: "15px",
                            paddingTop: "5px",
                            paddingBottom: "8px",
                            fontWeight:"bold",
                            borderRadius: "20px",
                            textDecoration: "none",
                          }}
                          href="#"
                          class="btn-outline-secondary"
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
                  type="button"
                  class="btn btn-primary d-flex justify-content-center"
                >
                  Read more
                </button>
              </div>
            </div>
          </section>
          <section style={{backgroundColor:"#FCFCFD"}}>
            <div class="container pt-5">
              <h2 class="d-flex justify-content-center">
                Get started in a few minutes
              </h2>
              <p class="d-flex justify-content-center">
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
                  <p style={{textAlign:"center"}} class="d-flex justify-content-center mintparagraph">
                    Trade assets cross-chain fully
                    <br /> decentralized without warpped tokens
                  </p>
                </div>
                <div class="col-lg-4">
                  <h2 class="d-flex justify-content-center minutstart">
                    Connect wallet
                  </h2>
                  <p style={{textAlign:"center"}} class="d-flex justify-content-center mintparagraph">
                    Simply connect your wallet without
                    <br /> any need of KYC
                  </p>
                </div>
                <div class="col-lg-4">
                  <h2 class="d-flex justify-content-center minutstart">
                    Earn yield
                  </h2>
                  <p style={{textAlign:"center"}} class="d-flex justify-content-center mintparagraph">
                    Provide liquidity to one of our pools
                    <br /> to earn passive income
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section style={{backgroundColor:"#FCFCFD"}}>
            <div class="container pt-5"></div>
          </section>
          <section class="container py-4" >
            <div class="row">
              <div class="col-md-12">
                <div>
                  <h2 class="markettrend">Learn about Defi</h2>
                  <button style={{fontWeight:"bold"}} type="button" class="btn cryptobutton">
                    View more
                  </button>
                </div>

                <br />
                <div id="tabsContent" class="tab-content">
                  <div id="home1" class="tab-pane fade active show">
                    <section>
                      <div class="container">
                        <div class="row">
                          <div class="col-lg-6">
                            <img src={Images.Img} />
                            <div class="   pt-5">
                              <h2 style={{ fontSize: "25px" }}>
                                Leveraged tokens<br/> now available
                              </h2>
                              <button  type="button" class="btn cryptobutton d-flex justify-content-end">
                                Learn more
                                <img class="pl-3" style={{paddingTop:"11px"}} src={Images.moreright}/>
                              </button>
                            </div>
                            <p>
                              Good things come in 3s. Get 3x Leveraged
                              <br /> tokens now.
                            </p>
                          </div>
                          <div class="col-lg-3">
                            <div class="pt-5">
                              <h2 style={{ fontSize: "18px" }}>
                                Leveraged tokens now available
                              </h2>
                              <p>
                                Good things come in 3s. Get 3x Leveraged tokens
                                now.
                              </p>
                              <p>Jun 1, 2021</p>
                            </div>
                            <div class="pt-5">
                              <h2 style={{ fontSize: "18px" }}>
                                Leveraged token now available
                              </h2>
                              <p>
                                Good things come in 3s. Get 3x Leveraged tokens
                                now.
                              </p>
                              <p>Jun 1, 2021</p>
                            </div>
                            <div class="pt-5">
                              <h2 style={{ fontSize: "18px" }}>
                                Leveraged tokens now available
                              </h2>
                              <p>
                                Good things come in 3s. Get 3x Leveraged tokens
                                now.
                              </p>
                              <p>Jun 1, 2021</p>
                            </div>
                          </div>
                          <div class="col-lg-3">
                            <div>
                              <img src={Images.cr1} />
                            </div>
                            <div class="pt-2">
                              <img src={Images.cr2} />
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
        </>
      )}
    </div>
  );
};
export default withMainLayout(HeroHome);
