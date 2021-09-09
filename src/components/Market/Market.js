import React from "react";
import withMainLayout from "../HOC/withMainLayout";
import { Link } from "react-router-dom";
import Images from "../Helper/AllImages";
import browserRoute from "../../Routes/browserRoutes";
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
                <div style={{ paddingLeft: "10px" }}>
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
                <div style={{ paddingLeft: "10px" }}>
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
                <div style={{ paddingLeft: "10px" }}>
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
            <div class=" d-flex form-group has-search">
              <input type="text" class="form-control" placeholder="Search" />
              <span
                style={{ paddingTop: "10px", marginLeft: "-22px" }}
                class=" fa fa-search form-control-feedback"
              ></span>
            </div>
            {/* <form>
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
            </form> */}
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
                  <th scope="col">
                    Volume(24h)
                    <img class="pl-2" src={Images.hourr} />
                  </th>
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
          <i class="mr-2 fa fa-spinner"></i>
          Load more
        </button>
      </div>
    </div>
  );
};

export default withMainLayout(Market);
