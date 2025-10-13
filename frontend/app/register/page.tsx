"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "../components/form/Form";
import FormItem from "../components/form/FormItem";
import Input from "../components/core/Input";
import Button from "../components/core/Button";
import { User, Mail, Lock, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next"; 
import "@/app/i18n"; 

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useTranslation(); 

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert(t("You must agree to the terms and conditions."));
      return;
    }
    if (!username || !email || !password) {
      alert(t("All fields are required."));
      return;
    }
    if (password !== confirmPassword) {
      alert(t("Passwords do not match."));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        alert(t("Registration successful! You can now log in."));
        router.push("/login");
      } else {
        const msg = await res.text();
        alert(msg || t("Registration failed"));
      }
    } catch (err) {
      console.error("Error:", err);
      alert(t("Error connecting to the server."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FF6767] px-28">
      <Form
        onSubmit={handleSubmit}
        className="w-full bg-white p-6 rounded-2xl shadow-md"
      >
        <div className="flex flex-row justify-between">
          {/* --- Left: Illustration --- */}
          <img
            src="/ach3%201.png"
            alt="Register illustration"
            className="object-contain w-[400px] h-[400px]"
          />

          {/* --- Right: Form --- */}
          <div className="flex flex-col w-full items-start gap-4">
            <h1 className="text-2xl font-semibold mb-4 text-center w-full">
              {t("Sign Up")}
            </h1>

            {/* Username */}
            <FormItem label={t("Username")}>
              <div className="relative w-full">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t("Enter your username")}
                  className="pl-10"
                  required
                />
              </div>
            </FormItem>

            {/* Email */}
            <FormItem label={t("Email")}>
              <div className="relative w-full">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("Enter your email")}
                  className="pl-10"
                  required
                />
              </div>
            </FormItem>

            {/* Password */}
            <FormItem label={t("Password")}>
              <div className="relative w-full">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("Enter your password")}
                  className="pl-10"
                  required
                />
              </div>
            </FormItem>

            {/* Confirm Password */}
            <FormItem label={t("Confirm Password")}>
              <div className="relative w-full">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t("Confirm your password")}
                  className="pl-10"
                  required
                />
              </div>
            </FormItem>

            {/* Terms Checkbox */}
            <FormItem>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4"
                />
                {t("I agree to the terms and conditions")}
              </label>
            </FormItem>

            {/* Submit */}
            <Button type="submit" className="mt-4" disabled={loading}>
              {loading ? t("Registering...") : t("Register")}
            </Button>

            {/* Link to Login */}
            <p className="text-center mt-4 text-sm text-gray-500 w-full">
              {t("Already have an account?")}{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => router.push("/login")}
              >
                {t("Sign In")}
              </span>
            </p>
          </div>
        </div>
      </Form>
    </div>
  );
}
