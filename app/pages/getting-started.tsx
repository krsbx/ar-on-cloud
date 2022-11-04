import { Box, Button, Divider, Flex, Grid, GridItem, Stack, Switch, Text } from '@chakra-ui/react';
import { Footer } from 'components/general';
import useScrollToElement from 'hooks/useScrollToElement';
import _ from 'lodash';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { CREATOR_SECTION, VIEWER_SECTION } from 'utils/constant/pages/gettingStarted';

const AboutMe: NextPage = () => {
  const scrollToElement = useScrollToElement();
  const [isCreator, setIsCreator] = useState(false);

  return (
    <React.Fragment>
      <Head>
        <title>Getting Started | Augmented Reality on Web</title>
        <meta name="description" content="Developed by KRSBX" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex alignItems={'center'} width={'100%'} flexDirection={'column'} pb={7}>
        <Flex
          bgPosition={'center'}
          bgRepeat={'no-repeat'}
          alignItems={'center'}
          justifyContent={'center'}
          bgImage={'/images/cover.jpg'}
          bgSize={'cover'}
          height={'500px'}
          width={'100%'}
          flexDirection={'column'}
        >
          <Text
            color="white"
            fontWeight="bold"
            px={2}
            py={2}
            textAlign={'center'}
            textShadow={'0px 10px 20px rgba(0, 0, 0, 1)'}
            fontSize={{
              base: 15,
              sm: 17,
              md: 20,
            }}
          >
            Use Augmented Reality on Website now!
          </Text>
          <Button
            bg={'gray.200'}
            transition={'all 0.3s ease-in-out'}
            borderRadius={'md'}
            p={3}
            minH={12}
            _hover={{
              bg: 'gray.300',
              my: 3,
            }}
            onClick={() => scrollToElement('getting-started')}
          >
            Create Your AR Now!
          </Button>
        </Flex>
        <Flex
          width={{ base: '90%', md: '2xl', lg: '3xl' }}
          alignItems={'center'}
          flexDirection={'column'}
          py={10}
        >
          <Text
            textTransform={'uppercase'}
            fontWeight={'bold'}
            id={'getting-started'}
            fontSize={'26px'}
            mb={'10px'}
          >
            Getting Started
          </Text>
          <Divider mb={5} borderColor={'gray.400'} width={'50%'} />
          <Stack
            direction={'row'}
            alignItems={'center'}
            textTransform={'uppercase'}
            mb={5}
            height={'25px'}
          >
            <Text
              width={'100px'}
              fontSize={isCreator ? '14px' : '16px'}
              textAlign={'center'}
              fontWeight={'bold'}
              transition={'all 0.15s ease-in-out'}
              pt={isCreator ? '5px' : 'inherit'}
            >
              Viewer
            </Text>
            <Flex justifyContent={'center'}>
              <Switch onChange={(e) => setIsCreator(e.target.checked)} isChecked={isCreator} />
            </Flex>
            <Text
              width={'100px'}
              fontSize={!isCreator ? '14px' : '16px'}
              textAlign={'center'}
              fontWeight={'bold'}
              transition={'all 0.15s ease-in-out'}
              pt={!isCreator ? '5px' : 'inherit'}
            >
              Creator
            </Text>
          </Stack>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={5} py={4}>
            {_.map(
              isCreator ? CREATOR_SECTION : VIEWER_SECTION,
              ({ imagePath, description, title }, index) => (
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
                      bgImage={imagePath}
                      bgSize={'cover'}
                      bgPos={'center'}
                      height={'150px'}
                      alignItems={'flex-end'}
                      borderTopRadius={'lg'}
                      position={'relative'}
                    >
                      <Text
                        position={'absolute'}
                        borderWidth={'4px'}
                        borderColor={'white'}
                        borderRadius={'none'}
                        color={'white'}
                        textAlign={'center'}
                        fontWeight={'700'}
                        width={'40px'}
                        fontSize={'26px'}
                        bottom={'10px'}
                        left={'5px'}
                      >
                        {index + 1}
                      </Text>
                      <Text
                        fontWeight={'700'}
                        p={3}
                        color={'white'}
                        position={'absolute'}
                        left={'40px'}
                        bottom={'0px'}
                      >
                        {title}
                      </Text>
                    </Flex>
                    <Text textAlign={'justify'} p={3}>
                      {description.join(' ')}
                    </Text>
                  </Box>
                </GridItem>
              )
            )}
          </Grid>
          {isCreator && (
            <Flex
              width={{ base: '90%', md: '2xl', lg: '3xl' }}
              alignItems={'center'}
              flexDirection={'column'}
              mt={5}
            >
              <Text fontStyle={'italic'} fontSize={16}>
                What are you waiting for?
              </Text>
              <Text fontStyle={'italic'} fontSize={16}>
                Come and join us and make AR with us!
              </Text>
            </Flex>
          )}
        </Flex>
        <Footer />
      </Flex>
    </React.Fragment>
  );
};

export default AboutMe;
