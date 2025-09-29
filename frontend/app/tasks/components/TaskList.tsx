import { mockTasks, Task } from "@/app/mock/tasks";
import TaskCard from "./TaskCard";

export default function TaskList() {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md space-y-4 w-full max-w-[730px]">
      <h2 className="text-xl font-semibold mb-4">Tasks</h2>
      <div className="flex flex-col gap-3">
        {mockTasks
          .filter((task: Task) => task.status !== "Completed")
          .map((task: Task) => (
            <TaskCard key={task.id} task={task} imageUrl={task.imageUrl} />
          ))}
      </div>
    </div>
  );
}
