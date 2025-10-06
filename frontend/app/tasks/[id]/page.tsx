"use client";

import { useParams } from "next/navigation";
import ViewTask from "@/app/components/task/ViewTask";
import Layout from "@/app/components/layout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ViewTaskPage() {
  const { id } = useParams();
  const router = useRouter();
  
    useEffect(() => {
      const user = localStorage.getItem("user");
      if (!user) {
        router.push("/login");
      }
    }, [router]);

  return (
    <Layout>
      <div className="flex w-full min-h-screen">
        {/* Pass the ID down to ViewTask */}
        <ViewTask id={id as string} />
      </div>
    </Layout>
  );
}
