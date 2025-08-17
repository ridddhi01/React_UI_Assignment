
import React, { useState } from "react";
import { Loader2 } from "lucide-react";

type Row = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const initialData: Row[] = [
  { id: 1, name: "XYZ", email: "xyz@gmail.com", role: "Admin" },
  { id: 2, name: "PQR", email: "pqr@gmail.com", role: "User" },
  { id: 3, name: "ABC", email: "abc@gmail.com", role: "Manager" },
];

const DataTable = () => {
  const [data, setData] = useState<Row[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof Row>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
    );
  };

  const sortData = (column: keyof Row) => {
    const direction =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(direction);
    const sorted = [...data].sort((a, b) =>
      a[column] < b[column] ? (direction === "asc" ? -1 : 1) : a[column] > b[column] ? (direction === "asc" ? 1 : -1) : 0
    );
    setData(sorted);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
      {loading ? (
        <div className="p-6 flex justify-center items-center">
          <Loader2 className="animate-spin text-blue-500" size={24} />
        </div>
      ) : data.length === 0 ? (
        <div className="p-6 text-center text-gray-500 dark:text-gray-400">
          No data available
        </div>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="p-3 text-left">Select</th>
              {["id", "name", "email", "role"].map((col) => (
                <th
                  key={col}
                  className="p-3 text-left cursor-pointer hover:underline"
                  onClick={() => sortData(col as keyof Row)}
                >
                  {col.toUpperCase()}{" "}
                  {sortColumn === col && (sortDirection === "asc" ? "⬆️" : "⬇️")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((row) => (
              <tr
                key={row.id}
                className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  selectedRows.includes(row.id)
                    ? "bg-blue-50 dark:bg-blue-900/40"
                    : ""
                }`}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => toggleRow(row.id)}
                  />
                </td>
                <td className="p-3">{row.id}</td>
                <td className="p-3">{row.name}</td>
                <td className="p-3">{row.email}</td>
                <td className="p-3">{row.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DataTable;

