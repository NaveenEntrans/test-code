import * as yup from "yup";

export const loginValidation = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(8).required("password  is required"),
});

export const userSchema = yup.object({
  firstName: yup.string().nullable().required("First Name is required"),
  lastName: yup.string().nullable().required("Last Name is required"),
  email: yup.string().email().required("Email is required"),
  mobile: yup.string().min(10).required("Phone Number is required"),
  gender: yup.string().nullable().required("Gender is required"),
  usertype: yup.string().nullable().required("User Type is required"),
  company: yup.string().nullable().required("Company is required"),
  role: yup.string().nullable().required("Role is required"),
});
