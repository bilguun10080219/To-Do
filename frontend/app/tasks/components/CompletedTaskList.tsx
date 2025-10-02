"use client";

import React, { useEffect, useState } from "react";
import { getTasks } from "@/app/services/taskApi";
import CompletedTask from "./CompletedTask";
import { FileCheck } from "lucide-react";
import { Task } from "@/app/mock/tasks";

export default function CompletedTasksList() {
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      console.error("No user found in localStorage");
      setLoading(false);
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      const username = user.username;
      if (!username) {
        console.error("User has no username");
        setLoading(false);
        return;
      }

      getTasks(username)
        .then((tasks: Task[]) => {
          const filtered = tasks.filter((task) => task.status === "COMPLETED");
          setCompletedTasks(filtered);
        })
        .catch((err) => console.error("Failed to fetch tasks:", err))
        .finally(() => setLoading(false));
    } catch (e) {
      console.error("Invalid user data in localStorage");
      setLoading(false);
    }
  }, []);

  if (completedTasks.length === 0) return null;

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 h-fit">
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
