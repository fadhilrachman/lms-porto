import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";
import { generateOTP, sendEmail } from "@/lib/helper";

export async function POST(req: Request) {
  const { user_name, email, password } = await req.json();

  try {
    const checkDuplicateEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (checkDuplicateEmail)
      return Response.json(
        { status: 401, message: "Email already registered" },
        {
          status: 401,
        }
      );
    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP();
    await prisma.user.create({
      data: {
        password: hashedPassword,
        user_name,
        email,
        is_admin: true,
        otp,
      },
    });

    await sendEmail({
      to: email,
      subject: "USER VERIFIED OTP!",
      text: `This is your otp bro ${otp}`,
    });

    return Response.json({ status: 201, message: "Success register" });
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
