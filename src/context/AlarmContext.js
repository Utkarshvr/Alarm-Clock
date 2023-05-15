import React, { createContext, useEffect, useReducer } from "react";

let localAlarms = JSON.parse(localStorage.getItem("alarms"));
const initialState = localAlarms === null ? [] : localAlarms;
//   params: current state, actions(instruction to the reducer function)
const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_ALL_ALARMS":
      return [];
    case "DELETE_ALARM":
      return state.filter((e) => e.id !== action.payload.id);
    case "ADD_ALARM":
      return [...state, action.payload];
    case "EDIT_ALARM":
      return state.map((alarm) => {
        const {
          isRinging,
          ringtone,
          time,
          snooze,
          alarmName,
          id,
        } = action.payload;
        if (alarm.id === id) {
          return {
            ...alarm,
            time: time,
            ringtone: ringtone,
            snooze: snooze,
            alarmName: alarmName,
            isRinging: isRinging,
          };
        }
        return alarm;
      });
    case "TOGGLE_SWITCH":
      return state.map((alarm) => {
        const { status, id } = action.payload;
        if (alarm.id === id) {
          return {
            ...alarm,
            status: status,
          };
        }
        return alarm;
      });
    case "RETURN_ALARM":
      // It has been done in order for react to think its a new array and it will update the alarms and hence due to its change the alarmClock usEffect has been called 
      let elements = state;
      return [...elements];
    default:
      return state;
  }
};

export const AlarmContext = createContext();

export default function AlarmContextComponent({ children }) {
  const [alarm, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("alarms", JSON.stringify(alarm));
  }, [alarm]);
  return (
    <AlarmContext.Provider value={{ alarm, dispatch }}>
      {children}
    </AlarmContext.Provider>
  );
}
