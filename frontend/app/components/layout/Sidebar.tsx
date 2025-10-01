"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "classnames";
import {
  FileCheck,
  Home,
  LayoutDashboard,
  List,
  LogOut,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../core/Button";

interface UserData {
  username: string;
  email: string;
  role: string;
}

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const match = document.cookie.match(/user=([^;]+)/);
    if (match) setUser(JSON.parse(decodeURIComponent(match[1])));
  }, []);

  const links = [
    { href: "/", label: "Dashboard", icon: <LayoutDashboard size={24} /> },
    { href: "/tasks", label: "Tasks", icon: <FileCheck size={24} /> },
    { href: "/categories", label: "Task Categories", icon: <List size={20} /> },
  ];

  const handleLogout = () => {
    // 1️⃣ localStorage устгах (хуучин кодыг хадгалах боломжтой)
    localStorage.removeItem("user");

    // 2️⃣ Cookie устгах
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // 3️⃣ Login руу redirect хийх
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 max-h-screen bg-[#FF6767] text-white items-start p-6 flex flex-col rounded-r-2xl">
      {/* Navigation хэсэг */}
      <nav>
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
                {link.icon && <span>{link.icon}</span>}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Button
        onClick={handleLogout}
        className="flex items-start gap-2 transition-colors px-3 py-2 rounded-lg w-full"
        leftIcon={<LogOut />}
      >
        Logout
      </Button>
      <p className="mt-4 text-xs opacity-70">v1.0.0</p>
    </aside>
  );
}
