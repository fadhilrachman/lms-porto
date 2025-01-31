import { prisma } from "@/lib/prisma";
import { generateOTP, sendEmail } from "@/lib/helper";

export async function POST(req: Request) {
  const { email } = await req.json();
  try {
    const otp = generateOTP();
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        otp,
      },
    });
    await sendEmail({
      to: user.email,
      subject: "USER VERIFICATION!",
      text: `This is your otp bro ${otp}`,
    });

    return Response.json({
      status: 200,
      message: "Succes resend OTP",

      result: {
        otp,
      },
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
