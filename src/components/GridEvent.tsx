import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { GridEventType } from '../types';
import EditModal from './EditModal';

type PropsType = {
  event: GridEventType;
  height: number;
  width: number;
  top: number;
  left: number;
  zIndex: number;
  updateEvent: (evt: GridEventType) => void;
  deleteEvent: (id: number) => void;
};

const GridEvent = ({
  event,
  top,
  height,
  width,
  left,
  zIndex,
  updateEvent,
  deleteEvent,
}: PropsType) => {
  const [showModal, setShowModal] = React.useState(false);
  const startTime = event.start.slice(10, 16);
  const startEnd = event.end.slice(10, 16);
  return (
    <>
      <Box
        flex={1}
        h={`${height}px`}
        w={`${width}px`}
        bg="twitter.400"
        position="absolute"
        top={`${top}px`}
        left={`${left}px`}
        zIndex={zIndex}
        onClick={() => setShowModal(!showModal)}
        pointerEvents="auto"
        borderRadius={'5px'}
        border={'1px solid #ffffff'}
      >
        <Flex flexDir={'column'} fontSize={'10px'} color="white" flexWrap={'wrap'}>
          <Box overflow={'hidden'} textOverflow={'ellipsis'} w={'100%'}>
            {event.title}
          </Box>
          <Box overflow={'hidden'} textOverflow={'ellipsis'} w={'100%'}>
            {startTime}-{startEnd}
          </Box>
        </Flex>
      </Box>
      <EditModal
        event={event}
        setShowModal={setShowModal}
        isOpen={showModal}
        updateEvent={updateEvent}
        deleteEvent={deleteEvent}
      />
    </>
  );
};

export default GridEvent;
