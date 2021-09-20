import React from "react";
import Images from "../Helper/AllImages";
const Liquidity = () => {
  return (
    <div class="col-lg-7 marginleftcol mt-2">
      <div class="sidebarcoleight pt-3">
        <h4>Liquidity providing </h4>
        <div class="d-flex justify-content-between pt-3">
          <div>
            <p style={{ margin: "0px" }}>Total balance in pools</p>
            <p style={{ fontWeight: "bold", margin: "0px" }}>
              7.25495219{" "}
              <span
                style={{
                  backgroundColor: "#58BD7D",
                  fontSize: "10px",
                  padding: "5px",
                  color: "#fff",
                }}
              >
                BTC
              </span>
            </p>
            <p>$278,523.42</p>
          </div>
          <div class="d-flex">
            <div>
              <img src="images/percentage.png" />
            </div>
            <div class="pl-4">
              <p style={{ margin: "0px" }}>APY percentage</p>
              <p
                style={{ fontWeight: "bold", margin: "0px", color: "#58BD7D" }}
              >
                11%{" "}
                <span
                  style={{
                    backgroundColor: "#58BD7D",
                    fontSize: "10px",
                    padding: "5px",
                    color: "#fff",
                  }}
                >
                  Low Risk
                </span>
              </p>
            </div>
          </div>
          <div class="pr-5">
            <p style={{ margin: "0px" }}>Current estimated APY</p>
            <p style={{ fontWeight: "bold", margin: "0px" }}>
              0.82047819{" "}
              <span style="background-color: #B1B5C3; font-size: 10px; padding: 5px; color: #fff;">
                BTC
              </span>
            </p>
          </div>
        </div>
      </div>
      <p class="pt-3 pl-3" style="color: #777E90;font-weight: bold;" style={{color:"#777E90", fontWeight:"bold"}}>
        Funds
      </p>
      <div class="sidebarcoleight pt-3">
        <div class="d-flex justify-content-between">
          <input
            style="width: 25%; border-radius: 20px;"
            class="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
          <p class="pr-5" style="color: #777E90;">
            {" "}
            Transaction History
            <i
              class="fa fa-chevron-right ml-2 "
              style={{ fontSize: "13px" }}
            ></i>
          </p>
        </div>
        <div class="d-flex justify-content-between pt-3">
          <div>
            <p style={{ margin: "0px" }}>Total balance in pools</p>
            <p style={{ fontWeight: "bold", margin: "0px" }}>
              7.25495219{" "}
              <span
                style={{
                  backgroundColor: "#58BD7D",
                  fontSize: "10px",
                  padding: "5px",
                  color: "#fff",
                }}
              >
                BTC
              </span>
            </p>
            <p>$278,523.42</p>
          </div>
          <div class="d-flex">
            <div>
              <img src="images/percentage.png" />
            </div>
            <div class="pl-4">
              <p style={{ margin: "0px" }}>APY percentage</p>
              <p
                style="font-weight: bold;margin: 0px;color: #58BD7D;"
                style={{ fontWeight: "bold", margin: "0px" }}
              >
                11%{" "}
                <span
                  style={{
                    backgroundColor: "#58BD7D",
                    fontSize: "10px",
                    padding: "5px",
                    color: "#fff",
                  }}
                >
                  Low Risk
                </span>
              </p>
            </div>
          </div>
          <div class="pr-5">
            <p style={{ margin: "0px" }}>Current estimated APY</p>
            <p style={{ fontWeight: "bold", margin: "0px" }}>
              0.82047819{" "}
              <span style="background-color: #B1B5C3; font-size: 10px; padding: 5px; color: #fff;">
                BTC
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Liquidity;
