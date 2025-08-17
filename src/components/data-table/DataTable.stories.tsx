
import React, { useState, useEffect } from "react";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loader2 } from "lucide-react";

type Row = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const defaultData: Row[] = [
  { id: 1, name: "riddhi", email: "alice@mail.com", role: "Admin" },
  { id: 2, name: "Bob", email: "bob@mail.com", role: "User" },
  { id: 3, name: "Charlie", email: "charlie@mail.com", role: "Manager" },
  { id: 4, name: "Diana", email: "diana@mail.com", role: "User" },
  { id: 5, name: "Ethan", email: "ethan@mail.com", role: "Admin" },
];

type DataTableProps = {
  data?: Row[];
  isLoading?: boolean;
};

const DataTable: React.FC<DataTableProps> = ({
  data = defaultData,
  isLoading = false,
}) => {
  const [tableData, setTableData] = useState<Row[]>(data);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof Row>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    setTableData(data);
    setSelectedRows([]);
    setSortColumn("id");
    setSortDirection("asc");
  }, [data]);

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const sortData = (column: keyof Row) => {
    const direction =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(direction);
    const sorted = [...tableData].sort((a, b) => {
      if (a[column] < b[column]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    setTableData(sorted);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
      {isLoading ? (
        <div className="p-6 flex justify-center items-center h-48">
          <Loader2 className="animate-spin text-blue-500" size={32} />
        </div>
      ) : tableData.length === 0 ? (
        <div className="p-6 text-center text-gray-500 dark:text-gray-400 h-48 flex justify-center items-center">
          No data available
        </div>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows.length === tableData.length}
                  onChange={() => {
                    if (selectedRows.length === tableData.length) {
                      setSelectedRows([]);
                    } else {
                      setSelectedRows(tableData.map((row) => row.id));
                    }
                  }}
                />
              </th>
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
            {tableData.map((row) => (
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


const meta: Meta<typeof DataTable> = {
  title: 'Components/Data Display/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'An array of data objects to be displayed in the table.',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the table is in a loading state.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'DataTable is a component for displaying tabular data with features like sorting and row selection.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  args: {
    data: [
      { id: 1, name: "Alice", email: "alice@mail.com", role: "Admin" },
      { id: 2, name: "Bob", email: "bob@mail.com", role: "User" },
      { id: 3, name: "Charlie", email: "charlie@mail.com", role: "Manager" },
      { id: 4, name: "Diana", email: "diana@mail.com", role: "User" },
      { id: 5, name: "Ethan", email: "ethan@mail.com", role: "Admin" },
    ],
    isLoading: false,
  },
};

// emptystate
export const EmptyState: Story = {
  args: {
    data: [],
  },
  parameters: {
    docs: {
      description: {
        story: "This shows the table when no data is available.",
      },
    },
  },
};


// loadingstate
export const LoadingState: Story = {
  args: {
    data: [],
    isLoading: true,
  },
};
