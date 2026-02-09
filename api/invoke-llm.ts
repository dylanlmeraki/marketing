/**
 * LLM Invocation API Endpoint
 * Replaces Base44's InvokeLLM integration
 * Uses OpenAI from Vercel environment variables
 */
import OpenAI from "openai";

export const config = {
  runtime: "nodejs",
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // Optional (only set if you have a proxy or compatible gateway)
  baseURL: process.env.OPENAI_BASE_URL || undefined,
  organization: process.env.OPENAI_ORG_ID || undefined,
  project: process.env.OPENAI_PROJECT_ID || undefined,
});

interface LLMRequest {
  prompt: string;
  model?: string;
  max_tokens?: number;
  temperature?: number;
  response_type?: "text" | "json";
  response_json_schema?: object;
  context?: string;
}

function withCors(headers: HeadersInit = {}): HeadersInit {
  return {
    ...headers,
    "Content-Type": "application/json",
    // If you want to lock this down later, replace * with your domain(s)
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), { status, headers: withCors() });
}

function clampNumber(
  value: unknown,
  fallback: number,
  min: number,
  max: number
): number {
  const n = typeof value === "number" && Number.isFinite(value) ? value : fallback;
  return Math.min(max, Math.max(min, n));
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: withCors() });
  }

  if (req.method !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return json(500, { error: "Missing OPENAI_API_KEY" });
  }

  let body: LLMRequest;
  try {
    body = (await req.json()) as LLMRequest;
  } catch {
    return json(400, { error: "Invalid JSON body" });
  }

  const prompt = (body.prompt || "").trim();
  if (!prompt) {
    return json(400, { error: "Missing prompt" });
  }

  const model = (body.model || "gpt-4o-mini").trim();
  const max_tokens = clampNumber(body.max_tokens, 1024, 1, 8192);
  const temperature = clampNumber(body.temperature, 0.7, 0, 2);

  const response_type = body.response_type;
  const response_json_schema = body.response_json_schema;
  const context = typeof body.context === "string" ? body.context.trim() : "";

  const useJsonResponse = response_type === "json" || !!response_json_schema;

  // Keep messages simple and safe
  const messages: OpenAI.ChatCompletionMessageParam[] = [];

  // If a JSON schema is provided, we don't rely on an API feature that may vary;
  // we instruct the model in-system to comply (best effort) and still request json_object mode.
  if (useJsonResponse) {
    const schemaHint = response_json_schema
      ? `\n\nReturn JSON that matches this schema as closely as possible:\n${JSON.stringify(
          response_json_schema
        )}`
      : "";

    messages.push({
      role: "system",
      content:
        "You must respond with a valid JSON object only. Do not include markdown, code fences, or extra text." +
        schemaHint,
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
        // If the model didn't comply, return raw text (caller can decide how to handle)
        content = rawContent;
      }
    }

    return json(200, { content, model });
  } catch (error) {
    // Avoid leaking secrets; return a readable error
    const message =
      error instanceof Error ? error.message : "LLM request failed";
    console.error("LLM invocation error:", error);
    return json(500, { error: message });
  }
}
