import axios from "axios";

// Create an Axios instance with the token from localStorage
const getToken = () => localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://localhost:8080/api/tasks",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the token dynamically
api.interceptors.request.use((config) => {
  const token = getToken();
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
