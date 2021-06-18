import React from 'react';
import Scheduler from './components';
import events from './mocks/events';

function App() {
  return <Scheduler data={events} startFrom={'08:00'} />;
}

export default App;
