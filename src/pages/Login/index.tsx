import React from 'react'
import LoadingIcon from '../../base-components/LoadingIcon'
import LoginComponent from '../../components/Login/loginComponent'
// import { useState } from "react";
import { Formik } from 'formik'
import { loginValidation } from '../Page2/userSchema'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../common/firebaseconfig'

const Main = () => {
  interface IloginUserData {
    email: string
    password: string
  }
  const loginUserData: IloginUserData = { email: '', password: '' }
  const signIn = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      console.log('response', response)
      localStorage.setItem('JWT_TOKEN', JSON.stringify(response))
    } catch (e) {
      console.log('e', e)
    }
  }

  return (
    <Formik
      initialValues={loginUserData}
      validationSchema={loginValidation}
      onSubmit={(param) => {
        console.log(param)
        signIn(param.email, param.password)
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
  )
}

export default Main
