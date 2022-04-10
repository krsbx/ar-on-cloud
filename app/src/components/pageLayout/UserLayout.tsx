import React, { createRef } from 'react';
import { Flex } from '@chakra-ui/react';
import { TopBar } from '../baseComponents';
import { UserTopBar } from '../baseComponents/TopBarChildren';
import { useIsAuthenticated } from 'src/utils/sessionUtils';
import useContentScrollPos from 'src/utils/useContentScrollPos';

const UserLayout: React.FC = ({ children }) => {
  const topbarRef = createRef<HTMLDivElement>();
  const contentRef = createRef<HTMLDivElement>();
  const isAuth = useIsAuthenticated();
  const scrollPos = useContentScrollPos(contentRef);

  return (
    <Flex flexDirection={'column'} bg="gray.100" width={'100vw'} height={'100vh'}>
      <TopBar ref={topbarRef} scrollPos={scrollPos}>
        {isAuth ? <UserTopBar.Anonymous /> : <UserTopBar.Anonymous />}
      </TopBar>
      <Flex
        flexDirection={'column'}
        width={'100vw'}
        height={'100vh'}
        overflow={'auto'}
        ref={contentRef}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default UserLayout;
