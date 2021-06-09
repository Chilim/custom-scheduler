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
  createEvent: (evt: Omit<GridEventType, 'id'>) => void;
};

const GridCell = ({ time, day, date, type, createEvent }: PropsType) => {
  const [newEventData, setNewEventData] = React.useState({} as Omit<GridEventType, 'id'>);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    setNewEventData({ ...newEventData, [fieldName]: e.target.value });
  };

  const onCreateEvent = (close: () => void) => {
    const newEvent = {
      start: convertToDate(newEventData.start, date),
      end: convertToDate(newEventData.end, date),
      title: newEventData.title,
      comment: newEventData.comment,
    };
    createEvent(newEvent);
    close();
  };

  const getCellContent = () => {
    if (type === 'timeCell') return time;
    if (type === 'dayCell') return `${day}.${date}`;
    if (type === 'dataCell') {
      return (
        <Popover>
          {({ onClose }) => (
            <>
              <PopoverTrigger>
                <Box w={'100%'} h={'100%'} />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Create event</PopoverHeader>
                <PopoverBody>
                  <Stack spacing={3}>
                    <Input
                      placeholder="start"
                      size="xs"
                      value={newEventData.start}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'start')}
                    />
                    <Input
                      placeholder="end"
                      size="xs"
                      value={newEventData.end}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'end')}
                    />
                    <Input
                      placeholder="title"
                      size="xs"
                      value={newEventData.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'title')}
                    />
                    <Input
                      placeholder="comment"
                      size="xs"
                      value={newEventData.comment}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'comment')}
                    />
                    <Button onClick={() => onCreateEvent(onClose)}>Submit</Button>
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </>
          )}
        </Popover>
      );
    }
    return null;
  };

  return (
    <Box h="40px" borderY="1px solid #efefefef">
      {getCellContent()}
    </Box>
  );
};

export default GridCell;
