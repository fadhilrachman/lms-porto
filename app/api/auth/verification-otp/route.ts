import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { otp, email } = await req.json();
  try {
    const verifyOtp = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!verifyOtp)
      return Response.json(
        {
          message: "Verify error",
        },
        {
          status: 404,
        }
      );

    if (verifyOtp.otp != otp)
      return Response.json(
        {
          message: "Verify error",
        },
        {
          status: 400,
        }
      );

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        otp: null,
        is_verified: true,
      },
    });

    return Response.json({
      message: "Succes verify account",
    });
  } catch (error) {
    console.log({ error });

    return Response.json(
      {
        status: 500,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
