import axios from "axios";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { "Content-Type": "application/json" },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }

  return config;
});


export const getTasks = (username?: string, search?: string) => {
  const params: Record<string, string> = {};
  if (username) params.username = username;
  if (search) params.search = search;

  return api.get("tasks", { params }).then((res) => res.data);
};


export const getTaskById = (id: number, username?: string) => {
  const params: Record<string, string> = {};
  if (username) params.username = username;

  return api.get(`tasks/${id}`, { params }).then((res) => res.data).catch(error => {
    console.error('Config:', error.config);
  });
  ;
};


export const createTask = (task: any) =>
  api.post("tasks", task).then((res) => res.data);


export const updateTask = (id: number, task: any) =>
  api.put(`tasks/${id}`, task).then((res) => res.data);


export const deleteTask = (id: number, username?: string) => {
  const params: Record<string, string> = {};
  if (username) params.username = username;

  return api.delete(`tasks/${id}`, { params }).then((res) => res.data);
};


export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);


  const res = await axios.post(`${API_URL}/api/files/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.url;
};
