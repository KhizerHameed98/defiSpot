import React, { useState, useEffect, useRef } from "react";
import withMainLayout from "../HOC/withMainLayout";
import { Modal } from "react-bootstrap";
import Images from "../Helper/AllImages";
import { useHistory, useParams, withRouter, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ResponsiveLine } from "@nivo/line";
import Chart from "react-apexcharts";
import { linearGradientDef } from "@nivo/core";

import {
  nativeSwapping,
  handleMainModal,
  serverDecryption,
} from "../../Services/mainServices";
import Setting_Modal from "../PopModals/Setting_Modal";
import { CRYPTOCOMPARE_KEY } from "../../Services/environment";

const series = [
  {
    data: [
      {
        x: new Date(1538778600000),
        y: [6629.81, 6650.5, 6623.04, 6633.33],
      },
      {
        x: new Date(1538780400000),
        y: [6632.01, 6643.59, 6620, 6630.11],
      },
      {
        x: new Date(1538782200000),
        y: [6630.71, 6648.95, 6623.34, 6635.65],
      },
      {
        x: new Date(1538784000000),
        y: [6635.65, 6651, 6629.67, 6638.24],
      },
      {
        x: new Date(1538785800000),
        y: [6638.24, 6640, 6620, 6624.47],
      },
      {
        x: new Date(1538787600000),
        y: [6624.53, 6636.03, 6621.68, 6624.31],
      },
      {
        x: new Date(1538789400000),
        y: [6624.61, 6632.2, 6617, 6626.02],
      },
      {
        x: new Date(1538791200000),
        y: [6627, 6627.62, 6584.22, 6603.02],
      },
      {
        x: new Date(1538793000000),
        y: [6605, 6608.03, 6598.95, 6604.01],
      },
      {
        x: new Date(1538794800000),
        y: [6604.5, 6614.4, 6602.26, 6608.02],
      },
      {
        x: new Date(1538796600000),
        y: [6608.02, 6610.68, 6601.99, 6608.91],
      },
      {
        x: new Date(1538798400000),
        y: [6608.91, 6618.99, 6608.01, 6612],
      },
      {
        x: new Date(1538800200000),
        y: [6612, 6615.13, 6605.09, 6612],
      },
      {
        x: new Date(1538802000000),
        y: [6612, 6624.12, 6608.43, 6622.95],
      },
      {
        x: new Date(1538803800000),
        y: [6623.91, 6623.91, 6615, 6615.67],
      },
      {
        x: new Date(1538805600000),
        y: [6618.69, 6618.74, 6610, 6610.4],
      },
      {
        x: new Date(1538807400000),
        y: [6611, 6622.78, 6610.4, 6614.9],
      },
      {
        x: new Date(1538809200000),
        y: [6614.9, 6626.2, 6613.33, 6623.45],
      },
      {
        x: new Date(1538811000000),
        y: [6623.48, 6627, 6618.38, 6620.35],
      },
      {
        x: new Date(1538812800000),
        y: [6619.43, 6620.35, 6610.05, 6615.53],
      },
      {
        x: new Date(1538814600000),
        y: [6615.53, 6617.93, 6610, 6615.19],
      },
      {
        x: new Date(1538816400000),
        y: [6615.19, 6621.6, 6608.2, 6620],
      },
      {
        x: new Date(1538818200000),
        y: [6619.54, 6625.17, 6614.15, 6620],
      },
      {
        x: new Date(1538820000000),
        y: [6620.33, 6634.15, 6617.24, 6624.61],
      },
      {
        x: new Date(1538821800000),
        y: [6625.95, 6626, 6611.66, 6617.58],
      },
      {
        x: new Date(1538823600000),
        y: [6619, 6625.97, 6595.27, 6598.86],
      },
      {
        x: new Date(1538825400000),
        y: [6598.86, 6598.88, 6570, 6587.16],
      },
      {
        x: new Date(1538827200000),
        y: [6588.86, 6600, 6580, 6593.4],
      },
      {
        x: new Date(1538829000000),
        y: [6593.99, 6598.89, 6585, 6587.81],
      },
      {
        x: new Date(1538830800000),
        y: [6587.81, 6592.73, 6567.14, 6578],
      },
      {
        x: new Date(1538832600000),
        y: [6578.35, 6581.72, 6567.39, 6579],
      },
      {
        x: new Date(1538834400000),
        y: [6579.38, 6580.92, 6566.77, 6575.96],
      },
      {
        x: new Date(1538836200000),
        y: [6575.96, 6589, 6571.77, 6588.92],
      },
      {
        x: new Date(1538838000000),
        y: [6588.92, 6594, 6577.55, 6589.22],
      },
      {
        x: new Date(1538839800000),
        y: [6589.3, 6598.89, 6589.1, 6596.08],
      },
      {
        x: new Date(1538841600000),
        y: [6597.5, 6600, 6588.39, 6596.25],
      },
      {
        x: new Date(1538843400000),
        y: [6598.03, 6600, 6588.73, 6595.97],
      },
      {
        x: new Date(1538845200000),
        y: [6595.97, 6602.01, 6588.17, 6602],
      },
      {
        x: new Date(1538847000000),
        y: [6602, 6607, 6596.51, 6599.95],
      },
      {
        x: new Date(1538848800000),
        y: [6600.63, 6601.21, 6590.39, 6591.02],
      },
      {
        x: new Date(1538850600000),
        y: [6591.02, 6603.08, 6591, 6591],
      },
      {
        x: new Date(1538852400000),
        y: [6591, 6601.32, 6585, 6592],
      },
      {
        x: new Date(1538854200000),
        y: [6593.13, 6596.01, 6590, 6593.34],
      },
      {
        x: new Date(1538856000000),
        y: [6593.34, 6604.76, 6582.63, 6593.86],
      },
      {
        x: new Date(1538857800000),
        y: [6593.86, 6604.28, 6586.57, 6600.01],
      },
      {
        x: new Date(1538859600000),
        y: [6601.81, 6603.21, 6592.78, 6596.25],
      },
      {
        x: new Date(1538861400000),
        y: [6596.25, 6604.2, 6590, 6602.99],
      },
      {
        x: new Date(1538863200000),
        y: [6602.99, 6606, 6584.99, 6587.81],
      },
      {
        x: new Date(1538865000000),
        y: [6587.81, 6595, 6583.27, 6591.96],
      },
      {
        x: new Date(1538866800000),
        y: [6591.97, 6596.07, 6585, 6588.39],
      },
      {
        x: new Date(1538868600000),
        y: [6587.6, 6598.21, 6587.6, 6594.27],
      },
      {
        x: new Date(1538870400000),
        y: [6596.44, 6601, 6590, 6596.55],
      },
      {
        x: new Date(1538872200000),
        y: [6598.91, 6605, 6596.61, 6600.02],
      },
      {
        x: new Date(1538874000000),
        y: [6600.55, 6605, 6589.14, 6593.01],
      },
      {
        x: new Date(1538875800000),
        y: [6593.15, 6605, 6592, 6603.06],
      },
      {
        x: new Date(1538877600000),
        y: [6603.07, 6604.5, 6599.09, 6603.89],
      },
      {
        x: new Date(1538879400000),
        y: [6604.44, 6604.44, 6600, 6603.5],
      },
      {
        x: new Date(1538881200000),
        y: [6603.5, 6603.99, 6597.5, 6603.86],
      },
      {
        x: new Date(1538883000000),
        y: [6603.85, 6605, 6600, 6604.07],
      },
      {
        x: new Date(1538884800000),
        y: [6604.98, 6606, 6604.07, 6606],
      },
    ],
  },
];

