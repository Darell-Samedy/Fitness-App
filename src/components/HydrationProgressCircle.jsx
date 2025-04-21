// HydrationProgressCircle.jsx
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import OpacityIcon from '@mui/icons-material/Opacity';

const HydrationProgressCircle = ({ currentIntake = 7, goal = 10 }) => {
  const theme = useTheme();
  const percentage = Math.round((currentIntake / goal) * 100);

  const textColor = theme.palette.mode === "dark" ? "#ffffff" : "#141414";
  const trailColor = theme.palette.mode === "dark" ? "#3d3d3d" : "#e0e0e0";
  const progressColor = theme.palette.mode === "dark" ? "#4cceac" : "#388e3c";
  const subtitleColor = theme.palette.mode === "dark" ? "#a3a3a3" : "#4caf50";

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <OpacityIcon sx={{ fontSize: 32, color: progressColor, mb: 1 }} />

      <Box width={120} height={120}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor,
            pathColor: progressColor,
            trailColor,
            textSize: '16px',
            pathTransitionDuration: 0.5,
          })}
        />
      </Box>

      <Typography variant="h6" mt={2} color={textColor}>
        Hydration Tracker
      </Typography>
      <Typography variant="body2" color={subtitleColor}>
        {currentIntake} of {goal} cups
      </Typography>
      <Typography variant="caption" color={subtitleColor}>
        {currentIntake >= goal ? "Hydrated!" : "Keep sipping water!"}
      </Typography>
    </Box>
  );
};

export default HydrationProgressCircle;
