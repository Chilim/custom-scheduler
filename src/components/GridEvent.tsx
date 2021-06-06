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

const getPositionY = (
  timeSlots: string[],
  columnHeight: number,
  rowHeight: number,
  ownDate: string,
) => {
  const evtDate = new Date(ownDate);
  const { time: evtTime } = getFormattedDate(evtDate);
  const closesTimeSlot = findClosest(evtTime, timeSlots);
  const indexOfClosest = timeSlots.findIndex((s) => s === closesTimeSlot);
  const closestTopPosition = indexOfClosest * rowHeight;
  const diff = findDiff(closesTimeSlot as string, evtTime);
  return closestTopPosition + diff;
};

const GridEvent = ({ event, timeSlots, columnHeight }: PropsType) => {
  const top = getPositionY(timeSlots, columnHeight, 40, event.start);
  return (
    <Box flex={1} h="35px" bg="twitter.500" border="1px solid red" position="relative" top={top} />
  );
};

export default GridEvent;
