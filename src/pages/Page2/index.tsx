import React from 'react'
import { Formik } from 'formik'
import { useMutation } from '@apollo/client'
import bcrypt from 'bcryptjs'
import AddUser from '../../components/UserSetup/addUser'
import { userSchema } from './userSchema'
import { ADD_USER } from '../../queries/userQuery'
import { generatePassword } from '../../utils/commonUtils'

const Main = () => {
  const roleName = [
    'Super User',
    'Platform Admin',
    'Platform Manager',
    'Partner Admin',
    'Partner Manager',
    'Partner User',
  ]
  const gender = ['Male', 'Female', 'Others']
  const usertype = ['Platform', 'Partner']

  interface initTypes {
    firstName: string
    lastName: string
    email: string
    password: string
    mobile: number
    gender: string
    usertype: string
    company: string
    role: string
  }

  const initialValues: initTypes = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: 0,
    password: '',
    gender: '',
    usertype: '',
    company: '',
    role: '',
  }
  const [addUser, { data }] = useMutation(ADD_USER)

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={userSchema}
        onSubmit={(value: initTypes) => {
          const password = generatePassword(6)
          const salt = bcrypt.genSaltSync(10)
          const hashedPassword = bcrypt.hashSync(password, salt)
          console.log('password :>> ', password)
          console.log('hashedPassword :>> ', hashedPassword)
          // console.log('values OnSubmit :>> ', JSON.stringify(value))

          value.password = hashedPassword
          const UserData = value
          addUser({ variables: UserData })
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
          />
        )}
      </Formik>
    </>
  )
}

export default Main
