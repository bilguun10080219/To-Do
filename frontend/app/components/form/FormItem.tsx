import React from "react";
import cn from "classnames";

interface FormItemProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormItem({
  label,
  error,
  children,
  className,
}: FormItemProps) {
  return (
    <div className={cn("flex flex-col w-full", className)}>
      {label && (
        <label className="mb-1 text-gray-700 font-medium">{label}</label>
      )}
      {children}
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}
