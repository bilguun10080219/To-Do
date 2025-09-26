"use client";
import { useEffect, useState } from "react";
import Button from "../core/Button";
import { LogOut } from "lucide-react";

export default function Header() {
  const [user, setUser] = useState<{ email: string; role: string } | null>(
    null
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      console.log("Loaded user:", storedUser); // 👈 энд юу хадгалагдсан байгааг хар
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-700 pl-[72px]">Dashboard</h2>
      <div className="flex items-center space-x-4">
        <span className="text-gray-500">{user ? user.email : "Guest"}</span>
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
