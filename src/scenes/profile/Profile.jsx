import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  useTheme,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../server/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
            setEditData(userDoc.data());
          } else {
            console.error("No user data found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, editData);
      setUserData(editData);
      handleEditClose();
    } catch (error) {
      console.error("Failed to update user data:", error);
    }
  };

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
      <Box display="flex" alignItems="center" mb="20px">
        <Avatar
          src="https://via.placeholder.com/150"
          alt={userData.username}
          sx={{ width: 120, height: 120, marginRight: "20px" }}
        />
        <Box>
          <Typography variant="h3" fontWeight="bold" color={colors.grey[100]}>
            {userData.firstName} {userData.lastName}
          </Typography>
          <Typography variant="h5" color={colors.grey[300]}>
            {userData.email}
          </Typography>
        </Box>
      </Box>

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
          <strong>First Name:</strong> {userData.firstName}
        </Typography>
        <Typography variant="body1" color={colors.grey[300]}>
          <strong>Last Name:</strong> {userData.lastName}
        </Typography>
        <Typography variant="body1" color={colors.grey[300]}>
          <strong>Email:</strong> {userData.email}
        </Typography>
        <Typography variant="body1" color={colors.grey[300]}>
          <strong>Birthdate:</strong> {userData.birthdate}
        </Typography>

        <Button
          variant="contained"
          onClick={handleEditOpen}
          sx={{
            mt: "20px",
            mr: "10px",
            backgroundColor: colors.greenAccent[500],
            color: colors.grey[100],
            "&:hover": {
              backgroundColor: colors.greenAccent[700],
            },
          }}
        >
          Edit Profile
        </Button>

        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            mt: "20px",
            backgroundColor: colors.redAccent[500],
            color: colors.grey[100],
            "&:hover": {
              backgroundColor: colors.redAccent[700],
            },
          }}
        >
          Log Out
        </Button>
      </Box>

      {/* Edit Modal */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Your Profile</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="First Name"
            name="firstName"
            value={editData.firstName || ""}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Last Name"
            name="lastName"
            value={editData.lastName || ""}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={editData.email || ""}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Birthdate"
            name="birthdate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={editData.birthdate || ""}
            onChange={handleEditChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleSaveChanges} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
