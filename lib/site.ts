/**
 * Canonical site identity — used by metadata, the sitemap, robots and the
 * social preview card.
 *
 * The URL resolves in three steps so the same build is correct everywhere:
 * an explicit NEXT_PUBLIC_SITE_URL wins (set this once a custom domain is
 * attached), otherwise Vercel's production domain, otherwise localhost.
 */

function resolveUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) {
    return explicit.startsWith("http") ? explicit : `https://${explicit}`;
  }
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const site = {
  url: resolveUrl(),
  name: "Sai Sreekar VVG",
  shortName: "Sreekar",
  role: "Product Manager",
  /** Written for a recruiter skimming a search result or a shared link. */
  tagline: "Product Manager — AI commercialization, product strategy and 0→1",
  description:
    "Product management professional with ~3 years across AI commercialization, product strategy, growth and enterprise solutions. Case studies from Intellect Design Arena, Meta Labs Technology, MAVIP Group and IMT Ghaziabad, plus engineering and multi-agent AI work.",
  email: "sreekarvvg2000@gmail.com",
  linkedin: "https://linkedin.com/in/sreekarvvg",
  github: "https://github.com/sreekarvvg",
  keywords: [
    "Sai Sreekar VVG",
    "Product Manager",
    "AI Commercialization",
    "Product Strategy",
    "Pricing and Monetization",
    "GTM Strategy",
    "Enterprise AI",
    "BFSI",
    "0 to 1 Product",
    "Multi-Agent Systems",
    "LangGraph",
    "IMT Ghaziabad",
    "VJTI Mumbai",
    "Product Management Portfolio",
  ],
} as const;
