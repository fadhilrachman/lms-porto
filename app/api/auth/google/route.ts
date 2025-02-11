import { prisma } from "@/lib/prisma";
import { google } from "googleapis";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://lms-porto.vercel.app/api/auth/google/callback"
  );
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    include_granted_scopes: true,
  });

  return Response.json({
    status: 200,
    message: "Success auth",
    url: authorizationUrl,
  });
}
