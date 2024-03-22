import React, { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MdMail } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";

import { TbArrowsSort } from "react-icons/tb";

const TableHeader = ({ header, name }) => {
  return (
    <div className="bg-red-40  flex flex-col flex-wrap items-start  gap-x-2 pb-4 text-start text-xs font-semibold text-gray-500">
      <div className="bg-gray-60 flex w-full  items-center justify-start  gap-1">
        <p className="bg-red-20 py-1  text-start text-xs  font-semibold text-gray-500">
          {name}
        </p>

        <TbArrowsSort
          onClick={() => {
            header?.column?.toggleSorting();
          }}
          className="mr-2 cursor-pointer text-gray-600"
          size={15}
        />
      </div>
      <div className="pl-1">
        {
          {
            asc: (
              <img
                src="/caret-square-up.svg "
                className="opacity-40"
                alt=""
                width={13}
              />
            ),
            desc: (
              <img
                src="/caret-square-down.svg "
                className="opacity-40"
                alt=""
                width={13}
              />
            ),
          }[header?.column?.getIsSorted()]
        }
      </div>
    </div>
  );
};

const colHelper = createColumnHelper();
const columns = [
  colHelper.accessor("_id", {
    header: (header) => <TableHeader header={header} name={"ID"} />,
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),
  colHelper.accessor((row) => row, {
    id: "Contact",
    header: (header) => <TableHeader header={header} name={"Contact"} />,
    cell: (props) => (
      <div className="flex flex-col gap-2">
        <div className="flex justify-start gap-2 items-center">
          <MdMail className="text-blue-500" />
          <p className="mr-2">{props.getValue().email}</p>
        </div>
        <div className="flex justify-start gap-2 items-center">
          <MdLocalPhone className="text-blue-500" />
          <p className="mr-2">{props.getValue().phone}</p>
        </div>
      </div>
    ),
  }),

  colHelper.accessor("status", {
    header: (header) => <TableHeader header={header} name={"Status"} />,
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor("assigned_RM", {
    header: (header) => <TableHeader header={header} name={"Assigned RM"} />,
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),
];

const data = [
  {
    _id: "1",
    email: "nishant@gmail.com",
    phone: "1234567890",
    status: "Active",
    assigned_RM: "Nishant",
  },

  {
    _id: "2",
    email: "nishant@gmail.com",
    phone: "1234567890",
    status: "Active",
    assigned_RM: "Nishant",
  },
];

const Table = () => {
  const [sorting, setSorting] = useState([]);

  const state = {
    sorting,
  };

  const table = useReactTable({
    data,
    columns,
    state,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <div>
      <div className="thin-scrollbar bg-white p-3 rounded-sm shadow-md flex h-[28rem] w-full flex-col justify-between overflow-auto">
        <table
          width={table.getTotalSize()}
          className="bg-red-00 w-full text-sm "
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id} className="border-b-2">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id} width={header.column.getSize()}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b-2  text-xs">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    width={cell.column.getSize()}
                    className="py-2"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
