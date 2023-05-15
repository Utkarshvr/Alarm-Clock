// toHmMerediem
export default function toHmMerediem(totalMinutes) {
  let TM = totalMinutes < 1440 ? totalMinutes : totalMinutes - 1440;
  let h = Math.floor(TM / 60);
  let m = totalMinutes % 60;
  let merediem = totalMinutes > 720 ? "PM" : "AM";
  h = h !== 0 ? h : 12;
  h = h > 12 ? h - 12 : h;
  return { h, m, merediem };
}
