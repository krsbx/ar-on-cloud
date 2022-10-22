import { useState } from 'react';
import useHeightObserver from './useHeightObserver';

const useTopBarHeight = (topbarRef: ReactRef<HTMLDivElement>) => {
  const [topbarHeight, setTopbarHeight] = useState(48);

  useHeightObserver(topbarRef, (height) => {
    setTopbarHeight(height);
  });

  return topbarHeight;
};

export default useTopBarHeight;
