const minutesInHours = 60;

export const toTimeFormat = (time: number) => {
  if (time >= 10) return time;
  return `0${time}`;
};

export const getDateFromTime = (time: string) => {
  const stime = time.split(':').map(Number);
  const now = new Date();
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
  const cleared = dateStr.replace(/[.,]/g, '');
  const list = cleared.split(' ');
  return { day: list[0], date: list[1], month: list[2], year: list[3] };
};

export const getToday = () => new Date();

export const getFormattedDate = (date?: Date) => {
  const today = formatDate(date ?? getToday());
  return extractDateValues(today);
};

const operations = {
  0: (date: Date) => date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1),
  1: (date: Date) => date.getDate() - (date.getDay() - 1) + 1,
  2: (date: Date) => date.getDate() - (date.getDay() - 1) + 2,
  3: (date: Date) => date.getDate() - (date.getDay() - 1) + 3,
  4: (date: Date) => date.getDate() - (date.getDay() - 1) + 4,
  5: (date: Date) => date.getDate() - (date.getDay() - 1) + 5,
  6: (date: Date) => date.getDate() - (date.getDay() - 1) + 6,
} as { [key: string]: (date: Date) => number };

const getCurentDate = (date: Date, opNum: number) => {
  const newDate = operations[opNum](date);
  return new Date(date.setDate(newDate));
};

const getStartOfWeek = (currentDate: Date) => {
  const first =
    currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1);
  return new Date(currentDate.setDate(first)).toUTCString();
};

export const getWeekDates = (currentDate: Date, daysInWeek: number) => {
  const startOfWeek = getStartOfWeek(currentDate);
  const range = [...Array(daysInWeek).keys()].map(() => new Date(startOfWeek));
  const dates = range.map((date, idx) => {
    return getCurentDate(date, idx);
  });

  return dates.map(getFormattedDate);
};

export const getCurrentDate = (currentDate: Date) => {
  return getFormattedDate(currentDate);
};

export const getPreviousDate = (currentDate: Date, substr: number) => {
  const result = currentDate.getDate() - substr;
  return new Date(currentDate.setDate(result));
};

export const getNextDate = (currentDate: Date, suppl: number) => {
  const result = currentDate.getDate() + suppl;
  return new Date(currentDate.setDate(result));
};