const BuyPlatform = (props) => {
  const match = props.match;

  const fromMarket = "op";
  const myRefSwap = useRef();
  const myRefSwap2 = useRef();
  console.log("FROM MARK <<><><><><><<><> ", props);
  console.log("FROM MATCHHHHHH <<><><><><><<><> ", match.params);
  let history = useHistory();
  const dispatch = useDispatch();

  const { id } = useParams();
  const [YayModal, setYayModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [TokenPriceUSD, setTokenPriceUSD] = useState("");
  const [tokenData, setTokenData] = useState(null);
  const [keyStore, setKeyStore] = useState([]);
  const [selectedCurr, setSelectedCurr] = useState(null);
  const [statusLink, setStatusLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [toOptionDropDown, setToOptionDropDown] = useState(false);
  const [selectedCurrTo, setSelectedCurrTo] = useState("");
  const [optionsDropdown, setOptionsDropdown] = useState(false);
  const mainState = useSelector((state) => state.main.midgardPool);
  const graphState = useSelector((state) => state.main.graphDataCombined);
  const walletType = useSelector((state) => state.main.walletType);
  const [midgardData, setMidgardData] = useState([]);
  const loggedin = useSelector((state) => state.main.isLoggedin);
  const assetBalance = useSelector((state) => state.main.assetBalance);
  const midgardPool = useSelector((state) => state.main.midgardPool);
  const [graphData, setGraphData] = useState([]);
  const [search, setSearch] = useState("");
  const [slippagePercent, setSlippagePercent] = useState(0);
  const [updatedGraphData, setUpdatedGraphData] = useState();
  const [selectedFilter, setSelectedFilter] = useState("1D");
  const [graphData1D, setGraphData1D] = useState([]);
  const [graphData1H, setGraphData1H] = useState([]);
  const [graphData1M, setGraphData1M] = useState([]);
  const [graphData1Y, setGraphData1Y] = useState([]);
  const [emptyError, setEmptyError] = useState(false);

  useEffect(() => {
    console.log("===== DDD ======== ", graphData1D);
    console.log("===== HHH ======== ", graphData1H);
    console.log("===== MMM ======== ", graphData1M);
    console.log("===== YYY ======== ", graphData1Y);
  }, [graphData1H, graphData1M, graphData1Y, graphData1D]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e) {
      if (myRefSwap && myRefSwap.current) {
        const ref = myRefSwap.current;
        if (!ref.contains(e.target)) {
          setOptionsDropdown(false);
        }
      }
      if (myRefSwap2 && myRefSwap2.current) {
        const ref = myRefSwap2.current;
        if (!ref.contains(e.target)) {
          setToOptionDropDown(false);
        }
      }
    }
  }, []);
  // useEffect(() => {

  //   if (selectedFilter == "1D") {
  //     setGraphData(graphData1D);
  //   } else if (selectedFilter == "1H") {
  //     setGraphData(graphData1H);
  //   } else if (selectedFilter == "1M") {
  //     setGraphData(graphData1M);
  //   } else if (selectedFilter == "1Y") {
  //     setGraphData(graphData1Y);
  //   }
  // }, [selectedFilter]);

  useEffect(() => {
    if (graphState?.length > 0) {
      if (tokenData) {
        console.log(`GGgggGGGGGGGGGGGGGG----- `, graphState);
        console.log(`tokenDATA<><><><><><><><><><><><><>----- `, tokenData);
        // console.log(
        //   `tokenDATASPLIT<><><><><><><><><><><><><>----- `,
        //   tokenData?.rawData.split("-")[0]
        // );
        let res = graphState?.filter(
          (d) => d.assetName.split("-")[0] === tokenData?.rawData.split("-")[0]
        );
        console.log("QQQQQQQQQQQQQQQQQQQ=====>>", res);
        setUpdatedGraphData(res);

        const graph1D = res[0]?.graphData1D;
        const graph1H = res[0]?.graphData1Hr;
        const graph1M = res[0]?.graphData1M;
        const graph1Y = res[0]?.graphData1Y;

        console.log("graph1D<><><><><><><<><><><><><><><>", graph1D);
        let finalData = graph1D?.map((data, k) => {
          return {
            x:
              new Date(Number(data.timeStamp) * 1000)
                .toString()
                .substring(4, 10) +
              " " +
              new Date(Number(data.timeStamp) * 1000)
                .toString()
                .substring(16, 21),
            y: data.assetPriceUSD,
          };
        });

        let finalData2 = graph1H?.map((data, k) => {
          return {
            x:
              new Date(Number(data.timeStamp) * 1000)
                .toString()
                .substring(4, 10) +
              " " +
              new Date(Number(data.timeStamp) * 1000)
                .toString()
                .substring(16, 21),
            y: data.assetPriceUSD,
          };
        });

        let finalData3 = graph1M?.map((data, k) => {
          return {
            x: new Date(Number(data.timeStamp) * 1000)
              .toString()
              .substring(4, 16),
            y: data.assetPriceUSD,
          };
        });

        let finalData4 = graph1Y?.map((data, k) => {
          return {
            x: new Date(Number(data.timeStamp) * 1000)
              .toString()
              .substring(4, 16),
            y: data.assetPriceUSD,
          };
        });

        setGraphData1D([
          {
            id: res?.[0]?.assetName,
            color: "hsl(344, 70%, 50%)",
            data: finalData,
          },
        ]);

        setGraphData1H([
          {
            id: res?.[0]?.assetName,
            color: "hsl(344, 70%, 50%)",
            data: finalData2,
          },
        ]);

        setGraphData1M([
          {
            id: res?.[0]?.assetName,
            color: "hsl(344, 70%, 50%)",
            data: finalData3,
          },
        ]);

        setGraphData1Y([
          {
            id: res?.[0]?.assetName,
            color: "hsl(344, 70%, 50%)",
            data: finalData4,
          },
        ]);

        console.log("=-=-=RRRRRRR-=-=-=>", res?.[0]?.assetName);
        console.log("=-=-=1D DATAAAAAAAAAAA-=-=-=>", finalData);
        console.log("=-=-=1H DATAAAAAAAAAAA-=-=-=>", finalData2);
        console.log("=-=-=1M DATAAAAAAAAAAA-=-=-=>", finalData3);
        console.log("=-=-=1Y DATAAAAAAAAAAA-=-=-=>", finalData4);

        // setGraphData(graphData1D);
      }
    }
    if (tokenData) {
      setSelectedCurrTo(tokenData);
    }
  }, [tokenData]);

  const [displayLineGraph, setDisplayLineGraph] = useState(true);
  const RUNE = {
    asset: "RUNE",
    blockchain: "THOR",
    assetFullName: "Rune",
    rawData: "THOR.RUNE",
    logo: "https://cryptologos.cc/logos/thorchain-rune-logo.png",
    address: "",
  };
  useEffect(() => {
    setKeyStore(assetBalance);
  }, [assetBalance]);

  useEffect(() => {
    if (mainState) {
      let res = mainState[0];
      console.log("mainState=====>>", mainState);
      setMidgardData([...mainState]);
    }
  }, [mainState]);

  useEffect(() => {
    if (midgardData) {
      midgardData.unshift(RUNE);
    }
  }, [midgardData]);
  useEffect(async () => {
    if (selectedCurr && tokenData) {
      setToAmount(0);
      setFromAmount(0);
      await axios
        .get(
          `https://min-api.cryptocompare.com/data/price?fsym=${selectedCurrTo?.asset}&tsyms=${selectedCurr?.asset?.ticker}&api_key=${CRYPTOCOMPARE_KEY}`
        )
        .then((res) => {
          console.log("res===>>", res.data);
          setTokenPriceUSD(res.data[Object.keys(res.data)[0]]);
        });
    }
  }, [selectedCurr, selectedCurrTo]);

  useEffect(() => {
    if (!loggedin) {
      history.push("/");
    }
  }, [loggedin]);

  useEffect(async () => {
    if (mainState && mainState.length) {
      console.log("mainStata<><><><><><><><><><><><><><><><><><><>", mainState);
      let data = mainState?.filter((d) => d._id === match.params.id);

      setTokenData(data[0]);
      console.log("data[0]======-=-=-=-=>>>>>", data[0]);

      const gData = data[0].graphData;

      var finalData = gData?.map((data) => {
        return {
          x: new Date(Number(data.timeStamp) * 1000)
            .toString()
            .substring(4, 10),
          y: data.assetPriceUSD,
        };
      });

      console.log("=-=-=FINAL-=-=-=>", finalData);

      // setGraphData([
      //   {
      //     id: data[0].asset,
      //     color: "hsl(344, 70%, 50%)",
      //     data: finalData,
      //   },
      // ]);

      // console.log("ID====>>", decryptedObject);
    } else {
      history.push("/");
    }
  }, [mainState]);

  useEffect(() => {
    if (graphData1D) {
      setGraphData(graphData1D);
    }
  }, [graphData1D]);

  useEffect(() => {
    if (keyStore) {
      keyStore?.slice(0, 1)?.map((t) => {
        if (t?.asset) {
          setSelectedCurr(t);
        }
      });
    }
  }, [keyStore]);

  const handleCloseYay = () => setYayModal(false);

  const handleCloseConfirm = () => {
    setConfirmModal(false);
  };
  const handleShowConfirm = () => {
    //check loggedin state

    if (parseFloat(fromAmount) > 0) {
      setConfirmModal(true);
      console.log("----VAL===== ", parseFloat(fromAmount));
    } else {
      console.log("----VAL===== ", parseFloat(fromAmount));
      setEmptyError(true);
    }
  };

  //Submit Swap
  const submitSwap = () => {
    if (loggedin) {
      let fromData;
      if (selectedCurr?.asset?.ticker === "RUNE") {
        fromData = RUNE;
      } else {
        fromData = midgardPool.find(
          (data) =>
            data.blockchain === selectedCurr.asset.chain &&
            data.asset === selectedCurr.asset.ticker
        );
      }
      console.log("fromData=====>>", fromData);
      const decimal = selectedCurr.amount.decimal;
      if (fromData) {
        dispatch(
          nativeSwapping(
            fromData,
            selectedCurrTo,
            fromAmount,
            decimal,
            midgardPool,
            setYayModal,
            setConfirmModal,
            setTransactionHash,
            setStatusLink,
            setLoading,
            walletType
          )
        );
      }
    } else {
      // console.log("loggedOUT");
      dispatch(handleMainModal(true));
    }
  };

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const fromAmountHandler = (e) => {
    const name = selectedCurr?.asset?.ticker;
    console.log("to amount set-- ", e.target.value);
    if (e.target.value >= 0) {
      setFromAmount(e.target.value);
      console.log(
        "to amount set-- ",
        financial(Number(e.target.value) / Number(TokenPriceUSD))
      );
      setToAmount(Number(e.target.value) / Number(TokenPriceUSD));
    }
  };
  const toAmountHandler = (e) => {
    if (e.target.value >= 0) {
      setToAmount(e.target.value);
      setFromAmount(Number(e.target.value) * Number(TokenPriceUSD));
    }
  };
  const gettingLogos = (t) => {
    let midgardPool = mainState;

    let ticker = t?.asset?.ticker;
    if (t.asset.ticker.toLowerCase() === "rune") {
      ticker = "XRUNE";
    }

    let res = midgardPool?.find(
      (d) => d?.asset.toLowerCase() === ticker.toLowerCase()
    );
    return (
      <img
        src={res.logo}
        width="24px"
        height="24px"
        style={{ marginRight: "6px" }}
      />
    );
  };

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  console.log("=-=-=StateFinalData-=-=- ", graphData);

  const statusRouting = () => {
    // history.push(statusLink);
    console.log("statusLink=====", statusLink);
  };

  const filterAllType = (e) => {
    e.preventDefault();
    setKeyStore(assetBalance);
  };
  const filterNative = (e) => {
    e.preventDefault();
    let res = assetBalance.filter(
      (data) => data?.asset?.chain === data?.asset?.ticker
    );
    setKeyStore(res);
  };

  const filterERC20 = (e) => {
    e.preventDefault();
    let res = assetBalance.filter(
      (data) => data?.asset?.chain === "ETH" && data?.asset?.ticker !== "ETH"
    );
    setKeyStore(res);
  };

  const filterBEP2 = (e) => {
    e.preventDefault();
    let res = assetBalance.filter(
      (data) => data?.asset?.chain === "BNB" && data?.asset?.ticker !== "BNB"
    );
    setKeyStore(res);
  };

  /*TO */

  const filterAllTypeTo = (e) => {
    e.preventDefault();

    setMidgardData(mainState);
  };
  const filterNativeTo = (e) => {
    e.preventDefault();
    let res = mainState.filter((data) => data?.blockchain === data?.asset);
    setMidgardData(res);
  };

  const filterERC20To = (e) => {
    e.preventDefault();
    let res = mainState.filter(
      (data) => data?.blockchain === "ETH" && data?.asset !== "ETH"
    );
    setMidgardData(res);
  };

  const filterBEP2To = (e) => {
    e.preventDefault();
    let res = mainState.filter(
      (data) => data?.blockchain === "BNB" && data?.asset !== "BNB"
    );
    setMidgardData(res);
  };
  const implementSearch = (e) => {
    setSearch(e.target.value);
  };

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
          // closeButton
          style={{ borderBottom: "none" }}
        >
          <svg
            onClick={handleCloseYay}
            className="w-widtradre8777"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
              fill="#23262F"
            />
            <rect
              x="1"
              y="1"
              width="38"
              height="38"
              rx="19"
              stroke="#E6E8EC"
              stroke-width="2"
            />
          </svg>
        </Modal.Header>
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
            <div>
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
                    <p class="yahparagraph">
                      Your transaction has been initiated!
                    </p>
                  </div>
                  <div class=" ">
                    <a
                      href={statusLink}
                      class=""
                      style={{
                        cursor: "pointer",
                        color: "blue",
                        fontSize: "14px",
                        width: "450px",
                        display: "block",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {statusLink}
                    </a>
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
                        Initiated
                      </p>
                      <br />
                      <p
                        style={{
                          marginLeft: "50px",
                          fontWeight: "bold",
                          fontFamily: "Poppins",
                          fontSize: "14px",
                          overflow: "hidden",
                        }}
                      >
                        {transactionHash ? <> {transactionHash}</> : null}
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
                  <div class="d-flex justify-content-between pt-5">
                    <p style={{ fontWeight: "bold", fontFamily: "Poppins" }}>
                      {/* 1.1137 */}
                      {toAmount}
                    </p>
                    <p style={{ fontWeight: "bold", fontFamily: "Poppins" }}>
                      {/* BTC */}
                      {selectedCurrTo?.asset}
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
                <div class="d-flex justify-content-center pb-3 pt-2 pl-3 pr-3">
                  {/* <button
                    type="button"
                    class="btn btn-primary btn-lg btnHoverWhite"
                  >
                    Wallet
                  </button> */}
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
                        class="pt-3 backArrow"
                        style={{ height: "25px", marginTop: "3px" }}
                        onClick={handleCloseConfirm}
                        src={Images.lefttwoline}
                      />
                      <p class="yahparagraphs pl-2 pt-1">Confirm</p>
                    </div>
                    <div>
                      {/* <img
                        className="settingmodlicon4444"
                        style={{
                          height: "25px",
                          marginTop: "10px",
                          cursor: "pointer",
                        }}
                        src={Images.setting}
                      /> */}
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
                          {fromAmount} {selectedCurr?.asset?.ticker}
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
                          {toAmount} {selectedCurrTo?.asset}
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
                    <p style={{ fontWeight: "600", fontFamily: "DM Sans" }}>
                      {toAmount}
                    </p>
                    <p style={{ fontWeight: "600", fontFamily: "DM Sans" }}>
                      {selectedCurrTo?.asset}
                    </p>
                  </div>
                  <hr class="solid" />
                  <div class="d-flex justify-content-between">
                    <p class="servicefee">Service fee</p>
                    <p style={{ fontWeight: "600", fontFamily: "DM Sans" }}>
                      0.0045 ETH
                    </p>
                  </div>
                  <div class="d-flex justify-content-between ">
                    <p class="servicefee">You will get</p>
                    <p style={{ fontWeight: "600", fontFamily: "DM Sans" }}>
                      1.1123 BTC
                    </p>
                  </div>
                </div>
                <div class="d-flex justify-content-between pb-3 pt-2 pl-3 pr-3">
                  <button
                    style={{
                      paddingLeft: "30px",
                      paddingRight: "30px",
                      border: "2px solid #E6E8EC",
                      borderRadius: "20px",
                      fontWeight: "600",
                      fontFamily: "DM Sans",
                      color: "#000",
                    }}
                    type="button"
                    class="btn btn-outline-secondary btnHoverBlue"
                    onClick={handleCloseConfirm}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={loading}
                    type="button"
                    style={{ fontSize: "16px", fontFamily: "DM Sans" }}
                    class="btn btn-primary btn-lg btnHoverWhite"
                    onClick={submitSwap}
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
      <section style={{ backgroundColor: "#F1F2F4" }}>
        <div
          class="swap-container"
          style={{ paddingTop: "20px", paddingBottom: "20px" }}
        >
          <div className="row">
            <div
              className="col-sm-12"
              style={{ paddingLeft: "10px", paddingRight: "10px" }}
            >
              <div
                style={{
                  backgroundColor: "#FCFCFD",
                  borderRadius: "15px",
                  padding: "10px 15px",
                }}
              >
                <div className="row">
                  <div className="col-lg-4">
                    <div
                      className="d-flex align-items-center"
                      style={{ height: "100%" }}
                    >
                      <div>
                        {/* {console.log("nmbr --- ", check)} */}
                        <img
                          style={{
                            width: "18px",
                            margin: "0 10px",
                            cursor: "pointer",
                          }}
                          src={Images.iconsLeftline}
                          onClick={() =>
                            window.history.go(
                              Number(match.params.check) == 1 ? -2 : -1
                            )
                          }
                        />

                        <img
                          style={{ width: "32px", margin: "0 10px" }}
                          // src={Images.btc}
                          src={tokenData?.logo}
                        />
                      </div>
                      <div>
                        <h4 className="w-headinfswaming09888">
                          {tokenData?.assetFullName}
                        </h4>
                        <h4 className="w-headinfswaming01">
                          {tokenData?.asset}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="d-flex justify-content-between flex-wrap u-swappingdonemain3455">
                      <div className="w-swap-top-inner">
                        <p class="w-marketparatwow">
                          {" "}
                          {/* <img src={Images.clock} /> */}
                          <img src={Images.up} /> Change
                        </p>

                        {tokenData?.change_24h >= 0 ? (
                          <>
                            <h5
                              style={{
                                color: "#00C076",
                                fontFamily: "DM Sans",
                                fontWeight: "600",
                                fontSize: "12px",
                                marginBottom: "0",
                              }}
                            >
                              {numberWithCommas(
                                financial(tokenData?.assetPriceUSD)
                              )}{" "}
                              +{financial(tokenData?.change_24h)}%
                            </h5>
                          </>
                        ) : (
                          <>
                            <>
                              <h5
                                style={{
                                  color: "#f04e4e",
                                  fontFamily: "DM Sans",
                                  fontWeight: "600",
                                  fontSize: "12px",
                                  marginBottom: "0",
                                }}
                              >
                                $
                                {numberWithCommas(
                                  financial(tokenData?.assetPriceUSD)
                                )}
                                {/* {" "} */}({financial(tokenData?.change_24h)}
                                %)
                              </h5>
                            </>
                          </>
                        )}
                      </div>
                      <div className="w-swap-top-inner">
                        <p class="w-marketparatwow">
                          {" "}
                          <img src={Images.up} /> High
                        </p>
                        <h5
                          style={{
                            fontFamily: "DM Sans",
                            fontWeight: "600",
                            fontSize: "12px",
                            marginBottom: "0",
                          }}
                        >
                          {tokenData?.change_24h_Highest >= 0 ? (
                            <>
                              $
                              {numberWithCommas(
                                financial(tokenData?.biggestVal)
                              )}
                              {/* + */}
                              {/* {financial(tokenData?.change_24h_Highest)}% */}
                            </>
                          ) : (
                            <>
                              {numberWithCommas(
                                financial(tokenData?.biggestVal)
                              )}
                              {/* {" "} */}
                              {/* {financial(tokenData?.change_24h_Highest)}% */}
                            </>
                          )}
                        </h5>
                      </div>
                      <div className="w-swap-top-inner">
                        <p class="w-marketparatwow">
                          {" "}
                          <img src={Images.down} /> Low
                        </p>
                        <h5
                          style={{
                            fontFamily: "DM Sans",
                            fontWeight: "600",
                            fontSize: "12px",
                            marginBottom: "0",
                          }}
                        >
                          {tokenData?.change_24h_Lowest >= 0 ? (
                            <>
                              $
                              {numberWithCommas(
                                financial(tokenData?.smallestVal)
                              )}
                              {/* + */}
                              {/* {financial(tokenData?.change_24h_Lowest)}% */}
                            </>
                          ) : (
                            <>
                              $
                              {numberWithCommas(
                                financial(tokenData?.smallestVal)
                              )}
                              {/* {" "} */}
                              {/* {financial(tokenData?.change_24h_Lowest)}% */}
                            </>
                          )}{" "}
                        </h5>
                      </div>

                      <div className="w-swap-top-inner">
                        <p class="w-marketparatwow">
                          {" "}
                          <img src={Images.down} /> Volume
                        </p>
                        <h5
                          style={{
                            fontFamily: "DM Sans",
                            fontWeight: "600",
                            fontSize: "12px",
                            marginBottom: "0",
                          }}
                        >
                          {tokenData?.change_24h >= 0 ? (
                            <>
                              $
                              {numberWithCommas(
                                financial(tokenData?.volume24h)
                              )}
                              {/* + */}
                              {/* {financial(tokenData?.change_24h)}% */}
                            </>
                          ) : (
                            <>
                              $
                              {numberWithCommas(
                                financial(tokenData?.volume24h)
                              )}
                              {/* {" "} */}
                              {/* {financial(tokenData?.change_24h)}% */}
                            </>
                          )}{" "}
                        </h5>
                      </div>
                      <div className="w-swap-top-inner d-flex align-items-center w-swap-top-inner-bg">
                        <h5
                          style={{
                            fontFamily: "DM Sans",
                            fontWeight: "600",
                            fontSize: "12px",
                            marginBottom: "0",
                          }}
                        >
                          {selectedFilter}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ backgroundColor: "#F1F2F4" }}>
        <div class="swap-container">
          <div class="row">
            <div
              class="col-lg-8 order-2 order-lg-1"
              style={{
                marginBottom: "65px",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <div
                class=""
                style={{ backgroundColor: "#FCFCFD", borderRadius: "15px" }}
              >
                <div
                  style={{ borderBottom: "2px solid #f2f2f2", height: "60px" }}
                  class="d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <p className="u-burmarketmainpparagrpahj00 d-flex align-items-center">
                      {numberWithCommas(financial(tokenData?.assetPriceUSD))}{" "}
                      USD{" "}
                      <span
                        style={{
                          color: "#4FBF67",
                          fontSize: "12px",
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          marginLeft: "10px",
                        }}
                      >
                        +0.92%
                      </span>
                    </p>
                    <div className="ml-4">
                      <button
                        className={
                          displayLineGraph
                            ? "btn w-swap-chartButtonAC mx-1"
                            : "btn w-swap-chartButton mx-1"
                        }
                        onClick={() => setDisplayLineGraph(true)}
                      >
                        Graph
                      </button>
                      <button
                        className={
                          displayLineGraph
                            ? "btn w-swap-chartButton mx-1"
                            : "btn w-swap-chartButtonAC mx-1"
                        }
                        onClick={() => setDisplayLineGraph(false)}
                      >
                        Candles
                      </button>
                    </div>
                  </div>
                  <div
                    class="d-flex"
                    style={{
                      // marginTop: "40px",
                      paddingRight: "30px",
                    }}
                  >
                    {displayLineGraph ? (
                      <>
                        <button
                          class="graphbutton"
                          onClick={() => {
                            setSelectedFilter("1H");
                            setGraphData(graphData1H);
                          }}
                          style={{
                            color: selectedFilter == "1H" ? "black" : "#808191",
                          }}
                        >
                          1H
                        </button>
                        {/* <button class="graphbutton pl-2">24H</button> */}
                        <button
                          class="graphbutton pl-2"
                          onClick={() => {
                            setSelectedFilter("1D");
                            setGraphData(graphData1D);
                          }}
                          style={{
                            color: selectedFilter == "1D" ? "black" : "#808191",
                          }}
                        >
                          1D
                        </button>
                        <button
                          class="graphbutton pl-2"
                          onClick={() => {
                            setSelectedFilter("1M");
                            setGraphData(graphData1M);
                          }}
                          style={{
                            color: selectedFilter == "1M" ? "black" : "#808191",
                          }}
                        >
                          1M
                        </button>
                        <button
                          class="graphbutton pl-2"
                          onClick={() => {
                            setSelectedFilter("1Y");
                            setGraphData(graphData1Y);
                          }}
                          style={{
                            color: selectedFilter == "1Y" ? "black" : "#808191",
                          }}
                        >
                          1Y
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          class="graphbutton pl-2"
                          onClick={() => {
                            setSelectedFilter("1M");
                            setGraphData(graphData1M);
                          }}
                          style={{
                            color: selectedFilter == "1M" ? "black" : "#808191",
                          }}
                        >
                          1M
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div
                  class=""
                  style={{
                    width: "100%",
                    height: "400px",
                    marginBottom: "20px",
                  }}
                >
                  {console.log(
                    "graphdata<><><><><><><<><><><><><<><>><><><<>",
                    graphData
                  )}
                  {console.log(
                    "graphdata1D<><><><><><><<><><><><><<><>><><><<>",
                    graphData1D
                  )}{" "}
                  {console.log(
                    "graphdata1M<><><><><><><<><><><><><<><>><><><<>",
                    graphData1M
                  )}{" "}
                  {console.log(
                    "graphdata1H<><><><><><><<><><><><><<><>><><><<>",
                    graphData1H
                  )}{" "}
                  {console.log(
                    "graphdata1Y<><><><><><><<><><><><><<><>><><><<>",
                    graphData1Y
                  )}
                  {displayLineGraph && graphData.length ? (
                    <ResponsiveLine
                      enableGridX={false}
                      enableGridY={false}
                      data={graphData}
                      margin={{ top: 20, right: 30, bottom: 10, left: 30 }}
                      xScale={{ type: "point" }}
                      yScale={{
                        type: "linear",
                        min: "auto",
                        max: "auto",
                        stacked: true,
                        reverse: false,
                      }}
                      curve="monotoneY"
                      yFormat=" >-.2f"
                      axisBottom={null}
                      colors={["#355dff"]}
                      lineWidth={3}
                      enableArea={true}
                      areaOpacity={0.3}
                      axisTop={null}
                      axisRight={null}
                      axisLeft={null}
                      tooltip={({ point }) => {
                        return (
                          <div
                            style={{
                              padding: "15px",
                              backgroundColor: "#353945",
                              borderRadius: "10px",
                              fontFamily: "Poppins",
                              fontSize: "12px",
                              fontWeight: "400",
                            }}
                          >
                            <div className="my-1">
                              <span style={{ color: "#777e90" }}>Price:</span>
                              <span
                                style={{ color: "#fff", marginLeft: "15px" }}
                              >
                                18435434.3424
                              </span>
                            </div>
                            <div className="my-1">
                              <span style={{ color: "#777e90" }}>Sum BTC:</span>
                              <span
                                style={{ color: "#ffc107", marginLeft: "15px" }}
                              >
                                18435434
                              </span>
                            </div>
                            <div className="my-1">
                              <span style={{ color: "#777e90" }}>
                                Sum USDT:
                              </span>
                              <span
                                style={{ color: "#17a2b8", marginLeft: "15px" }}
                              >
                                18435.434
                              </span>
                            </div>
                          </div>
                        );
                      }}
                      pointSize={0}
                      pointColor={{ theme: "background" }}
                      pointBorderWidth={2}
                      pointBorderColor={{ from: "serieColor" }}
                      pointLabelYOffset={-12}
                      useMesh={true}
                      areaBaselineValue={false}
                      defs={[
                        linearGradientDef("gradientA", [
                          { offset: 0, color: "inherit" },
                          { offset: 60, color: "inherit", opacity: 0.4 },
                          { offset: 75, color: "inherit", opacity: 0.2 },
                          { offset: 85, color: "inherit", opacity: 0 },
                          { offset: 100, color: "inherit", opacity: 0 },
                        ]),
                      ]}
                      fill={[{ match: "*", id: "gradientA" }]}
                      legends={[]}
                    />
                  ) : (
                    <Chart
                      options={{
                        options: {
                          chart: {
                            id: "candlestick",
                          },
                          xaxis: {
                            categories: [
                              1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998,
                              1999,
                            ],
                          },
                        },
                        yaxis: {
                          show: false,
                        },
                        xaxis: {
                          labels: {
                            show: false,
                          },
                          axisBorder: {
                            show: false,
                          },
                          axisTicks: {
                            show: false,
                          },
                          tooltip: {
                            enabled: false,
                          },
                        },
                        chart: {
                          toolbar: {
                            tools: {
                              download: false,
                            },
                          },
                        },
                        grid: {
                          show: false,
                        },
                      }}
                      series={series}
                      type="candlestick"
                      width="100%"
                      height="100%"
                    />
                  )}
                </div>
                {console.log("----graphData----- ", graphData)}

                <div
                  style={{ paddingLeft: "30px", paddingRight: "30px" }}
                  class="d-flex justify-content-around"
                >
                  {graphData &&
                    graphData[0]?.data?.slice(0, 4)?.map((d) => (
                      <p
                        style={{
                          fontWeight: "400",
                          fontSize: "13px",
                          color: "#23262F",
                        }}
                      >
                        {/* Sept15 */}
                        {d.x}
                      </p>
                    ))}
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
                            fontFamily: "DM Sans",
                            fontSize: "14px",
                            fontWeight: "400",
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
                            fontFamily: "DM Sans",
                            fontSize: "14px",
                            fontWeight: "400",
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
                            fontFamily: "DM Sans",
                            fontSize: "14px",
                            fontWeight: "400",
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
                            fontFamily: "DM Sans",
                            fontSize: "14px",
                            fontWeight: "400",
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
                  <div class="col-lg-12 px-5 pt-5 pb-4">
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
                </div>
              </div>
            </div>
            <div
              class="col-lg-4 order-1 order-lg-2"
              style={{
                marginBottom: "20px",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#FCFCFD",
                  height: "350px",
                  borderRadius: "15px",
                }}
                // className="pt-4 pb-4"
              >
                {/* <button
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
              </button> */}
                <div
                  style={{
                    borderBottom: "2px solid #f2f2f2",
                    padding: "15px",
                    height: "60px",
                  }}
                  class="d-flex justify-content-between"
                >
                  <h2
                    style={{
                      color: "#23262F",
                      fontWeight: "600",
                      fontFamily: "DM Sans",
                      fontSize: "18px",
                      marginBottom: "0px",
                      width: "100%",
                    }}
                    class="d-flex justify-content-between"
                  >
                    <span>Swap</span>
                    <Setting_Modal setSlippagePercent={setSlippagePercent} />
                    {/* {tokenData?.asset} */}
                  </h2>
                </div>
                {/*Slippage*/}
                {/* <h6>Slippage: {slippagePercent}%</h6> */}
                <div style={{ padding: "20px 15px" }}>
                  <form class="w-currencyform">
                    <div class="input-group position-relative">
                      <div class="n-currencySelect" ref={myRefSwap}>
                        <div class="w-currency">
                          <div
                            class="d-flex flex-row align-items-center"
                            onClick={() => {
                              setOptionsDropdown(!optionsDropdown);
                            }}
                          >
                            {selectedCurr ? (
                              <> {gettingLogos(selectedCurr)}</>
                            ) : null}
                            {/* {selectedCurr?.asset?.ticker} */}
                            <img
                              style={{ width: "18px" }}
                              src={Images.iconarowdown}
                            />
                          </div>
                        </div>
                        {/* <ul className="n-currencyDropDown"> */}
                        <ul
                          class={
                            `n-currencyDropDown w-currency-height ` +
                            (optionsDropdown ? "d-block" : "d-none")
                          }
                        >
                          <ul className="w-pd-outer list-unstyled n-learnFilterLabels mb-2">
                            <li
                              className="d-flex flex-row justify-content-between align-items-center"
                              style={{ margin: "0 4px" }}
                            >
                              <button
                                className="alltype"
                                style={{ color: "#fff", fontFamily: "DM Sans" }}
                                onClick={filterAllType}
                              >
                                All
                              </button>
                            </li>
                            <li
                              className="d-flex flex-row justify-content-center align-items-center"
                              style={{ margin: "0 4px" }}
                            >
                              <button
                                className="alltype-nonActive"
                                style={{
                                  color: "#fff",
                                  fontFamily: "DM Sans",
                                  whiteSpace: "nowrap",
                                }}
                                onClick={filterNative}
                              >
                                Native
                              </button>
                            </li>
                            <li
                              className="d-flex flex-row justify-content-center align-items-center"
                              style={{ margin: "0 4px" }}
                            >
                              <button
                                className="alltype-nonActive"
                                style={{ color: "#fff", fontFamily: "DM Sans" }}
                                onClick={filterERC20}
                              >
                                ERC20
                              </button>
                            </li>
                            <li
                              className="d-flex flex-row justify-content-center align-items-center"
                              style={{ margin: "0 4px" }}
                            >
                              <button
                                className="alltype-nonActive"
                                style={{ color: "#fff", fontFamily: "DM Sans" }}
                                onClick={filterBEP2}
                              >
                                BEP2
                              </button>
                            </li>
                          </ul>
                          <div class="w-pd-outer d-flex form-group has-search mb-2 n-inputSearch w-100 ">
                            <input
                              type="text"
                              value={search}
                              class="form-control n-tableSearch w-100"
                              placeholder="Search"
                              onChange={implementSearch}
                            />
                            <img
                              style={{
                                width: "20px",
                                height: "20px",
                                marginLeft: "-35px",
                                marginTop: "10px",
                                marginBottom: "10px",
                              }}
                              src={Images.searchicon}
                            />
                          </div>

                          {keyStore
                            ?.filter((val) => {
                              return val?.asset?.ticker
                                ?.toLowerCase()
                                .includes(search?.toLowerCase());
                            })
                            .map((d, key) => {
                              return (
                                <>
                                  <li
                                    class="d-flex flex-row align-items-center w-hover-drop"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setSelectedCurr(d);
                                      setOptionsDropdown(false);
                                    }}
                                  >
                                    {gettingLogos(d)}
                                    {/* <img
                                src={Images.ltc}
                                // width="24px"
                                // height="24px"
                                style={{ marginRight: "6px" }}
                              /> */}
                                    <div class="d-flex flex-row align-items-center justify-content-between w-100 n-currencyDetails">
                                      <div class="n-currencyName d-flex flex-column justify-content-start">
                                        <p>{d?.asset?.ticker}</p>
                                        <span>Native</span>
                                      </div>
                                      <div class="n-currencyValue">
                                        {financial(
                                          Number(d?.amount?.amount()?.c[0]) /
                                            Math.pow(10, d?.amount?.decimal)
                                        )}{" "}
                                        {d?.asset?.ticker}
                                      </div>
                                    </div>
                                  </li>
                                  <hr className="m-0"></hr>
                                </>
                              );
                            })}
                        </ul>
                      </div>
                      <input
                        style={{
                          borderRadius: "15px",
                          border: "3px solid #f6f6f6",
                          color: "#777E90",
                          fontSize: "14px",
                          backgroundColor: "#fcfcfd",
                          fontWeight: "600",
                          fontFamily: "DM Sans",
                          paddingLeft: "25%",
                          paddingRight: "18%",
                          textAlign: "right",
                        }}
                        onFocus={() => setEmptyError(false)}
                        type="text"
                        min={0}
                        value={fromAmount}
                        onChange={fromAmountHandler}
                        class="form-control pt-4 pb-4"
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
                          color: "#212529",
                          fontSize: "14px",
                          fontWeight: "600",
                          fontFamily: "DM Sans",
                          zIndex: "4",
                          boxShadow: "none",
                        }}
                        class="btn"
                        type="button"
                      >
                        {selectedCurr?.asset?.ticker}
                        {/* USDT */}
                      </button>
                      {/* </div> */}
                    </div>
                  </form>
                  {/*end*/}
                  <div class="d-flex justify-content-end py-3 pr-2">
                    <div
                      style={{
                        fontSize: 10,
                        color: "red",
                        marginLeft: 32,
                        marginTop: -14,
                        // height: "5px",
                      }}
                    >
                      {emptyError && <>* Swapping amount is required</>}
                    </div>
                    {/* <img
                    style={{
                      height: "15px",
                      width: "15px",
                      paddingTop: "2px",
                    }}
                    src={Images.bbbtc}
                  /> */}
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#777e90",
                      }}
                      class="pl-2 mb-0"
                    >
                      Available Balance
                    </p>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                      class="pl-2 mb-0"
                    >
                      {financial(
                        Number(selectedCurr?.amount?.amount().c[0]) /
                          Math.pow(10, selectedCurr?.amount.decimal)
                      )}{" "}
                      {selectedCurr?.asset?.ticker}
                    </p>
                  </div>
                  <form class="w-currencyform">
                    <div class="input-group mb-3">
                      <div class="n-currencySelect" ref={myRefSwap2}>
                        <div class="w-currency">
                          <div
                            class="d-flex flex-row align-items-center"
                            onClick={() => {
                              setToOptionDropDown(!toOptionDropDown);
                            }}
                          >
                            {selectedCurrTo ? (
                              <>
                                {" "}
                                <img
                                  src={selectedCurrTo.logo}
                                  width="24px"
                                  height="24px"
                                  style={{ marginRight: "6px" }}
                                />
                              </>
                            ) : null}
                            {/* {selectedCurrTo?.asset} */}
                            <img
                              style={{ width: "18px" }}
                              src={Images.iconarowdown}
                            />
                          </div>
                        </div>
                        {/* <ul className="n-currencyDropDown"> */}
                        <ul
                          class={
                            `n-currencyDropDown w-currency-height ` +
                            (toOptionDropDown ? "d-block" : "d-none")
                          }
                        >
                          <ul className="w-pd-outer list-unstyled n-learnFilterLabels mb-2">
                            <li
                              className="d-flex flex-row justify-content-between align-items-center"
                              style={{ margin: "0 4px" }}
                            >
                              <button
                                className="alltype"
                                style={{ color: "#fff", fontFamily: "DM Sans" }}
                                onClick={filterAllTypeTo}
                              >
                                All
                              </button>
                            </li>
                            <li
                              className="d-flex flex-row justify-content-center align-items-center"
                              style={{ margin: "0 4px" }}
                            >
                              <button
                                className="alltype-nonActive"
                                style={{
                                  color: "#fff",
                                  fontFamily: "DM Sans",
                                  whiteSpace: "nowrap",
                                }}
                                onClick={filterNativeTo}
                              >
                                Native
                              </button>
                            </li>
                            <li
                              className="d-flex flex-row justify-content-center align-items-center"
                              style={{ margin: "0 4px" }}
                            >
                              <button
                                className="alltype-nonActive"
                                style={{ color: "#fff", fontFamily: "DM Sans" }}
                                onClick={filterERC20To}
                              >
                                ERC20
                              </button>
                            </li>
                            <li
                              className="d-flex flex-row justify-content-center align-items-center"
                              style={{ margin: "0 4px" }}
                            >
                              <button
                                className="alltype-nonActive"
                                style={{ color: "#fff", fontFamily: "DM Sans" }}
                                onClick={filterBEP2To}
                              >
                                BEP2
                              </button>
                            </li>
                          </ul>
                          <div class="w-pd-outer d-flex form-group has-search mb-2 n-inputSearch w-100 ">
                            <input
                              type="text"
                              value={search}
                              class="form-control n-tableSearch w-100"
                              placeholder="Search"
                              onChange={implementSearch}
                            />
                            <img
                              style={{
                                width: "20px",
                                height: "20px",
                                marginLeft: "-35px",
                                marginTop: "10px",
                                marginBottom: "10px",
                              }}
                              src={Images.searchicon}
                            />
                          </div>

                          {midgardData
                            ?.filter((val) => {
                              return val?.asset
                                ?.toLowerCase()
                                .includes(search?.toLowerCase());
                            })
                            .map((d, key) => {
                              return (
                                <>
                                  <li
                                    class="d-flex flex-row align-items-center w-hover-drop"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setSelectedCurrTo(d);
                                      console.log(d);
                                      setToOptionDropDown(false);
                                    }}
                                  >
                                    <img
                                      src={d?.logo}
                                      width="24px"
                                      height="24px"
                                      style={{ marginRight: "6px" }}
                                    />
                                    {/* <img
                                src={Images.ltc}
                                // width="24px"
                                // height="24px"
                                style={{ marginRight: "6px" }}
                              /> */}
                                    <div class="d-flex flex-row align-items-center justify-content-between w-100 n-currencyDetails">
                                      <div class="n-currencyName d-flex flex-column justify-content-start">
                                        <p>{d?.asset}</p>
                                        <span>Native</span>
                                      </div>
                                      {/* <div class="n-currencyValue">0</div> */}
                                    </div>
                                  </li>
                                  <hr className="m-0"></hr>
                                </>
                              );
                            })}
                        </ul>
                      </div>
                      <input
                        style={{
                          borderRadius: "15px",
                          border: "3px solid #f6f6f6",
                          color: "#777E90",
                          fontSize: "14px",
                          backgroundColor: "#fcfcfd",
                          fontWeight: "600",
                          fontFamily: "DM Sans",
                          paddingLeft: "25%",
                          paddingRight: "18%",
                          textAlign: "right",
                        }}
                        type="text"
                        value={toAmount}
                        onChange={toAmountHandler}
                        class="form-control pt-4 pb-4"
                        // placeholder="TO"
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
                          fontSize: "14px",
                          color: "#212529",
                          fontWeight: "600",
                          fontFamily: "DM Sans",
                          zIndex: "4",
                          boxShadow: "none",
                        }}
                        class="btn"
                        type="button"
                      >
                        {selectedCurrTo?.asset}
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
                    disabled={loading}
                    style={{ fontSize: "16px", fontFamily: "Dm Sans" }}
                    type="button"
                    class="btn btn-primary btn-lg btnHoverWhite mt-3 w-100"
                    onClick={handleShowConfirm}
                  >
                    Swap
                    {/* {tokenData?.asset} */}
                  </button>
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
