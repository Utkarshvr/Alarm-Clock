import { Stack, Typography } from "@mui/material";
import React from "react";
import TimerNav from "./Layout/TimerNav";
import TimerAlert from "./TimerAlert";
import CountDown from "./CountDown";
import TimerItem from "./TimerItem";
import { TimerContext } from "../../context/TimerContext";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";
export default function Timer() {
  const [showPlayIcon, setShowPlayIcon] = React.useState(true);
  const [countDown, setCountDown] = React.useState(null);
  const [alert, setAlert] = React.useState(null);
  const { timer } = React.useContext(TimerContext);
  const styleList = {
    overflowY: "scroll",
    pb: 10,
    "&::-webkit-scrollbar": {
      width: "0.3em",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#333",
      borderRadius: "100px",
    },
  };
  return (
    <>
      <Stack>
        {countDown !== null ? (
          <CountDown
            setAlert={setAlert}
            setCountDown={setCountDown}
            timer={countDown}
          />
        ) : (
          <>
            <TimerNav
              timer={timer}
              showPlayIcon={showPlayIcon}
              setShowPlayIcon={setShowPlayIcon}
            />
            <Stack sx={styleList} spacing={2}>
              <TimerItem
                setShowPlayIcon={setShowPlayIcon}
                setCountDown={setCountDown}
                showPlayIcon={showPlayIcon}
              />
            </Stack>
          </>
        )}
        {timer.length === 0 && (
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
            <HourglassDisabledIcon color="disabled" sx={{ fontSize: 120 }} />
            <Typography variant="h6" color="gray">
              Add Timer
            </Typography>
          </Stack>
        )}
      </Stack>
      {alert !== null && <TimerAlert setAlert={setAlert} timer={alert} />}
    </>
  );
}
