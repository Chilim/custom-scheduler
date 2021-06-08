import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@chakra-ui/react';
import { GridEventType } from '../types';
import GridEvent from './GridEvent';

const OuterContainer = styled(Box)`
  position: absolute;
  width: 100%;
  height: calc(100% - 40px);
  top: 40px;
  display: flex;
`;

type PropsType = {
  events: GridEventType[];
  timeSlots: string[];
};

const GridShadowColumn = ({ events, timeSlots }: PropsType) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [height, setheight] = React.useState(0);

  React.useEffect(() => {
    if (ref) {
      const columnHeight = ref.current?.clientHeight as number;
      setheight(() => columnHeight);
    }
  }, []);

  const renderEvents = () => {
    // if (events.length >= 5) {
    //   const limited = events.slice(0, 3);
    //   return limited.map((evt) => (
    //     <GridEvent key={evt.id} event={evt} columnHeight={height} timeSlots={timeSlots} />
    //   ));
    // }
    return events.map((evt) => (
      <GridEvent key={evt.id} event={evt} columnHeight={height} timeSlots={timeSlots} />
    ));
  };

  return <StyledContainer ref={ref}>{renderEvents()}</StyledContainer>;
};

export default GridShadowColumn;
