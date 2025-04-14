import React from 'react';
import { Box, useTheme, Typography } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { tokens } from "../../theme";
import '../../tailwind.css';

const questions = [
  {
    title: "How to Stay Motivated?",
    content: "Staying motivated can be challenging. Set realistic goals, track your progress, and reward yourself for achievements."
  },
  {
    title: "Best Time to Workout?",
    content: "The best time to workout is when you feel most energetic. Morning workouts can boost your metabolism, while evening workouts can help relieve stress."
  },
  {
    title: "How to Avoid Injuries?",
    content: "Warm up before exercising, use proper form, and listen to your body. Don't push yourself too hard and take rest days."
  },
  {
    title: "Benefits of Strength Training?",
    content: "Strength training helps build muscle, increase metabolism, and improve overall strength and endurance."
  },
  {
    title: "How to Improve Flexibility?",
    content: "Incorporate stretching exercises into your routine, practice yoga, and stay consistent with your flexibility training."
  }
];

const getRandomQuestions = (num) => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random()); // Create a copy before sorting
  return shuffled.slice(0, num);
};

const faqData = [
  {
    category: "Getting Started",
    items: [
      {
        question: "How do I create a workout plan?",
        answer: "Go to the 'Workout Plans' section, select your fitness goal, and the app will generate a custom plan tailored to your level and preferences.",
      },
      {
        question: "Can I update my fitness goals later?",
        answer: "Yes! You can update your goals anytime from your profile settings.",
      },
    ],
  },
  {
    category: "Workouts & Exercises",
    items: [
      {
        question: "What types of workouts are available?",
        answer: "We offer strength training, cardio, HIIT, yoga, and mobility routines designed for all fitness levels.",
      },
      {
        question: "How do I track my completed workouts?",
        answer: "Workouts you mark as completed in the calendar or workout section will be saved to your progress automatically.",
      },
    ],
  },
  {
    category: "Nutrition & Meal Plans",
    items: [
      {
        question: "How is the meal plan generated?",
        answer: "Your meal plan is customized based on your goal (e.g. fat loss, muscle gain), dietary preferences, and daily calorie needs.",
      },
      {
        question: "Can I swap meals or ingredients?",
        answer: "Yes, each meal has alternative options you can select or customize manually.",
      },
    ],
  },
  {
    category: "Progress Tracking",
    items: [
      {
        question: "How do I track my weight and measurements?",
        answer: "Go to the 'Progress Tracking' page to log your weight, measurements, and view your historical data.",
      },
      {
        question: "What do the progress graphs mean?",
        answer: "They show your progress trends over time—like weight change, workout consistency, or macro tracking.",
      },
    ],
  },
  {
    category: "Account & Technical",
    items: [
      {
        question: "Is the app free?",
        answer: "Basic features are free. You can upgrade to premium for advanced tracking, AI-generated plans, and personal coaching.",
      },
      {
        question: "How do I contact support?",
        answer: "Use the Help & Support link at the bottom of the sidebar, or email us at support@fitnessapp.com.",
      },
    ],
  },
];

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const randomQuestions = getRandomQuestions(5); // Get 5 random questions

  return (
    <Box m="20px">
      <Header title="FAQ & Help" subtitle="Frequently Asked Questions" />
  
      {faqData.map((section, idx) => (
        <Box key={idx} mb="30px">
          <Typography variant="h5" color={colors.greenAccent[500]} mb="10px">
            {section.category}
          </Typography>
          {section.items.map((item, i) => (
            <Accordion key={i} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" color={colors.grey[100]}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ))}
  
      {randomQuestions.map((question, index) => (
        <Accordion key={index} defaultExpanded className="fade-in">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <HelpOutlineIcon
              style={{ marginRight: "10px", color: colors.greenAccent[500] }}
            />
            <Typography color={colors.greenAccent[500]} variant="h5">
              {question.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{question.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQ; 