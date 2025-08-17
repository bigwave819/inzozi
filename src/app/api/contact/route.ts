import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { to, subject, text } = await req.json();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Your App" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
