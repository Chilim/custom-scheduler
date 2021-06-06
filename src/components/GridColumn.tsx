import React from 'react';
import { Box } from '@chakra-ui/react';

type PropsType = {
  children: React.ReactNode;
  isTimeColumn: boolean;
};

const GridColumn = ({ children, isTimeColumn }: PropsType) => {
  return (
    <Box position="relative" w={isTimeColumn ? '100px' : '200px'} borderRight="1px solid black">
      {children}
    </Box>
  );
};

export default GridColumn;
