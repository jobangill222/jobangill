import { NextResponse } from "next/server";

export const runtime = "nodejs";

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const contact = typeof body.contact === "string" ? body.contact.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const website = typeof body.website === "string" ? body.website.trim() : "";

    // Silently accept submissions caught by the bot honeypot.
    if (website) return NextResponse.json({ message: "Message sent." });

    if (name.length < 2 || name.length > 80) {
      return NextResponse.json({ message: "Please enter a valid name." }, { status: 400 });
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
    const isPhone = /^[+\d()\s-]{7,24}$/.test(contact);
    if (!isEmail && !isPhone) {
      return NextResponse.json({ message: "Please enter a valid phone number or email address." }, { status: 400 });
    }

    if (description.length < 10 || description.length > 2000) {
      return NextResponse.json({ message: "Please provide a description between 10 and 2,000 characters." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Contact form is missing RESEND_API_KEY.");
      return NextResponse.json({ message: "Email delivery is not configured yet. Please contact me directly by email." }, { status: 503 });
    }

    const recipient = process.env.CONTACT_TO_EMAIL || "jobangill222@gmail.com";
    const sender = process.env.CONTACT_FROM_EMAIL || "Jobanpreet Portfolio <onboarding@resend.dev>";
    const safeName = escapeHtml(name);
    const safeContact = escapeHtml(contact);
    const safeDescription = escapeHtml(description).replace(/\n/g, "<br />");

    const emailPayload: Record<string, unknown> = {
      from: sender,
      to: [recipient],
      subject: `New portfolio enquiry from ${name}`,
      text: `Name: ${name}\nPhone or email: ${contact}\n\nProject description:\n${description}`,
      html: `<h2>New portfolio enquiry</h2><p><strong>Name:</strong> ${safeName}</p><p><strong>Phone or email:</strong> ${safeContact}</p><p><strong>Project description:</strong></p><p>${safeDescription}</p>`,
    };

    if (isEmail) emailPayload.reply_to = contact;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "Jobanpreet-Singh-Portfolio/1.0",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("Resend email error:", response.status, details);
      return NextResponse.json({ message: "Your message could not be sent right now. Please try again or contact me directly." }, { status: 502 });
    }

    return NextResponse.json({ message: "Message sent." });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ message: "Something went wrong. Please try again." }, { status: 500 });
  }
}
