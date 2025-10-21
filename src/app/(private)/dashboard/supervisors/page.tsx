"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, Mail, Phone, Edit, Trash2, Users, Calendar } from "lucide-react";

type Supervisor = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  department?: string;
  assignedExams: number;
  status: "Active" | "Inactive";
};

const SupervisorsPage = () => {
  const [supervisors, setSupervisors] = useState<Supervisor[]>([
    {
      id: "1",
      name: "Dr. Johnson",
      email: "johnson@university.edu",
      phone: "+1 555-0200",
      department: "Computer Science",
      assignedExams: 5,
      status: "Active",
    },
    {
      id: "2",
      name: "Prof. Brown",
      email: "brown@university.edu",
      phone: "+1 555-0201",
      department: "Mathematics",
      assignedExams: 3,
      status: "Active",
    },
    {
      id: "3",
      name: "Dr. Lee",
      email: "lee@university.edu",
      department: "Physics",
      assignedExams: 4,
      status: "Active",
    },
    {
      id: "4",
      name: "Prof. Martinez",
      email: "martinez@university.edu",
      phone: "+1 555-0203",
      department: "Chemistry",
      assignedExams: 0,
      status: "Inactive",
    },
  ]);

  const [isSupervisorSheetOpen, setIsSupervisorSheetOpen] = useState(false);
  const [newSupervisor, setNewSupervisor] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });

  const handleCreateSupervisor = (e: React.FormEvent) => {
    e.preventDefault();
    const supervisor: Supervisor = {
      id: Math.random().toString(36).substr(2, 9),
      name: newSupervisor.name,
      email: newSupervisor.email,
      phone: newSupervisor.phone,
      department: newSupervisor.department,
      assignedExams: 0,
      status: "Active",
    };
    setSupervisors([...supervisors, supervisor]);
    setNewSupervisor({ name: "", email: "", phone: "", department: "" });
    setIsSupervisorSheetOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-slate-900">
                Supervisors
              </h1>
              <p className="text-sm text-slate-600">
                Manage exam supervisors and assignments
              </p>
            </div>
            <Sheet
              open={isSupervisorSheetOpen}
              onOpenChange={setIsSupervisorSheetOpen}
            >
              <SheetTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Supervisor
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:max-w-md overflow-y-auto"
              >
                <SheetHeader className="mb-6">
                  <SheetTitle>Add New Supervisor</SheetTitle>
                  <SheetDescription>
                    Add a new supervisor to the system
                  </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleCreateSupervisor} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="supervisor-name">Full Name</Label>
                    <Input
                      id="supervisor-name"
                      placeholder="e.g., Dr. Smith, Prof. Johnson"
                      value={newSupervisor.name}
                      onChange={(e) =>
                        setNewSupervisor({ ...newSupervisor, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supervisor-email">Email</Label>
                    <Input
                      id="supervisor-email"
                      type="email"
                      placeholder="supervisor@university.edu"
                      value={newSupervisor.email}
                      onChange={(e) =>
                        setNewSupervisor({ ...newSupervisor, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supervisor-phone">Phone (Optional)</Label>
                    <Input
                      id="supervisor-phone"
                      type="tel"
                      placeholder="+1 555-0100"
                      value={newSupervisor.phone}
                      onChange={(e) =>
                        setNewSupervisor({ ...newSupervisor, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supervisor-department">Department (Optional)</Label>
                    <Input
                      id="supervisor-department"
                      placeholder="e.g., Computer Science"
                      value={newSupervisor.department}
                      onChange={(e) =>
                        setNewSupervisor({
                          ...newSupervisor,
                          department: e.target.value,
                        })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsSupervisorSheetOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1">
                      Add Supervisor
                    </Button>
                  </div>
                </form>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supervisors.map((supervisor) => (
            <Card
              key={supervisor.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-semibold">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{supervisor.name}</CardTitle>
                      <CardDescription>
                        {supervisor.department || "No department"}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant={
                      supervisor.status === "Active" ? "default" : "secondary"
                    }
                  >
                    {supervisor.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {supervisor.email && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{supervisor.email}</span>
                  </div>
                )}
                {supervisor.phone && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone className="w-4 h-4" />
                    <span>{supervisor.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {supervisor.assignedExams}{" "}
                    {supervisor.assignedExams === 1
                      ? "exam assigned"
                      : "exams assigned"}
                  </span>
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-3 h-3 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SupervisorsPage;
