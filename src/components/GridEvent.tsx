import { Box } from '@chakra-ui/react';
import React from 'react';
import { GridEventType } from '../types';
import { getFormattedDate, getMinutesfromStringTime } from '../utils/timeUtils';

type PropsType = {
  event: GridEventType;
  timeSlots: string[];
  columnHeight: number;
};

const findClosest = (evtStart: string, timeSlots: string[]) => {
  const [evtHours] = evtStart.split(':');
  const result = timeSlots.find((tSlot) => {
    const [timeSlotHours] = tSlot.split(':');
    return evtHours === timeSlotHours;
  });
  return result;
};

const findDiff = (slotTime: string, evtTime: string) => {
  const slotTimeInMinutes = getMinutesfromStringTime(slotTime);
  const evtTimeInMinutes = getMinutesfromStringTime(evtTime);
  return evtTimeInMinutes - slotTimeInMinutes;
};

const getEventDuration = (startTime: string, endTime: string) => {
  const startTimeInMinutes = getMinutesfromStringTime(startTime);
  const endTimeInMinutes = getMinutesfromStringTime(endTime);
  return endTimeInMinutes - startTimeInMinutes;
};

const getPositionY = (timeSlots: string[], rowHeight: number, event: GridEventType) => {
  const { start, end } = event;
  const evtStart = new Date(start);
  const evtEnd = new Date(end);
  const { time: evtStartTime } = getFormattedDate(evtStart);
  const { time: evtEndTime } = getFormattedDate(evtEnd);
  const closesTimeSlot = findClosest(evtStartTime, timeSlots);
  const indexOfClosest = timeSlots.findIndex((s) => s === closesTimeSlot);
  const closestTopPosition = indexOfClosest * rowHeight;
  const diff = findDiff(closesTimeSlot as string, evtStartTime);
  const ratio = rowHeight / 30; // where 30 is a duration of slot
  const eventDuration = getEventDuration(evtStartTime, evtEndTime);
  return { top: closestTopPosition + diff * ratio, height: eventDuration * ratio };
};
};

const GridEvent = ({ event, timeSlots, columnHeight }: PropsType) => {
  const top = getPositionY(timeSlots, columnHeight, 40, event.start);
  return (
    <Box flex={1} h="35px" bg="twitter.500" border="1px solid red" position="relative" top={top} />
  );
};

export default GridEvent;
