import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { CalendarView } from '../../types';

type PropsType = {
  selectView: (newView: CalendarView) => void;
};

const ViewsControl = ({ selectView }: PropsType) => {
  return (
    <Flex ml="auto">
      <Button color="twitter.500" onClick={() => selectView('day')}>
        Day
      </Button>
      <Button color="whatsapp.500" onClick={() => selectView('week')}>
        Week
      </Button>
    </Flex>
  );
};

export default ViewsControl;
