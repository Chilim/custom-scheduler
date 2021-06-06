export type CalendarView = 'day' | 'week';

export type WeekDay = 'Mo' | 'Di' | 'Mi' | 'Do' | 'Fr' | 'Sa' | 'So';

export type CalendarHeaderCell = {
  label: string | null;
  accessor: string | null;
  date: string | null;
};

export type GridCellType = 'timeCell' | 'dataCell' | 'dayCell' | 'zeroCell';

export type CalendarBodyCell = {
  type: CalendarBodyCellType;
  payload: {
    time: string;
    day: string | null;
  };
};

export type GridCell = {
  label: string;
};

export type GridEventType = {
  id: number;
  start: string;
  end: string;
  comment: string;
  title: string;
};
