import React from "react";
import LoadingIcon from "../../base-components/LoadingIcon";
import LoginComponent from "../../components/Login/loginComponent";
// import { useState } from "react";
import { Formik } from "formik";
import { loginValidation } from "../Page2/userSchema";

const Main = () => {
  interface IloginUserData {
    email: string;
    password: string;
  }
  const loginUserData: IloginUserData = { email: "", password: "" };

  return (
    <Formik
      initialValues={loginUserData}
      validationSchema={loginValidation}
      onSubmit={(param) => {
        console.log(param);
      }}
    >
      {(login) => (
        <LoginComponent
          values={login.values}
          errors={login.errors}
          touched={login.touched}
          setFieldValue={login.setFieldValue}
          onSubmit={login.submitForm}
        />
      )}
    </Formik>
  );
};

export default Main;
