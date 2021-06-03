import React from 'react';
import { Flex } from '@chakra-ui/react';
import DaysControls from './DaysControls';
import ViewsControl from './ViewsControl';
import { CalendarView } from '../../types';

type PropsType = {
  controls: {
    next: () => void;
    previous: () => void;
    selectView: (newView: CalendarView) => void;
  };
};

const Toolbar = ({ controls }: PropsType) => {
  return (
    <Flex>
      <DaysControls previous={controls.previous} next={controls.next} />
      <ViewsControl selectView={controls.selectView} />
    </Flex>
  );
};

export default Toolbar;
