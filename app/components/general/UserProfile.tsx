import { Box, Text, VStack } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { getUserById as _getUserById } from 'store/actions/users';
import { User } from 'utils/interfaces/resource';

const UserProfile = ({ user }: Props) => {
  return (
    <Box
      boxShadow={'0px 10px 40px rgba(0, 0, 0, 0.1)'}
      borderRadius={'lg'}
      px={10}
      py={3}
      _hover={{
        border: '1px solid',
        borderColor: 'blackAlpha.300',
        background: 'whiteAlpha.700',
      }}
      transition="all 0.3s ease-in-out"
    >
      <VStack spacing={4} alignItems={'normal'}>
        <Text fontWeight={'bold'}>
          {_.values(_.pick(user?.profile, ['firstName', 'lastName'])).join(' ') ?? ''}
        </Text>
        <Text fontWeight={'semibold'} color={'blackAlpha.700'}>
          {user?.username ?? ''}
        </Text>
        <Text>{user?.profile?.bio ?? ''}</Text>
      </VStack>
    </Box>
  );
};

const connector = connect(null, {
  getUserById: _getUserById,
});

type Props = ConnectedProps<typeof connector> & {
  user: User | null;
};

export default connector(UserProfile);
