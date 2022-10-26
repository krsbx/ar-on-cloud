import { Flex, Link, Text } from '@chakra-ui/react';
import { Footer } from 'components/general';
import FirstSection from 'components/pageComponents/landingPage/FirstSection';
import SecondSection from 'components/pageComponents/landingPage/SecondSection';
import { UserLayout } from 'components/pageLayout';
import type { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import React, { createRef } from 'react';

const Home: NextPage = () => {
  const contentRef = createRef<HTMLDivElement>();

  return (
    <React.Fragment>
      <Head>
        <title>Augmented Reality on Web</title>
        <meta name="description" content="Developed by KRSBX" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserLayout contentRef={contentRef}>
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
            <NextLink href={'#learn-more'} passHref>
              <Link
                bg={'gray.200'}
                transition={'all 0.3s ease-in-out'}
                borderRadius={'md'}
                p={3}
                _hover={{
                  bg: 'gray.300',
                }}
              >
                Learn More!
              </Link>
            </NextLink>
          </Flex>
          <FirstSection />
          <SecondSection />
          <Flex
            width={{ base: '90%', md: '2xl', lg: '3xl' }}
            alignItems={'center'}
            flexDirection={'column'}
            mt={5}
            mb={2}
          >
            <Text fontStyle={'italic'} fontSize={16}>
              What are you waiting for?
            </Text>
            <Text fontStyle={'italic'} fontSize={16}>
              Come and join us and make AR with us!
            </Text>
            <Flex my={5}>
              <NextLink href={'/getting-started'} passHref>
                <Link
                  bg={'whiteAlpha.600'}
                  borderRadius={'md'}
                  boxShadow={'lg'}
                  transition={'all 0.3s ease-in-out'}
                  p={3}
                  px={4}
                  _hover={{
                    bg: 'whiteAlpha.900',
                  }}
                >
                  Create AR Now!
                </Link>
              </NextLink>
            </Flex>
          </Flex>
          <Footer />
        </Flex>
      </UserLayout>
    </React.Fragment>
  );
};

export default Home;
