import { sendEmail } from "./_email.js"; 

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const toTeam = process.env.CONTACT_INBOX;
    if (!toTeam) return res.status(500).json({ error: "Missing CONTACT_INBOX env var" });

    const payload = req.body || {};
    const subject = `Chatbot log${payload?.urgentFlag ? " (URGENT)" : ""} - ${payload?.sessionId || ""}`;

    await sendEmail({
      to: toTeam,
      subject,
      text: JSON.stringify(payload, null, 2),
      html: `<pre style="white-space:pre-wrap">${escapeHtml(JSON.stringify(payload, null, 2))}</pre>`,
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("logChatbotActivity error:", e);
    return res.status(500).json({ error: "Failed to log chatbot activity" });
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