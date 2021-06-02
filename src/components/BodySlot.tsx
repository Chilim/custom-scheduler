import React from 'react';
import styled from '@emotion/styled';
import { Td } from '@chakra-ui/react';
import { CalendarBodyCell, CalendarBodyCellType } from '../types';

type PropsType = {
  params: CalendarBodyCell;
};

const Cell = styled(Td)`
  width: ${({ type }: { type: CalendarBodyCellType }) =>
    type === 'timeCell' ? '80px' : 'inherit'};
`;

const BodySlot = ({ params }: PropsType) => {
  const content = React.useMemo(() => {
    if (params.type === 'timeCell') return params.payload.time;
    return null;
  }, [params]);

  return (
    <Cell type={params.type} border='1px solid orange'>
      {content}
    </Cell>
  );
};

export default BodySlot;
