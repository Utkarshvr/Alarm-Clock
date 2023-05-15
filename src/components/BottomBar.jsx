import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

// ICONS
import AlarmsIcon from "@mui/icons-material/AccessTimeFilled";
import TimerIcon from "@mui/icons-material/HourglassFull";
import StopWatchIcon from "@mui/icons-material/Timer";
import React, { useState } from "react";

// Link Router
import { Link } from "react-router-dom";
export default function BottomBar({ setPageNo }) {
  const URL_PATH = window.location.pathname;
  const PageNumber = () => {
    if (URL_PATH === "/stopwatch") {
      return 1;
    } else if (URL_PATH === "/timer") {
      return 2;
    } else {
      return 0;
    }
  };

  const [value, setValue] = useState(PageNumber());
  return (
    <BottomNavigation
      sx={{ width: { xs: "100vw", sm: 500 } }}
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setPageNo(newValue);
        sessionStorage.setItem("PageNumber", newValue);
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        component={Link}
        to="/"
        label="Alarm"
        icon={<AlarmsIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/stopwatch"
        label="Stopwatch"
        icon={<StopWatchIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/timer"
        label="Timer"
        icon={<TimerIcon />}
      />
    </BottomNavigation>
  );
}
