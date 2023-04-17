// import React from "react";
import Button from '../../base-components/Button'
import { FormInline } from '../../base-components/Form'
import Table from '../../base-components/Table'
import Lucide from '../../base-components/Lucide'
import { FormInput, FormSelect } from '../../base-components/Form'
import { useEffect, useState } from 'react'

const TablePagination = (props: any) => {
  const { data, heading } = props

  let previousPage: any, NextPage: any, NextPageTwo: any
  const [search, setSearch] = useState('')
  const [dataPerPage, setDataPerPage] = useState(10)
  const [SelectedPage, setSelectedPage] = useState(1)
  const [shortStatus, setShortStatus] = useState({
    heading: '',
    sorted: false,
  })
  const [displayData, setDisplayData] = useState([])
  const [test, setTest] = useState([])

  // Page Number calculation
  let NumOfPage = 1
  if (data.length > dataPerPage)
    NumOfPage = Math.ceil(data.length / dataPerPage)

  // index value calculation
  const LastIndex = SelectedPage * dataPerPage
  const FirstIndex = LastIndex - dataPerPage
  let filterData = data.slice(FirstIndex, LastIndex)
  // let filterData = data.slice(FirstIndex, LastIndex);

  useEffect(() => {
    setDisplayData(data.slice(FirstIndex, LastIndex))
  }, [SelectedPage, dataPerPage])

  //pagination
  if (SelectedPage !== 1) previousPage = SelectedPage - 1
  if (SelectedPage < NumOfPage) NextPage = SelectedPage + 1
  if (SelectedPage == 1 && SelectedPage + 2 < NumOfPage)
    NextPageTwo = SelectedPage + 2

  let change = (e: any) => {
    setSelectedPage(1)
    setDataPerPage(e)
  }

  // let paramtest;
  let sortFun = (param: any) => {
    // setShortStatus({heading: 'test' })
    console.log(param)

    const sortData = [...displayData].sort((a: any, b: any) => {
      // if (shortStatus.sorted) {
      //   return b.firstName
      //     .toLowerCase()
      //     .localeCompare(a.firstName.toLowerCase());
      // } else {
      //   return a.firstName
      //     .toLowerCase()
      //     .localeCompare(b.firstName.toLowerCase());
      // }
      if (shortStatus.sorted) {
        return b[`${param}`]
          .toLowerCase()
          .localeCompare(a[`${param}`].toLowerCase())
      } else {
        return a[`${param}`]
          .toLowerCase()
          .localeCompare(b[`${param}`].toLowerCase())
      }
    })
    setShortStatus({ heading: param, sorted: !shortStatus.sorted })
    setDisplayData([...sortData])
  }

  // search fuction
  // let searchFun = (param) => {
  //   setSearch(param);
  //   if (search !== "") {
  //     filterData = data.filter(
  //       (e: any) =>
  //         e.firstName.toLowerCase().includes(search) ||
  //         e.lastName.toLowerCase().includes(search) ||
  //         e.mobile.toString().includes(search) ||
  //         e.email.toLowerCase().includes(search) ||
  //         e.gender.toLowerCase().includes(search) ||
  //         e.usertype.toLowerCase().includes(search) ||
  //         e.role.toLowerCase().includes(search) ||
  //         e.lastName.toLowerCase().includes(search)
  //     );
  //   } else {
  //     filterData = data.slice(FirstIndex, LastIndex);
  //   }

  //   // if(search=='')filterData = data.slice(FirstIndex, LastIndex);
  //   setDisplayData(filterData);
  // };

  useEffect(() => {
    if (search !== '') {
      filterData = data.filter(
        (e: any) =>
          e.firstName.toLowerCase().includes(search) ||
          e.lastName.toLowerCase().includes(search) ||
          e.mobile.toString().includes(search) ||
          e.email.toLowerCase().includes(search) ||
          e.gender.toLowerCase().includes(search) ||
          e.usertype.toLowerCase().includes(search) ||
          e.role.toLowerCase().includes(search) ||
          e.lastName.toLowerCase().includes(search),
      )
    } else {
      filterData = data.slice(FirstIndex, LastIndex)
    }
    setDisplayData(filterData)
  }, [search])

  let icontest: any = 'ArrowUp'
  if (shortStatus.sorted) {
    icontest = 'ArrowDown'
  }

  return (
    <div>
      {/* search */}
      <div className="flex flex-wrap items-center col-span-12  intro-y sm:flex-nowrap mt-3 mb-2">
        <Button variant="primary" className="mr-2 shadow-md">
          Add New User
        </Button>

        <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0 lg:ml-auto flex items-center">
          <div className="relative w-56 text-slate-500">
            <FormInput
              type="text"
              className="w-56 pr-10 !box"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <Lucide
              icon="Search"
              className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
            />
          </div>
          <br />
          {/* <div>
              <Button variant="warning" className="mb-2 mr-1">
                <Lucide icon="ClipboardEdit" className="w-5 h-5" />
              </Button>
              <Button variant="danger" className="mb-2 mr-1">
                <Lucide icon="Trash" className="w-5 h-5" />
              </Button>
            </div> */}
        </div>
      </div>

      {/* Pagination*/}
      <div className="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap mt-3 mb-2">
        <div className="w-full sm:w-auto sm:mr-auto flex sm:flex-row sm:flex-nowrap justify-items-center items-center">
          <span
            className="cursor-pointer ml-7"
            onClick={() => setSelectedPage(1)}
          >
            1
          </span>
          <span
            className="cursor-pointer ml-7"
            onClick={() =>
              SelectedPage > 1 && setSelectedPage(SelectedPage - 1)
            }
          >
            <Lucide icon="ChevronsLeft" className="w-4 h-4" />
          </span>
          <span className="cursor-pointer ml-7">...</span>
          {previousPage ? (
            <span
              className="cursor-pointer ml-7"
              onClick={() => setSelectedPage(previousPage)}
            >
              {previousPage}
            </span>
          ) : (
            <></>
          )}
          <span className="cursor-pointer ml-7 p-1 pr-2 pl-2 bg-blue-800 text-white rounded ">
            {SelectedPage}
          </span>
          {NextPage ? (
            <span
              className="cursor-pointer ml-7"
              onClick={() => setSelectedPage(NextPage)}
            >
              {NextPage}
            </span>
          ) : (
            <></>
          )}
          {NextPageTwo ? (
            <span
              className="cursor-pointer ml-7"
              onClick={() => setSelectedPage(NextPageTwo)}
            >
              {NextPageTwo}
            </span>
          ) : (
            <></>
          )}

          <span className="cursor-pointer ml-7">...</span>
          <span className="cursor-pointer ml-7">
            <Lucide
              icon="ChevronsRight"
              className="w-4 h-4"
              onClick={() =>
                SelectedPage < NumOfPage && setSelectedPage(SelectedPage + 1)
              }
            />
          </span>
          <span
            className="cursor-pointer ml-7"
            onClick={() => setSelectedPage(NumOfPage)}
          >
            {NumOfPage}
          </span>

          {/* <Lucide icon="ChevronsRight" className="w-4 h-4" /> */}
        </div>

        <FormSelect
          className="w-20 mt-3 !box sm:mt-0 cursor-pointer"
          // onChange={(e) => setDataPerPage(e.target.value) && setSelectedPage(1) }
          onChange={(e) => change(e.target.value)}
        >
          <option>10</option>
          <option>30</option>
          <option>50</option>
          <option>100</option>
        </FormSelect>
      </div>

      {/* user list */}
      <div className="overflow-x-auto">
        <Table>
          <Table.Thead>
            {heading.map((e: any, i: any) => (
              <Table.Th>
                <Table.Tr
                  className="whitespace-nowrap cursor-pointer flex"
                  onClick={() => sortFun(e?.headingValue)}
                >
                  {e?.heading}
                  <div>
                    {shortStatus.heading == e?.headingValue ? (
                      <Lucide icon={icontest} className="w-4 h-4 text-xs" />
                    ) : (
                      <></>
                    )}
                  </div>
                </Table.Tr>
              </Table.Th>
            ))}

            {/* <Table.Tr/> */}
          </Table.Thead>
          <Table.Tbody>
            {/* {data?.user_test?.map((e, i) => ( */}
            {displayData.map((e: any, i: any) => (
              <Table.Tr key={i}>
                <Table.Td>{e?.firstName}</Table.Td>
                <Table.Td>{e?.lastName}</Table.Td>
                <Table.Td>{e?.mobile}</Table.Td>
                <Table.Td>{e?.email}</Table.Td>
                <Table.Td>{e?.role}</Table.Td>
                <Table.Td>{e?.gender}</Table.Td>
                <Table.Td>{e?.usertype}</Table.Td>
                <Table.Td>
                  <Button variant="primary">Edit</Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>

      {displayData.length == 0 ? (
        <p className="hidden mx-auto md:block text-slate-500  ">
          <p className="flex justify-center mt-10 text-xl">No data found</p>
        </p>
      ) : (
        <></>
      )}
    </div>
  )
}

export default TablePagination
