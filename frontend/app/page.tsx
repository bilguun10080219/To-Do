"use client";

import { useEffect, useState } from "react";
import Layout from "./components/layout";
import TaskStatus from "./tasks/components/TaskStatus";
import CompletedTasksList from "./tasks/components/CompletedTaskList";
import AllTasksList from "./tasks/components/TaskAll";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next"; 

interface User {
  username: string;
}

export default function Page() {
  const [role, setRole] = useState<string>("user");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const router = useRouter();
  const { t } = useTranslation(); 
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    setRole(currentUser.role || "user");
  }, []);

  const [users, setUsers] = useState<User[]>([]);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("⚠️ No token found in localStorage!");
        return;
      }

      const res = await axios.get(`${API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err: any) {
      console.error("❌ Failed to fetch users:", err.response?.status, err.response?.data || err);
    }
  };

    if (role?.toUpperCase() === "ADMIN") fetchUsers();
  }, [role]);

  return (
    <div>
      <Layout>
{/* ✅ Админ үед хэрэглэгч сонгох хэсэг */}
{role?.toUpperCase() === "ADMIN" && (

          <div className="flex justify-between items-center gap-4 mb-4 bg-white p-4 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700">
              {t("Admin Panel")}
            </h2>
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

        <div className="flex flex-row gap-4">
          <div className="flex-1 min-w-[350px]">
            <AllTasksList selectedUser={selectedUser} />
          </div>

          {/* Баруун тал — TaskStatus + CompletedTasksList */}
          <div className="flex-1 flex flex-col gap-6">
            <TaskStatus selectedUser={selectedUser} />
            <CompletedTasksList selectedUser={selectedUser} />
          </div>
        </div>
      </Layout>
    </div>
  );
}
