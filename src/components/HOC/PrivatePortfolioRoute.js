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
        <div class="container-fluid pb-3">
          <div class="row">
            <div class="col-lg-2">
              <div
                class="pt-2 mt-2"
                style={{ backgroundColor: "#fff", height: "920px" }}
              >
                <div class="d-flex pl-3 pt-3">
                  <img
                    style={{ width: "15px", height: "15px" }}
                    src={Images.frame1}
                  />
                  <p class="marketsidetitle pl-2">
                    <Link
                      to={browserRoute.PORTFOLIO}
                      style={{ textDecoration: "none", color: "#777E90" }}
                    >
                      Overview
                    </Link>
                  </p>
                </div>
                <div class="d-flex pl-3 ">
                  <img
                    style={{ width: "15px", height: "15px" }}
                    src={Images.frame2}
                  />
                  <p class="marketsidetitle pl-2">
                    <Link
                      to={browserRoute.PORTFOLIO_ASSETS}
                      style={{ textDecoration: "none", color: "#777E90" }}
                    >
                      Assets
                    </Link>
                  </p>
                </div>
                <div class="d-flex pl-3 ">
                  <img
                    style={{ width: "15px", height: "15px" }}
                    src={Images.frame3}
                  />
                  <p class="marketsidetitle pl-2 ">
                    {/* <Link
                      to={browserRoute.PORTFOLIO_LIQUIDITY}
                      style={{ textDecoration: "none", color: "#777E90" }}
                    > */}
                    Liquidity providing
                    {/* </Link> */}
                  </p>
                </div>
                <hr class="solid mt-4" />
                <div class="d-flex pl-3 pt-4 ">
                  <img
                    style={{ width: "15px", height: "15px" }}
                    src={Images.gotomarket}
                  />
                  <p class="marketsidetitle pl-2">
                    <Link
                      to={browserRoute.MARKET}
                      style={{ textDecoration: "none", color: "#777E90" }}
                    >
                      Go to market
                    </Link>
                  </p>
                </div>
                <div class="d-flex pl-3">
                  <img
                    style={{ width: "15px", height: "15px" }}
                    src={Images.yielldmarket}
                  />
                  <p class="marketsidetitle pl-2">Earn yeild</p>
                </div>
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
