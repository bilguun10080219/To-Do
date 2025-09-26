"use client";
import { useEffect, useState } from "react";
import Button from "../core/Button";
import { LogOut } from "lucide-react";

interface User {
  username: string;
  email: string;
  role: string;
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed: User = JSON.parse(storedUser);
      setUser(parsed);
    }
  }, []);

  return (
    <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-700 pl-[72px]">Dashboard</h2>
      <div className="flex items-center space-x-4">
        {/* Logout хажууд зөвхөн username харуулах */}
        <span className="text-gray-500">{user ? user.username : "Guest"}</span>
        <Button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-all"
          leftIcon={<LogOut />}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
