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
      py={10}
    >
      <Text
        textTransform={'uppercase'}
        fontWeight={'bold'}
        id={'learn-more'}
        fontSize={'26px'}
        pt={10}
        mb={5}
      >
        Augmented Reality on Web
      </Text>
      <Divider mb={10} borderColor={'gray.400'} width={'60%'} />
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
    </Flex>
  );
};

export default FirstSection;
