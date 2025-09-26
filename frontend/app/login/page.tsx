"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Form from "../components/form/Form";
import Button from "../components/core/Button";
import Input from "../components/core/Input";
import FormItem from "../components/form/FormItem";
import { mockUsers } from "../mock/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      router.push("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Form
        onSubmit={handleSubmit}
        className="w-96 bg-white p-6 rounded-2xl shadow-md"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

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
          {loading ? "Logging in..." : "Login"}
        </Button>

        {/* Register руу шилжүүлэх button */}
        <Button
          type="button"
          variant="secondary"
          className="w-full mt-2"
          onClick={() => router.push("/register")}
        >
          Register
        </Button>
      </Form>
    </div>
  );
}
