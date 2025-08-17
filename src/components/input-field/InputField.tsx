// import * as React from "react"
// import { cva, type VariantProps } from "class-variance-authority"
// import { cn } from "../../lib/cn"

// const inputStyles = cva(
//   "w-full rounded-md transition-all placeholder:text-gray-400 focus-ring disabled:opacity-60 disabled:cursor-not-allowed",
//   {
//     variants: {
//       variant: {
//         filled:
//           "bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500",
//         outlined:
//           "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:border-blue-500",
//         ghost:
//           "bg-transparent border border-transparent focus:border-blue-500",
//       },
//       size: {
//         sm: "text-sm px-3 py-2",
//         md: "text-base px-3.5 py-2.5",
//         lg: "text-lg px-4 py-3",
//       },
//       invalid: {
//         true: "border-red-500 focus-visible:ring-red-500",
//       },
//       loading: {
//         true: "pr-10",
//       },
//     },
//     defaultVariants: {
//       variant: "outlined",
//       size: "md",
//     },
//   }
// )

// export interface InputFieldProps
//   extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange">,
//     VariantProps<typeof inputStyles> {
//   value?: string
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
//   label?: string
//   helperText?: string
//   errorMessage?: string
//   invalid?: boolean
//   canClear?: boolean
//   canTogglePassword?: boolean
//   loading?: boolean
// }

// export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
//   function InputField(
//     {
//       id,
//       label,
//       placeholder,
//       helperText,
//       errorMessage,
//       disabled,
//       invalid,
//       variant,
//       size,
//       value,
//       onChange,
//       type = "text",
//       canClear,
//       canTogglePassword,
//       loading,
//       className,
//       ...rest
//     },
//     ref
//   ) {
//     const [internal, setInternal] = React.useState(value ?? "")
//     const isControlled = value !== undefined
//     const currentValue = isControlled ? value! : internal

//     React.useEffect(() => {
//       if (isControlled) setInternal(value!)
//     }, [isControlled, value])

//     const [showPassword, setShowPassword] = React.useState(false)
//     const inputId = id ?? React.useId()
//     const describedById = React.useId()

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       if (!isControlled) setInternal(e.target.value)
//       onChange?.(e)
//     }

//     const handleClear = () => {
//       const ev = { target: { value: "" } } as unknown as React.ChangeEvent<HTMLInputElement>
//       if (!isControlled) setInternal("")
//       onChange?.(ev)
//     }

//     const effectiveType =
//       canTogglePassword && type === "password"
//         ? showPassword
//           ? "text"
//           : "password"
//         : type

//     const showError = !!errorMessage && (invalid ?? true)

//     return (
//       <div className={cn("w-full", disabled && "opacity-60")}>
//         {label && (
//           <label
//             htmlFor={inputId}
//             className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
//           >
//             {label}
//           </label>
//         )}

//         <div className="relative">
//           <input
//             ref={ref}
//             id={inputId}
//             placeholder={placeholder}
//             value={currentValue}
//             onChange={handleChange}
//             aria-invalid={invalid || undefined}
//             aria-describedby={helperText || showError ? describedById : undefined}
//             disabled={disabled}
//             className={cn(
//               inputStyles({ variant, size, invalid, loading }),
//               className,
//               showError && "border-red-500"
//             )}
//             type={effectiveType}
//             {...rest}
//           />

//           {/* Clear Button */}
//           {canClear && currentValue && !disabled && (
//             <button
//               type="button"
//               onClick={handleClear}
//               aria-label="Clear input"
//               className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 focus-ring"
//             >
//               ×
//             </button>
//           )}

//           {/* Password Toggle */}
//           {canTogglePassword && type === "password" && (
//             <button
//               type="button"
//               onClick={() => setShowPassword((s) => !s)}
//               aria-label={showPassword ? "Hide password" : "Show password"}
//               className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 focus-ring"
//             >
//               {showPassword ? "🙈" : "👁️"}
//             </button>
//           )}

//           {/* Loading Spinner */}
//           {loading && (
//             <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
//           )}
//         </div>

