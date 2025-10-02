"use client";

import { useState } from "react";
import TaskCard from "./TaskCard";
import { Task } from "@/app/mock/tasks";
import Button from "@/app/components/core/Button";
import { Plus } from "lucide-react";
import AddTask from "@/app/components/task/AddTask";
import { Droppable, Draggable } from "@hello-pangea/dnd";

interface TaskListProps {
  status?: string;
  tasks: Task[];
}

export default function TaskList({ status = "", tasks }: TaskListProps) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="p-6 bg-white rounded-2xl min-h-full shadow-md space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          {status.replace("_", " ")}
        </h2>
        {status === "PENDING" && (
          <Button
            leftIcon={<Plus />}
            variant="primary"
            onClick={() => setIsAdding(true)}
          >
            Add New Task
          </Button>
        )}
      </div>

      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-full flex flex-col gap-3"
          >
            {tasks.map((task, index) => (
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
                    <TaskCard task={task} imageUrl={task.imageUrl} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

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
