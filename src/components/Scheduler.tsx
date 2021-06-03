import React from 'react';
import Grid from './Grid';
import Toolbar from './toolbar';
import { Flex } from '@chakra-ui/layout';
import { DAYS_IN_WEEK, INITIAL_DATE } from '../constants';
import { getPreviousDate, getNextDate } from '../utils/timeUtils';
import { CalendarView } from '../types';

const Scheduler = () => {
  const [date, setDate] = React.useState<Date>(INITIAL_DATE);
  const [view, setView] = React.useState<CalendarView>('week');

  const previous = () => {
		const newDate = getPreviousDate(date, view === 'week' ? DAYS_IN_WEEK : 1);
    setDate(newDate);
  };

  const next = () => {
		const newDate = getNextDate(date, view === 'week' ? DAYS_IN_WEEK : 1);
    setDate(newDate);
  };

  const selectView = (newView: CalendarView) => {
    setView(newView);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
	const memoizedControls = React.useMemo(() => ({ next, previous, selectView }), [view]);

  return (
    <Flex flexDir='column'>
      <Toolbar controls={memoizedControls} />
			<Grid date={date} view={view} />
    </Flex>
  );
};

export default Scheduler;
