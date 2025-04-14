import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import TopBar from './scenes/global/TopBar';
import SideBar from './scenes/global/SideBar';
import Dashboard from './scenes/dashboard';
import Team from './scenes/team';
import Invoices from './scenes/invoices';
import Contacts from './scenes/contacts';
import Bar from './scenes/bar';
import Form from './scenes/form';
import Line from './scenes/line';
import Pie from './scenes/pie';
import FAQ from './scenes/faq';
import Geography from './scenes/geography';
import Calendar from './scenes/calendar';
import Profile from './scenes/profile/Profile';
import SignUp from './scenes/profile/Signup';
import ProfileSetup from './scenes/profile/ProfileSetup';
import WorkoutPlan from "./scenes/profile/WorkoutPlan";
import Login from './scenes/profile/Login';


function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{ display: 'flex' }}>
          <SideBar />
          <main className="content" style={{ flexGrow: 1 }}>
            <TopBar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/workouts" element={<Team />} />
              <Route path="/nutrition" element={<Contacts />} />
              <Route path="/progress" element={<Invoices />} />
              <Route path="/challenges" element={<Form />} />
              <Route path="/exercises" element={<Bar />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/line" element={<Line />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile-setup" element={<ProfileSetup />} />
              <Route path="/workout-plan" element={<WorkoutPlan />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;