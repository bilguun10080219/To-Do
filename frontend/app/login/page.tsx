"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Form from "../components/form/Form";
import Button from "../components/core/Button";
import Input from "../components/core/Input";
import FormItem from "../components/form/FormItem";
import { User, Lock, Globe } from "lucide-react";
import { useTranslation } from "react-i18next"; 
import "@/app/i18n"; 

const USE_FAKE_LOGIN = false;

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation(); 
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (USE_FAKE_LOGIN) {
        const user =
          username === "admin@example.com" || username === "admin"
            ? { username, role: "admin", name: "Admin" }
            : { username, role: "user", name: "User" };

        localStorage.setItem("user", JSON.stringify(user));
        router.push("/");
      } else {
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
          alert(msg || t("Invalid credentials"));
        }
      }
    } catch (err) {
      console.error(err);
      alert(t("Error connecting to server"));
    } finally {
      setLoading(false);
    }
  };
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "jp" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <div className="flex px-28 items-center justify-center min-h-screen bg-[#FF6767]">
      <button
        onClick={toggleLanguage}
        className="absolute top-6 right-6 flex items-center gap-2 bg-white text-[#FF6767] px-3 py-1.5 rounded-lg font-semibold shadow hover:bg-gray-100 transition"
      >
        <Globe size={18} />
        {i18n.language === "en" ? "JP" : "EN"}
      </button>
      <Form
        onSubmit={handleSubmit}
        className="w-full bg-white p-6 rounded-2xl shadow-md"
      >
        <div className="flex flex-row gap-4 justify-between">
          {/* --- Left Side (Form) --- */}
          <div className="flex w-full flex-col gap-5 items-start">
            <h1 className="text-2xl font-semibold mb-6 text-center">
              {t("Sign in")}
            </h1>

            <FormItem label={t("Username")}>
              <div className="relative w-full">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t("Enter username")}
                  className="pl-10"
                  required
                />
              </div>
            </FormItem>

            <FormItem label={t("Password")}>
              <div className="relative w-full">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("Enter password")}
                  className="pl-10"
                  required
                />
              </div>
            </FormItem>

            <Button type="submit" className="mt-4" disabled={loading}>
              {loading ? t("Logging in...") : t("Login")}
            </Button>

            <Button
              type="button"
              variant="secondary"
              className="mt-2"
              onClick={() => router.push("/register")}
            >
              {t("Register")}
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
