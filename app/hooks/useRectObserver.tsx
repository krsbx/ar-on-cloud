import { useEffect } from 'react';

const useRectObserver = (
  ref: ReactRef<HTMLElement>,
  cb: (width: number) => void,
  isWidth: boolean
) => {
  // Effect to listen changing width/height on a component
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      cb(entries[0].contentRect[isWidth ? 'width' : 'height']);
    });

    if (ref.current) observer.observe(ref.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useRectObserver;
