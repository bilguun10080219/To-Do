"use client";

import Layout from "../components/layout";
import Button from "../components/core/Button";
import CategoriesList from "../components/categories/catagoriesList";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CategoriesPage() {
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
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Task Categories</h2>
          <Button variant="primary" onClick={() => router.push("/categories/add")}>
            Add Category
          </Button>
        </div>

        
        <CategoriesList />
      </div>
    </Layout>
  );
}
