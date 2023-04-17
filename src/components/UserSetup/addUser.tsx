import { camelCase } from 'lodash'
import React, { useState } from 'react'
import Button from '../../base-components/Button'
import Dropzone from '../../base-components/Dropzone'
import { FormLabel, FormInput, FormSelect } from '../../base-components/Form'
import { componentprops } from './userType'

const AddUser = (props: componentprops) => {
  const {
    values,
    errors,
    onSubmit,
    touched,
    setFieldValue,
    roleName,
    gender,
    usertype,
  } = props
  const [select, setSelect] = useState('')
  return (
    <>
      {/* BEGIN: Page Layout */}
      <div className="p-5 mt-5 intro-y box">User Registration</div>
      <div className="container">
        <div className="grid grid-cols-12 gap-2 mt-3 intro-x">
          <div className="col-span-6">
            <FormLabel htmlFor="vertical-form-1">First Name</FormLabel>
            <FormInput
              id="vertical-form-1"
              value={values.firstName}
              onChange={(e) => setFieldValue('firstName', e.target.value)}
              name="firstName"
              type="text"
              placeholder="First Name"
            />
            <p className="text-danger">
              {/* {touched.firstName && errors.firstName} */}
            </p>
          </div>
          <div className="col-span-6">
            <FormLabel htmlFor="vertical-form-1">Last Name</FormLabel>
            <FormInput
              id="vertical-form-1"
              value={values.lastName}
              onChange={(e) => setFieldValue('lastName', e.target.value)}
              name="lastName"
              type="text"
              placeholder="Last Name"
            />
            <p className="text-danger">{touched.lastName && errors.lastName}</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-2 mt-3 intro-x">
          <div className="col-span-6">
            <FormLabel htmlFor="vertical-form-1">Email</FormLabel>
            <FormInput
              id="vertical-form-1"
              name="email"
              value={values.email}
              onChange={(e) => setFieldValue('email', e.target.value)}
              type="text"
              placeholder="Email"
            />
            <p className="text-danger">{touched.email && errors.email}</p>
          </div>

          <div className="col-span-6">
            <FormLabel htmlFor="vertical-form-1">Mobile Number</FormLabel>
            <FormInput
              id="vertical-form-1"
              value={values.mobile}
              onChange={(e) => setFieldValue('mobile', e.target.value)}
              name="mobile"
              type="text"
              placeholder="Phone Number"
            />
            <p className="text-danger">{touched.mobile && errors.mobile}</p>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 mt-3 intro-x">
          <div className="col-span-6">
            <FormLabel htmlFor="vertical-form-1">Gender</FormLabel>
            <FormSelect
              value={values.gender}
              onChange={(e) => {
                console.log('e', e)
                setFieldValue('gender', e.target.value)
              }}
              name="gender"
              className="w-full"
            >
              <option value={''}>Select Gender</option>
              {gender.map((e, i) => (
                <option value={e} key={i}>
                  {e}
                </option>
              ))}
            </FormSelect>
            <p className="text-danger">{touched.gender && errors.gender}</p>
          </div>
          <div className="col-span-6">
            <FormLabel htmlFor="vertical-form-1">User Type</FormLabel>
            <FormSelect
              value={values.usertype}
              onChange={(e) => setFieldValue('usertype', e.target.value)}
              name="usertype"
              className="w-full"
            >
              <option value="">Select User Type</option>
              {usertype.map((e, i) => (
                <option value={camelCase(e)} key={i}>
                  {e}
                </option>
              ))}
            </FormSelect>
            <p className="text-danger">{touched.usertype && errors.usertype}</p>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 mt-3 intro-x">
          <div className="col-span-6">
            <FormLabel htmlFor="vertical-form-1">Corporate </FormLabel>
            <FormInput
              id="vertical-form-1"
              type="text"
              value={values.company}
              onChange={(e) => setFieldValue('company', e.target.value)}
              name="company"
              placeholder="Company"
            />
            <p className="text-danger">{touched.company && errors.company}</p>
          </div>
          <div className="col-span-6">
            <FormLabel htmlFor="vertical-form-1">Role</FormLabel>
            <FormSelect
              value={values.role}
              onChange={(e) => setFieldValue('role', e.target.value)}
              name="role"
              className="w-full"
            >
              <option value="">Select Role</option>
              {roleName.map((e, i) => (
                <option value={camelCase(e)} key={i}>
                  {e}
                </option>
              ))}
            </FormSelect>
            <p className="text-danger">{touched.role && errors.role}</p>
          </div>
        </div>
        <div>
          <Dropzone
            getRef={(el: any) => {
              // console.log('el :>> ', el)
            }}
            options={{
              url: 'https://httpbin.org/post',
              thumbnailWidth: 150,
              maxFilesize: 0.5,
              maxFiles: 1,
              headers: { 'My-Awesome-Header': 'header value' },
            }}
            className="dropzone"
          >
            <div className="text-lg font-medium">
              Drop files here or click to upload.
            </div>
            <div className="text-gray-600">
              This is just a demo dropzone. Selected files are
              <span className="font-medium">not</span> actually uploaded.
            </div>
          </Dropzone>
        </div>
        <Button
          variant="primary"
          style={{ float: 'right' }}
          onClick={onSubmit}
          className="mt-5 intro-y"
        >
          Add User
        </Button>
      </div>
      {/* END: Page Layout */}
    </>
  )
}

export default AddUser
