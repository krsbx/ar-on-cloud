import { useState } from 'react';
import useHeightObserver from './useHeightObserver';

const useTopBarHeight = (topbarRef: ReactRef<HTMLDivElement>) => {
  const [topBarHeight, setTopBarHeight] = useState(48);

  useHeightObserver(topbarRef, (height) => {
    setTopBarHeight(height);
  });

  return topBarHeight;
};

export default useTopBarHeight;
