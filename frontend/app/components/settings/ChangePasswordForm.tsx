"use client";

import { useState } from "react";

interface ChangePasswordFormProps {
  user: {
    username: string;
    email: string;
    avatar?: string;
  };
  onCancel: () => void;
  onSubmit: (currentPassword: string, newPassword: string) => void;
}

export default function ChangePasswordForm({
  user,
  onCancel,
  onSubmit,
}: ChangePasswordFormProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    onSubmit(currentPassword, newPassword);
  };

  return (
    <div className="w-full bg-white rounded-xl p-6 mb-6 max-w-lg shadow-md">
      <h2 className="inline-block font-bold text-2xl border-b-2 border-orange-500 pb-3">
        Change Password
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div>
          <label className="block text-sm mb-1">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border p-2 rounded max-w-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border p-2 rounded max-w-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border p-2 rounded max-w-md"
            required
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Update Password
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
