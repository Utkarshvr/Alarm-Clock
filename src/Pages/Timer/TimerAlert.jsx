import React from "react";
import DefaultRingtone from "../../assets/audio/DefaultRingtone.mp3";
import chimes from "../../assets/audio/chimes.mp3";
import calm from "../../assets/audio/calm.mp3";
import { Backdrop, Button, Stack, Typography } from "@mui/material";

export default function TimerAlert({ setAlert, timer }) {
  const { name, ringtone } = timer;
  const now = new Date();
  let hour = now.getHours();
  hour = hour > 12 ? hour - 12 : hour;
  let minute = now.getMinutes();
  let merediem = hour >= 12 ? "PM" : "AM";
  let selectedRingtone;
  if (ringtone === 1) {
    selectedRingtone = DefaultRingtone;
  } else if (ringtone === 2) {
    selectedRingtone = chimes;
  } else if (ringtone === 3) {
    selectedRingtone = calm;
  }
  let audio = new Audio(selectedRingtone);
  audio.loop = true;
  audio.play();
  // Handlers
  const handleDismiss = () => {
    audio.pause();
    setAlert(null);
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
      <Stack spacing={3} alignItems="center" justifyContent="center">
        <Typography color="primary" variant="h3">
          Timer Done
        </Typography>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="h6">
          {hour < 10 ? "0" + hour : hour}:{minute < 10 ? "0" + minute : minute}{" "}
          {merediem}
        </Typography>
        <Button fullWidth onClick={handleDismiss} variant="contained">
          Dismiss
        </Button>
      </Stack>
    </Backdrop>
  );
}
