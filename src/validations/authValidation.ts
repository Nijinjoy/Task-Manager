import * as yup from 'yup'

export const loginSchema=yup.object().shape({
    email:yup.string().email('Invalid email').required('Email is required'),
    password:yup.string().min(6,'Minimum 6 characters').required('Password is required'),
})

export const registerSchema = yup.object().shape({
    fullName: yup.string().required('Full name is required'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Minimum 8 characters')
      .max(20, 'Maximum 20 characters')
      .matches(/[A-Z]/, 'At least one uppercase letter')
      .matches(/\d/, 'At least one number')
      .matches(/[!@#$%^&*]/, 'At least one special character'),
  });
