"use client";

import Layout from "@/app/components/layout";
import ChangePasswordForm from "@/app/components/settings/ChangePasswordForm";
import Information from "../components/settings/Imformation";

export default function SettingsPage() {
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

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
            onSubmit={(cur, next) => console.log("Password update", cur, next)}
          />
        </div>
      </div>
    </Layout>
  );
}
