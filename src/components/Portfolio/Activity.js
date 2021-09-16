import React from "react";
import Images from "../Helper/AllImages";

const Activity = () => {
  return (
    <div class="col-lg-7 marginleftcol mt-2">
      <div class="sidebarcoleight pt-3">
        <div class="d-flex justify-content-between">
          <ul class="list-unstyled d-flex">
            <li class="alltype">
              <a style={{ color: "#fff" }} href="#">
                All type{" "}
              </a>
            </li>
            <li class="pl-3 pt-2 marketparagraph">
              <a style={{ color: "#777E90" }} href="#">
                Withdraws
              </a>
            </li>
            <li class="pl-3 pt-2 marketparagraph">
              <a style={{ color: "#777E90" }} href="#">
                Deposit
              </a>
            </li>
            <li class="pl-3 pt-2 marketparagraph">
              <a style={{ color: "#777E90" }} href="#">
                Converting
              </a>
            </li>
          </ul>
          <form class="pr-5">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Search after coin.."
              />
              <div class="input-group-btn">
                <div style={{ float: "right" }}>
                  <button
                    type="button"
                    class="btn btn-outline-secondary ml-2 "
                    style={{
                      fontWeight: "bold",
                      color: "#000",
                      borderRadius: "10px",
                    }}
                  >
                    All time
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="d-flex justify-content-between">
          <div class="pt-4 pb-3">
            <h3>Activity</h3>
          </div>
          <div style={{ float: "right", marginTop: "25px" }}>
            <button type="button" class="btn btn-primary mr-3">
              {" "}
              Export
            </button>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table">
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
              <tr>
                <td>
                  <div class="d-flex flex-column">
                    <div>
                      <span class="depositclass">Withdraw</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="d-flex ">
                    <img style={{ width: "25px" }} src={Images.btc} />
                    <div style={{ paddingLeft: "5px" }}>Bitcoin</div>
                    <div class="d-flex align-items-center"></div>
                  </div>
                </td>
                <td>1,641.20 BTC</td>
                <td>
                  <div class="d-flex flex-column">
                    <div>
                      <b>3DkQyAdif6kqlpMBu</b>
                    </div>
                  </div>
                </td>
                <td>3DkQyAdif6kqlpMBu</td>
                <td>2021-06-05 04:12:30</td>
              </tr>
              <tr>
                <td>
                  <div class="d-flex flex-column">
                    <div>
                      <span class="depositclasss">Deposit </span>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="d-flex ">
                    <img style={{ width: "25px" }} src={Images.btc} />
                    <div style={{ paddingLeft: "5px" }}>Bitcoin</div>
                    <div class="d-flex align-items-center"></div>
                  </div>
                </td>
                <td>1,641.20 BTC</td>
                <td>
                  <div class="d-flex flex-column">
                    <div>
                      <b>3DkQyAdif6kqlpMBu</b>
                    </div>
                  </div>
                </td>
                <td>3DkQyAdif6kqlpMBu</td>
                <td>2021-06-05 04:12:30</td>
              </tr>
              <tr>
                <td>
                  <div class="d-flex flex-column">
                    <div>
                      <span class="depositclass">Withdraw</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="d-flex ">
                    <img style={{ width: "25px" }} src={Images.btc} />
                    <div style={{ paddingLeft: "5px" }}>Bitcoin</div>
                    <div class="d-flex align-items-center"></div>
                  </div>
                </td>
                <td>1,641.20 BTC</td>
                <td>
                  <div class="d-flex flex-column">
                    <div>
                      <b>3DkQyAdif6kqlpMBu</b>
                    </div>
                  </div>
                </td>
                <td>3DkQyAdif6kqlpMBu</td>
                <td>2021-06-05 04:12:30</td>
              </tr>
              <tr>
                <td>
                  <div class="d-flex flex-column">
                    <div>
                      <span class="depositclasss">Deposit</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="d-flex ">
                    <img style={{ width: "25px" }} src={Images.btc} />
                    <div style={{ paddingLeft: "5px" }}>Bitcoin</div>
                    <div class="d-flex align-items-center"></div>
                  </div>
                </td>
                <td>1,641.20 BTC</td>
                <td>
                  <div class="d-flex flex-column">
                    <div>
                      <b>3DkQyAdif6kqlpMBu</b>
                    </div>
                  </div>
                </td>
                <td>3DkQyAdif6kqlpMBu</td>
                <td>2021-06-05 04:12:30</td>
              </tr>
              <tr>
                <td>
                  <div class="d-flex flex-column">
                    <div>
                      <span class="depositclasss">Deposit</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="d-flex ">
                    <img style={{ width: "25px" }} src={Images.btc} />
                    <div style={{ paddingLeft: "5px" }}>Bitcoin</div>
                    <div class="d-flex align-items-center"></div>
                  </div>
                </td>
                <td>1,641.20 BTC</td>
                <td>
                  <div class="d-flex flex-column">
                    <div>
                      <b>3DkQyAdif6kqlpMBu</b>
                    </div>
                  </div>
                </td>
                <td>3DkQyAdif6kqlpMBu</td>
                <td>2021-06-05 04:12:30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Activity;
