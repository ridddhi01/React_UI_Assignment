
import React, { useState, useEffect } from "react";
import { Loader2, X, Eye, EyeOff } from "lucide-react";

// InputField Component
const InputField = ({
  label,
  placeholder,
  variant = "outlined",
  size = "md",
  error,
  loading,
  disabled,
  clearable,
  type = "text",
  value,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const baseClasses = "w-full transition-all duration-200 rounded-lg text-gray-900 dark:text-gray-100";
  const sizeClasses = {
    sm: "py-1 px-2 text-sm",
    md: "py-2 px-3 text-base",
    lg: "py-3 px-4 text-lg",
  };
  const variantClasses = {
    outlined: `border-2 ${
      isFocused
        ? "border-blue-500 ring-4 ring-blue-500/20"
        : "border-gray-300 dark:border-gray-700"
    } ${disabled ? "bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-gray-950"}`,
    filled: `border-b-2 ${
      isFocused
        ? "border-blue-500"
        : "border-gray-300 dark:border-gray-700"
    } ${disabled ? "bg-gray-100 dark:bg-gray-800" : "bg-gray-100 dark:bg-gray-800"}`,
    ghost: `border-b-2 ${
      isFocused
        ? "border-blue-500"
        : "border-transparent"
    } ${disabled ? "bg-transparent" : "bg-transparent"}`,
  };

  const clearInput = () => {
    if (onChange) {
      onChange({ target: { value: "" } });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="relative">
      <label className="text-gray-700 dark:text-gray-300 text-sm font-medium">
        {label}
      </label>
      <div className="relative flex items-center mt-1">
        <input
          type={inputType}
          placeholder={placeholder}
          className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${
            error ? "border-red-500" : ""
          } focus:outline-none ${type === "password" ? "pr-10" : ""}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled || loading}
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 p-1 rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
        )}
        {loading && (
          <div className="absolute right-3">
            <Loader2 className="animate-spin text-blue-500" size={16} />
          </div>
        )}
        {clearable && value && (
          <button
            onClick={clearInput}
            className="absolute right-3 p-1 rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X size={16} />
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

// DataTable Component
type Row = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const defaultData: Row[] = [
  { id: 1, name: "XYZ", email: "xyz@gmail.com", role: "Admin" },
  { id: 2, name: "PQR", email: "pqr@gmail.com", role: "User" },
  { id: 3, name: "ABC", email: "abc@gmail.com", role: "Manager" },
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


// App Component
function App() {
  const [text, setText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // This function now toggles the loading state on and off
  const handleLoadingToggle = () => {
    setIsLoading(prev => !prev);
  };

  const defaultTableData = [
    { id: 1, name: "XYZ", email: "xyz@gmail.com", role: "Admin" },
    { id: 2, name: "PQR", email: "pqr@gmail.com", role: "User" },
    { id: 3, name: "ABC", email: "abc@gmail.com", role: "Manager" },
  ];

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 transition-colors p-6">
        <div className="space-y-8 w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Input Fields & Data Table ✨
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>

          {/* Input Fields Section */}
          <div className="space-y-10">
            {/* Variants */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Variants
              </h2>
              <InputField label="Outlined" placeholder="Outlined input" variant="outlined" />
              <InputField label="Filled" placeholder="Filled input" variant="filled" />
              <InputField label="Ghost" placeholder="Ghost input" variant="ghost" />
            </div>

            {/* Sizes */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Sizes
              </h2>
              <InputField label="Small" placeholder="Small input" size="sm" />
              <InputField label="Medium" placeholder="Medium input" size="md" />
              <InputField label="Large" placeholder="Large input" size="lg" />
            </div>

            {/* States */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                States
              </h2>
              <InputField label="Disabled" placeholder="Can't type here" disabled />
              <InputField label="Invalid" placeholder="Enter email" error="Invalid email address" />
              <InputField label="Loading" placeholder="Fetching data..." loading />
            </div>

            {/* Extras */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Extras
              </h2>
              <InputField
                label="Clearable Input"
                placeholder="Type and clear"
                value={text}
                onChange={(e) => setText(e.target.value)}
                clearable
              />
              <InputField label="Password Input" placeholder="Enter password" type="password" />
            </div>
          </div>

          {/* Data Table Section  */}
          <div className="space-y-8 pt-10">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Data Table Features
            </h2>
            
            {/* Display Tabular Data & Sorting & Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Display, Sorting, and Selection
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                
              </p>
              <DataTable data={defaultTableData} />
            </div>

            {/* Loading State */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Loading State
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click the button below to toggle the loading indicator.
              </p>
              <button
                onClick={handleLoadingToggle}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  isLoading
                    ? "bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600"
                    : "bg-blue-500 text-white hover:bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                }`}
              >
                {isLoading ? "Turn Off Loading" : "Turn On Loading"}
              </button>
              <DataTable isLoading={isLoading} />
            </div>

            {/* Empty State */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Empty State
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                
              </p>
              <DataTable data={[]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
