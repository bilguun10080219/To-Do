import axios from "axios";

const BASE_URL = "http://localhost:8080/api/users";

export const updateUser = (username: string, newUsername: string, newEmail: string) =>
  axios.put(`${BASE_URL}/update`, { username, newUsername, newEmail });

export const changePassword = (username: string, currentPassword: string, newPassword: string) =>
  axios.put(`${BASE_URL}/change-password`, { username, currentPassword, newPassword });

export const getUser = (username: string) =>
  axios.get(`${BASE_URL}/${username}`).then(res => res.data);
