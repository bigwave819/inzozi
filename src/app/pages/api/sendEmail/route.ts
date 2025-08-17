import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { to, subject, text } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // ✅ use Brevo host
      port: Number(process.env.SMTP_PORT),
      secure: false, // 587 is STARTTLS (not SSL)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Inzozi App" <waveb6133@gmail.com>`, // ✅ must match Brevo user
      to,
      subject,
      text,
    });

    return NextResponse.json(
      { message: "Email sent successfully ✅" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { message: "Failed to send email ❌", error: (error as any).message },
      { status: 500 }
    );
  }
}
