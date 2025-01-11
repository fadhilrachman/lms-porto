import { prisma } from "@/lib/prisma";
import { createPagination } from "@/lib/pagination-server";

export async function PUT(
  req: Request,
  { params }: { params: { content_id: string } }
) {
  const { content_id } = params;
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
  req: Request,
  { params }: { params: { content_id: string } }
) {
  const { content_id } = params;
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
    return Response.json({
      status: 500,
      message: "Internal server error",
      result: error,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { content_id: string } }
) {
  const { content_id } = params;
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
    console.log({ error });

    return Response.json({
      status: 500,
      message: "Internal server error",
      result: error,
    });
  }
}
