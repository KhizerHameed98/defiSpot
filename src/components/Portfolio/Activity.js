import React, {useState, useEffect} from "react";
import Images from "../Helper/AllImages";
import data from "../Helper/Data/TransactionHistory";
import DatePicker from "react-multi-date-picker";
import { Calendar } from "react-multi-date-picker";

const Activity = () => {
  const [tableData, setTableData] = useState([]);
  const [showTime, setShowTIme] = useState(false);
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
                style={{ color: "#fff" }}
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
                style={{ color: "#fff" }}
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
                style={{ color: "#fff" }}
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
                style={{ color: "#fff" }}
                onClick={filterPendingType}
              >
                Pending
              </button>
            </li>
          </ul>
          <form className="pr-5">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search after coin.."
                onChange={SearchFilter}
              />
              <div className="input-group-btn">
                <div style={{ float: "right" }}>
                  <DatePicker
                    render={() => {
                      return (
                        <button
                          type="button"
                          className="btn btn-outline-secondary ml-2 "
                          style={{
                            fontWeight: "bold",
                            color: "#000",
                            borderRadius: "10px",
                          }}
                        >
                          All time
                        </button>
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="d-flex justify-content-between">
          <div className="pt-4 pb-3">
            <h3>Activity</h3>
          </div>
          <div style={{ float: "right", marginTop: "25px" }}>
            <button type="button" className="btn btn-primary mr-3">
              {" "}
              Export
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Coin</th>
                <th scope="col">Amount</th>
                <th scope="col">Address</th>
                <th scope="col">Transaction</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody style={{ padding: "5px" }}>
              {tableData.map((d, key) => {
                return (
                  <tr>
                    <td>
                      <div className="d-flex flex-column">
                        <div>
                          <span
                            className={
                              d.Type === "Withdraw"
                                ? "depositclass"
                                : "depositclasss"
                            }
                          >
                            {d.Type}
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
                        <div style={{ paddingLeft: "5px" }}>{d.Coin}</div>
                        <div className="d-flex align-items-center"></div>
                      </div>
                    </td>
                    <td>{d.Amount}</td>
                    <td>
                      <div className="d-flex flex-column">
                        <div>
                          <b>{d.Address}</b>
                        </div>
                      </div>
                    </td>
                    <td>{d.TransactionId}</td>
                    <td>{d.Date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Activity;
