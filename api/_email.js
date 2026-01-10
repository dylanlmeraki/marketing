import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html, text, replyTo }) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY");
  }

  const from = process.env.EMAIL_FROM || "Pacific Engineering <onboarding@resend.dev>";

  const { data, error } = await resend.emails.send({
    from,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    text,
    replyTo, // supported (camelCase) :contentReference[oaicite:4]{index=4}
  });

  if (error) {
    const msg = typeof error === "string" ? error : JSON.stringify(error);
    throw new Error(`Resend error: ${msg}`);
  }

  return data;
}
