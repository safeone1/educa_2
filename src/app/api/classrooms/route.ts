import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaCl";

// GET all classrooms
export async function GET() {
  try {
    const classrooms = await prisma.classroom.findMany({
      include: {
        Table: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(classrooms);
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    return NextResponse.json(
      { error: "Failed to fetch classrooms" },
      { status: 500 }
    );
  }
}

// POST create new classroom
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    const classroom = await prisma.classroom.create({
      data: {
        name,
      },
      include: {
        Table: true,
      },
    });

    return NextResponse.json(classroom, { status: 201 });
  } catch (error) {
    console.error("Error creating classroom:", error);
    return NextResponse.json(
      { error: "Failed to create classroom" },
      { status: 500 }
    );
  }
}
