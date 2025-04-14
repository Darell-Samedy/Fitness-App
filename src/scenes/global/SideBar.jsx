import React, { useState } from 'react';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { tokens } from '../../theme';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TimelineIcon from '@mui/icons-material/Timeline';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === to}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(to)}
      icon={icon}
    >
      <Link to={to} style={{ color: 'inherit', textDecoration: 'none' }}>
        <Typography>{title}</Typography>
      </Link>
    </MenuItem>
  );
};

const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  return (
    <Box
      sx={{
        height: '100vh', // Ensure the sidebar stretches to the full height of the viewport
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <SidebarHeader>
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  FITNESS APP
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="square">
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Workout Plans"
              to="/workouts"
              icon={<FitnessCenterIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Workout Plans AI"
              to="/workout-plan"
              icon={<FitnessCenterIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Nutrition & Diet"
              to="/nutrition"
              icon={<RestaurantIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Progress Tracking"
              to="/progress"
              icon={<TimelineIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Challenges & Goals"
              to="/challenges"
              icon={<SportsMotorsportsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Exercise Library"
              to="/exercises"
              icon={<AssessmentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar & Schedule"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ & Help"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Menu>
        </SidebarContent>

        <SidebarFooter>
          <Typography color={colors.grey[100]} textAlign="center" p="10px">
            Stay Fit, Stay Healthy!
          </Typography>
        </SidebarFooter>
      </ProSidebar>
    </Box>
  );
};

export default SideBar;