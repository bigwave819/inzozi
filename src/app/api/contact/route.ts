import nodemailer from 'nodemailer'
import { z } from 'zod'

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email().max(200),
  company: z.string().trim().max(150).optional().default(''),
  service: z.string().trim().max(50).optional().default(''),
  budget: z.string().trim().max(50).optional().default(''),
  message: z.string().trim().min(10).max(5000),
  website: z.string().optional(), // honeypot: hidden field, humans leave it empty
})

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: Number(process.env.SMTP_PORT ?? 465) === 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
})

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return Response.json({ error: 'Please check the form fields and try again.' }, { status: 400 })
  }
  const d = parsed.data
  // Pretend success so bots don't learn the honeypot exists.
  if (d.website) return Response.json({ ok: true })

  try {
    await transporter.sendMail({
      from: `"Inzozi Labs Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO ?? process.env.SMTP_USER,
      replyTo: { name: d.name, address: d.email },
      subject: `New project inquiry: ${d.name}${d.company ? ` (${d.company})` : ''}`,
      text: [
        `Name: ${d.name}`,
        `Email: ${d.email}`,
        `Company: ${d.company || '-'}`,
        `Service: ${d.service || '-'}`,
        `Budget: ${d.budget || '-'}`,
        '',
        d.message,
      ].join('\n'),
    })
    return Response.json({ ok: true })
  } catch (err) {
    console.error('contact: sendMail failed', err)
    return Response.json({ error: 'Could not send your message. Please email us directly.' }, { status: 500 })
  }
}
