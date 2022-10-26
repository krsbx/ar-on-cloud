import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  return (
    <Flex justifyContent={'center'} alignItems={'center'} fontWeight={'bold'} fontSize={'12px'}>
      <Text as={'span'}>Made with&nbsp;</Text>
      <Text as={'span'} color={'red.600'}>
        ❤
      </Text>
      <Text as={'span'}>&nbsp;since 2021</Text>
    </Flex>
  );
};

export default Footer;
