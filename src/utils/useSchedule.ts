import React from 'react';
import { CalendarBodyCell, CalendarHeaderCell, CalendarView } from '../types';
import * as timeUtils from './timeUtils';

const HOURS_IN_A_DAY = 24;
const MINUTES_IN_AN_HOUR = 60;
const START_TIME = '00:00';

const days = {
  mon: 'Mo',
  die: 'Di',
  mit: 'Mi',
  don: 'Do',
  fri: 'Fr',
  sam: 'Sa',
  son: 'So',
};

const actions = {
  inititialize: (date: Date) => ({ type: 'INITIALIZE', date } as const),
  setParams: (view: CalendarView, step: number) => ({ type: 'SET_PARAMS', view, step } as const),
  toggleCreateGrid: (pred: boolean) => ({ type: 'TOGGLE_CREATE_GRID', pred } as const),
  toogleLoading: (pred: boolean) => ({ type: 'TOGGLE_LOADING', pred } as const),
  createGrid: (header: CalendarHeaderCell[], body: CalendarBodyCell[][]) =>
    ({
      type: 'CREATE_GRID',
      header,
      body,
    } as const),
};

type ReturnActionPropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
type ActionsType = ReturnType<ReturnActionPropertiesType<typeof actions>>;

type InitialState = {
  shallCreateGrid: boolean;
  pivot: Date | undefined;
  view: CalendarView;
  step: number;
  rowsNumber: number;
  columnsNumber: number;
  gridHeader: CalendarHeaderCell[] | null;
  gridBody: CalendarBodyCell[][] | null;
  loading: boolean;
};

const initialState: InitialState = {
  shallCreateGrid: false,
  pivot: undefined,
  view: 'week' as CalendarView,
  step: 30,
  rowsNumber: 0,
  columnsNumber: 0,
  gridHeader: null,
  gridBody: null,
  loading: true,
};

const reducer = (state: typeof initialState = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'INITIALIZE': {
      return { ...state, pivot: action.date };
    }
    case 'SET_PARAMS': {
      const { step, view } = action;
      const rowsNumber = (MINUTES_IN_AN_HOUR / step) * HOURS_IN_A_DAY;
      const columnsNumber = view === 'week' ? 8 : 2;
      return { ...state, step, view, rowsNumber, columnsNumber };
    }
    case 'TOGGLE_CREATE_GRID': {
      return { ...state, shallCreateGrid: action.pred };
    }

    case 'TOGGLE_LOADING': {
      return { ...state, loading: action.pred };
    }

    case 'CREATE_GRID': {
      return { ...state, gridHeader: action.header, gridBody: action.body };
    }

    default:
      return state;
  }
};

const useSchedule = (view: CalendarView, step = 30) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  /** first on mount set current date */
  React.useEffect(() => {
    dispatch({ type: 'INITIALIZE', date: new Date() });
  }, []);

  /** set params */
  React.useEffect(() => {
    dispatch({ type: 'SET_PARAMS', view, step });
    dispatch({ type: 'TOGGLE_CREATE_GRID', pred: true });
  }, [view, step]);

  /** create grid */
  React.useEffect(() => {
    const generateSchudulerGrid = () => {
      const layout = generateGrid();
      const weekDays = getHeader();
      const timeSlots = getTimeSlots();
      return fillGridWithValues(layout, weekDays, timeSlots);
    };

    const getWeekHeader = () => {
      const keys = Object.keys(days);

      return keys.map((key) => ({
        label: days[key as keyof typeof days],
        accessor: key,
      }));
    };

    const getHeader = () => {
      if (state.view === 'week') {
        return getWeekHeader();
      }
      return getWeekHeader();
    };

    const getTimeSlots = () => {
      let prevTime = START_TIME;
      let timeLine = [];

      for (let i = 0; i < state.rowsNumber; i += 1) {
        if (i === 0) {
          const time = timeUtils.getDateFromHours(START_TIME);
          timeLine.push(time);
          prevTime = time;
          continue;
        }
        const time = timeUtils.addMinutes(state.step, prevTime);
        timeLine.push(time);
        prevTime = time;
      }

      return timeLine;
    };

    const generateGrid = () => {
      const grid = [];
      for (let i = 0; i < state.columnsNumber; i += 1) {
        for (let j = 0; j < state.rowsNumber; j += 1) {
          grid.push([i, j]);
        }
      }
      return grid;
    };

    const fillGridWithValues = (
      layout: number[][],
      days: CalendarHeaderCell[],
      timeSlots: string[]
    ) => {
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
    };

    if (state.shallCreateGrid) {
      const { header, body } = generateSchudulerGrid();
      dispatch({ type: 'CREATE_GRID', header, body });
      dispatch({ type: 'TOGGLE_LOADING', pred: false });
    }
  }, [state.shallCreateGrid, state.columnsNumber, state.rowsNumber, state.step, state.view]);

  const memoizedGrid = React.useMemo(
    () => ({
      header: state.gridHeader,
      body: state.gridBody,
    }),
    [state.gridHeader, state.gridBody]
  );

  return { header: memoizedGrid.header, body: memoizedGrid.body, loading: state.loading };
};

export default useSchedule;
