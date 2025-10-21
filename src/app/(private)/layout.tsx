import { DashboardSidebar } from "@/components/dashboard-sidebar";
import React from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: layoutProps) => {
  return (
    <div className="flex h-screen ">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default layout;
