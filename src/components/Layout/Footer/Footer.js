import React from "react";
import Logo from "../../../assets/images/logo.png";
import Images from "./../../Helper/AllImages";
import { BrowserRouter, Link } from "react-router-dom";
import browserRoute from "../../../Routes/browserRoutes";

export const Footer = () => {
  return (
    <div>
      <footer class="mainfooter" role="contentinfo">
        <div class="footer-middle">
          <div class="container">
            <hr class="solid" style={{ margin: "0px" }} />
            <div class="row">
              <div class="col-md-3 col-sm-6">
                {/* <!--Column1--> */}
                <div class="footer-pad pt-5">
                  <Link to="/">
                    <img src={Images.defilogo} style={{ width: "112px" }} />
                  </Link>
                </div>
              </div>
              <div
                class="col-md-3 col-sm-6 pt-5"
                style={{ borderRight: "1px solid lightgrey" }}
              >
                {/* <!--Column1--> */}
                <div class="footer-pad">
                  <ul class="list-unstyled">
                    <li>
                      <Link class="footerlink" to={browserRoute.MARKET}>
                        Market
                      </Link>
                    </li>
                    <li class="pt-2 pb-2">
                      <Link class="footerlink" to={browserRoute.EARNYIELD}>
                        Earn yield
                      </Link>
                    </li>
                    <li class="pb-2">
                      <Link class="footerlink" to={browserRoute.PORTFOLIO}>
                        Portfolio
                      </Link>
                    </li>
                    <li class="pb-2">
                      <a class="footerlink" href="#">
                        Discover
                      </a>
                    </li>
                    <li class="pb-2">
                      <a class="footerlink" href="#">
                        Learn
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                class="col-md-3 col-sm-6 pt-5"
                style={{ borderRight: "1px solid lightgrey" }}
              >
                {/* <!--Column1--> */}
                <div class="footer-pad pl-5">
                  <h4
                    style={{
                      fontSize: "12px",
                      // fontFamily: "Poppins",
                      color: "#23262f",
                      // fontWeight: "100",
                      textTransform: "uppercase",
                    }}
                  >
                    Contact
                  </h4>
                  <ul class="list-unstyled">
                    <li class="pt-4  pb-2">
                      <a class="footerlinks" href="#">
                        About us
                      </a>
                    </li>
                    <li class="pb-2">
                      <a class="footerlinks" href="#">
                        Help & faq
                      </a>
                    </li>
                    <li>
                      <a class="footerlinks" href="#">
                        Contact us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-3 pl-5 pt-5 pb-4">
                <h6
                  style={{
                    // fontFamily: "Poppins",
                    fontSize: "12px",
                    // fontWeight: "400",
                  }}
                >
                  DEFISPOT LEARNING ACADEMY
                </h6>
                <p
                  class="pt-2 pb-2"
                  style={{
                    color: "#23262F",
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  Subscribe our newsletter to get more free articles and
                  resources about defi.
                </p>
                <div class="d-flex">
                  <input
                    style={{
                      borderRadius: "20px",
                      paddingTop: "20px",
                      paddingBottom: "20px",
                      fontFamily: "Poppins",
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "24px",
                    }}
                    class="form-control mr-sm-2"
                    type="text"
                    placeholder="Enter your email"
                  ></input>
                  <i
                    style={{
                      backgroundColor: "#3772FF",
                      color: "white",
                      paddingLeft: "9px",
                      paddingRight: "7px",
                      marginLeft: "-45px",
                      marginTop: "7px",
                      marginBottom: "6px",
                      paddingTop: "8px",
                      fontSize: "14px",
                      borderRadius: "20px",
                    }}
                    class="fa fa-long-arrow-right"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
            </div>
            </div>
            <hr class="solid" style={{ margin: "0px" }} />
            <div class="container mt-3">
              <div class="d-flex justify-content-between">
                <h6
                  style={{
                    fontFamily: "Poppins",
                    color: "#777E90",
                    fontSize: "12px",
                    fontWeight: "400",
                  }}
                >
                  Copyright © 2021 Suipe. All rights reserved
                </h6>
                <ul
                  class="menu simple d-flex list-unstyled"
                  style={{ letterSpacing: "25px" }}
                >
                  <li>
                    {/* <a href="https://www.facebook.com/">
                      <i style={{color:"#777E90"}} class="fa fa-facebook" aria-hidden="true"></i>
                    </a> */}
                    <img src={Images.fb} />
                  </li>
                  <li>
                    {/* <a href="https://www.instagram.com/?hl=en">
                      <i style={{color:"#777E90"}} class="fa fa-instagram" aria-hidden="true"></i>
                    </a> */}
                    <img class="pl-3" src={Images.twit} />
                  </li>
                  <li>
                    {/* <a href="https://twitter.com/?lang=en">
                      <i style={{color:"#777E90"}} class="fa fa-twitter" aria-hidden="true"></i>
                    </a> */}
                    <img class="pl-3" src={Images.insta} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        
      </footer>
    </div>
  );
};
export default Footer;
