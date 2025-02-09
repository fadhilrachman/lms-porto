import { NextRequest } from "next/server";

import { createPagination } from "@/lib/pagination-server";
import { prisma } from "@/lib/prisma";
import { verifyTokenCustomer } from "@/lib/verify-token-server";

export async function GET(req: NextRequest) {
  // req.body
  if (verifyTokenCustomer(req)) {
    return Response.json({
      status: 403,
      message: "Access Denied. No token provided.",
    });
  }
  const user = JSON.parse(req.headers.get("user") as string);

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const per_page = Number(searchParams.get("per_page") || 10);
  const skip = (page - 1) * per_page;

  try {
    const total_data = await prisma.transaction.count({
      where: {
        user_id: user.id,
        is_checkout: true,
      },
    });
    const pagination = createPagination({
      page: page,
      per_page: per_page,
      total_data,
    });
    const result = await prisma.transaction.findMany({
      skip,
      take: Number(per_page),
      where: {
        user_id: user.id,
        is_checkout: true,
      },
      orderBy: {
        created_at: "desc",
      },
      select: {
        id: true,
        course: {
          select: {
            id: true,
            title: true,
            is_free: true,
            category: {
              select: {
                id: true,
                name: true,
                icon: true,
              },
            },
            price: true,
            thumbnail_img: true,
            created_at: true,
            chapter: {
              take: 1,
              select: {
                content: {
                  where: {
                    is_published: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });
    const finallyResult = result.map((val) => {
      const {
        category,
        chapter,
        created_at,
        id,
        is_free,
        price,
        thumbnail_img,
        title,
      } = val.course;
      return {
        id: val.id,
        course: {
          created_at,
          id,
          is_free,
          price,
          thumbnail_img,
          category,
          title,
          content_id_first: chapter?.[0]?.content?.[0]?.id || null,
        },
      };
    });

    return Response.json({
      status: 200,
      message: "Success get transaction",
      result: finallyResult,
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
