import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifyTokenAdmin } from "@/lib/verify-token-server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<Promise<{ chapter_id: string }>> }
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
  const { chapter_id } = await params;
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
  { params }: { params: Promise<{ chapter_id: string }> }
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
  const { chapter_id } = await params;

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

export async function GET(
  req: Request,
  { params }: { params: Promise<{ chapter_id: string }> }
) {
  const { chapter_id } = await params;

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
