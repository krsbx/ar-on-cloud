import { Box, Flex, Grid, GridItem, HStack, Stack } from '@chakra-ui/react';
import { UserProfile } from 'components/general';
import PinnedAR from 'components/pageComponents/dashboardPage/PinnedAR';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { getCurrentUser as _getCurrentUser } from 'store/actions/currentUser';

const UserDashboard: NextPage<Props> = ({ getCurrentUser }) => {
  const router = useRouter();
  const [user, setUser] = useState<CloudAR.Resource.User | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    (async () => setUser(await getCurrentUser()))();
  }, [router.isReady]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Head>
        <title>Dashboard | Augmented Reality on Web</title>
        <meta name="description" content="Developed by KRSBX" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex width={'100%'} px={5} py={10} justifyContent={'center'}>
        <Grid templateColumns={'repeat(3, 1fr)'} gap={10} width={'80%'}>
          <GridItem colSpan={1}>
            <UserProfile user={user} />
          </GridItem>
          <GridItem colSpan={2}>
            <Stack>
              <PinnedAR />
            </Stack>
          </GridItem>
        </Grid>
      </Flex>
    </React.Fragment>
  );
};

const connector = connect(null, {
  getCurrentUser: _getCurrentUser,
});

type Props = ConnectedProps<typeof connector>;

export default connector(UserDashboard);
