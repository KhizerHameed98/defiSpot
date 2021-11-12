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
                      style={{ textDecoration: "none", color: "#777E90" }}
                      className={
                        window.location.href.indexOf(
                          browserRoute.PORTFOLIO_OVERVIEW
                        ) !== -1
                          ? "sideBarActive w-box-black"
                          : "w-box-black"
                      }
                    >
                      Overview
                    </Link>
                  </li>
                  <li className="marketsidetitle">
                    <Link
                      to={browserRoute.PORTFOLIO_ASSETS}
                      style={{ textDecoration: "none", color: "#777E90" }}
                      className={
                        window.location.href.indexOf(
                          browserRoute.PORTFOLIO_ASSETS
                        ) !== -1
                          ? "sideBarActive w-box-purple"
                          : "w-box-purple"
                      }
                    >
                      Assets
                    </Link>
                  </li>
                  <li className="marketsidetitle">
                    <Link
                      to={browserRoute.PORTFOLIO_LIQUIDITY}
                      style={{ textDecoration: "none", color: "#777E90" }}
                      className={
                        window.location.href.indexOf(
                          browserRoute.PORTFOLIO_LIQUIDITY
                        ) !== -1
                          ? "sideBarActive w-box-yellow"
                          : "w-box-yellow"
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
                      <img
                        style={{
                          width: "15px",
                          height: "15px",
                          position: "absolute",
                          left: "20px",
                          top: "18px",
                        }}
                        src={Images.gotomarket}
                      />
                      Go to market
                    </Link>
                  </li>
                  <li className="marketsidetitle">
                    <Link
                      to={browserRoute.EARNYIELD}
                      style={{ textDecoration: "none", color: "#777E90" }}
                    >
                      <img
                        style={{
                          width: "15px",
                          height: "15px",
                          position: "absolute",
                          left: "20px",
                          top: "18px",
                        }}
                        src={Images.yielldmarket}
                      />
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
