import React from 'react';
import { Flex, Grid, GridItem, Text, Image, Link } from '@chakra-ui/react';
import { UserLayout } from '../pageLayout';

const AboutMe = () => {
  return (
    <UserLayout>
      <Flex height={'100%'} width={'100%'} alignItems={'center'} justifyContent={'center'}>
        <Flex
          width={'sm'}
          height={'xl'}
          flexDirection={'column'}
          userSelect={'none'}
          transition={'all 0.3s ease-in-out'}
          borderRadius={'2xl'}
          _hover={{
            boxShadow: '2xl',
          }}
        >
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            flexDirection={'column'}
            height={'50%'}
            bg={'#183241'}
            borderTopRadius={'2xl'}
          >
            <Text color={'white'} fontWeight={'bold'} fontSize={20}>
              KRSBX
            </Text>
            <Text color={'tomato'} fontWeight={'bold'} fontSize={20}>
              Developer
            </Text>
          </Flex>
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            flexDirection={'column'}
            height={'50%'}
            bg={'whiteAlpha.300'}
            borderBottomRadius={'2xl'}
          >
            Github Twitter Instagram
          </Flex>
        </Flex>
      </Flex>
    </UserLayout>
  );
};

export default AboutMe;
