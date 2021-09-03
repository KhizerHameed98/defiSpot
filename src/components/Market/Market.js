import React from "react";
import withMainLayout from "../HOC/withMainLayout";
import btc1 from "../../assets/images/btc1.png";
import Img from "../Helper/AllImages";
import btc2 from "../../assets/images/btc2.png";
import btc3 from "../../assets/images/btc3.png";
import btc4 from "../../assets/images/btc4.png";
import btc5 from "../../assets/images/btc5.png";
import btc6 from "../../assets/images/btc6.png";
import btc7 from "../../assets/images/btc7.png";
import btc8 from "../../assets/images/btc8.png";
import btc9 from "../../assets/images/btc9.png";
import btc10 from "../../assets/images/btc10.png";
import market from "../../assets/images/market.png";
import btc from "../../assets/images/btc.png";
import crt1 from "../../assets/images/crt1.png";
import crt2 from "../../assets/images/crt2.png";
import comp from "../../assets/images/comp.png";
import assest from "../../assets/images/assest.png";
import Yield from "../../assets/images/yield.png";
import Images from "../Helper/AllImages";
const Market = () => {
  return (
    <div>
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
                <p>
                  The global crypto market cap is{" "}
                  <span style={{ fontWeight: "bold" }}>$1.86T</span>
                </p>
              </div>
            </div>
            <div class="col-lg-6">
              <img style={{ width: "700px" }} src={Images.market} />
            </div>
          </div>
          <div class="row bitcoinclasss">
            <div class="col-lg-4 pt-4">
              <div class="d-flex">
                <img
                  style={{ width: "30px", height: "30px" }}
                  src={Images.btc}
                />
                <div style={{ paddingLeft: "12px" }}>
                  <p class="marketparagraph">
                    BTC/USDT <span class="spanclassmarket">+0.79%</span>
                  </p>
                  <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                    36,641.20
                  </p>
                  <p>36,64120</p>
                </div>
                <div style={{ paddingLeft: "7px" }}>
                  <img src={Images.crt1} />
                </div>
              </div>
            </div>
            <div class="col-lg-4 pt-4">
              <div class="d-flex">
                <img
                  style={{ width: "30px", height: "30px" }}
                  src={Images.btc}
                />
                <div style={{ paddingLeft: "12px" }}>
                  <p class="marketparagraph">
                    BTC/USDT <span class="spanclassmarket">+0.79%</span>
                  </p>
                  <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                    36,641.20
                  </p>
                  <p>36,64120</p>
                </div>
                <div style={{ paddingLeft: "7px" }}>
                  <img src={Images.crt1} />
                </div>
              </div>
            </div>
            <div class="col-lg-4 pt-4">
              <div class="d-flex">
                <img
                  style={{ width: "30px", height: "30px" }}
                  src={Images.btc}
                />
                <div style={{ paddingLeft: "12px" }}>
                  <p class="marketparagraph">
                    ATC/USDT <span class="spanclassmarket">+0.79%</span>
                  </p>
                  <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                    36,641.20
                  </p>
                  <p>36,64120</p>
                </div>
                <div style={{ paddingLeft: "7px" }}>
                  <img src={Images.crt1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="container pt-5">
          <div class="d-flex justify-content-between">
            <ul class="list-unstyled d-flex">
              <li class="alltype">
                <a href="#" style={{ color: "#fff" }}>
                  All type{" "}
                </a>
              </li>
              <li class="pl-3 pt-2 marketparagraph">
                <a href="#" style={{ color: "#777E90" }}>
                  Native
                </a>
              </li>
              <li class="pl-3 pt-2 marketparagraph">
                <a style={{ color: "#777E90" }} href="#">
                  Erc-20
                </a>
              </li>
              <li class="pl-3 pt-2 marketparagraph">
                <a style={{ color: "#777E90" }} href="#">
                  BEP2
                </a>
              </li>
            </ul>
            <form>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search after coin.."
                />
                <div class="input-group-btn">
                  <button class="btn btn-default" type="submit">
                    <i class="glyphicon glyphicon-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">24h %</th>
                  <th scope="col">7d %</th>
                  <th scope="col">Marketcap $</th>
                  <th scope="col">Volume(24h)</th>
                  <th scope="col">Chart</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <div class="d-flex ">
                      <img style={{ width: "25px" }} src={Images.btc1} />
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
                  <td>
                    <img src={Images.crt1} />
                  </td>
                </tr>
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
                  <td>
                    <img src={Images.crt1} />
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
                  <td>
                    <img src={Images.crt1} />
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
                  <td>
                    <img src={Images.crt2} />
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
                  <td>
                    <img src={Images.crt1} />
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
                  <td>
                    <img src={Images.crt1} />
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
                  <td>
                    <img src={Images.crt2} />
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
                  <td>
                    <img src={Images.crt1} />
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
                  <td>
                    <img src={Images.crt2} />
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
                  <td>
                    <img src={Images.crt1} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section>
        <div class="container mt-5 mb-5">
          <div>
            <h2 class="d-flex justify-content-center marketmainheade">
              Learn about DeFi
            </h2>
            <p class="d-flex justify-content-center">
              Browse our library of resources to learn more about DeFi and how
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
                  <p class="cardtext pt-4">
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
                  <p class="cardtext pt-4">
                    The biggest adventages of decentralized
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
                  <p class="cardtext pt-4">
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
          Load more
        </button>
      </div>
    </div>
  );
};

export default withMainLayout(Market);
