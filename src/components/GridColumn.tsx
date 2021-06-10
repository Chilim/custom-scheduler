import React, { CSSProperties } from 'react';
import { Box } from '@chakra-ui/react';

type PropsType = {
  children: React.ReactNode;
  isTimeColumn: boolean;
};

const getColumnStyle = (isTimeColumn: boolean) => {
  if (isTimeColumn) return { position: 'relative', width: '100px' };
  return {
    position: 'relative',
    flex: 1,
  };
};

const GridColumn = ({ children, isTimeColumn }: PropsType) => {
  return <Box style={getColumnStyle(isTimeColumn) as CSSProperties}>{children}</Box>;
};

export default GridColumn;
