import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AlarmModal from "../Pages/Clock/AlarmModal";
import React, { useState } from "react";
import { Tooltip } from "@mui/material";

export default function FabAlarm({ size }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tooltip
        onClick={() => {
          setOpen(true);
        }}
        title="Add"
      >
        <Fab
          size={size === null ? "medium" : size}
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <AlarmModal title="Add" open={open} setOpen={setOpen} />
    </>
  );
}
