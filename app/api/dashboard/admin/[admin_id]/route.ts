import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifyTokenAdmin } from "@/lib/verify-token-server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ admin_id: string }> }
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
  const { admin_id } = await params;
  const { user_name, email } = await req.json();

  try {
    const result = await prisma.user.update({
      data: {
        user_name,
        email,
      },
      where: {
        id: admin_id as string,
      },
    });

    return Response.json({
      status: 200,
      message: "Success update user",
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ admin_id: string }> }
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
  const { admin_id } = await params;

  try {
    const result = await prisma.user.delete({
      where: {
        id: admin_id as string,
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
