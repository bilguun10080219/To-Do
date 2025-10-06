"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Form from "../components/form/Form";
import Button from "../components/core/Button";
import Input from "../components/core/Input";
import FormItem from "../components/form/FormItem";
import { User, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    server: "",
  });

  // 🔍 Basic validation logic
  const validate = () => {
    const newErrors: any = {};
    if (!username.trim()) newErrors.username = "Username is required.";
    if (!password.trim()) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;
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
        setErrors({
          username: "",
          password: "",
          server: msg || "Invalid username or password.",
        });
      }
    } catch (err) {
      console.error(err);
      setErrors({
        username: "",
        password: "",
        server: "Error connecting to server. Please try again later.",
      });
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
            <h1 className="text-2xl font-semibold mb-6 text-center">Sign In</h1>

            {/* USERNAME FIELD */}
            <FormItem label="Username">
              <div className="relative w-full">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="pl-10"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </FormItem>

            {/* PASSWORD FIELD */}
            <FormItem label="Password">
              <div className="relative w-full">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="pl-10"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </FormItem>

            {/* SERVER/GENERAL ERROR */}
            {errors.server && (
              <p className="text-red-500 text-sm mt-1">{errors.server}</p>
            )}

            {/* BUTTONS */}
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
          </div>

          {/* IMAGE */}
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
