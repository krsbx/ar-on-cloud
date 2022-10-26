import { useEffect, useRef } from 'react';
import SmoothSB from 'smooth-scrollbar';
import { AnchorPlugin } from 'utils/plugins/scrollbar';

const useSmoothScrollbar = (ref: ReactRef<HTMLDivElement>) => {
  const isInited = useRef(false);

  useEffect(() => {
    if (!ref || !ref.current) return;

    if (isInited.current) return;

    SmoothSB.use(AnchorPlugin);

    SmoothSB.init(ref.current, {
      damping: 0.1,
      continuousScrolling: true,
    });

    isInited.current = true;
  }, [ref.current]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useSmoothScrollbar;
