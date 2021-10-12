import React from "react";
import Images from "../Helper/AllImages";
import withMainLayout from "../HOC/withMainLayout";
import { AddLiquidity } from "../PopModals/AddLiquidity_Modal";
const EarnYield = () => {
  return (
    <>
      <section style={{ backgroundColor: "#C0E1FF" }}>
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="marketbanner">
                <h2 class="marketbannerhed">Earn Yield now</h2>
                <p style={{ fontSize: "24px", fontFamily: "Poppins",fontWeight:"400" }}>
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
              <li class="alltype">
                <a style={{ color: "#fff" }} href="#">
                  All type{" "}
                </a>
              </li>
              <li class="pl-3 pt-2 marketparagraph">
                <a style={{ color: "#777E90" }} href="#">
                  Native
                </a>
              </li>
              <li class="pl-3 pt-2 marketparagraph">
                <a style={{ color: "#777E90" }} href="#">
                  ERC-20
                </a>
              </li>
              <li class="pl-3 pt-2 marketparagraph">
                <a style={{ color: "#777E90" }} href="#">
                  BEP2
                </a>
              </li>
            </ul>
            <form className="pr-5">
            <div class=" d-flex form-group has-search">
              <input
                style={{
                  borderRadius: "10px",
                  width: "300px",
                  fontFamily: "DM Sans",
                  backgroundColor:"#fcfcfd"
                }}
                type="text"
                class="form-control"
                placeholder="Search after pool.."
              />
              <span
                style={{ paddingTop: "10px", marginLeft: "-22px" }}
                class=" fa fa-search form-control-feedback"
              ></span>
            </div>
          </form>
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
                  <th
                    style={{border:"none",color:"#777E90",fontFamily:"Poppins",fontSize:"12px ",fontWeight:"600"}}
                    scope="col"
                  >
                    Name <img class="pl-1" src={Images.nameup}/>
                  </th>
                  <th
                    style={{border:"none",color:"#777E90",fontFamily:"Poppins",fontSize:"12px ",fontWeight:"600"}}
                    scope="col"
                  >
                    APY <img class="pl-1" src={Images.nameup}/>
                  </th>
                  <th
                    style={{border:"none",color:"#777E90",fontFamily:"Poppins",fontSize:"12px ",fontWeight:"600"}}
                    scope="col"
                  >
                    Liquidity <img class="pl-1" src={Images.nameup}/>
                  </th>
                  <th
                    style={{border:"none",color:"#777E90",fontFamily:"Poppins",fontSize:"12px ",fontWeight:"600"}}
                    scope="col"
                  >
                    Volume(24h)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="d-flex ">
                      <img
                        class="mt-1"
                        style={{ width: "35px", height: "35px" }}
                        src={Images.goll}
                      />
                      <div class="d-block pl-3">
                        <div  style={{ paddingLeft: "5px", fontWeight: "bold",fontFamily:"Poppins",fontSize:"14px",fontWeight:"400" }}>
                          BTC
                        </div>
                        <div class="d-flex align-items-center">
                          <div class="pl-1 text-muted">Native</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <span class="depositclasss">17% APR </span>
                    </div>
                  </td>
                  <td className="earnyield-value">$10,098.36</td>
                  <td className="earnyield-value">$10,098.36</td>
                  <td>
                    {" "}
                    <AddLiquidity />
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="d-flex ">
                      <img
                        class="mt-1"
                        style={{ width: "35px", height: "35px" }}
                        src={Images.goll}
                      />
                      <div class="d-block pl-3">
                        <div  style={{ paddingLeft: "5px", fontWeight: "bold",fontFamily:"Poppins",fontSize:"14px",fontWeight:"400" }}>
                          XRUNE
                        </div>
                        <div class="d-flex align-items-center">
                          <div class="pl-1 text-muted">Native</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <span class="depositclasss">17% APR</span>
                    </div>
                  </td>
                  <td className="earnyield-value">$10,098.36</td>
                  <td className="earnyield-value">$10,098.36</td>
                  <td>
                    {" "}
                    <AddLiquidity />
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="d-flex ">
                      <img
                        class="mt-1"
                        style={{ width: "35px", height: "35px" }}
                        src={Images.goll}
                      />
                      <div class="d-block pl-3">
                        <div  style={{ paddingLeft: "5px", fontWeight: "bold",fontFamily:"Poppins",fontSize:"14px",fontWeight:"400" }}>
                          ETH
                        </div>
                        <div class="d-flex align-items-center">
                          <div class="pl-1 text-muted">Native</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <span class="depositclasss">17% APR</span>
                    </div>
                  </td>
                  <td className="earnyield-value">$10,098.36</td>
                  <td className="earnyield-value">$10,098.36</td>
                  <td>
                    {" "}
                    <AddLiquidity />
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="d-flex ">
                      <img
                        class="mt-1"
                        style={{ width: "35px", height: "35px" }}
                        src={Images.goll}
                      />
                      <div class="d-block pl-3">
                        <div  style={{ paddingLeft: "5px", fontWeight: "bold",fontFamily:"Poppins",fontSize:"14px",fontWeight:"400" }}>
                          BUSD
                        </div>
                        <div class="d-flex align-items-center">
                          <div class="pl-1 text-muted">Native</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <span class="depositclasss">17% APR</span>
                    </div>
                  </td>
                  <td className="earnyield-value">$10,098.36</td>
                  <td className="earnyield-value">$10,098.36</td>
                  <td>
                    {" "}
                    <AddLiquidity />
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="d-flex ">
                      <img
                        class="mt-1"
                        style={{ width: "35px", height: "35px" }}
                        src={Images.ttt}
                      />
                      <div class="d-block pl-3">
                        <div style={{ paddingLeft: "5px", fontWeight: "bold",fontFamily:"Poppins",fontSize:"14px",fontWeight:"400" }}>
                          BNB
                        </div>
                        <div class="d-flex align-items-center">
                          <div class="pl-1 text-muted">Native</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <span class="depositclasss">17% APR</span>
                    </div>
                  </td>
                  <td className="earnyield-value">$10,098.36</td>
                  <td className="earnyield-value">
                    {" "}
                    <div>$10,098.36</div>
                  </td>
                  <td>
                    {" "}
                    <AddLiquidity />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
                fontSize:"16px",
                fontWeight: "400",
                color: "#353945",
              }}
            >
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
                  <p  class="cardtext pt-4">
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
                  <p  class="cardtext pt-4">
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
                  <p  class="cardtext pt-4">
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
  );
};
export default withMainLayout(EarnYield);
