"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Mail, Phone, User } from "lucide-react";

type Candidate = {
  id: string;
  name: string;
  email: string;
  studentId: string;
  phone?: string;
  status: "Active" | "Inactive";
};

const CandidatesPage = () => {
  const candidates: Candidate[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@university.edu",
      studentId: "CS2021001",
      phone: "+1 555-0100",
      status: "Active",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@university.edu",
      studentId: "CS2021002",
      phone: "+1 555-0101",
      status: "Active",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "m.brown@university.edu",
      studentId: "CS2021003",
      status: "Active",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.d@university.edu",
      studentId: "CS2021004",
      phone: "+1 555-0103",
      status: "Inactive",
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
                Candidates
              </h1>
              <p className="text-sm text-slate-600">
                Manage exam candidates and students
              </p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Candidate
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <Card
              key={candidate.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-semibold">
                      {candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {candidate.name}
                      </CardTitle>
                      <CardDescription>{candidate.studentId}</CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant={
                      candidate.status === "Active" ? "default" : "secondary"
                    }
                  >
                    {candidate.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{candidate.email}</span>
                </div>
                {candidate.phone && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone className="w-4 h-4" />
                    <span>{candidate.phone}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CandidatesPage;
