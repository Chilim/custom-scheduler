import React from 'react';
import { Flex } from '@chakra-ui/react';
import DaysControls from './DaysControls';
import ViewsControl from './ViewsControl';

type PropsType = {
  controls: {
    next: () => void;
    previous: () => void;
  };
};

const Toolbar = ({ controls }: PropsType) => {
  return (
    <Flex>
      <DaysControls previous={controls.previous} next={controls.next} />
      <ViewsControl />
    </Flex>
  );
};

export default Toolbar;
