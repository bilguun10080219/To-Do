"use client";

import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { Task } from "@/app/mock/tasks";
import { getTasks } from "@/app/services/taskApi";
import Button from "@/app/components/core/Button";
import { Plus } from "lucide-react";
import AddTask from "@/app/components/task/AddTask";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const fetchTasks = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      const data = await getTasks(currentUser.username);
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6 bg-white rounded-2xl min-h-full shadow-md space-y-4 w-full max-w-[730px]">
      {/* Header with title and button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <Button
          leftIcon={<Plus />}
          variant="primary"
          onClick={() => setIsAdding(true)}
        >
          Add New Task
        </Button>
      </div>

      {/* Task list */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500 italic">No tasks found.</p>
      ) : (
        <div className="min-h-full flex flex-col gap-3 overflow-y-auto">
          {tasks
            .filter((task) => task.status !== "COMPLETED")
            .map((task) => (
              <TaskCard key={task.id} task={task} imageUrl={task.imageUrl} />
            ))}
        </div>
      )}

      {/* AddTask Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <AddTask
            onClose={() => {
              setIsAdding(false);
              fetchTasks(); // шинэ task нэмэгдсэний дараа refresh хийнэ
            }}
          />
        </div>
      )}
    </div>
  );
}
