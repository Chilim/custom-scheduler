import React from 'react';
import Scheduler from './components';
import events from './mocks/events';

function App() {
  return <Scheduler data={events} />;
}

export default App;
