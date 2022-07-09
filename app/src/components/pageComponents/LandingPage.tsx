import React, { createRef } from 'react';
import { Flex, Text, Link } from '@chakra-ui/react';
import { UserLayout } from '../pageLayout';
import FirstSection from './landingPage/FirstSection';
import SecondSection from './landingPage/SecondSection';

const LandingPage = () => {
  const contentRef = createRef<HTMLDivElement>();

  return (
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
          <Link
            href={'/getting-started'}
            bg={'gray.200'}
            transition={'all 0.3s ease-in-out'}
            borderRadius={'md'}
            p={3}
            _hover={{
              bg: 'gray.300',
            }}
          >
            Getting Started!
          </Link>
        </Flex>
        <FirstSection />
        <SecondSection />
        <Flex
          width={{ base: '90%', md: '2xl', lg: '3xl' }}
          alignItems={'center'}
          flexDirection={'column'}
          my={4}
        >
          <Text fontStyle={'italic'} fontSize={16}>
            What are you waiting for?
          </Text>
          <Text fontStyle={'italic'} fontSize={16}>
            Come and join us and make AR with us!
          </Text>
          <Flex py={3}>
            <Link
              href={'/getting-started'}
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
          </Flex>
        </Flex>
      </Flex>
    </UserLayout>
  );
};

export default LandingPage;
