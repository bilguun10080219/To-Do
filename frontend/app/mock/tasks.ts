// types/task.ts

export type Priority = "Extremely" | "Moderate" | "Low";
export type Status = "COMPLETED" | "IN_PROGRESS" | "PENDING";

export interface Task {
  id: number;
  name: string;
  description: string;
  priority: Priority;
  status: Status;
  createdDate: string;
  completedDate?: string;
  imageUrl?: string;
  username: string;
  assignedUsername?: string;
}
