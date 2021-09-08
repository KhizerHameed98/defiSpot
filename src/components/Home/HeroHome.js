import React from "react";
import withMainLayout from "../HOC/withMainLayout";
import Images from "../Helper/AllImages";
import { Link } from "react-router-dom";
import browserRoute from "../../Routes/browserRoutes";
export const HeroHome = () => {
  return (
    <div>
      <section>
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="marketbanner">
                <h2 class="marketbannerhed">
                  Buy & sell <br />
                  Crypto in minutes
                </h2>
                <p>
                  Trade Bitcoinn,Ethereum, USDT,and the top altcoins on the
                  legendray
                  <br /> crypto asset exchange{" "}
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
          <div class="row bitcoinclasssmian">
            <div class="col-lg-3 pt-4 pb-4">
              <div class="pt-3 mainhover">
                <img style={{ paddingLeft: "15px" }} src={Images.btc} />
                <div style={{ paddingLeft: "12px" }}>
                  <p class="marketparagraph pt-1">
                    BTC/USDT <span class="spanclassmarkets">-0.79%</span>
                  </p>
                  <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                    36,641.20
                  </p>
                  <p>36,64120</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 pt-4 pb-4">
              <div class="pt-3 mainhover">
                <img style={{ paddingLeft: "15px" }} src={Images.btc} />
                <div style={{ paddingLeft: "12px" }}>
                  <p class="marketparagraph pt-1">
                    BTC/USDT <span class="spanclassmarket">+0.79%</span>
                  </p>
                  <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                    36,641.20
                  </p>
                  <p>36,64120</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 pt-4 pb-4">
              <div class="pt-3 mainhover">
                <img style={{ paddingLeft: "15px" }} src={Images.btc} />
                <div style={{ paddingLeft: "12px" }}>
                  <p class="marketparagraph pt-1">
                    BTC/USDT <span class="spanclassmarket">+0.79%</span>
                  </p>
                  <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                    36,641.20
                  </p>
                  <p>36,64120</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 pt-4 pb-4">
              <div class="pt-3 mainhover">
                <img style={{ paddingLeft: "15px" }} src={Images.btc} />
                <div style={{ paddingLeft: "12px" }}>
                  <p class="marketparagraph pt-1">
                    BTC/USDT <span class="spanclassmarket">+0.79%</span>
                  </p>
                  <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                    36,641.20
                  </p>
                  <p>36,64120</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="container mt-5">
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
                  <tr>
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
                      <div class="btn tradingbutton">Trade</div>
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
                      <div class="btn tradingbutton">Trade</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="d-flex flex-column">
                        <div>3</div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex ">
                        <img src={Images.btc} />
                        <div class="pt-2 pl-3">Bitcoin Cash</div>
                        <div class="d-flex align-items-center">
                          <div class="pl-2 text-muted">BCH</div>
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
                          <b class="percentage">+1.20%</b>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="graph">
                        {" "}
                        <img src={Images.crt3} alt="" />
                        <div class="dot"></div>
                      </div>
                    </td>
                    <td>
                      <div class="btn tradingbutton">Trade</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="d-flex flex-column">
                        <div>4</div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex ">
                        <img src={Images.btc} />
                        <div class="pt-2 pl-3">Ripple</div>
                        <div class="d-flex align-items-center">
                          <div class="pl-2 text-muted">XRP</div>
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
                        <img src={Images.crt4} alt="" />
                        <div class="dot"></div>
                      </div>
                    </td>
                    <td>
                      <div class="btn tradingbutton">Trade</div>
                    </td>
                  </tr>
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
              <div class="card">
                <img
                  class="card-img-top"
                  src={Images.comp}
                  alt="Card image cap"
                />
                <div class="card-body">
                  <h5 class="card-title d-flex justify-content-center">
                    Buy & Sell Crypto
                  </h5>
                  <p class="card-text">
                    We realize ideas from simple to complex, everything becomes
                    easy to use and reach the most potential customers.
                  </p>
                  <a
                    href="#"
                    class="btn btn-primary d-flex justify-content-center"
                  >
                    Buy crypto
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="card">
                <img
                  class="card-img-top"
                  src={Images.assest}
                  alt="Card image cap"
                />
                <div class="card-body">
                  <h5 class="card-title d-flex justify-content-center">
                    Trade Assets
                  </h5>
                  <p class="card-text">
                    We realize ideas from simple to complex, everything becomes
                    easy to use and reach the most potential customers.
                  </p>
                  <a
                    href="#"
                    class="btn btn-primary d-flex justify-content-center"
                  >
                    Trade now{" "}
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="card">
                <img
                  class="card-img-top"
                  src={Images.Yield}
                  alt="Card image cap"
                />
                <div class="card-body">
                  <h5 class="card-title d-flex justify-content-center">
                    Earn yield
                  </h5>
                  <p class="card-text">
                    We realize ideas from simple to complex, everything becomes
                    easy to use and reach the most potential customers.
                  </p>
                  <a
                    href="#"
                    class="btn btn-primary d-flex justify-content-center"
                  >
                    Earn now
                  </a>
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
      <section>
        <div class="container mt-5">
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
              <p class="d-flex justify-content-center mintparagraph">
                Trade assets cross-chain fully
                <br /> decentralized without warpped tokens
              </p>
            </div>
            <div class="col-lg-4">
              <h2 class="d-flex justify-content-center minutstart">
                Connect wallet
              </h2>
              <p class="d-flex justify-content-center mintparagraph">
                Simply connect your wallet without
                <br /> any need of KYC
              </p>
            </div>
            <div class="col-lg-4">
              <h2 class="d-flex justify-content-center minutstart">
                Earn yield
              </h2>
              <p class="d-flex justify-content-center mintparagraph">
                Provide liquidity to one of our pools
                <br /> to earn passive income
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="container mt-5"></div>
      </section>
      <section class="container py-4">
        <div class="row">
          <div class="col-md-12">
            <div class="d-flex justify-content-between">
              <h2 class="markettrend">Learn crypto</h2>
              <button type="button" class="btn cryptobutton">
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
                        <div class="d-flex justify-content-between pt-5">
                          <h2>Leveraged tokens now available</h2>
                          <button type="button" class="btn cryptobutton">
                            View more
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
                            Good things come in 3s. Get 3x Leveraged tokens now.
                          </p>
                          <p>Jun 1, 2021</p>
                        </div>
                        <div class="pt-5">
                          <h2 style={{ fontSize: "18px" }}>
                            Leveraged tokens now available
                          </h2>
                          <p>
                            Good things come in 3s. Get 3x Leveraged tokens now.
                          </p>
                          <p>Jun 1, 2021</p>
                        </div>
                        <div class="pt-5">
                          <h2 style={{ fontSize: "18px" }}>
                            Leveraged tokens now available
                          </h2>
                          <p>
                            Good things come in 3s. Get 3x Leveraged tokens now.
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
    </div>
  );
};
export default withMainLayout(HeroHome);
