import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@chakra-ui/react';
import { GridEventType } from '../types';

const StyledContainer = styled(Box)`
  position: absolute;
  width: 100%;
  height: calc(100% - 40px);
  top: 40px;
`;

type PropsType = {
  events: GridEventType[];
};

const GridShadowColumn = ({ events }: PropsType) => {
  const ref = React.useRef<HTMLDivElement>(null);

  return <StyledContainer ref={ref}>Salam</StyledContainer>;
};

export default GridShadowColumn;
