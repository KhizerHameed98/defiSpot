import React, { useState, useEffect } from "react";
import Images from "../Helper/AllImages";
import data from "../Helper/Data/TransactionHistory";
import { Modal } from "react-bootstrap";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { DateRangePicker, Calendar } from "react-date-range";
import { addDays } from "date-fns";

import { useSelector, useDispatch } from "react-redux";

const Activity = () => {
  const keyStoreInstance = useSelector((state) => state.main);

  const [exportModal, setExportModal] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [mainState, setMainState] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [toggle, setToggle] = useState(false);
  const [EnumRanges, setEnumRanges] = useState({
    CUSTOM_RANGE: "CUSTOM RANGE",
    ONE_DAY: "ONE DAY",
    ONE_WEEK: "ONE WEEK",
    ONE_MONTH: "ONE MONTH",
    ONE_YEAR: "ONE YEAR",
    ALL_TIME: "ALL TIME",
  });
  const [rangeType, setRangeType] = useState(EnumRanges.ALL_TIME);
  const [customToggle, setCustomToggle] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      // endDate: addDays(new Date(), 7),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [Enum, set_Enum] = useState({
    allType: "allType",
    withdraw: "withdraw",
    deposit: "deposit",
    pending: "pending",
  });
  const [filterType, setFilterType] = useState(Enum.allType);

  useEffect(() => {
    if (toggle) {
      const weekDay = document.getElementsByClassName("rdrWeekDay");
      console.log("weekDay========>>>", weekDay);
      console.log("weekDay========>>>", weekDay[0].innerHTML);
      for (let i = 0; i < weekDay.length; i++) {
        console.log("week" + i, weekDay[i].innerHTML);
        // weekDay[i].innerText = "some";
        switch (weekDay[i].innerText) {
          case "Sun":
            weekDay[i].innerText = "Su";
            break;
          case "Mon":
            weekDay[i].innerText = "Mo";
            break;
          case "Tue":
            weekDay[i].innerText = "Tu";
            break;
          case "Wed":
            weekDay[i].innerText = "We";
            break;
          case "Thu":
            weekDay[i].innerText = "Th";
            break;
          case "Fri":
            weekDay[i].innerText = "Fr";
            break;
          case "Sat":
            weekDay[i].innerText = "Sa";
            break;
          default:
            break;
        }
      }
    }
  }, [toggle]);

  useEffect(() => {
    setMainState(keyStoreInstance.transactionHistory);
  }, [
    keyStoreInstance.KeyStoreClient,
    keyStoreInstance.transactionHistory,
    keyStoreInstance,
  ]);

  useEffect(() => {
    setTransactionHistory(keyStoreInstance.transactionHistory);
    setTempData(keyStoreInstance.transactionHistory);
  }, mainState);

  function SearchFilter(e) {
    setSearchInput(e.target.value);

    if (!e.target.value) {
      setTransactionHistory(tempData);
    } else {
      let temp = tempData;
      console.log("hey Temp=====>>", temp);

      let res = temp?.filter(
        (value) =>
          value?.hash?.toLowerCase().includes(e.target.value.toLowerCase()) &&
          value
      );
      setTransactionHistory(res);
    }
  }
  function filterAllType() {
    setSearchInput("");
    setFilterType(Enum.allType);
    setTransactionHistory(mainState);
    setTempData(mainState);
  }
  function filterWithdrawType() {
    setSearchInput("");
    setFilterType(Enum.withdraw);

    let res = mainState?.filter(
      (value) => value.type.toLowerCase() === Enum.withdraw
    );

    setTransactionHistory(res);
    setTempData(res);
  }
  function filterDepositType() {
    setSearchInput("");
    setFilterType(Enum.deposit);
    let res = mainState.filter(
      (value) => value.type.toLowerCase() === Enum.deposit
    );

    setTransactionHistory(res);
    setTempData(res);
  }
  function filterPendingType() {
    setSearchInput("");
    setFilterType(Enum.pending);
    let res = mainState.filter(
      (value) => value.type.toLowerCase() === Enum.pending
    );

    setTransactionHistory(res);
    setTempData(res);
  }
  //CUSTOM HANDLER
  const handleCustom = (item) => {
    const newState = [...state];

    //for filteration
    let dateFilter = tempData?.filter((value) => {
      console.log("value========", value.date);
      let tempDate = new Date(value.date);
      tempDate.setHours(0);
      tempDate.setMinutes(0);
      tempDate.setSeconds(0);
      tempDate.setMilliseconds(0);
      newState[0].startDate.setHours(0);
      newState[0].startDate.setMinutes(0);
      newState[0].startDate.setSeconds(0);
      newState[0].startDate.setMilliseconds(0);

      newState[0].endDate.setHours(0);
      newState[0].endDate.setMinutes(0);
      newState[0].endDate.setSeconds(0);
      newState[0].endDate.setMilliseconds(0);

      console.log("time1===>>>", tempDate);
      console.log("time2===>>>", newState);

      return (
        tempDate >= newState[0].startDate &&
        tempDate <= newState[0].endDate &&
        value
      );
    });

    setTransactionHistory(dateFilter);
  };
  //ALL TIME HANDLER
  const handleAllTime = () => {
    setRangeType(EnumRanges.ALL_TIME);
    setCustomToggle(false);
    setToggle(false);
    setTransactionHistory(mainState);
  };

  //ONE DAY HANDLER
  const handleOneDay = () => {
    setRangeType(EnumRanges.ONE_DAY);
    setCustomToggle(false);
    const newState = [...state];
    newState[0].startDate = new Date();

    newState[0].endDate = new Date();
    setState(newState);
    //for filteration
    let dateFilter =
      // console.log("record", d);
      tempData?.filter((value) => {
        let tempDate = new Date(value.date);
        let actualDate = new Date();
        console.log("Date====>>", tempDate.getFullYear());
        return (
          tempDate.getMonth() == actualDate.getMonth() &&
          tempDate.getFullYear() == actualDate.getFullYear() &&
          tempDate.getDate() == actualDate.getDate() &&
          value
        );
      });

    setTransactionHistory(dateFilter);
  };

  //One Week Handler

  const handleOneWeek = () => {
    setRangeType(EnumRanges.ONE_WEEK);
    setCustomToggle(false);
    let curr = new Date();

    let yesterday = new Date();

    yesterday.setDate(curr.getDate());

    let week = [];

    for (let i = 1; i <= 7; i++) {
      let first = yesterday.getDate() - yesterday.getDay() + i;

      let day = new Date(yesterday.setDate(first)).toISOString().slice(0, 10);

      week.push(day);
    }
    const newState = [...state];
    newState[0].startDate = new Date(week[0]);

    newState[0].endDate = new Date(week[week.length - 1]);
    setState(newState);
    let start = new Date(week[0]);
    let end = new Date(week[week.length - 1]);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    start.setMilliseconds(0);
    end.setHours(0);
    end.setMinutes(0);
    end.setSeconds(0);
    end.setMilliseconds(0);
    //for filteration
    let dateFilter = tempData?.filter((value) => {
      let tempDate = new Date(value.date);
      tempDate.setHours(0);
      tempDate.setMinutes(0);
      tempDate.setSeconds(0);
      tempDate.setMilliseconds(0);
      console.log("Date====>>", tempDate.getFullYear());
      return tempDate >= start && tempDate <= end && value;
    });

    setTransactionHistory(dateFilter);
  };
  //ONE MONTH HANDLER
  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
  const handleOneMonth = () => {
    setRangeType(EnumRanges.ONE_MONTH);
    setCustomToggle(false);
    // for date Component
    const newStateMain = [...state];
    console.log("====>>>", newStateMain);

    const date = new Date(newStateMain[0].endDate);
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    let res = daysInMonth(month, year);
    let startDate = new Date(1);
    startDate.setMonth(date.getMonth());
    startDate.setFullYear(date.getFullYear());
    console.log("res====>>>", res);

    let endDate = new Date();
    endDate.setMonth(date.getMonth());
    endDate.setFullYear(date.getFullYear());
    endDate.setDate(res);

    const newState = [...state];
    newState[0].startDate = new Date(startDate);

    newState[0].endDate = new Date(endDate);
    setState(newState);
    //for filteration
    let dateFilter = tempData?.filter((value) => {
      // console.log("value========", value);
      let tempDate = new Date(value.date);
      let actualDate = new Date(newStateMain[0].endDate);

      return (
        tempDate.getMonth() == actualDate.getMonth() &&
        tempDate.getFullYear() == actualDate.getFullYear() &&
        value
      );
    });

    setTransactionHistory(dateFilter);
  };
  //ONE YEAR HANDLER
  const handleOneYear = () => {
    setRangeType(EnumRanges.ONE_YEAR);
    setCustomToggle(false);
    // for date Component
    const date = new Date();

    let startDate = new Date(1);
    startDate.setFullYear(date.getFullYear());
    startDate.setMonth(0);
    let endDate = new Date();
    endDate.setFullYear(date.getFullYear());
    endDate.setMonth(11);
    endDate.setDate(31);
    const newState = [...state];
    newState[0].startDate = new Date(startDate);

    newState[0].endDate = new Date(endDate);
    setState(newState);
    //for filteration
    let dateFilter = tempData?.filter((value) => {
      // console.log("value========", value);
      let tempDate = new Date(value.date);
      let actualDate = new Date();
      console.log("Date====>>", tempDate.getFullYear());
      return tempDate.getFullYear() == actualDate.getFullYear() && value;
    });

    setTransactionHistory(dateFilter);
  };
  const handleCustomRange = () => {
    setRangeType(EnumRanges.CUSTOM_RANGE);
    setCustomToggle(true);
  };
  function downloadCSVFile(csv_data) {
    // Create CSV file object and feed our

    // csv_data into it

    let CSVFile = new Blob([csv_data], { type: "text/csv" });

    // Create to temporary link to initiate

    // download process

    var temp_link = document.createElement("a");

    // Download csv file

    temp_link.download = "DefiSpot.csv";

    var url = window.URL.createObjectURL(CSVFile);

    temp_link.href = url;

    // This link should not be displayed

    temp_link.style.display = "none";

    document.body.appendChild(temp_link);

    // Automatically click the link to trigger download

    temp_link.click();

    document.body.removeChild(temp_link);
  }
  function tableToCSV() {
    // Variable to store the final csv data

    var csv_data = [];

    // Get each row data

    var rows = document.getElementsByTagName("tr");

    for (var i = 0; i < rows.length; i++) {
      var cols = rows[i].querySelectorAll("span,p");

      var csvrow = [];

      for (var j = 0; j < cols.length; j++) {
        // csvrow.push(cols[j].innerHTML);
        // console.log("myString====>>>", cols[j].innerHTML);
        let s = cols[j].innerHTML.split(" ");
        let newString = "";

        for (let m = 0; m < s.length; m++) {
          newString = newString + s[m];
        }
        csvrow.push(newString);
      }

      csv_data.push(csvrow.join(","));
    }

    csv_data = csv_data.join("\n");
    // console.log(csv_data);
    downloadCSVFile(csv_data);
  }

  //Descending Order Filter Type
  const handleDescendingType = () => {
    let check = [...mainState];
    let res = check.sort((a, b) =>
      a.type.toLowerCase() < b.type.toLowerCase() ? 1 : -1
    );

    setMainState(res);
    let check2 = [...transactionHistory];
    let res2 = check2.sort((a, b) =>
      a.type.toLowerCase() < b.type.toLowerCase() ? 1 : -1
    );
    setTransactionHistory(res2);
    let check3 = [...tempData];
    let res3 = check3.sort((a, b) =>
      a.type.toLowerCase() < b.type.toLowerCase() ? 1 : -1
    );
    setTempData(res3);
  };

  //Ascending Order Filter Type
  const handleAscendingType = () => {
    let check = [...mainState];
    let res = check.sort((a, b) =>
      a.type.toLowerCase() > b.type.toLowerCase() ? 1 : -1
    );

    setMainState(res);
    let check2 = [...transactionHistory];
    let res2 = check2.sort((a, b) =>
      a.type.toLowerCase() > b.type.toLowerCase() ? 1 : -1
    );
    setTransactionHistory(res2);
    let check3 = [...tempData];
    let res3 = check3.sort((a, b) =>
      a.type.toLowerCase() > b.type.toLowerCase() ? 1 : -1
    );
    setTempData(res3);
  };

  //Descending Order Filter Coin
  const handleDescendingCoin = () => {
    let check = [...mainState];
    let res = check.sort((a, b) =>
      a.asset.ticker.toLowerCase() < b.asset.ticker.toLowerCase() ? 1 : -1
    );

    setMainState(res);
    let check2 = [...transactionHistory];
    let res2 = check2.sort((a, b) =>
      a.asset.ticker.toLowerCase() < b.asset.ticker.toLowerCase() ? 1 : -1
    );
    setTransactionHistory(res2);
    let check3 = [...tempData];
    let res3 = check3.sort((a, b) =>
      a.asset.ticker.toLowerCase() < b.asset.ticker.toLowerCase() ? 1 : -1
    );
    setTempData(res3);
  };

  //Ascending Order Filter Coin
  const handleAscendingCoin = () => {
    let check = [...mainState];
    let res = check.sort((a, b) =>
      a.asset.ticker.toLowerCase() > b.asset.ticker.toLowerCase() ? 1 : -1
    );

    setMainState(res);
    let check2 = [...transactionHistory];
    let res2 = check2.sort((a, b) =>
      a.asset.ticker.toLowerCase() > b.asset.ticker.toLowerCase() ? 1 : -1
    );
    setTransactionHistory(res2);
    let check3 = [...tempData];
    let res3 = check3.sort((a, b) =>
      a.asset.ticker.toLowerCase() > b.asset.ticker.toLowerCase() ? 1 : -1
    );
    setTempData(res3);
  };

  //Descending Order Filter Amount
  const handleDescendingAmount = () => {
    let check = [...mainState];
    let res = check.sort((a, b) => b.transferAmount - a.transferAmount);

    setMainState(res);
    let check2 = [...transactionHistory];
    let res2 = check2.sort((a, b) => b.transferAmount - a.transferAmount);
    setTransactionHistory(res2);
    let check3 = [...tempData];
    let res3 = check3.sort((a, b) => b.transferAmount - a.transferAmount);
    setTempData(res3);
  };

  //Ascending Order Filter Amount
  const handleAscendingAmount = () => {
    let check = [...mainState];
    let res = check.sort((a, b) => a.transferAmount - b.transferAmount);

    setMainState(res);
    let check2 = [...transactionHistory];
    let res2 = check2.sort((a, b) => a.transferAmount - b.transferAmount);
    setTransactionHistory(res2);
    let check3 = [...tempData];
    let res3 = check3.sort((a, b) => a.transferAmount - b.transferAmount);
    setTempData(res3);
  };

  //Descending Order Filter Address
  const handleDescendingAddress = () => {
    let check = [...mainState];
    let res = check?.sort((a, b) =>
      a.to[0].to.toLowerCase() < b.to[0].to.toLowerCase() ? 1 : -1
    );

    setMainState(res);
    let check2 = [...transactionHistory];
    let res2 = check2?.sort((a, b) =>
      a.to[0].to.toLowerCase() < b.to[0].to.toLowerCase() ? 1 : -1
    );
    setTransactionHistory(res2);
    let check3 = [...tempData];
    let res3 = check3?.sort((a, b) =>
      a.to[0].to.toLowerCase() < b.to[0].to.toLowerCase() ? 1 : -1
    );
    setTempData(res3);
  };

  //Ascending Order Filter Type
  const handleAscendingAddress = () => {
    let check = [...mainState];
    let res = check?.sort((a, b) =>
      a.to[0].to.toLowerCase() > b.to[0].to.toLowerCase() ? 1 : -1
    );

    setMainState(res);
    let check2 = [...transactionHistory];
    let res2 = check2?.sort((a, b) =>
      a.to[0].to.toLowerCase() > b.to[0].to.toLowerCase() ? 1 : -1
    );
    setTransactionHistory(res2);
    let check3 = [...tempData];
    let res3 = check3?.sort((a, b) =>
      a.to[0].to.toLowerCase() > b.to[0].to.toLowerCase() ? 1 : -1
    );
    setTempData(res3);
  };

  //Descending Order Filter TransactionID
  const handleDescendingTransactionID = () => {
    let check = [...mainState];
    let res = check.sort((a, b) =>
      a.hash.toLowerCase() < b.hash.toLowerCase() ? 1 : -1
    );

    setMainState(res);
    let check2 = [...transactionHistory];
    let res2 = check2.sort((a, b) =>
      a.hash.toLowerCase() < b.hash.toLowerCase() ? 1 : -1
    );
    setTransactionHistory(res2);
    let check3 = [...tempData];
    let res3 = check3.sort((a, b) =>
      a.hash.toLowerCase() < b.hash.toLowerCase() ? 1 : -1
    );
    setTempData(res3);
  };

  //Ascending Order Filter TransactionID
  const handleAscendingTransactionID = () => {
    let check = [...mainState];
    let res = check.sort((a, b) =>
      a.hash.toLowerCase() > b.hash.toLowerCase() ? 1 : -1
    );

    setMainState(res);
    let check2 = [...transactionHistory];
    let res2 = check2.sort((a, b) =>
      a.hash.toLowerCase() > b.hash.toLowerCase() ? 1 : -1
    );
    setTransactionHistory(res2);
    let check3 = [...tempData];
    let res3 = check3.sort((a, b) =>
      a.hash.toLowerCase() > b.hash.toLowerCase() ? 1 : -1
    );
    setTempData(res3);
  };

  const gettingLogos = (t) => {
    let midgardPool = keyStoreInstance?.midgardPool;
    let ticker = t?.asset?.ticker;
    if (t.asset.ticker.toLowerCase() === "rune") {
      ticker = "XRUNE";
    }

    let res = midgardPool?.find(
      (d) => d?.asset.toLowerCase() === ticker.toLowerCase()
    );
    return (
      <>
        <img
          style={{ width: "25px" }}
          style={{ width: "25px" }}
          src={res.logo}
        />
      </>
    );
  };

  //CUSTOM RANGE HANDLER
  return (
    <div className="col-lg-10 pl-0" style={{ paddingRight: "8px" }}>
      {/*Date Modal*/}
      <Modal
        show={toggle}
        onHide={() => {
          setToggle(false);
        }}
        keyboard={false}
        size="lg"
      >
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
                <div
                  class="modal-body"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <DateRangePicker
                    onChange={(item) => {
                      if (
                        item.selection.startDate <= new Date() &&
                        item.selection.endDate <= new Date()
                      ) {
                        setState([item.selection]);
                      }
                    }}
                    showSelectionPreview={false}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={state}
                    direction="horizontal"
                    preventSnapRefocus={true}
                    calendarFocus="backwards"
                  />
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center">
                  <button
                    className={
                      "btn btn-outline-secondary ml-3 pl-3 " +
                      (rangeType === EnumRanges.CUSTOM_RANGE
                        ? "rangeActive"
                        : null)
                    }
                    onClick={handleCustom}
                    style={{
                      border: "1px solid",

                      fontSize: "14px",
                      fontFamily: "DM Sans",
                      fontWeight: "bold",
                      borderRadius: "20px",
                    }}
                  >
                    Custom range{" "}
                  </button>
                  <button
                    className={
                      "btn btn-outline-secondary ml-3 pl-3 " +
                      (rangeType === EnumRanges.ONE_DAY ? "rangeActive" : null)
                    }
                    onClick={handleOneDay}
                    className="u-datepickerbuttom56 ml-2"
                  >
                    One day{" "}
                  </button>{" "}
                  <button
                    className={
                      "btn btn-outline-secondary ml-3 pl-3 " +
                      (rangeType === EnumRanges.ONE_WEEK ? "rangeActive" : null)
                    }
                    onClick={handleOneWeek}
                    className="u-datepickerbuttom56 ml-2"
                  >
                    One week
                  </button>
                  <button
                    className={
                      "btn btn-outline-secondary ml-3 pl-3 " +
                      (rangeType === EnumRanges.ONE_MONTH
                        ? "rangeActive"
                        : null)
                    }
                    className="u-datepickerbuttom56 ml-2"
                    onClick={handleOneMonth}
                  >
                    One month
                  </button>
                  <button
                    className={
                      "btn btn-outline-secondary ml-3 pl-3 " +
                      (rangeType === EnumRanges.ONE_YEAR ? "rangeActive" : null)
                    }
                    onClick={handleOneYear}
                    className="u-datepickerbuttom56 ml-2"
                  >
                    One year
                  </button>
                  <button
                    className={
                      "btn btn-outline-secondary ml-3 pl-3 " +
                      (rangeType === EnumRanges.ALL_TIME ? "rangeActive" : null)
                    }
                    onClick={handleAllTime}
                    className="u-datepickerbuttom56 ml-2"
                  >
                    All time
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- modal end --> */}
        </Modal.Body>
      </Modal>
      <Modal
        show={exportModal}
        onHide={() => {
          setExportModal(false);
        }}
        keyboard={false}
        size="md"
      >
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
                <div
                  class="modal-body"
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  <DateRangePicker
                    onChange={() => {}}
                    showSelectionPreview={false}
                    moveRangeOnFirstSelection={false}
                    months={1}
                    ranges={state}
                    direction="horizontal"
                    preventSnapRefocus={true}
                    calendarFocus="backwards"
                  />
                </div>
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <button className="btn btn-primary" onClick={tableToCSV}>
                    Download .CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- modal end --> */}
        </Modal.Body>
      </Modal>

      <div className="w-sidebarcoleight">
        <div className="d-flex justify-content-between">
          <ul className="list-unstyled d-flex flex-row align-items-center mb-0">
            <li
              className="d-flex flex-row justify-content-center align-items-center"
              style={{ marginRight: "10px" }}
            >
              <button
                className={
                  filterType === Enum.allType ? "alltype" : "alltype-nonActive"
                }
                style={{ color: "#fff", fontFamily: "DM Sans" }}
                onClick={filterAllType}
              >
                All type
              </button>
            </li>
            <li
              className="d-flex flex-row justify-content-center align-items-center"
              style={{ marginRight: "10px" }}
            >
              <button
                className={
                  filterType === Enum.withdraw ? "alltype" : "alltype-nonActive"
                }
                style={{ color: "#fff", fontFamily: "DM Sans" }}
                onClick={filterWithdrawType}
              >
                Withdrawals
              </button>
            </li>
            <li
              className="d-flex flex-row justify-content-center align-items-center"
              style={{ marginRight: "10px" }}
            >
              <button
                className={
                  filterType === Enum.deposit ? "alltype" : "alltype-nonActive"
                }
                style={{ color: "#fff", fontFamily: "DM Sans" }}
                onClick={filterDepositType}
              >
                Deposit
              </button>
            </li>
            <li
              className="d-flex flex-row justify-content-center align-items-center"
              style={{ marginRight: "10px" }}
            >
              <button
                className={
                  filterType === Enum.pending ? "alltype" : "alltype-nonActive"
                }
                style={{ color: "#fff", fontFamily: "DM Sans" }}
                onClick={filterPendingType}
              >
                Converting
              </button>
            </li>
          </ul>
          <form className="">
            <div class=" d-flex flex-row align-items-center form-group has-search mb-0">
              <input
                style={{
                  borderRadius: "30px",
                  fontSize: "12px",
                  width: "250px",
                  height: "36px",
                  fontFamily: "DM Sans",
                  backgroundColor: "#fcfcfd",
                }}
                type="text"
                class="form-control"
                placeholder="Search"
                value={searchInput}
                onChange={SearchFilter}
              />
              <img
                style={{
                  width: "17px",
                  height: "17px",
                  marginLeft: "-25px",
                }}
                src={Images.searchicon}
              />

              <div style={{ float: "right" }}>
                <button
                  class="ml-4 seeallbutton"
                  onClick={(e) => {
                    e.preventDefault();

                    setToggle(true);
                  }}
                >
                  All time{" "}
                  <img src={Images.seeall} style={{ paddingLeft: "10px" }} />
                </button>
              </div>
            </div>
          </form>
        </div>
        <hr class="solid" />
        <div className="d-flex justify-content-between">
          <div className="">
            <h3 className="u-overview09888 mb-0">Activity</h3>
          </div>
          <div style={{ float: "right" }}>
            <button
              type="button"
              className="btn btn-primary exportbuttonactivity "
              style={{ paddingRight: "16px" }}
              onClick={() => {
                setExportModal(true);
              }}
            >
              {" "}
              <img src={Images.exportIcon} style={{ marginRight: "11px" }} />
              Export
            </button>
          </div>
        </div>
        <div
          className="table-responsive w-comon-table-style"
          // style={{ height: "500px", overflowY: "auto" }}
        >
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  <span>Type</span>
                  <div
                    style={{
                      display: "inline-grid",
                      paddingBottom: "4px",
                      marginLeft: "3px",
                    }}
                  >
                    <img
                      class="pl-1"
                      src={Images.FilterUp}
                      onClick={handleDescendingType}
                      style={{
                        marginBottom: "3px",
                        cursor: "pointer",
                      }}
                    />
                    <img
                      class="pl-1"
                      onClick={handleAscendingType}
                      src={Images.FilterDown}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </th>
                <th scope="col">
                  <span>Coin</span>
                  <div
                    style={{
                      display: "inline-grid",
                      paddingBottom: "4px",
                      marginLeft: "3px",
                    }}
                  >
                    <img
                      class="pl-1"
                      src={Images.FilterUp}
                      onClick={handleDescendingCoin}
                      style={{
                        marginBottom: "3px",
                        cursor: "pointer",
                      }}
                    />
                    <img
                      class="pl-1"
                      onClick={handleAscendingCoin}
                      src={Images.FilterDown}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </th>
                <th scope="col">
                  <span>Amount</span>{" "}
                  <div
                    style={{
                      display: "inline-grid",
                      paddingBottom: "4px",
                      marginLeft: "3px",
                    }}
                  >
                    <img
                      class="pl-1"
                      src={Images.FilterUp}
                      onClick={handleDescendingAmount}
                      style={{
                        marginBottom: "3px",
                        cursor: "pointer",
                      }}
                    />
                    <img
                      class="pl-1"
                      onClick={handleAscendingAmount}
                      src={Images.FilterDown}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </th>
                <th scope="col">
                  <span>Address</span>{" "}
                  <div
                    style={{
                      display: "inline-grid",
                      paddingBottom: "4px",
                      marginLeft: "3px",
                    }}
                  >
                    <img
                      class="pl-1"
                      src={Images.FilterUp}
                      onClick={handleDescendingAddress}
                      style={{
                        marginBottom: "3px",
                        cursor: "pointer",
                      }}
                    />
                    <img
                      class="pl-1"
                      onClick={handleAscendingAddress}
                      src={Images.FilterDown}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </th>
                <th scope="col">
                  <span>Transaction ID</span>
                  <div
                    style={{
                      display: "inline-grid",
                      paddingBottom: "4px",
                      marginLeft: "3px",
                    }}
                  >
                    <img
                      class="pl-1"
                      src={Images.FilterUp}
                      onClick={handleDescendingTransactionID}
                      style={{
                        marginBottom: "3px",
                        cursor: "pointer",
                      }}
                    />
                    <img
                      class="pl-1"
                      onClick={handleAscendingTransactionID}
                      src={Images.FilterDown}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </th>
                <th scope="col">
                  <span>Date</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {transactionHistory?.length ? (
                <>
                  {transactionHistory.map((t, key) => {
                    return (
                      <tr>
                        <td>
                          <div className="d-flex flex-column">
                            <div>
                              <span
                                style={{ fontFamily: "Poppins" }}
                                className={
                                  t.Type === "Withdraw"
                                    ? ""
                                    : "depositclasssliquid"
                                }
                              >
                                {t.type.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex ">
                            {gettingLogos(t)}
                            <div
                              style={{
                                paddingLeft: "5px",
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                marginTop: "3px",
                              }}
                            >
                              <span>{t.asset.ticker}</span>
                            </div>
                            <div className="d-flex align-items-center"></div>
                          </div>
                        </td>
                        <td>
                          <span>{t.transferAmount}</span>
                          {/* {t.to[0].amount.amount().c[0]} */}
                        </td>
                        <td>
                          <div className="d-flex flex-column">
                            <div>
                              <b
                                style={{
                                  fontFamily: "Poppins",
                                  fontSize: "14px",
                                }}
                              >
                                <span>{t?.to[0]?.to}</span>
                              </b>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span>{t?.hash}</span>
                        </td>
                        <td>
                          <span>
                            {new Date(t?.date)?.toString().substring(0, 24)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
      <div class="row mt-5 mb-3 pt-4 pb-4 mx-0">
        <div
          style={{
            backgroundColor: "#fcfcfd",
            borderRadius: "5px",
          }}
          className="d-flex pt-3 pb-3"
        >
          <div class="col-lg-6">
            <div class="d-flex">
              <div>
                <img style={{ paddingLeft: "30px" }} src={Images.at5} />
              </div>
              <div style={{ paddingLeft: "32px" }}>
                <h2
                  style={{
                    fontSize: "24px",
                    fontFamily: "Poppins",
                    color: "#23262F",
                    fontWeight: "600",
                  }}
                >
                  Trade assets
                </h2>
                <p
                  style={{
                    fontSize: "14px",
                    fontFamily: "Poppins",
                    color: "#777e90",
                    fontWeight: "400",
                  }}
                >
                  Start trading decentralized without pegged wrapped tokens
                  right now!
                </p>
                <button className="w-earn-yieldbuttonactivityss">
                  Trade assets <img class="pl-2" src={Images.iconsrightline} />
                </button>
              </div>
            </div>
          </div>
          {/* <div class="col-lg-6">
          <div class="d-flex">
            <div>
              <img style={{ paddingLeft: "30px" }} src={Images.at5} />
            </div>
            <div style={{ paddingLeft: "32px" }}>
              <h2
                style={{
                  fontSize: "24px",
                  fontFamily: "Poppins",
                  color: "#2326F",
                }}
              >
                Trade assets
              </h2>
              <p>
                Start trading decentralized without pegged warpped tokens right
                now!
              </p>
            </div>
          </div>
        </div> */}
          <div class="col-lg-6">
            <div class="d-flex">
              <div>
                <img style={{ paddingLeft: "30px" }} src={Images.at6} />
              </div>
              <div style={{ paddingLeft: "32px" }}>
                <h2
                  style={{
                    fontSize: "24px",
                    fontFamily: "Poppins",
                    color: "#2326F",
                    fontWeight: "600",
                  }}
                >
                  Earn yield
                </h2>
                <p
                  style={{
                    fontSize: "14px",
                    fontFamily: "Poppins",
                    color: "#777e90",
                    fontWeight: "400",
                  }}
                >
                  Start trading decentralized without pegged wrapped tokens
                  right now!
                </p>
                <button className="w-earn-yieldbuttonactivityss">
                  Earn yield <img class="pl-2" src={Images.iconsrightline} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Activity;
