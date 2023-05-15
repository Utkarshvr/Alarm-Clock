import React from "react";

// Cores
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

// Basic
import { IconButton, Typography } from "@mui/material";

// Icons
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { TimerContext } from "../../context/TimerContext";
import TimerModal from "./TimerModal";

export default function TimerItem({
  setShowPlayIcon,
  showPlayIcon,
  setCountDown,
}) {
  const { timer, dispatchToTimer } = React.useContext(TimerContext);
  const [open, setOpen] = React.useState(false);
  const [timerId, setTimerId] = React.useState();
  if (timer.length === 0) setShowPlayIcon(true);
  return (
    <>
      {timer.map((item) => {
        const { name, time, id } = item;
        const { hour, minute, seconds } = time;
        return (
          <div key={id}>
            <List sx={{ width: "100%" }}>
              <ListItem
                secondaryAction={
                  showPlayIcon ? (
                    <IconButton
                      onClick={() => setCountDown(item)}
                      color="primary"
                      size="large"
                    >
                      <PlayArrowIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => {
                        dispatchToTimer({
                          type: "DELETE_TIMER",
                          payload: { id },
                        });
                      }}
                      size="large"
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  )
                }
                disablePadding
              >
                <ListItemButton
                  onClick={() => {
                    setTimerId(id);
                    setOpen(true);
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography fontSize={28} variant="h6">
                        {hour < 10 ? "0" + hour : hour}:
                        {minute < 10 ? "0" + minute : minute}:
                        {seconds < 10 ? "0" + seconds : seconds}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        sx={{ color: "text.secondary" }}
                        fontSize={16}
                        variant="body1"
                      >
                        {name}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <TimerModal
              title="Edit"
              open={open}
              setOpen={setOpen}
              timerId={timerId}
            />
          </div>
        );
      })}
    </>
  );
}
