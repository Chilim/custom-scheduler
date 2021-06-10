import React from 'react';
import { Flex } from '@chakra-ui/react';
import Grid from './Grid';
import Toolbar from './toolbar';
import { DAYS_IN_WEEK, INITIAL_DATE } from '../constants';
import { getPreviousDate, getNextDate } from '../utils/timeUtils';
import { CalendarView, GridEventType } from '../types';

type PropsType = {
  data: GridEventType[];
};

const Scheduler = ({ data }: PropsType) => {
  const [date, setDate] = React.useState<Date>(INITIAL_DATE);
  const [view, setView] = React.useState<CalendarView>('week');
  const [events, setEvents] = React.useState<GridEventType[]>(data);

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

  const updateEvent = (updatedEvt: GridEventType) => {
    const updatedEvts = events.map((evt) => (evt.id === updatedEvt.id ? updatedEvt : evt));
    setEvents(updatedEvts);
  };

  const deleteEvent = (id: number) => {
    const filteredEvts = events.filter((evt) => evt.id !== id);
    setEvents(filteredEvts);
  };

  const createEvent = (newEventDate: Omit<GridEventType, 'id'>) => {
    const newId = events.length + 1;
    const updatedEvts = [...events, { ...newEventDate, id: newId }];
    setEvents(updatedEvts);
  };

  const controls = { next, previous, selectView };
  const eventActions = { updateEvent, deleteEvent, createEvent };

  return (
    <Flex flexDir="column" h="100vh">
      <Toolbar controls={controls} date={date} view={view} />
      <Grid date={date} view={view} duration={30} actions={eventActions} events={events} />
    </Flex>
  );
};

export default Scheduler;
