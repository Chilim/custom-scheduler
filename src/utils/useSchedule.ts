import React from 'react';
import { CalendarBodyCell, CalendarHeaderCell, CalendarView } from '../types';
import { CalendarService } from './CalendarService';

const HOURS_IN_A_DAY = 24;
const MINUTES_IN_AN_HOUR = 60;
const START_TIME = '00:00';

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

const useSchedule = (view: CalendarView, step = 30, date: Date) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  /** first on mount set current date */
  React.useEffect(() => {
    dispatch({ type: 'INITIALIZE', date: date });
  }, [date]);

  /** set params */
  React.useEffect(() => {
    dispatch({ type: 'SET_PARAMS', view, step });
    dispatch({ type: 'TOGGLE_CREATE_GRID', pred: true });
  }, [view, step]);

  /** create grid */
  React.useEffect(() => {
    if (state.shallCreateGrid) {
      const gridService = new CalendarService(
        state.view,
        START_TIME,
        state.rowsNumber,
        state.step,
        state.columnsNumber,
        state.pivot as Date
      );
      const { header, body } = gridService.generateTable();
      dispatch({ type: 'CREATE_GRID', header, body });
      dispatch({ type: 'TOGGLE_LOADING', pred: false });
    }
  }, [
    state.shallCreateGrid,
    state.columnsNumber,
    state.rowsNumber,
    state.step,
    state.view,
    state.pivot,
  ]);

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
