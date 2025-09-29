"use client";

import Layout from "@/app/components/layout";
import CategoriesAdd from "@/app/components/categories/categoriesAdd";

export default function AddCategoryPage() {
  return (
    <Layout>
        <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
          <CategoriesAdd />
        </div>
    </Layout>
  );
}
