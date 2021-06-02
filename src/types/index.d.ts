export type CalendarView = 'day' | 'week';

export type WeekDay = 'Mo' | 'Di' | 'Mi' | 'Do' | 'Fr' | 'Sa' | 'So';

export type CalendarHeaderCell = {
  label: string | null;
  accessor: string | null;
};

export type CalendarBodyCellType = 'timeCell' | 'dataCell';

export type CalendarBodyCell = {
  type: CalendarBodyCellType;
  payload: {
    time: string;
    day: string | null;
  };
};
