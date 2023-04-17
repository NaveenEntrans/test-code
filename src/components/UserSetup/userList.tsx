import _ from "lodash";
import clsx from "clsx";
import { useState, useRef } from "react";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormInput, FormSelect } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import { Dialog, Menu } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import DataTable from "react-data-table-component";
const UserList = (props: any) => {
  const { add, data } = props;
  console.log("add :>> ", add);
  const column = [
    {
      name: "First Name",
      selector: (row: any) => row.firstName,
      sortable: true,
      sortField: "firstName",
    },
    {
      name: "Last Name",
      selector: (row: any) => row.lastName,
      sortable: true,
      sortField: "lastName",
    },
    {
      name: "Phone",
      selector: (row: any) => row.mobile,
      sortable: true,
      sortField: "mobile",
    },
    {
      name: "Email",
      selector: (row: any) => row.email,
      sortable: true,
      sortField: "email",
    },
    {
      name: "Gender",
      selector: (row: any) => row.gender,
      sortable: true,
      sortField: "gender",
    },
    {
      name: "Role",
      selector: (row: any) => row.role,
      sortable: true,
      sortField: "role",
    },
    {
      name: "User Type",
      selector: (row: any) => row.usertype,
      sortable: true,
      sortField: "usertype",
    },
  ];
  const [search, setSearch] = useState("");
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };
  const handleChange = (data: any) => {
    console.log("data", data);
  };
  const filteredData = data.filter((item: any) => {
    return Object.values(item).some((val: any) => {
      return (
        (typeof val === "string" &&
          val.toLowerCase().includes(search.toLowerCase())) ||
        (typeof val === "number" && val.toString().includes(search))
      );
    });
  });
  console.log("search :>> ", search);
  console.log("filteredData :>> ", filteredData);
  return (
    <>
      <br />
      <div className="grid grid-cols-12 gap-6 ">
        {/* =============== */}
        <div className="flex flex-wrap items-center col-span-12  intro-y sm:flex-nowrap">
          <Button variant="primary" className="mr-2 shadow-md" onClick={add}>
            Add New User
          </Button>

          <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0 lg:ml-auto flex items-center">
            <div className="relative w-56 text-slate-500">
              <FormInput
                type="text"
                className="w-56 pr-10 !box"
                placeholder="Search..."
                onChange={handleSearch}
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
        {/* =================== */}
      </div>
      <br />
      <div className="flex justify-end ">
        <Button variant="warning" className="mb-2 mr-1">
          <Lucide icon="ClipboardEdit" className="w-5 h-5" />
        </Button>
        <Button variant="danger" className="mb-2 mr-1 ml-2">
          <Lucide icon="Trash" className="w-5 h-5" />
        </Button>
      </div>
      <DataTable
        columns={column}
        data={filteredData}
        pagination
        paginationPerPage={5}
        paginationComponentOptions={{ noRowsPerPage: true }}
        selectableRows
        onSelectedRowsChange={handleChange}
      />
    </>
  );
};

export default UserList;
