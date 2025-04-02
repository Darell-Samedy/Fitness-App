import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { auth, db } from "../../server/firebaseConfig"; // Import Firebase services
import { onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth state listener

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Check if the user is logged in
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch user data from Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.error("No user data found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        // Redirect to login if no user is logged in
        navigate("/login");
      }
      setLoading(false); // Stop loading once auth state is determined
    });

    return () => unsubscribe(); // Cleanup the listener
  }, [navigate]);

  if (loading) {
    return (
      <Box m="20px">
        <Typography variant="h4" color={colors.grey[100]}>
          Loading user data...
        </Typography>
      </Box>
    );
  }

  if (!userData) {
    return (
      <Box m="20px">
        <Typography variant="h4" color={colors.grey[100]}>
          Unable to load user data. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box m="20px">
      {/* Header Section */}
      <Box display="flex" alignItems="center" mb="20px">
        <Avatar
          src="https://via.placeholder.com/150" // Placeholder avatar
          alt={userData.username}
          sx={{ width: 120, height: 120, marginRight: "20px" }}
        />
        <Box>
          <Typography variant="h3" fontWeight="bold" color={colors.grey[100]}>
            {userData.username}
          </Typography>
          <Typography variant="h5" color={colors.grey[300]}>
            {userData.email}
          </Typography>
        </Box>
      </Box>

      {/* User Details */}
      <Box
        backgroundColor={colors.primary[400]}
        borderRadius="20px"
        p="20px"
        textAlign="center"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
      >
        <Typography variant="h4" fontWeight="bold" color={colors.grey[100]}>
          User Details
        </Typography>
        <Typography variant="body1" color={colors.grey[300]} mt="10px">
          <strong>Username:</strong> {userData.username}
        </Typography>
        <Typography variant="body1" color={colors.grey[300]}>
          <strong>Email:</strong> {userData.email}
        </Typography>
        <Typography variant="body1" color={colors.grey[300]}>
          <strong>Birthdate:</strong> {userData.birthdate}
        </Typography>
      </Box>
    </Box>
  );
};

export default Profile;