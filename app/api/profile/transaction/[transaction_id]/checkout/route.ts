import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ transaction_id: string }> }
) {
  const { transaction_id } = await params;
  try {
    const checkData = await prisma.transaction.findUnique({
      where: {
        id: transaction_id,
      },
    });

    if (!checkData)
      return Response.json({
        status: 404,
        message: "Transaction Not Found",
      });

    if (checkData.is_checkout)
      return Response.json({
        status: 400,
        message: "Transaction Already Checkout",
      });

    const result = await prisma.transaction.update({
      where: {
        id: transaction_id,
      },
      data: {
        is_checkout: true,
        token_snap: null,
      },
    });
    return Response.json({
      status: 200,
      message: "Checkout Success",
      result,
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
