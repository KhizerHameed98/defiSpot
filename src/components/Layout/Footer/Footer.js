import React from "react";
import Logo from "../../../assets/images/logo.png";
export const Footer = () => {
  return (
    <div>
      <footer class="mainfooter" role="contentinfo">
        <div class="footer-middle">
          <div class="container">
            <div class="row">
              <div class="col-md-3 col-sm-6">
                {/* <!--Column1--> */}
                <div class="footer-pad">
                  <img src={Logo} />
                </div>
              </div>
              <div class="col-md-3 col-sm-6">
                {/* <!--Column1--> */}
                <div class="footer-pad">
                  <ul class="list-unstyled">
                    <li>
                      <a class="footerlink" href="#">
                        Market
                      </a>
                    </li>
                    <li>
                      <a class="footerlink" href="#">
                        Earn yield
                      </a>
                    </li>
                    <li>
                      <a class="footerlink" href="#">
                        Portfolio
                      </a>
                    </li>
                    <li>
                      <a class="footerlink" href="#">
                        Discover
                      </a>
                    </li>
                    <li>
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
              <div class="col-md-3 col-sm-6">
                {/* <!--Column1--> */}
                <div class="footer-pad">
                  <h4 style={{ fontSize: "14px" }}>Contact</h4>
                  <ul class="list-unstyled">
                    <li>
                      <a class="footerlinks" href="#">
                        About us
                      </a>
                    </li>
                    <li>
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
              <div class="col-md-3">
                <h6>Suipe Learning academy</h6>
                <p>
                  Subscribe our newsletter to get more free articles and
                  resources about defi.
                </p>
              </div>
            </div>
            <div class="container mt-5">
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
