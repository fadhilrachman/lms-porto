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
