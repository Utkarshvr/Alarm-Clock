import { Switch } from "@mui/material";
import React, { useContext } from "react";
import { AlarmContext } from "../../context/AlarmContext";

export default function AlarmSwitch({ status, index }) {
  const { dispatch } = useContext(AlarmContext);
  const handleSwitch = () => {
    dispatch({
      type: "TOGGLE_SWITCH",
      payload: { id: index, status: !status },
    });
  };
  return <Switch sx={{ right: 0 }} onClick={handleSwitch} checked={status} />;
}
