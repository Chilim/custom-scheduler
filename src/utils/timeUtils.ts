const minutesInHours = 60;

export const toTimeFormat = (time: number) => {
  if (time >= 10) return time;
  return `0${time}`;
};

export const getDateFromTime = (time: string) => {
  const stime = time.split(':').map(Number);
  let now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), stime[0], stime[1]);
};

export const getDateFromHours = (time: string) => {
  const date = getDateFromTime(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${toTimeFormat(hours)}:${toTimeFormat(minutes)}`;
};

export const addMinutes = (step: number, prevTime: string) => {
  let left = 0;
  const [prevHours, prevMinutes] = prevTime.split(':').map(Number);
  let newMinutes = 0;

  if (prevMinutes + step >= minutesInHours) {
    newMinutes = prevMinutes + step - minutesInHours;
    left += 1;
  } else {
    newMinutes = prevMinutes + step;
  }

  return `${toTimeFormat(prevHours + left)}:${toTimeFormat(newMinutes)}`;
};
