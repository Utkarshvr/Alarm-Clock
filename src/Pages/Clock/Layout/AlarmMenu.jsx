import React, { useContext } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { RingingAlarm } from "../../../context/RingingAlarm";
import { AlarmContext } from "../../../context/AlarmContext";

import { ThemeContext } from "../../../App";
export default function AlarmMenu({ showSwitchIcon, setShowSwitchIcon }) {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const { alarm, dispatch } = React.useContext(AlarmContext);
  const { dispatchRingingAlarm } = useContext(RingingAlarm);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteAll = () => {
    dispatchRingingAlarm({ type: "CLEAR_TIME_OUT_IDS" });
    dispatch({
      type: "DELETE_ALL_ALARMS",
    });
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setShowSwitchIcon(false);
    setAnchorEl(null);
  };
  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setAnchorEl(null);
  };
  return (
    <div>
      {showSwitchIcon ? (
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => {
            setShowSwitchIcon(true);
          }}
        >
          <DoneIcon />
        </IconButton>
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {alarm.length !== 0 && (
          <MenuItem onClick={handleDeleteAll}>Delete All Alarms</MenuItem>
        )}
        {alarm.length !== 0 && <MenuItem onClick={handleEdit}>Edit</MenuItem>}
        <MenuItem onClick={handleToggleTheme}>
          Switch to {theme === "dark" ? "Light" : "Dark"} Theme
        </MenuItem>
      </Menu>
    </div>
  );
}
