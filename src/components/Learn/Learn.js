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
            <button className="btn n-secondaryButton ml-2 n-secondaryDark">
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
                class="form-control n-tableSearch n-learnTabelSearch"
                // style={{}}
                type="text"
                placeholder="Search"
              />
              {/* <img
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "-35px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
                src={Images.searchicon}
              /> */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  marginLeft: "-35px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.4227 13.5992C11.2938 14.4768 9.87523 14.9993 8.33464 14.9993C4.65274 14.9993 1.66797 12.0146 1.66797 8.33268C1.66797 4.65078 4.65274 1.66602 8.33464 1.66602C12.0165 1.66602 15.0013 4.65078 15.0013 8.33268C15.0013 9.87327 14.4787 11.2918 13.6012 12.4207L18.0906 16.9101C18.416 17.2355 18.416 17.7632 18.0906 18.0886C17.7651 18.414 17.2375 18.414 16.912 18.0886L12.4227 13.5992ZM13.3346 8.33268C13.3346 11.0941 11.0961 13.3327 8.33464 13.3327C5.57321 13.3327 3.33464 11.0941 3.33464 8.33268C3.33464 5.57126 5.57321 3.33268 8.33464 3.33268C11.0961 3.33268 13.3346 5.57126 13.3346 8.33268Z"
                  fill="#777E91"
                />
              </svg>

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
                {/* <img className="pl-5 ml-5" src={Images.ButtonSecondarySmall} /> */}
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-5"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20.2071 13.7929C19.8166 13.4024 19.1834 13.4024 18.7929 13.7929L16 16.5858L13.2071 13.7929C12.8166 13.4024 12.1834 13.4024 11.7929 13.7929C11.4024 14.1834 11.4024 14.8166 11.7929 15.2071L15.2929 18.7071C15.6834 19.0976 16.3166 19.0976 16.7071 18.7071L20.2071 15.2071C20.5976 14.8166 20.5976 14.1834 20.2071 13.7929Z"
                    fill="#777E91"
                  />
                  <rect
                    x="1"
                    y="1"
                    width="30"
                    height="30"
                    rx="15"
                    stroke="#E6E8EC"
                    stroke-width="2"
                  />
                </svg>
              </button>
              <div
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  border: "2px solid #e6e8ec",
                }}
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
                <div className="col-lg-4 col-md-6 col-sm-12 px-0">
                  <div class="card n-learnCards" style={{ border: "none" }}>
                    <img
                      className="u-learncardimage456"
                      src={Images.learnvideo}
                    />
                    {/* <span className="spanclass-343">video tutorial</span> */}
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
                      {/* <div>
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
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 px-0 d-flex flex-column">
                  <div class="card n-learnCards" style={{ border: "none" }}>
                    <Link to={browserRoute.INTRO_TO_LP}>
                      <img
                        className="u-learncardimage456"
                        src={Images.learnvideo}
                        // height="300px"
                      />
                      {/* <span className="spanclass-343900">POPULAR</span> */}
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
                        {/* <div>
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
                        </div> */}
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 px-0 d-flex flex-column">
                  <div class="card n-learnCards" style={{ border: "none" }}>
                    <img
                      className="u-learncardimage456"
                      src={Images.learnvideo}
                    />
                    {/* <span className="spanclass-343339">NEW</span> */}
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
                      {/* <div>
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
                      </div> */}
                    </div>
                  </div>
                </div>
                {/* </div> */}
                {/* new row */}
                {/* <div style={{ marginTop: "32px" }} className="row"> */}
                <div className="col-lg-4 col-md-6 col-sm-12 px-0">
                  <div class="card n-learnCards" style={{ border: "none" }}>
                    <img
                      className="u-learncardimage456"
                      src={Images.learnvideo}
                    />
                    {/* <span className="spanclass-343">video tutorial</span> */}
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
                      {/* <div>
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
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 px-0 d-flex flex-column">
                  <div class="card n-learnCards" style={{ border: "none" }}>
                    <img
                      className="u-learncardimage456"
                      src={Images.learnvideo}
                      // height="300px"
                    />
                    {/* <span className="spanclass-343">video tutorial</span> */}
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
                      {/* <div>
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
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 px-0 d-flex flex-column">
                  <div class="card n-learnCards" style={{ border: "none" }}>
                    <img
                      className="u-learncardimage456"
                      src={Images.learnvideo}
                    />
                    {/* <span className="spanclass-343">video tutorial</span> */}
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
                      {/* <div>
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
                      </div> */}
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
