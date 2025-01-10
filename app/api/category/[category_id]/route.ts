import { prisma } from "@/lib/prisma";
import { createPagination } from "@/lib/pagination-server";

export async function PUT(
  req: Request,
  { params }: { params: { category_id: string } }
) {
  const { category_id } = params;
  const { name, icon } = await req.json();
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
  { params }: { params: { category_id: string } }
) {
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
    console.log({ error });

    return Response.json({
      status: 500,
      message: "Internal server error",
      result: error,
    });
  }
}
