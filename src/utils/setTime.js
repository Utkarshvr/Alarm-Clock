import DefaultRingtone from "../assets/audio/DefaultRingtone.mp3";
import chimes from "../assets/audio/chimes.mp3";
import calm from "../assets/audio/calm.mp3";

export function setTime(alarm, timeObj, ringtone, dispatchRingingAlarm) {
  // Current time
  const time = new Date();
  let currentHours = time.getHours();
  let currentMinutes = time.getMinutes();
  let currentSeconds = time.getSeconds();
  let currentMeridiem = currentHours >= 12 ? "PM" : "AM";
  currentHours = currentHours > 12 ? currentHours - 12 : currentHours;
  let currentTimeInMin =
    currentHours * 60 + currentMinutes + currentSeconds / 60;
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
  let leftTimeinMilliSeconds = leftTimeInMin * 60000;

  // Logs

  // Setting Alarm
  setAlarm(alarm, ringtone, dispatchRingingAlarm, leftTimeinMilliSeconds);
}

function setAlarm(
  alarm,
  ringtone,
  dispatchRingingAlarm,
  leftTimeinMilliSeconds
) {
  let selectedRingtone;
  if (ringtone === 1) {
    selectedRingtone = DefaultRingtone;
  } else if (ringtone === 2) {
    selectedRingtone = chimes;
  } else if (ringtone === 3) {
    selectedRingtone = calm;
  }
  let timeOutId = setTimeout(() => {
    let audio = new Audio(selectedRingtone);
    audio.loop = true;
    audio.play();
    dispatchRingingAlarm({
      type: "RINGING",
      payload: {
        ...alarm,
        timeOutId: timeOutId,
        audio: audio,
        ringtone: ringtone,
      },
    });
  }, leftTimeinMilliSeconds);
  dispatchRingingAlarm({
    type: "SET_TIME_OUT_IDS",
    payload: { timeOutId: timeOutId, leftTime: leftTimeinMilliSeconds },
  });
}
