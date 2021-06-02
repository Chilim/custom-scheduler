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

export const formatDate = (today: Date) => {
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as const;

  return new Intl.DateTimeFormat('de-DE', options).format(today);
};

export const extractDateValues = (dateStr: string) => {
  const cleared = dateStr.replaceAll(/[.,]/g, '');
  const list = cleared.split(' ');
  return { day: list[0], date: Number(list[1]), month: list[2], year: Number(list[3]) };
};

export const getToday = () => new Date();

export const getCurrentDate = () => {
  const today = formatDate(getToday());
  return extractDateValues(today);
};
