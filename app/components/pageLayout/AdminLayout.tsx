import { Flex } from '@chakra-ui/react';
import useSmoothScrollbar from 'hooks/useSmoothSrollbar';
import useTopBarHeight from 'hooks/useTopbarHeight';
import React, { createRef } from 'react';
import { TopBar } from '../baseComponents';

const AdminLayout: React.FC<Props> = ({ children, contentRef }) => {
  const topbarRef = createRef<HTMLDivElement>();
  const topBarHeight = useTopBarHeight(topbarRef);

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
      <TopBar ref={topbarRef} />
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

type Props = {
  contentRef?: ReactRef<HTMLDivElement>;
};

export default AdminLayout;
