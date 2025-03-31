import { Box, useTheme, Typography } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

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
    </Box>
  );
};

export default FAQ;
