import { camelCase } from "lodash";
import React, { useState } from "react";
import Button from "../../base-components/Button";
import Dropzone from "../../base-components/Dropzone";
import { CheckCircleOutlined } from "@ant-design/icons";
import Lucide from "../../base-components/Lucide";
import { FormLabel, FormInput, FormSelect } from "../../base-components/Form";
import { componentprops } from "./userType";
import ImageUploading from "react-images-uploading";
import clsx from "clsx";

import ReactS3Client from "react-aws-s3-typescript";

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
    setImageData,
    roleData,
  } = props;
  const [select, setSelect] = useState("");
  const [images, setImages] = useState([]);

  const [isActive, setIsActive] = useState(false);
  // console.log(isActive);

  // let isActive:any = true;

  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    uploadFile(imageList[0].file);
  };
  const s3Config = {
    bucketName: "self-service-final",
    region: "ap-south-1",
    accessKeyId: "AKIATLAFSIFHCO5RKAXM",
    secretAccessKey: "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",
  };
  const uploadFile = async (file: any) => {
    console.log("file========>", file);
    const s3 = new ReactS3Client(s3Config);
    const filename = file.name;
    try {
      const res = await s3.uploadFile(file, filename);
      setImageData(res.location);
      console.log(res);
    } catch (exception) {
      console.log(exception);
    }
  };
  return (
    <>
      {/* BEGIN: Page Layout */}
      {/* <div className="p-5 mt-5 intro-y box">User Registration</div> */}
      <div className="container">
        <div className="grid grid-cols-12 gap-2 mt-3 intro-x">
          <div className="col-span-6">
            <FormLabel htmlFor="vertical-form-1">First Name</FormLabel>
            <FormInput
              id="vertical-form-1"
              value={values.firstName}
              onChange={(e) => setFieldValue("firstName", e.target.value)}
              name="firstName"
              type="text"
              placeholder="First Name"
            />
            <p className="text-danger">
              {touched.firstName && errors.firstName}
            </p>
          </div>
          <div className="col-span-6">
            <FormLabel htmlFor="vertical-form-1">Last Name</FormLabel>
            <FormInput
              id="vertical-form-1"
              value={values.lastName}
              onChange={(e) => setFieldValue("lastName", e.target.value)}
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
              onChange={(e) => setFieldValue("email", e.target.value)}
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
              onChange={(e) => setFieldValue("mobile", e.target.value)}
              name="mobile"
              type="number"
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
                console.log("e", e);
                setFieldValue("gender", e.target.value);
              }}
              name="gender"
              className="w-full"
            >
              <option value={""}>Select Gender</option>
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
              onChange={(e) => setFieldValue("usertype", e.target.value)}
              name="usertype"
              className="w-full"
            >
              {/* <option value="">Select User Type</option> */}
              {roleData.UserType.map((e:any, i:any) => (
                <option value={e.UserTypeName} key={i}>
                  {e.UserTypeName}
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
              onChange={(e) => setFieldValue("company", e.target.value)}
              name="company"
              placeholder="Company"
            />
            <p className="text-danger">{touched.company && errors.company}</p>
          </div>
          <div className="col-span-6">
            <FormLabel htmlFor="vertical-form-1">Role</FormLabel>
            <FormSelect
              value={values.role}
              onChange={(e) => setFieldValue("role", e.target.value)}
              name="role"
              className="w-full"
            >
              <option value="">Select Role</option>
              {roleData.Role.map((e: any) => (
                <option value={e.RoleName} key={e.ID}>
                  {e.RoleName}
                </option>
              ))}
            </FormSelect>
            <p className="text-danger">{touched.role && errors.role}</p>
          </div>
        </div>
        <br />
        <div>
          {/* toggle but */}

          <FormLabel htmlFor="vertical-form-1">Add Profile Picture</FormLabel>
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={69}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <div style={{ display: "inline-flex" }}>
                  <Button
                    variant="primary"
                    className=" mb-2 mr-2"
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    <Lucide icon="Upload" className="w-4 h-4 mr-2" /> Upload
                    Profile
                  </Button>
                  {imageList.map((image, index) => (
                    <div style={{ display: "inline-flex", marginTop: "7px" }}>
                      <p
                        style={{
                          color: "#07966B",
                        }}
                      >
                        Uploaded
                      </p>
                      <CheckCircleOutlined
                        key={index}
                        style={{
                          color: "#07966B",
                          marginTop: "2.5px",
                          marginLeft: "5px",
                        }}
                      />
                    </div>
                  ))}
                </div>
                &nbsp;
              </div>
            )}
          </ImageUploading>
        </div>
        <Button
          variant="primary"
          style={{ float: "right" }}
          onClick={onSubmit}
          className="mt-5 intro-y"
        >
          Add User
        </Button>
      </div>

      {/* checked or disabled */}
      <div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer "
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
          ></input>
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Active
          </span>
        </label>
      </div>
    </>
  );
};

export default AddUser;
