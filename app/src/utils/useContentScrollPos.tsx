import React from 'react';

const useContentScrollPos = (ref: React.RefObject<HTMLDivElement>) => {
  const [scrollPos, setScrollPos] = React.useState<number>(0);

  React.useEffect(() => {
    const handleScroll = () => {
      if (ref.current) setScrollPos(ref.current.scrollTop);
    };

    ref.current?.addEventListener('scroll', handleScroll);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ref.current?.removeEventListener('scroll', handleScroll);
    };
  }, [ref, scrollPos]);

  return scrollPos;
};

export default useContentScrollPos;
