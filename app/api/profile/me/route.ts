import { prisma } from "@/lib/prisma";
import { verifyTokenCustomer } from "@/lib/verify-token-server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  if (verifyTokenCustomer(req)) {
    return Response.json({
      status: 403,
      message: "Access Denied. No token provided.",
    });
  }
  const user = JSON.parse(req.headers.get("user") as string);

  try {
    const result = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        user_name: true,
        email: true,
        created_at: true,
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
