import React from "react";
import Defualt from "../../assets/audio/DefaultRingtone.mp3";
import chimes from "../../assets/audio/chimes.mp3";
import calm from "../../assets/audio/calm.mp3";
import { Backdrop, Button, Stack, Typography } from "@mui/material";

let fiveMinutes = 5 * 60000;
export default function AlarmAlert({ dispatch, alarm, dispatchRingingAlarm }) {
  const { time, alarmName, audio, ringtone } = alarm;
  const { hour, minute } = time;
  // Handlers
  const handleSnooze = () => {
    audio.pause();
    dispatchRingingAlarm({ type: "STOP_ALARM" });

    let selectedRingtone;
    if (ringtone === 1) {
      selectedRingtone = Defualt;
    } else if (ringtone === 2) {
      selectedRingtone = chimes;
    } else if (ringtone === 3) {
      selectedRingtone = calm;
    }

    let timeOutId = setTimeout(() => {
      let time = new Date();
      const hr = time.getHours();
      const min = time.getMinutes();
      let newAudio = new Audio(selectedRingtone);
      newAudio.loop = true;
      newAudio.play();
      dispatchRingingAlarm({
        type: "RINGING",
        payload: {
          ...alarm,
          time: {
            hour: hr > 12 ? hr - 12 : hr,
            meridiem: hr >= 12 ? "PM" : "AM",
            minute: min,
          },
          timeOutId: timeOutId,
          audio: newAudio,
          ringtone: ringtone,
        },
      });
    }, fiveMinutes);
    dispatchRingingAlarm({
      type: "SET_TIME_OUT_IDS",
      payload: { timeOutId: timeOutId, leftTime: fiveMinutes },
    });
  };
  const handleStop = () => {
    audio.pause();
    dispatchRingingAlarm({ type: "STOP_ALARM" });
    dispatch({ type: "RETURN_ALARM" });
  };

  return (
    <Backdrop
      sx={{
        color: "#fff",
        backgroundColor: "rgba(0,0,0,0.9)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={true}
    >
      <Stack spacing={5} alignItems="center" direction="column">
        <Stack>
          <Typography variant="h3">
            {hour < 10 ? "0" + hour : hour}:
            {minute < 10 ? "0" + minute : minute}
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="column" spacing={1}>
          <Typography variant="h6">{alarmName}</Typography>
          <Button onClick={handleSnooze} variant="contained">
            Snooze
          </Button>
        </Stack>
        <Stack>
          <Button onClick={handleStop} variant="outlined">
            Stop
          </Button>
        </Stack>
      </Stack>
    </Backdrop>
  );
}
