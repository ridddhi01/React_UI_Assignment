
import React, { useState, useEffect } from "react";
import type { Meta, StoryObj } from '@storybook/react';
import { Loader2, X, Eye, EyeOff } from "lucide-react";


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


const meta: Meta<typeof InputField> = {
  title: 'Components/Form/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label for the input field.',
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text for the input.',
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'ghost'],
      description: 'The visual style of the input field.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the input field.',
    },
    error: {
      control: 'text',
      description: 'An error message to display below the input.',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the input field is in a loading state.',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input field is disabled.',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether the input field has a clear button.',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
      description: 'The HTML type of the input field.',
    },
    value: {
      control: 'text',
      description: 'The current value of the input.',
    },
    onChange: {
      action: 'changed',
      description: 'Callback function triggered on input value change.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `The \`InputField\` component provides a versatile and customizable text input element.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;


export const Default: Story = {
  args: {
    label: 'Default Input(updated)',
    placeholder: 'Enter text here...',
  },
};


export const Outlined: Story = {
  args: {
    ...Default.args,
    label: 'Outlined Variant',
    variant: 'outlined',
  },
};

// filled 
export const Filled: Story = {
  args: {
    ...Default.args,
    label: 'Filled Variant',
    variant: 'filled',
  },
};

// ghost 
export const Ghost: Story = {
  args: {
    ...Default.args,
    label: 'Ghost Variant',
    variant: 'ghost',
  },
};

// disabled 
export const Disabled: Story = {
  args: {
    ...Default.args,
    label: 'Disabled State',
    disabled: true,
  },
};

// error 
export const WithError: Story = {
  args: {
    ...Default.args,
    label: 'Error State',
    error: 'This is a required field.',
  },
};

// password 
export const PasswordField: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
  },
};

// clearstate 
export const Clearable: Story = {
  args: {
    label: 'Clearable Input',
    placeholder: 'Type something to see the clear button',
    clearable: true,
  },
};

// loadingstate 
export const Loading: Story = {
  args: {
    label: 'Loading Input',
    loading: true,
    placeholder: 'Loading...',
  },
};
