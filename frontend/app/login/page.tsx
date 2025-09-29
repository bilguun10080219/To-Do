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
    <div className="flex px-28 items-center justify-center min-h-screen bg-[#FF6767]">
      <Form
        onSubmit={handleSubmit}
        className="w-full bg-white p-6 rounded-2xl shadow-md"
      >
        <div className="flex flex-row gap-4 justify-between">
          <div className="flex w-full flex-col gap-5 items-start">
            <h1 className="text-2xl font-semibold mb-6 text-center">Sign in</h1>

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
            <Button
              type="button"
              variant="secondary"
              className="w-full mt-2"
              onClick={() => router.push("/register")}
            >
              Register
            </Button>
          </div>

          <img
            src="/ach3%201.png"
            alt="Login illustration"
            className="object-contain w-[613px] h-[613px]"
          />
        </div>
      </Form>
    </div>
  );
}
