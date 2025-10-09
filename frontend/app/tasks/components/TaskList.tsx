"use client";

import { useState } from "react";
import TaskCard from "./TaskCard";
import { Task } from "@/app/mock/tasks";
import { Plus } from "lucide-react";
import AddTask from "@/app/components/task/AddTask";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useTranslation } from "react-i18next";

interface TaskListProps {
  status?: string;
  tasks: Task[];
  role?: string;
  selectedUser?: string;
}

export default function TaskList({ status = "", tasks, role, selectedUser }: TaskListProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="p-6 bg-white min-h-full rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 gap-8 flex-wrap">
        <h2 className="text-xl font-semibold">{t(status)}</h2>
        {status === "PENDING" && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg 
                 bg-gray-200 text-gray-800 font-medium 
                 hover:bg-orange-500 hover:text-white 
                 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            {t("Add New Task")}
          </button>
        )}
      </div>

      {/* Task list */}
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[200px] flex flex-col gap-3"
          >
            {tasks.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center 
                              bg-gray-50 border border-dashed border-gray-300 
                              rounded-lg h-32 text-gray-400 gap-2"
              >
                <span className="text-sm">{t("No tasks here")}</span>
              </div>
            ) : (
              tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskCard
                        task={task}
                        imageUrl={task.imageUrl}
                        selectedUser={selectedUser}
                      />
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Modal for Add Task */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <AddTask
            onClose={() => {
              setIsAdding(false);
              window.location.reload();
            }}
          />
        </div>
      )}
    </div>
  );
}
