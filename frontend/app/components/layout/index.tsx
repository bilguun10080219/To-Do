// app/components/layout/index.tsx
import React, { ReactNode } from "react";
import cn from "classnames";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div
      className={cn(
        "flex flex-col min-w-screen gap-[57px] bg-gray-100",
        className
      )}
    >
      <Header />

      <div className="flex-1 flex flex-row">
        <Sidebar />
        <div className="flex flex-col flex-1 justify-between">
          <main className="flex flex-col items-start gap-3 p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
