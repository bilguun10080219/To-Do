// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "classnames";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/tasks", label: "Tasks" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#FF6767] text-white p-6 flex flex-col rounded-r-2xl">
      <nav className="flex-1">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "block mb-4 p-3 rounded-lg transition-colors",
                  pathname === link.href
                    ? "bg-white text-red-500 font-semibold"
                    : "hover:bg-white hover:text-red-500"
                )}
              >
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
