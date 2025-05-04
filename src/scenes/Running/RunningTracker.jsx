import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  ButtonGroup,
  TablePagination,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import RunningChart from "./RunningChart";

const RunningTracker = () => {
  const theme = useTheme();
  const colors = theme.palette;

  const [runs, setRuns] = useState([]);
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState(""); // Time in hh:mm:ss format
  const [goal, setGoal] = useState(20); // Weekly goal in miles
  const [newGoal, setNewGoal] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [chartMetric, setChartMetric] = useState("distance");
  const [runDate, setRunDate] = useState(new Date());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Helper function to format pace as hh:mm:ss
  const formatPace = (paceDecimal) => {
    const totalSeconds = Math.round(paceDecimal * 60);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours > 0 ? `${hours}:` : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Helper function to parse time input (hh:mm:ss or mm:ss) into total minutes
  const parseTimeInput = (timeString) => {
    const parts = timeString.split(":").map(Number);
    if (parts.length === 2) {
      const [minutes, seconds] = parts;
      return minutes + seconds / 60; // Convert to total minutes
    } else if (parts.length === 3) {
      const [hours, minutes, seconds] = parts;
      return hours * 60 + minutes + seconds / 60; // Convert to total minutes
    }
    return 0; // Invalid format
  };

  const handleAddRun = () => {
    if (
      distance &&
      time &&
      !isNaN(distance) &&
      parseFloat(distance) > 0 &&
      /^[0-9]+:[0-5][0-9](:[0-5][0-9])?$/.test(time) // Validate time format (hh:mm:ss or mm:ss)
    ) {
      const totalMinutes = parseTimeInput(time); // Parse time into total minutes
      const paceDecimal = totalMinutes / parseFloat(distance); // Calculate pace as decimal
      const newRun = {
        date: runDate.toLocaleDateString(), // Use selected date
        distance: parseFloat(distance),
        time: time, // Store time in hh:mm:ss format
        pace: formatPace(paceDecimal), // Format pace as hh:mm:ss
      };
      setRuns([...runs, newRun]);
      setDistance("");
      setTime("");
      setRunDate(new Date()); // Reset date picker
    } else {
      alert("Please enter valid distance and time values (e.g., 1:22:55 or 22:55).");
    }
  };

  const handleUpdateGoal = () => {
    if (newGoal && !isNaN(newGoal) && parseFloat(newGoal) > 0) {
      setGoal(parseFloat(newGoal));
      setNewGoal("");
    } else {
      alert("Please enter a valid goal greater than 0.");
    }
  };

  const handleClearRuns = () => {
    setRuns([]);
  };

  const handleExportRuns = () => {
    const csvContent = [
      ["Date", "Distance (miles)", "Time", "Pace (min/mile)"],
      ...runs.map((run) => [run.date, run.distance, run.time, run.pace]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "run_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalDistance = runs.reduce((total, run) => total + run.distance, 0);
  const totalTime = runs.reduce((total, run) => parseTimeInput(run.time) + total, 0);
  const averagePaceDecimal = totalDistance > 0 ? totalTime / totalDistance : 0; // Average pace as decimal
  const averagePace = formatPace(averagePaceDecimal); // Format average pace as hh:mm:ss
  const progressPercentage = Math.min((totalDistance / goal) * 100, 100);

  // Filter runs based on the search query
  const filteredRuns = runs.filter(
    (run) =>
      run.date.includes(searchQuery) || run.distance.toString().includes(searchQuery)
  );

  // Pagination for run history
  const paginatedRuns = filteredRuns.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Notify user when they reach their weekly goal
  useEffect(() => {
    if (progressPercentage >= 100) {
      alert("🎉 Congratulations! You've reached your weekly goal!");
    }
  }, [progressPercentage]);

  return (
    <Box
      p={3}
      bgcolor={colors.background.default}
      borderRadius="10px"
      boxShadow={2}
    >
      {/* Header */}
      <Typography
        variant="h4"
        fontWeight="600"
        mb={3}
        textAlign="center"
        color={colors.primary.main}
      >
        Running Tracker
      </Typography>

      {/* Progress Section */}
      <Box mb={4}>
        <Typography variant="h6" color={colors.neutral.main} textAlign="center" mb={1}>
          Weekly Progress: {totalDistance} / {goal} miles
        </Typography>
        <Typography variant="h6" color={colors.neutral.main} textAlign="center" mb={1}>
          Average Pace: {averagePace} min/mile
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progressPercentage}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: colors.neutral.light,
            "& .MuiLinearProgress-bar": {
              backgroundColor: colors.secondary.main,
            },
          }}
        />
      </Box>

      {/* Weekly Summary */}
      <Box mt={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" color={colors.primary.main} mb={2}>
              Weekly Summary
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body1" color={colors.neutral.main}>
                <strong>Total Distance:</strong> {totalDistance} miles
              </Typography>
              <Typography variant="body1" color={colors.neutral.main}>
                <strong>Total Time:</strong> {formatPace(totalTime / 60)} (hh:mm:ss)
              </Typography>
              <Typography variant="body1" color={colors.neutral.main}>
                <strong>Average Pace:</strong> {averagePace} min/mile
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Goal Progress Chart */}
      <Box textAlign="center" mt={4}>
        <CircularProgress
          variant="determinate"
          value={progressPercentage}
          size={100}
          thickness={5}
          sx={{ color: colors.secondary.main }}
        />
        <Typography mt={2}>
          {progressPercentage.toFixed(1)}% of Weekly Goal Achieved
        </Typography>
      </Box>

      {/* Add Run Section */}
      <Grid container spacing={4} mt={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2} color={colors.primary.main}>
                Weekly Goal: {goal} miles
              </Typography>
              <TextField
                label="Update Goal (miles)"
                variant="outlined"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                type="number"
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateGoal}
                sx={{ mt: 2 }}
                fullWidth
              >
                Update Goal
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2} color={colors.primary.main}>
                Add a Run
              </Typography>
              <TextField
                label="Distance (miles)"
                variant="outlined"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                type="number"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Time (hh:mm:ss or mm:ss)"
                variant="outlined"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                fullWidth
              />
              <TextField
                label="Run Date"
                type="date"
                value={runDate.toISOString().split("T")[0]}
                onChange={(e) => setRunDate(new Date(e.target.value))}
                fullWidth
                sx={{ mt: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddRun}
                sx={{ mt: 2 }}
                fullWidth
              >
                Add Run
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search Bar */}
      <Box mt={4}>
        <TextField
          label="Search by Date or Distance"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
      </Box>

      {/* Run History Section */}
      <Box mt={4}>
        <Typography variant="h6" mb={2} color={colors.primary.main}>
          Run History
        </Typography>
        {filteredRuns.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Distance (miles)</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Pace (min/mile)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedRuns.map((run, index) => (
                    <TableRow
                      key={index}
                      hover
                      sx={{
                        "&:hover": {
                          backgroundColor: colors.neutral.light,
                        },
                      }}
                    >
                      <TableCell>{run.date}</TableCell>
                      <TableCell>{run.distance}</TableCell>
                      <TableCell>{run.time}</TableCell>
                      <TableCell>{run.pace}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredRuns.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <Typography color={colors.neutral.main}>No runs added yet.</Typography>
        )}
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleExportRuns}
          sx={{ mt: 2 }}
        >
          Export Run History
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleClearRuns}
          sx={{ mt: 2, ml: 2 }}
        >
          Clear All Runs
        </Button>
      </Box>

      {/* Chart Section */}
      <Box mt={4}>
        <ButtonGroup variant="outlined" color="primary">
          <Button onClick={() => setChartMetric("distance")}>Distance</Button>
          <Button onClick={() => setChartMetric("pace")}>Pace</Button>
          <Button onClick={() => setChartMetric("time")}>Time</Button>
        </ButtonGroup>
        <RunningChart runs={filteredRuns} metric={chartMetric} />
      </Box>
    </Box>
  );
};

export default RunningTracker;