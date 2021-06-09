import React from 'react';
import {
  Box,
  Button,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
} from '@chakra-ui/react';
import { GridCellType, GridEventType, WeekDay } from '../types';
import { convertToDate } from '../utils/timeUtils';

type PropsType = {
  time: string;
  day: WeekDay;
  date: string;
  type: GridCellType;
};

const GridCell = ({ time, day, date, type }: PropsType) => {
  const getCellContent = () => {
    if (type === 'timeCell') return time;
    if (type === 'dayCell') return `${day}.${date}`;
    if (type === 'zeroCell') return null;
    return null;
  };

  return (
    <Box h="40px" borderY="1px solid #efefefef">
      {getCellContent()}
    </Box>
  );
};

export default GridCell;
