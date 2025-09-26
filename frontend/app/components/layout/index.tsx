"use client";

import React, { ReactNode, useEffect, useState } from "react";
import cn from "classnames";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username); // эсвэл user.name байж болно
    }
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col min-w-screen gap-[57px] bg-gray-100",
        className
      )}
    >
      <Header />

      <div className="flex-1 flex flex-row gap-[76px]">
        <div className="flex flex-row">
          <Sidebar />
          <div className="flex flex-col flex-1 gap-[34px]">
            <main className="flex flex-col items-start gap-3 p-4">
              <span className="font-medium text-4xl">
                Welcome back, {username}
              </span>
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
