import axios from "axios";

const BASE_URL = "http://localhost:8080/api/tasks"; 

export const getTasks = (username: string) =>
  axios.get(BASE_URL, { params: { username } }).then(res => res.data);

export const createTask = (task: any) =>
  axios.post(BASE_URL, task).then(res => res.data);

export const updateTask = (id: number, task: any) =>
  axios.put(`${BASE_URL}/${id}`, task).then(res => res.data);

export const deleteTask = (id: number, username: string) =>
  axios.delete(`${BASE_URL}/${id}`, { params: { username } }).then(res => res.data);
