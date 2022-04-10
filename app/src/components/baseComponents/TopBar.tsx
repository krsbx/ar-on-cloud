/* eslint-disable react/display-name */
import React, { createRef, useState, useEffect } from 'react';
import { Flex, Grid, GridItem, HStack, Link, LinkProps, useMergeRefs } from '@chakra-ui/react';

const TopBar = React.forwardRef<HTMLDivElement, TopBarProps>(({ children, scrollPos }, ref) => {
  const [topbarHeight, setTopbarHeight] = useState<number>(48);
  const internalRef = createRef<HTMLDivElement>();
  const refs = useMergeRefs(internalRef, ref);

  const isTransparent = scrollPos < topbarHeight * 1.5;

  const linkStyle: LinkProps = {
    color: isTransparent ? 'white' : 'blackAlpha.600',
    ...(isTransparent && {
      fontWeight: 'bold',
    }),
    rounded: 'md',
    p: 2,
    _hover: {
      color: isTransparent ? 'white' : 'blackAlpha.900',
      fontWeight: 'bold',
      textDecoration: 'underline',
    },
  };

  useEffect(() => {
    if (internalRef.current) setTopbarHeight(internalRef.current.clientHeight);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Grid
      width={'100vw'}
      alignItems={'center'}
      templateColumns={'repeat(3, 1fr)'}
      userSelect={'none'}
      position={'fixed'}
      transition={'all 0.3s ease-in-out'}
      bg={isTransparent ? 'transparent' : 'gray.200'}
      gap={2}
      p={2}
      px={4}
      ref={refs}
    >
      <GridItem>
        <Link
          href="/about-me"
          color="blackAlpha.600"
          _hover={{
            color: 'blackAlpha.900',
          }}
          fontWeight={'bold'}
        >
          @KRSBX
        </Link>
      </GridItem>
      <GridItem>
        <HStack spacing={2} justifyContent={'center'}>
          <Link href="/" {...linkStyle}>
            Home
          </Link>
          <Link href="/about-me" {...linkStyle}>
            About Me
          </Link>
        </HStack>
      </GridItem>
      <GridItem>
        <Flex justifyContent={'flex-end'}>
          {children && React.cloneElement(children, { isTransparent })}
        </Flex>
      </GridItem>
    </Grid>
  );
});

type TopBarProps = {
  children?: React.ReactElement;
  scrollPos: number;
};

export default TopBar;
