"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditTask from "@/app/components/task/EditTask";
import { Task } from "@/app/mock/tasks";
import { deleteTask, getTaskById } from "@/app/services/taskApi";

export default function ViewTask() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log("ViewTask component mounted, id =", id);


  const fetchTask = async () => {
  try {
    setLoading(true);
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("Current user from localStorage:", currentUser);

    if (!id || !currentUser.username) {
      console.error("Missing id or username");
      return;
    }

    const t = await getTaskById(Number(id), currentUser.username);
    console.log("Fetched task from backend:", t);

    setTask(t);
  } catch (err) {
    console.error("Error fetching task:", err);
    setTask(null);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchTask();
  }, [id]);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (!task) return <p className="text-red-500">Task not found</p>;

  const handleDelete = async () => {
    if (!task.id) return;
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        await deleteTask(task.id, currentUser.username);
        router.push("/tasks");
      } catch (err) {
        console.error(err);
        alert("Failed to delete task");
      }
    }
  };

  const mapPriorityColor = (priority: string) =>
    priority === "Extremely"
      ? "text-red-500"
      : priority === "Moderate"
      ? "text-[#42ADE2]"
      : "text-green-500";

  const mapStatusColor = (status?: string) => {
    const s = status?.toLowerCase() || "not completed";
    switch (s) {
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
    <div className="my-5 w-full rounded-2xl border shadow-2xl flex flex-col ">
      <div key={task.id} className="flex min-h-[calc(100vh-120px)] flex-col">
        <div className="m-3 flex justify-end">
          <button onClick={() => router.push("/tasks")} className="cursor-pointer font-semibold">
            Go Back
          </button>
        </div>

        <div className="p-5">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            {task.imageUrl && (
              <Image src={task.imageUrl} alt={task.name} width={210} height={217} className="rounded-lg object-cover" />
            )}
            <div className="flex flex-col gap-2 text-center text-lg sm:text-left">
              <h1 className="text-xl font-semibold sm:text-2xl">{task.name}</h1>
              <p>
                Priority: <span className={`${mapPriorityColor(task.priority)} font-semibold`}>{task.priority}</span>
              </p>
              <p>
                Status: <span className={`${mapStatusColor(task.status)} font-semibold`}>{task.status}</span>
              </p>
              <p className="text-border">
                Created on: {new Date(task.createdDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="text-text-muted px-4 pt-4 pb-6 text-lg sm:px-6">
          <p className="mb-4">{task.description}</p>
        </div>

        <div className="mt-auto flex items-center justify-end gap-4 p-4">
          <button onClick={handleDelete} className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600">
            <FaTrash />
          </button>
          <button onClick={() => setIsEditing(true)} className="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600">
            <FaEdit />
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <EditTask task={task} onClose={() => setIsEditing(false)} onUpdated={fetchTask} />
        </div>
      )}
    </div>
  );
}
