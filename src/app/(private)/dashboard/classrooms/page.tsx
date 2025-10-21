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
import { Plus, Edit, Trash2, Table2 } from "lucide-react";

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

const ClassroomsPage = () => {
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
  const [selectedClassroomForTable, setSelectedClassroomForTable] =
    useState("");
  const [newClassroom, setNewClassroom] = useState({ name: "" });
  const [newTable, setNewTable] = useState({ num: "" });

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
      classRoomId: selectedClassroomForTable,
    };

    setClassrooms(
      classrooms.map((c) =>
        c.id === selectedClassroomForTable
          ? { ...c, tables: [...c.tables, table] }
          : c
      )
    );

    setNewTable({ num: "" });
    setSelectedClassroomForTable("");
    setIsTableSheetOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-slate-900">
                Classrooms
              </h1>
              <p className="text-sm text-slate-600">
                Manage classrooms and their tables
              </p>
            </div>
            <Sheet
              open={isClassroomSheetOpen}
              onOpenChange={setIsClassroomSheetOpen}
            >
              <SheetTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Classroom
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:max-w-md overflow-y-auto"
              >
                <SheetHeader className="mb-6">
                  <SheetTitle>Create New Classroom</SheetTitle>
                  <SheetDescription>
                    Add a new classroom to the system
                  </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleCreateClassroom} className="space-y-6">
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
                    <p className="text-xs text-slate-500">
                      Use a clear naming convention (Building-RoomNumber)
                    </p>
                  </div>

                  <Separator />

                  <div className="flex gap-3 pt-2">
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="space-y-6">
          {classrooms.map((classroom) => (
            <Card key={classroom.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{classroom.name}</CardTitle>
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
                    <p className="text-sm">No tables in this classroom yet</p>
                    <Sheet
                      open={
                        isTableSheetOpen &&
                        selectedClassroomForTable === classroom.id
                      }
                      onOpenChange={(open) => {
                        setIsTableSheetOpen(open);
                        if (!open) setSelectedClassroomForTable("");
                      }}
                    >
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3"
                          onClick={() =>
                            setSelectedClassroomForTable(classroom.id)
                          }
                        >
                          <Plus className="w-3 h-3 mr-2" />
                          Add Table
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-full sm:max-w-md">
                        <SheetHeader>
                          <SheetTitle>Add Table to {classroom.name}</SheetTitle>
                          <SheetDescription>
                            Create a new table in this classroom
                          </SheetDescription>
                        </SheetHeader>
                        <form
                          onSubmit={handleCreateTable}
                          className="space-y-4 mt-6"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="table-num">Table Number</Label>
                            <Input
                              id="table-num"
                              type="number"
                              min="1"
                              placeholder="e.g., 1, 2, 3..."
                              value={newTable.num}
                              onChange={(e) =>
                                setNewTable({ num: e.target.value })
                              }
                              required
                            />
                            <p className="text-xs text-slate-600">
                              Sequential number for this table
                            </p>
                          </div>

                          <Separator className="my-4" />

                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              className="flex-1"
                              onClick={() => {
                                setIsTableSheetOpen(false);
                                setSelectedClassroomForTable("");
                              }}
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
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ClassroomsPage;
