import React from "react";
import Logo from "../../../assets/images/logo.png";
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <div>
      <footer class="mainfooter pt-5" role="contentinfo">
        <div class="footer-middle">
          <div class="container">
            <hr class="solid" style={{ margin: "0px" }} />
            <div class="row">
              <div class="col-md-3 col-sm-6">
                {/* <!--Column1--> */}
                <div class="footer-pad pt-5">
                  <Link to="/">
                    <img src={Logo} />
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
                      <Link class="footerlink" to="/market">
                        Market
                      </Link>
                    </li>
                    <li class="pt-2 pb-2">
                      <a class="footerlink" href="#">
                        Earn yield
                      </a>
                    </li>
                    <li class="pb-2">
                      <a class="footerlink" href="#">
                        Portfolio
                      </a>
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
                    <li>
                      <a class="footerlink" href="#">
                        Webmaster
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
                  <h4 style={{ fontSize: "14px" }}>Contact</h4>
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
              <div class="col-md-3 pl-5 pt-5">
                <h6>Suipe Learning academy</h6>
                <p class="pt-2 pb-2">
                  Subscribe our newsletter to get more free articles and
                  resources about defi.
                </p>
                <div class="d-flex">
                  <input
                    style={{
                      borderRadius: "20px",
                      paddingTop: "20px",
                      paddingBottom: "20px",
                    }}
                    class="form-control mr-sm-2"
                    type="text"
                    placeholder="Enter Your Email"
                  ></input>
                  <i
                    style={{
                      backgroundColor: "#3772FF",
                      color: "white",
                      paddingLeft: "9px",
                      paddingRight: "7px",
                      marginLeft: "-40px",
                      marginTop: "6px",
                      marginBottom: "6px",
                      paddingTop: "6px",
                      borderRadius: "20px",
                    }}
                    class="fa fa-long-arrow-right"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
            </div>
            <hr class="solid" style={{ margin: "0px" }} />
            <div class="container mt-3">
              <div class="d-flex justify-content-between">
                <h6>Copyright © 2021 Suipe. All rights reserved</h6>
                <ul
                  class="menu simple d-flex list-unstyled"
                  style={{ letterSpacing: "25px" }}
                >
                  <li>
                    <a href="https://www.facebook.com/">
                      <i class="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/?hl=en">
                      <i class="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.pinterest.com/">
                      <i class="fa fa-pinterest-p" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/?lang=en">
                      <i class="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
