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

export const getUsers = async () => {
  const res = await api.get("users");
  return res.data;
};

export const getUser = async (username?: string) => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const targetUsername = username || storedUser.username;
  const res = await api.get(`users/${targetUsername}`);
  return res.data;
};

export const updateUser = async (
  username: string,
  newUsername: string,
  newEmail: string
) => {
  const res = await api.put("users/update", {
    username,
    newUsername,
    newEmail,
  });
  const updatedUser = res.data;

  if (updatedUser.token) {
    localStorage.setItem("token", updatedUser.token);
  }

  localStorage.setItem("user", JSON.stringify(updatedUser));

  return updatedUser;
};

export const changePassword = async (
  username: string,
  currentPassword: string,
  newPassword: string
) => {
  const res = await api.put("users/change-password", {
    username,
    currentPassword,
    newPassword,
  });
  const changePassword = res.data;

  if (changePassword.token) {
    localStorage.setItem ("token", changePassword.token)
  }

  localStorage.setItem("user", JSON.stringify(changePassword));

  return changePassword;
};