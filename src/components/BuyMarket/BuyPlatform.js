import React, { useState, useEffect } from "react";
import withMainLayout from "../HOC/withMainLayout";
import { Button, Modal } from "react-bootstrap";
import Images from "../Helper/AllImages";
import { Link } from "react-router-dom";
import browserRoute from "../../Routes/browserRoutes";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
// import Images from "../../Helper/AllImages";
const BuyPlatform = () => {
  let history = useHistory();

  const { id } = useParams();
  const [YayModal, setYayModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [TokenPriceUSD, setTokenPriceUSD] = useState("");
  const [tokenData, setTokenData] = useState([]);
  const mainState = useSelector((state) => state.main.midgardPool);

  const handleCloseYay = () => setYayModal(false);
  const handleShowYay = () => {
    setConfirmModal(false);
    setYayModal(true);
  };
  const handleCloseConfirm = () => {
    setConfirmModal(false);
  };
  const handleShowConfirm = () => {
    setConfirmModal(true);
  };
  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const fromAmountHandler = (e) => {
    setFromAmount(e.target.value);
    setToAmount(financial(Number(e.target.value) / Number(TokenPriceUSD)));
  };
  const toAmountHandler = (e) => {
    setToAmount(e.target.value);
    setFromAmount(financial(Number(e.target.value) * Number(TokenPriceUSD)));
  };

  useEffect(async () => {
    if (mainState) {
      let data = mainState?.filter((d) => d.asset === id);

      setTokenData(data[0]);
      await axios
        .get(
          `https://min-api.cryptocompare.com/data/price?fsym=${data[0].asset}&tsyms=USD`
        )
        .then((res) => {
          console.log("res===>>", res.data.USD);
          setTokenPriceUSD(res.data.USD);
        });
    } else {
      history.push("/");
    }
  }, [mainState]);

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <>
      {/*Yay Pop Up Modal*/}

      <Modal
        show={YayModal}
        onHide={handleCloseYay}
        // backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          closeButton
          style={{ borderBottom: "none" }}
        ></Modal.Header>
        <Modal.Body>
          {/* <!-- Modal --> */}

          <div
            // class="modal fade"
            id="successBuy"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div>
                <div class="modal-body">
                  <div class="d-flex justify-content-center  mb-3">
                    <h1
                      style={{
                        fontWeight: "bold",
                        paddingTop: "12px",
                        fontFamily: "DM Sans",
                        fontSize: "48px",
                        paddingRight: "10px",
                      }}
                    >
                      Yay!
                    </h1>
                    <img src={Images.Yay} />
                  </div>
                  <div class="d-flex justify-content-center ">
                    <p class="yahparagraph">You successfully bought</p>
                  </div>
                  <div class="d-flex justify-content-center">
                    <p
                      style={{
                        fontWeight: "bold",
                        fontFamily: "Poppins",
                        fontSize: "16px",
                      }}
                    >
                      <span
                        style={{
                          color: "#58BD7D",
                          fontWeight: "bold",
                          fontFamily: "Poppins",
                          fontSize: "16px",
                        }}
                      >
                        1.1123 BTC
                      </span>{" "}
                      for{" "}
                      <span
                        style={{
                          color: "#07C078",
                          fontWeight: "bold",
                          fontFamily: "Poppins",
                        }}
                      >
                        35,000 USDT
                      </span>
                      !
                    </p>
                  </div>
                  <div class="transactionclasss">
                    <div class="d-flex justify-content-between pt-2">
                      <p
                        style={{
                          color: "#777E90",
                          fontSize: "14px",
                          fontFamily: "Poppins",
                          paddingTop: "24px",
                        }}
                      >
                        Status
                      </p>
                      <p
                        style={{
                          color: "#777E90",
                          fontSize: "14px",
                          paddingRight: "48px",
                          paddingTop: "24px",
                          fontFamily: "Poppins",
                        }}
                      >
                        Transaction ID
                      </p>
                    </div>
                    <div class="d-flex justify-content-between">
                      <p
                        style={{
                          color: "#58BD7D",
                          fontWeight: "bold",
                          fontFamily: "Poppins",
                          fontSize: "14px",
                        }}
                      >
                        Completed
                      </p>
                      <p
                        style={{
                          fontWeight: "bold",
                          fontFamily: "Poppins",
                          fontSize: "14px",
                        }}
                      >
                        0msx836930...87r398
                      </p>
                    </div>
                    <hr class="solid" />
                    <p
                      style={{
                        color: "#777E90",
                        fontSize: "18px",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                      }}
                    >
                      Address
                    </p>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                      }}
                    >
                      0msx836930...87r398
                    </p>
                  </div>
                </div>
                <div class="d-flex justify-content-center pb-3 pt-2 pl-3 pr-3">
                  <button
                    type="button"
                    class="btn btn-primary btn-lg btn-block"
                  >
                    Wallet
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- modal end --> */}
        </Modal.Body>
      </Modal>

      {/*Confirm PopUp Modal */}

      <Modal
        show={confirmModal}
        onHide={handleCloseConfirm}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        {/* <Modal.Header
          closeButton
          style={{ borderBottom: "none" }}
        ></Modal.Header> */}
        <Modal.Body>
          {/* <!-- Modal --> */}
          <div
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div role="document">
              <div>
                <div class="modal-body">
                  <div class="d-flex justify-content-between pt-2 pb-2">
                    <div class="d-flex">
                      <img
                        class="pt-3"
                        style={{ height: "25px", marginTop: "3px" }}
                        onClick={handleCloseConfirm}
                        src={Images.lefttwoline}
                      />
                      <p class="yahparagraphs pl-2 pt-1">Confirm</p>
                    </div>
                    <div>
                      <img
                        style={{ height: "25px", marginTop: "10px" }}
                        src={Images.setting}
                      />
                    </div>
                  </div>
                  <div
                    class="d-flex justify-content-between mt-5 pl-5 pr-5 pt-3 pb-3"
                    style={{
                      backgroundColor: "#F4F5F6",
                      borderRadius: "10px",
                    }}
                  >
                    <div class="d-flex">
                      <img
                        class="pt-1"
                        style={{ height: "45px" }}
                        src={Images.From}
                      />
                      <div class="pl-2">
                        <p
                          class="tranparagraph"
                          style={{ margin: "0px", fontFamily: "DM Sans" }}
                        >
                          From
                        </p>
                        <p
                          style={{
                            fontWeight: "bold",
                            fontFamily: "Poppins",
                            fontSize: "14px",
                          }}
                        >
                          35,000 USDT
                        </p>
                      </div>
                    </div>
                    <div class="d-flex">
                      <img
                        class="pt-1"
                        style={{ height: "45px" }}
                        src={Images.to}
                      />
                      <div class="pl-2">
                        <p
                          class="tranparagraph"
                          style={{ margin: "0px", fontFamily: "DM Sans" }}
                        >
                          {" "}
                          To
                        </p>
                        <p
                          style={{
                            fontWeight: "bold",
                            fontFamily: "Poppins",
                            fontSize: "14px",
                          }}
                        >
                          1.1137 BTC
                        </p>
                      </div>
                    </div>
                    <div class="d-flex">
                      <img
                        class="pt-1"
                        style={{ height: "45px" }}
                        src={Images.proto}
                      />
                      <div class="pl-2">
                        <p
                          class="tranparagraph"
                          style={{ margin: "0px", fontFamily: "DM Sans" }}
                        >
                          {" "}
                          Protocol
                        </p>
                        <p
                          style={{
                            fontWeight: "bold",
                            fontFamily: "Poppins",
                            fontSize: "14px",
                          }}
                        >
                          THORChain
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between pt-5">
                    <p style={{ fontWeight: "bold", fontFamily: "Poppins" }}>
                      1.1137
                    </p>
                    <p style={{ fontWeight: "bold", fontFamily: "Poppins" }}>
                      BTC
                    </p>
                  </div>
                  <hr class="solid" />
                  <div class="d-flex justify-content-between">
                    <p class="servicefee">Service fee</p>
                    <p style={{ fontWeight: "bold", fontFamily: "Poppins" }}>
                      0.0045 ETH
                    </p>
                  </div>
                  <div class="d-flex justify-content-between ">
                    <p class="servicefee">You will get</p>
                    <p style={{ fontWeight: "bold", fontFamily: "Poppins" }}>
                      1.1123 BTC
                    </p>
                  </div>
                </div>
                <div class="d-flex justify-content-between pb-3 pt-2 pl-3 pr-3">
                  <button
                    style={{
                      paddingLeft: "30px",
                      paddingRight: "30px",
                      borderColor: "#E6E8EC",
                      borderRadius: "20px",
                      fontFamily: "Poppins",
                      color: "#000",
                    }}
                    type="button"
                    class="btn btn-outline-secondary"
                    onClick={handleCloseConfirm}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    style={{ fontSize: "16px", fontFamily: "DM Sans" }}
                    class="btn btn-primary btn-lg"
                    onClick={handleShowYay}
                  >
                    I understand, continue
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- modal end --> */}
        </Modal.Body>
      </Modal>
      {/* Div Started */}
      <section style={{ backgroundColor: "#F1F2F4", paddingTop: "3px" }}>
        <div
          class="container-fluid mt-1 pt-4 pb-3"
          style={{
            paddingLeft: "150px",
            paddingRight: "150px",
            backgroundColor: "#FCFCFD",
          }}
        >
          <div class="row">
            <div class="col-lg-2">
              <h4
                style={{
                  color: "#141416",
                  fontWeight: "600",
                  fontFamily: "DM Sans",
                }}
              >
                {tokenData?.asset}/USDT
              </h4>
              <p class="marketparatwow">Bitcoin</p>
            </div>
            <div class="col-lg-2">
              <div class="d-flex">
                <h4 class="numberheading">
                  {numberWithCommas(financial(tokenData?.assetPriceUSD))}
                </h4>
                <img class="pl-3" src={Images.goup3} />
              </div>
              <p class="marketparatwow">
                {" "}
                <img src={Images.sss} />{" "}
                {numberWithCommas(financial(tokenData?.assetPriceUSD))}
              </p>
            </div>
            <div class="col-lg-2" style={{ borderRight: "1px solid #E6E8EC" }}>
              <p class="marketparatwow">
                {" "}
                <img src={Images.clock} /> 24h change
              </p>

              {tokenData.change_24h >= 0 ? (
                <>
                  <h5
                    style={{
                      color: "#00C076",
                      fontFamily: "Poppins",
                      fontWeight: "400",
                      fontSize: "16px",
                    }}
                  >
                    {numberWithCommas(financial(tokenData?.assetPriceUSD))} +
                    {financial(tokenData?.change_24h)}%
                  </h5>
                </>
              ) : (
                <>
                  <>
                    <h5
                      style={{
                        color: "#f04e4e",
                        fontFamily: "Poppins",
                        fontWeight: "400",
                        fontSize: "16px",
                      }}
                    >
                      {numberWithCommas(financial(tokenData?.assetPriceUSD))}{" "}
                      {financial(tokenData?.change_24h)}%
                    </h5>
                  </>
                </>
              )}
            </div>
            <div class="col-lg-2" style={{ borderRight: "1px solid #E6E8EC" }}>
              <p class="marketparatwow">
                {" "}
                <img src={Images.up} /> 24h high
              </p>
              <h5
                style={{
                  fontFamily: "DM Sans",
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  fontSize: "16px",
                }}
              >
                {tokenData.change_24h_Highest >= 0 ? (
                  <>
                    {numberWithCommas(financial(tokenData?.biggestVal))} +
                    {financial(tokenData?.change_24h_Highest)}%
                  </>
                ) : (
                  <>
                    {numberWithCommas(financial(tokenData?.biggestVal))}{" "}
                    {financial(tokenData?.change_24h_Highest)}%
                  </>
                )}
              </h5>
            </div>
            <div class="col-lg-2" style={{ borderRight: "1px solid #E6E8EC" }}>
              <p class="marketparatwow">
                {" "}
                <img src={Images.down} /> 24h low
              </p>
              <h5
                style={{
                  fontFamily: "DM Sans",
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  fontSize: "16px",
                }}
              >
                {tokenData.change_24h_Lowest >= 0 ? (
                  <>
                    {numberWithCommas(financial(tokenData?.smallestVal))} +
                    {financial(tokenData?.change_24h_Lowest)}%
                  </>
                ) : (
                  <>
                    {numberWithCommas(financial(tokenData?.smallestVal))}{" "}
                    {financial(tokenData?.change_24h_Lowest)}%
                  </>
                )}{" "}
              </h5>
            </div>
            <div class="col-lg-2">
              <p class="marketparatwow">
                {" "}
                <img src={Images.hourr} /> 24h volume
              </p>
              <h5
                style={{
                  fontFamily: "DM Sans",
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  fontSize: "16px",
                }}
              >
                {tokenData.change_24h >= 0 ? (
                  <>
                    {numberWithCommas(financial(tokenData?.volume24h))} +
                    {financial(tokenData?.change_24h)}%
                  </>
                ) : (
                  <>
                    {numberWithCommas(financial(tokenData?.volume24h))}{" "}
                    {financial(tokenData?.change_24h)}%
                  </>
                )}{" "}
              </h5>
            </div>
          </div>
        </div>
      </section>
      <section style={{ backgroundColor: "#F1F2F4" }}>
        <div class="container mt-3">
          <div class="row">
            <div
              class="col-lg-4 mt-1 mb-3 pt-4 pb-4"
              style={{ backgroundColor: "#FCFCFD", height: "350px" }}
            >
              <button
                class="mt-2"
                style={{
                  padding: "5px 15px 5px 15px",
                  border: "none",
                  borderRadius: "15px",
                  fontWeight: "bold",
                }}
              >
                <Link
                  to={browserRoute.MARKET}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontFamily: "DM Sans",
                  }}
                >
                  Market
                </Link>
              </button>
              <div class="d-flex justify-content-between pt-4">
                <h2
                  style={{
                    color: "#23262F",
                    fontWeight: "600",
                    fontFamily: "Poppins",
                    fontSize: "24px",
                  }}
                >
                  Buy {tokenData?.asset}
                </h2>
                <div class="d-flex">
                  <img
                    style={{
                      height: "15px",
                      width: "15px",
                      paddingTop: "2px",
                    }}
                    src={Images.bbbtc}
                  />
                  <p
                    style={{
                      fontFamily: "Poppins",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                    class="pl-2"
                  >
                    10,098,36 USDT
                  </p>
                </div>
              </div>
              <form>
                <div class="input-group mb-3 mt-3">
                  <input
                    style={{
                      borderRadius: "10px",
                      border: "3px solid #E6E8EC",
                      color: "#777E90",
                      fontSize: "14px",
                      backgroundColor: "#fcfcfd",
                      fontWeight: "bold",
                      fontFamily: "Poppins",
                    }}
                    type="text"
                    value={fromAmount}
                    onChange={fromAmountHandler}
                    class="form-control pt-4 pb-4"
                    placeholder="From"
                    aria-label="From"
                    aria-describedby="basic-addon2"
                  />
                  {/* <div class="input-group-append"> */}
                  <button
                    style={{
                      border: "none",
                      position: "absolute",
                      right: "4px",
                      top: "10px",
                      color: "#777E90",
                      fontSize: "14px",
                      fontWeight: "bold",
                      fontFamily: "Poppins",
                      zIndex: "4",
                    }}
                    class="btn"
                    type="button"
                  >
                    USDT
                  </button>
                  {/* </div> */}
                </div>
              </form>
              <form>
                <div class="input-group mb-3 mt-3">
                  <input
                    style={{
                      borderRadius: "10px",
                      border: "3px solid #E6E8EC",
                      color: "#777E90",
                      fontSize: "14px",
                      backgroundColor: "#fcfcfd",
                      fontWeight: "bold",
                      fontFamily: "Poppins",
                    }}
                    type="text"
                    value={toAmount}
                    onChange={toAmountHandler}
                    class="form-control pt-4 pb-4"
                    placeholder="TO"
                    aria-label="From"
                    aria-describedby="basic-addon2"
                  />
                  {/* <div class="input-group-append"> */}
                  <button
                    style={{
                      border: "none",
                      position: "absolute",
                      right: "12px",
                      top: "10px",
                      color: "#777E90",
                      fontSize: "14px",
                      fontWeight: "bold",
                      fontFamily: "Poppins",
                      zIndex: "4",
                    }}
                    class="btn"
                    type="button"
                  >
                    {tokenData?.asset}
                  </button>
                  {/* </div> */}
                </div>
              </form>

              {/* <div class="input-group mb-3 mt-3">
                <input
                  style={{ borderRight: "none" }}
                  type="text"
                  class="form-control"
                  placeholder="To"
                  aria-label="To"
                  aria-describedby="basic-addon2"
                />
                <div class="input-group-append">
                  <button
                    style={{ borderLeft: "none", borderColor: "#ced4da" }}
                    class="btn btn-outline-secondary"
                    type="button"
                  >
                    {tokenData?.asset}
                  </button>
                </div>
              </div> */}

              <button
                style={{ fontSize: "16px", fontFamily: "Dm Sans" }}
                type="button"
                class="btn btn-primary btn-lg btn-block"
                onClick={handleShowConfirm}
              >
                Buy {tokenData?.asset}
              </button>
            </div>
            <div style={{ paddingLeft: "5px" }} class="col-lg-8  mt-1 mb-3">
              <div class="pl-3 pt-5" style={{ backgroundColor: "#FCFCFD" }}>
                <div class="d-flex justify-content-between">
                  <p
                    style={{
                      fontSize: "30px",
                      fontWeight: "bold",
                      fontFamily: "Poppins",
                    }}
                  >
                    {numberWithCommas(financial(tokenData?.assetPriceUSD))} USD{" "}
                    <span
                      style={{
                        color: "#4FBF67",
                        fontSize: "18px",
                        fontFamily: "Poppins",
                        fontWeight: "400",
                      }}
                    >
                      +0.92%
                    </span>
                  </p>
                  <div class="d-flex" style={{ paddingRight: "40px" }}>
                    <img
                      style={{ width: "15px", height: "15px" }}
                      src={Images.clock}
                    />
                    <button class="graphbutton">1D</button>
                    <button class="graphbutton">1W</button>
                    <button class="graphbutton">1M</button>
                    <button class="graphbutton">3M</button>
                    <button class="graphbutton">1Y</button>
                    <button class="graphbutton">ALL TIME</button>
                  </div>
                </div>
                <img
                  class="pt-5 pb-4"
                  style={{ width: "670px" }}
                  src={Images.linechart}
                />
                <div class="d-flex justify-content-between pr-3">
                  <p style={{ fontFamily: "DM Sans", fontWeight: "bold" }}>
                    09:00
                  </p>
                  <p style={{ fontFamily: "DM Sans", fontWeight: "bold" }}>
                    09:00
                  </p>
                  <p style={{ fontFamily: "DM Sans", fontWeight: "bold" }}>
                    09:00
                  </p>
                  <p style={{ fontFamily: "DM Sans", fontWeight: "bold" }}>
                    09:00
                  </p>
                  <p style={{ fontFamily: "DM Sans", fontWeight: "bold" }}>
                    09:00
                  </p>
                  <p style={{ fontFamily: "DM Sans", fontWeight: "bold" }}>
                    09:00
                  </p>
                  <p style={{ fontFamily: "DM Sans", fontWeight: "bold" }}>
                    09:00
                  </p>
                </div>
                <hr class="solid" style={{ margin: "0px" }} />
                <div class="row">
                  <div
                    class="col-lg-6"
                    style={{ borderRight: "1px solid lightgrey" }}
                  >
                    <div class="d-flex pl-5 pt-5">
                      <img style={{ height: "40px" }} src={Images.pt1} />
                      <div class="pl-2">
                        <p
                          style={{
                            margin: "0px",
                            color: "#808191",
                            fontFamily: "Poppins",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          Market cap
                          {/* <i class="pl-2 fa fa-exclamation-circle"></i> */}
                          <img class="pl-1 pt-1" src={Images.exclamation} />
                        </p>
                        <p class="font-weight-bold">
                          {numberWithCommas(financial(tokenData?.marketCap))}{" "}
                          USD
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="d-flex pl-5 pt-5">
                      <img style={{ height: "40px" }} src={Images.pt2} />
                      <div class="pl-2">
                        <p
                          style={{
                            margin: "0px",
                            color: "#808191",
                            fontFamily: "Poppins",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          Volume(24h)
                          <img class="pl-1 pt-1" src={Images.exclamation} />
                        </p>
                        <p class="font-weight-bold">
                          {numberWithCommas(financial(tokenData?.volume24h))}{" "}
                          USD
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="solid" style={{ margin: "0px" }} />
                <div class="row">
                  <div
                    class="col-lg-6"
                    style={{ borderRight: "1px solid lightgrey" }}
                  >
                    <div class="d-flex pl-5 pt-5">
                      <img style={{ height: "40px" }} src={Images.pt3} />
                      <div class="pl-2">
                        <p
                          style={{
                            margin: "0px",
                            color: "#808191",
                            fontFamily: "Poppins",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          Circulating Supply
                          <img class="pl-1 pt-1" src={Images.exclamation} />
                        </p>
                        <p class="font-weight-bold">
                          {numberWithCommas(
                            financial(tokenData?.circulating_supply)
                          )}{" "}
                          USD
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="d-flex pl-5 pt-5">
                      <img style={{ height: "40px" }} src={Images.pt4} />
                      <div class="pl-2">
                        <p
                          style={{
                            margin: "0px",
                            color: "#808191",
                            fontFamily: "Poppins",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          Total Supply
                          <img class="pl-1 pt-1" src={Images.exclamation} />
                        </p>
                        <p class="font-weight-bold">
                          {numberWithCommas(financial(tokenData?.total_supply))}{" "}
                          USD
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="solid" style={{ margin: "0px" }} />
                <div class="row">
                  <div class="col-lg-8 pl-5 pt-5 pb-4">
                    <h2 class="bitcoinheadeing">About Bitcoin</h2>
                    <p
                      style={{
                        color: "#5e5b5b",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                      }}
                    >
                      The worlds first Cryptocurrency, Bitcoin is stored and
                      exchange securely on the internet through a digital ledger
                      known as a blochchain. Bitcoins are divisible into smaller
                      units known as satoshis-each satoshi is worth 0.00000001
                      bitcoin.
                    </p>
                  </div>
                  <div class="col-lg-4 pt-5">
                    <div class="d-flex">
                      <img
                        class="pt-2"
                        style={{ width: "20px", height: "25px" }}
                        src={Images.warrr}
                      />
                      <a
                        class="pt-2 pl-3"
                        href="#"
                        style={{
                          fontWeight: "700",
                          fontFamily: "Poppins",
                          fontSize: "14px",
                        }}
                      >
                        Official Website
                      </a>
                    </div>
                    <div class="d-flex">
                      <img
                        class="pt-2"
                        style={{ width: "20px", height: "25px" }}
                        src={Images.warrr}
                      />
                      <a
                        class="pt-2 pl-3"
                        href="#"
                        style={{
                          fontWeight: "700",
                          fontFamily: "Poppins",
                          fontSize: "14px",
                        }}
                      >
                        White Paper
                      </a>
                    </div>
                    <div class="d-flex">
                      <img
                        class="pt-2"
                        style={{ width: "20px", height: "25px" }}
                        src={Images.warrr}
                      />
                      <a
                        class="pt-2 pl-3"
                        href="#"
                        style={{
                          fontWeight: "700",
                          fontFamily: "Poppins",
                          fontSize: "14px",
                        }}
                      >
                        Source Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default withMainLayout(BuyPlatform);
