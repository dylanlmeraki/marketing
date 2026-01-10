import { sendEmail } from "./_email.js";


const ALLOWED_ORIGINS = [
  "https://pacificengineeringsf.com",
  "https://www.pacificengineeringsf.com",
  "https://marketing-git-main-dylanlmeraki.vercel.app",
  "https://marketing.vercel.app",
  "http://localhost:5173",
];

function cors(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
}

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ error: "Forbidden: Invalid origin" });
  }

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { formData, emailBody, userConfirmationEmail } = req.body || {};
    const toTeam = process.env.CONTACT_INBOX;

    if (!toTeam) return res.status(500).json({ error: "Missing CONTACT_INBOX env var" });
    if (!formData?.email) return res.status(400).json({ error: "Missing formData.email" });

    // 1) Admin notification (reply goes to the user)
    await sendEmail({
      to: toTeam,
      subject: `New Contact Form Submission - ${formData?.name || "Unknown"}`,
      text: emailBody || JSON.stringify(formData, null, 2),
      html: `<pre style="white-space:pre-wrap">${escapeHtml(emailBody || JSON.stringify(formData, null, 2))}</pre>`,
      replyTo: formData.email,
    });

    // 2) User confirmation (reply goes to you)
    await sendEmail({
      to: formData.email,
      subject: "We received your message — Pacific Engineering",
      html: userConfirmationEmail || `<p>Thanks — we received your message and will respond shortly.</p>`,
      text: "Thanks — we received your message and will respond shortly.",
      replyTo: toTeam,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact form email error:", error);
    return res.status(500).json({ error: "Failed to send contact form emails" });
  }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[m]));
}