"use client";

import { useState, useEffect } from "react";
import { updateUser } from "@/app/services/userApi";
import { useTranslation } from "react-i18next"; 

interface InformationProps {
  user: {
    username: string;
    email: string;
    avatar?: string;
  };
  onSubmit?: (updatedUser: { username: string; email: string }) => void;
}

export default function Information({ user, onSubmit }: InformationProps) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [language, setLanguage] = useState<string>("");
  const { t } = useTranslation(); 

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) setLanguage(savedLang);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const updatedUser = await updateUser(user.username, username, email);

    const existing = JSON.parse(localStorage.getItem("user") || "{}");
    const newUser = {
      ...existing,
      username: updatedUser.username,
      email: updatedUser.email,
    };

    localStorage.setItem("user", JSON.stringify(newUser));

    alert(t("Profile updated successfully!")); 
    if (onSubmit) onSubmit({ username: updatedUser.username, email: updatedUser.email });
  } catch (err: any) {
    console.error(err);
    alert(
      t("Failed to update profile:") +
        " " +
        (err.response?.data || err.message)
    ); 
  }
};

  return (
    <div className="w-full bg-white rounded-xl p-6 mb-6 shadow-md max-w-lg">
      <h2 className="inline-block font-bold text-2xl border-b-2 border-orange-500 pb-3">
        {t("General Settings")} 
      </h2>

      <div className="flex items-center gap-4 my-6">
        <img
          src={user.avatar || "/default-avatar.jpg"}
          alt="Profile"
          className="w-30 h-30 rounded-full border-2 border-white mb-3"
        />
        <div>
          <p className="font-semibold text-lg">{username}</p>
          <p className="text-gray-500 text-sm">{email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">{t("Username")}</label> 
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">{t("Email")}</label> 
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            required
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
          >
            {t("Save Changes")} 
          </button>
          <button
            type="reset"
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
            onClick={() => {
              setUsername(user.username);
              setEmail(user.email);
            }}
          >
            {t("Cancel")} 
          </button>
        </div>
      </form>
    </div>
  );
}
