import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { auth } from "@/lib/auth";
import React from "react";
import { headers } from "next/headers";
interface layoutProps {
  children: React.ReactNode;
}

const layout = async ({ children }: layoutProps) => {
  const session = auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div>Please log in to access the dashboard.</div>;
  }
  return (
    <div className="flex h-screen ">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default layout;
