import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { formatDate, getFormattedDate } from '../../utils/timeUtils';

const ToolbarDate = ({ date }: { date: Date }) => {
  const { date: numberDate, year, month } = getFormattedDate(date);
  return (
    <Box>
      <Text fontSize={'20px'} color={'gray.500'}>{`${numberDate} ${month} ${year}`}</Text>
    </Box>
  );
};

export default ToolbarDate;
