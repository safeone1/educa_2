"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Calendar,
  Clock,
  Edit,
  Trash2,
  UserCheck,
  Loader2,
} from "lucide-react";
import { getExams, createExam, deleteExam, getClassrooms } from "./actions";
import { useRouter } from "next/navigation";

type ExamStatus = "Scheduled" | "Ongoing" | "Completed" | "Cancelled";

type Classroom = {
  id: string;
  name: string;
};

type Exam = {
  id: string;
  name: string | null;
  subject?: string | null;
  professor?: string | null;
  supervisors: string[];
  date: Date;
  duration?: number | null;
  status: ExamStatus;
  classRooms: Classroom[];
  ExamSupervisor: { supervisorName: string }[];
};

const ExamsPage = () => {
  const router = useRouter();
  const [exams, setExams] = useState<Exam[]>([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [examsData, classroomsData] = await Promise.all([
        getExams(),
        getClassrooms(),
      ]);
      setExams(examsData as Exam[]);
      setClassrooms(classroomsData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateExam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const result = await createExam(formData);

    if (result.success) {
      setIsCreateSheetOpen(false);
      await loadData();
      router.refresh();
    } else {
      alert(result.error);
    }

    setIsSubmitting(false);
  };

  const handleDeleteExam = async (id: string) => {
    if (!confirm("Are you sure you want to delete this exam?")) return;

    const result = await deleteExam(id);
    if (result.success) {
      await loadData();
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-slate-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-slate-900">
                Exams
              </h1>
              <p className="text-sm text-slate-600">
                Manage and schedule examinations
              </p>
            </div>
            <Sheet open={isCreateSheetOpen} onOpenChange={setIsCreateSheetOpen}>
              <SheetTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Exam
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:max-w-md overflow-y-auto"
              >
                <SheetHeader className="mb-6">
                  <SheetTitle>Create New Exam</SheetTitle>
                  <SheetDescription>
                    Schedule a new examination
                  </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleCreateExam} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Exam Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g., Data Structures Final"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="e.g., Computer Science"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="professor">Professor</Label>
                    <Input
                      id="professor"
                      name="professor"
                      placeholder="e.g., Dr. Smith"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date & Time</Label>
                    <Input
                      id="date"
                      name="date"
                      type="datetime-local"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      placeholder="e.g., 120"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supervisors">
                      Supervisors (comma-separated)
                    </Label>
                    <Textarea
                      id="supervisors"
                      name="supervisors"
                      placeholder="e.g., Prof. Johnson, Dr. Lee"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="classRoomIds">
                      Classroom IDs (comma-separated, optional)
                    </Label>
                    <Textarea
                      id="classRoomIds"
                      name="classRoomIds"
                      placeholder="Leave empty or paste classroom IDs"
                    />
                    <p className="text-xs text-slate-500">
                      Available classrooms:{" "}
                      {classrooms.map((c) => `${c.name} (${c.id})`).join(", ")}
                    </p>
                  </div>

                  <Separator />

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsCreateSheetOpen(false)}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        "Create Exam"
                      )}
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
        {exams.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 mb-4">No exams found</p>
            <Button onClick={() => setIsCreateSheetOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Exam
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {exams.map((exam) => (
              <Card key={exam.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {exam.name || "Untitled Exam"}
                        </h3>
                        <Badge
                          variant={
                            exam.status === "Scheduled"
                              ? "default"
                              : exam.status === "Completed"
                              ? "secondary"
                              : "default"
                          }
                        >
                          {exam.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-4">
                        {exam.subject || "No subject"}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-700">
                            {new Date(exam.date).toLocaleDateString()} at{" "}
                            {new Date(exam.date).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
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
                            {exam.professor || "N/A"}
                          </span>
                        </div>
                      </div>
                      {exam.ExamSupervisor &&
                        exam.ExamSupervisor.length > 0 && (
                          <>
                            <Separator className="my-4" />
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-slate-600">
                                Supervisors:{" "}
                                <span className="font-semibold text-slate-900">
                                  {exam.ExamSupervisor.map(
                                    (s) => s.supervisorName
                                  ).join(", ")}
                                </span>
                              </span>
                            </div>
                          </>
                        )}
                      {exam.classRooms.length > 0 && (
                        <div className="flex items-center gap-4 text-sm mt-2">
                          <span className="text-slate-600">
                            Classrooms:{" "}
                            <span className="font-semibold text-slate-900">
                              {exam.classRooms.map((c) => c.name).join(", ")}
                            </span>
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteExam(exam.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ExamsPage;
