"use client";

import { useState } from "react";
import CategoriesCard from "./catagoriesCard";
import StatusModal from "./statusModal";
import PriorityModal from "./priorityModal";
import EditModal from "./editModal";
import { useTranslation } from "react-i18next"; 

export default function CategoriesList() {
  const [openModal, setOpenModal] = useState<"status" | "priority" | "edit" | null>(null);
  const [editRow, setEditRow] = useState<{ id: number; name: string } | null>(null);

  const { t } = useTranslation(); 

  return (
    <div className="w-full">

      <CategoriesCard
        title={t("Task Status")}
        addLabel={t("Add Task Status")}
        rows={[
          { id: 1, name: t("Completed") },
          { id: 2, name: t("In Progress") },
          { id: 3, name: t("Not Started") },
        ]}
        onEditRow={(row) => setEditRow(row)}
        onAdd={() => setOpenModal("status")}
      />

      <CategoriesCard
        title={t("Task Priority")}
        addLabel={t("Add New Priority")}
        rows={[
          { id: 1, name: t("Extreme") },
          { id: 2, name: t("Moderate") },
          { id: 3, name: t("Low") },
        ]}
        onAdd={() => setOpenModal("priority")}
        onEditRow={(row) => setEditRow(row)}
      />

      {openModal === "status" && (
        <StatusModal
          onClose={() => setOpenModal(null)}
        />
      )}

      {openModal === "priority" && (
        <PriorityModal
          onClose={() => setOpenModal(null)}
        />
      )}

      {editRow && (
        <EditModal
          onClose={() => {
            setOpenModal(null);
            setEditRow(null);
          }}
        />
      )}
    </div>
  );
}
