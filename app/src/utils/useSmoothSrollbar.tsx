import { useEffect } from 'react';
import SmoothSB from 'smooth-scrollbar';

const useSmoothScrollbar = (ref: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    SmoothSB.init(ref.current || document.body, {
      damping: 0.1,
      continuousScrolling: true,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useSmoothScrollbar;
