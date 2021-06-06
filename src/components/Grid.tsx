import React from 'react';
import { Flex } from '@chakra-ui/react';
import GridColumn from './GridColumn';
import useSchedule from '../utils/useSchedule';
import styles from './Grid.module.css';
import GridCell from './GridCell';
import { WeekDay } from '../types';
import GridShadowColumn from './GridShadowColumn';
import events from '../mocks/events';

type PropsType = {
  duration: number;
  view: 'week' | 'day';
  date: Date;
};

const getCellType = (columnIdx: number, cellIdx: number) => {
  if (cellIdx === 0 && columnIdx === 0) return 'zeroCell';
  if (cellIdx === 0) return 'dayCell';
  if (columnIdx === 0) return 'timeCell';
  return 'dataCell';
};

const Grid = ({ duration = 30, view = 'week', date }: PropsType) => {
  const { header, body, loading } = useSchedule(view, duration, date);

  const getOwnEvents = () => null;

  const renderGrid = () => {
    if (header && body) {
      const data = header.map((h, idx) => {
        const headerCell = idx === 0 ? '' : `${h.label}.${h.date}`;
        const column = body.reduce(
          (acc, time) => {
            if (idx === 0) return [...acc, time];
            return [...acc, ''];
          },
          [headerCell] as string[],
        );
        return column;
      });
      const columns = data.map((d, colIdx) => {
        const key = `col-${colIdx}`;
        const isTimeColumn = colIdx === 0;
        return (
          <GridColumn key={key} isTimeColumn={isTimeColumn}>
            {d.map((label, cellIdx) => {
              const cellDate = header[colIdx].date as string;
              const cellDay = header[colIdx].label as WeekDay;
              const cellKey = `col-${colIdx};cell-${cellIdx}`;
              return (
                <GridCell
                  key={cellKey}
                  time={label}
                  date={cellDate}
                  day={cellDay}
                  type={getCellType(colIdx, cellIdx)}
                />
              );
            })}
            {!isTimeColumn && <GridShadowColumn key={key} events={events} />}
          </GridColumn>
        );
      });
      return columns;
    }
    return null;
  };

  return <Flex>{renderGrid()}</Flex>;
};

export default Grid;
