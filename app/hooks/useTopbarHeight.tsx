import React from 'react';

const useTopBarHeight = (topbarRef: ReactRef<HTMLDivElement>) => {
  const [topbarHeight, setTopbarHeight] = React.useState<number>(48);

  React.useEffect(() => {
    if (topbarRef.current) setTopbarHeight(topbarRef.current.clientHeight);
  }, []); // eslint-disable-line

  return topbarHeight;
};

export default useTopBarHeight;
