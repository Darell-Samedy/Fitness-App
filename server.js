const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const { db } = require("./config/firebase");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  console.log("POST /generate called");
  const { userId } = req.body;
  console.log("Received userId:", userId);

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    const docRef = db.collection("users").doc(userId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const profile = docSnap.data();

    const prompt = `
Create a personalized ${profile.daysPerWeek}-day workout plan for a ${profile.age}-year-old ${profile.gender}.
They are ${profile.height}cm tall, ${profile.weight}kg, fitness level: ${profile.fitnessLevel}, and goal: ${profile.goal}.
Workout style preferences: ${profile.workoutStyle?.join(", ") || "any"}.
Workout days: ${profile.workoutDays?.join(", ") || "unspecified"}.
Available equipment: ${profile.equipmentAccess?.join(", ") || "none"}.
Preferred intensity: ${profile.intensity || "moderate"}, session duration: ${profile.sessionDuration || "45 mins"}.
Include warm-up, main workout, and cooldown for each day.
`;

    const response = await axios.post(
      "https://api.together.xyz/v1/chat/completions",
      {
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 800,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const plan = response.data.choices[0].message.content;

    // Save to Firestore under aiWorkoutPlan/latest
    await db
      .collection("users")
      .doc(userId)
      .collection("aiWorkoutPlan")
      .doc("latest")
      .set({
        plan,
        createdAt: new Date(),
      });

    console.log("Plan saved to Firestore at aiWorkoutPlan/latest");

    return res.status(200).json({ plan });
  } catch (err) {
    console.error("Error generating plan:", err.message);
    console.error(err.response?.data || err);
    return res.status(500).json({ error: "Failed to generate workout plan" });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
