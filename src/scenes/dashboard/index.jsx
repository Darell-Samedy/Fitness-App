import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import WorkoutLineChart from "../../components/WorkoutLineChart";
import NutritionBarChart from "../../components/NutritionBarChart";
import BodyProgressChart from "../../components/BodyProgressChart";
import HydrationProgressCircle from "../../components/HydrationProgressCircle";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="FITNESS DASHBOARD" subtitle="Track your fitness journey" />
        
      </Box>

      {/* GRID */}
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
        {/* Stats Row */}
        <Box gridColumn="span 3" bgcolor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" borderRadius="10px">
          <StatBox
            title="15"
            subtitle="Workouts Completed"
            progress="🔥 Streak: 5 Days"
            increase="+5 from last week"
            icon={<FitnessCenterIcon sx={{ color: colors.greenAccent[600], fontSize: 26 }} />}
          />
        </Box>

        <Box gridColumn="span 3" bgcolor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" borderRadius="10px">
          <StatBox
            title="3,200 kcal"
            subtitle="Calories Burned"
            progress="Goal: 3500 kcal"
            increase="+12% from last week"
            icon={<LocalFireDepartmentIcon sx={{ color: colors.greenAccent[600], fontSize: 26 }} />}
          />
        </Box>

        <Box gridColumn="span 3" bgcolor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" borderRadius="10px">
          <StatBox
            title="50,000"
            subtitle="Steps Taken"
            progress="Goal: 70,000"
            increase="+8% from last week"
            icon={<DirectionsRunIcon sx={{ color: colors.greenAccent[600], fontSize: 26 }} />}
          />
        </Box>

        <Box gridColumn="span 3" bgcolor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" borderRadius="10px">
          <StatBox
            title="160g Protein"
            subtitle="Daily Nutrition Goal"
            progress="Goal: 180g"
            increase="+10% improvement"
            icon={<FastfoodIcon sx={{ color: colors.greenAccent[600], fontSize: 26 }} />}
          />
        </Box>

        {/* Charts Row */}
        <Box gridColumn="span 8" gridRow="span 2" bgcolor={colors.primary[400]} borderRadius="10px">
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>Weekly Workout Progress</Typography>
              <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>7/10 Workouts Completed</Typography>
            </Box>
            <IconButton>
              <DownloadOutlinedIcon sx={{ fontSize: 26, color: colors.greenAccent[500] }} />
            </IconButton>
          </Box>
          <Box height="250px" mt="-20px">
            <WorkoutLineChart />
          </Box>
        </Box>

        <Box gridColumn="span 4" gridRow="span 2" bgcolor={colors.primary[400]} p="30px" borderRadius="10px">
          <Typography variant="h5" fontWeight="600">Weight & Muscle Progress</Typography>
          <Box display="flex" flexDirection="column" alignItems="center" mt="25px">
            <ProgressCircle size={125} />
            <Typography variant="h5" color={colors.greenAccent[500]} mt="15px">5 lbs lost in 4 weeks</Typography>
            <Typography>Current weight: 185 lbs</Typography>
          </Box>
        </Box>

        <Box gridColumn="span 4" gridRow="span 2" bgcolor={colors.primary[400]} borderRadius="10px">
          <Typography variant="h5" fontWeight="600" p="30px 30px 0 30px">Caloric Intake</Typography>
          <Box height="250px" mt="-20px">
            <NutritionBarChart />
          </Box>
        </Box>

        <Box gridColumn="span 4" gridRow="span 2" bgcolor={colors.primary[400]} p="30px" borderRadius="10px">
          <Typography variant="h5" fontWeight="600" mb="15px">Body Progress Tracking</Typography>
          <Box height="200px">
            <BodyProgressChart />
          </Box>
        </Box>

        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} p="30px" sx ={{ borderRadius: "10px"}}>
          <HydrationProgressCircle currentIntake={7} goal={10} />
        </Box>
        
      </Box>
    </Box>
  );
};

export default Dashboard;
