import React from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { ThemeContext } from "../../../App";

export default function TimerMenu({ timer, showPlayIcon, setShowPlayIcon }) {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    setShowPlayIcon(false);
    setAnchorEl(null);
  };
  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setAnchorEl(null);
  };
  return (
    <div>
      {showPlayIcon ? (
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => {
            setShowPlayIcon(true);
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
        {timer.length !== 0 && <MenuItem onClick={handleEdit}>Edit</MenuItem>}
        <MenuItem onClick={handleToggleTheme}>
          Switch to {theme === "dark" ? "Light" : "Dark"} Theme
        </MenuItem>
      </Menu>
    </div>
  );
}
