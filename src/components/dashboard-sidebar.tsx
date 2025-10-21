"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  FileText,
  GraduationCap,
  Building2,
  Table2,
  UserCheck,
  Users,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: FileText },
  { href: "/dashboard/exams", label: "Exams", icon: Calendar },
  { href: "/dashboard/classrooms", label: "Classrooms", icon: Building2 },
  { href: "/dashboard/tables", label: "Tables", icon: Table2 },
  { href: "/dashboard/supervisors", label: "Supervisors", icon: Users },
  { href: "/dashboard/candidates", label: "Candidates", icon: UserCheck },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden lg:block">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-slate-900 p-2 rounded-lg">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-slate-900">Exam System</h2>
            <p className="text-xs text-slate-600">Management</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  size="sm"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
