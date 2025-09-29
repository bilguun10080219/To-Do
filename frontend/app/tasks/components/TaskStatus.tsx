"use client";

import React from "react";
import { mockTasks } from "@/app/mock/tasks";
import { FileCheck2 } from "lucide-react";

interface TaskStatusProps {
  size?: number;
  strokeWidth?: number;
}

const STATUS_COLORS: Record<string, string> = {
  Completed: "#22c55e",
  "In Progress": "#3b82f6",
  "Not Completed": "#ef4444",
};

const STATUS_ORDER = ["Completed", "In Progress", "Not Completed"];

export default function TaskStatus({
  size = 120,
  strokeWidth = 10,
}: TaskStatusProps) {
  const total = mockTasks.length;
  const counts: Record<string, number> = {
    Completed: 0,
    "In Progress": 0,
    "Not Completed": 0,
  };
  mockTasks.forEach((task) => (counts[task.status] += 1));

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 h-fit">
      {/* Title */}
      <div className="flex items-center gap-2 mb-4 text-[#FF6767] font-semibold text-lg">
        <FileCheck2 className="w-5 h-5 text-gray-700" />
        Task Status
      </div>

      {/* Circles */}
      <div className="flex gap-6 justify-center items-center">
        {STATUS_ORDER.map((status) => {
          const count = counts[status];
          const percent = total ? count / total : 0;
          const radius = (size - strokeWidth) / 2;
          const circumference = 2 * Math.PI * radius;
          const dashOffset = circumference * (1 - percent);
          const percentText = Math.round(percent * 100);

          return (
            <div key={status} className="flex flex-col items-center">
              <svg width={size} height={size}>
                {/* background circle */}
                <circle
                  r={radius}
                  cx={size / 2}
                  cy={size / 2}
                  fill="transparent"
                  stroke="#e5e7eb"
                  strokeWidth={strokeWidth}
                />
                {/* progress circle */}
                <circle
                  r={radius}
                  cx={size / 2}
                  cy={size / 2}
                  fill="transparent"
                  stroke={STATUS_COLORS[status]}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                  className="transition-all"
                />
                {/* percentage text */}
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="text-gray-700 font-semibold"
                  style={{ fontSize: size / 5 }}
                >
                  {percentText}%
                </text>
              </svg>
              <span className="mt-2 text-sm text-gray-700">{status}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
