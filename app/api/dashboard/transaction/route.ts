import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { createPagination } from "@/lib/pagination-server";
import { verifyTokenAdmin } from "@/lib/verify-token-server";

// export async function POST(req: Request) {
//   const { user_name, email, password } = await req.json();

//   try {
//     const checkDuplicateEmail = await prisma.transaction.findUnique({
//       where: { email },
//     });
//     if (checkDuplicateEmail)
//       return Response.json({ status: 401, message: "Email already registerd" });
//     const hashedPassword = await bcrypt.hash(password, 10);

//     await prisma.transaction.create({
//       data: {
//         password: hashedPassword,
//         user_name,
//         email,
//         is_admin: true,
//       },
//     });
//     return Response.json({ status: 201, message: "Success register" });
//   } catch (error) {
//     console.log({ error });
//     return Response.json({
//       status: 500,
//       message: "Internal server error",
//       result: error,
//     });
//   }
// }

export async function GET(req: NextRequest) {
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
  const { searchParams } = new URL(req.url);
  const course_id = searchParams.get("course_id") || null;
  const page = Number(searchParams.get("page") || 1);
  const per_page = Number(searchParams.get("per_page") || 10);
  const skip = (page - 1) * per_page;

  try {
    const total_data = await prisma.transaction.count({});
    const pagination = createPagination({
      page: page,
      per_page: per_page,
      total_data,
    });
    const result = await prisma.transaction.findMany({
      skip,
      take: Number(per_page),
      select: {
        id: true,
        created_at: true,
        code: true,
        user: {
          select: {
            id: true,
            user_name: true,
            email: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
            price: true,
            is_free: true,
            thumbnail_img: true,
            category: {
              select: {
                id: true,
                name: true,
                icon: true,
              },
            },
          },
        },
      },
    });

    return Response.json({
      status: 200,
      message: "Success get transaction",
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
