import * as yup from "yup";

const ChangePasswordSchema = yup.object({
    new_password: yup.string().required().matches(/^(?=.*[a-z])(?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{8,}$/, 'Password must be at least 8 characters and only letters and numbers'),
    confirm_password: yup.string().oneOf([yup.ref("new_password"), null], "Password must match")
});


export default ChangePasswordSchema;
