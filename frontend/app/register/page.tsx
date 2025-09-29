"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "../components/form/Form";
import FormItem from "../components/form/FormItem";
import Input from "../components/core/Input";
import Button from "../components/core/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("You must agree to the terms.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);
    // mock registration logic
    setTimeout(() => {
      setLoading(false);
      alert("Registration successful!");
      router.push("/login");
    }, 1000);
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
            alt="Login illustration"
            className="object-contain w-[613px] h-[613px]"
          />
          <div className="flex flex-col w-full items-start gap-2">
            <h1 className="text-2xl font-semibold mb-6 text-center">Sign Up</h1>

            <FormItem label="First Name">
              <Input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                required
              />
            </FormItem>

            <FormItem label="Last Name">
              <Input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                required
              />
            </FormItem>

            <FormItem label="Username">
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </FormItem>

            <FormItem label="Email">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </FormItem>

            <FormItem label="Password">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </FormItem>

            <FormItem label="Confirm Password">
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />
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
