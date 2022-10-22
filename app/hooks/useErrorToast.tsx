import { useToast } from '@chakra-ui/react';

const useErrorToast = () => {
  const toast = useToast({
    title: 'Error',
    status: 'error',
    duration: 9000,
    isClosable: true,
    position: 'top',
  });

  return (error: unknown) => {
    const err = error as {
      response?: {
        data?: {
          message?: string;
        };
      };
    };

    toast({
      description: err?.response?.data?.message ?? 'Something went wrong',
    });
  };
};

export default useErrorToast;
