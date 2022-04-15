import React, { createRef } from 'react';
import { Flex } from '@chakra-ui/react';
import { TopBar } from '../baseComponents';
import { UserTopBar } from '../baseComponents/TopBarChildren';
import { useIsAuthenticated } from 'src/utils/sessionUtils';
import useTopBarHeight from 'src/utils/useTopbarHeight';
import useSmoothScrollbar from 'src/utils/useSmoothSrollbar';

const UserLayout: React.FC = ({ children }) => {
  const topbarRef = createRef<HTMLDivElement>();
  const contentRef = createRef<HTMLDivElement>();
  const topBarHeight = useTopBarHeight(topbarRef);
  const isAuth = useIsAuthenticated();

  useSmoothScrollbar(contentRef);

  return (
    <Flex flexDirection={'column'} bg="gray.100" width={'100vw'} height={'100vh'}>
      <TopBar ref={topbarRef}>
        {isAuth ? <UserTopBar.Anonymous /> : <UserTopBar.Anonymous />}
      </TopBar>
      <Flex
        flexDirection={'column'}
        width={'100vw'}
        height={`calc(100vh - ${topBarHeight}px)`}
        overflow={'auto'}
        ref={contentRef}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default UserLayout;
