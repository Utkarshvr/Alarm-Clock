import React from "react";
import { Stack, Typography } from "@mui/material";
import AlarmMenu from "./AlarmMenu";
import { RingingAlarm } from "../../../context/RingingAlarm";

// Utils
import toHMwithSpecialCase from "../../../utils/conversion/toHMwithSpecialCase";

export default function AlarmNav({ showSwitchIcon, setShowSwitchIcon }) {
  const { ringingAlarm } = React.useContext(RingingAlarm);
  const [leftTime, setLeftTime] = React.useState(null);
  let totalMilliSeconds;
  let totalMinutes;

  React.useEffect(() => {
    if (ringingAlarm.leftTime.length !== 0) {
      totalMilliSeconds = Math.min.apply(0, ringingAlarm.leftTime);
      totalMinutes = totalMilliSeconds / 60000;
      setLeftTime(toHMwithSpecialCase(totalMinutes));

      // Setting interval for each minute
      const interval = setInterval(() => {
        totalMilliSeconds = totalMilliSeconds - 60000;
        totalMinutes = totalMilliSeconds / 60000;
        setLeftTime(toHMwithSpecialCase(totalMinutes));
      }, 60000);
      return () => {
        clearInterval(interval);
      };
    }
    setLeftTime(null);
  }, [ringingAlarm]);

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
          Alarm
        </Typography>

        {leftTime !== null && (
          <Typography variant="subtitle1" fontSize={12}>
            Ring in{" "}
            <Typography
              component="span"
              color="Highlight"
              variant="subtitle1"
              fontWeight="bold"
              fontSize={12}
            >
              {leftTime.hours !== 0 && leftTime.hours + "h"}{" "}
              {leftTime.minutes > 1 && Math.trunc(leftTime.minutes) + "min"}{" "}
              {leftTime.specialCase !== null && leftTime.specialCase}
            </Typography>
          </Typography>
        )}
      </Stack>
      <AlarmMenu
        showSwitchIcon={showSwitchIcon}
        setShowSwitchIcon={setShowSwitchIcon}
      />
    </Stack>
  );
}
