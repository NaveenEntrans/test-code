// import React from 'react'
import { useQuery } from "@apollo/client";
import UserList from "../../components/UserSetup/userList";
import { GET_USERS } from "../../queries/userQuery";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../../base-components/LoadingIcon";
import TablePagination from "../../components/Table/TablePagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditData } from "../../redux/editData";
import AddUser from "../../components/UserSetup/addUser";

const Main = () => {
  const navigate = useNavigate();
  let editData = useSelector((state:any) => state.editData.editData);
  let dispatch = useDispatch();

  const { loading, error, data } = useQuery(GET_USERS);

  // const [editData, setEditData] = useState("ok");

  let heading = [
    { heading: "First Name", headingValue: "FirstName" },
    { heading: "Last Name", headingValue: "LastName" },
    { heading: "Phone", headingValue: "Mobile" },
    { heading: "Email", headingValue: "Email" },
    { heading: "Role", headingValue: "no" },
    { heading: "Gender", headingValue: "Gender" },
    { heading: "Usertype", headingValue: "no" },
    { heading: "Action", headingValue: "no" },
  ];

  console.log("state===", editData);

  const editFun = (e: object) => {
    dispatch(setEditData(e));
    navigate("/page-2");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingIcon icon={"oval"} className="w-20" />
      </div>
    );
  if (error) console.log("error====>", error);

  console.log("data :>>", data);
  // const finalData = data.user
  const addUSer = () => {
    navigate("/page-2");
  };

  return (
    // <UserList data={finalData} add={addUSer} />

    <div>
      {/* <AddUser/>       */}
      {typeof data !== "undefined" && (
        <TablePagination
          data={data.User}
          heading={heading}
          addUSer={addUSer}
          editFun={editFun}
        />
      )} 
    </div>
  );
};

export default Main;
