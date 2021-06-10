import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Box, Flex } from '@chakra-ui/react';
import { GridCellType, GridEventType, WeekDay } from '../types';
import CreateModal from './CreateModal';

const centerXY = css`
  display: grid;
  justify-content: center;
  align-items: center;
`;

const HeaderCell = styled.div`
  ${centerXY};
  height: 70px;
  font-size: 20px;
  color: #282c34;
`;

const TimeSlotCell = styled.div`
  ${centerXY};
  height: 40px;
  font-size: 12px;
  color: #282c34;
`;

const ZeroSlotCell = styled.div`
  height: 70px;
`;

const DataSlotCell = styled.div`
  width: 100%;
  height: 40px;
  pointer-events: auto;
  border-right: #d3d3d3 1px solid;
  border-bottom: #d3d3d3 1px solid;
`;

type PropsType = {
  time: string;
  day: WeekDay;
  date: string;
  type: GridCellType;
  rowHeight?: number;
  cellIdx: number;
  createEvent: (evt: Omit<GridEventType, 'id'>) => void;
};

const GridCell = ({ time, day, date, type, createEvent, rowHeight = 40, cellIdx }: PropsType) => {
  const [showModal, setShowModal] = React.useState(false);
  const getCellContent = () => {
    if (type === 'timeCell') return time;
    if (type === 'dayCell') return `${day}. ${date}`;
    if (type === 'dataCell') {
      return (
        <Flex
          w="100%"
          height="100%"
          onClick={() => {
            console.log('clocked');
            setShowModal(true);
          }}
        />
      );
    }

    return null;
  };

  const CellComponent =
    type === 'dayCell'
      ? HeaderCell
      : type === 'timeCell'
      ? TimeSlotCell
      : type === 'dataCell'
      ? DataSlotCell
      : ZeroSlotCell;

  return (
    <Box h="40px" borderY="1px solid #efefefef">
      {getCellContent()}
    </Box>
  );
};

export default GridCell;
