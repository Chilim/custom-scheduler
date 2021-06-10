import React from 'react';
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
  return (
    <Box position="relative" w={isTimeColumn ? '100px' : '200px'} borderRight="1px solid black">
      {children}
    </Box>
  );
};

export default GridColumn;
