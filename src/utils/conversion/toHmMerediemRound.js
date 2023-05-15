// toHmMerediemRound
export default function toHmMerediemRound(totalMinutes) {
  let TM = totalMinutes < 1440 ? totalMinutes : totalMinutes - 1440;
  let hrs = Math.floor(TM / 60);
  let mns = Math.round(totalMinutes % 60);
  let merediem = hrs > 12 ? "PM" : "AM";
  hrs = hrs !== 0 ? hrs : 12;
  hrs = hrs > 12 ? hrs - 12 : hrs;
  hrs = hrs > 24 ? hrs - 24 : hrs;
  return { hrs, mns, merediem };
}
