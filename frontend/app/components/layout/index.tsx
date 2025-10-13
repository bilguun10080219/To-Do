"use client";

import React, { ReactNode, useEffect, useState } from "react";
import cn from "classnames";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import "@/app/i18n";

interface LayoutProps {
  children: ReactNode;
  className?: string;
  onSearch?: (query: string) => void;
}

export default function Layout({ children, className, onSearch }: LayoutProps) {
  const [username, setUsername] = useState<string>("");
  const pathname = usePathname();
  const { t } = useTranslation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header onSearch={onSearch} />
      <div className="flex-1 h-screen flex flex-col md:flex-row overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {pathname === "/" && username && (
            <span className="font-medium text-4xl text-black mb-6 block">
              {t("Welcome back")}, {username}
            </span>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
