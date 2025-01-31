import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";
import { generateOTP } from "@/lib/helper";
import nodemailer from "nodemailer";

interface EmailOptions {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}
async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: options.to,
      subject: options.subject,
      text: options.text || "",
      html: options.html || "",
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
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
      subject: "USER VERIFIED!",
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
