import {
  Button,
  ButtonProps,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  TextProps,
  useBreakpoint,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import LoginModal from '../../modals/LoginModal';
import RegisterModal from '../../modals/RegisterModal';

const Anonymous: ReactFC<Props> = ({ setIsMenuOpen }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const breakpoint = useBreakpoint('md');
  const isBase = useMemo(() => ['base', 'sm'].includes(breakpoint ?? 'md'), [breakpoint]);

  const buttonStyle: ButtonProps = useMemo(
    () => ({
      bg: isBase ? 'blackAlpha.400' : 'blackAlpha.100',
      color: isBase ? 'white' : 'blackAlpha.600',
      fontWeight: isBase ? 'bold' : 'semibold',
      borderRadius: 'md',
      p: 3,
      minH: 12,
      transition: 'all 0.3s ease-in-out',
      _hover: {
        bg: isBase ? 'blackAlpha.100' : 'blackAlpha.300',
      },
    }),
    [isBase] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const modalHeaderStyle = (inLogin: boolean) =>
    ({
      fontWeight: inLogin ? '700' : '500',
      fontSize: inLogin ? '0.9rem' : '0.8rem',
      p: 3,
    } as TextProps);

  return (
    <React.Fragment>
      <Stack spacing={3} direction={isBase ? 'column' : 'row'}>
        <Button
          {...buttonStyle}
          onClick={() => {
            onOpen();
            setIsLogin(false);
            setIsMenuOpen?.(false);
          }}
        >
          Register
        </Button>
        <Button
          {...buttonStyle}
          onClick={() => {
            onOpen();
            setIsLogin(true);
            setIsMenuOpen?.(false);
          }}
        >
          Login
        </Button>
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
              <Link
                onClick={() => setIsLogin(false)}
                w={'100px'}
                textAlign={'center'}
                href={'#register'}
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
              <Text>|</Text>
              <Link
                onClick={() => setIsLogin(true)}
                w={'100px'}
                textAlign={'center'}
                href={'#login'}
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

type Props = {
  setIsMenuOpen?: ReactSetter<boolean>;
};

export default Anonymous;
