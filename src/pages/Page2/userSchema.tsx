import * as yup from "yup";

export const loginValidation = yup.object({
  email: yup.string().email().max(25).required("Email is required"),
  password: yup.string().required("Password  is required"),
});

export const userSchema = yup.object({
  FirstName: yup.string().nullable().max(25).required("First Name is required"),
  LastName: yup.string().nullable().max(25).required("Last Name is required"),
  Email: yup.string().email().max(25).required("Email is required"),
  Mobile: yup.string().min(10).max(10).required("Phone Number is required"),
  Gender: yup.string().max(25).required("Gender is required"),
  UserType: yup.string().max(25).required("User Type is required"),
  Corporate: yup.string().when("UserType", {
    is: (UserType: any) => UserType !== "Platform",
    then: yup.string().max(40).required("Corporate is required"),
    otherwise: yup.string(),
  }),
  Role: yup.string().nullable().max(25).required("Role is required"),
});
