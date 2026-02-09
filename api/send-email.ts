/**
 * Email Sending API Endpoint
 * Replaces Base44's SendEmail integration
 * Uses Resend for email delivery (Vercel env vars)
 */
import { Resend } from "resend";

export const config = {
  runtime: "nodejs",
};

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailRequest {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;

  // Additive (optional) fields—won't break existing callers
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
}

function withCors(headers: HeadersInit = {}): HeadersInit {
  return {
    ...headers,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), { status, headers: withCors() });
}

function normalizeEmailList(value?: string | string[]): string[] | undefined {
  if (!value) return undefined;
  const list = Array.isArray(value) ? value : [value];
  const cleaned = list.map((s) => String(s).trim()).filter(Boolean);
  return cleaned.length ? cleaned : undefined;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: withCors() });
  }

  if (req.method !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  if (!process.env.RESEND_API_KEY) {
    return json(500, { error: "Missing RESEND_API_KEY" });
  }

  let body: EmailRequest;
  try {
    body = (await req.json()) as EmailRequest;
  } catch {
    return json(400, { error: "Invalid JSON body" });
  }

  const to = normalizeEmailList(body.to);
  const cc = normalizeEmailList(body.cc);
  const bcc = normalizeEmailList(body.bcc);

  const subject = (body.subject || "").trim();
  const html = typeof body.html === "string" ? body.html : undefined;
  const text = typeof body.text === "string" ? body.text : undefined;

  const from =
    (body.from && body.from.trim()) ||
    process.env.DEFAULT_EMAIL_FROM ||
    "Pacific Engineering <noreply@pacificengineeringsf.com>";

  if (!to?.length || !subject) {
    return json(400, { error: "Missing required fields: to, subject" });
  }

  if (!html && !text) {
    return json(400, { error: "Provide either html or text" });
  }

  try {
    const result = await resend.emails.send({
      from,
      to,
      subject,
      ...(cc ? { cc } : {}),
      ...(bcc ? { bcc } : {}),
      ...(body.replyTo ? { replyTo: body.replyTo } : {}),
      ...(html ? { html } : {}),
      ...(text ? { text } : {}),
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return json(502, {
        success: false,
        error: result.error.message || "Email service error",
      });
    }

    return json(200, { success: true, id: result.data?.id });
  } catch (error) {
    console.error("Email sending error:", error);
    const message =
      error instanceof Error ? error.message : "Server error";
    return json(500, { error: message });
  }
}
