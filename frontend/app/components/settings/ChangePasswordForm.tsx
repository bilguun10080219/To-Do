"use client";

import { useState } from "react";
import { changePassword } from "@/app/services/userApi";
import { useTranslation } from "react-i18next";

interface ChangePasswordFormProps {
  user: { username: string };
  onCancel: () => void;
}

export default function ChangePasswordForm({
  user,
  onCancel,
}: ChangePasswordFormProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert(t("Passwords do not match"));
      return;
    }

    try {
      await changePassword(user.username, currentPassword, newPassword);
      alert(t("Password updated successfully! Please log in again."));

      localStorage.removeItem("token");
      window.location.href = "/login";

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error(err);
      alert(
        t("Failed to update password:") +
          " " +
          (err.response?.data || err.message)
      );
    }
  };

  return (
    <div className="w-full bg-white rounded-xl p-6 mb-6 max-w-lg shadow-md">
      <h2 className="inline-block font-bold text-2xl border-b-2 border-orange-500 pb-3">
        {t("Change Password")}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div>
          <label className="block text-sm mb-1">
            {t("Current Password")}
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border p-2 rounded max-w-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">{t("New Password")}</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border p-2 rounded max-w-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            {t("Confirm Password")}
          </label>
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
            {t("Update Password")}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            {t("Cancel")}
          </button>
        </div>
      </form>
    </div>
  );
}
