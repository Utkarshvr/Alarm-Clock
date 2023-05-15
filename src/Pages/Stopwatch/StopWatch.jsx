import React from "react";
import {
  Button,
  ButtonGroup,
  Tooltip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PauseIcon from "@mui/icons-material/Pause";
import useInterval from "../../hooks/useInterval";

export default function StopWatch() {
  // Calculation
  const [totalCentiSeconds, setTotalCentiSeconds] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(true);
  let hours = Math.floor(totalCentiSeconds / 360000);
  let minutes = Math.floor((totalCentiSeconds % 360000) / 6000);
  let seconds = Math.floor((totalCentiSeconds % 6000) / 100);
  let centiSeconds = totalCentiSeconds % 100;
  // console.log(`${hours} : ${minutes} : ${seconds} : ${centiSeconds}`);

  // Ultra Logic
  useInterval(() => {
    if (isActive === true && isPaused === false) {
      setTotalCentiSeconds((t) => t + 1);
    }
  }, 10);
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };
  const handlePause = () => {
    setIsActive(false);
    setIsPaused(true);
  };

  const handleReset = () => {
    setTotalCentiSeconds(0);
    setIsActive(false);
    setIsPaused(true);
  };
  return (
    <>
      <Stack sx={{ height: "100vh", maxHeight: "100vh" }}>
        <Typography px={2} py={3} variant="h6" fontSize={32}>
          Stop Watch
        </Typography>
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
            <Stack spacing={2}>
              <Stack direction="row">
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{ width: "25%" }}
                >
                  <Typography variant="h2">
                    {hours < 10 ? "0" + hours : hours}
                  </Typography>
                  <Typography variant="subtitle1">hr</Typography>
                </Stack>
                <Typography variant="h2">:</Typography>
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{ width: "25%" }}
                >
                  <Typography variant="h2">
                    {minutes < 10 ? "0" + minutes : minutes}
                  </Typography>
                  <Typography variant="subtitle1">min</Typography>
                </Stack>
                <Typography variant="h2">:</Typography>
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{ width: "25%" }}
                >
                  <Typography variant="h2">
                    {seconds < 10 ? "0" + seconds : seconds}
                  </Typography>
                  <Typography variant="subtitle1">sec</Typography>
                </Stack>
                <Typography color="primary" variant="h2">
                  :
                </Typography>
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{ width: "25%" }}
                >
                  <Typography color="primary" variant="h2">
                    {centiSeconds < 10 ? "0" + centiSeconds : centiSeconds}
                  </Typography>
                  <Typography color="primary" variant="subtitle1">
                    cs
                  </Typography>
                </Stack>
              </Stack>
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
