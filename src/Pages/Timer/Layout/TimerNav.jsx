import React from "react";
import TimerMenu from "./TimerMenu";
import { Stack, Typography } from "@mui/material";

export default function TimerNav({ timer, showPlayIcon, setShowPlayIcon }) {
  return (
    <Stack
      position="sticky"
      top={0}
      left={0}
      bgcolor="background.paper"
      zIndex={100}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack px={2} py={3}>
        <Typography variant="h6" fontSize={32}>
          Timer
        </Typography>
      </Stack>
      <TimerMenu
        timer={timer}
        showPlayIcon={showPlayIcon}
        setShowPlayIcon={setShowPlayIcon}
      />
    </Stack>
  );
}
