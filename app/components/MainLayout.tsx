import { Flex } from '@chakra-ui/react';
import useIsAuthenticated from 'hooks/useIsAuthenticated';
import useSmoothScrollbar from 'hooks/useSmoothSrollbar';
import useTopBarHeight from 'hooks/useTopbarHeight';
import React, { createRef } from 'react';
import { TopBar } from './baseComponents';
import { UserTopBar } from './baseComponents/TopBarChildren';

const MainLayout: ReactFC<Props> = ({ children }) => {
  const topbarRef = createRef<HTMLDivElement>();
  const contentRef = createRef<HTMLDivElement>();
  const topBarHeight = useTopBarHeight(topbarRef);
  const isAuth = useIsAuthenticated();

  useSmoothScrollbar(contentRef);

  return (
    <Flex
      flexDirection={'column'}
      bg="gray.100"
      width={'100vw'}
      height={'100vh'}
      position={'relative'}
      overflow={'hidden'}
    >
      <TopBar ref={topbarRef}>
        {isAuth ? <UserTopBar.Anonymous /> : <UserTopBar.Anonymous />}
      </TopBar>
      <Flex
        flexDirection={'column'}
        width={'100vw'}
        height={`calc(100vh - ${topBarHeight}px)`}
        overflow={'auto'}
        ref={contentRef}
        pb={10}
      >
        {children}
      </Flex>
    </Flex>
  );
};

type Props = {
  contentRef?: ReactRef<HTMLDivElement>;
};

export default MainLayout;
