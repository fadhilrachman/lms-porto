import { NextRequest } from "next/server";

import { createPagination } from "@/lib/pagination-server";
import { prisma } from "@/lib/prisma";
import { verifyTokenCustomer } from "@/lib/verify-token-server";
import Midtrans from "midtrans-client";
import { generateRandomCode } from "@/lib/helper";

export async function POST(req: NextRequest) {
  const { course_id } = await req.json();

  const snap = new Midtrans.Snap({
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
    isProduction: false,
  });
  if (verifyTokenCustomer(req)) {
    return Response.json(
      {
        status: 403,
        message: "Access Denied. No token provided.",
      },
      {
        status: 403,
      }
    );
  }
  const user = JSON.parse(req.headers.get("user") as string);
  // console.log({ user });

  try {
    const checkDuplicateTransaction = await prisma.transaction.findFirst({
      where: {
        course_id,
        user_id: user.id,
      },
    });

    if (checkDuplicateTransaction)
      return Response.json(
        {
          status: 400,
          message: "This course already purchased",
        },
        {
          status: 400,
        }
      );

    const code = generateRandomCode("TRA");

    const result = await prisma.transaction.create({
      data: {
        course_id,
        user_id: user.id,
        code,
      },
      include: {
        course: true,
      },
    });

    let parameterMidtrans = {
      transaction_details: {
        order_id: code,
        gross_amount: 1000,
      },
    };

    const token = await snap.createTransactionToken(parameterMidtrans);

    return Response.json({
      status: 200,
      message: "Success create transaction",
      result,
      token,
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
      },
      orderBy: {
        created_at: "desc",
      },
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
