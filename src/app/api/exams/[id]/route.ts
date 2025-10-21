import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaCl";

// GET single exam
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const exam = await prisma.exam.findUnique({
      where: { id: params.id },
      include: {
        classRooms: true,
        ExamCandidates: true,
        ExamSupervisor: true,
      },
    });

    if (!exam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    return NextResponse.json(exam);
  } catch (error) {
    console.error("Error fetching exam:", error);
    return NextResponse.json(
      { error: "Failed to fetch exam" },
      { status: 500 }
    );
  }
}

// DELETE exam
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.exam.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting exam:", error);
    return NextResponse.json(
      { error: "Failed to delete exam" },
      { status: 500 }
    );
  }
}

// PATCH update exam
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      name,
      subject,
      professor,
      date,
      duration,
      status,
      classRoomIds,
      supervisors,
    } = body;

    const exam = await prisma.exam.update({
      where: { id: params.id },
      data: {
        name,
        subject,
        professor,
        date: date ? new Date(date) : undefined,
        duration: duration ? parseInt(duration) : null,
        status,
        classRooms: classRoomIds
          ? {
              set: classRoomIds.map((id: string) => ({ id })),
            }
          : undefined,
        supervisors: supervisors || undefined,
      },
      include: {
        classRooms: true,
        ExamSupervisor: true,
      },
    });

    // Update supervisors if provided
    if (supervisors) {
      // Delete existing supervisors
      await prisma.examSupervisor.deleteMany({
        where: { examId: params.id },
      });

      // Create new supervisors
      if (supervisors.length > 0) {
        await prisma.examSupervisor.createMany({
          data: supervisors.map((supervisorName: string) => ({
            examId: params.id,
            supervisorName,
          })),
        });
      }
    }

    return NextResponse.json(exam);
  } catch (error) {
    console.error("Error updating exam:", error);
    return NextResponse.json(
      { error: "Failed to update exam" },
      { status: 500 }
    );
  }
}
