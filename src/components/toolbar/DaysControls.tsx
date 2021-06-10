import React from 'react';
import { Flex } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

type PropsType = {
  next: () => void;
  previous: () => void;
};

const sharedStyles = {
  borderRadius: '50%',
  backgroundColor: 'transparent',
  marginRight: '10px',
};

const DaysControl = ({ next, previous }: PropsType) => {
  return (
    <Flex>
      <IconButton
        size={'sm'}
        aria-label="Back"
        icon={<ChevronLeftIcon w={'30px'} h={'30px'} color="gray.500" />}
        onClick={previous}
        style={sharedStyles}
      />
      <IconButton
        size={'sm'}
        aria-label="Next"
        icon={<ChevronRightIcon w={'30px'} h={'30px'} color="gray.500" />}
        onClick={next}
        style={sharedStyles}
      />
    </Flex>
  );
};

export default DaysControl;
