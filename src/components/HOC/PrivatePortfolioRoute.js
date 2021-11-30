import React from "react";
import PrivateRoute from "./PrivateRoute";
import Images from "../Helper/AllImages";
import withMainLayout from "./withMainLayout";
import { Link } from "react-router-dom";
import browserRoute from "../../Routes/browserRoutes";

const PrivatePortfolioRoute = ({ component: Component, path, ...rest }) => {
  return (
    <div>
      <section style={{ backgroundColor: "#F4F5F6" }}>
        <div class="container-fluid p-0">
          <div class="row m-0">
            <div class="col-lg-2 w-pd-over-left">
              <div class="w-portfolio-left-bar-main">
                <ul className="w-portfolio-left-bar">
                  <li className="marketsidetitle">
                    <Link
                      to={browserRoute.PORTFOLIO_OVERVIEW}
                      // style={{ textDecoration: "none", color: "#777E90" }}
                      className={
                        window.location.href.indexOf(
                          browserRoute.PORTFOLIO_OVERVIEW
                        ) !== -1
                          ? "sideBarActive w-box-black text-bold"
                          : "w-box-black text-bold"
                      }
                    >
                      Overview
                    </Link>
                  </li>
                  <li className="marketsidetitle">
                    <Link
                      to={browserRoute.PORTFOLIO_ASSETS}
                      // style={{ textDecoration: "none", color: "#777E90" }}
                      className={
                        window.location.href.indexOf(
                          browserRoute.PORTFOLIO_ASSETS
                        ) !== -1
                          ? "sideBarActive w-box-purple text-bold"
                          : "w-box-purple text-bold"
                      }
                    >
                      Assets
                    </Link>
                  </li>
                  <li className="marketsidetitle">
                    <Link
                      to={browserRoute.PORTFOLIO_LIQUIDITY}
                      // style={{ textDecoration: "none", color: "#777E90" }}
                      className={
                        window.location.href.indexOf(
                          browserRoute.PORTFOLIO_LIQUIDITY
                        ) !== -1
                          ? "sideBarActive w-box-yellow text-bold"
                          : "w-box-yellow text-bold"
                      }
                    >
                      Liquidity providing
                    </Link>
                  </li>
                  <hr style={{ margin: "20px 0" }}></hr>
                  <li className="marketsidetitle">
                    <Link
                      to={browserRoute.MARKET}
                      style={{ textDecoration: "none", color: "#777E90" }}
                    >
                      {/* <img
                        style={{
                          width: "15px",
                          height: "15px",
                          position: "absolute",
                          left: "20px",
                          top: "18px",
                        }}
                        src={Images.gotomarket}
                      /> */}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          position: "absolute",
                          left: "20px",
                          top: "16px",
                        }}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M14.7846 6.66667H5.21432C4.25296 6.66667 3.49094 7.4778 3.5509 8.4373L3.96757 15.104C4.02247 15.9824 4.75089 16.6667 5.63099 16.6667H14.368C15.2481 16.6667 15.9765 15.9824 16.0314 15.104L16.4481 8.4373C16.508 7.4778 15.746 6.66667 14.7846 6.66667ZM5.21432 5C3.29159 5 1.76755 6.62227 1.88748 8.54126L2.30415 15.2079C2.41395 16.9647 3.87078 18.3333 5.63099 18.3333H14.368C16.1282 18.3333 17.585 16.9647 17.6948 15.2079L18.1115 8.54126C18.2314 6.62227 16.7074 5 14.7846 5H5.21432Z"
                          fill="#777E91"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M5.83398 5.83366C5.83398 3.53247 7.69946 1.66699 10.0007 1.66699C12.3018 1.66699 14.1673 3.53247 14.1673 5.83366V7.50033C14.1673 7.96056 13.7942 8.33366 13.334 8.33366C12.8737 8.33366 12.5007 7.96056 12.5007 7.50033V5.83366C12.5007 4.45295 11.3814 3.33366 10.0007 3.33366C8.61994 3.33366 7.50065 4.45295 7.50065 5.83366V7.50033C7.50065 7.96056 7.12756 8.33366 6.66732 8.33366C6.20708 8.33366 5.83398 7.96056 5.83398 7.50033V5.83366Z"
                          fill="#777E91"
                        />
                      </svg>
                      Go to market
                    </Link>
                  </li>
                  <li className="marketsidetitle">
                    <Link
                      to={browserRoute.EARNYIELD}
                      style={{ textDecoration: "none", color: "#777E90" }}
                    >
                      {/* <img
                        style={{
                          width: "15px",
                          height: "15px",
                          position: "absolute",
                          left: "20px",
                          top: "18px",
                        }}
                        src={Images.yielldmarket}
                      /> */}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          position: "absolute",
                          left: "20px",
                          top: "16px",
                        }}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.66732 17.5C2.12755 17.5 2.50065 17.1269 2.50065 16.6667V5C2.50065 4.53976 2.87375 4.16667 3.33398 4.16667H18.334C18.7942 4.16667 19.1673 3.79357 19.1673 3.33333C19.1673 2.8731 18.7942 2.5 18.334 2.5H3.33398C1.95327 2.5 0.833984 3.61929 0.833984 5V16.6667C0.833984 17.1269 1.20708 17.5 1.66732 17.5Z"
                          fill="#777E91"
                        />
                        <path
                          d="M16.1517 5.89689C16.0541 5.85645 15.9473 5.83399 15.8352 5.83366L15.8327 5.83366L15.8302 5.83366C15.6038 5.83433 15.3987 5.92525 15.2489 6.07232C15.2469 6.07432 15.2448 6.07632 15.2428 6.07833L13.5768 7.7444C13.2513 8.06984 13.2513 8.59748 13.5768 8.92291C13.9022 9.24835 14.4298 9.24835 14.7553 8.92291L14.9901 8.6881C14.8059 12.2052 11.8957 15.0003 8.33268 15.0003H4.99935C4.53911 15.0003 4.16602 15.3734 4.16602 15.8337C4.16602 16.2939 4.53911 16.667 4.99935 16.667H8.33268C12.8217 16.667 16.4817 13.1175 16.6593 8.67209L16.9101 8.92291C17.2355 9.24835 17.7632 9.24835 18.0886 8.92291C18.414 8.59748 18.414 8.06984 18.0886 7.7444L16.4225 6.07835C16.4205 6.07633 16.4185 6.07432 16.4165 6.07232C16.3379 5.99511 16.2477 5.93664 16.1517 5.89689Z"
                          fill="#777E91"
                        />
                      </svg>
                      Earn Yield
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Route */}
            <PrivateRoute exact path={path} component={Component} {...rest} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default withMainLayout(PrivatePortfolioRoute);
