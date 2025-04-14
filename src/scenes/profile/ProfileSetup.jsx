import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../../server/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const workoutDaysOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const equipmentOptions = ["Dumbbells", "Resistance Bands", "Pull-up Bar", "Yoga Mat", "None"];
const styleOptions = ["Strength Training", "HIIT", "Yoga", "Pilates", "Cardio", "Stretching"];
const injuryOptions = ["Back", "Knee", "Shoulder", "Heart condition", "None"];
const intensityOptions = ["Light", "Moderate", "Intense"];
const durationOptions = ["15-30 min", "30-45 min", "45-60 min", "60+ min"];

const ProfileSetup = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    height: "",
    weight: "",
    fitnessLevel: "",
    goal: "",
    workoutPreference: "",
    sessionDuration: "",
    daysPerWeek: "",
    workoutDays: [],
    workoutStyle: [],
    injuries: [],
    equipmentAccess: [],
    intensity: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const { birthdate } = userSnap.data();
          if (birthdate) {
            const age = calculateAge(birthdate);
            setFormData((prev) => ({ ...prev, age }));
          }
        }
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const calculateAge = (birthdate) => {
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (name, value) => {
    setFormData((prev) => {
      const current = prev[name];
      return {
        ...prev,
        [name]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return alert("User not authenticated");
    try {
      await setDoc(doc(db, "users", userId), {
        ...formData,
        completedProfile: true,
        updatedAt: new Date(),
      });
      console.log("➡️ Navigating to workout-plan with userId:", userId);
      navigate("/workout-plan", { state: { userId } });
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    }
  };

  return (
    <Box m="20px" display="flex" justifyContent="center">
      <Box backgroundColor={colors.primary[400]} p="30px" borderRadius="10px" width="100%" maxWidth="900px">
        <Typography variant="h4" fontWeight="bold" color={colors.grey[100]} mb="20px" textAlign="center">
          Complete Your Fitness Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField select fullWidth label="Gender" name="gender" value={formData.gender} onChange={handleChange} margin="normal">
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>

          <TextField fullWidth label="Age" name="age" type="number" value={formData.age} margin="normal" InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Height (cm)" name="height" type="number" value={formData.height} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Weight (kg)" name="weight" type="number" value={formData.weight} onChange={handleChange} margin="normal" />

          <TextField select fullWidth label="Fitness Level" name="fitnessLevel" value={formData.fitnessLevel} onChange={handleChange} margin="normal">
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="advanced">Advanced</MenuItem>
          </TextField>

          <TextField select fullWidth label="Goal" name="goal" value={formData.goal} onChange={handleChange} margin="normal">
            <MenuItem value="lose fat">Lose Fat</MenuItem>
            <MenuItem value="gain muscle">Gain Muscle</MenuItem>
            <MenuItem value="endurance">Improve Endurance</MenuItem>
            <MenuItem value="general fitness">General Fitness</MenuItem>
          </TextField>

          <TextField select fullWidth label="Workout Preference" name="workoutPreference" value={formData.workoutPreference} onChange={handleChange} margin="normal">
            <MenuItem value="home">Home</MenuItem>
            <MenuItem value="gym">Gym</MenuItem>
            <MenuItem value="both">Both</MenuItem>
          </TextField>

          <TextField select fullWidth label="Session Duration" name="sessionDuration" value={formData.sessionDuration} onChange={handleChange} margin="normal">
            {durationOptions.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>

          <TextField fullWidth label="Days per Week" name="daysPerWeek" type="number" value={formData.daysPerWeek} onChange={handleChange} margin="normal" />

          <Typography variant="body1" mt={2} color={colors.grey[100]}>Which Days?</Typography>
          <FormGroup row>
            {workoutDaysOptions.map((day) => (
              <FormControlLabel
                key={day}
                control={<Checkbox checked={formData.workoutDays.includes(day)} onChange={() => handleMultiSelect("workoutDays", day)} />}
                label={day}
              />
            ))}
          </FormGroup>

          <Typography variant="body1" mt={2} color={colors.grey[100]}>Preferred Workout Styles</Typography>
          <FormGroup row>
            {styleOptions.map((style) => (
              <FormControlLabel
                key={style}
                control={<Checkbox checked={formData.workoutStyle.includes(style)} onChange={() => handleMultiSelect("workoutStyle", style)} />}
                label={style}
              />
            ))}
          </FormGroup>

          <Typography variant="body1" mt={2} color={colors.grey[100]}>Injuries / Conditions</Typography>
          <FormGroup row>
            {injuryOptions.map((injury) => (
              <FormControlLabel
                key={injury}
                control={<Checkbox checked={formData.injuries.includes(injury)} onChange={() => handleMultiSelect("injuries", injury)} />}
                label={injury}
              />
            ))}
          </FormGroup>

          <Typography variant="body1" mt={2} color={colors.grey[100]}>Equipment Access</Typography>
          <FormGroup row>
            {equipmentOptions.map((item) => (
              <FormControlLabel
                key={item}
                control={<Checkbox checked={formData.equipmentAccess.includes(item)} onChange={() => handleMultiSelect("equipmentAccess", item)} />}
                label={item}
              />
            ))}
          </FormGroup>

          <TextField select fullWidth label="Intensity Preference" name="intensity" value={formData.intensity} onChange={handleChange} margin="normal">
            {intensityOptions.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>

          <Button type="submit" fullWidth variant="contained" sx={{ backgroundColor: colors.greenAccent[600], color: colors.grey[100], mt: "20px", '&:hover': { backgroundColor: colors.greenAccent[700] } }}>
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ProfileSetup;
