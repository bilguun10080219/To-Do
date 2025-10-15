"use client";

import { useState, useEffect } from "react";
import Layout from "../components/layout";
import TaskList from "./components/TaskList";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Status, Task } from "@/app/mock/tasks";
import { getTasks, updateTask } from "@/app/services/taskApi";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import axios from "axios";
interface User {
  username: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [role, setRole] = useState("user");
  const [selectedUser, setSelectedUser] = useState("");
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL


  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    } else {
      const parsed = JSON.parse(user);
      setRole(parsed.role || "user");
    }
  }, [router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    if (role?.toUpperCase() === "ADMIN") fetchUsers();
  }, [role]);

  const fetchTasks = async () => {
    try {
      let data;
      if (role?.toUpperCase() === "ADMIN") {

        if (selectedUser) {
          data = await getTasks(selectedUser, searchQuery);
        } else {
          data = await getTasks("", searchQuery);
        }
      } else {
        data = await getTasks(undefined, searchQuery);
      }

      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [searchQuery, selectedUser]);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;


    const { draggableId, destination } = result;
    const movedTask = tasks.find((t) => t.id.toString() === draggableId);
    if (!movedTask) return;
    const newStatus = destination.droppableId as Status;

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
        imageUrl: movedTask.imageUrl,
        createdDate: movedTask.createdDate,
      });
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  return (
    <Layout onSearch={setSearchQuery}>
      {role?.toUpperCase() === "ADMIN" && (
        <div className="flex justify-between items-center gap-4 mb-4 bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700">{t("Admin Panel")}</h2>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700"
          >
            <option value="">{t("Select a user")}</option>
            {users.map((u) => (
              <option key={u.username} value={u.username}>
                {u.username}
              </option>
            ))}
          </select>
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-4">
          <TaskList
            status="PENDING"
            role={role}
            tasks={tasks.filter((t) => t.status === "PENDING")}
            selectedUser={selectedUser}
          />
          <TaskList
            status="IN_PROGRESS"
            role={role}
            tasks={tasks.filter((t) => t.status === "IN_PROGRESS")}
            selectedUser={selectedUser}
          />
          <TaskList
            status="COMPLETED"
            role={role}
            tasks={tasks.filter((t) => t.status === "COMPLETED")}
            selectedUser={selectedUser}
          />
        </div>
      </DragDropContext>
    </Layout>
  );
}
