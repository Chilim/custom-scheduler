import React from 'react';
import { Button, Flex } from '@chakra-ui/react';

type PropsType = {
  next: () => void;
  previous: () => void;
};

const DaysControl = ({ next, previous }: PropsType) => {
  return (
    <Flex>
      <Button color="yellow.500" onClick={previous}>
        Previous
      </Button>
      <Button color="telegram.500" onClick={next}>
        Next
      </Button>
    </Flex>
  );
};

export default DaysControl;
