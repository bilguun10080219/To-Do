"use client";

import { Task } from "@/app/mock/tasks";
import cn from "classnames";
import { useTranslation } from "react-i18next";

interface CompletedTaskProps {
  task: Task;
  imageUrl?: string;
}

export default function CompletedTask({ task, imageUrl }: CompletedTaskProps) {
  const { t } = useTranslation();

  const mapStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-600";
      case "in progress":
        return "text-blue-600";
      case "not completed":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="flex flex-row p-4 border rounded-lg hover:shadow transition relative gap-4">
      <div
        className={cn(
          "w-4 h-4 rounded-full border-2 border-green-500 bg-white absolute top-4 left-4"
        )}
      ></div>

      <div className="flex-1 flex flex-col pl-6">
        <h3 className="text-lg font-medium mb-1">{task.name}</h3>
        <p className="text-gray-600 mb-2">{task.description}</p>
        <div className="flex flex-col gap-2 text-sm text-gray-500">
          <span className={cn(mapStatusColor(task.status))}>
            {t(task.status)}
          </span>
          {task.completedDate && (
            <span>
              {t("Completed")}:{" "}
              {new Date(task.completedDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={task.name}
          className="w-22 h-22 object-cover rounded-lg flex-shrink-0"
          style={{ width: 88, height: 88 }}
        />
      )}
    </div>
  );
}
