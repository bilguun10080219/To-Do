"use client";

import { useState } from "react";
import Layout from "../components/layout";
import TaskList from "./components/TaskList";
import Button from "../components/core/Button";
import { Plus } from "lucide-react";
import AddTask from "../components/task/AddTask";

export default function TasksPage() {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <Layout>
      <div className="flex justify-end">
        <Button
          leftIcon={<Plus />}
          variant="primary"
          onClick={() => setIsAdding(true)}  
        >
          Add New Task
        </Button>
      </div>

      <TaskList />

      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <AddTask onClose={() => setIsAdding(false)} />          
        </div>
      )}
    </Layout>
  );
}
