import React, { createRef, useEffect, useState } from 'react';
import { HStack, Box } from '@chakra-ui/react';
import UserLayout from 'src/components/pageLayout/UserLayout';
import PinnedAR from './PinnedAR';
import { UserProfile } from 'src/components/general';
import { useRouter } from 'next/router';
import { User } from 'src/utils/interfaces/resource';
import { getUserId } from 'src/utils/cookieUtils';
import { getUserById as _getUserById } from 'src/store/actions/users';
import { connect, ConnectedProps } from 'react-redux';

const DashboardPage = ({ getUserById }: Props) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
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
