"use client";

import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { Task } from "@/app/mock/tasks";
import { getTasks } from "@/app/services/taskApi";

export default function AllTasksList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="p-6 bg-white rounded-2xl shadow-md space-y-4 w-full">
      <h2 className="text-xl font-semibold mb-4">All Tasks</h2>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500 italic">No tasks found.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {tasks
            .filter(
              (task) => task.status === "PENDING" || task.status === "IN_PROGRESS"
            )
            .map((task) => (
              <TaskCard key={task.id} task={task} imageUrl={task.imageUrl} />
            ))}
        </div>
      )}
    </div>
  );
}
