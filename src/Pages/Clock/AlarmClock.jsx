import React, { useContext, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import AlarmItem from "./AlarmItem";
import AlarmNav from "./Layout/AlarmNav";
import { RingingAlarm } from "../../context/RingingAlarm";
import { AlarmContext } from "../../context/AlarmContext";
import { setTime } from "../../utils/setTime";
import AlarmAlert from "./AlarmAlert";
import AlarmOffIcon from "@mui/icons-material/AlarmOff";

export default function AlarmClock() {
  const [showSwitchIcon, setShowSwitchIcon] = React.useState(true);
  const { alarm, dispatch } = useContext(AlarmContext);
  const { ringingAlarm, dispatchRingingAlarm } = useContext(RingingAlarm);

  useEffect(() => {
    if (alarm.length === 0) setShowSwitchIcon(true);
    dispatchRingingAlarm({ type: "CLEAR_TIME_OUT_IDS" });
    alarm.map((e) => {
      if (e.status === true) {
        setTime(e, e.time, e.ringtone, dispatchRingingAlarm);
        return null;
      }
      return null;
    });
  }, [alarm]);

  return (
    <>
      <Stack>
        {/* Sort of Navbar */}
        <AlarmNav
          showSwitchIcon={showSwitchIcon}
          setShowSwitchIcon={setShowSwitchIcon}
        />
        {/* Alarm Items */}
        {alarm.length !== 0 && (
          <Stack sx={{ pb: 10 }}>
            <AlarmItem
              showSwitchIcon={showSwitchIcon}
              setShowSwitchIcon={setShowSwitchIcon}
            />
          </Stack>
        )}
        {alarm.length === 0 && (
          <Stack
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
            alignItems="center"
            justifyContent="center"
          >
            <AlarmOffIcon color="disabled" sx={{ fontSize: 120 }} />
            <Typography variant="h6" color="gray">
              Add Alarms
            </Typography>
          </Stack>
        )}
      </Stack>
      {ringingAlarm.isRinging && (
        <AlarmAlert
          dispatch={dispatch}
          alarm={ringingAlarm.alarm}
          dispatchRingingAlarm={dispatchRingingAlarm}
        />
      )}
    </>
  );
}
