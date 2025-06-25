import * as yup from "yup";

const LoginSchema = yup.object({
    email: yup.string().required().matches(/^[a-z]+[0-9]*@[a-z]+\.[a-z]+$/, 'Invalid email'),
    password: yup.string().required().matches(/^(?=.*[a-z])(?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{8,}$/, 'Password must be at least 8 characters and only letters and numbers'),
});


export default LoginSchema;
