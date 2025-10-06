"use client";

import { useState, useEffect } from "react";
import Layout from "../components/layout";
import TaskList from "./components/TaskList";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Task } from "@/app/mock/tasks";
import { getTasks, updateTask } from "@/app/services/taskApi";
import { useRouter } from "next/navigation";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, [router]);


  const fetchTasks = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      const data = await getTasks(currentUser.username, searchQuery);
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [searchQuery]);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const movedTask = tasks.find((t) => t.id.toString() === draggableId);
    if (!movedTask) return;

    const newStatus = destination.droppableId;
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    setTasks((prev) =>
      prev.map((t) =>
        t.id === movedTask.id ? { ...t, status: newStatus } : t
      )
    );

    try {
      await updateTask(movedTask.id, {
        name: movedTask.name,
        description: movedTask.description,
        priority: movedTask.priority,
        status: newStatus,
        username: currentUser.username,
        imageUrl: movedTask.imageUrl,
        createdDate: movedTask.createdDate,
      });
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  return (
    <Layout onSearch={setSearchQuery}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-4">
          <TaskList
            status="PENDING"
            tasks={tasks.filter((t) => t.status === "PENDING")}
          />
          <TaskList
            status="IN_PROGRESS"
            tasks={tasks.filter((t) => t.status === "IN_PROGRESS")}
          />
          <TaskList
            status="COMPLETED"
            tasks={tasks.filter((t) => t.status === "COMPLETED")}
          />
        </div>
      </DragDropContext>
    </Layout>
  );
}