//         {(helperText || showError) && (
//           <p
//             id={describedById}
//             className={cn(
//               "mt-1 text-xs",
//               showError ? "text-red-600" : "text-gray-500 dark:text-gray-400"
//             )}
//           >
//             {showError ? errorMessage : helperText}
//           </p>
//         )}
//       </div>
//     )
//   }
// )





// import React from "react";
// import { X, Eye, EyeOff, Loader2 } from "lucide-react";

// type InputFieldProps = {
//   label?: string;
//   placeholder?: string;
//   value?: string;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   type?: "text" | "password" | "email";
//   variant?: "outlined" | "filled" | "ghost";
//   size?: "sm" | "md" | "lg";
//   disabled?: boolean;
//   error?: string;
//   loading?: boolean;
//   clearable?: boolean;
// };

// const InputField: React.FC<InputFieldProps> = ({
//   label,
//   placeholder,
//   value,
//   onChange,
//   type = "text",
//   variant = "outlined",
//   size = "md",
//   disabled = false,
//   error,
//   loading,
//   clearable,
// }) => {
//   const [showPassword, setShowPassword] = React.useState(false);

//   const baseClasses =
//     "w-full rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400";

//   const sizeClasses = {
//     sm: "px-3 py-1 text-sm",
//     md: "px-4 py-2 text-base",
//     lg: "px-5 py-3 text-lg",
//   }[size];

//   const variantClasses = {
//     outlined: "border border-gray-300 focus:border-blue-500",
//     filled: "bg-gray-100 border border-gray-200 focus:border-blue-500",
//     ghost: "bg-transparent border-b border-gray-300 focus:border-blue-500",
//   }[variant];

//   return (
//     <div className="flex flex-col space-y-1 w-full max-w-md">
//       {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
//       <div className="relative">
//         <input
//           type={type === "password" && showPassword ? "text" : type}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           disabled={disabled}
//           className={`${baseClasses} ${sizeClasses} ${variantClasses} pr-10`}
//         />

//         {/* Clear button */}
//         {clearable && value && !loading && (
//           <button
//             type="button"
//             onClick={() => onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)}

//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//           >
//             <X size={16} />
//           </button>
//         )}

//         {/* Password toggle */}
//         {type === "password" && !loading && (
//           <button
//             type="button"
//             onClick={() => setShowPassword((prev) => !prev)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//           >
//             {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//           </button>
//         )}

//         {/* Loader */}
//         {loading && (
//           <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-blue-500" size={18} />
//         )}
//       </div>
//       {error && <span className="text-sm text-red-500">{error}</span>}
//     </div>
//   );
// };

// export default InputField;



// import React from "react";
// import { X, Eye, EyeOff, Loader2 } from "lucide-react";

// type InputFieldProps = {
//   label?: string;
//   placeholder?: string;
//   value?: string;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   type?: "text" | "password" | "email";
//   variant?: "outlined" | "filled" | "ghost";
//   size?: "sm" | "md" | "lg";
//   disabled?: boolean;
//   error?: string;
//   loading?: boolean;
//   clearable?: boolean;
// };

// const InputField: React.FC<InputFieldProps> = ({
//   label,
//   placeholder,
//   value,
//   onChange,
//   type = "text",
//   variant = "outlined",
//   size = "md",
//   disabled = false,
//   error,
//   loading,
//   clearable,
// }) => {
//   const [showPassword, setShowPassword] = React.useState(false);

//   const baseClasses =
//     "w-full rounded-2xl transition-all focus:outline-none disabled:bg-gray-100 disabled:text-gray-400 shadow-sm";

//   const sizeClasses = {
//     sm: "px-3 py-2 text-sm",
//     md: "px-4 py-2 text-base",
//     lg: "px-5 py-3 text-lg",
//   }[size];

//   const variantClasses = {
//     outlined:
//       "border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-500",
//     filled:
//       "bg-blue-50 border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:bg-blue-100",
//     ghost:
//       "bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:ring-0 hover:border-blue-400",
//   }[variant];

