import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@chakra-ui/react';
import { GridEventType } from '../types';
import GridEvent from './GridEvent';
import { getFormattedDate, getMinutesfromStringTime } from '../utils/timeUtils';
import ColumnTooltips from './ColumnTooltips';

const OuterContainer = styled(Box)`
  position: absolute;
  width: 100%;
  height: calc(100% - 40px);
  top: 40px;
`;

const InnerContainer = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
`;

const findClosest = (evtStart: string, timeSlots: string[]) => {
  const [evtHours] = evtStart.split(':');
  return timeSlots.find((tSlot) => {
    const [timeSlotHours] = tSlot.split(':');
    return evtHours === timeSlotHours;
  });
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

type PropsType = {
  events: GridEventType[];
  timeSlots: string[];
  rowHeight?: number;
  slotDuration?: number;
};

const GridShadowColumn = ({ events, timeSlots, rowHeight = 40, slotDuration = 30 }: PropsType) => {
  const limitPerRow = 3;
  const ref = React.useRef<HTMLDivElement>(null);
  const mappedEvents = events.length
    ? events.reduce((acc, evt) => {
        const startTime = evt.start;
        return !acc.has(startTime)
          ? acc.set(startTime, [evt])
          : acc.set(startTime, acc.get(startTime).concat(evt));
      }, new Map())
    : new Map();
  const [colWidth, setColWidth] = React.useState(0);

  React.useEffect(() => {
    if (ref) {
      const columnWidth = ref.current?.clientWidth as number;
      setColWidth(columnWidth);
    }
  }, []);

  const getPositionY = (event: GridEventType) => {
    const { start, end } = event;
    const evtStart = new Date(start);
    const evtEnd = new Date(end);
    const { time: evtStartTime } = getFormattedDate(evtStart);
    const { time: evtEndTime } = getFormattedDate(evtEnd);
    const closesTimeSlot = findClosest(evtStartTime, timeSlots);
    const indexOfClosest = timeSlots.findIndex((s) => s === closesTimeSlot);
    const closestTopPosition = indexOfClosest * rowHeight;
    const diff = findDiff(closesTimeSlot as string, evtStartTime);
    const ratio = rowHeight / slotDuration;
    const eventDuration = getEventDuration(evtStartTime, evtEndTime);
    return { evtPosTop: closestTopPosition + diff * ratio, evtHeight: eventDuration * ratio };
  };

  const getDivider = (neighborsNum: number) =>
    neighborsNum > limitPerRow ? limitPerRow : neighborsNum;

  const getEvtWidth = (evt: GridEventType) => {
    const { start } = evt;
    const neighbors = mappedEvents.get(start) as GridEventType[];
    return colWidth / getDivider(neighbors.length);
  };

  const getEvtPosLeft = (evt: GridEventType) => {
    const { start, id } = evt;
    const neighbors = mappedEvents.get(start) as GridEventType[];
    const ownIndex = neighbors.findIndex((nEvt) => nEvt.id === id);
    return (colWidth / getDivider(neighbors.length)) * ownIndex;
  };

  const getZIndex = (evt: GridEventType) => {
    const { start } = evt;
    const keys = [...mappedEvents.keys()];
    const ownIndex = keys.findIndex((k) => k === start);
    return ownIndex + 1;
  };

  const isEvtOverlapped = (evt: GridEventType) => {
    let isOverlapped = false;
    const keys = mappedEvents.keys();
    for (const key of keys) {
      const eventsOfKey = mappedEvents.get(key) as GridEventType[];
      if (eventsOfKey.length > limitPerRow) {
        const ownIdx = eventsOfKey.findIndex((kEvt) => kEvt.id === evt.id);
        isOverlapped = ownIdx >= limitPerRow;
      }
    }
    return isOverlapped;
  };

  const renderEvents = () => {
    return events.map((evt) => {
      if (isEvtOverlapped(evt)) {
        return null;
      }
      const { evtPosTop, evtHeight } = getPositionY(evt);
      const evtWidth = getEvtWidth(evt);
      const evtPosLeft = getEvtPosLeft(evt);
      const zIndex = getZIndex(evt);
      return (
        <GridEvent
          key={evt.id}
          event={evt}
          top={evtPosTop}
          height={evtHeight}
          width={evtWidth}
          left={evtPosLeft}
          zIndex={zIndex}
        />
      );
    });
  };

  const getOverlappedEvents = () => {
    const overlappedEvents = [] as { top: number; events: GridEventType[] }[];
    const keys = mappedEvents.keys();
    for (const key of keys) {
      const eventsOfKey = mappedEvents.get(key);
      if (eventsOfKey.length > limitPerRow) {
        const { evtPosTop } = getPositionY(eventsOfKey[0]);
        overlappedEvents.push({ top: evtPosTop, events: eventsOfKey });
      }
    }
    return overlappedEvents;
  };

  return (
    <OuterContainer ref={ref}>
      <InnerContainer>{renderEvents()}</InnerContainer>
      <ColumnTooltips overlappedEvents={getOverlappedEvents()} />
    </OuterContainer>
  );
};

export default GridShadowColumn;
