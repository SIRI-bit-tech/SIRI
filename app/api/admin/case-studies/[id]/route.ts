import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { params } = context;
  const { id } = await params;
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id },
    });
    if (!caseStudy) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(caseStudy);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch case study" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { params } = context;
  const { id } = await params;
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const caseStudy = await prisma.caseStudy.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        summary: body.summary,
        body: body.body,
        tags: typeof body.tags === "string"
          ? JSON.stringify(body.tags.split(",").map((tag: string) => tag.trim()).filter(Boolean))
          : JSON.stringify(body.tags || []),
        coverImage: body.coverImage || null,
        featured: body.featured,
        order: body.order,
      },
    });
    return NextResponse.json(caseStudy);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update case study" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { params } = context;
  const { id } = await params;
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.caseStudy.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete case study" },
      { status: 500 }
    );
  }
}
