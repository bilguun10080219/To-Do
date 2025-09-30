"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Form from "../components/form/Form";
import Button from "../components/core/Button";
import Input from "../components/core/Input";
import FormItem from "../components/form/FormItem";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const user = await res.json();
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/");
      } else {
        const msg = await res.text();
        alert(msg || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    } finally {
      setLoading(false);
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

            <FormItem label="Username">
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
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

            <Button type="submit" className=" mt-4" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="mt-2"
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
