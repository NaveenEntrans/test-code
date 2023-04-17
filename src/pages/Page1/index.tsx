// import React from 'react'
import { useQuery } from "@apollo/client";
import UserList from "../../components/UserSetup/userList";
import { GET_USERS } from "../../queries/userQuery";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../../base-components/LoadingIcon";
import TablePagination from "../../components/Table/TablePagination";

const Main = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_USERS);

  let heading = [
    { heading: "First Name", headingValue: "firstName" },
    { heading: "Last Name", headingValue: "lastName" },
    { heading: "Phone", headingValue: "mobile" },
    { heading: "Email", headingValue: "email" },
    { heading: "Role", headingValue: "role" },
    { heading: "Gender", headingValue: "no" },
    { heading: "Usertype", headingValue: "no" },
    { heading: "Action", headingValue: "no" },
  ];
  // console.log("data===", data);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingIcon icon={"oval"} className="w-20" />
      </div>
    );
  if (error) console.log("error====>", error);

  // console.log("data :>>", data);
  // const finalData = data.user_test
  const addUSer = () => {
    navigate("/page-2");
  };

  return (
    // <UserList data={finalData} add={addUSer} />

    <div>
      <TablePagination data={data.user_test} heading={heading}/>
    </div>
  );
};

export default Main;
