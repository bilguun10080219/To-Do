"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "../components/form/Form";
import FormItem from "../components/form/FormItem";
import Input from "../components/core/Input";
import Button from "../components/core/Button";
import { registerUser } from "../mock/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = registerUser(username, email, password);
    setLoading(false);

    if (result.success) {
      alert(result.message);
      router.push("/login"); // бүртгэл амжилттай бол login руу
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Form
        onSubmit={handleSubmit}
        className="w-96 bg-white p-6 rounded-2xl shadow-md"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>

        <FormItem label="Username">
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </FormItem>

        <FormItem label="Email">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </FormItem>

        <FormItem label="Password">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </FormItem>

        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </Form>
    </div>
  );
}
