import React from 'react';
import { Popover, PopoverTrigger, PopoverContent, Button } from '@chakra-ui/react';
import { GridEventType } from '../types';

type PropsType = {
  overlappedEvents: { top: number; events: GridEventType[] }[];
};

const ColumnTooltips = ({ overlappedEvents }: PropsType) => {
  const renderTooltips = () => {
    if (!overlappedEvents.length) {
      return null;
    }
    return overlappedEvents.map((oEvt) => (
      <Popover>
        <PopoverTrigger>
          <Button
            size={'sm'}
            style={{
              position: 'absolute',
              top: oEvt.top,
              zIndex: 9999,
              right: '-25px',
              textAlign: 'center',
              background: 'skyblue',
              borderRadius: '50%',
            }}
          >
            +
          </Button>
        </PopoverTrigger>
        <PopoverContent>there are two more items...</PopoverContent>
      </Popover>
    ));
  };
  return <>{renderTooltips()}</>;
};

export default ColumnTooltips;
