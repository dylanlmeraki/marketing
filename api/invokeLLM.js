import { getBase44Service } from "./_base44.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });

  try {
    const base44 = getBase44Service();
    const { prompt, ...rest } = req.body || {};
    if (!prompt) return res.status(400).json({ ok: false, error: "Missing prompt" });

    const out = await base44.integrations.Core.InvokeLLM({ prompt, ...rest });
    return res.status(200).json(out);
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || "Server error" });
  }
}
