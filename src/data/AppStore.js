import React, { createContext } from "react";
import AlarmContextComponent from "../context/AlarmContext";
import RingingAlarmComponent from "../context/RingingAlarm";
import TimerContextContext from "../context/TimerContext";

export const TimerContext = createContext();
export default function AppStore({ children }) {
  return (
    <AlarmContextComponent>
      <RingingAlarmComponent>
        <TimerContextContext>{children}</TimerContextContext>
      </RingingAlarmComponent>
    </AlarmContextComponent>
  );
}
