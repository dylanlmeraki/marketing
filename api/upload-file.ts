/**
 * File Upload API Endpoint
 * Replaces Base44's UploadFile integration
 *
 * Production implementation: uploads to Vercel Blob
 *
 * Requirements:
 * - npm i @vercel/blob
 * - Create/Connect a Blob store in Vercel → Storage → Blob (adds BLOB_READ_WRITE_TOKEN)
 *
 * Notes:
 * - "Server uploads" are best for files up to ~4.5MB on Vercel.
 *   For larger files, use Vercel Blob Client Uploads.
 */

import { put } from "@vercel/blob";

export const config = {
  runtime: "edge",
};

const MAX_BYTES = 4.5 * 1024 * 1024; // ~4.5MB (server upload guideline)

const ALLOWED_EXTENSIONS = new Set([
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "csv",
  "png",
  "jpg",
  "jpeg",
  "gif",
  "webp",
]);

function corsHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Cache-Control": "no-store",
  };
}

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders() });
}

function safeFilename(name: string): string {
  // keep it URL/path safe-ish
  return name
    .replace(/[/\\?%*:|"<>]/g, "-")
    .replace(/\s+/g, "_")
    .slice(0, 180);
}

function getExtension(name: string): string {
  const idx = name.lastIndexOf(".");
  return idx >= 0 ? name.slice(idx + 1).toLowerCase() : "";
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  if (req.method !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return json(400, { error: "Expected multipart/form-data" });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return json(400, { error: "No file provided" });
  }

  const filename = file.name || "upload";
  const ext = getExtension(filename);

  if (ext && !ALLOWED_EXTENSIONS.has(ext)) {
    return json(400, {
      error: `File type not allowed. Allowed: ${Array.from(ALLOWED_EXTENSIONS).join(", ")}`,
    });
  }

  if (file.size > MAX_BYTES) {
    return json(413, {
      error:
        `File too large for server upload (${Math.round(file.size / 1024 / 1024)}MB). ` +
        `Use client uploads for larger files.`,
      maxBytes: MAX_BYTES,
    });
  }

  const cleaned = safeFilename(filename);
  const pathnameBase = `uploads/${Date.now()}-${cleaned}`;

  try {
    // put() returns { pathname, contentType, contentDisposition, url, downloadUrl, ... }
    const blob = await put(pathnameBase, file, {
      access: "public",
      addRandomSuffix: true,
    });

    return json(200, {
      file_url: blob.url,
      filename: cleaned,
      pathname: blob.pathname,
      download_url: blob.downloadUrl,
      content_type: blob.contentType,
    });
  } catch (error) {
    console.error("File upload error:", error);
    return json(500, {
      error: error instanceof Error ? error.message : "Server error",
    });
  }
}
