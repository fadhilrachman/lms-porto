import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const checkCredenttial = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!checkCredenttial)
      return Response.json({ status: 401, message: "Login failed" });
    const checkPassword = await bcrypt.compare(
      password,
      checkCredenttial.password
    );

    if (!checkPassword)
      return Response.json({ status: 401, message: "Login failed" });

    const token = await jwt.sign(checkCredenttial, "asdasdasd", {
      expiresIn: "28d",
    });
    return Response.json({ status: 201, message: "Success login", token });
  } catch (error) {
    console.log({ error });
    return Response.json({
      status: 500,
      message: "Internal server error",
      result: error,
    });
  }
}
