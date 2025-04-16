import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  useTheme,
  IconButton,
  InputAdornment,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Settings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [units, setUnits] = useState({ weight: "lbs", distance: "miles" });
  const [accountInfo, setAccountInfo] = useState({ name: "Ishan Patel", email: "ishan@example.com" });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
  const [showAlert, setShowAlert] = useState(false);

  const handleUnitChange = (e) => {
    setUnits({ ...units, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleSave = () => {
    // Later you can validate or send to API
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match.");
      return;
    }
    setShowAlert(true);
  };

  return (
    <Box m="20px">
      <Header title="SETTINGS" subtitle="Manage your account preferences" />

      {/* Account Info */}
      <Box mb={4}>
        <Typography variant="h4" mb={2} color={colors.greenAccent[500]}>
          Account Information
        </Typography>
        <TextField
          fullWidth
          required
          label="Name"
          value={accountInfo.name}
          onChange={(e) => setAccountInfo({ ...accountInfo, name: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          value={accountInfo.email}
          disabled
        />
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Change Password */}
      <Box mb={4}>
        <Typography variant="h4" mb={2} color={colors.greenAccent[500]}>
          Change Password
        </Typography>

        {["current", "new", "confirm"].map((field, idx) => (
          <TextField
            key={field}
            fullWidth
            type={showPassword[field] ? "text" : "password"}
            label={
              field === "current"
                ? "Current Password"
                : field === "new"
                ? "New Password"
                : "Confirm New Password"
            }
            value={passwords[field]}
            onChange={(e) => setPasswords({ ...passwords, [field]: e.target.value })}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => toggleShowPassword(field)}>
                    {showPassword[field] ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        ))}
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Preferred Units */}
      <Box mb={4}>
        <Typography variant="h4" mb={2} color={colors.greenAccent[500]}>
          Preferred Units
        </Typography>
        <FormControl sx={{ mb: 2 }}>
          <FormLabel sx={{ color: colors.grey[100] }}>Weight</FormLabel>
          <RadioGroup row name="weight" value={units.weight} onChange={handleUnitChange}>
            <FormControlLabel value="lbs" control={<Radio />} label="lbs" />
            <FormControlLabel value="kg" control={<Radio />} label="kg" />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel sx={{ color: colors.grey[100] }}>Distance</FormLabel>
          <RadioGroup row name="distance" value={units.distance} onChange={handleUnitChange}>
            <FormControlLabel value="miles" control={<Radio />} label="miles" />
            <FormControlLabel value="km" control={<Radio />} label="km" />
          </RadioGroup>
        </FormControl>
      </Box>

      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Changes
      </Button>

      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setShowAlert(false)}>
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
