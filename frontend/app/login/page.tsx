"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Form from "../components/form/Form";
import Button from "../components/core/Button";
import Input from "../components/core/Input";
import FormItem from "../components/form/FormItem";
import { User, Lock } from "lucide-react";

const USE_FAKE_LOGIN = true;

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (USE_FAKE_LOGIN) {
        // --- FAKE LOGIN (for testing without backend) ---
        const user =
          username === "admin@example.com" || username === "admin"
            ? { username, role: "admin", name: "Admin" }
            : { username, role: "user", name: "User" };

        localStorage.setItem("user", JSON.stringify(user));
        router.push("/");
      } else {
        // --- REAL LOGIN (talks to Spring Boot backend) ---
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
          {/* --- Left Side (Form) --- */}
          <div className="flex w-full flex-col gap-5 items-start">
            <h1 className="text-2xl font-semibold mb-6 text-center">Sign in</h1>

            <FormItem label="Username">
              <div className="relative w-full">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="pl-10"
                  required
                />
              </div>
            </FormItem>

            <FormItem label="Password">
              <div className="relative w-full">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="pl-10"
                  required
                />
              </div>
            </FormItem>

            <Button type="submit" className="mt-4" disabled={loading}>
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

            {/* Demo login shortcuts */}
            <div className="flex gap-2 mt-3">
              <button
                type="button"
                onClick={() => {
                  localStorage.setItem(
                    "user",
                    JSON.stringify({
                      username: "admin@example.com",
                      role: "admin",
                    })
                  );
                  router.push("/");
                }}
                className="px-3 py-1.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
              >
                Quick Admin
              </button>
            </div>
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
