import React from 'react';

const useResize = (ref: React.RefObject<HTMLDivElement>) => {
  const [elementSize, setElementSize] = React.useState<number | undefined>(undefined);
  React.useEffect(() => {
    const handleResize = () => {
      setElementSize(ref.current?.clientWidth as number);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [ref]);
  return elementSize;
};

export default useResize;
