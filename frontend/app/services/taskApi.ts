import axios from "axios";

const BASE_URL = "http://localhost:8080/api/tasks"; 

export const getTasks = (username: string, search?: string) =>
  axios
    .get(BASE_URL, {
      params: { username, ...(search ? { search } : {}) }, 
    })
    .then((res) => res.data);

export const getTaskById = (id: number, username: string) =>
  axios.get(`${BASE_URL}/${id}`, { params: { username } }).then(res => res.data);

export const createTask = (task: any) =>
  axios.post(BASE_URL, task).then(res => res.data);

export const updateTask = (id: number, task: any) =>
  axios.put(`${BASE_URL}/${id}`, task).then(res => res.data);

export const deleteTask = (id: number, username: string) =>
  axios.delete(`${BASE_URL}/${id}`, { params: { username } }).then(res => res.data);

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
