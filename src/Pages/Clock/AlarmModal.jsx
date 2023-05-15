import React, { useContext, useEffect, useState } from "react";
import { AlarmContext } from "../../context/AlarmContext";

// Others
import { Button, Stack, Switch } from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

// Select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Utils
import toHM from "../../utils/conversion/toHM";

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

function calcLeftTime(timeObj) {
  const time = new Date();
  let currentHours = time.getHours();
  let currentMinutes = time.getMinutes();
  let currentMeridiem = currentHours >= 12 ? "PM" : "AM";
  currentHours = currentHours > 12 ? currentHours - 12 : currentHours;
  let currentTimeInMin = currentHours * 60 + currentMinutes;
  // Input Time
  let { hour, minute, meridiem } = timeObj;
  let inputTimeInMin = hour * 60 + minute;

  let leftTimeInMin = inputTimeInMin - currentTimeInMin;
  // Calculating the time left for ringing alarm on the basis of merediem of input and curretn time
  if (meridiem.toLowerCase() === currentMeridiem.toLowerCase()) {
    if (leftTimeInMin <= 0) {
      leftTimeInMin = leftTimeInMin + 24 * 60;
    }
  }
  if (meridiem.toLowerCase() !== currentMeridiem.toLowerCase()) {
    leftTimeInMin = leftTimeInMin + 12 * 60;
  }
  return toHM(leftTimeInMin);
}

export default function AlarmModal({ open, setOpen, title, alarmID }) {
  const { alarm, dispatch } = useContext(AlarmContext);

  const [checked, setChecked] = useState(true);
  const [time, setTime] = useState(dayjs());
  time.format();
  const [name, setName] = useState("");
  const [ringtone, setRingtone] = useState(1);
  const [leftTime, setLeftTime] = useState(
    calcLeftTime({
      hour: time.hour() > 12 ? time.hour() - 12 : time.hour(),
      minute: time.minute(),
      meridiem: time.hour() >= 12 ? "PM" : "AM",
    })
  );
  useEffect(() => {
    setTime(dayjs());
  }, [open]);

  useEffect(() => {
    const ringingTime = calcLeftTime({
      hour: time.hour() > 12 ? time.hour() - 12 : time.hour(),
      minute: time.minute(),
      meridiem: time.hour() >= 12 ? "PM" : "AM",
    });
    setLeftTime(ringingTime);
  }, [time]);

  const handleOnChange = (newTime) => {
    setTime(newTime);
  };

  const handleChange = (event) => {
    setRingtone(event.target.value);
  };
  const handleAdd = () => {
    // dispatchRingingAlarm({ type: "CLEAR_TIME_OUT_IDS" });
    dispatch({
      type: "ADD_ALARM",
      payload: {
        id: alarm.length + 1,
        time: {
          hour: time.hour() > 12 ? time.hour() - 12 : time.hour(),
          minute: time.minute(),
          meridiem: time.hour() >= 12 ? "PM" : "AM",
        },
        ringtone: ringtone,
        snooze: checked,
        alarmName: name,
        status: true,
      },
    });
    setOpen(false);
  };
  const handleEdit = () => {
    dispatch({
      type: "EDIT_ALARM",
      payload: {
        id: alarmID,
        time: {
          hour: time.hour() > 12 ? time.hour() - 12 : time.hour(),
          minute: time.minute(),
          meridiem: time.hour() >= 12 ? "PM" : "AM",
        },
        ringtone: ringtone,
        snooze: checked,
        alarmName: name,
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
              {title} Alarm
            </Typography>
            <Typography variant="subtitle1" fontSize={14}>
              Alarm will ring in{" "}
              <Typography
                component="span"
                color="Highlight"
                variant="subtitle1"
                fontWeight="bold"
                fontSize={14}
              >
                {leftTime.hours !== 0 && leftTime.hours}{" "}
                {leftTime.hours !== 0 && "h "}
                {leftTime.minutes !== 0 && leftTime.minutes}{" "}
                {leftTime.minutes !== 0 && "min "}
              </Typography>
            </Typography>
          </Stack>
          <TimePicker
            label="Time"
            value={time}
            onChange={handleOnChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <TextField
            fullWidth
            id="standard-basic"
            label="Alarm Name"
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
          <Button
            sx={{ justifyContent: "space-between", textTransform: "none" }}
            onClick={() => setChecked((prev) => !prev)}
            fullWidth
          >
            <Typography sx={{ color: "text.secondary" }} variant="subtitle1">
              Snooze
            </Typography>
            <Switch checked={checked} />
          </Button>
          <Stack sx={{ width: "100%" }}>
            <Stack
              sx={{ width: "100%" }}
              direction="row"
              justifyContent="space-around"
            >
              <Button onClick={() => setOpen(false)} variant="outlined">
                Cancel
              </Button>
              {title === "Add" ? (
                <Button variant="contained" onClick={handleAdd}>
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
