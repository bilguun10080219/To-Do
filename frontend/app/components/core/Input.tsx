// app/components/core/Input.tsx
import React, { InputHTMLAttributes } from "react";
import cn from "classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-1 text-gray-700 font-medium">{label}</label>
      )}
      <input
        className={cn(
          "px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed",
          error ? "border-red-500 focus:ring-red-400" : "border-gray-300",
          className
        )}
        {...props}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}
