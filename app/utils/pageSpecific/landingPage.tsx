import React from 'react';
import { Flex, Text, Image } from '@chakra-ui/react';
import { ISection1 } from '../landingContent';

export const generateImage = (sideRight: ISection1['imageSide']) => (
  <Flex justifyContent={'center'}>
    <Image alt="" {...sideRight} />
  </Flex>
);

export const generateText = ({ title, description }: ISection1['textSide']) => (
  <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
    <Text fontWeight={'700'}>{title}</Text>
    <Text textAlign={'justify'}>{description.join(' ')}</Text>
  </Flex>
);
