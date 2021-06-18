import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { CalendarView } from '../../types';

const getStyle = (ownView: CalendarView, selectedView: CalendarView) => {
  if (ownView === selectedView) {
    return {
      color: 'gray.500',
      fontWeight: '700',
    };
  }
  return {};
};

type PropsType = {
  selectView: (newView: CalendarView) => void;
  view: CalendarView;
};

const ViewsControl = ({ selectView, view }: PropsType) => {
  return (
    <Breadcrumb marginLeft={'auto'} color={'gray.500'}>
      <BreadcrumbItem>
        <BreadcrumbLink
          onClick={() => selectView('day')}
          style={getStyle(view, 'day' as const) as React.CSSProperties}
        >
          Tag
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink
          onClick={() => selectView('week')}
          style={getStyle(view, 'week' as const) as React.CSSProperties}
        >
          Woche
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default ViewsControl;
