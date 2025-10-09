"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "classnames";
import {
  FileCheck,
  LayoutDashboard,
  List,
  LogOut,
  Settings
} from "lucide-react";
import { useEffect, useState } from "react";
import { User } from "@/app/mock/auth";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Invalid user data in localStorage:", error);
      }
    }
  }, []);

  const links = [
    { href: "/", label: t("Dashboard"), icon: <LayoutDashboard size={24} /> },
    { href: "/tasks", label: t("Tasks"), icon: <FileCheck size={24} /> },
    { href: "/categories", label: t("Task Categories"), icon: <List size={20} /> },
    { href: "/settings", label: t("Settings"), icon: <Settings size={20} /> },
  ];


  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <aside className="w-fit min-h-screen bg-[#FF6767] text-white p-6 flex flex-col rounded-r-2xl">
      {/* Profile section */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={"/default-avatar.jpg"}
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-white mb-3"
        />
        <h2 className="font-semibold text-lg">{user?.username || "Guest"}</h2>
        <p className="text-sm opacity-80">{user?.email || "guest@example.com"}</p>
      </div>

      {/* Navigation links */}
      <nav className="flex-1">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "flex items-center gap-2 mb-4 p-3 rounded-lg transition-colors",
                  pathname === link.href
                    ? "bg-white text-red-500 font-semibold"
                    : "hover:bg-white hover:text-red-500"
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 mb-4 p-3 rounded-lg transition-colors hover:bg-white hover:text-red-500"
      >
        <LogOut size={20} />
        {t("Logout")}
      </button>

      <div className="mt-auto text-sm opacity-80">v1.0.0</div>
    </aside>
  );
}
