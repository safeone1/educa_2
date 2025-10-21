"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table2, Building2 } from "lucide-react";

const TablesPage = () => {
  const tables = [
    { id: "t1", num: 1, classRoomId: "1", classRoomName: "A-101" },
    { id: "t2", num: 2, classRoomId: "1", classRoomName: "A-101" },
    { id: "t3", num: 3, classRoomId: "1", classRoomName: "A-101" },
    { id: "t4", num: 1, classRoomId: "2", classRoomName: "B-205" },
    { id: "t5", num: 2, classRoomId: "2", classRoomName: "B-205" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-slate-900">
                Tables
              </h1>
              <p className="text-sm text-slate-600">
                View all tables across classrooms
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {tables.map((table) => (
            <Card key={table.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Table2 className="w-5 h-5 text-slate-600" />
                  Table {table.num}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Building2 className="w-4 h-4" />
                  <span>{table.classRoomName}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TablesPage;
