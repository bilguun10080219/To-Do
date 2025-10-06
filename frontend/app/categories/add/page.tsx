"use client";

import Layout from "@/app/components/layout";
import CategoriesAdd from "@/app/components/categories/categoriesAdd";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddCategoryPage() {
    const router = useRouter();
    
      useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
          router.push("/login");
        }
      }, [router]);
  return (
    <Layout>
        <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
          <CategoriesAdd />
        </div>
    </Layout>
  );
}
