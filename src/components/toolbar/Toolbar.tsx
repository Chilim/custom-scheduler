import React from 'react';
import { Flex } from '@chakra-ui/react';
import DaysControls from './DaysControls';
import ViewsControl from './ViewsControl';
import ToolbarDate from './ToolbarDate';
import { CalendarView } from '../../types';

type PropsType = {
  controls: {
    next: () => void;
    previous: () => void;
    selectView: (newView: CalendarView) => void;
  };
  date: Date;
  view: CalendarView;
};

const Toolbar = ({ controls, date, view }: PropsType) => {
  return (
    <Flex minH={'10%'} align={'center'} paddingLeft={'16px'} paddingRight={'16px'}>
      <DaysControls previous={controls.previous} next={controls.next} />
      <ToolbarDate date={date} />
      <ViewsControl selectView={controls.selectView} view={view} />
    </Flex>
  );
};

export default Toolbar;
