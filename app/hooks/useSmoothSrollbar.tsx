import { useEffect } from 'react';
import SmoothSB from 'smooth-scrollbar';

const useSmoothScrollbar = (ref?: ReactRef<HTMLDivElement>) => {
  useEffect(() => {
    if (ref && ref.current)
      SmoothSB.init(ref.current, {
        damping: 0.1,
        continuousScrolling: true,
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useSmoothScrollbar;
