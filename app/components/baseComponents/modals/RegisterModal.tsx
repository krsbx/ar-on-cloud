import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import useErrorToast from 'hooks/useErrorToast';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { userRegister as _userRegister } from 'store/actions/currentUser';
import { registerSchema } from 'utils/formSchema';

const RegisterModal: ReactFC<Props> = ({ userRegister, setIsLogin }) => {
  const toast = useErrorToast();

  const onSubmit = async (values: CloudAR.Payload.User['Register']) => {
    try {
      await userRegister(values);
      setIsLogin(true);
    } catch (err) {
      toast(err);
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        username: '',
      }}
      validationSchema={registerSchema}
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
            <FormControl isRequired isInvalid={!!errors.username && touched.username}>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Username"
                value={values.username}
                onBlur={handleBlur('username')}
                onChange={handleChange('username')}
                title={'Username'}
                required
              />
              {!!errors.username && touched.username && (
                <FormErrorMessage>{errors.username}</FormErrorMessage>
              )}
            </FormControl>
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
            <Button>Register</Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

const connector = connect(null, {
  userRegister: _userRegister,
});

type Props = ConnectedProps<typeof connector> & {
  setIsLogin: ReactSetter<boolean>;
};

export default connector(RegisterModal);
