import { CalendarView, CalendarBodyCell, CalendarHeaderCell, WeekDay } from '../types';
import * as timeUtils from './timeUtils';

const HOURS_IN_A_DAY = 24;
const MINUTES_IN_AN_HOUR = 60;
const START_TIME = '00:00';

export class Grid {
  private columnsNum: number;
  private rowsNum: number;
  private view: CalendarView;
  private days = {
    mon: 'Mo',
    die: 'Di',
    mit: 'Mi',
    don: 'Do',
    fri: 'Fr',
    sam: 'Sa',
    son: 'So',
  };
  today: WeekDay;

  private step: number;

  constructor(view: CalendarView, step = 30) {
    this.columnsNum = view === 'week' ? 8 : 2;
    this.rowsNum = (MINUTES_IN_AN_HOUR / step) * HOURS_IN_A_DAY;
    this.view = view;
    this.step = step;
    this.today = this.getToday().day as WeekDay;
  }

  private getWeekHeader() {
    const days = this.days;
    const keys = Object.keys(days);

    return keys.map((key) => ({
      label: days[key as keyof typeof days],
      accessor: key,
    }));
  }

  private getHeader() {
    if (this.view === 'week') {
      return this.getWeekHeader();
    }
    return this.getWeekHeader();
  }

  private getTimeSlots() {
    let prevTime = START_TIME;
    let timeLine = [];

    for (let i = 0; i < this.rowsNum; i += 1) {
      if (i === 0) {
        const time = timeUtils.getDateFromHours(START_TIME);
        timeLine.push(time);
        prevTime = time;
        continue;
      }
      const time = timeUtils.addMinutes(this.step, prevTime);
      timeLine.push(time);
      prevTime = time;
    }

    return timeLine;
  }

  private getToday() {
    const today = timeUtils.getCurrentDate();
    return today;
  }

  private generateGrid() {
    const grid = [];
    for (let i = 0; i < this.columnsNum; i += 1) {
      for (let j = 0; j < this.rowsNum; j += 1) {
        grid.push([i, j]);
      }
    }
    return grid;
  }

  private fillGridWithValues(layout: number[][], days: CalendarHeaderCell[], timeSlots: string[]) {
    const header = [{ label: null, accessor: null }, ...days];

    const mappedBody = layout.reduce((acc, coord, idx) => {
      const [column, row] = coord;

      if (row === 0) return acc;

      let cell;

      if (column === 0 && row > 0) {
        cell = {
          type: 'timeCell' as const,
          payload: { time: timeSlots[idx - 1], day: null },
        };
      } else {
        cell = {
          type: 'dataCell' as const,
          payload: { time: timeSlots[row - 1], day: days[column - 1].label },
        };
      }

      return { ...acc, [row]: acc[row] ? [...acc[row], cell] : [cell] };
    }, {} as { [key: string]: CalendarBodyCell[] });

    const body = [];

    for (let [_, value] of Object.entries(mappedBody)) {
      body.push(value);
    }

    return { header, body };
  }

  generateTable() {
    const layout = this.generateGrid();
    const weekDays = this.getHeader();
    const timeSlots = this.getTimeSlots();
    this.getToday();
    return this.fillGridWithValues(layout, weekDays, timeSlots);
  }
}
