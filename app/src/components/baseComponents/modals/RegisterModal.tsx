import React from 'react';
import { Button, Input, FormControl, FormLabel, FormErrorMessage, VStack } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { registerSchema } from 'src/utils/formSchema';

const RegisterModal = () => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        username: '',
      }}
      validationSchema={registerSchema}
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

export default RegisterModal;
