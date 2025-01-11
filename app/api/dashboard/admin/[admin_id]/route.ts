import { prisma } from "@/lib/prisma";
import { createPagination } from "@/lib/pagination-server";

export async function PUT(
  req: Request,
  { params }: { params: { admin_id: string } }
) {
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
  { params }: { params: { admin_id: string } }
) {
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
    console.log({ error });

    return Response.json({
      status: 500,
      message: "Internal server error",
      result: error,
    });
  }
}
