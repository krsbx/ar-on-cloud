import React from 'react';
import _ from 'lodash';
import { Flex, Grid, GridItem, Divider } from '@chakra-ui/react';
import { SECTION1 } from 'src/utils/landingContent';
import { generateImage, generateText } from 'src/utils/pageSpecific/landingPage';

const FirstSection = () => {
  const generateFirstSection = () => (
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
            <GridItem py={3}>{generateImage(imageSide)}</GridItem>
            <GridItem py={3}>{generateText(textSide)}</GridItem>
          </Grid>
        </GridItem>
      ))}
    </Grid>
  );

  return (
    <Flex
      width={{ base: '90%', md: '2xl', lg: '3xl' }}
      alignItems={'center'}
      flexDirection={'column'}
      my={5}
    >
      {generateFirstSection()}
      <Divider py={3} borderColor={'gray.400'} width={'50%'} />
    </Flex>
  );
};

export default FirstSection;
