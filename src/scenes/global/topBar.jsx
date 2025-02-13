import {Box, Icon, useTheme} from "@mui/material";
import {useContext} from "react";
import {colorModeContext, tokens} from "../../theme";
import InputBase from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import SearchIcon from "@mui/icons-material/LightModeOutlined";

const topBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(colorModeContext);

    return (
    <Box display="flex" justifyContent="space-between" p={2}>
        {/* SEARCH BAR */}
        <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px"
        >
            <InputBase sx={{ml: 2, flex: 1}} placeholder="Search"/>
            <IconButton type = "button" sx = {{p: 1}}>
                <SearchIcon />
                </IconButton>
        </Box>
        {/* ICONS */}
        
    </Box>)
}

export default TopBar;