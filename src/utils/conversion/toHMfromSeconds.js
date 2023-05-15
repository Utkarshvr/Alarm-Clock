// toHMfromSeconds
export default function toHMfromSeconds(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = totalSeconds % 3600;
  return { h, m };
}
