import { prisma } from "@/lib/prisma";
import { createPagination } from "@/lib/pagination-server";
import { verifyTokenAdmin } from "@/lib/verify-token-server";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { category_id: string } }
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
  const { category_id } = params;
  const { name, icon } = await req.json();
  console.log({ name, icon });

  try {
    const result = await prisma.category.update({
      data: {
        name,
        icon,
      },
      where: {
        id: category_id as string,
      },
    });
    return Response.json({
      status: 200,
      message: "Success update category",
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
  { params }: { params: { category_id: string } }
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
  const { category_id } = params;
  try {
    const result = await prisma.category.delete({
      where: {
        id: category_id as string,
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
