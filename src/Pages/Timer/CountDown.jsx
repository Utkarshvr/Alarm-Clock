import React from "react";
import {
  Button,
  ButtonGroup,
  Tooltip,
  Paper,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
// Icons
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PauseIcon from "@mui/icons-material/Pause";
import useInterval from "../../hooks/useInterval";

// Utils
import toHmMerediemRound from "../../utils/conversion/toHmMerediemRound";

export default function CountDown({ setAlert, setCountDown, timer }) {
  const [endTime, setEndTime] = React.useState(null);
  const [isActive, setIsActive] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(true);

  const { time, name } = timer;
  const { hour, minute, seconds } = time;
  const TotalSelectedTime = (hour, minute, seconds) => {
    return hour * 3600 + minute * 60 + seconds;
  };
  const [totalSeconds, setTotalSeconds] = React.useState(
    TotalSelectedTime(hour, minute, seconds)
  );

  // End Timer When TotalSeconds = 0sec
  let h = Math.floor(totalSeconds / 3600);
  let m = Math.floor((totalSeconds % 3600) / 60);
  let s = Math.floor(totalSeconds % 60);
  // console.log(`${h} : ${m} : ${s}`);

  // END TIME Calc
  function calculateTheTime() {
    // CurrentTime(now)
    const now = new Date();
    let currentHours = now.getHours();
    let currentMinutes = now.getMinutes();
    let TotalCurrentTimeInMinutes = currentHours * 60 + currentMinutes;

    // SelectedTime
    const SelectedTimeInMinutes = totalSeconds / 60;
    const TimerEndTimeInMinutes =
      TotalCurrentTimeInMinutes + SelectedTimeInMinutes;

    let { hrs, mns, merediem } = toHmMerediemRound(TimerEndTimeInMinutes);
    return { hrs, mns, merediem };
  }
  // Ultra Logic
  useInterval(() => {
    if (isActive === true && isPaused === false && totalSeconds !== 0) {
      setTotalSeconds((t) => t - 1);
    }
    if (totalSeconds === 0) {
      setCountDown(null);
      setAlert(timer);
    }
  }, 1000);
  const handleStart = () => {
    const { hrs, mns, merediem } = calculateTheTime();
    setEndTime({ hrs, mns, merediem });
    setIsActive(true);
    setIsPaused(false);
  };
  const handlePause = () => {
    setEndTime(null);
    setIsActive(false);
    setIsPaused(true);
  };
  const handleReset = () => {
    setEndTime(null);
    setTotalSeconds(TotalSelectedTime(hour, minute, seconds));
    setIsActive(false);
    setIsPaused(true);
  };
  return (
    <>
      <Stack sx={{ height: "100vh", maxHeight: "100vh" }}>
        <Stack direction="row" alignItems="center" spacing={1} px={2} py={3}>
          <Tooltip
            onClick={() => {
              setCountDown(null);
            }}
            title="Add"
          >
            <IconButton>
              <ArrowBackIosNewIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" fontSize={32}>
            Timer
          </Typography>
        </Stack>
        <Stack justifyContent="center" height="inherit">
          <Paper
            sx={{
              height: "fit-content",
              padding: 3,
              p: { xs: "12px", sm: "24px" },
              transform: { sm: "translate(0, -44%)", xs: "translate(0, -60%)" },
            }}
            variant="outlined"
            square
          >
            <Stack alignItems="center" justifyContent="center">
              <Typography variant="body" color="gray">
                {name}
              </Typography>
            </Stack>
            <Stack spacing={2}>
              <Stack direction="row">
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{ width: "33.3%" }}
                >
                  <Typography variant="h2">{h < 10 ? "0" + h : h}</Typography>
                  <Typography variant="subtitle1">hr</Typography>
                </Stack>
                <Typography variant="h2">:</Typography>
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{ width: "33.3%" }}
                >
                  <Typography variant="h2">{m < 10 ? "0" + m : m}</Typography>
                  <Typography variant="subtitle1">min</Typography>
                </Stack>
                <Typography color="primary" variant="h2">
                  :
                </Typography>
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{ width: "33.3%" }}
                >
                  <Typography color="primary" variant="h2">
                    {s < 10 ? "0" + s : s}
                  </Typography>
                  <Typography color="primary" variant="subtitle1">
                    sec
                  </Typography>
                </Stack>
              </Stack>

              {endTime !== null && (
                <Stack justifyContent="center" alignItems="center">
                  <Typography color="Highlight" variant="h6" fontWeight="bold">
                    <Typography component="span" fontWeight="bold" color="gray">
                      End at:{" "}
                    </Typography>
                    {endTime.hrs < 10 ? "0" + endTime.hrs : endTime.hrs}:
                    {endTime.mns < 10 ? "0" + endTime.mns : endTime.mns}{" "}
                    {endTime.merediem}
                  </Typography>
                </Stack>
              )}
              <Stack alignItems="center" justifyContent="center">
                <ButtonGroup
                  disableElevation
                  size="large"
                  aria-label="Disabled elevation buttons"
                >
                  {isPaused ? (
                    <Tooltip onClick={handleStart} title="Play">
                      <Button variant="contained">
                        <PlayArrowIcon />
                      </Button>
                    </Tooltip>
                  ) : (
                    <Tooltip onClick={handlePause} title="Play">
                      <Button variant="contained">
                        <PauseIcon />
                      </Button>
                    </Tooltip>
                  )}
                  <Tooltip onClick={handleReset} title="Reset">
                    <Button variant="outlined">
                      <RestartAltIcon />
                    </Button>
                  </Tooltip>
                </ButtonGroup>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </>
  );
}
