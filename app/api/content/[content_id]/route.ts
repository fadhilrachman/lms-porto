import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import {
  verifyTokenAdmin,
  verifyTokenCustomer,
} from "@/lib/verify-token-server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ content_id: string }> }
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
  const { content_id } = await params;
  const { chapter_id, content_vid, title, description } = await req.json();

  try {
    const result = await prisma.content.update({
      data: {
        chapter_id,
        content_vid,
        title,
        description,
      },
      where: {
        id: content_id,
      },
    });

    return Response.json({
      status: 200,
      message: "Success update content",
      result,
    });
  } catch (error) {
    console.log(error);

    return Response.json({
      status: 500,
      message: "Internal server error",
    });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ content_id: string }> }
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
  const { content_id } = await params;
  const { is_published } = await req.json();

  try {
    const result = await prisma.content.update({
      data: {
        is_published,
      },
      where: {
        id: content_id as string,
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
  { params }: { params: Promise<{ content_id: string }> }
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
  const { content_id } = await params;

  try {
    const result = await prisma.content.delete({
      where: {
        id: content_id as string,
      },
    });

    return Response.json({
      status: 200,
      message: "Success delete content",
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
  req: NextRequest,
  { params }: { params: Promise<{ content_id: string }> }
) {
  const { content_id } = await params;
  if (verifyTokenCustomer(req)) {
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

  try {
    const result = await prisma.content.findUnique({
      where: {
        id: content_id as string,
      },
    });

    return Response.json({
      status: 200,
      message: "Success get content",
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
