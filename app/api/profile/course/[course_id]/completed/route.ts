import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifyTokenCustomer } from "@/lib/verify-token-server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ course_id: string }> }
) {
  if (verifyTokenCustomer(req)) {
    return Response.json({
      status: 403,
      message: "Access Denied. No token provided.",
    });
  }
  const user = JSON.parse(req.headers.get("user") as string);

  const { course_id } = await params;
  const { content_id } = await req.json();

  try {
    const checkContent = await prisma.content.findUnique({
      where: {
        id: content_id,
      },
    });
    if (!checkContent)
      return Response.json(
        {
          message: "Data not found",
        },
        {
          status: 404,
        }
      );

    // const nextContent = await prisma.content.findFirst({
    //   where: {
    //     chapter_id: checkContent.chapter_id,
    //     position: checkContent.position + 1,
    //   },
    // });
    const result = await prisma.contentProgress.create({
      data: {
        content_id,
        course_id,
        user_id: user.id,
      },
    });

    return Response.json({
      status: 200,
      message: "Success completed content",
      result,
      // next_content_id: nextContent.description,
    });
  } catch (error) {
    console.log({ error });

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
