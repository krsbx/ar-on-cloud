import useRectObserver from './useRectObserver';

const useHeightObserver = (ref: ReactRef<HTMLElement>, cb: (height: number) => void) => {
  useRectObserver(ref, cb, false);
};

export default useHeightObserver;
