/**
 * API Client - Replacement for Base44 SDK
 * Vercel deployment: calls /api/* endpoints
 */

export interface LLMParams {
  prompt: string;
  model?: string;
  max_tokens?: number;
  temperature?: number;
  response_type?: "text" | "json";
  response_json_schema?: unknown;
  context?: string;
}

export type LLMResult<T = unknown> = T | string;

export interface EmailParams {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
}

export interface UploadResult {
  file_url: string;
  filename: string;
}

async function invokeLLM<T = unknown>(params: LLMParams): Promise<LLMResult<T>> {
  const response = await fetch("/api/invoke-llm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const msg = data?.error || "LLM request failed";
    throw new Error(msg);
  }

  // IMPORTANT: return content directly so callers can do aiResponse.title, etc.
  return data?.content as LLMResult<T>;
}

async function sendEmail(params: EmailParams): Promise<{ success: boolean; id?: string }> {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const msg = data?.error || "Email send failed";
    throw new Error(msg);
  }

  return data;
}

async function uploadFile(params: { file: File }): Promise<UploadResult> {
  const formData = new FormData();
  formData.append("file", params.file);

  const response = await fetch("/api/upload-file", {
    method: "POST",
    body: formData,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const msg = data?.error || "File upload failed";
    throw new Error(msg);
  }

  return data;
}

export const apiClient = {
  integrations: {
    Core: {
      InvokeLLM: invokeLLM,
      SendEmail: sendEmail,
      UploadFile: uploadFile,
    },
  },
};

export default apiClient;
