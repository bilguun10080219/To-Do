import Layout from "../components/layout";
import TaskList from "./components/TaskList";
import Button from "../components/core/Button";
import { Plus } from "lucide-react";

export default function TasksPage() {
  return (
    <Layout>
      <div className="flex justify-end">
        <Button leftIcon={<Plus />} variant="primary">
          Add New Task
        </Button>
      </div>

      <TaskList />
    </Layout>
  );
}
