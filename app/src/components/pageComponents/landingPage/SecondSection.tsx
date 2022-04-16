import React from 'react';
import _ from 'lodash';
import { Flex, Grid, GridItem, Text, Divider, Box } from '@chakra-ui/react';
import { ISection2, SECTION2 } from 'src/utils/landingContent';

const SecondSection = () => {
  const generateCards = (content: ISection2, index: number) => (
    <GridItem
      transition="all 0.3s ease-in-out"
      bg={'whiteAlpha.600'}
      boxShadow={'md'}
      _hover={{
        bg: 'whiteAlpha.900',
        boxShadow: 'lg',
      }}
      borderRadius={'lg'}
      overflow={'hidden'}
      key={index}
    >
      <Box height={'100%'}>
        <Flex
          bgImage={content.imagePath}
          bgSize={'cover'}
          bgPos={'center'}
          height={'150px'}
          alignItems={'flex-end'}
          borderTopRadius={'lg'}
        >
          <Text fontWeight={'700'} p={3} color={'white'}>
            {content.title}
          </Text>
        </Flex>
        <Text textAlign={'justify'} p={3}>
          {content.description.join(' ')}
        </Text>
      </Box>
    </GridItem>
  );

  return (
    <Flex
      width={{ base: '90%', md: '2xl', lg: '3xl' }}
      alignItems={'center'}
      flexDirection={'column'}
      my={3}
    >
      <Text fontWeight={'bold'}>But, why use AR on Web?</Text>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={5} py={4}>
        {_.map(SECTION2, generateCards)}
      </Grid>
      <Divider borderColor={'gray.400'} width={'50%'} />
    </Flex>
  );
};

export default SecondSection;
