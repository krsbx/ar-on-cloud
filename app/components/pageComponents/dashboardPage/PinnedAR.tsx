import { Box, Grid, GridItem, HStack, Text, VStack } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { AiOutlineBook } from 'react-icons/ai';

const ARCards = React.memo(() => (
  <GridItem
    maxWidth={{ md: '400px' }}
    height={'100px'}
    transition="all 0.3s ease-in-out"
    bg={'whiteAlpha.600'}
    boxShadow={'md'}
    _hover={{
      bg: 'whiteAlpha.900',
      boxShadow: 'lg',
    }}
    borderRadius={'lg'}
    overflow={'hidden'}
  >
    <Box height={'100%'} py={3} px={3}>
      <VStack width={'100%'}>
        <HStack gap={1} width={'100%'} alignItems={'center'}>
          <Box>
            <AiOutlineBook />
          </Box>
          <Text>Title</Text>
          <Box px={'10px'} py={'1.5px'} backgroundColor={'blackAlpha.50'} borderRadius={'xl'}>
            <Text>Public</Text>
          </Box>
        </HStack>
        <HStack gap={2} width={'100%'} alignItems={'center'}>
          <Text>
            {_.truncate('Descriptions', {
              length: 100,
            })}
          </Text>
        </HStack>
      </VStack>
    </Box>
  </GridItem>
));

const PinnedAR = () => {
  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={5}>
      {_.map(Array(6), (_, id) => (
        <ARCards key={id} />
      ))}
    </Grid>
  );
};

export default PinnedAR;
