import { NextRequest } from "next/server";
import { google } from "googleapis";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import cookie from "cookies-js";

export async function GET(req: NextRequest) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000/api/auth/google/callback"
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

    // if (!data.email || !data.name) {
    //     return Response.json({
    //       data: data,
    //     });
    //   }

    const checkUser = await prisma.user.findUnique({
      where: {
        email: data?.email,
      },
    });
    const token = await jwt.sign(checkUser, "asdasdasd", {
      expiresIn: "28d",
    });
    if (!checkUser) {
      await prisma.user.create({
        data: {
          email: data?.email,
          user_name: data?.name,
          is_admin: false,
          is_verified: true,
        },
      });
    }

    cookie.set(process.env.COOKIE_NAME, token);
    return Response.redirect("/");
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
