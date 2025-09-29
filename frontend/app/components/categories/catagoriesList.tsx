"use client";

import { useState } from "react";
import CategoriesCard from "./catagoriesCard";
import StatusModal from "./statusModal";
import PriorityModal from "./priorityModal";
import EditModal from "./editModal";

export default function CategoriesList() {
  const [openModal, setOpenModal] = useState<"status" | "priority" | "edit" | null>(null);
  const [editRow, setEditRow] = useState<{ id: number; name: string } | null>(null);

  return (
    <div className="w-full">

      <CategoriesCard
        title="Task Status"
        addLabel="Add Task Status"
        rows={[
          { id: 1, name: "Completed" },
          { id: 2, name: "In Progress" },
          { id: 3, name: "Not Started" },
        ]}
        onEditRow={(row) => setEditRow(row)}
        onAdd={() => setOpenModal("status")}
      />

      <CategoriesCard
        title="Task Priority"
        addLabel="Add New Priority"
        rows={[
          { id: 1, name: "Extreme" },
          { id: 2, name: "Moderate" },
          { id: 3, name: "Low" },
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