//   return (
//     <div className="flex flex-col space-y-1 w-full max-w-md">
//       {label && (
//         <label className="text-sm font-semibold text-gray-700">
//           {label}
//         </label>
//       )}
//       <div className="relative">
//         <input
//           type={type === "password" && showPassword ? "text" : type}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           disabled={disabled}
//           className={`${baseClasses} ${sizeClasses} ${variantClasses} pr-12`}
//         />

//         {/* Clear button */}
//         {clearable && value && !loading && (
//           <button
//             type="button"
//             onClick={() =>
//               onChange?.({
//                 target: { value: "" },
//               } as React.ChangeEvent<HTMLInputElement>)
//             }
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
//           >
//             <X size={18} />
//           </button>
//         )}

//         {/* Password toggle */}
//         {type === "password" && !loading && (
//           <button
//             type="button"
//             onClick={() => setShowPassword((prev) => !prev)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
//           >
//             {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//           </button>
//         )}

//         {/* Loader */}
//         {loading && (
//           <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-blue-500" size={18} />
//         )}
//       </div>
//       {error && <span className="text-sm text-red-500 font-medium">{error}</span>}
//     </div>
//   );
// };

// export default InputField;


// import React from "react";
// import { X, Eye, EyeOff, Loader2 } from "lucide-react";

// type InputFieldProps = {
//   label?: string;
//   placeholder?: string;
//   value?: string;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   type?: "text" | "password" | "email";
//   variant?: "outlined" | "filled" | "ghost";
//   size?: "sm" | "md" | "lg";
//   disabled?: boolean;
//   error?: string;
//   loading?: boolean;
//   clearable?: boolean;
// };

// const InputField: React.FC<InputFieldProps> = ({
//   label,
//   placeholder,
//   value,
//   onChange,
//   type = "text",
//   variant = "outlined",
//   size = "md",
//   disabled = false,
//   error,
//   loading,
//   clearable,
// }) => {
//   const [showPassword, setShowPassword] = React.useState(false);

//   const baseClasses =
//     "w-full rounded-2xl transition-all focus:outline-none disabled:bg-gray-100 disabled:text-gray-400 dark:disabled:bg-gray-800 dark:disabled:text-gray-500 shadow-sm";

//   const sizeClasses = {
//     sm: "px-3 py-2 text-sm",
//     md: "px-4 py-2 text-base",
//     lg: "px-5 py-3 text-lg",
//   }[size];

//   const variantClasses = {
//     outlined:
//       "border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-500 " +
//       "dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:hover:border-blue-500",
//     filled:
//       "bg-blue-50 border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:bg-blue-100 " +
//       "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700",
//     ghost:
//       "bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:ring-0 hover:border-blue-400 " +
//       "dark:border-gray-600 dark:text-gray-200 dark:focus:border-blue-400 dark:hover:border-blue-300",
//   }[variant];

//   return (
//     <div className="flex flex-col space-y-1 w-full max-w-md">
//       {label && (
//         <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
//           {label}
//         </label>
//       )}
//       <div className="relative">
//         <input
//           type={type === "password" && showPassword ? "text" : type}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           disabled={disabled}
//           className={`${baseClasses} ${sizeClasses} ${variantClasses} pr-12`}
//         />

//         {/* Clear button */}
//         {clearable && value && !loading && (
//           <button
//             type="button"
//             onClick={() =>
//               onChange?.({
//                 target: { value: "" },
//               } as React.ChangeEvent<HTMLInputElement>)
//             }
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors dark:text-gray-500 dark:hover:text-red-400"
//           >
//             <X size={18} />
//           </button>
//         )}

//         {/* Password toggle */}
//         {type === "password" && !loading && (
//           <button
//             type="button"
//             onClick={() => setShowPassword((prev) => !prev)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors dark:text-gray-500 dark:hover:text-blue-400"
//           >
//             {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//           </button>
//         )}

//         {/* Loader */}
//         {loading && (
//           <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-blue-500" size={18} />
//         )}
//       </div>
//       {error && <span className="text-sm text-red-500 font-medium dark:text-red-400">{error}</span>}
//     </div>
//   );
// };

