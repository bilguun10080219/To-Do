"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "classnames";
import { FileCheck, Home, LayoutDashboard, List } from "lucide-react"; // icons

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard", icon: <LayoutDashboard size={24} /> },
    { href: "/tasks", label: "Tasks", icon: <FileCheck size={24} /> },
  ];

  return (
    <aside className="w-[365px] min-h-screen bg-[#FF6767] text-white p-6 flex flex-col rounded-r-2xl">
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
      <div className="mt-auto text-sm opacity-80">v1.0.0</div>
    </aside>
  );
}
