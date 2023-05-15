import React, { createContext, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "RINGING":
      return { ...state, isRinging: true, alarm: action.payload };
    case "STOP_ALARM":
      return { isRinging: false, alarm: {}, timeOutIds: [], leftTime: [] };
    case "SET_TIME_OUT_IDS":
      return {
        ...state,
        timeOutIds: [...state.timeOutIds, action.payload.timeOutId],
        leftTime: [...state.leftTime, action.payload.leftTime],
      };
    case "CLEAR_TIME_OUT_IDS":
      state.timeOutIds.map((id) => {
        clearTimeout(id);
        return null;
      });
      return {
        ...state,
        timeOutIds: [],
        leftTime: [],
      };
    default:
      return state;
  }
};
const initialState = {
  isRinging: false,
  alarm: {},
  timeOutIds: [],
  leftTime: [],
};

export const RingingAlarm = createContext();
export default function RingingAlarmComponent({ children }) {
  const [ringingAlarm, dispatchRingingAlarm] = useReducer(
    reducer,
    initialState
  );
  return (
    <RingingAlarm.Provider value={{ ringingAlarm, dispatchRingingAlarm }}>
      {children}
    </RingingAlarm.Provider>
  );
}
