/**
 * LLM Invocation API Endpoint
 * Replaces Base44's InvokeLLM integration
 * Uses OpenAI via Replit AI Integrations
 */
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

interface LLMRequest {
  prompt: string;
  model?: string;
  max_tokens?: number;
  temperature?: number;
  response_type?: 'text' | 'json';
  response_json_schema?: object;
  context?: string;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body: LLMRequest = await req.json();
    const { prompt, model = 'gpt-4o-mini', max_tokens = 1024, temperature = 0.7, response_type, response_json_schema, context } = body;
    const useJsonResponse = response_type === 'json' || !!response_json_schema;

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Missing prompt' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const messages: OpenAI.ChatCompletionMessageParam[] = [];
    
    if (context) {
      messages.push({ role: 'system', content: context });
    }
    
    messages.push({ role: 'user', content: prompt });

    const completion = await openai.chat.completions.create({
      model,
      messages,
      max_tokens,
      temperature,
      ...(useJsonResponse ? { response_format: { type: 'json_object' } } : {}),
    });

    const rawContent = completion.choices[0]?.message?.content || '';
    let content: string | object = rawContent;
    
    if (useJsonResponse) {
      try {
        content = JSON.parse(rawContent);
      } catch {
        content = rawContent;
      }
    }

    return new Response(JSON.stringify({ content, model }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('LLM invocation error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
