import { Box } from '@chakra-ui/react';
import React from 'react';
import { GridEventType } from '../types';

type PropsType = {
  event: GridEventType;
  height: number;
  width: number;
  top: number;
  left: number;
  zIndex: number;
};

const GridEvent = ({ event, top, height, width, left, zIndex }: PropsType) => {
  return (
    <Box
      flex={1}
      h={`${height}px`}
      w={`${width}px`}
      bg="twitter.500"
      border="1px solid red"
      position="absolute"
      top={top}
      left={left}
      zIndex={zIndex}
    >
      {event.id}
    </Box>
  );
};

export default GridEvent;
