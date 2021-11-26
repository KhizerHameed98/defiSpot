import React from "react";
import withMainLayout from "../HOC/withMainLayout";
import { Link } from "react-router-dom";
import browserRoute from "../../Routes/browserRoutes";
import Images from "../Helper/AllImages";

const Learn = () => {
  return (
    <div>
      <section>
        <div class="container n-learnMain">
          <h2
            className="d-flex justify-content-center marketbannerhed"
            // style={{ marginTop: "80px" }}
          >
            Learn DeFi trading
          </h2>
          <p className="learnp111">
            A Beginner’s Guide to decentralized trading
          </p>
          <div
            style={{ marginTop: "32px" }}
            className="d-flex justify-content-center"
          >
            <button className="btn n-primaryButton">Learn now</button>
            <button className="btn n-secondaryButton ml-2">
              Video tutorial
            </button>
          </div>
          <div
            style={{ marginTop: "80px" }}
            className="d-flex flex-row flex-wrap justify-content-between  "
          >
            <p className="learnpage-234">Search anything about crypto</p>
            <div class=" d-flex form-group has-search mt-2 n-learnSearch">
              <input
                class="form-control n-tableSearch"
                // style={{}}
                type="text"
                placeholder="Search"
              />
              <img
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "-35px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
                src={Images.searchicon}
              />
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
          {/* <div style={{marginTop:"80px"}} className="d-flex justify-content-between mb-3">
            <p className="learnpage-234">Search anything about crypto</p>
            <img
              style={{ width: "48px", height: "48px" }}
              src={Images.learnsearch}
            />
          </div> */}
          <hr style={{ marginTop: "33px" }} class="solid" />
          <div style={{ marginTop: "48px" }} className="mb-3 n-learnDropLabels">
            <div class="dropdown n-learnSectionDropDown">
              <button
                class="btn btn-secondary234"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ fontWeight: "500" }}
              >
                Recently added
                <img className="pl-5 ml-5" src={Images.ButtonSecondarySmall} />
              </button>
              <div
                style={{ width: "100%", borderRadius: "10px", border: "2px solid #e6e8ec" }}
                class="dropdown-menu n-dropdownMenuShow"
                aria-labelledby="dropdownMenuButton"
              >
                <a class="dropdown-item n-dropDrownItem" href="#">
                  Action
                </a>
                <a class="dropdown-item n-dropDrownItem" href="#">
                  Another action
                </a>
                <a class="dropdown-item n-dropDrownItem" href="#">
                  Something else here
                </a>
              </div>
            </div>
            <ul className="list-unstyled n-learnFilterLabels">
              <li
                className="d-flex flex-row justify-content-center align-items-center"
                style={{ margin: "0 12px" }}
              >
                <button
                  className="alltype"
                  style={{ color: "#fff", fontFamily: "DM Sans" }}
                >
                  Tutorial
                </button>
              </li>
              <li
                className="d-flex flex-row justify-content-center align-items-center"
                style={{ margin: "0 12px" }}
              >
                <button
                  className="alltype-nonActive"
                  style={{
                    color: "#fff",
                    fontFamily: "DM Sans",
                    whiteSpace: "nowrap",
                  }}
                >
                  Liquidity providing
                </button>
              </li>
              <li
                className="d-flex flex-row justify-content-center align-items-center"
                style={{ margin: "0 12px" }}
              >
                <button
                  className="alltype-nonActive"
                  style={{ color: "#fff", fontFamily: "DM Sans" }}
                >
                  Trading
                </button>
              </li>
              <li
                className="d-flex flex-row justify-content-center align-items-center"
                style={{ margin: "0 12px" }}
              >
                <button
                  className="alltype-nonActive"
                  style={{ color: "#fff", fontFamily: "DM Sans" }}
                >
                  Wallet
                </button>
              </li>
            </ul>
          </div>
          {/* new section cards starts */}
          <section>
            <div style={{ marginTop: "64px" }} className="container">
              <div style={{ marginTop: "32px" }} className="row">
                <div className="col-lg-4 px-0">
                  <div class="card n-learnCards" style={{ border: "none" }}>
                    <img
                      className="u-learncardimage456"
                      src={Images.learnvideo}
                    />
                    <span className="spanclass-343">video tutorial</span>
                    <div class="card-body">
                      <div>
                        <div className="d-flex u-trainig0990carddde">
                          <img
                            style={{
                              position: "relative",
                              top: "2px",
                              width: "40px",
                              height: "40px",
                            }}
                            src={Images.trainer}
                          />
                          <div className="ml-2">
                            <h5 class="card-title cardtitle234">
                              Top 7 NFT usecase
                            </h5>
                            <div
                              className="d-flex"
                              style={{ position: "relative" }}
                            >
                              <p class="card-text pname4566">First name</p>
                              <p class="card-text pname4566 pl-2">Last name</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p
                          class="card-text pname456667"
                          style={{
                            fontWeight: "700",
                            padding: "8px 8px 6px 8px",
                            marginTop: "-60px",
                          }}
                        >
                          POPULAR
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 px-0 d-flex flex-column align-items-center">
                  <div class="card n-learnCards" style={{ border: "none" }}>
                    <Link to={browserRoute.INTRO_TO_LP}>
                      <img
                        className="u-learncardimage456"
                        src={Images.learnvideo}
                        // height="300px"
                      />
                      <span className="spanclass-343900">POPULAR</span>
                      <div class="card-body">
                        <div>
                          <div className="d-flex u-trainig0990carddde">
                            <img
                              style={{ width: "40px", height: "40px" }}
                              src={Images.traineravatar}
                            />
                            <div className="ml-2">
                              <h5 class="card-title cardtitle234">
                                Introduction to LP
                              </h5>
                              <p class="card-text pname4566">LP University</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p
                            class="card-text pname456667"
                            style={{
                              fontWeight: "700",
                              padding: "8px 8px 6px 8px",
                              marginTop: "-42px",
                            }}
                          >
                            POPULAR
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-4 px-0 d-flex flex-column align-items-end">
                  <div class="card n-learnCards" style={{ border: "none" }}>
                    <img
                      className="u-learncardimage456"
                      src={Images.learnvideo}
                    />
                    <span className="spanclass-343339">NEW</span>
                    <div class="card-body">
                      <div>
                        <div className="d-flex u-trainig0990carddde">
                          <img
                            style={{
                              position: "relative",
                              top: "2px",
                              width: "40px",
                              height: "40px",
                            }}
                            src={Images.trainer}
                          />
                          <div className="ml-2">
                            <h5 class="card-title cardtitle234">
                              Top 7 NFT usecase
                            </h5>
                            <div
                              className="d-flex"
                              style={{ position: "relative" }}
                            >
                              <p class="card-text pname4566">First name</p>
                              <p class="card-text pname4566 pl-2">Last name</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p
                          class="card-text pname456667"
                          style={{
                            fontWeight: "700",
                            padding: "8px 8px 6px 8px",
                            marginTop: "-60px",
                          }}
                        >
                          POPULAR
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* new row */}
              <div style={{ marginTop: "32px" }} className="row">
                <div className="col-lg-4 px-0">
                  <div class="card n-learnCards" style={{ border: "none" }}>
                    <img
                      className="u-learncardimage456"
                      src={Images.learnvideo}
                    />
                    <span className="spanclass-343">video tutorial</span>
                    <div class="card-body">
                      <div>
                        <div className="d-flex u-trainig0990carddde">
                          <img
                            style={{
                              position: "relative",
                              top: "2px",
                              width: "40px",
                              height: "40px",
                            }}
                            src={Images.trainer}
                          />
                          <div className="ml-2">
                            <h5 class="card-title cardtitle234">
                              Top 7 NFT usecase
                            </h5>
                            <div
                              className="d-flex"
                              style={{ position: "relative" }}
                            >
                              <p class="card-text pname4566">First name</p>
                              <p class="card-text pname4566 pl-2">Last name</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p
                          class="card-text pname456667"
                          style={{
                            fontWeight: "700",
                            padding: "8px 8px 6px 8px",
                            marginTop: "-60px",
                          }}
                        >
                          POPULAR
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 px-0 d-flex flex-column align-items-center">
                  <div class="card n-learnCards" style={{ border: "none" }}>
                    <img
                      className="u-learncardimage456"
                      src={Images.learnvideo}
                      // height="300px"
                    />
                    <span className="spanclass-343">video tutorial</span>
                    <div class="card-body">
                      <div>
                        <div className="d-flex u-trainig0990carddde">
                          <img
                            style={{
                              position: "relative",
                              top: "2px",
                              width: "40px",
                              height: "40px",
                            }}
                            src={Images.trainer}
                          />
                          <div className="ml-2">
                            <h5 class="card-title cardtitle234">
                              Top 7 NFT usecase
                            </h5>
                            <div
                              className="d-flex"
                              style={{ position: "relative" }}
                            >
                              <p class="card-text pname4566">First name</p>
                              <p class="card-text pname4566 pl-2">Last name</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p
                          class="card-text pname456667"
                          style={{
                            fontWeight: "700",
                            padding: "8px 8px 6px 8px",
                            marginTop: "-60px",
                          }}
                        >
                          POPULAR
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 px-0 d-flex flex-column align-items-end">
                  <div class="card n-learnCards" style={{ border: "none" }}>
                    <img
                      className="u-learncardimage456"
                      src={Images.learnvideo}
                    />
                    <span className="spanclass-343">video tutorial</span>
                    <div class="card-body">
                      <div>
                        <div className="d-flex u-trainig0990carddde">
                          <img
                            style={{
                              position: "relative",
                              top: "2px",
                              width: "40px",
                              height: "40px",
                            }}
                            src={Images.trainer}
                          />
                          <div className="ml-2">
                            <h5 class="card-title cardtitle234">
                              Top 7 NFT usecase
                            </h5>
                            <div
                              className="d-flex"
                              style={{ position: "relative" }}
                            >
                              <p class="card-text pname4566">First name</p>
                              <p class="card-text pname4566 pl-2">Last name</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p
                          class="card-text pname456667"
                          style={{
                            fontWeight: "700",
                            padding: "8px 8px 6px 8px",
                            marginTop: "-60px",
                          }}
                        >
                          POPULAR
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                // style={{ marginTop: "32px", marginBottom: "136px" }}
                class="d-flex justify-content-center "
              >
                <button
                  type="button"
                  class="btn n-secondaryButton n-marketLoadMore"
                >
                  {/* <img className="pr-2" src={Images.loadicon} /> */}
                  {/* <img className="mb-1" src={Images.morearticle} /> */}
                  Load more
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default withMainLayout(Learn);
