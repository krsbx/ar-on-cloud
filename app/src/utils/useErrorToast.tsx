import { useToast } from '@chakra-ui/react';

const useErrorToast = () => {
  const toast = useToast({
    title: 'Error',
    status: 'error',
    duration: 9000,
    isClosable: true,
    position: 'top',
  });

  return (err: any) => {
    toast({
      description: err?.response?.data?.message ?? 'Something went wrong',
    });
  };
};

export default useErrorToast;
