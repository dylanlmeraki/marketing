import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

interface EmailRequest {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;

  // additive extras (won't break existing callers)
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

function setCors(res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Cache-Control", "no-store");
}

function safeJsonParse<T = unknown>(value: unknown): T | null {
  if (typeof value === "object" && value !== null) return value as T;
  if (typeof value !== "string") return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function normalizeEmailList(value?: string | string[]): string[] | undefined {
  if (!value) return undefined;
  const arr = Array.isArray(value) ? value : [value];
  const cleaned = arr.map((s) => String(s).trim()).filter(Boolean);
  return cleaned.length ? cleaned : undefined;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "Missing RESEND_API_KEY" });
  }

  const body = safeJsonParse<EmailRequest>(req.body);
  if (!body) {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const to = normalizeEmailList(body.to);
  const subject = (body.subject || "").trim();
  const html = typeof body.html === "string" ? body.html : undefined;
  const text = typeof body.text === "string" ? body.text : undefined;

  const from =
    (body.from && body.from.trim()) ||
    process.env.DEFAULT_EMAIL_FROM ||
    "Pacific Engineering <noreply@pacificengineeringsf.com>";

  if (!to?.length || !subject) {
    return res.status(400).json({ error: "Missing required fields: to, subject" });
  }

  if (!html && !text) {
    return res.status(400).json({ error: "Provide either html or text" });
  }

  const cc = normalizeEmailList(body.cc);
  const bcc = normalizeEmailList(body.bcc);

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
      return res.status(502).json({ success: false, error: result.error.message || "Email service error" });
    }

    return res.status(200).json({ success: true, id: result.data?.id });
  } catch (err) {
    console.error("Email sending error:", err);
    const message = err instanceof Error ? err.message : "Server error";
    return res.status(500).json({ error: message });
  }
}
