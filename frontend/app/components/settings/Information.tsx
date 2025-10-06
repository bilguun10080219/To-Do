"use client";

import { useState } from "react";
import { updateUser } from "@/app/services/userApi";

interface InformationProps {
  user: {
    username: string;
    email: string;
    avatar?: string;
  };
}

export default function Information({ user }: InformationProps) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(user.username, username, email); // pass old username
      alert("Profile updated successfully!");
      localStorage.setItem("user", JSON.stringify({ username, email }));
    } catch (err: any) {
      console.error(err);
      alert("Failed to update profile: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="w-full bg-white rounded-xl p-6 mb-6 shadow-md max-w-lg">
      <h2 className="inline-block font-bold text-2xl border-b-2 border-orange-500 pb-3">
        General Settings
      </h2>

      <div className="flex items-center gap-4 my-6">
        <img
          src={"/default-avatar.jpg"}
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-white mb-3"
        />
        <div>
          <p className="font-semibold text-lg">{username}</p>
          <p className="text-gray-500 text-sm">{email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
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
            Save Changes
          </button>
          <button
            type="reset"
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
            onClick={() => {
              setUsername(user.username);
              setEmail(user.email);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
