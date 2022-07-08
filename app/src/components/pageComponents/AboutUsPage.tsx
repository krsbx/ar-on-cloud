import React from 'react';
import { Flex, Grid, GridItem, Text, Image, Link, Box, Stack } from '@chakra-ui/react';
import { UserLayout } from '../pageLayout';

const AboutMe = () => {
  return (
    <UserLayout>
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
        alignItems={'center'}
        justifyContent={'center'}
        height={'100%'}
        width={'100%'}
        p={5}
      >
        <GridItem></GridItem>
      </Grid>
    </UserLayout>
  );
};

export default AboutMe;
