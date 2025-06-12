import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";

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
  const { chapter_id, content_vid, title, description } = await req.json();

  try {
    const countContentOnChapter = await prisma.content.count({
      where: { chapter_id },
    });

    const result = await prisma.content.create({
      data: {
        position: countContentOnChapter + 1,
        chapter_id,
        content_vid,
        title,
        description,
        is_published: true,
      },
    });

    return Response.json({
      status: 200,
      message: "Success create content",
      result,
    });
  } catch (error) {
    console.log(error);

    return Response.json({
      status: 500,
      message: "Internal server error",
    });
  }
}
// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const course_id = searchParams.get("course_id") || null;
//   const page = Number(searchParams.get("page") || 1);
//   const per_page = Number(searchParams.get("per_page") || 10);
//   const skip = (page - 1) * per_page;

//   try {
//     const total_data = await prisma.content.count({
//       where: {
//         course_id: course_id || undefined,
//       },
//     });
//     const pagination = createPagination({
//       page: page,
//       per_page: per_page,
//       total_data,
//     });
//     const result = await prisma.content.findMany({
//       skip,
//       take: Number(per_page),
//       where: {
//         course_id: course_id || undefined,
//       },
//       orderBy: {
//         position: "desc",
//       },
//       select: {
//         id: true,
//         title: true,
//         position: true,
//       },
//     });
//     return Response.json({
//       status: 200,
//       message: "Success get content",
//       result,
//       pagination,
//     });
//   } catch (error) {
//     console.log({ error });

//     return Response.json({
//       status: 500,
//       message: "Internal server error",
//     });
//   }
// }
