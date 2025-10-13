"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import Search from "../core/Search";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const match = document.cookie.match(/user=([^;]+)/);
    if (match) setUser(JSON.parse(decodeURIComponent(match[1])));
  }, []);

  const pageTitle: Record<string, string> = {
    "/": t("Dashboard"),
    "/tasks": t("Tasks"),
    "/categories": t("Task Categories"),
  };
  const title = pageTitle[pathname] || "To-do";

  const splitTitle = (text: string) => {
    if (text === "Dashboard") return ["Dash", "board"];
    if (text === "To-do") return ["To", "-do"];
    if (text === "Tasks") return ["Tasks", ""];
    if (text === "Task Categories") return ["Task", "Categories"];
    return [text, ""];
  };
  const [first, second] = splitTitle(title);

  const toggleLanguage = () => {
    const newLang = i18n.language === "jp" ? "en" : "jp";
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="bg-white shadow-md px-4 md:px-8 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold">
        <span className="text-[#FF6767]">{first}</span>
        <span className="text-black">{second}</span>
      </h2>

      <div className="flex items-center gap-3">
        <Search onSearch={pathname === "/tasks" ? onSearch : undefined} />

        <div className="flex flex-col text-right">
          <span className="text-black text-sm font-medium">
            {new Date().toLocaleDateString(
              i18n.language === "jp" ? "ja-JP" : "en-US",
              { weekday: "long" }
            )}
          </span>
          <span className="text-[#3ABEFF] text-xs">
            {new Date().toLocaleDateString(
              i18n.language === "jp" ? "ja-JP" : "en-GB"
            )}
          </span>
        </div>

        <button
          onClick={toggleLanguage}
          className={`px-3 py-1.5 border rounded transition-all duration-300 font-medium ${
            i18n.language === "jp"
              ? "bg-orange-500 text-white border-orange-600"
              : "bg-gray-100 text-gray-800 border-gray-300"
          } hover:opacity-90`}
        >
          {i18n.language === "jp" ? "🇯🇵 日本語" : "🇬🇧 English"}
        </button>
      </div>
    </header>
  );
}
