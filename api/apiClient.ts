/**
 * API Client - Replacement for Base44 SDK
 * 
 * This module provides all the integrations that were previously handled by Base44:
 * - LLM invocation (via OpenAI through Replit AI Integrations)
 * - Email sending (via Resend)
 * - File uploads (placeholder for future implementation)
 */

interface LLMParams {
  prompt: string;
  model?: string;
  max_tokens?: number;
  temperature?: number;
  response_type?: 'text' | 'json';
  context?: string;
}

interface LLMResponse {
  content: string;
  model?: string;
}

interface EmailParams {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
}

interface UploadResult {
  file_url: string;
  filename: string;
}

/**
 * Invoke LLM via the backend API endpoint
 */
async function invokeLLM(params: LLMParams): Promise<LLMResponse> {
  const response = await fetch('/api/invoke-llm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'LLM request failed' }));
    throw new Error(error.error || 'LLM request failed');
  }
  
  return response.json();
}

/**
 * Send email via the backend API endpoint
 */
async function sendEmail(params: EmailParams): Promise<{ success: boolean }> {
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Email send failed' }));
    throw new Error(error.error || 'Email send failed');
  }
  
  return response.json();
}

/**
 * Upload file via the backend API endpoint
 */
async function uploadFile(params: { file: File }): Promise<UploadResult> {
  const formData = new FormData();
  formData.append('file', params.file);
  
  const response = await fetch('/api/upload-file', {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'File upload failed' }));
    throw new Error(error.error || 'File upload failed');
  }
  
  return response.json();
}

/**
 * API Client with organized integrations
 */
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
