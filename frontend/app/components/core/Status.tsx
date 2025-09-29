// app/components/core/Status.tsx
import React from "react";
import cn from "classnames";

type StatusType = "completed" | "in-progress" | "not-completed";

interface StatusProps {
  status: StatusType;
}

export default function Status({ status }: StatusProps) {
  const baseStyles = "px-3 py-1 rounded-full text-sm font-medium inline-block";

  const statusStyles = cn({
    "bg-green-100 text-green-700": status === "completed",
    "bg-blue-100 text-blue-700": status === "in-progress",
    "bg-red-100 text-red-700": status === "not-completed",
  });

  const label = {
    completed: "Completed",
    "in-progress": "In Progress",
    "not-completed": "Not Completed",
  }[status];

  return <span className={cn(baseStyles, statusStyles)}>{label}</span>;
}
