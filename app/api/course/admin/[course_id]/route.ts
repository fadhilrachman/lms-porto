import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ course_id: string }> }
) {
  const { searchParams } = new URL(req.url);

  const { course_id } = await params;

  try {
    const result = await prisma.course.findUnique({
      where: {
        id: course_id as string,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
        chapter: {
          orderBy: {
            position: "asc",
          },
          include: {
            content: {
              select: {
                id: true,
                title: true,
                position: true,
                is_published: true,
              },
              orderBy: {
                position: "asc",
              },
            },
          },
        },
      },
    });

    return Response.json({
      status: 200,
      message: "Success delete category",
      result,
    });
  } catch (error) {
    return Response.json(
      {
        status: 500,
        message: "Internal server error",
        result: error,
      },
      {
        status: 500,
      }
    );
  }
}
