
import Layout from "../components/layout";
import Button from "../components/core/Button";
import { Plus } from "lucide-react";
import AddTask from "../components/task/AddTask";

export default function CategoriesPage() {


  return (
    <Layout>
        <div className="flex justify-end mb-4">
          <h1 className="text-2xl font-bold mb-4">Task Categories</h1>
        </div>
    </Layout>
  );
}
