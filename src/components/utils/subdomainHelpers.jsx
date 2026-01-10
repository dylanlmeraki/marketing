// Marketing site helper utilities
// This codebase is for the main marketing site only

/**
 * Get the current hostname
 */
export function getHostname() {
  if (typeof window === "undefined") return "";
  return window.location.hostname;
}

/**
 * Always returns "main" for marketing site
 * @returns {"main"}
 */
export function getPortalType() {
  return "main";
}

/**
 * Always false for marketing site
 */
export function isInternalPortal() {
  return false;
}

/**
 * Always false for marketing site
 */
export function isClientPortal() {
  return false;
}

/**
 * Always true for marketing site
 */
export function isMainDomain() {
  return true;
}

export default {
  getHostname,
  getPortalType,
  isInternalPortal,
  isClientPortal,
  isMainDomain
};