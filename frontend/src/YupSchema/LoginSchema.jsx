import * as yup from "yup";

const LoginSchema = yup.object({
    user_email: yup.string().required().matches(/^[a-z]+[0-9]*@[a-z]+\.[a-z]+$/, 'Invalid email'),
    user_password: yup.string().required().min(8).matches(/[a-z0-9A-Z]{8,}/, 'Password must be at least 8 characters and only letters and numbers')
});


export default LoginSchema;
