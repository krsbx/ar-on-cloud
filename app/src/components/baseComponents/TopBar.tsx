/* eslint-disable react/display-name */
import React from 'react';
import { Flex, Grid, GridItem, HStack, Link, LinkProps } from '@chakra-ui/react';

const TopBar = React.forwardRef<HTMLDivElement, TopBarProps>(({ children }, ref) => {
  const linkStyle: LinkProps = {
    transition: 'all 0.3s ease-in-out',
    color: 'blackAlpha.600',
    bg: 'blackAlpha.100',
    rounded: 'md',
    p: 2,
    _hover: {
      bg: 'blackAlpha.300',
      color: 'blackAlpha.900',
    },
  };

  return (
    <Grid
      width={'100vw'}
      alignItems={'center'}
      templateColumns={'repeat(2, 1fr)'}
      userSelect={'none'}
      bg={'gray.200'}
      gap={2}
      p={2}
      px={4}
      ref={ref}
    >
      <GridItem>
        <HStack spacing={2} justifyContent={'flex-start'}>
          <Link href="/" {...linkStyle}>
            Home
          </Link>
          <Link href="/about-us" {...linkStyle}>
            About Us
          </Link>
        </HStack>
      </GridItem>
      <GridItem>
        <Flex justifyContent={'flex-end'}>{children}</Flex>
      </GridItem>
    </Grid>
  );
});

type TopBarProps = {
  children?: React.ReactElement;
};

export default TopBar;
