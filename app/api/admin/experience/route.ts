import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const experience = await prisma.experience.create({
      data: {
        company: body.company,
        role: body.role,
        description: body.description,
        startDate: new Date(body.startDate),
        endDate: body.isCurrent ? null : body.endDate ? new Date(body.endDate) : null,
        isCurrent: Boolean(body.isCurrent),
        technologies: JSON.stringify(
          (body.technologies || "").split(",").map((tech: string) => tech.trim()).filter(Boolean)
        ),
        order: Number(body.order) || 0,
      },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
  }
}
