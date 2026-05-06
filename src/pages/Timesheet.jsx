import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useMemo, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function Timesheets() {
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const data = useMemo(
    () => [
      { week: 1, date: "1 - 5 January, 2024", status: "Completed" },
      { week: 2, date: "8 - 12 January, 2024", status: "Completed" },
      { week: 3, date: "15 - 19 January, 2024", status: "Incomplete" },
      { week: 4, date: "22 - 26 January, 2024", status: "Completed" },
      { week: 5, date: "28 January - 1 February, 2024", status: "Missing" },
      { week: 6, date: "5 - 9 February, 2024", status: "Completed" },
      { week: 7, date: "12 - 16 February, 2024", status: "Incomplete" },
      { week: 8, date: "19 - 23 February, 2024", status: "Completed" },
    ],
    [],
  );



  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const statusMatch = statusFilter ? item.status === statusFilter : true;

      const dateMatch = dateFilter
        ? item.date.toLowerCase().includes(dateFilter.toLowerCase())
        : true;

      return statusMatch && dateMatch;
    });
  }, [data, statusFilter, dateFilter]);

  const statusStyle = {
    Completed: "bg-green-100 text-green-700",
    Incomplete: "bg-yellow-100 text-yellow-700",
    Missing: "bg-pink-100 text-pink-600",
  };

  const columns = useMemo(
    () => [
      {
        header: "Week #",
        accessorKey: "week",
      },
      {
        header: "Date",
        accessorKey: "date",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue }) => {
          const value = getValue();
          return (
            <span
              className={`px-2 py-[2px] text-[11px] font-medium rounded ${statusStyle[value]}`}
            >
              {value.toUpperCase()}
            </span>
          );
        },
      },
      {
        header: "Actions",
        cell: ({ row }) => {
          const status = row.original.status;

          return (
            <span
              onClick={() =>
                navigate("/timesheetDetails", { state: row.original })
              }
              className="text-blue-600 font-medium cursor-pointer hover:underline"
            >
              {status === "Missing"
                ? "Create"
                : status === "Incomplete"
                  ? "Update"
                  : "View"}
            </span>
          );
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    navigate("/");
  }
}, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f6f8]">
      <div className="flex-1 px-4 py-6 md:px-8">
        <div className="max-w-[960px] mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-[16px] font-semibold mb-4">Your Timesheets</h2>

          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <select
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setPagination((prev) => ({ ...prev, pageIndex: 0 }));
              }}
              className="border border-gray-300 px-3 py-1.5 rounded-md text-sm bg-white"
            >
              <option value="">All Dates</option>
              <option value="January">January</option>
              <option value="February">February</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPagination((prev) => ({ ...prev, pageIndex: 0 }));
              }}
              className="border border-gray-300 px-3 py-1.5 rounded-md text-sm bg-white"
            >
              <option value="">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Incomplete">Incomplete</option>
              <option value="Missing">Missing</option>
            </select>

            <button
              onClick={() => {
                setStatusFilter("");
                setDateFilter("");
                setPagination((prev) => ({ ...prev, pageIndex: 0 }));
              }}
              className="flex items-center gap-2 border border-blue-500 text-blue-600 px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-50 transition"
            >
              Reset
            </button>
          </div>

          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="min-w-[650px] w-full text-[13px]">
                <thead className="bg-[#f1f3f5] text-gray-600 uppercase text-[11px]">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header, index) => (
                        <th
                          key={header.id}
                          className={`px-4 py-2 whitespace-nowrap ${
                            index === headerGroup.headers.length - 1
                              ? "text-right"
                              : "text-left"
                          }`}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody>
                  {table.getPaginationRowModel().rows.map((row) => (
                    <tr key={row.id} className="border-t border-gray-200">
                      {row.getVisibleCells().map((cell, index) => (
                        <td
                          key={cell.id}
                          className={`px-4 py-2.5 whitespace-nowrap ${
                            index === row.getVisibleCells().length - 1
                              ? "text-right"
                              : "text-left"
                          }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell ??
                              cell.column.columnDef.accessorKey,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm">
            <select
              value={pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="border border-gray-300 px-3 py-1.5 rounded-md"
            >
              {[5, 10, 20].map((size) => (
                <option key={size} value={size}>
                  {size} per page
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>

              {Array.from({ length: table.getPageCount() }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => table.setPageIndex(i)}
                  className={`px-3 py-1 border rounded ${
                    pagination.pageIndex === i ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
