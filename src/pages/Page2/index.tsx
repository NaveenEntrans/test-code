import React, { useState } from 'react'
import { Formik } from 'formik'
import { useMutation, useQuery } from '@apollo/client'
import AddUser from '../../components/UserSetup/addUser'
import { userSchema } from './userSchema'
import '../../style/commonStyle.css'
import {
  ADD_USER,
  GET_ROLE,
  GET_USERS,
  UPDATE_USER,
} from '../../queries/userQuery'
import { useDispatch, useSelector } from 'react-redux'
import LoadingIcon from '../../base-components/LoadingIcon'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../common/firebaseconfig'
import bcrypt from 'bcryptjs'
import { generatePassword } from '../../utils/commonUtils'
import { logEvent } from 'firebase/analytics'
// import generator from "generate-password";

const Main = () => {
  const [imageData, setImageData] = useState('')
  let buttonName: string
  const navigate = useNavigate()
  const roleName = [
    'Super User',
    'Platform Admin',
    'Platform Manager',
    'Partner Admin',
  ]
  const gender = ['Male', 'Female', 'Others']
  const Usertype = ['Platform', 'Partner']

  let editData: any = useSelector((state: any) => state.editData.editData)

  let dispatch = useDispatch()

  const { loading, error, data } = useQuery(GET_ROLE)

  const [Updateuser, { error: updateError }] = useMutation(UPDATE_USER)
  const [addUser, { error: adduserError }] = useMutation(ADD_USER)

  //Error Handling
  const MobileError =
    'Uniqueness violation. duplicate key value violates unique constraint "User_Mobile_key"'
  const EmailError =
    'Uniqueness violation. duplicate key value violates unique constraint "User_Email_key"'

  // if (adduserError?.message == MobileError || updateError?.message == MobileError )
  // {
  // toast.error("Mobile number already exist");
  // }
  //  else if(adduserError?.message == EmailError || updateError?.message == EmailError)
  // {
  //   toast.error("Email Id already exist");
  // }
  switch (true) {
    case adduserError?.message == MobileError ||
      updateError?.message == MobileError:
      toast.error('Mobile Number already exist')
      break
    case adduserError?.message == EmailError ||
      updateError?.message == EmailError:
      toast.error('Email Id already exist')
      break
    default:
      break
  }
  const createFireBaseUser = async (email: string, Password: string) => {
    await createUserWithEmailAndPassword(auth, email, Password)
      .then((userCredential) => {
        const user = userCredential.user
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }
  interface initTypes {
    FirstName: string
    LastName: string
    Email: string
    password: string
    Mobile: string
    Gender: any
    UserType: string
    Corporate: string
    Role: string
    ProfilePicture: string
    IsActive: boolean
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
      UserType: '',
      Corporate: '',
      Role: '',
      ProfilePicture: '',
      IsActive: true,
    }
    buttonName = 'Add user'
  } else {
    initialValues = editData
    buttonName = 'Submit'
  }

  const formSubmit = (value: any) => {
    // platform not allow for Corporate option
    let CorporateData = value.Corporate
    if (value.UserType == 'Platform') CorporateData = 'None'

    const password = generatePassword(8)
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    console.log('pass==>', password)

    // add user
    value.ProfilePicture = imageData
    if (editData == null) {
      const UserData = {
        Corporate: CorporateData,
        Email: value.Email,
        FirstName: value.FirstName,
        LastName: value.LastName,
        Gender: value.Gender,
        IsActive: value.IsActive,
        ProfilePicture: value.ProfilePicture,
        Role: value.Role,
        UserType: value.UserType,
        CreatedBy: 'bd83dbeb-23c7-46a1-b9f1-6e77953645ad',
        ModifiedBy: 'bd83dbeb-23c7-46a1-b9f1-6e77953645ad',
        RoleID: data?.Role.find((item: any) => item?.RoleName == value?.Role)
          ?.ID,
        UserTypeID: data?.UserType.find(
          (item: any) => item?.UserTypeName == value?.UserType,
        )?.ID,
        Mobile: value.Mobile,
        Password: hashedPassword,
      }

      addUser({
        variables: UserData,
        refetchQueries: [{ query: GET_USERS }],
      }).then(() => {
        createFireBaseUser(value.Email, password)
        navigate('/Home/user-setup')
      })
    } else {
      const UserData = value

      Updateuser({
        variables: UserData,
        refetchQueries: [{ query: GET_USERS }],
      }).then(() => {
        {
          navigate('/Home/user-setup')
        }
      })
    }
  }
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingIcon icon={'oval'} className="w-20" />
      </div>
    )

  if (error) console.log('error====>', error)

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={userSchema}
        onSubmit={(value: initTypes) => {
          formSubmit(value)
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
            Gender={gender}
            UserType={Usertype}
            setImageData={setImageData}
            roleData={data}
            buttonName={buttonName}
          />
        )}
      </Formik>
    </>
  )
}

export default Main
