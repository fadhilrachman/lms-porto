import { prisma } from "@/lib/prisma";
import { verifyTokenCustomer } from "@/lib/verify-token-server";
import { NextRequest } from "next/server";

export async function PATCH(
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
  const { content_id } = await req.json();

  try {
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
    });
  } catch (error) {
    // console.log({ error });

    return Response.json(
      {
        statusbar: 500,
        message: "Internal server error",
        result: error,
      },
      {
        status: 500,
      }
    );
  }
}
