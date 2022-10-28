import { useCallback, useEffect, useRef } from 'react';
import SmoothSB from 'smooth-scrollbar';
import { Scrollbar } from 'smooth-scrollbar/scrollbar';
import { AnchorPlugin } from 'utils/plugins/scrollbar';

const useSmoothScrollbar = (ref: ReactRef<HTMLDivElement>) => {
  const scrollbar = useRef<Scrollbar>();

  const initScroll = useCallback(() => {
    if (!ref.current) return;

    SmoothSB.use(AnchorPlugin);

    scrollbar.current = SmoothSB.init(ref.current, {
      damping: 0.1,
      continuousScrolling: true,
    });
  }, [scrollbar.current, ref.current]); // eslint-disable-line react-hooks/exhaustive-deps

  const destroyScroll = useCallback(() => {
    if (!ref.current || !scrollbar.current) return;

    scrollbar.current.destroy();
  }, [scrollbar.current, ref.current]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    initScroll();

    return destroyScroll;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useSmoothScrollbar;
