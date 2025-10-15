"use client";

import { useEffect, useState } from "react";
import { Task, Priority, Status } from "@/app/mock/tasks";
import { createTask, uploadFile } from "@/app/services/taskApi";
import { getUsers } from "@/app/services/userApi";
import { useTranslation } from "react-i18next";

interface AddTaskProps {
  onClose: () => void;
}

export default function AddTask({ onClose }: AddTaskProps) {
  const [title, setTitle] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [createdDate, setCreatedDate] = useState(today);
  const [priority, setPriority] = useState<Priority>("Low");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [status] = useState<Status>("PENDING");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("USER");
  const [users, setUsers] = useState<string[]>([]);
  const [assignedUser, setAssignedUser] = useState("");
  const { t } = useTranslation();
  const API_URL = process.env.NEXT_PUBLIC_API_URL

useEffect(() => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    const user = JSON.parse(userStr);
    setRole(user.role || "USER");

    if ((user.role || "").toUpperCase() === "ADMIN") {
      getUsers()
        .then((data: any[]) => setUsers(data.map((u: any) => u.username)))
        .catch((err) => console.error("Failed to fetch users", err));
    }
  }
}, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const assignedTo =
      role.toUpperCase() === "ADMIN" ? assignedUser : currentUser.username;

    if (role.toUpperCase() === "ADMIN" && !assignedTo) {
      alert(t("Please select a user to assign this task to!"));
      return;
    }

    setLoading(true);
    try {
      let imageUrl: string | undefined = undefined;
      if (image) { 
        imageUrl = await uploadFile(image); 
      }

      const newTask: Partial<Task> = {
        name: title,
        createdDate,
        status,
        priority,
        description,
        username: currentUser.username,
        assignedUsername: assignedTo,
        imageUrl,
      };

      await createTask(newTask);
      onClose();
    } catch (err: any) {
      console.error(err);
      alert(t("Failed to add task") + ": " + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F9F9F9] w-[918px] h-[708px] rounded-md border border-gray-300 shadow-2xl p-8">
      <form onSubmit={handleSubmit} className="h-full flex flex-col space-y-6">
        <div className="flex justify-between items-center pb-2">
          <h2 className="text-xl font-bold text-gray-800">{t("Add Task")}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-gray-600 hover:underline"
          >
            ✕
          </button>
        </div>

        <div className="bg-[#FFFFFF] w-[794px] h-[476px] rounded-lg border border-gray-200 shadow p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">{t("Title")}</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">{t("Date")}</label>
            <input
              type="date"
              value={createdDate}
              onChange={(e) => setCreatedDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex gap-24">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">{t("Priority")}</label>
              <div className="flex gap-6">
                {["Extremely", "Moderate", "Low"].map((p) => (
                  <label key={p} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="priority"
                      value={p}
                      checked={priority === p}
                      onChange={() => setPriority(p as Priority)}
                    />
                    <span className={`text-${p === "Extremely" ? "red" : p === "Moderate" ? "blue" : "green"}-600`}>
                      {t(p)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {role.toUpperCase() === "ADMIN" && (
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">{t("Assign to User")}</label>
                <select
                  id="assignedUser"
                  value={assignedUser}
                  onChange={(e) => setAssignedUser(e.target.value)}
                  className="w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                >
                  <option value="">{t("Select a user...")}</option>
                  {users.map((username) => (
                    <option key={username} value={username}>
                      {username}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-6 flex-1">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">{t("Task Description")}</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("Start writing here...")}
                className="w-full border border-gray-300 rounded-md p-2 h-32 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">{t("Upload Image")}</label>
              <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 text-gray-400">
                {image ? (
                  <p>{image.name}</p>
                ) : (
                  <>
                    <p>{t("Drag & Drop files here")}</p>
                    <span className="my-2">{t("or")}</span>
                    <input
                      type="file"
                      onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                      className="hidden"
                      id="fileUpload"
                    />
                    <label htmlFor="fileUpload" className="cursor-pointer bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
                      {t("Browse")}
                    </label>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-start pt-4">
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
            disabled={loading}
          >
            {loading ? t("Uploading...") : t("Save")}
          </button>
        </div>
      </form>
    </div>
  );
}
