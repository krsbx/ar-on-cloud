import React from 'react';
import { Flex, Grid, GridItem, Text, Image, Link } from '@chakra-ui/react';
import { UserLayout } from '../pageLayout';

const AboutMe = () => {
  return (
    <UserLayout marginTop>
      <Flex height={'100%'} width={'100%'} justifyContent={'center'} bg={'blackAlpha.400'}>
        <Grid templateColumns={'repeat(2, 1fr)'} gap={3}>
          <GridItem>
            <Text fontSize={20} fontWeight={'bold'}>
              About Me
            </Text>
          </GridItem>
          <GridItem></GridItem>
        </Grid>
      </Flex>
    </UserLayout>
  );
};

export default AboutMe;
