import React from 'react';
import { Th } from '@chakra-ui/react';

type PropsType = {
  children?: React.ReactNode;
};

const BodySlot = ({ children }: PropsType) => {
  return <Th border='1px solid orange'>{children}</Th>;
};

export default BodySlot;
