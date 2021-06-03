import React from 'react';
import { Table, Thead, Tbody, Tr } from '@chakra-ui/react';
import HeaderSlot from './HeaderSlot';
import BodySlot from './BodySlot';
import { CalendarBodyCell } from '../types';
import useSchedule from '../utils/useSchedule';

type PropsType = {
  duration?: number;
  view?: 'week' | 'day';
};

const Scheduler = ({ duration = 30, view = 'week' }: PropsType) => {
  const { header, body, loading } = useSchedule(view, duration);

  const renderHeader = () => {
    if (!loading && header) {
      return header.map((cell) => {
        return (
          <HeaderSlot key={cell.label || 'empty'}>
            {cell.label && `${cell.label}. ${cell.date}`}
          </HeaderSlot>
        );
      });
    }
    return null;
  };

  const renderBody = () => {
    const renderBodyCells = (line: CalendarBodyCell[]) => {
      return line.map((l, idx) => <BodySlot key={`l.payload.time-${idx}`} params={l} />);
    };

    if (!loading && body) {
      const rows = body.map((line, idx) => {
        return <Tr key={idx}>{renderBodyCells(line)}</Tr>;
      });
      return rows;
    }
    return null;
  };

  return (
    <Table size='sm'>
      <Thead>
        <Tr>{renderHeader()}</Tr>
      </Thead>
      <Tbody>{renderBody()}</Tbody>
    </Table>
  );
};

export default Scheduler;
