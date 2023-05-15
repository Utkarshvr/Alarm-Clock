// toHMwithSpecialCase
export default function toHMwithSpecialCase(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  let specialCase;
  if ((hours === 0) & (minutes <= 1)) specialCase = "less than 1 min";
  else {
    specialCase = null;
  }
  return { hours, minutes, specialCase };
}
