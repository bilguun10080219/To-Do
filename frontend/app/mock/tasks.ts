export type Priority = "High" | "Medium" | "Low";
export type Status = "Completed" | "In Progress" | "Not Completed";

export interface Task {
  id: number;
  name: string;
  description: string;
  priority: Priority;
  status: Status;
  createdDate: string; // ISO string
}

export const mockTasks: Task[] = [
  {
    id: 1,
    name: "Design Homepage",
    description: "Create the homepage design for the new app",
    priority: "High",
    status: "In Progress",
    createdDate: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Setup Database",
    description: "Install MySQL and setup initial tables",
    priority: "Medium",
    status: "Not Completed",
    createdDate: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Implement Login",
    description: "Create login page and connect with fake backend",
    priority: "High",
    status: "Completed",
    createdDate: new Date().toISOString(),
  },
];
