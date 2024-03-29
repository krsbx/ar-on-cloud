import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Link,
  useBreakpointValue,
  useMergeRefs,
} from '@chakra-ui/react';
import useTopBarHeight from 'hooks/useTopbarHeight';
import NextLink from 'next/link';
import React, { createRef, useEffect, useMemo, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { chakraSpace } from 'utils/theme';

const TopBar = React.forwardRef<HTMLDivElement, Props>(
  ({ children, setIsMenuOpen: _setIsMenuOpen }, ref) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const innerRef = createRef<HTMLDivElement>();
    const refs = useMergeRefs<HTMLDivElement>(innerRef, ref);

    const topBarHeight = useTopBarHeight(innerRef);
    const display = useBreakpointValue({
      base: {
        base: 'grid',
        md: 'none',
      },
      md: {
        base: 'none',
        md: 'grid',
      },
    });
    const isBase = useMemo(() => display?.md !== 'grid', [display]); // eslint-disable-line react-hooks/exhaustive-deps

    // Close the menu on the screen size changes
    useEffect(() => {
      setIsMenuOpen(false);
    }, [isBase]);

    useEffect(() => {
      if (!_setIsMenuOpen) return;
      if (_setIsMenuOpen.current) return;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      _setIsMenuOpen.current = setIsMenuOpen;
    }, [_setIsMenuOpen]);

    return (
      <Box width={'100vw'} position={'fixed'} zIndex={1}>
        <Grid
          width={'100vw'}
          alignItems={'center'}
          templateColumns={'repeat(2, 1fr)'}
          userSelect={'none'}
          bg={'gray.200'}
          gap={2}
          p={2}
          px={4}
          ref={refs}
        >
          <GridItem>
            <HStack spacing={2} justifyContent={'flex-start'}>
              <Link
                transition={'all 0.3s ease-in-out'}
                as={NextLink}
                color={'blackAlpha.600'}
                bg={'blackAlpha.100'}
                rounded={'md'}
                p={3}
                href="/"
                _hover={{
                  bg: 'blackAlpha.300',
                  color: 'blackAlpha.900',
                }}
              >
                Home
              </Link>
            </HStack>
          </GridItem>
          <GridItem display={display?.md}>
            <Flex justifyContent={'flex-end'}>{children}</Flex>
          </GridItem>
          <GridItem display={display?.base}>
            <Flex justifyContent={'flex-end'}>
              <Button
                variant={'unstyled'}
                color={'blackAlpha.700'}
                width={'fit-content'}
                justifyContent={'center'}
                alignItems={'center'}
                display={'flex'}
                bg={'blackAlpha.100'}
                padding={1}
                _hover={{
                  bg: 'blackAlpha.200',
                }}
                onClick={() => setIsMenuOpen((curr) => !curr)}
              >
                <GiHamburgerMenu />
              </Button>
            </Flex>
          </GridItem>
        </Grid>
        <Box
          position={'absolute'}
          width={'100vw'}
          height={`calc(100vh - calc(${topBarHeight}px + ${chakraSpace(4)}px))`}
          right={isMenuOpen ? 0 : `-100vw`}
          bg={'blackAlpha.500'}
          top={`calc(${topBarHeight}px + ${chakraSpace(4)}px)`}
          transition={'all 0.2s ease-in-out'}
          padding={2}
        >
          {children}
        </Box>
      </Box>
    );
  }
);

type Props = {
  children?: React.ReactNode;
  setIsMenuOpen?: ReactRef<ReactSetter<boolean> | undefined>;
};

TopBar.displayName = 'TopBar';

export default TopBar;
