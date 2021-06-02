import React from 'react';
import { Td } from '@chakra-ui/react';

type PropsType = {
  children: React.ReactNode;
};

const BodySlot = ({ children }: PropsType) => {
  return <Td border='1px solid orange'>{children}</Td>;
};

export default BodySlot;
