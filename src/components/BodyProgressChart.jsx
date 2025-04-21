import React from "react";
import { ResponsivePie } from "@nivo/pie";

const BodyProgressChart = () => {
  const data = [
    {
      id: "Fat",
      label: "Fat",
      value: 20,
      color: "hsl(348, 70%, 50%)",
    },
    {
      id: "Muscle",
      label: "Muscle",
      value: 80,
      color: "hsl(145, 70%, 50%)",
    },
  ];

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ scheme: "paired" }}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#fff"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor="#000"
    />
  );
};

export default BodyProgressChart
