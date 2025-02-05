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
  const { title } = await req.json();

  try {
    const result = await prisma.course.create({
      data: {
        title,
      },
    });

    return Response.json({
      status: 200,
      message: "Success create course",
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
      }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);

  const per_page = Number(searchParams.get("per_page") || 10);
  const search = searchParams.get("search") || "";
  const category_id = searchParams.get("category_id");
  // const is_published = Boolean(searchParams.get("is_published")) || false;
  const skip = (page - 1) * per_page;

  let filter: {
    category_id?: string;
    is_published: boolean;
    title: {
      contains?: string;
    };
  } = {
    title: {
      contains: search,
    },
    // is_published
    is_published: true,
  };
  if (category_id) filter.category_id = category_id;
  try {
    const total_data = await prisma.course.count();
    const pagination = createPagination({
      page: page,
      per_page: per_page,
      total_data,
    });
    const result = await prisma.course.findMany({
      skip,
      take: Number(per_page),
      where: filter,
      select: {
        id: true,
        title: true,
        is_free: true,
        is_published: true,
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
        _count: {
          select: {
            chapter: true,
            transaction: true,
          },
        },
        update_at: true,
        price: true,
        thumbnail_img: true,
        created_at: true,
      },
    });

    return Response.json({
      status: 200,
      message: "Success get course",
      result,
      pagination,
    });
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
