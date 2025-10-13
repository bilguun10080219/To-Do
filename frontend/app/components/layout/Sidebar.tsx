"use client";

import Link from "next/link";
import cn from "classnames";
import {
  FileCheck,
  LayoutDashboard,
  List,
  LogOut,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const links = [
    { href: "/", label: t("Dashboard"), icon: <LayoutDashboard size={24} /> },
    { href: "/tasks", label: t("Tasks"), icon: <FileCheck size={24} /> },
    {
      href: "/categories",
      label: t("Task Categories"),
      icon: <List size={20} />,
    },
    { href: "/settings", label: t("Settings"), icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Hamburger (mobile only) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-red-500 rounded text-white"
        onClick={() => setOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity md:hidden",
          { "opacity-50 visible": open, "opacity-0 invisible": !open }
        )}
        onClick={() => setOpen(false)}
      />

      <aside
        className={cn(
          "fixed top-0 left-0 h-screen w-64 bg-[#FF6767] text-white p-6 flex flex-col rounded-r-2xl transition-transform transform z-50 md:relative md:translate-x-0 md:h-screen",
          { "-translate-x-full": !open, "translate-x-0": open }
        )}
      >
        <div className="flex flex-col items-center mb-8">
          <img
            src={"/default-avatar.jpg"}
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-white mb-3"
          />
          <h2 className="font-semibold text-lg">{user?.username || "Guest"}</h2>
          <p className="text-sm opacity-80">
            {user?.email || "guest@example.com"}
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center gap-2 mb-4 p-3 rounded-lg transition-colors hover:bg-white hover:text-red-500"
                  onClick={() => setOpen(false)}
                >
                  {link.icon}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 mt-4 p-3 rounded-lg transition-colors hover:bg-white hover:text-red-500"
        >
          <LogOut size={20} />
          {t("Logout")}
        </button>

        <div className="mt-auto text-sm opacity-80 text-center">v1.0.0</div>
      </aside>
    </>
  );
}
