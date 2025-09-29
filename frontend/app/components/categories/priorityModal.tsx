"use client";

import { useState } from "react";

interface PriorityModalProps {
  onClose: () => void;
  initialValue?: string;
}

export default function PriorityModal({ onClose, initialValue = "" }: PriorityModalProps) {
  const [priorityName, setPriorityName] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPriority = { name: priorityName };
    console.log("Saving Priority:", newPriority);
    // TODO: API холболт хийх (POST эсвэл PUT)
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#F9F9F9] w-[918px] h-[708px] rounded-md border border-gray-300 shadow-2xl p-8">
        <form onSubmit={handleSubmit} className="h-full flex flex-col space-y-6">

          <div className="flex justify-between items-center pb-2">
            <h2 className="text-xl font-bold text-gray-800">
              {initialValue ? "Edit Task Priority" : "Add Task Priority"}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-600 hover:underline"
            >
              ✕
            </button>
          </div>

          <div className="bg-white flex-1 rounded-lg border border-gray-200 shadow p-8 space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">
                Task Priority Name
              </label>
              <input
                type="text"
                value={priorityName}
                onChange={(e) => setPriorityName(e.target.value)}
                placeholder="e.g. High"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
            >
              {initialValue ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
