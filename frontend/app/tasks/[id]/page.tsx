"use client";

import { useParams } from "next/navigation";
import ViewTask from "@/app/components/task/ViewTask";
import Layout from "@/app/components/layout";

export default function ViewTaskPage() {
  const { id } = useParams();

  return (
    <Layout>
      <div className="flex w-full min-h-screen">
        {/* Pass the ID down to ViewTask */}
        <ViewTask id={id as string} />
      </div>
    </Layout>
  );
}
