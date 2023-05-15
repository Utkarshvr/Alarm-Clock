import React from "react";
import { Container } from "@mui/material";
import AlarmClock from "./Pages/Clock/AlarmClock";
import BottomBar from "./components/BottomBar";
import FabAlarm from "./components/FabAlarm";
import StopWatch from "./Pages/Stopwatch/StopWatch";
import Timer from "./Pages/Timer/Timer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/system";
import { Route, Routes } from "react-router-dom";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FabTimer from "./components/FabTimer";

export const ThemeContext = React.createContext();

export default function App() {
  const [theme, setTheme] = React.useState("dark");
  const [pageNo, setPageNo] = React.useState(0);

  const Theme = createTheme({
    palette: {
      mode: theme,
    },
    typography: {
      fontFamily: [
        "Montserrat",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });

  React.useEffect(() => {
    setPageNo(JSON.parse(sessionStorage.getItem("PageNumber")) || 0);
  }, [pageNo]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <Container maxWidth="sm">
            <Routes>
              <Route path="/" element={<AlarmClock />} />
              <Route path="/stopwatch" element={<StopWatch />} />
              <Route path="/timer" element={<Timer />} />
            </Routes>
          </Container>
          <Box
            position="fixed"
            bgcolor="paper.background"
            sx={{
              left: "50%",
              bottom: { xs: 0, sm: 20 },
              translate: "-50%",
              display: "flex",
              flexDirection: "column",
              gap: "1em",
              alignItems: "center",
            }}
          >
            {pageNo === 0 && <FabAlarm />}
            {pageNo === 2 && <FabTimer />}
            <Box>
              <BottomBar setPageNo={setPageNo} />
            </Box>
          </Box>
        </ThemeContext.Provider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
