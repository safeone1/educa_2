"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  FileText,
  Building2,
  Table2,
  ArrowRight,
  Users,
} from "lucide-react";

const DashboardPage = () => {
  const stats = [
    {
      label: "Total Exams",
      value: "12",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+3 this month",
      href: "/dashboard/exams",
    },
    {
      label: "Scheduled",
      value: "8",
      icon: Calendar,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      change: "Upcoming",
      href: "/dashboard/exams",
    },
    {
      label: "Classrooms",
      value: "15",
      icon: Building2,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "5 available",
      href: "/dashboard/classrooms",
    },
    {
      label: "Total Tables",
      value: "45",
      icon: Table2,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "Across all rooms",
      href: "/dashboard/tables",
    },
  ];

  const quickLinks = [
    {
      title: "Manage Exams",
      description: "Create, edit, and schedule examinations",
      icon: Calendar,
      href: "/dashboard/exams",
      color: "text-blue-600",
    },
    {
      title: "Classrooms",
      description: "Organize classrooms and seating arrangements",
      icon: Building2,
      href: "/dashboard/classrooms",
      color: "text-purple-600",
    },
    {
      title: "Candidates",
      description: "Manage student information and enrollment",
      icon: Users,
      href: "/dashboard/candidates",
      color: "text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-slate-900">
                Dashboard
              </h1>
              <p className="text-sm text-slate-600">
                Welcome back to Faculty Portal
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                FP
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Link key={index} href={stat.href}>
              <Card className="hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-slate-900 mb-1">
                        {stat.value}
                      </p>
                      <p className="text-xs text-slate-500">{stat.change}</p>
                    </div>
                    <div
                      className={`p-3 rounded-full ${stat.bgColor} ${stat.color}`}
                    >
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-serif font-bold text-slate-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <Link key={index} href={link.href}>
                <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 rounded-lg bg-slate-100 ${link.color}`}
                      >
                        <link.icon className="w-6 h-6" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {link.title}
                    </h3>
                    <p className="text-sm text-slate-600">{link.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-serif font-bold text-slate-900 mb-4">
            Recent Activity
          </h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">
                      New exam scheduled
                    </p>
                    <p className="text-xs text-slate-600">
                      Data Structures Final - Nov 15, 2025
                    </p>
                  </div>
                  <span className="text-xs text-slate-500">2 hours ago</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">
                      Classroom updated
                    </p>
                    <p className="text-xs text-slate-600">
                      Tables added to A-101
                    </p>
                  </div>
                  <span className="text-xs text-slate-500">5 hours ago</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">
                      Candidates enrolled
                    </p>
                    <p className="text-xs text-slate-600">
                      15 new students registered
                    </p>
                  </div>
                  <span className="text-xs text-slate-500">1 day ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
