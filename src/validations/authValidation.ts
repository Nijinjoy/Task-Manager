import * as yup from 'yup'

export const loginSchema=yup.object().shape({
    email:yup.string().email('Invalid email').required('Email is required'),
    password:yup.string().min(6,'Minimum 6 characters').required('Password is required'),
})

export const registerSchema=yup.object().shape({
    fullName:yup.string().required('Full name is required'),
    email:yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm Password is required'),
})
