import React, { useState } from "react";
import { Box, TextField, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { auth, db } from "../../server/firebaseConfig"; // Import Firebase services
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Import GoogleAuthProvider and signInWithPopup
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SignUp = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    birthdate: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Username validation
    if (!/^(?=.*\d)[a-zA-Z\d]{8,}$/.test(formData.username)) {
      newErrors.username =
        "Username must be at least 8 characters long and include at least one number.";
      valid = false;
    }

    // Password validation
    if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,10}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must be no more than 10 characters and include at least one number and one special symbol.";
      valid = false;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    // Birthdate validation
    if (!formData.birthdate) {
      newErrors.birthdate = "Please select your birthdate.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        const user = userCredential.user;

        // Save additional user information in Firestore
        await setDoc(doc(db, "users", user.uid), {
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          birthdate: formData.birthdate,
          createdAt: new Date(),
        });

        console.log("User created successfully:", user);

        // Redirect to the profile page with the user's information
        navigate("/profile-setup", { state: { userId: user.uid } });
      } catch (error) {
        console.error("Error creating user:", error);

        // Display a user-friendly error message
        if (error.code === "auth/email-already-in-use") {
          alert("The email address is already in use by another account.");
        } else if (error.code === "auth/weak-password") {
          alert("The password is too weak. Please choose a stronger password.");
        } else if (error.code === "auth/invalid-email") {
          alert("The email address is invalid. Please enter a valid email.");
        } else {
          alert("Failed to create user. Please try again.");
        }
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider(); // Initialize Google provider
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save additional user information in Firestore if needed
      await setDoc(doc(db, "users", user.uid), {
        firstName: user.displayName.split(" ")[0] || "",
        lastName: user.displayName.split(" ")[1] || "",
        email: user.email,
        username: user.email.split("@")[0], // Default username from email
        birthdate: "", // Optional, as Google doesn't provide this
        createdAt: new Date(),
      });

      console.log("Google Sign-In successful:", user);

      // Redirect to the profile page with the user's information
      navigate("/profile-setup", { state: { userId: user.uid } });
    } catch (error) {
      console.error("Error with Google Sign-In:", error);
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
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            error={!!errors.username}
            helperText={errors.username}
          />
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
          <TextField
            fullWidth
            label="Birthdate"
            name="birthdate"
            type="date"
            value={formData.birthdate}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            error={!!errors.birthdate}
            helperText={errors.birthdate}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: colors.grey[100],
              mt: "20px",
              "&:hover": {
                backgroundColor: colors.greenAccent[700],
              },
            }}
          >
            Sign Up
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
          Sign In with Google
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;