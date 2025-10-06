"use client";

import { useEffect, useState } from "react";
import Layout from "@/app/components/layout";
import Information from "../components/settings/Information";
import ChangePasswordForm from "../components/settings/ChangePasswordForm";

export default function SettingsPage() {
  const [currentUser, setCurrentUser] = useState<{ username: string; email: string } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  if (!currentUser) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <div className="flex w-full min-h-screen p-8 gap-8">
        <div className="flex-1">
          <Information user={currentUser} />
        </div>
        <div className="flex-1">
          <ChangePasswordForm
            user={currentUser}
            onCancel={() => (window.location.href = "/")}
          />
        </div>
      </div>
    </Layout>
  );
}
