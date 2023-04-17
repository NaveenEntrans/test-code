// import React from 'react'
import { useQuery,  } from "@apollo/client";
import { GET_USERS,GET_USERS_SEARCH_COUNT  } from "../../queries/userQuery";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../../base-components/LoadingIcon";
import TablePagination from "../../components/Table/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import { setEditData } from "../../redux/editData";
import {  useState } from "react";


const Main = () => {
  const navigate = useNavigate();
  let editData = useSelector((state: any) => state.editData.editData);
  let dispatch = useDispatch();

  // const { loading, error, data } = useQuery(GET_USERS, {
  //   fetchPolicy: "no-cache",
  // });

  const [search,setSearch] = useState('')
const [limit,setLimit] = useState(10)
const [offset,setoffset] = useState(0)


console.log('search',search,'limit',limit,'offset',offset);


// let limit = 5 , offset = 0 , search =''

const { loading, error, data } = useQuery(GET_USERS_SEARCH_COUNT, {
  variables: { search:`%${search}%` , limit, offset },
});

// console.log('new api==',a);

// data.User_aggregate.aggregate.count

console.log('count==>',data?.User_aggregate?.aggregate?.count);

// const count:any = data?.User_aggregate?.aggregate?.count

let count = data?.User_aggregate?.aggregate?.count



  let heading = [
    { heading: "First Name", headingValue: "FirstName" },
    { heading: "Last Name", headingValue: "LastName" },
    { heading: "Phone", headingValue: "no" },
    { heading: "Email", headingValue: "Email" },
    { heading: "Role", headingValue: "Role" },
    { heading: "Gender", headingValue: "Gender" },
    { heading: "User Type", headingValue: "UserType" },
    { heading: "Action", headingValue: "no" },
  ];


  const editFun = (e: object) => {
    dispatch(setEditData(e));
    navigate("/Home/edit-user");
  };

  console.log("data :>>", data);
  // const finalData = data.user
  const addUSer = () => {
    dispatch(setEditData(null));
    navigate("/Home/add-user");
  };

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <LoadingIcon icon={"oval"} className="w-20" />
        </div>
      )}
      {typeof data !== "undefined" && (
        <>
          <TablePagination
            data={data?.User}
            heading={heading}
            addUSer={addUSer}
            editFun={editFun}

            setSearch = {setSearch}
            search = {search}

            setLimit={setLimit}

            count = {count}
            limit = {limit}
            offset ={offset}
            setoffset = {setoffset}
           
            
          />
        </>
       )} 
    </div>
  );
};

export default Main;
