"use client";

import { Task } from "@/app/mock/tasks";
import cn from "classnames";
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface TaskCardProps {
  task: Task;
  imageUrl?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  selectedUser?: string;
}

export default function TaskCard({
  task,
  imageUrl,
  onClick,
  selectedUser,
}: TaskCardProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const mapPriorityColor = (priority: string) => {
    switch (priority) {
      case "Extremely":
        return "text-red-500";
      case "Moderate":
        return "text-[#42ADE2]";
      case "Low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const mapStatusColor = (status?: string) => {
    const s = status?.toLowerCase() || "not completed";
    switch (s) {
      case "completed":
        return "text-[#05A301]";
      case "in progress":
        return "text-[#0225FF]";
      case "not completed":
        return "text-[#F21E1E]";
      default:
        return "text-gray-500";
    }
  };

  const handleClick = () => {
    router.push(`/tasks/${task.id}`);
  };

  return (
    <div
      className="task-card relative"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="flex flex-col p-6 border rounded-xl hover:shadow-lg transition gap-3">
        {typeof window !== "undefined" &&
          JSON.parse(localStorage.getItem("user") || "{}")?.role === "admin" && (
            <div className="text-sm text-gray-500">
              {t("Assigned to")}:{" "}
              <span className="font-medium text-gray-700">
                {task.username || selectedUser || ""}
              </span>
            </div>
          )}

        <div className="flex flex-row gap-4 items-start">
          <div
            className={cn("w-4 h-4 rounded-full border-2 bg-white mt-1", {
              "border-[#F21E1E]": task.status === "PENDING",
              "border-[#0225FF]": task.status === "IN_PROGRESS",
              "border-[#05A301]": task.status === "COMPLETED",
            })}
          ></div>

          <div className="flex-1 flex flex-col">
            <h3 className="text-lg font-bold mb-2">{task.name}</h3>
            <p className="text-gray-600 line-clamp-3">{task.description}</p>
          </div>

          {imageUrl && (
            <div className="flex-shrink-0 overflow-hidden rounded-lg">
              <img
                src={imageUrl}
                alt={task.name}
                className="w-24 h-24 object-cover"
              />
            </div>
          )}
        </div>

        <div className="flex justify-between text-xs text-gray-600 pt-2 border-t border-gray-100">
          <div>
            {t("Priority")}:{" "}
            <span className={cn(mapPriorityColor(task.priority))}>
              {t(task.priority)}
            </span>
          </div>
          <div>
            {t("Status")}:{" "}
            <span className={cn(mapStatusColor(task.status))}>
              {t(task.status)}
            </span>
          </div>
          <div className="text-gray-400">
            {t("Created on")}:{" "}
            {new Date(task.createdDate).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
