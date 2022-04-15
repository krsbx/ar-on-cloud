import React from 'react';
import _ from 'lodash';
import { Flex, Grid, GridItem, Text, Image, Link, Divider } from '@chakra-ui/react';
import { UserLayout } from '../pageLayout';
import { ISection1, SECTION1, SECTION2 } from 'src/utils/landingContent';

const LandingPage = () => {
  const generateImage = (sideRight: ISection1['imageSide']) => (
    <Flex justifyContent={'center'}>
      <Image alt="" {...sideRight} />
    </Flex>
  );

  const generateText = ({ title, description }: ISection1['textSide']) => (
    <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
      <Text fontWeight={'700'}>{title}</Text>
      <Text textAlign={'justify'}>{description.join(' ')}</Text>
    </Flex>
  );

  return (
    <UserLayout>
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
          <Text color="white" fontWeight="bold" fontSize={{ base: 15, md: 20 }} py={2}>
            Use Augmented Reality on Website now!
          </Text>
          <Link
            href={'/getting-started'}
            bg={'gray.200'}
            borderRadius={'md'}
            p={3}
            _hover={{
              bg: 'gray.300',
            }}
          >
            Getting Started!
          </Link>
        </Flex>
        <Flex width={'60%'} alignItems={'center'} flexDirection={'column'} my={5}>
          {_.map(SECTION1, ({ textSide, imageSide }, index) => (
            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
              alignItems={'center'}
              gap={5}
              key={index}
            >
              <GridItem py={3}>
                {index % 2 === 0 ? generateText(textSide) : generateImage(imageSide)}
              </GridItem>
              <GridItem py={3}>
                {index % 2 === 0 ? generateImage(imageSide) : generateText(textSide)}
              </GridItem>
            </Grid>
          ))}
          <Divider py={3} borderColor={'gray.400'} width={'50%'} />
        </Flex>
        <Flex width={'60%'} alignItems={'center'} flexDirection={'column'} my={3}>
          <Text fontWeight={'bold'}>But, why use AR on Web?</Text>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={5} py={4}>
            {_.map(SECTION2, (content, index) => (
              <GridItem py={3} key={index}>
                {generateText(content)}
              </GridItem>
            ))}
          </Grid>
          <Divider borderColor={'gray.400'} width={'50%'} />
        </Flex>
        <Flex width={'60%'} alignItems={'center'} flexDirection={'column'} my={4}>
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
              p={3}
              _hover={{
                bg: 'whiteAlpha.900',
              }}
            >
              Go Wild!
            </Link>
          </Flex>
          <Text fontStyle={'italic'} fontSize={16}>
            Be wild with your AR!
          </Text>
        </Flex>
      </Flex>
    </UserLayout>
  );
};

export default LandingPage;
