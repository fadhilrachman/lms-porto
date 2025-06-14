import { NextRequest } from "next/server";
import { google } from "googleapis";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function GET(req: NextRequest) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://lms-porto.vercel.app/api/auth/google/callback"
  );
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code") as string;

  try {
    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const { data } = await oauth2.userinfo.get();

    let user = await prisma.user.findUnique({
      where: {
        email: String(data?.email),
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: String(data?.email),
          user_name: String(data?.name),
          is_admin: false,
          is_verified: true,
        },
      });
    }
    const token = await jwt.sign(user, "asdasdasd", {
      expiresIn: "28d",
    });
    (await cookies()).set(process.env.COOKIE_NAME, token);
    return Response.redirect("https://lms-porto.vercel.app");
  } catch (error) {
    console.log({ error });

    return Response.json(
      {
        status: 500,
        message: "Internal server error",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
