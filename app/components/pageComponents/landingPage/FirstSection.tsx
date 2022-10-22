import { Divider, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { SECTION1 } from 'utils/constant/pages/landingContent';

const FirstSection = () => {
  return (
    <Flex
      width={{ base: '90%', md: '2xl', lg: '3xl' }}
      alignItems={'center'}
      flexDirection={'column'}
      my={5}
    >
      <Grid templateColumns={'1fr'} gap={3}>
        {_.map(SECTION1, ({ textSide, imageSide }, index) => (
          <GridItem
            transition="all 0.3s ease-in-out"
            bg={'whiteAlpha.600'}
            boxShadow={'md'}
            _hover={{
              bg: 'whiteAlpha.900',
              boxShadow: 'lg',
            }}
            borderRadius={'xl'}
            p={3}
            key={index}
          >
            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
              alignItems={'center'}
              gap={5}
            >
              <GridItem py={3}>
                <Flex justifyContent={'center'}>
                  <Image alt="" {...imageSide} />
                </Flex>
              </GridItem>
              <GridItem py={3}>
                <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                  <Text fontWeight={'700'}>{textSide.title}</Text>
                  <Text textAlign={'justify'}>{textSide.description.join(' ')}</Text>
                </Flex>
              </GridItem>
            </Grid>
          </GridItem>
        ))}
      </Grid>
      <Divider py={3} borderColor={'gray.400'} width={'50%'} />
    </Flex>
  );
};

export default FirstSection;
