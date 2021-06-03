import React from 'react';
import { Flex, Button } from '@chakra-ui/react';

const ViewsControl = () => {
  return (
    <Flex ml='auto'>
      <Button color='twitter.500'>Day</Button>
      <Button color='whatsapp.500'>Week</Button>
    </Flex>
  );
};

export default ViewsControl;
