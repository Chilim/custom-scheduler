import React from 'react';
import { Table, Thead, Tbody, Tr } from '@chakra-ui/react';
import HeaderSlot from './HeaderSlot';
import BodySlot from './BodySlot';
import { Grid } from '../utils/Grid';
import { CalendarBodyCell, CalendarHeaderCell } from '../types';

type PropsType = {
  duration?: number;
  view?: 'week' | 'day';
};

type StateType = {
  header: CalendarHeaderCell[];
  body: CalendarBodyCell[][];
};

const Scheduler = ({ duration = 30, view = 'week' }: PropsType) => {
  const [table, setGrid] = React.useState<StateType | null>(null);

  React.useEffect(() => {
    const table = new Grid(view, duration);
    const data = table.generateTable();
    // console.log("body", data.body);
    setGrid(() => data);
  }, [view, duration]);

  const renderHeader = () => {
    if (table) {
      const { header } = table;
      return header.map((cell) => {
        return <HeaderSlot key={cell.label || 'empty'}>{cell.label}</HeaderSlot>;
      });
    }
    return null;
  };

  const renderBodyCells = (line: CalendarBodyCell[]) => {
    return line.map((l, idx) => <BodySlot key={`l.payload.time-${idx}`} params={l} />);
  };

  const renderBody = () => {
    if (table) {
      const { body } = table;
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
