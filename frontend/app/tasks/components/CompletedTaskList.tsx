import { mockTasks } from "@/app/mock/tasks";
import CompletedTask from "./CompletedTask";
import { FileCheck } from "lucide-react";

export default function CompletedTasksList() {
  const completedTasks = mockTasks.filter(
    (task) => task.status === "Completed"
  );

  if (completedTasks.length === 0) return null;

  return (
    <div className="bg-white shadow-2xs rounded-2xl p-6 h-fit">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 text-[#FF6767] font-semibold text-lg">
        <FileCheck className="w-5 h-5 text-gray-700" />
        Completed tasks
      </div>

      {/* Task List */}
      <div className="flex flex-col gap-4">
        {completedTasks.map((task) => (
          <CompletedTask key={task.id} task={task} imageUrl={task.imageUrl} />
        ))}
      </div>
    </div>
  );
}
