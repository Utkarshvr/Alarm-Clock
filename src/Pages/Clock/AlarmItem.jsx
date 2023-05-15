// React
import React, { useContext, useState } from "react";
import { RingingAlarm } from "../../context/RingingAlarm";

// Components
import { IconButton, Stack, Typography } from "@mui/material";

// Icons
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// Cores
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

// Other Components
import AlarmModal from "./AlarmModal";
import AlarmSwitch from "./AlarmSwitch";
import { AlarmContext } from "../../context/AlarmContext";

export default function AlarmItem({ showSwitchIcon, setShowSwitchIcon }) {
  const [open, setOpen] = useState(false);
  const [alarmID, setAlarmID] = useState();
  const { alarm, dispatch } = useContext(AlarmContext);
  const { dispatchRingingAlarm } = useContext(RingingAlarm);

  return (
    <>
      {alarm.map((thisAlarm) => {
        const { id, time, alarmName, status } = thisAlarm;
        const { hour, minute, meridiem } = time;
        return (
          <div key={id}>
            <List sx={{ width: "100%" }}>
              <ListItem
                secondaryAction={
                  showSwitchIcon ? (
                    <AlarmSwitch status={status} index={id} />
                  ) : (
                    <IconButton
                      onClick={() => {
                        dispatch({ type: "DELETE_ALARM", payload: { id } });
                        dispatchRingingAlarm({
                          type: "CLEAR_TIMEOUT",
                          payload: { id: id },
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
                    setAlarmID(id);
                    setOpen(true);
                  }}
                >
                  <ListItemText
                    primary={
                      <Stack
                        direction="row"
                        spacing={0.3}
                        alignItems="baseline"
                      >
                        <Typography fontSize={28} variant="h6">
                          {hour}:{minute > 9 ? minute : "0" + minute}
                        </Typography>
                        <Typography
                          sx={{ color: "text.secondary" }}
                          fontSize={16}
                          variant="subtitle1"
                        >
                          {meridiem}
                        </Typography>
                      </Stack>
                    }
                    secondary={
                      <Typography
                        sx={{ color: "text.secondary" }}
                        fontSize={16}
                        variant="body1"
                      >
                        {" "}
                        {alarmName}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <AlarmModal
              title="Edit"
              alarmID={alarmID}
              open={open}
              setOpen={setOpen}
            />
          </div>
        );
      })}
    </>
  );
}
