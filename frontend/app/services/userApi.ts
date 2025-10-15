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

export const getUsers = () =>
  api.get("users").then((res) => res.data);

export const updateUser = (
  username: string,
  newUsername: string,
  newEmail: string
) =>
  api
    .put("users/update", { username, newUsername, newEmail })
    .then((res) => res.data);

export const changePassword = (
  username: string,
  currentPassword: string,
  newPassword: string
) =>
  api
    .put("users/change-password", {
      username,
      currentPassword,
      newPassword,
    })
    .then((res) => res.data);

export const getUser = (username: string) =>
  api.get(`users/${username}`).then((res) => res.data);
