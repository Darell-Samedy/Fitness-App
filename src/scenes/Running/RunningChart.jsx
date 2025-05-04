import React from "react";
import { ResponsiveLine } from "@nivo/line";

const RunningChart = ({ runs }) => {
  if (runs.length === 0) {
    return <p>No runs to display. Add a run to see your progress!</p>;
  }

  const data = [
    {
      id: "Miles",
      data: runs.map((run, index) => ({
        x: index + 1, // Run number starting at 1
        y: run.distance, // Distance in miles
      })),
    },
  ];

  return (
    <div style={{ height: 400 }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        xScale={{ type: "linear", min: 1 }} // Ensure X-axis starts at 1
        yScale={{ type: "linear", min: 0 }} // Y-axis starts at 0
        axisBottom={{
          legend: "Number of Runs",
          legendPosition: "middle",
          legendOffset: 40,
          tickValues: runs.map((_, index) => index + 1), // Ensure ticks align with run numbers
          tickPadding: 10,
          tickSize: 5,
          tickRotation: 0,
          tickTextColor: "#FFFFFF", // Set X-axis tick labels to white
          legendTextColor: "#FFFFFF", // Set X-axis legend to white
          legendFontSize: 14, // Larger font for legend
        }}
        axisLeft={{
          legend: "Distance (miles)",
          legendPosition: "middle",
          legendOffset: -50,
          tickPadding: 10,
          tickSize: 5,
          tickRotation: 0,
          tickTextColor: "#FFFFFF", // Set Y-axis tick labels to white
          legendTextColor: "#FFFFFF", // Set Y-axis legend to white
          legendFontSize: 14, // Larger font for legend
        }}
        gridXValues={runs.map((_, index) => index + 1)} // Add vertical grid lines
        gridYValues={5} // Add horizontal grid lines every 5 miles
        colors={{ scheme: "category10" }}
        pointSize={12} // Larger points for better visibility
        pointBorderWidth={3}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel={(point) => `${point.y} miles`} // Add labels to points
        pointLabelYOffset={-12} // Position point labels above the points
        useMesh={true} // Enable mesh for better interactivity
        tooltip={({ point }) => (
          <div
            style={{
              background: "rgba(0, 0, 0, 0.8)",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            <strong>Run {point.data.xFormatted}</strong>
            <br />
            Distance: {point.data.yFormatted} miles
          </div>
        )}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: "#FFFFFF", // Ensure all axis tick labels are white
                fontSize: 12, // Larger font size for ticks
              },
            },
            legend: {
              text: {
                fill: "#FFFFFF", // Ensure all axis legends are white
                fontSize: 14, // Larger font size for legends
              },
            },
          },
          grid: {
            line: {
              stroke: "rgba(255, 255, 255, 0.2)", // Subtle grid lines
              strokeWidth: 1,
            },
          },
        }}
      />
    </div>
  );
};

export default RunningChart;