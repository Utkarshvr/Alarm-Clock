import React, { useContext, useState } from "react";
import { TimerContext } from "../../context/TimerContext";
// Others
import { Button, Stack } from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";

// Select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TimerForm from "./TimerForm";

// Utils
import toHmMerediem from "../../utils/conversion/toHmMerediem";

const style = {
  zIndex: 10000000000000000,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 350 },
  // bgcolor: "#333",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};
export default function TimerModal({ timerId, open, setOpen, title }) {
  // Hooks
  const [time, setTime] = useState({
    hour: 0,
    minute: 5,
    seconds: 0,
  });
  const { timer, dispatchToTimer } = useContext(TimerContext);
  const [name, setName] = useState("");
  const [ringtone, setRingtone] = useState(1);

  // CurrentTime(now)
  const now = new Date();
  let currentHours = now.getHours();
  let currentMinutes = now.getMinutes();
  let TotalCurrentTimeInMinutes = currentHours * 60 + currentMinutes;

  // SelectedTime
  const { hour, minute } = time;
  const SelectedTimeInMinutes = hour * 60 + minute;

  const TimerEndTimeInMinutes =
    TotalCurrentTimeInMinutes + SelectedTimeInMinutes;
  let { h, m, merediem } = toHmMerediem(TimerEndTimeInMinutes);

  const handleChange = (event) => {
    setRingtone(event.target.value);
  };
  const handleSet = () => {
    dispatchToTimer({
      type: "ADD_TIMER",
      payload: {
        id: timer.length,
        endTime: { hr: h, mn: m, merediem },
        time,
        name,
        ringtone,
      },
    });
    setOpen(false);
  };
  const handleEdit = () => {
    dispatchToTimer({
      type: "EDIT_ALARM",
      payload: {
        id: timerId,
        endTime: { hr: h, mn: m, merediem },
        time,
        name,
        ringtone,
      },
    });
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack spacing={2} alignItems="center" justifyContent="center">
          <Stack alignItems="center" justifyContent="center">
            <Typography variant="h6" fontSize={16}>
              {title} Timer
            </Typography>
            <Typography variant="subtitle1" fontSize={14}>
              Timer will end at{" "}
              <Typography
                component="span"
                color="Highlight"
                variant="subtitle1"
                fontWeight="bold"
                fontSize={14}
              >
                {h < 10 ? "0" + h : h}:{m < 10 ? "0" + m : m} {merediem}
              </Typography>
            </Typography>
          </Stack>
          <TimerForm time={time} setTime={setTime} />
          <TextField
            fullWidth
            id="standard-basic"
            label="Timer Name"
            variant="standard"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">Ringtone</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ringtone}
              label="Ringtone"
              onChange={handleChange}
            >
              <MenuItem value={1}>Default</MenuItem>
              <MenuItem value={2}>Chimes</MenuItem>
              <MenuItem value={3}>Calm</MenuItem>
            </Select>
          </FormControl>
          <Stack sx={{ width: "100%" }}>
            <Stack
              sx={{ width: "100%" }}
              direction="row"
              justifyContent="space-around"
            >
              <Button onClick={() => setOpen(false)} variant="outlined">
                Cancel
              </Button>
              {title === "Set" ? (
                <Button variant="contained" onClick={handleSet}>
                  Done
                </Button>
              ) : (
                <Button variant="contained" onClick={handleEdit}>
                  Done
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
