import React, { useMemo, useState } from 'react';
import NextLink from 'next/link';
import {
  Stack,
  Link,
  LinkProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  Text,
  useDisclosure,
  TextProps,
  useBreakpoint,
} from '@chakra-ui/react';
import LoginModal from '../../modals/LoginModal';
import RegisterModal from '../../modals/RegisterModal';

const Anonymous: ReactFC = ({}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const breakpoint = useBreakpoint('md');
  const isBase = useMemo(() => ['base', 'sm'].includes(breakpoint ?? 'md'), [breakpoint]);

  const linkStyle: LinkProps = {
    bg: isBase ? 'blackAlpha.400' : 'blackAlpha.100',
    color: isBase ? 'white' : 'blackAlpha.600',
    fontWeight: isBase ? 'bold' : 'semibold',
    rounded: 'md',
    py: 2,
    px: 5,
    transition: 'all 0.3s ease-in-out',
    textAlign: 'center',
    _hover: {
      bg: isBase ? 'blackAlpha.100' : 'blackAlpha.300',
    },
  };

  const modalHeaderStyle = (inLogin: boolean) =>
    ({
      fontWeight: inLogin ? '700' : '500',
      fontSize: inLogin ? '0.9rem' : '0.8rem',
      p: 3,
    } as TextProps);

  return (
    <React.Fragment>
      <Stack spacing={3} direction={isBase ? 'column' : 'row'}>
        <NextLink href={'#register'} passHref>
          <Link
            {...linkStyle}
            onClick={() => {
              onOpen();
              setIsLogin(false);
            }}
          >
            Register
          </Link>
        </NextLink>
        <NextLink href={'#login'} passHref>
          <Link
            {...linkStyle}
            onClick={() => {
              onOpen();
              setIsLogin(true);
            }}
          >
            Login
          </Link>
        </NextLink>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose} closeOnEsc isCentered>
        <ModalOverlay />
        <ModalContent p={3}>
          <ModalHeader>
            <Stack
              alignItems={'center'}
              spacing={3}
              justifyContent={'center'}
              textTransform={'uppercase'}
              direction={'row'}
            >
              <NextLink href={'#register'} passHref>
                <Link
                  onClick={() => setIsLogin(false)}
                  w={'100px'}
                  textAlign={'center'}
                  _focus={{
                    outline: 'none',
                  }}
                  _hover={{
                    textDecoration: 'none',
                    backgroundColor: 'blackAlpha.100',
                    borderRadius: 'md',
                  }}
                >
                  <Text {...modalHeaderStyle(!isLogin)}>Register</Text>
                </Link>
              </NextLink>
              <Text>|</Text>
              <NextLink href={'#login'} passHref>
                <Link
                  onClick={() => setIsLogin(true)}
                  w={'100px'}
                  textAlign={'center'}
                  _focus={{
                    outline: 'none',
                  }}
                  _hover={{
                    textDecoration: 'none',
                    backgroundColor: 'blackAlpha.100',
                    borderRadius: 'md',
                  }}
                >
                  <Text {...modalHeaderStyle(isLogin)}>Login</Text>
                </Link>
              </NextLink>
            </Stack>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            {isLogin ? <LoginModal onClose={onClose} /> : <RegisterModal setIsLogin={setIsLogin} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default Anonymous;
