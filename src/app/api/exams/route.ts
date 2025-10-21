import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaCl";

// GET all exams
export async function GET() {
  try {
    const exams = await prisma.exam.findMany({
      include: {
        classRooms: true,
        ExamCandidates: true,
        ExamSupervisor: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(exams);
  } catch (error) {
    console.error("Error fetching exams:", error);
    return NextResponse.json(
      { error: "Failed to fetch exams" },
      { status: 500 }
    );
  }
}

// POST create new exam
export async function POST(request: NextRequest) {
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

    // Create exam with connections
    const exam = await prisma.exam.create({
      data: {
        name,
        subject,
        professor,
        date: new Date(date),
        duration: duration ? parseInt(duration) : null,
        status: status || "Scheduled",
        classRooms: {
          connect: classRoomIds?.map((id: string) => ({ id })) || [],
        },
        supervisors: supervisors || [],
      },
      include: {
        classRooms: true,
        ExamSupervisor: true,
      },
    });

    // Create ExamSupervisor entries if supervisors provided
    if (supervisors && supervisors.length > 0) {
      await prisma.examSupervisor.createMany({
        data: supervisors.map((supervisorName: string) => ({
          examId: exam.id,
          supervisorName,
        })),
      });
    }

    return NextResponse.json(exam, { status: 201 });
  } catch (error) {
    console.error("Error creating exam:", error);
    return NextResponse.json(
      { error: "Failed to create exam" },
      { status: 500 }
    );
  }
}