// export default InputField;


// import React from "react";
// import { X, Eye, EyeOff, Loader2 } from "lucide-react";

// type InputFieldProps = {
//   label?: string;
//   placeholder?: string;
//   value?: string;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   type?: "text" | "password" | "email";
//   variant?: "outlined" | "filled" | "ghost";
//   size?: "sm" | "md" | "lg";
//   disabled?: boolean;
//   error?: string;
//   loading?: boolean;
//   clearable?: boolean;
// };

// const InputField: React.FC<InputFieldProps> = ({
//   label,
//   placeholder,
//   value,
//   onChange,
//   type = "text",
//   variant = "outlined",
//   size = "md",
//   disabled = false,
//   error,
//   loading,
//   clearable,
// }) => {
//   const [showPassword, setShowPassword] = React.useState(false);

//   const baseClasses =
//     "w-full rounded-2xl transition-all focus:outline-none disabled:bg-gray-100 disabled:text-gray-400 dark:disabled:bg-gray-800 dark:disabled:text-gray-500 shadow-sm";

//   const sizeClasses = {
//     sm: "px-3 py-2 text-sm",
//     md: "px-4 py-2 text-base",
//     lg: "px-5 py-3 text-lg",
//   }[size];

//   const variantClasses = {
//     outlined:
//       "border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-500 " +
//       "dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:hover:border-blue-500",
//     filled:
//       "bg-blue-50 border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:bg-blue-100 " +
//       "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700",
//     ghost:
//       "bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:ring-0 hover:border-blue-400 " +
//       "dark:border-gray-600 dark:text-gray-200 dark:focus:border-blue-400 dark:hover:border-blue-300",
//   }[variant];

//   return (
//     <div className="flex flex-col space-y-1 w-full max-w-md">
//       {label && (
//         <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
//           {label}
//         </label>
//       )}
//       <div className="relative">
//         <input
//           type={type === "password" && showPassword ? "text" : type}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           disabled={disabled}
//           className={`${baseClasses} ${sizeClasses} ${variantClasses} pr-12`}
//         />

//         {/* Clear button */}
//         {clearable && value && !loading && (
//           <button
//             type="button"
//             onClick={() =>
//               onChange?.({
//                 target: { value: "" },
//               } as React.ChangeEvent<HTMLInputElement>)
//             }
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors dark:text-gray-500 dark:hover:text-red-400"
//           >
//             <X size={18} />
//           </button>
//         )}

//         {/* Password toggle */}
//         {type === "password" && !loading && (
//           <button
//             type="button"
//             onClick={() => setShowPassword((prev) => !prev)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors dark:text-gray-500 dark:hover:text-blue-400"
//           >
//             {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//           </button>
//         )}

//         {/* Loader */}
//         {loading && (
//           <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-blue-500" size={18} />
//         )}
//       </div>
//       {error && <span className="text-sm text-red-500 font-medium dark:text-red-400">{error}</span>}
//     </div>
//   );
// };

// export default InputField;



import React from "react";
import { X, Eye, EyeOff, Loader2 } from "lucide-react";

type InputFieldProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "email";
  variant?: "outlined" | "filled" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  error?: string;
  loading?: boolean;
  clearable?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  variant = "outlined",
  size = "md",
  disabled = false,
  error,
  loading,
  clearable,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const baseClasses =
    "w-full rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  }[size];

  const variantClasses = {
    outlined:
      "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-blue-500 dark:focus:border-blue-400",
    filled:
      "bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400",
    ghost:
      "bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400",
  }[variant];

  return (
    <div className="flex flex-col space-y-1 w-full max-w-md">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`${baseClasses} ${sizeClasses} ${variantClasses} pr-10 dark:text-gray-100`}
        />

        {/* Clear button */}
        {clearable && value && !loading && (
          <button
            type="button"
            onClick={() =>
              onChange?.({
                target: { value: "" },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={16} />
          </button>
        )}

        {/* Password toggle */}
        {type === "password" && !loading && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}

        {/* Loader */}
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-blue-500" size={18} />
        )}
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default InputField;
