 import {useState} from "react";
 import {ProSideBar, Menu, MenuItem} from "react-pro-sidebar";
 import "react-pro-sidebar/dist/css/styles.css";
 import {Box, IconButton, Typography, useTheme} from "@mui/material";
 import { Link } from "react-router-dom";
 import { tokens } from "../../theme";
 import HomeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
 import PeopleOutlinedIcon from "@mui/icons-material/LightModeOutlined";
 import ContactOutlinedIcon from "@mui/icons-material/LightModeOutlined";
 import ReceiptOutlinedIcon from "@mui/icons-material/LightModeOutlined";
 import CalandarOutlinedIcon from "@mui/icons-material/LightModeOutlined";
 import HelpOutlinedIcon from "@mui/icons-material/LightModeOutlined";
 import BarChartOutlinedIcon from "@mui/icons-material/LightModeOutlined";
 import PieChartOutlinedIcon from "@mui/icons-material/LightModeOutlined";
 import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
 import TimelineOutlinedIcon from "@mui/icons-material/LightModeOutlined";
 import MenuOutlinedIcon from "@mui/icons-material/LightModeOutlined";
 import MapOutOutlinedIcon from "@mui/icons-material/LightModeOutlined";


 const SideBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    
    return (
        <Box
        sx = {{
            "& .pro-sidebar-inner": {
                background: `${colors.primary[400]} !important`,
            },
            "& .pro-icon-wrapper": {
                backgroundColor: "transparent !important",
            },
            "& .pro-inner-item": {
                padding: "5px 35px 5px 20px !important",
            },
            "& .pro-inner-item:hover": {
                color: "#868dfb !important",
            },
            "& .pro-menu-item.active": {
                color: "#6870fa !important",
            },
        }}
        >

        </Box>
    )
 };

 export default SideBar;