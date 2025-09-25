// app/components/layout/index.tsx
import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-w-screen gap-[57px] bg-gray-100">
      <Header />

      <div className="flex-1 flex flex-row">
        <Sidebar />
        <div className="flex flex-col justify-between">
          <main className="flex flex-row w-full p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
