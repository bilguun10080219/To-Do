"use client";

import { useParams } from "next/navigation";
import ViewTask from "@/app/components/task/ViewTask";
import { mockTasks } from "@/app/mock/tasks";
import Layout from "@/app/components/layout";

export default function ViewTaskPage() {
  const { id } = useParams();
  const task = mockTasks.find((t) => t.id === Number(id));

  if (!task) return <p className="text-red-500">Task not found</p>;

return (
  <Layout>
    <div className="w-screen max-w-[959px] min-h-screen">
      <ViewTask />
    </div>
  </Layout>
);
}
