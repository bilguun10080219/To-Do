"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "../components/form/Form";
import FormItem from "../components/form/FormItem";
import Input from "../components/core/Input";
import Button from "../components/core/Button";
import { User, Mail, Lock, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!agreeTerms) {
      alert("You must agree to the terms.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (!username || !email || !password) {
      alert("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        const user = await res.json();
        alert("Registration successful! You can now log in.");
        router.push("/login");
      } else {
        const msg = await res.text();
        alert(msg || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col px-28 items-center justify-center min-h-screen bg-[#FF6767]">
      <Form
        onSubmit={handleSubmit}
        className="w-full bg-white p-6 rounded-2xl shadow-md"
      >
        <div className="flex flex-row justify-between">
          <img
            src="/ach3%201.png"
            alt="Register illustration"
            className="object-contain w-[400px] h-[400px]"
          />

          <div className="flex flex-col w-full items-start gap-2">
            <h1 className="text-2xl font-semibold mb-6 text-center">Sign Up</h1>

            <FormItem label="Username">
              <div className="relative w-full">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="pl-10"
                  required
                />
              </div>
            </FormItem>

            <FormItem label="Email">
              <div className="relative w-full">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
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
                  placeholder="Password"
                  className="pl-10"
                  required
                />
              </div>
            </FormItem>

            <FormItem label="Confirm Password">
              <div className="relative w-full">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="pl-10"
                  required
                />
              </div>
            </FormItem>

            <FormItem>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                I agree to the terms and conditions
              </label>
            </FormItem>

            <Button type="submit" className="mt-4" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>

            <p className="text-center mt-4 text-sm text-gray-500">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </Form>
    </div>
  );
}
