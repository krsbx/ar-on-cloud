import { Box, HStack } from '@chakra-ui/react';
import { UserProfile } from 'components/general';
import UserLayout from 'components/pageLayout/UserLayout';
import { useRouter } from 'next/router';
import React, { createRef, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { getUserById as _getUserById } from 'store/actions/users';
import { getUserId } from 'utils/cookieUtils';
import PinnedAR from './PinnedAR';

const DashboardPage: ReactFC<Props> = ({ getUserById }) => {
  const router = useRouter();
  const [user, setUser] = useState<CloudAR.Resource.User | null>(null);
  const contentRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!router.isReady) return;

    (async () => {
      const userId = getUserId();

      if (!userId) return;

      setUser(await getUserById(userId));
    })();
  }, [router.isReady]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <UserLayout contentRef={contentRef}>
      <Box width={'100%'} px={5} py={5}>
        <HStack spacing={5}>
          <UserProfile user={user} />
          <PinnedAR />
        </HStack>
      </Box>
    </UserLayout>
  );
};

const connector = connect(null, {
  getUserById: _getUserById,
});

type Props = ConnectedProps<typeof connector>;

export default connector(DashboardPage);
