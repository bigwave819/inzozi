import { NextResponse } from "next/server";
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextResponse) {
  try {
    const { name, email, message } = await request.json();

    //Validate emails
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Inzozi Labs <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px; 
            }
            .header { 
              background: linear-gradient(135deg, #2980B9 0%, #00C6FF 100%); 
              color: white; 
              padding: 30px; 
              text-align: center; 
              border-radius: 10px 10px 0 0; 
            }
            .content { 
              background: #00C6FF; 
              padding: 30px; 
              border-radius: 0 0 10px 10px; 
            }
            .detail { 
              background: white; 
              padding: 15px; 
              border-radius: 5px; 
              margin: 10px 0; 
              border-left: 4px solid #00C6FF; 
            }
            .message { 
              background: white; 
              padding: 20px; 
              border-radius: 5px; 
              margin: 15px 0; 
              border: 1px solid #e0e0e0; 
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>New Contact Message</h1>
            <p>From your Inzozi labs website</p>
          </div>
          <div class="content">
            <div class="detail">
              <strong>Name:</strong> ${name}
            </div>
            <div class="detail">
              <strong>Email:</strong> ${email}
            </div>
            <div>
              <strong>Message:</strong>
              <div class="message">${message.replace(/\n/g, '<br>')}</div>
            </div>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px dashed #ccc; text-align: center; color: #666;">
              <p>This message was sent from the contact form on your Kindi Chocolate website.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `New Contact Form Submission

              Name: ${name}
              Email: ${email}
              Message:
              ${message}

              ---
              This message was sent from the contact form on your Kindi Chocolate website.
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);

    return NextResponse.json(
      {
        message: 'Message sent successfully! We will get back to you soon.'
      },
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
