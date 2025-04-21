// WorkoutLineChart.jsx
import React from "react";
import { ResponsiveLine } from "@nivo/line";

const data = [
  {
    id: "Workouts",
    color: "hsl(180, 70%, 50%)",
    data: [
      { x: "Mon", y: 2, label: "Chest & Triceps" },
      { x: "Tue", y: 1, label: "Back & Cardio" },
      { x: "Wed", y: 2, label: "Legs" },
      { x: "Thu", y: 1, label: "Shoulders" },
      { x: "Fri", y: 2, label: "Arms & Core" },
      { x: "Sat", y: 1, label: "Cardio" },
      { x: "Sun", y: 0, label: "Rest Day" },
    ],
  },
];

const WorkoutLineChart = () => {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 50, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{ type: "linear", min: 0, max: 3, stacked: false, reverse: false }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Day",
        legendOffset: 36,
        legendPosition: "middle",
        tickColor: "#ccc",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Workouts",
        legendOffset: -40,
        legendPosition: "middle",
        tickColor: "#ccc",
        format: (value) => `${value}`,
      }}
      theme={{
        axis: {
          ticks: { text: { fill: "#ccc" } },
          legend: { text: { fill: "#ccc" } },
        },
        grid: {
          line: {
            stroke: "#888",
            strokeWidth: 0.3,
          },
        },
        tooltip: {
          container: {
            background: "#333",
            color: "#fff",
            fontSize: "13px",
          },
        },
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      enableArea={false}
      useMesh={true}
      tooltip={({ point }) => (
        <div style={{ background: "#333", padding: "6px", borderRadius: "4px", color: "#fff" }}>
          <strong>{point.data.xFormatted}</strong><br />
          {point.data.yFormatted} workout{point.data.yFormatted !== 1 ? 's' : ''}<br />
          <em>{point.data.label}</em>
        </div>
      )}
    />
  );
};

export default WorkoutLineChart;
