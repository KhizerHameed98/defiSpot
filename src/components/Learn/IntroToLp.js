import React, { useState } from "react";
import withMainLayout from "../HOC/withMainLayout";
import { Link } from "react-router-dom";
import browserRoute from "../../Routes/browserRoutes";
import Images from "../Helper/AllImages";

function IntoToLP() {
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

  return (
    <div>
      <section class="n-indArticlePage">
        <div className="container articleDetails">
          <div className="articleDetailsHeading">
            <h5 className="articleHeading">
              A beginner’s guide to trading view
            </h5>
            <span className="breadcrumbLinks d-flex flex-row justify-content-center align-items-center">
              <a href="#123">Learn crypto</a>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.79289 7.79289C9.40237 8.18342 9.40237 8.81658 9.79289 9.20711L12.5858 12L9.79289 14.7929C9.40237 15.1834 9.40237 15.8166 9.79289 16.2071C10.1834 16.5976 10.8166 16.5976 11.2071 16.2071L14.7071 12.7071C15.0976 12.3166 15.0976 11.6834 14.7071 11.2929L11.2071 7.79289C10.8166 7.40237 10.1834 7.40237 9.79289 7.79289Z"
                  fill="#777E91"
                />
              </svg>
              <a href="#123">Trading</a>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.79289 7.79289C9.40237 8.18342 9.40237 8.81658 9.79289 9.20711L12.5858 12L9.79289 14.7929C9.40237 15.1834 9.40237 15.8166 9.79289 16.2071C10.1834 16.5976 10.8166 16.5976 11.2071 16.2071L14.7071 12.7071C15.0976 12.3166 15.0976 11.6834 14.7071 11.2929L11.2071 7.79289C10.8166 7.40237 10.1834 7.40237 9.79289 7.79289Z"
                  fill="#777E91"
                />
              </svg>
              <a href="#123">Bitcoin</a>
            </span>
          </div>
          <div className="articleVideo">
            <img
              src={Images.articlevideo}
              alt="Article Video"
              className="img-fluid"
            />
          </div>
          <div className="row mainvideocalss98766 d-flex justify-content-center">
            <img src={Images.placeholder} class="img-fluid" />
          </div>
          <div className="row n-introToLp">
            <div className="articleDescription">
              <h5>Introduction</h5>
              <svg
                width="166"
                height="2"
                viewBox="0 0 166 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="166" height="2" fill="#E6E8EC" />
              </svg>
              <p>
                For traders who love technical analysis, robust charting tools
                are essential. TradingView is one option for both amateur and
                experienced traders. It offers numerous trading and charting
                tools and also a free membership option. Let’s face it... not
                everyone has the money or need for a Bloomberg terminal
                subscription.
                <br />
                <br />
                The Stacks series of products: Stacks: Landing Page Kit, Stacks:
                Portfolio Kit, Stacks: eCommerce Kit. "Stacks is a
                production-ready library of stackable content blocks built in
                React Native.
                <br />
                <br />
                Mix-and-match dozens of responsive elements to quickly configure
                your favorite landing page layouts or hit the ground running
                with 10 pre-built templates, all in light or dark mode."
              </p>
            </div>
            <div className="articleDescription">
              <h5>What does TradingView do?</h5>
              <svg
                width="166"
                height="2"
                viewBox="0 0 166 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="166" height="2" fill="#E6E8EC" />
              </svg>
              <p>
                The Stacks series of products: Stacks: Landing Page Kit, Stacks:
                Portfolio Kit, Stacks: eCommerce Kit. "Stacks is a
                production-ready library of stackable content blocks built in
                React Native.
                <br />
                <br />
                Mix-and-match dozens of responsive elements to quickly configure
                your favorite landing page layouts or hit the ground running
                with 10 pre-built templates, all in light or dark mode."
              </p>
              <div className="col-lg-12 d-flex justify-content-center articleImage">
                <img
                  src={Images.articleimage}
                  alt="Article Image"
                  // class="img-fluid"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="articleDescription">
              <h5>How expensive is TradingView?</h5>
              <svg
                width="166"
                height="2"
                viewBox="0 0 166 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="166" height="2" fill="#E6E8EC" />
              </svg>
              <p>
                The Stacks series of products: Stacks: Landing Page Kit, Stacks:
                Portfolio Kit, Stacks: eCommerce Kit. "Stacks is a
                production-ready library of stackable content blocks built in
                React Native.
                <br />
                <br />
                Mix-and-match dozens of responsive elements to quickly configure
                your favorite landing page layouts or hit the ground running
                with 10 pre-built templates, all in light or dark mode."
              </p>
            </div>

            <div className="articleDescription">
              <h5>Understanding the TradingView UI</h5>
              <svg
                width="166"
                height="2"
                viewBox="0 0 166 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="166" height="2" fill="#E6E8EC" />
              </svg>
              <p>
                The Stacks series of products: Stacks: Landing Page Kit, Stacks:
                Portfolio Kit, Stacks: eCommerce Kit. "Stacks is a
                production-ready library of stackable content blocks built in
                React Native.
                <br />
                <br />
                Mix-and-match dozens of responsive elements to quickly configure
                your favorite landing page layouts or hit the ground running
                with 10 pre-built templates, all in light or dark mode."
              </p>
            </div>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-center articleIcons">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.9972 20.0811C18.056 21.1841 17.2095 22.1259 16.1065 22.1847C14.6011 22.265 13.4088 22.3631 12.4771 22.4614C11.2258 22.5934 10.4656 23.3619 10.3392 24.4675C10.1577 26.0548 10 28.4569 10 32.0014C10 35.5459 10.1577 37.9479 10.3392 39.5352C10.4658 40.6427 11.2241 41.4091 12.4735 41.541C14.6616 41.7719 18.2785 42.0014 24 42.0014C29.7215 42.0014 33.3384 41.7719 35.5265 41.541C36.7759 41.4091 37.5342 40.6427 37.6608 39.5352C37.8423 37.9479 38 35.5459 38 32.0014C38 28.4569 37.8423 26.0548 37.6608 24.4675C37.5344 23.3619 36.7742 22.5934 35.5229 22.4614C34.5912 22.3631 33.3989 22.265 31.8935 22.1847C30.7905 22.1259 29.944 21.1841 30.0028 20.0811C30.0616 18.9781 31.0035 18.1316 32.1065 18.1904C33.6721 18.2739 34.9339 18.3771 35.9425 18.4835C38.9113 18.7966 41.2794 20.9027 41.6349 24.0132C41.8376 25.7859 42 28.3444 42 32.0014C42 35.6583 41.8376 38.2168 41.6349 39.9895C41.2796 43.0981 38.917 45.2053 35.9463 45.5189C33.5839 45.7682 29.8216 46.0014 24 46.0014C18.1784 46.0014 14.4161 45.7682 12.0537 45.5189C9.08302 45.2053 6.72042 43.0981 6.36506 39.9895C6.16241 38.2168 6 35.6583 6 32.0014C6 28.3444 6.16241 25.7859 6.36506 24.0132C6.72063 20.9027 9.08872 18.7966 12.0575 18.4835C13.0661 18.3771 14.3279 18.2739 15.8935 18.1904C16.9965 18.1316 17.9384 18.9781 17.9972 20.0811Z"
                fill="#777E91"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.4142 12.4142C17.6332 13.1953 16.3668 13.1953 15.5858 12.4142C14.8047 11.6332 14.8047 10.3668 15.5858 9.58579L22.5858 2.58579C23.3668 1.80474 24.6332 1.80474 25.4142 2.58579L32.4142 9.58579C33.1953 10.3668 33.1953 11.6332 32.4142 12.4142C31.6332 13.1953 30.3668 13.1953 29.5858 12.4142L26 8.82843V28C26 29.1046 25.1046 30 24 30C22.8954 30 22 29.1046 22 28V8.82843L18.4142 12.4142Z"
                fill="#777E91"
              />
            </svg>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M25.3848 13.8341C24.611 14.5768 23.389 14.5768 22.6152 13.8341L21.2304 12.5052C19.6095 10.9497 17.4199 10 15 10C10.0294 10 6 14.0294 6 19C6 23.7652 8.57958 27.7002 12.3035 30.9332C16.0306 34.1688 20.4868 36.3148 23.1492 37.4102C23.706 37.6392 24.294 37.6392 24.8508 37.4102C27.5132 36.3148 31.9694 34.1688 35.6964 30.9332C39.4204 27.7 42 23.7652 42 19C42 14.0294 37.9706 10 33 10C30.5802 10 28.3904 10.9497 26.7696 12.5052L25.3848 13.8341ZM24 9.61914C21.6642 7.3776 18.493 6 15 6C7.8203 6 2 11.8203 2 19C2 31.7366 15.9407 38.77 21.6276 41.1094C23.1592 41.7394 24.8408 41.7394 26.3724 41.1094C32.0594 38.77 46 31.7364 46 19C46 11.8203 40.1798 6 33 6C29.507 6 26.3358 7.3776 24 9.61914Z"
                fill="#777E91"
              />
            </svg>
          </div>
        </div>
      </section>
      <section class="n-marketSection" style={{ backgroundColor: "#FCFCFD" }}>
        <div class="container">
          <div style={{ marginBottom: "64px" }}>
            <h2 class="d-flex justify-content-center marketmainheade">
              Learn about DeFi
            </h2>
            <p
              class="d-flex justify-content-center n-learnSectionParag"
              style={{
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: "400",
                // color: "#353945",
                margin: "0",
              }}
            >
              Browse our library of resources to learn more about DeFi and how
              <br /> to use it to yield or trade
            </p>
          </div>
          <div class="mt-3 n-marketLearnCard">
            <div class="n-marketCardInv">
              <div class="card cardborder">
                <img
                  class="card-img-top"
                  style={{ borderRadius: "12px" }}
                  src={Images.mediacontainer}
                  alt="Card image cap"
                />
                <div class="card-body n-learnCard">
                  {/* <h6 class="marketcardone">Learn & Earn</h6> */}
                  <p class="cardtext">
                    Earn yield by providing liquidity to pools
                  </p>
                </div>
              </div>
              {/* <hr class="solid earnyieldclasssolid" /> */}
            </div>
            <div class="n-marketCardInv">
              <div class="card cardborder">
                <img
                  class="card-img-top"
                  style={{ borderRadius: "12px" }}
                  src={Images.mediacontainer}
                  alt="Card image cap"
                />
                <div class="card-body n-learnCard">
                  {/* <h6 class="marketcardtwo">WEEKLY WATCHLIST AIRDROP</h6> */}
                  <p class="cardtext">
                    The biggest advantages of decentralized exchange
                  </p>
                </div>
              </div>
            </div>
            <div class="n-marketCardInv">
              <div class="card cardborder">
                <img
                  class="card-img-top"
                  src={Images.mediacontainer}
                  style={{ borderRadius: "12px" }}
                  alt="Card image cap"
                />
                <div class="card-body n-learnCard">
                  {/* <h6 class="marketcardthree">FEATURED</h6> */}
                  <p class="cardtext">Submit your watchlist and win USDT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="d-flex justify-content-center"
          style={{ backgroundColor: "#fcfcfd" }}
          // style={{ marginTop: "64px", marginBottom: "130px" }}
        >
          <Link to={browserRoute.LEARN}>
            <button
              type="button"
              class="btn n-secondaryButton n-marketLoadMore"
            >
              {/* <img className="pr-2" src={Images.loadicon} /> */}
              Load more
            </button>
          </Link>
          {/* On loading Add button with loaing img */}
          {/* <button type="button" class="btn loaderbutton">
            <div
              class="d-flex justify-content-center n-marketLoadMore"
            >
              <Link to={browserRoute.LEARN}>
                <button type="button" class="btn n-secondaryButton">
                  Load more
                </button>
              </Link>
              {/* On loading Add button with loaing img */}
          {/* <button type="button" class="btn loaderbutton">
              <img className="pr-2" src={Images.loadicon} />
              Load more
            </button> */}
        </div>
      </section>
    </div>
  );
}

export default withMainLayout(IntoToLP);
