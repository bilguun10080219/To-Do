"use client";

import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next"; 

interface CategoriesCardProps {
  title: string;
  addLabel: string;
  rows: { id: number; name: string }[];
  onAdd?: () => void; 
  onEditRow?: (row: { id: number; name: string }) => void;
}

export default function CategoriesCard({ title, addLabel, rows, onAdd, onEditRow }: CategoriesCardProps) {
  const { t } = useTranslation(); 

  return (
    <div className="bg-white rounded-xl p-6 mb-6">
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-800 border-b-2 border-red-500 pb-1">
          {t(title)}
        </h3>
        <button
          onClick={onAdd}
          className="text-sm text-red-500 hover:underline"
        >
          + {t(addLabel)}
        </button>
      </div>

      <div className="rounded-lg border border-[#A1A3AB] shadow-sm overflow-hidden">
        
        <div className="grid grid-cols-3 bg-gray-50 font-semibold text-gray-700 border-b border-[#A1A3AB]">
          <div className="px-4 py-3">{t("SN")}</div>
          <div className="px-4 text-center">{t(title)}</div>
          <div className="px-4 py-3 text-center">{t("Action")}</div>
        </div>
       
        {rows.map((row, index) => (
          <div
            key={row.id}
            className="grid grid-cols-3 items-center text-gray-700 bg-white"
          >
            <div className="px-4 py-3">{index + 1}</div>
            <div className="px-4 text-center">{row.name}</div>
            <div className="px-4 py-3 flex justify-center gap-2">
              <button
                className="bg-[#FF6767] text-white px-3 py-1 rounded hover:bg-[#e85b5b] flex items-center gap-1 text-sm"
                onClick={() => onEditRow && onEditRow(row)}
              >
                <FaEdit /> {t("Edit")}
              </button>
              <button
                className="bg-[#FF6767] text-white px-3 py-1 rounded hover:bg-[#e85b5b] flex items-center gap-1 text-sm"
                onClick={() => {
                  if (confirm(t("Are you sure you want to delete?") + ` ${row.name}?`)) {
                    console.log("Deleting:", row.id);
                  }
                }}
              >
                <FaTrash /> {t("Delete")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
