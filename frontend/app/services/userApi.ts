import axios from "axios";

const BASE_URL = "http://localhost:8080/api/users";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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

export const getUsers = () => api.get("").then((res) => res.data);

export const updateUser = (username: string, newUsername: string, newEmail: string) =>
  api.put("/update", { username, newUsername, newEmail }).then(res => res.data);

export const changePassword = (username: string, currentPassword: string, newPassword: string) =>
  api.put("/change-password", { username, currentPassword, newPassword }).then(res => res.data);

export const getUser = (username: string) =>
  api.get(`/${username}`).then(res => res.data);
