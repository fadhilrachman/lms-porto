import { prisma } from "@/lib/prisma";
import { createPagination } from "@/lib/pagination-server";
import { NextRequest } from "next/server";
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

export async function GET(req: NextRequest) {
  //   const cuy = req.cookies.get("cookie");
  //   console.log({ cuy });
  //   req.headers.set('/')
  console.log({ cuy: req.headers.get("authorization") });

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const per_page = Number(searchParams.get("per_page") || 10);
  const skip = (page - 1) * per_page;

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
