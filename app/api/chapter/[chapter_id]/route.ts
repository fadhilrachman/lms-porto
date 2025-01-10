import { prisma } from "@/lib/prisma";
import { createPagination } from "@/lib/pagination-server";

export async function PUT(
  req: Request,
  { params }: { params: { chapter_id: string } }
) {
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
    console.log({ error });

    return Response.json({
      status: 500,
      message: "Internal server error",
      result: error,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { chapter_id: string } }
) {
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
    console.log({ error });

    return Response.json({
      status: 500,
      message: "Internal server error",
      result: error,
    });
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
    });
    return Response.json({
      status: 200,
      message: "Success get chapter",
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
