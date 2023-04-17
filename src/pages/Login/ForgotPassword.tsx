import ForgotPasswordComponent from "../../components/Login/ForgotPasswordComponent";
import { Formik } from "formik";
import * as yup from "yup";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ForgotPassword = () => {
  const navigate = useNavigate()
  const forgotEmail: any = { email: "" };

  const validation = yup.object({
    email: yup.string().email().required("Email is required"),
  });

  const auth = getAuth();

  const formSubmit = (value: any) => {
    console.log(value.email);

    sendPasswordResetEmail(auth, value.email)
      .then(() => {
        // Password reset email sent!
        // toast.success("Email Sent Successfully");
        // ..
        // setInterval(()=>{},3000)
        navigate('/Login')
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);

        // ..
        toast.error("Invalid Email Id");
      });
  };

  return (
    <div>
       <div>
    <ToastContainer />
  </div>
      <Formik
        initialValues={forgotEmail}
        validationSchema={validation}
        onSubmit={formSubmit}
      >
        {(param) => (
          <ForgotPasswordComponent
            values={param.values}
            errors={param.errors}
            touched={param.touched}
            setFieldValue={param.setFieldValue}
            onSubmit={param.submitForm}
          />
        )}
      </Formik>
    </div>
  );
};
