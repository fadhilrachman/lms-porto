import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifyTokenAdmin } from "@/lib/verify-token-server";

export async function PATCH(
  req: NextRequest,
  // { params }: { params: { chapter_id: string } }
) {
  if (verifyTokenAdmin(req)) {
    return Response.json(
      {
        status: 403,
        message: "Access Denied",
      },
      {
        status: 403,
      },
    );
  }
  const { data }: { data: string[] } = await req.json();

  console.log({ data });

  try {
    const result = await Promise.all(
      data?.map((val, key) =>
        prisma.content.update({
          where: {
            id: val,
          },
          data: {
            position: key + 1,
          },
        }),
      ),
    );

    return Response.json({
      status: 200,
      message: "Success update chapter",
      result,
    });
  } catch (error) {
    return Response.json(
      {
        statusbar: 500,
        message: "Internal server error",
        result: error,
      },
      {
        status: 500,
      },
    );
  }
}
