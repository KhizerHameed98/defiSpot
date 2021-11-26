import React, { useState, useEffect } from "react";
import Logo from "../../../assets/images/logo.png";
import Images from "./../../Helper/AllImages";
import { BrowserRouter, Link } from "react-router-dom";
import browserRoute from "../../../Routes/browserRoutes";
import axios from "axios";
import { toast } from "react-toastify";

const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const Footer = () => {
  const [likeHover, setLikeHover] = useState(false);
  const [shareHover, setShareHover] = useState(false);

  const handleMouseEnterLike = () => {
    setLikeHover(true);
  };

  const handleMouseLeaveLike = () => {
    setLikeHover(false);
  };

  const handleMouseEnterShare = () => {
    setShareHover(true);
  };

  const handleMouseLeaveShare = () => {
    setShareHover(false);
  };

  const [subscriptionEmail, setSubscriptionEmail] = useState();
  const [btnDisable, setBtnDisable] = useState(true);
  const [emailErr, setEmailErr] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  useEffect(() => {
    if (toString(subscriptionEmail).length < 2) {
      // console.log("first if");
      setBtnDisable(true);
    } else if (regEmail.test(subscriptionEmail) == true) {
      // console.log("pass regex");
      setInvalidEmail(false);
      setBtnDisable(false);
      // Alert.alert("Please enter a valid email address");
    } else {
      setInvalidEmail(true);
      setBtnDisable(true);
    }
  }, [subscriptionEmail]);

  const handleOnChange = (e) => {
    setSubscriptionEmail(e.target.value);
  };

  const handleSubmit = () => {
    if (!btnDisable) {
      setBtnDisable(true);

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
          console.log("err", err);
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
                class="col-lg-2 col-md-3 col-sm-4"
                // style={{ borderRight: "1px solid lightgrey" }}
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
                      <Link class="footerlink" to="#">
                        Discover
                      </Link>
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
                      <Link class="footerlink" to="#">
                        About Us
                      </Link>
                    </li>
                    <li class="pt-2 pb-2">
                      <Link class="footerlink" to="#">
                        Help & FAQs
                      </Link>
                    </li>
                    <li class="pb-2">
                      <Link class="footerlink" to="#">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-4 col-md-4 footerSubscribeNews">
                <h6 className="u-column333">DEFISPOT LEARNING ACADEMY</h6>
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
                    onFocus={() => setEmailErr(false)}
                    onBlur={() => setEmailErr(true)}
                  />
                  <svg className="u-iconfotterpostion5667" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                  onClick={handleSubmit}>
<rect className="u-backgrounfoterr45565" width="32" height="32" rx="16" />
<path className fill-rule="evenodd" clip-rule="evenodd" d="M18.0909 11.2652C18.4968 10.8906 19.1294 10.9159 19.504 11.3217L22.7348 14.8217C23.0884 15.2047 23.0884 15.7952 22.7348 16.1782L19.504 19.6783C19.1294 20.0841 18.4968 20.1094 18.091 19.7348C17.6851 19.3602 17.6598 18.7276 18.0344 18.3217L19.716 16.5L10 16.5C9.44771 16.5 9 16.0523 9 15.5C9 14.9477 9.44771 14.5 10 14.5L19.716 14.5L18.0344 12.6783C17.6598 12.2725 17.6851 11.6398 18.0909 11.2652Z" fill="#FCFCFD"/>
</svg>

                  {/* <i
                    class="fa fa-long-arrow-right emailInputArrow"
                    aria-hidden="true"
                    // style={{ backgroundColor: btnDisable ? "gray" : "#3772f" }}
                   className="u-footerinputfiled98887"
                    onClick={handleSubmit}
                  ></i> */}
                </div>
                {emailErr && invalidEmail && (
                  <div
                    style={{
                      fontSize: 10,
                      color: "red",
                      marginLeft: 20,
                      marginTop: 2,
                    }}
                  >
                    Please enter a valid email address
                  </div>
                )}
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
                  <svg
                    className="ml-2 svgfootericon6777"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="black"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.3327 3.33366H6.66602C4.82507 3.33366 3.33268 4.82604 3.33268 6.66699V13.3337C3.33268 15.1746 4.82507 16.667 6.66602 16.667H13.3327C15.1736 16.667 16.666 15.1746 16.666 13.3337V6.66699C16.666 4.82604 15.1736 3.33366 13.3327 3.33366ZM6.66602 1.66699C3.90459 1.66699 1.66602 3.90557 1.66602 6.66699V13.3337C1.66602 16.0951 3.90459 18.3337 6.66602 18.3337H13.3327C16.0941 18.3337 18.3327 16.0951 18.3327 13.3337V6.66699C18.3327 3.90557 16.0941 1.66699 13.3327 1.66699H6.66602Z"
                    />
                    <path d="M14.1673 6.66667C14.6276 6.66667 15.0007 6.29357 15.0007 5.83333C15.0007 5.3731 14.6276 5 14.1673 5C13.7071 5 13.334 5.3731 13.334 5.83333C13.334 6.29357 13.7071 6.66667 14.1673 6.66667Z" />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.1673 9.99967C14.1673 12.3008 12.3018 14.1663 10.0007 14.1663C7.69947 14.1663 5.83398 12.3008 5.83398 9.99967C5.83398 7.69849 7.69947 5.83301 10.0007 5.83301C12.3018 5.83301 14.1673 7.69849 14.1673 9.99967ZM12.5007 9.99967C12.5007 11.3804 11.3814 12.4997 10.0007 12.4997C8.6199 12.4997 7.50065 11.3804 7.50065 9.99967C7.50065 8.61892 8.6199 7.49967 10.0007 7.49967C11.3814 7.49967 12.5007 8.61892 12.5007 9.99967Z"
                    />
                  </svg>
                </li>
                <li>
                  <svg
                    className="ml-2 svgfootericon6777"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.65115 11.6665C1.27305 11.6704 0.383457 13.2403 1.23245 14.4298C2.4483 16.133 4.6531 17.5 8.33395 17.5C14.0382 17.5 18.617 12.8514 17.976 7.35925L18.9151 5.48108C19.5664 4.17857 18.4347 2.69685 17.0067 2.98245L15.766 3.23057C15.4371 3.05702 15.0967 2.92606 14.8058 2.83117C14.2388 2.64627 13.5525 2.5 12.9173 2.5C11.7762 2.5 10.7914 2.79276 10.0087 3.37994C9.23495 3.96053 8.79911 4.72354 8.55995 5.42421C8.4497 5.74717 8.37628 6.07112 8.32917 6.38202C7.88645 6.24269 7.43502 6.05522 6.99307 5.82629C5.9904 5.30693 5.17961 4.64852 4.72224 4.07126C3.95488 3.10275 2.32868 3.17456 1.75803 4.43351C0.953746 6.20789 1.17437 8.31122 1.89732 10.0108C2.13964 10.5803 2.45485 11.1434 2.83994 11.6652C2.77401 11.666 2.71095 11.6663 2.65115 11.6665ZM8.33386 15.8333C5.11441 15.8333 3.44969 14.6672 2.5889 13.4614C2.55022 13.4072 2.58922 13.3333 2.65578 13.3332C3.53148 13.3307 5.32898 13.2892 6.51448 12.5954C6.57579 12.5595 6.5623 12.4691 6.49496 12.4465C3.73149 11.5173 2.16063 7.58216 3.27595 5.12158C3.30152 5.06517 3.37735 5.05773 3.41583 5.10628C4.68989 6.71432 7.47555 8.28933 9.8992 8.33242C9.95178 8.33333 9.99153 8.28558 9.98353 8.23361C9.88586 7.60044 9.51295 4.16667 12.9172 4.16667C13.7301 4.16667 14.9396 4.56319 15.3851 4.96942C15.4057 4.98819 15.4336 4.99672 15.4609 4.99125L17.3334 4.61675C17.4014 4.60315 17.4554 4.67371 17.4244 4.73573L16.2629 7.05849C16.2549 7.07462 16.2524 7.09312 16.2554 7.11088C17.0689 11.6833 13.3239 15.8333 8.33386 15.8333Z"
                    />
                  </svg>
                </li>
                <li>
                  <svg
                    className="ml-2 svgfootericon6777"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.99935 16.667C13.6813 16.667 16.666 13.6822 16.666 10.0003C16.666 6.31843 13.6813 3.33366 9.99935 3.33366C6.31745 3.33366 3.33268 6.31843 3.33268 10.0003C3.33268 13.6822 6.31745 16.667 9.99935 16.667ZM9.99935 18.3337C14.6017 18.3337 18.3327 14.6027 18.3327 10.0003C18.3327 5.39795 14.6017 1.66699 9.99935 1.66699C5.39697 1.66699 1.66602 5.39795 1.66602 10.0003C1.66602 14.6027 5.39697 18.3337 9.99935 18.3337Z"
                    />
                    <path d="M9.99935 8.33301C9.99935 7.87277 10.3724 7.49967 10.8327 7.49967H11.666C12.1263 7.49967 12.4993 7.12658 12.4993 6.66634C12.4993 6.20611 12.1263 5.83301 11.666 5.83301H10.8327C9.45193 5.83301 8.33268 6.9523 8.33268 8.33301V9.99967H7.49935C7.03912 9.99967 6.66602 10.3728 6.66602 10.833C6.66602 11.2933 7.03911 11.6663 7.49935 11.6663H8.33268V16.6663C8.33268 17.1266 8.70577 17.4997 9.16602 17.4997C9.62627 17.4997 9.99935 17.1266 9.99935 16.6663V11.6663H11.666C12.1263 11.6663 12.4993 11.2933 12.4993 10.833C12.4993 10.3728 12.1263 9.99967 11.666 9.99967H9.99935V8.33301Z" />
                  </svg>
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
