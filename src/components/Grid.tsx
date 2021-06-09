import React from 'react';
import { Flex } from '@chakra-ui/react';
import GridColumn from './GridColumn';
import useSchedule from '../utils/useSchedule';
import GridCell from './GridCell';
import { GridEventType, WeekDay } from '../types';
import GridShadowColumn from './GridShadowColumn';
import { getFormattedDate } from '../utils/timeUtils';

const getCellType = (columnIdx: number, cellIdx: number) => {
  if (cellIdx === 0 && columnIdx === 0) return 'zeroCell';
  if (cellIdx === 0) return 'dayCell';
  if (columnIdx === 0) return 'timeCell';
  return 'dataCell';
};

const getOwnEvents = (allEvents: GridEventType[], columnDate: string) => {
  const parsedEvents = allEvents.map((evt) => getFormattedDate(new Date(evt.start)));
  const idxs = [] as number[];
  parsedEvents.forEach((pEvt, idx) => {
    if (pEvt.date === columnDate) {
      idxs.push(idx);
    }
  });
  const ownEvents = [] as GridEventType[];
  allEvents.forEach((evt, idx) => {
    if (idxs.includes(idx)) {
      ownEvents.push(evt);
    }
  });
  return ownEvents;
};

type PropsType = {
  duration: number;
  view: 'week' | 'day';
  date: Date;
  actions: {
    updateEvent: (evt: GridEventType) => void;
    deleteEvent: (id: number) => void;
    createEvent: (evt: Omit<GridEventType, 'id'>) => void;
  };
  events: GridEventType[];
};
const Grid = ({ duration = 30, view = 'week', date, actions, events }: PropsType) => {
  const { header, body, loading } = useSchedule(view, duration, date);

  const renderGrid = () => {
    if (header && body) {
      const data = header.map((h, idx) => {
        const headerCell = idx === 0 ? '' : `${h.label}.${h.date}`;
        return body.reduce(
          (acc, time) => {
            if (idx === 0) return [...acc, time];
            return [...acc, ''];
          },
          [headerCell] as string[],
        );
      });
      return data.map((d, colIdx) => {
        const key = `col-${colIdx}`;
        const isTimeColumn = colIdx === 0;
        const columnDate = header[colIdx].date as string;
        const columnDay = header[colIdx].label as WeekDay;
        return (
          <GridColumn key={key} isTimeColumn={isTimeColumn}>
            {d.map((label, cellIdx) => {
              const cellKey = `col-${colIdx};cell-${cellIdx}`;
              return (
                <GridCell
                  key={cellKey}
                  time={label}
                  date={columnDate}
                  day={columnDay}
                  type={getCellType(colIdx, cellIdx)}
                  createEvent={actions.createEvent}
                />
              );
            })}
            {!isTimeColumn && (
              <GridShadowColumn
                key={key}
                events={getOwnEvents(events, columnDate)}
                timeSlots={body}
              />
            )}
          </GridColumn>
        );
      });
    }
    return null;
  };

  return <Flex>{!loading && renderGrid()}</Flex>;
};

export default Grid;
