import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Simple in-memory rate limiter
const rateLimitMap = new Map();
const LIMIT = 3; // Max 3 requests
const WINDOW = 60 * 60 * 1000; // 1 hour window

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "anonymous";
  const now = Date.now();

  const userRequests = rateLimitMap.get(ip) || [];
  const recentRequests = userRequests.filter((timestamp: number) => now - timestamp < WINDOW);

  if (recentRequests.length >= LIMIT) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in an hour." },
      { status: 429 }
    );
  }

  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);

  try {
    const { name, email, message } = await req.json();

    // Basic sanitization and validation
    const cleanName = name?.replace(/<[^>]*>?/gm, "").trim().slice(0, 100);
    const cleanMessage = message?.replace(/<[^>]*>?/gm, "").trim().slice(0, 300);

    if (!cleanName || !email || !cleanMessage) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Graceful email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (message.length > 300) {
      return NextResponse.json({ error: "Message too long (max 300 characters)." }, { status: 400 });
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: process.env.MAIL_ENCRYPTION === "ssl", // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: "intern.josevener@gmail.com", // Send to yourself
      replyTo: email, // Reply to the sender
      subject: `New Message from Portfolio: ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${email}\n\nMessage:\n${cleanMessage}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333;">New Message from Portfolio</h2>
          <p><strong>Name:</strong> ${cleanName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${cleanMessage}</p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
