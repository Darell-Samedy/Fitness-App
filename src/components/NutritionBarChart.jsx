// NutritionBarChart.jsx
import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const data = [
  {
    day: "Mon",
    protein: 120,
    carbs: 200,
    fats: 60,
  },
  {
    day: "Tue",
    protein: 100,
    carbs: 180,
    fats: 70,
  },
  {
    day: "Wed",
    protein: 130,
    carbs: 210,
    fats: 80,
  },
];

const NutritionBarChart = () => {
  return (
    <ResponsiveBar
      data={data}
      keys={["protein", "carbs", "fats"]}
      indexBy="day"
      margin={{ top: 20, right: 30, bottom: 50, left: 50 }}
      padding={0.3}
      groupMode="stacked"
      colors={{ scheme: "nivo" }}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Day",
        legendPosition: "middle",
        legendOffset: 32,
        tickColor: "#ccc",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Calories",
        legendPosition: "middle",
        legendOffset: -40,
        tickColor: "#ccc",
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
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      animate={true}
    />
  );
};

export default NutritionBarChart;
