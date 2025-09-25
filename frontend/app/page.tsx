import { LogOut } from "lucide-react";
import Button from "./components/core/Button";
import Layout from "./components/layout";
import Input from "./components/core/Input";
import Status from "./components/core/Status";

// app/page.tsx
export default function Page() {
  return (
    <div>
      <Layout>
        <Button>button</Button>
        <Button leftIcon={<LogOut />}>Log out</Button>
        <Button disabled>button</Button>
        <Button variant="secondary">button</Button>
        <Button variant="danger">button</Button>
        <Input />

        <Status status="completed" />
        <Status status="in-progress" />
        <Status status="not-completed" />
      </Layout>
    </div>
  );
}
