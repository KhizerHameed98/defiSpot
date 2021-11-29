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
      <section>
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
                  style={{width: '100%'}}
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
              // className="n-downArrow"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onMouseEnter={handleMouseEnterShare}
              onMouseLeave={handleMouseLeaveShare}
              style={{ cursor: "pointer" }}
            >
              <rect
                x="1"
                y="1"
                width="48"
                height="48"
                rx="23"
                // stroke="#E6E8EC"
                stroke-width="2"
                fill={shareHover ? "#3772ff" : "#FCFCFD"}
                stroke={shareHover ? "white" : "#E6E8EC"}
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.9986 22.0405C21.028 22.592 20.6047 23.063 20.0532 23.0924C19.3005 23.1325 18.7044 23.1816 18.2385 23.2307C17.6129 23.2967 17.2328 23.681 17.1696 24.2337C17.0789 25.0274 17 26.2284 17 28.0007C17 29.7729 17.0789 30.974 17.1696 31.7676C17.2329 32.3213 17.6121 32.7045 18.2368 32.7705C19.3308 32.8859 21.1392 33.0007 24 33.0007C26.8608 33.0007 28.6692 32.8859 29.7632 32.7705C30.3879 32.7045 30.7671 32.3213 30.8304 31.7676C30.9211 30.974 31 29.7729 31 28.0007C31 26.2284 30.9211 25.0274 30.8304 24.2337C30.7672 23.681 30.3871 23.2967 29.7615 23.2307C29.2956 23.1816 28.6995 23.1325 27.9468 23.0924C27.3953 23.063 26.972 22.592 27.0014 22.0405C27.0308 21.489 27.5017 21.0658 28.0532 21.0952C28.8361 21.1369 29.4669 21.1885 29.9712 21.2417C31.4556 21.3983 32.6397 22.4514 32.8175 24.0066C32.9188 24.893 33 26.1722 33 28.0007C33 29.8292 32.9188 31.1084 32.8175 31.9948C32.6398 33.549 31.4585 34.6027 29.9732 34.7594C28.7919 34.8841 26.9108 35.0007 24 35.0007C21.0892 35.0007 19.2081 34.8841 18.0268 34.7594C16.5415 34.6027 15.3602 33.5491 15.1825 31.9948C15.0812 31.1084 15 29.8292 15 28.0007C15 26.1722 15.0812 24.893 15.1825 24.0066C15.3603 22.4514 16.5444 21.3983 18.0288 21.2417C18.5331 21.1885 19.1639 21.1369 19.9468 21.0952C20.4983 21.0658 20.9692 21.489 20.9986 22.0405Z"
                fill={shareHover ? "white" : "#777E91"}
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.2071 18.2071C20.8166 18.5976 20.1834 18.5976 19.7929 18.2071C19.4024 17.8166 19.4024 17.1834 19.7929 16.7929L23.2929 13.2929C23.6834 12.9024 24.3166 12.9024 24.7071 13.2929L28.2071 16.7929C28.5976 17.1834 28.5976 17.8166 28.2071 18.2071C27.8166 18.5976 27.1834 18.5976 26.7929 18.2071L25 16.4142V26C25 26.5523 24.5523 27 24 27C23.4477 27 23 26.5523 23 26V16.4142L21.2071 18.2071Z"
                fill={shareHover ? "white" : "#777E91"}
              />
            </svg>
            <svg
              style={{ cursor: "pointer" }}
              // className="n-downArrow"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onMouseEnter={handleMouseEnterLike}
              onMouseLeave={handleMouseLeaveLike}
            >
              <rect
                x="1"
                y="1"
                width="48"
                height="48"
                rx="23"
                fill={likeHover ? "#3772ff" : "#FCFCFD"}
                stroke={likeHover ? "white" : "#E6E8EC"}
                stroke-width="2"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M24.6924 18.9171C24.3055 19.2884 23.6945 19.2884 23.3076 18.9171L22.6152 18.2526C21.8048 17.4749 20.7099 17 19.5 17C17.0147 17 15 19.0147 15 21.5C15 23.8826 16.2898 25.8501 18.1518 27.4666C20.0153 29.0844 22.2434 30.1574 23.5746 30.7051C23.853 30.8196 24.147 30.8196 24.4254 30.7051C25.7566 30.1574 27.9847 29.0844 29.8482 27.4666C31.7102 25.85 33 23.8826 33 21.5C33 19.0147 30.9853 17 28.5 17C27.2901 17 26.1952 17.4749 25.3848 18.2526L24.6924 18.9171ZM24 16.8096C22.8321 15.6888 21.2465 15 19.5 15C15.9102 15 13 17.9102 13 21.5C13 27.8683 19.9703 31.385 22.8138 32.5547C23.5796 32.8697 24.4204 32.8697 25.1862 32.5547C28.0297 31.385 35 27.8682 35 21.5C35 17.9102 32.0899 15 28.5 15C26.7535 15 25.1679 15.6888 24 16.8096Z"
                fill={likeHover ? "white" : "#777E91"}
              />
            </svg>
          </div>
        </div>
      </section>
      <section class="n-marketSection">
        <div class="container">
          <div style={{ marginBottom: "64px" }}>
            <h2 class="d-flex justify-content-center marketmainheade">
              Learn about DeFi
            </h2>
            <p
              class="d-flex justify-content-center"
              style={{
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: "400",
                color: "#353945",
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
                  <h6 class="marketcardone">Learn & Earn</h6>
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
                  <h6 class="marketcardtwo">WEEKLY WATCHLIST AIRDROP</h6>
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
                  <h6 class="marketcardthree">FEATURED</h6>
                  <p class="cardtext">Submit your watchlist and win USDT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center n-marketLoadMore">
          <Link to={browserRoute.LEARN}>
            <button type="button" class="btn n-secondaryButton">
              {/* <img className="pr-2" src={Images.loadicon} /> */}
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
