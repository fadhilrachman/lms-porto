import { prisma } from "@/lib/prisma";
import { createPagination } from "@/lib/pagination-server";
import { verifyTokenAdmin } from "@/lib/verify-token-server";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { chapter_id: string } }
) {
  // if (verifyTokenAdmin(req)) {
  //   return Response.json(
  //     {
  //       status: 403,
  //       message: "Access Denied",
  //     },
  //     {
  //       status: 403,
  //     }
  //   );
  // }
  const { chapter_id } = params;
  const { title } = await req.json();
  try {
    const result = await prisma.chapter.update({
      data: {
        title,
      },
      where: {
        id: chapter_id as string,
      },
    });
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
      }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { chapter_id: string } }
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
  const { chapter_id } = params;
  try {
    const result = await prisma.chapter.delete({
      where: {
        id: chapter_id as string,
      },
    });
    return Response.json({
      status: 200,
      message: "Success delete chapter",
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

export async function GET(
  req: Request,
  { params }: { params: { chapter_id: string } }
) {
  const { chapter_id } = params;
  try {
    const result = await prisma.chapter.findUnique({
      where: {
        id: chapter_id as string,
      },
      include: {
        content: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });
    return Response.json({
      status: 200,
      message: "Success get chapter",
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
