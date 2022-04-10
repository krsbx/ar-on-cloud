import React from 'react';
import { HStack, Link, LinkProps } from '@chakra-ui/react';

const Anonymous: React.FC<Props> = ({ isTransparent = false }) => {
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

  return (
    <HStack spacing={3}>
      <Link href={'/register'} {...linkStyle}>
        Register
      </Link>
      <Link href={'/login'} {...linkStyle}>
        Login
      </Link>
    </HStack>
  );
};

type Props = {
  isTransparent?: boolean;
};

export default Anonymous;
