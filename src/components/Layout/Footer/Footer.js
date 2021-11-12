import React, { useState, useEffect } from "react";
import Logo from "../../../assets/images/logo.png";
import Images from "./../../Helper/AllImages";
import { BrowserRouter, Link } from "react-router-dom";
import browserRoute from "../../../Routes/browserRoutes";
import axios from "axios";
import { toast } from "react-toastify";

const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const Footer = () => {
  const [subscriptionEmail, setSubscriptionEmail] = useState();
  const [btnDisable, setBtnDisable] = useState(true);

  useEffect(() => {
    if (toString(subscriptionEmail).length < 2) {
      // console.log("first if");
      setBtnDisable(true);
    } else if (regEmail.test(subscriptionEmail) == true) {
      // console.log("pass regex");
      setBtnDisable(false);
      // Alert.alert("Please enter a valid email address");
    } else {
      setBtnDisable(true);
    }
  }, [subscriptionEmail]);

  const handleOnChange = (e) => {
    setSubscriptionEmail(e.target.value);
  };
  const handleSubmit = () => {
    if (!btnDisable) {
      const body = {
        email: subscriptionEmail,
      };
      axios
        .post("https://defispot.herokuapp.com/api/v1/subscribe/by/email", body)
        .then((res) => {
          console.log("res", res);
          toast.success(`Email sent to ${subscriptionEmail}`);
        })
        .catch((err) => {
          // console.log("err", err);
          toast.error("Error sending email");
        });
    }
  };

  return (
    <div>
      <footer
        class="mainfooter"
        role="contentinfo"
        style={{ backgroundColor: "#FCFCFD" }}
      >
        <div class="footer-middle">
          <hr class="solid" style={{ margin: "0px" }} />
          <div class="container">
            <div class="row">
              <div
                class="col-lg-3 col-md-3 col-sm-4"
                style={{ borderRight: "1px solid lightgrey" }}
              >
                {/* <!--Column1--> */}
                <div class="footer-pad footerlogo3455">
                  <Link to="/">
                    {/* <img src={Images.defilogo} style={{ width: "112px" }} /> */}
                    <img
                      src="https://i.ibb.co/kgDCN45/Logo.png"
                      style={{ width: "112px" }}
                    />
                  </Link>
                </div>
              </div>
              <div class="col-lg-3 col-md-2 col-sm-4 footerlogo345">
                {/* <!--Column1--> */}
                <div class="footer-pad n-footerLinks">
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
                      <Link class="footerlink" to={browserRoute.LEARN}>
                        Learn
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-4 footerlogo345">
                {/* <!--Column1--> */}
                <div class="footer-pad footerLinkList">
                  <ul class="list-unstyled">
                    <li>
                      <Link class="footerlink" to={browserRoute.MARKET}>
                        About Us
                      </Link>
                    </li>
                    <li class="pt-2 pb-2">
                      <Link class="footerlink" to={browserRoute.EARNYIELD}>
                        Help & FAQs
                      </Link>
                    </li>
                    <li class="pb-2">
                      <Link class="footerlink" to={browserRoute.PORTFOLIO}>
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-3 col-md-4 pb-4 footerlogo345">
                <h6 className="u-column333 pb-4">DEFISPOT LEARNING ACADEMY</h6>
                <p className="ufottertext-34">
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
                    onChange={handleOnChange}
                  />
                  <i
                    class="fa fa-long-arrow-right emailInputArrow"
                    aria-hidden="true"
                    style={{ backgroundColor: btnDisable ? "gray" : "#3772ff" }}
                    // style={{
                    //   backgroundColor: "#3772FF",
                    //   color: "white",
                    //   paddingLeft: "9px",
                    //   paddingRight: "7px",
                    //   marginLeft: "-45px",
                    //   marginTop: "7px",
                    //   marginBottom: "6px",
                    //   paddingTop: "8px",
                    //   fontSize: "14px",
                    //   borderRadius: "20px",
                    // }}
                    onClick={handleSubmit}
                  ></i>
                </div>
              </div>
            </div>
          </div>
          <hr class="solid" style={{ margin: "0px" }} />
          <div class="container mt-3">
            <div class="d-flex justify-content-between">
              <h6 className="ufoteertext34555">
                Copyright © 2021 DefiSpot. All rights reserved
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
