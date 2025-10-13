import axios from "axios";

// Base URL for tasks API
const BASE_URL = "http://localhost:8080/api/tasks";

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT token dynamically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

// --- API functions ---

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

// File upload with token automatically included
export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.url;
};
