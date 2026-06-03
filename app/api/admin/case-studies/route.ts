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
    const caseStudy = await prisma.caseStudy.create({
      data: {
        title: body.title,
        slug: body.slug,
        summary: body.summary,
        body: body.body,
        tags: JSON.stringify(
          (body.tags || "").split(",").map((tag: string) => tag.trim()).filter(Boolean)
        ),
        coverImage: body.coverImage || null,
        featured: Boolean(body.featured),
        order: Number(body.order) || 0,
      },
    });

    return NextResponse.json(caseStudy, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create case study" }, { status: 500 });
  }
}
