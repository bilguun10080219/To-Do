"use client";

import React, { useEffect, useState } from "react";
import { getTasks } from "@/app/services/taskApi";
import { FileCheck2 } from "lucide-react";
import { Task } from "@/app/mock/tasks";
import { useTranslation } from "react-i18next";

interface TaskStatusProps {
  size?: number;
  strokeWidth?: number;
  selectedUser?: string;
}

const STATUS_COLORS: Record<string, string> = {
  COMPLETED: "#22c55e",
  IN_PROGRESS: "#3b82f6",
  PENDING: "#ef4444",
};

const STATUS_ORDER = ["COMPLETED", "IN_PROGRESS", "PENDING"];

const STATUS_LABELS: Record<string, string> = {
  COMPLETED: "Completed",
  IN_PROGRESS: "In Progress",
  PENDING: "PENDING",
};

export default function TaskStatus({
  size = 120,
  strokeWidth = 10,
  selectedUser,
}: TaskStatusProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    const usernameParam =
        user.role?.toUpperCase() === "ADMIN"
        ? selectedUser || undefined
        : user.username;

    getTasks(usernameParam)
      .then((data: Task[]) => {
        const normalizedTasks: Task[] = data.map((task) => {
          let status = (task.status || "PENDING").toUpperCase();
          if (!STATUS_ORDER.includes(status)) status = "PENDING";
          return {
            ...task,
            status: status as "COMPLETED" | "IN_PROGRESS" | "PENDING",
          };
        });
        setTasks(normalizedTasks);
      })
      .catch((err) => console.error(err));
  }, [selectedUser]);

  const total = tasks.length;
  const counts: Record<string, number> = {
    COMPLETED: 0,
    IN_PROGRESS: 0,
    PENDING: 0,
  };

  tasks.forEach((task) => {
    if (counts[task.status] !== undefined) counts[task.status] += 1;
  });

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 h-fit">
      <div className="flex items-center gap-2 mb-4 text-[#FF6767] font-semibold text-lg">
        <FileCheck2 className="w-5 h-5 text-gray-700" />
        {t("Task Status")}
      </div>

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
                <circle
                  r={radius}
                  cx={size / 2}
                  cy={size / 2}
                  fill="transparent"
                  stroke="#e5e7eb"
                  strokeWidth={strokeWidth}
                />
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
              <span className="mt-2 text-sm text-gray-700">
                {t(STATUS_LABELS[status])}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
