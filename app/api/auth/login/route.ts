import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const checkCredenttial = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!checkCredenttial.is_verified)
      return Response.json(
        { status: 401, message: "Verify account first" },
        { status: 401 }
      );

    if (!checkCredenttial)
      return Response.json(
        { status: 401, message: "Login failed" },
        { status: 401 }
      );
    const checkPassword = await bcrypt.compare(
      password,
      checkCredenttial.password
    );

    if (!checkPassword)
      return Response.json(
        { status: 401, message: "Login failed" },
        { status: 401 }
      );

    const token = await jwt.sign(checkCredenttial, "asdasdasd", {
      expiresIn: "28d",
    });

    return Response.json({ status: 201, message: "Success login", token });
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
