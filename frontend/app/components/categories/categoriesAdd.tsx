"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../core/Button";
import { useTranslation } from "react-i18next"; 

export default function CategoriesAdd() {
  const router = useRouter();
  const [categoryName, setCategoryName] = useState("");
  const { t } = useTranslation(); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCategory = { name: categoryName };
    console.log("Creating category:", newCategory);

    //  POST /api/categories 
    // fetch("/api/categories", { ... })

    setCategoryName("");
    router.back();
  };

  return (
    <div className="w-full h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-orange-500 pb-1">
          {t("Create Categories")}
        </h2>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-gray-600 hover:underline"
        >
          {t("Go Back")}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">
            {t("Category Name")}
          </label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder={t("Enter category name")}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" variant="primary">
            {t("Create")}
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            {t("Cancel")}
          </Button>
        </div>
      </form>
    </div>
  );
}
