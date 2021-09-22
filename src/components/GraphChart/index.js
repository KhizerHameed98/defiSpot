import React from "react";
import { ResponsiveLine } from "@nivo/line";
import data from "./data";

const LineChartSmartCard = () => {
  return (
    <div style={{ height: "100px", width: "150px" }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 10, right: 20, bottom: 10, left: 10 }}
        xScale={{ type: "point" }}
        lineWidth={3}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        colors={["#8676FF", "#FFBA69"]}
        curve="natural"
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
        useMesh={true}
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