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
} from "lucide-react";
import { useEffect, useState } from "react";
import { User } from "@/app/mock/auth";

interface UserData {
  username: string;
  email: string;
  role: string;
}

export default function Sidebar() {
  const pathname = usePathname();

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


  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed: User = JSON.parse(storedUser);
      setUser(parsed);
    }
  }, []);

  return (
    <aside className="w-fit min-h-screen bg-[#FF6767] text-white p-6 flex flex-col rounded-r-2xl">
      {/* Profile хэсэг */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={"/default-avatar.jpg"}
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-white mb-3"
        />
        <h2 className="font-semibold text-lg">{user ? user.username : "Guest"}</h2>
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
                {link.icon && <span>{link.icon}</span>}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
        className="flex items-center gap-2 mb-4 p-3 rounded-lg transition-colors hover:bg-white hover:text-red-500"
      >
        <LogOut size={20} />
        Logout
      </button>


      <div className="mt-auto text-sm opacity-80">v1.0.0</div>
    </aside>
  );
}