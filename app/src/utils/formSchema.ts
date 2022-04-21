import * as Yup from 'yup';

export const registerSchema = Yup.object({
  email: Yup.string().email('Please input a valid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const loginSchema = Yup.object({
  email: Yup.string().email('Please input a valid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
  username: Yup.string().required('Username is required'),
});
