import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { linearGradientDef } from "@nivo/core";
import data from "./data";

const LineChartSmartCard = (props) => {
  console.log("------", props.data);
  return (
    <div style={{ height: "42px", width: "138px" }}>
      <ResponsiveLine
        data={props.data}
        margin={{ top: 3, right: 0, bottom: 3, left: 0 }}
        xScale={{ type: "point" }}
        lineWidth={2}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          // reverse: false,
        }}
        curve="linear"
        colors={props.color}
        // curve="natural"
        enableGridX={false}
        enableGridY={false}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        pointColor={{ from: "color", modifiers: [] }}
        pointSize={0}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        tooltip={({ point }) => {
          return (
            <div
              style={{ padding: "15px", backgroundColor: "#fcfcfd", borderRadius:"10px", fontFamily:"Poppins", }}
            >  
              <span
              style={{
                fontSize: "14px",
                fontWeight: "600",
              }}>
                {typeof point.data.xFormatted !== "undefined" ? point.data.xFormatted :""}
                ${typeof point.data.yFormatted !== "undefined" ? point.data.yFormatted : ""}
              </span>{" "}
            </div>
          );

        }}
        enableArea={true}
        // areaBaselineValue={true}
        areaOpacity={0.1}
        useMesh={true}
        // defs={[
        //   linearGradientDef("gradientA", [
        //       { offset: 0, color: 'inherit' },
              
        //       { offset: 100, color: 'inherit', opacity: 0 },
        //   ]),
        // ]}
        // fill={[{ match: "*", id: "gradientA" }]}
        theme={{
          Yaxis: {
            ticks: {
              line: {
                stroke: "#000",
              },
              text: {
                fill: "#9099A6",
              },
            },
          },
          axis: {
            ticks: {
              line: {
                stroke: "#9099A6",
              },
              text: {
                fill: "#9099A6",
              },
            },
          },

          grid: {
            line: {
              stroke: "#f0f0f0",
              strokeWidth: 1,
            },
          },
        }}
        legends={[]}
      />
    </div>
  );
};

export default LineChartSmartCard;
