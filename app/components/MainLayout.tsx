import { Flex } from '@chakra-ui/react';
import useIsAuthenticated from 'hooks/useIsAuthenticated';
import useTopBarHeight from 'hooks/useTopbarHeight';
import React, { createRef, useRef } from 'react';
import { TopBar } from './baseComponents';
import { UserTopBar } from './baseComponents/TopBarChildren';

const MainLayout: ReactFC<Props> = ({ children, contentRef }) => {
  const topbarRef = createRef<HTMLDivElement>();
  const topBarHeight = useTopBarHeight(topbarRef);
  const isAuth = useIsAuthenticated();
  const setIsMenuOpen = useRef<ReactSetter<boolean>>();

  return (
    <Flex
      flexDirection={'column'}
      bg="gray.100"
      width={'100vw'}
      height={'100vh'}
      position={'relative'}
    >
      <TopBar ref={topbarRef} setIsMenuOpen={setIsMenuOpen}>
        {isAuth ? (
          <UserTopBar.Authenticated />
        ) : (
          <UserTopBar.Anonymous setIsMenuOpen={setIsMenuOpen.current} />
        )}
      </TopBar>
      <Flex
        flexDirection={'column'}
        width={'100vw'}
        height={`calc(100vh - ${topBarHeight}px)`}
        mt={`${topBarHeight}px`}
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
