import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { user_name, email, password, is_admin = false } = await req.json();

  try {
    const checkDuplicateEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (checkDuplicateEmail)
      return Response.json({ status: 401, message: "Email already registerd" });
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        password: hashedPassword,
        user_name,
        email,
        is_admin,
      },
    });
    return Response.json({ status: 201, message: "Success register" });
  } catch (error) {
    console.log({ error });
    return Response.json({
      status: 500,
      message: "Internal server error",
      result: error,
    });
  }
}
