import React from 'react';
import { CalendarView } from '../types';

const useResize = (ref: React.RefObject<HTMLDivElement>, view: CalendarView) => {
  const [columnSize, setColumnSize] = React.useState<number | undefined>(undefined);
  React.useEffect(() => {
    const handleResize = () => {
      console.log('ref.current', ref.current?.clientWidth);
      setColumnSize(ref.current?.clientWidth as number);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return columnSize;
};

export default useResize;
