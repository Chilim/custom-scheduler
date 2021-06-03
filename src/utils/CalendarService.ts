import { CalendarBodyCell, CalendarHeaderCell, CalendarView } from '../types';
import * as timeUtils from './timeUtils';

export class CalendarService {
  private days = {
    mon: 'Mo',
    die: 'Di',
    mit: 'Mi',
    don: 'Do',
    fri: 'Fr',
    sam: 'Sa',
    son: 'So',
  };

  constructor(
    private view: CalendarView,
    private startTime: string,
    private rowsNum: number,
    private step: number,
    private columnsNum: number,
    private date: Date
  ) {}

  private getWeekHeader() {
    const days = this.days;
    const dates = timeUtils.getWeekDates(new Date('May 24 2021'), 7);
    console.log(dates);
    const keys = Object.keys(days);

    return keys.map((key) => ({
      label: days[key as keyof typeof days],
      accessor: key,
      date: dates.find((d) => d.day === days[key as keyof typeof days])?.date || null,
    }));
  }

  private getHeader() {
    if (this.view === 'week') {
      return this.getWeekHeader();
    }
    return this.getWeekHeader();
  }

  private getTimeSlots() {
    let prevTime = this.startTime;
    let timeLine = [];

    for (let i = 0; i < this.rowsNum; i += 1) {
      if (i === 0) {
        const time = timeUtils.getDateFromHours(this.startTime);
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
    const today = timeUtils.getFormattedDate();
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
    const header = [{ label: null, accessor: null, date: null }, ...days];

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
    return this.fillGridWithValues(layout, weekDays, timeSlots);
  }
}
