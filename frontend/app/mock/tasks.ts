export type Priority = "Extremely" | "Moderate" | "Low";
export type Status = "Completed" | "In Progress" | "Not Completed";

export interface Task {
  id: number;
  name: string;
  description: string;
  priority: Priority;
  status: Status;
  createdDate: string;
  completedDate?: string;
  imageUrl?: string;
}

export const mockTasks: Task[] = [
  {
    id: 1,
    name: "Design Homepage",
    description:
      "Create the homepage design for the new app, including a clean and modern layout, intuitive navigation bar, hero section with a clear call-to-action, and responsive design for both desktop and mobile. Ensure that the color scheme follows the brand guidelines and typography is consistent across all sections. Also, prepare reusable UI components such as buttons, cards, and modals for future development.",
    priority: "Extremely",
    status: "In Progress",
    createdDate: new Date().toISOString(),
    imageUrl: "/ach3 1.png",
  },
  {
    id: 2,
    name: "Setup Database",
    description: "Install MySQL and setup initial tables",
    priority: "Moderate",
    status: "Not Completed",
    createdDate: new Date().toISOString(),
    imageUrl: "/ach3 1.png",
  },
  {
    id: 3,
    name: "Implement Login",
    description: "Create login page and connect with fake backend",
    priority: "Extremely",
    status: "Completed",
    createdDate: new Date().toISOString(),
    completedDate: new Date().toISOString(),
    imageUrl: "/ach3 1.png",
  },
  {
    id: 4,
    name: "Implement Dashboard",
    description: "Create dashboard for admin panel",
    priority: "Extremely",
    status: "Completed",
    createdDate: new Date().toISOString(),
    completedDate: new Date().toISOString(),
    imageUrl: "/ach3 1.png",
  },
];
