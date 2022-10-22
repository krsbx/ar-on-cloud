import useRectObserver from './useRectObserver';

const useWidthObserver = (ref: ReactRef<HTMLElement>, cb: (width: number) => void) => {
  useRectObserver(ref, cb, true);
};

export default useWidthObserver;
