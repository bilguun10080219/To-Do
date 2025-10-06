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

  // 🧠 Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  // ⚠️ Error messages
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: "",
  });

  // ✅ Validation patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[A-Za-z\s]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validate = () => {
    const newErrors: any = {};

    if (!username.trim()) newErrors.username = "Username is required.";
    else if (!usernameRegex.test(username))
      newErrors.username = "Username must be at least 2 letters (A–Z only).";

    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(email))
      newErrors.email = "Please enter a valid email address.";

    if (!password.trim()) newErrors.password = "Password is required.";
    else if (!passwordRegex.test(password))
      newErrors.password =
        "Password must be 8+ chars, include uppercase, lowercase, number, and special character.";

    if (!confirmPassword.trim())
      newErrors.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    if (!agreeTerms)
      newErrors.agreeTerms = "You must agree to the terms and conditions.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        alert("Registration successful! You can now log in.");
        router.push("/login");
      } else {
        const msg = await res.text();
        setErrors((prev) => ({
          ...prev,
          email: msg || "Registration failed. Please try again.",
        }));
      }
    } catch (err) {
      console.error(err);
      setErrors((prev) => ({
        ...prev,
        email: "Error connecting to the server.",
      }));
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

          <div className="flex flex-col w-full items-start gap-3">
            <h1 className="text-2xl font-semibold mb-4 text-center">Sign Up</h1>

            {/* USERNAME */}
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
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </FormItem>

            {/* EMAIL */}
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
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </FormItem>

            {/* PASSWORD */}
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
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </FormItem>

            {/* CONFIRM PASSWORD */}
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
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </FormItem>

            {/* TERMS CHECKBOX */}
            <FormItem>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                I agree to the terms and conditions
              </label>
              {errors.agreeTerms && (
                <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>
              )}
            </FormItem>

            {/* BUTTON */}
            <Button type="submit" className="mt-4 w-full" disabled={loading}>
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
