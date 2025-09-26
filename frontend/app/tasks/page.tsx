import Layout from "../components/layout";
import TaskList from "./components/TaskList";
import Button from "../components/core/Button";
import { Plus } from "lucide-react";

export default function TasksPage() {
  return (
    <Layout className="flex flex-col gap-4 p-4">
      <div className="flex justify-end">
        <Button leftIcon={<Plus />} variant="primary">
          Add New Task
        </Button>
      </div>

      {/* Task List */}
      <TaskList />
    </Layout>
  );
}
