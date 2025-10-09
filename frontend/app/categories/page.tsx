"use client";

import Layout from "../components/layout";
import Button from "../components/core/Button";
import CategoriesList from "../components/categories/catagoriesList";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function CategoriesPage() {
  const router = useRouter();
  const { t } = useTranslation(); 

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  return (
    <Layout>
      <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {t("Task Categories")}
          </h2>
          <Button
            variant="primary"
            onClick={() => router.push("/categories/add")}
          >
            {t("Add Category")}
          </Button>
        </div>

        {/* Categories list */}
        <CategoriesList />
      </div>
    </Layout>
  );
}
