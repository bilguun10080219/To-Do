"use client";

import { Task } from "@/app/mock/tasks";
import cn from "classnames";
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

interface TaskCardProps {
  task: Task;
  imageUrl?: string; // шинэ prop
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function TaskCard({ task, imageUrl, onClick }: TaskCardProps) {
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
  const router = useRouter();
  const handleClick = () => {
    router.push(`/tasks/${task.id}`);
  };
  return (
    <div
      className="task-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="flex flex-row p-4 border rounded-lg hover:shadow transition relative gap-4">
        {/* Priority Circle */}
        <div
          className={cn(
            "w-4 h-4 rounded-full absolute top-4 left-4 border-2 bg-white",
            {
              "border-[#F21E1E]": task.status === "PENDING",
              "border-[#0225FF]": task.status === "IN_PROGRESS",
              "border-[#05A301]": task.status === "COMPLETED",
            }
          )}
        ></div>

        {/* Тайлбар хэсэг */}
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-2 pl-6">
            <h3 className="text-lg font-medium">{task.name}</h3>
          </div>

          <p className="text-gray-600 mb-2 pl-6 line-clamp-4">
            {task.description}
          </p>

          <div className="flex justify-between text-[10px] text-sm items-center gap-4 pl-6">
            <div>
              Priority:{" "}
              <span className={cn(mapPriorityColor(task.priority))}>
                {task.priority}
              </span>
            </div>
            <div>
              Status:{" "}
              <span className={cn(mapStatusColor(task.status))}>
                {task.status}
              </span>
            </div>
            <span className="text-gray-400">
              Created on: {new Date(task.createdDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        {/* Зураг */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={task.name}
            className="w-22 h-22 object-cover rounded-lg flex-shrink-0"
            style={{ width: 88, height: 88 }}
          />
        )}
      </div>
    </div>
  );
}
