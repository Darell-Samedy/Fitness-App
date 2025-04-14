import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import { useLocation } from "react-router-dom";
import { doc, getDoc, setDoc} from "firebase/firestore";
import { db } from "../../server/firebaseConfig";
import { auth } from "../../server/firebaseConfig";


const WorkoutPlan = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const userId = location.state?.userId || auth.currentUser?.uid;

  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPlan = async () => {
      console.log("Checking for saved plan in Firestore...");
      try {
        const planRef = doc(db, "users", userId, "aiWorkoutPlan", "latest");
        const planSnap = await getDoc(planRef);
    
        if (planSnap.exists()) {
          const data = planSnap.data();
          if (data.plan) {
            console.log("✅ Loaded plan from Firestore.");
            setPlan(data.plan);
            return;
          }
        }
    
        console.log("⚠️ No saved plan found. Calling backend...");
        const response = await fetch("http://localhost:5050/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });
    
        const result = await response.json();
        if (response.ok) {
          console.log("📥 Plan received from backend.");
          setPlan(result.plan);
    
          // 🔥 Save to Firestore under aiWorkoutPlan/latest
          await setDoc(planRef, {
            plan: result.plan,
            generatedAt: new Date(),
          });
    
          console.log("📦 Plan saved to Firestore.");
        } else {
          console.error("❌ Backend error:", result.error);
          setError(result.error || "Something went wrong");
        }
      } catch (err) {
        console.error("❌ Error loading/saving plan:", err);
        setError("Failed to load or generate workout plan.");
      } finally {
        setLoading(false);
      }
    };
    
    

    if (userId) loadPlan();
    else {
      console.warn("No userId passed to WorkoutPlan.jsx");
      setError("User ID not provided.");
    }
  }, [userId]);

  const renderStructuredPlan = (rawText) => {
    const days = rawText.split(/\*\*(.*?)\*\*/g).filter((t) => t.trim() !== "");
    if (days.length === 0) return null;

    return days.map((_, i) => {
      if (i % 2 === 1) return null;
      const day = days[i].trim();
      const content = days[i + 1] || "";
      const parts = content.split(/(Warm-up|Main Workout|Cooldown)/gi);

      return (
        <Box key={i} mb={2}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[400]} fontWeight="bold">
                {day}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {parts.map((part, idx) => {
                if (["Warm-up", "Main Workout", "Cooldown"].includes(part)) {
                  return (
                    <Typography
                      key={idx}
                      variant="h6"
                      color={colors.blueAccent[300]}
                      mt={2}
                      fontWeight="bold"
                    >
                      {part}
                    </Typography>
                  );
                } else {
                  return (
                    <Typography
                      key={idx}
                      variant="body2"
                      color={colors.grey[100]}
                      whiteSpace="pre-line"
                      sx={{ ml: 2 }}
                    >
                      {part.trim()}
                    </Typography>
                  );
                }
              })}
            </AccordionDetails>
          </Accordion>
        </Box>
      );
    });
  };

  return (
    <Box m="20px">
      <Typography variant="h4" color={colors.grey[100]} mb="20px">
        Your AI-Generated Workout Plan
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : plan ? (
        renderStructuredPlan(plan)
      ) : (
        <Typography color="gray">No workout plan received.</Typography>
      )}
    </Box>
  );
};

export default WorkoutPlan;
