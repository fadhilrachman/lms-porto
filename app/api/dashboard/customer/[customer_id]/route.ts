import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifyTokenAdmin } from "@/lib/verify-token-server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ customer_id: string }> }
) {
  if (verifyTokenAdmin(req)) {
    return Response.json(
      {
        status: 403,
        message: "Access Denied",
      },
      {
        status: 403,
      }
    );
  }
  const { customer_id } = await params;

  try {
    const result = await prisma.user.delete({
      where: {
        id: customer_id as string,
      },
    });

    return Response.json({
      status: 200,
      message: "Success delete user",
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
