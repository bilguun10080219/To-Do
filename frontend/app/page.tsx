import { LogOut } from "lucide-react";
import Button from "./components/core/Button";
import Layout from "./components/layout";
import Input from "./components/core/Input";
import Status from "./components/core/Status";
import TaskList from "./tasks/components/TaskList";
import TaskStatus from "./tasks/components/TaskStatus";
import CompletedTasksList from "./tasks/components/CompletedTaskList";

// app/page.tsx
export default function Page() {
  return (
    <div>
      <Layout>
        <div className="flex flex-row gap-4">
          <TaskList />
          <div className="flex flex-col gap-6">
            <TaskStatus />
            <CompletedTasksList />
          </div>
        </div>
      </Layout>
    </div>
  );
}
