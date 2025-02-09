import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { createPagination } from "@/lib/pagination-server";
import { verifyTokenAdmin } from "@/lib/verify-token-server";

export async function POST(req: NextRequest) {
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
  const { user_name, email, password } = await req.json();

  try {
    const checkDuplicateEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (checkDuplicateEmail)
      return Response.json(
        { status: 401, message: "Email already registerd" },
        { status: 401 }
      );
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        password: hashedPassword,
        user_name,
        email,
        is_admin: true,
      },
    });

    return Response.json({ status: 201, message: "Success register" });
  } catch (error) {
    console.log({ error });

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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const per_page = Number(searchParams.get("per_page") || 10);
  const skip = (page - 1) * per_page;
  const search = searchParams.get("search") || "";

  try {
    const total_data = await prisma.user.count({
      where: {
        is_admin: true,
      },
    });
    const pagination = createPagination({
      page: page,
      per_page: per_page,
      total_data,
    });
    const result = await prisma.user.findMany({
      skip,
      take: Number(per_page),
      where: {
        is_admin: true,
        user_name: { contains: search },
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
      message: "Success get admin",
      result,
      pagination,
    });
  } catch (error) {
    console.log({ error });

    return Response.json({
      status: 500,
      message: "Internal server error",
    });
  }
}
