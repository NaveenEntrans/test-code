// import React from 'react'
import { useQuery,  } from "@apollo/client";
import { ENTITY_UER,GET_USERS_SEARCH_COUNT  } from "../../queries/userQuery";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../../base-components/LoadingIcon";
import { useDispatch, useSelector } from "react-redux";
import { setEditData } from "../../redux/editData";
import {  useState } from "react";
import Enity from "../../components/Entity/Enity";


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

// const { loading, error, data } = useQuery(GET_USERS_SEARCH_COUNT, {
//   variables: { search:`%${search}%` , limit, offset },
// });

const { loading, error, data } = useQuery(ENTITY_UER, {
  variables: { search:`%${search}%` , limit, offset },
});

// console.log('Entiy,',a);


// console.log('new api==',a);

// data.User_aggregate.aggregate.count

console.log('count==>',data?.User_aggregate?.aggregate?.count);


let count = data?.User_aggregate?.aggregate?.count




  let heading = [
    { heading: "Logo", headingValue: "Logo" },
    { heading: "City", headingValue: "City" },
    { heading: "State", headingValue: "State" },
    { heading: "Country", headingValue: "Country" },
    { heading: "Address1", headingValue: "Address1" },
    { heading: "Address2", headingValue: "Address2" },
   
  ];


  const editFun = (e: object) => {
    dispatch(setEditData(e));
    navigate("/Home/edit-user");
  };

  console.log("data :>>", data);
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
          <Enity
            data={data?.Entity}
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
