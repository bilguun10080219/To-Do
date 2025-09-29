"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { mockTasks } from "@/app/mock/tasks"; 
import { FaEdit, FaTrash } from "react-icons/fa";
import EditTask from "@/app/components/task/EditTask"; 

export default function ViewTask() {
  const { id } = useParams();
  const task = mockTasks.find((t) => t.id === Number(id)); 

  const [isEditing, setIsEditing] = useState(false);

  if (!task) {
    return <p className="text-red-500">Task not found</p>;
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      console.log("Deleting task:", task.id);
      //fetch(`/api/tasks/${task.id}`, { method: "DELETE" })
    }
  };

  return (
    <div className="my-5 w-full rounded-2xl border shadow-2xl flex flex-col bg-white">
      <div key={task.id} className="flex min-h-[calc(100vh-120px)] flex-col">
  
        <div className="m-3 flex justify-end">
          <Link href="/tasks" className="cursor-pointer font-semibold">
            Go Back
          </Link>
        </div>


        <div className="p-5">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            {task.imageUrl && (
              <Image
                src={task.imageUrl}
                alt={task.name}
                width={210}
                height={217}
                className="rounded-lg object-cover"
              />
            )}
            <div className="flex flex-col gap-2 text-center text-lg sm:text-left">
              <h1 className="text-xl font-semibold sm:text-2xl">{task.name}</h1>
              <p>
                Priority:{" "}
                <span className="text-priority-moderate font-semibold">
                  {task.priority}
                </span>
              </p>
              <p>
                Status:{" "}
                <span className="text-status-notstarted font-semibold">
                  {task.status}
                </span>
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
          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
          >
            <FaTrash />
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
          >
            <FaEdit />
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <EditTask task={task} onClose={() => setIsEditing(false)} />          
        </div>
      )}
    </div>
  );
}
