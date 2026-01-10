// api/_base44.js
// Base44 SDK interop for Vercel (Node ESM)
//
// Error you saw:
//   SyntaxError: The requested module '@base44/sdk' does not provide an export named 'createClient'
// usually means @base44/sdk is CommonJS. Named imports fail in Node ESM.
//
// This resolver supports both ESM and CJS builds of @base44/sdk.
import * as Base44SDK from "@base44/sdk";

function resolveCreateClient() {
  // ESM named export
  if (typeof Base44SDK.createClient === "function") return Base44SDK.createClient;

  // CommonJS default export (module.exports = {...})
  const d = Base44SDK.default;
  if (d && typeof d.createClient === "function") return d.createClient;

  // Some CJS builds export the function directly (module.exports = function)
  if (typeof d === "function") return d;

  // Rare double-default shapes
  if (d?.default && typeof d.default.createClient === "function") return d.default.createClient;

  throw new Error("Base44 SDK: could not resolve createClient export");
}

const createClient = resolveCreateClient();

export function getBase44Service() {
  const appId = process.env.BASE44_APP_ID;
  const serviceToken = process.env.BASE44_SERVICE_TOKEN;

  if (!appId || !serviceToken) {
    throw new Error("Missing BASE44_APP_ID or BASE44_SERVICE_TOKEN");
  }

  const client = createClient({ appId, serviceToken });

  // SDKs vary: asServiceRole could be a property or a function.
  const svc = typeof client.asServiceRole === "function" ? client.asServiceRole() : client.asServiceRole;

  if (!svc) throw new Error("Base44 SDK: missing client.asServiceRole");

  return svc;
}
