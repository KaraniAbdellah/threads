import * as yup from "yup";

const UpdateUserInfoSchema = yup.object({
  new_user_name: yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9]{6,}$/, "username must be at least 6 characters"),
  new_email: yup
    .string()
    .required()
    .matches(/^[a-z]+[0-9]*@[a-z]+\.[a-z]+$/, "Invalid email"),
  new_password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{8,}$/,
      "Password must be at least 8 characters and only letters and numbers"
    ),
});
export default UpdateUserInfoSchema;
