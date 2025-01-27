import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { createPagination } from "@/lib/pagination-server";

export async function POST(req: NextRequest) {
  // if (verifyTokenAdmin(req)) {
  //   return Response.json(
  //     {
  //       status: 403,
  //       message: "Access Denied",
  //     },
  //     {
  //       status: 403,
  //     }
  //   );
  // }
  const { title, course_id } = await req.json();

  console.log({ title, course_id });

  try {
    const countChapterOnCourse = await prisma.chapter.count({
      where: { course_id },
    });

    const result = await prisma.chapter.create({
      data: {
        title,
        position: countChapterOnCourse + 1,
        course_id,
      },
    });

    return Response.json({
      status: 200,
      message: "Success create chapter",
      result,
    });
  } catch (error) {
    console.log({ error });

    return Response.json({
      status: 500,
      message: "Internal server error",
    });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const course_id = searchParams.get("course_id") || null;
  const page = Number(searchParams.get("page") || 1);
  const per_page = Number(searchParams.get("per_page") || 10);
  const skip = (page - 1) * per_page;

  try {
    const total_data = await prisma.chapter.count({
      where: {
        course_id: course_id || undefined,
      },
    });
    const pagination = createPagination({
      page: page,
      per_page: per_page,
      total_data,
    });
    const result = await prisma.chapter.findMany({
      skip,
      take: Number(per_page),
      where: {
        course_id: course_id || undefined,
      },
      orderBy: {
        position: "desc",
      },
      select: {
        id: true,
        title: true,
        position: true,
      },
    });

    return Response.json({
      status: 200,
      message: "Success get chapter",
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
