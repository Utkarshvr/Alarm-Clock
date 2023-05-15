import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { Tooltip } from "@mui/material";
import TimerModal from "../Pages/Timer/TimerModal";

export default function FabTimer({ size }) {
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
      <TimerModal title="Set" open={open} setOpen={setOpen} />
    </>
  );
}
