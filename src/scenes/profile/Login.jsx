import React, { useState } from "react";
import { Box, TextField, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { auth } from "../../server/firebaseConfig"; // Import Firebase Auth
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log in the user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      console.log("User logged in successfully:", user);

      // Redirect to the profile page with the user's information
      navigate("/profile", { state: { userId: user.uid } });
    } catch (error) {
      console.error("Error logging in:", error);

      // Display a user-friendly error message
      if (error.code === "auth/user-not-found") {
        alert("No user found with this email. Please sign up first.");
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password. Please try again.");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email address. Please enter a valid email.");
      } else {
        alert("Failed to log in. Please try again.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("User logged in with Google:", user);

      // Redirect to the profile page with the user's information
      navigate("/profile", { state: { userId: user.uid } });
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      alert("Failed to sign in with Google. Please try again.");
    }
  };

  return (
    <Box
      m="20px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box
        backgroundColor={colors.primary[400]}
        p="30px"
        borderRadius="10px"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
        width="400px"
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color={colors.grey[100]}
          mb="20px"
          textAlign="center"
        >
          Log In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: colors.blueAccent[600],
              color: colors.grey[100],
              mt: "20px",
              "&:hover": {
                backgroundColor: colors.blueAccent[700],
              },
            }}
          >
            Log In
          </Button>
        </form>
        <Button
          fullWidth
          variant="outlined"
          sx={{
            mt: "20px",
            color: colors.grey[100],
            borderColor: colors.grey[100],
            "&:hover": {
              borderColor: colors.greenAccent[700],
              color: colors.greenAccent[700],
            },
          }}
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
