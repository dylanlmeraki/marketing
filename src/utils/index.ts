export function createPageUrl(pageName: string) {
  if (!pageName) return "/";

  const raw = pageName.trim();
  const key = raw.replace(/[\s_-]+/g, "").toLowerCase();

  if (key === "home") return "/";

  // SWPPPChecker / Consultation -> /consultation
  if (key === "swpppchecker" || key === "swppp" || key === "consultation") {
    return "/consultation";
  }

  const kebab = raw
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();

  return `/${kebab}`;
}
