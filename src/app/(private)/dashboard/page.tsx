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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Calendar,
  Clock,
  FileText,
  Edit,
  Trash2,
  GraduationCap,
  Building2,
  Menu,
  Table2,
  UserCheck,
} from "lucide-react";

// Types based on Prisma schema
type ExamStatus = "Scheduled" | "Ongoing" | "Completed" | "Cancelled";

type TableType = {
  id: string;
  num: number;
  classRoomId: string;
};

type Classroom = {
  id: string;
  name: string;
  createdAt: string;
  tables: TableType[];
};

type Exam = {
  id: string;
  name: string;
  subject?: string;
  professor?: string;
  supervisors: string[];
  date: string;
  duration?: number;
  status: ExamStatus;
  classRooms: string[];
};

const DashboardPage = () => {
  const [exams, setExams] = useState<Exam[]>([
    {
      id: "1",
      name: "Data Structures Final",
      subject: "Computer Science",
      professor: "Dr. Smith",
      supervisors: ["Prof. Johnson", "Dr. Lee"],
      date: "2025-11-15T09:00:00",
      duration: 180,
      status: "Scheduled",
      classRooms: ["1", "2"],
    },
    {
      id: "2",
      name: "Linear Algebra Midterm",
      subject: "Mathematics",
      professor: "Dr. Williams",
      supervisors: ["Prof. Brown"],
      date: "2025-11-10T14:00:00",
      duration: 120,
      status: "Scheduled",
      classRooms: ["2"],
    },
  ]);

  const [classrooms, setClassrooms] = useState<Classroom[]>([
    {
      id: "1",
      name: "A-101",
      createdAt: new Date().toISOString(),
      tables: [
        { id: "t1", num: 1, classRoomId: "1" },
        { id: "t2", num: 2, classRoomId: "1" },
        { id: "t3", num: 3, classRoomId: "1" },
      ],
    },
    {
      id: "2",
      name: "B-205",
      createdAt: new Date().toISOString(),
      tables: [
        { id: "t4", num: 1, classRoomId: "2" },
        { id: "t5", num: 2, classRoomId: "2" },
      ],
    },
  ]);

  const [isClassroomSheetOpen, setIsClassroomSheetOpen] = useState(false);
  const [isTableSheetOpen, setIsTableSheetOpen] = useState(false);

  const [newClassroom, setNewClassroom] = useState({ name: "" });
  const [newTable, setNewTable] = useState({ num: "", classRoomId: "" });

  const handleCreateClassroom = (e: React.FormEvent) => {
    e.preventDefault();
    const classroom: Classroom = {
      id: Math.random().toString(36).substr(2, 9),
      name: newClassroom.name,
      createdAt: new Date().toISOString(),
      tables: [],
    };
    setClassrooms([...classrooms, classroom]);
    setNewClassroom({ name: "" });
    setIsClassroomSheetOpen(false);
  };

  const handleCreateTable = (e: React.FormEvent) => {
    e.preventDefault();
    const table: TableType = {
      id: Math.random().toString(36).substr(2, 9),
      num: parseInt(newTable.num),
      classRoomId: newTable.classRoomId,
    };

    setClassrooms(
      classrooms.map((c) =>
        c.id === newTable.classRoomId
          ? { ...c, tables: [...c.tables, table] }
          : c
      )
    );

    setNewTable({ num: "", classRoomId: "" });
    setIsTableSheetOpen(false);
  };

  const stats = [
    {
      label: "Total Exams",
      value: exams.length,
      icon: FileText,
      color: "text-blue-600",
    },
    {
      label: "Scheduled",
      value: exams.filter((e) => e.status === "Scheduled").length,
      icon: Calendar,
      color: "text-amber-600",
    },
    {
      label: "Classrooms",
      value: classrooms.length,
      icon: Building2,
      color: "text-purple-600",
    },
    {
      label: "Total Tables",
      value: classrooms.reduce((acc, c) => acc + c.tables.length, 0),
      icon: Table2,
      color: "text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:block">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-slate-900 p-2 rounded-lg">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-slate-900">
                Exam System
              </h2>
              <p className="text-xs text-slate-600">Management</p>
            </div>
          </div>

          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Exams
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Building2 className="w-4 h-4 mr-2" />
              Classrooms
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Table2 className="w-4 h-4 mr-2" />
              Tables
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <UserCheck className="w-4 h-4 mr-2" />
              Candidates
            </Button>
          </nav>

          <Separator className="my-6" />

          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-600 uppercase mb-3">
              Quick Actions
            </h3>

            <Sheet
              open={isClassroomSheetOpen}
              onOpenChange={setIsClassroomSheetOpen}
            >
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Classroom
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Create New Classroom</SheetTitle>
                  <SheetDescription>
                    Add a new classroom to the system
                  </SheetDescription>
                </SheetHeader>
                <form
                  onSubmit={handleCreateClassroom}
                  className="space-y-4 mt-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="classroom-name">Classroom Name</Label>
                    <Input
                      id="classroom-name"
                      placeholder="e.g., A-101, Lab B-203"
                      value={newClassroom.name}
                      onChange={(e) =>
                        setNewClassroom({ name: e.target.value })
                      }
                      required
                    />
                    <p className="text-xs text-slate-600">
                      Use a clear naming convention (Building-RoomNumber)
                    </p>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsClassroomSheetOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1">
                      Create Classroom
                    </Button>
                  </div>
                </form>
              </SheetContent>
            </Sheet>

            <Sheet open={isTableSheetOpen} onOpenChange={setIsTableSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Table
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Add Table to Classroom</SheetTitle>
                  <SheetDescription>
                    Create a new table in an existing classroom
                  </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleCreateTable} className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="table-classroom">Select Classroom</Label>
                    <Select
                      value={newTable.classRoomId}
                      onValueChange={(value) =>
                        setNewTable({ ...newTable, classRoomId: value })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a classroom" />
                      </SelectTrigger>
                      <SelectContent>
                        {classrooms.map((classroom) => (
                          <SelectItem key={classroom.id} value={classroom.id}>
                            {classroom.name} ({classroom.tables.length} tables)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="table-num">Table Number</Label>
                    <Input
                      id="table-num"
                      type="number"
                      min="1"
                      placeholder="e.g., 1, 2, 3..."
                      value={newTable.num}
                      onChange={(e) =>
                        setNewTable({ ...newTable, num: e.target.value })
                      }
                      required
                    />
                    <p className="text-xs text-slate-600">
                      Sequential number for this table in the classroom
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-slate-700">
                      💡 <span className="font-semibold">Tip:</span> Tables are
                      uniquely identified by their number within each classroom.
                    </p>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsTableSheetOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1">
                      Add Table
                    </Button>
                  </div>
                </form>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-2xl font-serif font-bold text-slate-900">
                    Dashboard
                  </h1>
                  <p className="text-sm text-slate-600">Faculty Portal</p>
                </div>
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

        {/* Main Content Area */}
        <main className="flex-1 px-6 py-8 overflow-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-slate-900">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-full bg-slate-100 ${stat.color}`}
                    >
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="exams" className="space-y-6">
            <TabsList>
              <TabsTrigger value="exams">
                <FileText className="w-4 h-4 mr-2" />
                Exams
              </TabsTrigger>
              <TabsTrigger value="classrooms">
                <Building2 className="w-4 h-4 mr-2" />
                Classrooms & Tables
              </TabsTrigger>
            </TabsList>

            {/* Exams Tab */}
            <TabsContent value="exams" className="space-y-4">
              {exams.map((exam) => (
                <Card
                  key={exam.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">
                            {exam.name}
                          </h3>
                          <Badge
                            variant={
                              exam.status === "Scheduled"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {exam.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-4">
                          {exam.subject}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-700">
                              {new Date(exam.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-700">
                              {exam.duration ? `${exam.duration} min` : "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <UserCheck className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-700">
                              {exam.professor}
                            </span>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-slate-600">
                            Supervisors:{" "}
                            <span className="font-semibold text-slate-900">
                              {exam.supervisors.join(", ")}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Classrooms Tab */}
            <TabsContent value="classrooms" className="space-y-6">
              {classrooms.map((classroom) => (
                <Card key={classroom.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">
                          {classroom.name}
                        </CardTitle>
                        <CardDescription>
                          {classroom.tables.length}{" "}
                          {classroom.tables.length === 1 ? "table" : "tables"}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {classroom.tables.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {classroom.tables.map((table) => (
                          <div
                            key={table.id}
                            className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center hover:bg-slate-100 transition-colors"
                          >
                            <Table2 className="w-5 h-5 mx-auto mb-2 text-slate-600" />
                            <p className="text-sm font-semibold text-slate-900">
                              Table {table.num}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <Table2 className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                        <p className="text-sm">
                          No tables in this classroom yet
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3"
                          onClick={() => {
                            setNewTable({
                              ...newTable,
                              classRoomId: classroom.id,
                            });
                            setIsTableSheetOpen(true);
                          }}
                        >
                          <Plus className="w-3 h-3 mr-2" />
                          Add Table
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
