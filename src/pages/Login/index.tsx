import React, { useState } from 'react'
import LoadingIcon from '../../base-components/LoadingIcon'
import LoginComponent from '../../components/Login/loginComponent'
// import { useState } from "react";
import { Formik } from 'formik'
import { loginValidation } from '../Page2/userSchema'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../common/firebaseconfig'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthenticationData } from '../../redux/authenticationSlice'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
  const [Loader,setLoader] = useState(false);
  const navigate = useNavigate()
  let authdata: any = useSelector(
    (state: any) => state.authentication.authenticationData,
  )
  // console.log('authdata', authdata)
  localStorage.setItem('authLocalData', JSON.stringify(false))

  let dispatch = useDispatch()

  interface IloginUserData {
    email: string
    password: string
  }
  const loginUserData: IloginUserData = { email: '', password: '' }

  const signIn = async (email: string, password: string) => {
    setLoader(true);
    try {
      const response: any = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )

      const Token = response.user.accessToken

      if (Token !== '') {
        dispatch(setAuthenticationData(true))
      }
      setLoader(true);
      console.log('jwt====>Token', response)

      localStorage.setItem('jwtToken', JSON.stringify(Token))

      navigate('/Home/user-setup')
    } catch (e) {
      // console.log('e', e)
      setLoader(false);
     toast.error("Invalid Email or Password");
    }
  }
// console.log("loader====>",Loader);
  return (
    <div>
  
  <div>
    <ToastContainer />
  </div>

    <Formik
      initialValues={loginUserData}
      validationSchema={loginValidation}
      onSubmit={(param) => {
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

          loading ={Loader}
        />
      )}
    </Formik>
        
    </div>
  )
}



export default Main
