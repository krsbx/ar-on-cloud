import React from 'react';
import {
  Button,
  Checkbox,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { loginSchema } from 'src/utils/formSchema';

const LoginModal = () => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        always: false,
      }}
      validationSchema={loginSchema}
      onSubmit={() => {
        return;
      }}
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
                required
              />
              {!!errors.password && touched.password && (
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.always && touched.always} userSelect={'none'}>
              <HStack spacing={2}>
                <Checkbox
                  checked={values.always}
                  onBlur={handleBlur('always')}
                  onChange={handleChange('always')}
                  title={'Remember Me?'}
                  required
                />
                <FormLabel>Remember Me?</FormLabel>
                {!!errors.always && touched.always && (
                  <FormErrorMessage>{errors.always}</FormErrorMessage>
                )}
              </HStack>
            </FormControl>
            <Button>Login</Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default LoginModal;
