export function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":");

  const hoursToMinutes = Number(hours) * 60;

  if (hoursToMinutes === 0) {
    return 0;
  }

  return hoursToMinutes + Number(minutes);
}

export function minutesToTime(minutes: number) {
  const hours = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const min = (minutes % 60).toString().padStart(2, "0");

  return `${hours}:${min}`;
}
