import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import useErrorToast from 'hooks/useErrorToast';
import { useRouter } from 'next/router';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { userLogin as _userLogin } from 'store/actions/currentUser';
import { loginSchema } from 'utils/formSchema';
import { UserLoginPayload } from 'utils/interfaces/payloadsReponses';

const LoginModal = ({ userLogin, onClose }: Props) => {
  const router = useRouter();
  const toast = useErrorToast();

  const onSubmit = async (values: UserLoginPayload) => {
    try {
      await userLogin(values);
      onClose();

      router.push('dashboard');
    } catch (err) {
      toast(err);
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        always: false,
      }}
      validationSchema={loginSchema}
      onSubmit={onSubmit}
    >
      {({ handleBlur, handleSubmit, handleChange, values, errors, touched }) => (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <VStack spacing={3} justifyContent={'center'}>
            <FormControl isRequired isInvalid={!!errors.email && touched.email}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                value={values.email}
                onBlur={handleBlur('email')}
                onChange={handleChange('email')}
                title={'Email'}
                required
              />
              {!!errors.email && touched.email && (
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.password && touched.password}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Password"
                value={values.password}
                onBlur={handleBlur('password')}
                onChange={handleChange('password')}
                title={'Password'}
                type={'password'}
                required
              />
              {!!errors.password && touched.password && (
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl userSelect={'none'}>
              <HStack spacing={2}>
                <Checkbox
                  checked={values.always}
                  onBlur={handleBlur('always')}
                  onChange={handleChange('always')}
                  title={'Remember Me?'}
                />
                <FormLabel>Remember Me?</FormLabel>
              </HStack>
            </FormControl>
            <Button type={'submit'}>Login</Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

const connector = connect(null, {
  userLogin: _userLogin,
});

type Props = ConnectedProps<typeof connector> & {
  onClose: () => void;
};

export default connector(LoginModal);
