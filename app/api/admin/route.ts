import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, icon } = await req.json();

  try {
    const result = await prisma.category.create({
      data: {
        name,
        icon,
      },
    });

    return Response.json({
      status: 200,
      message: "Success create category",
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
