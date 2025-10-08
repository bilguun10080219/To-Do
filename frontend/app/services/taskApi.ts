import axios from "axios";

const BASE_URL = "http://localhost:8080/api/tasks";

export const getTasks = (username?: string, search?: string) => {
  // Build params object
  const params: Record<string, string> = {};
  if (username) params.username = username; // send username only if defined
  if (search) params.search = search;       // send search if defined

  return axios
    .get(BASE_URL, { params })
    .then((res) => res.data);
};

export const getTaskById = (id: number, username?: string) => {
  const params: Record<string, string> = {};
  if (username) params.username = username;

  return axios
    .get(`${BASE_URL}/${id}`, { params })
    .then((res) => res.data);
};

export const createTask = (task: any) => {
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  // fix username if stored as email
  const username =
    currentUser.username?.includes("@")
      ? currentUser.username.split("@")[0]
      : currentUser.username;

  return axios
    .post("http://localhost:8080/api/tasks", { ...task, username })
    .then((res) => res.data);
};

export const updateTask = (id: number, task: any) => {
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  return axios
    .put(`${BASE_URL}/${id}`, { ...task, username: currentUser.username })
    .then((res) => res.data);
};

export const deleteTask = (id: number, username?: string) => {
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const params: Record<string, string> = {
    username: username || currentUser.username,
  };

  return axios.delete(`${BASE_URL}/${id}`, { params }).then((res) => res.data);
};

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://localhost:8080/api/files/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.url;
};
