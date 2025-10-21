"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prismaCl";

export async function getExams() {
  try {
    const exams = await prisma.exam.findMany({
      include: {
        classRooms: {
          select: {
            id: true,
            name: true,
          },
        },
        ExamSupervisor: {
          select: {
            supervisorName: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return exams;
  } catch (error) {
    console.error("Error fetching exams:", error);
    throw new Error("Failed to fetch exams");
  }
}

export async function createExam(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const subject = formData.get("subject") as string;
    const professor = formData.get("professor") as string;
    const date = formData.get("date") as string;
    const duration = formData.get("duration") as string;
    const supervisors = formData.get("supervisors") as string;
    const classRoomIds = formData.get("classRoomIds") as string;

    // Parse supervisors and classroom IDs
    const supervisorList = supervisors
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    const classRoomIdList = classRoomIds
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const exam = await prisma.exam.create({
      data: {
        name,
        subject,
        professor,
        date: new Date(date),
        duration: parseInt(duration),
        status: "Scheduled",
        classRooms: {
          connect: classRoomIdList.map((id) => ({ id })),
        },
        ExamSupervisor: {
          create: supervisorList.map((supervisorName) => ({
            supervisorName,
          })),
        },
      },
    });

    revalidatePath("/dashboard/exams");
    return { success: true, exam };
  } catch (error) {
    console.error("Error creating exam:", error);
    return { success: false, error: "Failed to create exam" };
  }
}

export async function updateExam(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const subject = formData.get("subject") as string;
    const professor = formData.get("professor") as string;
    const date = formData.get("date") as string;
    const duration = formData.get("duration") as string;
    const status = formData.get("status") as string;

    const exam = await prisma.exam.update({
      where: { id },
      data: {
        name,
        subject,
        professor,
        date: new Date(date),
        duration: parseInt(duration),
        status: status as "Scheduled" | "Ongoing" | "Completed" | "Cancelled",
      },
    });

    revalidatePath("/dashboard/exams");
    return { success: true, exam };
  } catch (error) {
    console.error("Error updating exam:", error);
    return { success: false, error: "Failed to update exam" };
  }
}

export async function deleteExam(id: string) {
  try {
    await prisma.exam.delete({
      where: { id },
    });

    revalidatePath("/dashboard/exams");
    return { success: true };
  } catch (error) {
    console.error("Error deleting exam:", error);
    return { success: false, error: "Failed to delete exam" };
  }
}

export async function getClassrooms() {
  try {
    const classrooms = await prisma.classroom.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return classrooms;
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    return [];
  }
}
