"use client";

import Layout from "../components/layout";
import TaskList from "./components/TaskList";
import { DragDropContext } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import { Task } from "@/app/mock/tasks";
import { getTasks, updateTask } from "@/app/services/taskApi";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const data = await getTasks(currentUser.username);
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragEnd = async (result: any) => {
  if (!result.destination) return;

  const { draggableId, destination } = result;
  const movedTask = tasks.find((t) => t.id.toString() === draggableId);
  if (!movedTask) return;

  const newStatus = destination.droppableId;
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  // шинэ статус оноож байна
  const updatedTask = {
    name: movedTask.name,
    createdDate: movedTask.createdDate,
    priority: movedTask.priority,
    description: movedTask.description,
    username: currentUser.username, 
    status: newStatus,
    imageUrl: movedTask.imageUrl,
  };

  // front state update
  setTasks((prev) =>
    prev.map((t) => (t.id === movedTask.id ? { ...t, status: newStatus } : t))
  );

  // backend рүү PUT хүсэлт
  try {
    await updateTask(movedTask.id, updatedTask);
    console.log("Task updated:", updatedTask);
  } catch (err) {
    console.error("Failed to update task:", err);
  }
};


  return (
    <Layout>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-6">
          <TaskList status="PENDING" tasks={tasks} />
          <TaskList status="IN_PROGRESS" tasks={tasks} />
          <TaskList status="COMPLETED" tasks={tasks} />
        </div>
      </DragDropContext>
    </Layout>
  );
}
