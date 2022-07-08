import React, { useState } from 'react';
import NextLink from 'next/link';
import {
  HStack,
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
} from '@chakra-ui/react';
import LoginModal from '../../modals/LoginModal';
import RegisterModal from '../../modals/RegisterModal';

const Anonymous: React.FC<Props> = ({ isTransparent = false }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const linkStyle: LinkProps = {
    bg: isTransparent ? 'transparent' : 'blackAlpha.100',
    color: isTransparent ? 'white' : 'blackAlpha.600',
    fontWeight: isTransparent ? 'bold' : 'normal',
    rounded: 'md',
    py: 2,
    px: 5,
    transition: 'all 0.3s ease-in-out',
    _hover: {
      bg: isTransparent ? 'blackAlpha.100' : 'blackAlpha.300',
    },
  };

  const modalHeaderStyle = (inLogin: boolean): TextProps =>
    ({
      fontWeight: inLogin ? '700' : '500',
      fontSize: inLogin ? '0.9rem' : '0.8rem',
      p: 3,
    } as TextProps);

  return (
    <React.Fragment>
      <HStack spacing={3}>
        <Link
          href={'#register'}
          {...linkStyle}
          onClick={() => {
            onOpen();
            setIsLogin(false);
          }}
        >
          Register
        </Link>
        <Link
          href={'#login'}
          {...linkStyle}
          onClick={() => {
            onOpen();
            setIsLogin(true);
          }}
        >
          Login
        </Link>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose} closeOnEsc isCentered>
        <ModalOverlay />
        <ModalContent p={3}>
          <ModalHeader>
            <HStack
              alignItems={'center'}
              spacing={3}
              justifyContent={'center'}
              textTransform={'uppercase'}
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
            </HStack>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>{isLogin ? <LoginModal /> : <RegisterModal />}</ModalBody>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

type Props = {
  isTransparent?: boolean;
};

export default Anonymous;
