// app/components/core/Button.tsx
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  className,
  disabled = false,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center space-x-2";

  const variantStyles = cn({
    // Primary
    "bg-[#FF6767] text-white hover:bg-[#e85b5b] focus:ring-[#FF6767]":
      variant === "primary" && !disabled,
    "bg-[#FF9090] text-white cursor-not-allowed":
      variant === "primary" && disabled,

    // Secondary
    "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400":
      variant === "secondary" && !disabled,
    "bg-gray-300 text-gray-400 cursor-not-allowed":
      variant === "secondary" && disabled,

    // Danger
    "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400":
      variant === "danger" && !disabled,
    "bg-red-300 text-white cursor-not-allowed":
      variant === "danger" && disabled,
  });

  return (
    <button
      className={cn(baseStyles, variantStyles, className)}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </button>
  );
}
