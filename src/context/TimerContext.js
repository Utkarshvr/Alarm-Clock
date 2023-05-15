import React, { createContext, useEffect, useReducer } from "react";
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TIMER":
      return [...state, action.payload];
    case "EDIT_ALARM":
      return state.map((timer) => {
        const { ringtone, time, name, id, endTime } = action.payload;
        if (timer.id === id) {
          return {
            ...timer,
            time: time,
            ringtone: ringtone,
            name: name,
            endTime: endTime,
          };
        }
        return timer;
      });

    case "DELETE_TIMER":
      return state.filter((e) => e.id !== action.payload.id);
    default:
      return state;
  }
};
const initialState =
  JSON.parse(localStorage.getItem("timers")) === null
    ? []
    : JSON.parse(localStorage.getItem("timers"));

export const TimerContext = createContext();

export default function TimerContextContext({ children }) {
  const [timer, dispatchToTimer] = useReducer(reducer, initialState);
  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(timer));
  }, [timer]);
  return (
    <TimerContext.Provider value={{ timer, dispatchToTimer }}>
      {children}
    </TimerContext.Provider>
  );
}
