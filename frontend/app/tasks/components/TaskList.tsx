"use client";

import Status from "@/app/components/core/Status";
import { mockTasks, Task } from "@/app/mock/tasks";

export default function TaskList() {
  const mapStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "completed";
      case "in progress":
        return "in-progress";
      case "not completed":
        return "not-completed";
      default:
        return "not-completed";
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold mb-4">Tasks</h2>
      <div className="flex flex-col gap-3">
        {mockTasks.map((task: Task) => (
          <div
            key={task.id}
            className="flex flex-col p-4 border rounded-lg hover:shadow transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">{task.name}</h3>
              <Status status={mapStatus(task.status)} />
            </div>
            <p className="text-gray-600 mb-2">{task.description}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Priority: {task.priority}</span>
              <span>
                Created: {new Date(task.createdDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
