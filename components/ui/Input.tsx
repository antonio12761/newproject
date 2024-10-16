import React, { forwardRef } from "react";

interface InputProps {
  label: string;
  type: string;
  placeholder?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, placeholder, error, ...rest }, ref) => {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          ref={ref} // Passa il ref
          {...rest} // Passa gli altri props come onChange, ecc.
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline ${
            error ? "border-red-500" : ""
          }`}
        />
        {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input"; // Imposta un displayName per React DevTools

export default Input;
