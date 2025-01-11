import { prisma } from "@/lib/prisma";
import { createPagination } from "@/lib/pagination-server";
import { verifyTokenAdmin } from "@/lib/verify-token-server";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { admin_id: string } }
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
  const { admin_id } = params;
  const { user_name, email, password, is_admin = false } = await req.json();

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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { admin_id: string } }
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
  const { admin_id } = params;
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
