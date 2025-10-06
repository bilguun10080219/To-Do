import Layout from "./components/layout";
import TaskList from "./tasks/components/TaskList";
import TaskStatus from "./tasks/components/TaskStatus";
import CompletedTasksList from "./tasks/components/CompletedTaskList";
import AllTasksList from "./tasks/components/TaskAll";

export default function Page() {
  return (
    <div>
      <Layout>
        <div className="flex flex-row gap-4">
          {/* Зүүн тал - TaskList */}
          <div className="flex-1 min-w-[350px]">
            <AllTasksList />
          </div>

          {/* Баруун тал - TaskStatus + CompletedTasksList */}
          <div className="flex-1 flex flex-col gap-6">
            <TaskStatus />
            <CompletedTasksList />
          </div>
        </div>
      </Layout>
    </div>
  );
}
