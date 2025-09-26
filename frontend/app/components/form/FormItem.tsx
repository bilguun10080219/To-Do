import React from "react";

interface FormItemProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

export default function FormItem({ label, error, children }: FormItemProps) {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-1 text-gray-700 font-medium">{label}</label>
      )}
      {children}
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}
