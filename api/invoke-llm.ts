import OpenAI from "openai";
import type { VercelRequest, VercelResponse } from "@vercel/node";

type ResponseType = "text" | "json";

interface LLMRequest {
  prompt: string;
  model?: string;
  max_tokens?: number;
  temperature?: number;
  response_type?: ResponseType;
  response_json_schema?: unknown;
  context?: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || undefined,
  organization: process.env.OPENAI_ORG_ID || undefined,
  project: process.env.OPENAI_PROJECT_ID || undefined,
});

function setCors(res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Cache-Control", "no-store");
}

function clampNumber(value: unknown, fallback: number, min: number, max: number): number {
  const n = typeof value === "number" && Number.isFinite(value) ? value : fallback;
  return Math.min(max, Math.max(min, n));
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Missing OPENAI_API_KEY" });
  }

  const body = safeJsonParse<LLMRequest>(req.body);
  if (!body) {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const prompt = (body.prompt || "").trim();
  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  const model = (body.model || "gpt-4o-mini").trim();
  const max_tokens = clampNumber(body.max_tokens, 1024, 1, 8192);
  const temperature = clampNumber(body.temperature, 0.7, 0, 2);

  const context = typeof body.context === "string" ? body.context.trim() : "";
  const useJsonResponse = body.response_type === "json" || !!body.response_json_schema;

  const messages: OpenAI.ChatCompletionMessageParam[] = [];

  // If JSON requested, force "JSON only" behavior (best-effort)
  if (useJsonResponse) {
    const schemaText = body.response_json_schema
      ? `Return JSON matching this schema as closely as possible:\n${JSON.stringify(body.response_json_schema)}`
      : "";

    messages.push({
      role: "system",
      content:
        "Respond with a valid JSON object ONLY. Do not include markdown, code fences, or extra text.\n" +
        schemaText,
    });
  }

  if (context) {
    messages.push({ role: "system", content: context });
  }

  messages.push({ role: "user", content: prompt });

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages,
      max_tokens,
      temperature,
      ...(useJsonResponse ? { response_format: { type: "json_object" } } : {}),
    });

    const rawContent = completion.choices?.[0]?.message?.content ?? "";
    let content: string | object = rawContent;

    if (useJsonResponse) {
      try {
        content = JSON.parse(rawContent);
      } catch {
        // Return raw if parsing failed; caller can handle
        content = rawContent;
      }
    }

    return res.status(200).json({ content, model });
  } catch (err) {
    console.error("LLM invocation error:", err);
    const message = err instanceof Error ? err.message : "LLM request failed";
    return res.status(500).json({ error: message });
  }
}
