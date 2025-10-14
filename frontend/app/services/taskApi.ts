import axios from "axios";

const BASE_URL = "http://localhost:8080/api/tasks";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});


export const getTasks = (username?: string, search?: string) => {
  const params: Record<string, string> = {};
  if (username) params.username = username;
  if (search) params.search = search;

  return api.get("", { params }).then((res) => res.data);
};

export const getTaskById = (id: number, username?: string) => {
  const params: Record<string, string> = {};
  if (username) params.username = username;

  return api.get(`/${id}`, { params }).then((res) => res.data);
};

export const createTask = (task: any) => api.post("", task).then((res) => res.data);

export const updateTask = (id: number, task: any) => api.put(`/${id}`, task).then((res) => res.data);

export const deleteTask = (id: number, username?: string) => {
  const params: Record<string, string> = {};
  if (username) params.username = username;

  return api.delete(`/${id}`, { params }).then((res) => res.data);
};

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post("http://localhost:8080/api/files/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.url;
};
