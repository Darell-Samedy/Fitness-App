//import TopBar from "./scenes/global/topBar";
import { ColorModeContext } from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import TopBar from "./scenes/global/topBar";
import { useMode } from "./theme";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
// import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
// import Calender from "./scenes/calender"


function FitnessDashboard() {
  const [theme, colorMode] = useMode() ;

  return(
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className = "content">
            <TopBar />
            <Routes>
              <Route path="/" element = {<Dashboard />} />
              {/* <Route path="/team" element = {<Team />} /> */}
              {/* <Route path="/contacts" element = {<Contacts />} /> */}
              {/* <Route path="/invoices" element = {<Invoices />} /> */}
              {/* <Route path="/form" element = {<Form />} /> */}
              {/* <Route path="/bar" element = {<Bar/>} /> */}
              {/* <Route path="/pie" element = {<Pie/>} /> */}
              {/* <Route path="/line" element = {<Line />} /> */}
              {/* <Route path="/faq" element = {<FAQ />} /> */}
              {/* <Route path="/geography" element = {<Geography />} /> */}
              {/* <Route path="/calender" element = {<Calender />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
  return <div className="app"></div>;
}

export default FitnessDashboard