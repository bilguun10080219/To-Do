"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Search from "../core/Search";
import { useTranslation } from "react-i18next";

interface User {
  username: string;
  email: string;
  role: string;
}

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const match = document.cookie.match(/user=([^;]+)/);
    if (match) setUser(JSON.parse(decodeURIComponent(match[1])));
  }, []);

  // Route бүрийн title
   const pageTitle: Record<string, string> = {
    "/": t("dashboard"),
    "/tasks": t("todo"),
    "/categories": t("categories"),
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

  const toggleLanguage = () => {
    const newLang = i18n.language === "jp" ? "en" : "jp";
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="bg-white min-h-[60px] shadow-md px-8 py-4 flex flex-row justify-between items-center">
      <h2 className="text-2xl font-bold pl-[72px]">
        <span className="text-[#FF6767]">{first}</span>
        <span className="text-black">{second}</span>
      </h2>

      {/* Search-д callback дамжуулж байна */}
      <Search onSearch={pathname === "/tasks" ? onSearch : undefined} />
      <div className="flex flex-col items-end text-right ml-4">

        {/* Баруун талын хэсэг (Огноо + Хэл солигч) */}
        <div className="flex items-center gap-3 ml-4">
          {/* Огноо хэсэг */}
          <div className="flex flex-col text-right">
            <span className="text-black text-sm font-medium">
              {new Date().toLocaleDateString(i18n.language === "jp" ? "ja-JP" : "en-US", { weekday: "long" })}
            </span>
            <span className="text-[#3ABEFF] text-xs">
              {new Date().toLocaleDateString(i18n.language === "jp" ? "ja-JP" : "en-GB")}
            </span>
          </div>

          {/* 🟠 Toggle товч */}
          <button
            onClick={toggleLanguage}
            className={`px-3 py-1.5 border rounded transition-all duration-300 font-medium ${i18n.language === "jp"
                ? "bg-orange-500 text-white border-orange-600"
                : "bg-gray-100 text-gray-800 border-gray-300"
              } hover:opacity-90`}
          >
            {i18n.language === "jp" ? "🇯🇵 日本語" : "🇬🇧 English"}
          </button>
        </div>
      </div>
    </header>
  );
}
