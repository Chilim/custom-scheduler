import React from 'react';
import { Popover, PopoverTrigger, PopoverContent, Button } from '@chakra-ui/react';
import { GridEventType } from '../types';

type PropsType = {
  overlappedEvents: { top: number; zIndex: number; events: GridEventType[] }[];
};

const ColumnTooltips = ({ overlappedEvents }: PropsType) => {
  const renderTooltips = () => {
    if (!overlappedEvents.length) {
      return null;
    }
    return overlappedEvents.map((oEvt) => (
      <Popover key={oEvt.top}>
        <PopoverTrigger>
          <Button
            size={'xs'}
            style={{
              position: 'absolute',
              top: oEvt.top,
              zIndex: oEvt.zIndex,
              right: '-10px',
              textAlign: 'center',
              background: 'skyblue',
              borderRadius: '50%',
              pointerEvents: 'auto',
            }}
          >
            +
          </Button>
        </PopoverTrigger>
        <PopoverContent>{`there ${oEvt.events.length} items together`}</PopoverContent>
      </Popover>
    ));
  };
  return <>{renderTooltips()}</>;
};

export default ColumnTooltips;
