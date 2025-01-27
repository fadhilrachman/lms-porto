import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { course_id: string } },
) {
  const { course_id } = params;
  const {
    title,
    price,
    description,
    introduction_vid,
    thumbnail_img,
    resource,
  } = await req.json();

  try {
    const result = await prisma.course.update({
      data: {
        title,
        price,
        description,
        introduction_vid,
        thumbnail_img,
        resource,
      },
      where: {
        id: course_id as string,
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
      },
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { course_id: string } },
) {
  const { course_id } = params;
  const { is_free, is_published } = await req.json();

  try {
    const result = await prisma.course.update({
      data: {
        is_free,
        is_published,
      },
      where: {
        id: course_id as string,
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
      },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { course_id: string } },
) {
  const { course_id } = params;

  try {
    const result = await prisma.course.delete({
      where: {
        id: course_id as string,
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
      },
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { course_id: string } },
) {
  const { course_id } = params;

  try {
    const result = await prisma.course.findUnique({
      where: {
        id: course_id as string,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
        chapter: {
          orderBy: {
            position: "asc",
          },
          include: {
            content: {
              select: {
                id: true,
                title: true,
                position: true,
                is_published: true,
              },
              orderBy: {
                position: "asc",
              },
            },
          },
        },
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
      },
    );
  }
}
