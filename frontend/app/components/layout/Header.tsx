"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Search from "../core/Search";

interface User {
  username: string;
  email: string;
  role: string;
}

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({onSearch}: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const match = document.cookie.match(/user=([^;]+)/);
    if (match) setUser(JSON.parse(decodeURIComponent(match[1])));
  }, []);

  // Route бүрийн title
  const pageTitle: Record<string, string> = {
    "/": "Dashboard",
    "/tasks": "To-do",
    "/categories": "Categories",
  };

  const title = pageTitle[pathname] || "To-do";

  // Title-г хоёр хэсэгт хуваах функц
  const splitTitle = (text: string) => {
    if (text === "Dashboard") return ["Dash", "board"];
    if (text === "To-do") return ["To", "-do"];
    if (text === "Categories") return ["Cate", "gories"];
    return [text, ""];
  };

  const [first, second] = splitTitle(title);



  return (
    <header className="bg-white min-h-[60px] shadow-md px-8 py-4 flex flex-row justify-between items-center">
      <h2 className="text-2xl font-bold pl-[72px]">
        <span className="text-[#FF6767]">{first}</span>
        <span className="text-black">{second}</span>
      </h2>

      {/* Search-д callback дамжуулж байна */}
      <Search onSearch={pathname === "/tasks" ? onSearch : undefined} />
      <div className="flex flex-col items-end text-right ml-4">
        {/* Дээд мөр: долоо хоногийн өдөр */}
        <span className="text-black text-sm font-medium">
          {new Date().toLocaleDateString("en-US", { weekday: "long" })}
        </span>

        {/* Доод мөр: огноо dd/mm/yyyy */}
        <span className="text-[#3ABEFF] text-xs">
          {new Date().toLocaleDateString("en-GB")}
        </span>
      </div>
    </header>
  );
}
