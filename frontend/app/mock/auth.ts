export type User = {
  username: string;
  email: string;
  password: string;
  role: string;
};

export let mockUsers: User[] = [
  {
    username: "Admin",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
  {
    username: "User",
    email: "user@example.com",
    password: "user123",
    role: "user",
  },
];

export function registerUser(
  username: string,
  email: string,
  password: string
) {
  const exists = mockUsers.some((u) => u.email === email);
  if (exists) {
    return { success: false, message: "Email already registered" };
  }
  const newUser: User = { username, email, password, role: "user" };
  mockUsers.push(newUser);
  return { success: true, message: "Registration successful", user: newUser };
}
