import React, { useState } from 'react'
import { Formik } from 'formik'
import { useMutation, useQuery } from '@apollo/client'
import bcrypt from 'bcryptjs'
import AddUser from '../../components/UserSetup/addUser'
import { userSchema } from './userSchema'
import { ADD_USER, GET_ROLE, UPDATE_USER } from '../../queries/userQuery'
// import { UPDATE_USER } from "../../queries/userQuery";
import { generatePassword } from '../../utils/commonUtils'
import { useDispatch, useSelector } from 'react-redux'
import LoadingIcon from '../../base-components/LoadingIcon'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../common/firebaseconfig'
// import { number } from "yup/lib/locale";

const Main = () => {
  const [imageData, setImageData] = useState('')
  const roleName = [
    'Super User',
    'Platform Admin',
    'Platform Manager',
    'Partner Admin',
  ]
  let editData: any = useSelector((state: any) => state.editData.editData)
  let dispatch = useDispatch()

  console.log('state===', editData)

  const createFireBaseUser = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
        // ..
      })
  }
  const gender = ['Male', 'Female', 'Others']
  const usertype = ['Platform', 'Partner']

  interface initTypes {
    FirstName: string
    LastName: string
    Email: string
    password: string
    Mobile: string
    Gender: string
    usertype: string
    company: string
    role: string
    ProfilePicture: string
  }
  let initialValues: initTypes

  if (editData == null) {
    initialValues = {
      FirstName: '',
      LastName: '',
      Email: '',
      Mobile: '',
      password: '',
      Gender: '',
      usertype: '',
      company: '',
      role: '',
      ProfilePicture: '',
    }
  } else {
    initialValues = editData
  }

  const [addUser] = useMutation(ADD_USER)
  const { loading, error, data } = useQuery(GET_ROLE)

  console.log('data====>', data)

  const [Updateuser] = useMutation(UPDATE_USER)

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingIcon icon={'oval'} className="w-20" />
      </div>
    )

  if (error) console.log('error====>', error)

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={userSchema}
        onSubmit={(value: initTypes) => {
          // add user
          if (editData == null) {
            const password = generatePassword(6)
            const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(password, salt)

            console.log('password :>> ', password)
            console.log('hashedPassword :>> ', hashedPassword)
            // console.log('values OnSubmit :>> ', JSON.stringify(value))
            value.ProfilePicture = imageData
            value.password = hashedPassword
            const UserData = value
            addUser({ variables: UserData })

            createFireBaseUser(value.Email, value.password)
          } else {
            // edit data
            console.log('edtu =====', value)
            const UserData = value
            Updateuser({ variables: UserData })
          }
        }}
      >
        {(user) => (
          <AddUser
            values={user.values}
            errors={user.errors}
            touched={user.touched}
            setFieldValue={user.setFieldValue}
            onSubmit={user.submitForm}
            roleName={roleName}
            gender={gender}
            usertype={usertype}
            setImageData={setImageData}
            roleData={data}
          />
        )}
      </Formik>
    </>
  )
}

export default Main
