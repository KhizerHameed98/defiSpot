import React, {useState, useEffect} from "react";
import Images from "../Helper/AllImages";
import data from "../Helper/Data/TransactionHistory";
// import DatePicker from "react-multi-date-picker";
// import { Calendar } from "react-multi-date-picker";
// import Button from "react-multi-date-picker/components/button";
import { useSelector, useDispatch } from "react-redux";

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";

const Activity = () => {
  const keyStoreInstance = useSelector((state) => state.main);
  const [KeyStoreClients, setKeyStoreClients] = useState([]);

  const [tableData, setTableData] = useState([]);
  const [date, setDate] = useState(null);

  const [Enum, set_Enum] = useState({
    allType: "allType",
    withdraw: "withdraw",
    deposit: "deposit",
    pending: "pending",
  });
  const [filterType, setFilterType] = useState(Enum.allType);
  useEffect(() => {
    setTableData(data);
  }, []);
  useEffect(() => {
    console.log("my keyStore Instance===>>", keyStoreInstance);
    setKeyStoreClients(keyStoreInstance.KeyStoreClient);
  }, [keyStoreInstance]);
  function SearchFilter(e) {
    setFilterType("");
    if (!e.target.value) {
      setFilterType(Enum.allType);
      setTableData(data);
    } else {
      const res = data.filter((data) => data.TransactionId === e.target.value);
      setTableData(res);
    }
  }
  function filterAllType() {
    setFilterType(Enum.allType);
    setTableData(data);
  }
  function filterWithdrawType() {
    setFilterType(Enum.withdraw);
    let res = data.filter((d) => d.Type === "Withdraw");
    setTableData(res);
  }
  function filterDepositType() {
    setFilterType(Enum.deposit);
    let res = data.filter((d) => d.Type === "Deposit");
    setTableData(res);
  }
  function filterPendingType() {
    setFilterType(Enum.pending);
    let res = data.filter((d) => d.Type === "Pending");
    setTableData(res);
  }

  const renderCustomFooter = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "1rem 2rem",
        }}
      >
        <button
          type="button"
          onClick={() => {
            setDate(null);
          }}
          style={{
            border: "#0fbcf9",
            color: "#000",
            borderRadius: "0.5rem",
            padding: "1rem 2rem",
          }}
        >
          Download .CSV
        </button>
      </div>
    );
  };

  const renderCustomInput = ({ ref }) => (
    <input
      readOnly
      ref={ref} // necessary
      placeholder="All time"
      style={{ border: "1px solid", width: "78px", fontSize: "13px" }}
      className="btn btn-outline-secondary ml-3 pl-3"
      // a styling class
    />
  );
  const renderCustomInput2 = ({ ref }) => (
    // <input
    //   readOnly
    //   ref={ref} // necessary
    //   placeholder="All time"
    //   style={{border:"1px solid"}}
    //   className="btn btn-outline-secondary ml-2"
    //   // a styling class
    // />
    <input
      style={{}}
      type="text"
      className="btn btn-primary mr-5"
      ref={ref}
      readOnly
      placeholder="Export"
    />
  );
  return (
    <div className="col-lg-7 marginleftcol mt-2">
      <div className="sidebarcoleight pt-3">
        <div className="d-flex justify-content-between">
          <ul className="list-unstyled d-flex">
            <li>
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
            <li>
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
            <li>
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
            <li>
              <button
                className={
                  filterType === Enum.pending ? "alltype" : "alltype-nonActive"
                }
                style={{ color: "#fff", fontFamily: "DM Sans" }}
                onClick={filterPendingType}
              >
                Pending
              </button>
            </li>
          </ul>
          <form className="pr-5">
            <div class=" d-flex form-group has-search">
              <input
                style={{
                  borderRadius: "10px",
                  width: "300px",
                  fontFamily: "DM Sans",
                  backgroundColor: "#fcfcfd",
                }}
                type="text"
                class="form-control"
                placeholder="Search"
                onChange={SearchFilter}
              />
              <span
                style={{ paddingTop: "10px", marginLeft: "-22px" }}
                class=" fa fa-search form-control-feedback"
              ></span>
              <div className="input-group-btn">
                <div style={{ float: "right" }}>
                  <DatePicker
                    value={date}
                    onChange={setDate}
                    shouldHighlightWeekends
                    renderInput={renderCustomInput} // render a custom input
                  />
                </div>
              </div>
            </div>
          </form>
          {/* <form className="pr-5">
            <div className="input-group">
              <input
              style={{fontFamily:"DM Sans"}}
                type="text"
                className="form-control"
                placeholder="Search after coin.."
                onChange={SearchFilter}
              />
              <div className="input-group-btn">
                <div style={{ float: "right" }}>
                
                  <DatePicker  
                  value={date}
                  onChange={setDate}
                  shouldHighlightWeekends
                  renderInput={renderCustomInput} // render a custom input

                  />
                </div>
              </div>
            </div>
          </form> */}
        </div>
        <hr class="solid" />
        <div className="d-flex justify-content-between">
          <div className="pt-4 pb-3">
            <h3 className="activaty-headingss">Activity</h3>
          </div>
          <div style={{ float: "right", marginTop: "25px" }}>
            {/* <button type="button" className="btn btn-primary mr-3">
              {" "}
              Export
            </button> */}
            <DatePicker
              value={date}
              onChange={setDate}
              shouldHighlightWeekends
              renderInput={renderCustomInput2} // render a custom input
              renderFooter={renderCustomFooter}
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th
                  style={{ borderTop: "none" }}
                  class="pt-3 pb-3 overview-tablehead"
                  scope="col"
                >
                  Type <img class="pl-1" src={Images.nameup} />
                </th>
                <th
                  style={{ borderTop: "none" }}
                  class="pt-3 pb-3 overview-tablehead"
                  scope="col"
                >
                  Coin <img class="pl-1" src={Images.nameup} />
                </th>
                <th
                  style={{ borderTop: "none" }}
                  class="pt-3 pb-3 overview-tablehead"
                  scope="col"
                >
                  Amount <img class="pl-1" src={Images.nameup} />
                </th>
                <th
                  style={{ borderTop: "none" }}
                  class="pt-3 pb-3 overview-tablehead"
                  scope="col"
                >
                  Address <img class="pl-1" src={Images.nameup} />
                </th>
                <th
                  style={{ borderTop: "none" }}
                  class="pt-3 pb-3 overview-tablehead"
                  scope="col"
                >
                  Transaction ID
                  <img class="pl-1" src={Images.nameup} />
                </th>
                <th
                  style={{
                    textAlign: "right",
                    paddingRight: "60px",
                    borderTop: "none",
                  }}
                  class="pt-3 pb-3 overview-tablehead"
                  scope="col"
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody style={{ padding: "5px" }}>
              {KeyStoreClients ? (
                <>
                  {KeyStoreClients.map((d, key) => {
                    return (
                      <>
                        {d.Transactions.txs.map((t, key2) => {
                          return (
                            <tr>
                              <td>
                                <div className="d-flex flex-column">
                                  <div>
                                    <span
                                      style={{ fontFamily: "DM Sans" }}
                                      className={
                                        d.Type === "Withdraw"
                                          ? "depositclass"
                                          : "depositclasss"
                                      }
                                    >
                                      {t.type.toUpperCase()}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex ">
                                  <img
                                    style={{ width: "25px" }}
                                    style={{ width: "25px" }}
                                    src={Images.btc}
                                  />
                                  <div
                                    style={{
                                      paddingLeft: "5px",
                                      fontFamily: "DM Sans",
                                    }}
                                  >
                                    {t.asset.symbol}
                                  </div>
                                  <div className="d-flex align-items-center"></div>
                                </div>
                              </td>
                              <td style={{ fontFamily: "DM Sans" }}>
                                {Number(t.to[0].amount.amount().c[0]) /
                                  Math.pow(10, Number(t.to[0].amount.decimal))}
                                {/* {t.to[0].amount.amount().c[0]} */}
                              </td>
                              <td>
                                <div className="d-flex flex-column">
                                  <div>
                                    <b style={{ fontFamily: "DM Sans" }}>
                                      {t.to[0].to}
                                    </b>
                                  </div>
                                </div>
                              </td>
                              <td style={{ fontFamily: "DM Sans" }}>
                                {t.hash}
                              </td>
                              <td style={{ fontFamily: "DM Sans" }}>
                                {t.date.toString().substring(0, 24)}
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    );
                  })}
                </>
              ) : null}
            </tbody>{" "}
          </table>
        </div>
      </div>
    </div>
  );
};
export default Activity;
