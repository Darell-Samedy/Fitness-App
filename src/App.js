import TopBar from "./scenes/global/topBar";
import { ColorModeContext } from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import TopBar from "./scenes/global/topBar";

function FitnessDashboard() {
  const [theme, colorMode] = useMode();

  return(
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className = "Content">
            <TopBar />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
  return <div className="app"></div>;
}

export default FitnessDashboard