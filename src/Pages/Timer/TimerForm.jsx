import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

const TimerForm = ({ time, setTime }, ref) => {
  const handleHourChange = (e) => {
    var value = parseInt(e.target.value);

    if (value > 24) value = 24;
    if (value < 0) value = 0;

    setTime((prev) => {
      return { ...prev, hour: value };
    });
  };
  const handleMinuteChange = (e) => {
    var value = parseInt(e.target.value);

    if (value > 59) value = 59;
    if (value < 0) value = 0;

    setTime((prev) => {
      return { ...prev, minute: value };
    });
  };
  const handleSecondsChange = (e) => {
    var value = parseInt(e.target.value);

    if (value > 59) value = 59;
    if (value < 1) {
      if (time.hour === 0 && time.minute === 0) {
        value = 1;
      } else {
        value = 0;
      }
    }

    setTime((prev) => {
      return { ...prev, seconds: value };
    });
  };

  return (
    <FormControl
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "1em",
      }}
      size="small"
      fullWidth
    >
      <TextField
        value={time.hour}
        onChange={handleHourChange}
        sx={{ width: "33.3%" }}
        id="filled-number"
        label="Hour"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
      />
      <TextField
        value={time.minute}
        onChange={handleMinuteChange}
        sx={{ width: "33.3%" }}
        id="filled-number"
        label="Minute"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
      />
      <TextField
        value={time.seconds}
        onChange={handleSecondsChange}
        sx={{ width: "33.3%" }}
        id="filled-number"
        label="Seconds"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
      />
    </FormControl>
  );
};

export default TimerForm;
