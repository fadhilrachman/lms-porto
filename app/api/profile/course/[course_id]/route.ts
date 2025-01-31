import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifyTokenCustomer } from "@/lib/verify-token-server";

export async function GET(
  req: NextRequest,
  { params }: { params: { course_id: string } }
) {
  if (verifyTokenCustomer(req)) {
    return Response.json({
      status: 403,
      message: "Access Denied. No token provided.",
    });
  }
  const user = JSON.parse(req.headers.get("user") as string);

  const { course_id } = params;

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
                content_progress: {
                  where: {
                    user_id: user.id,
                  },
                  select: {
                    id: true,
                  },
                },
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
