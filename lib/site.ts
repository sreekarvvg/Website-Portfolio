/**
 * Identity, contact and the copy that introduces the site.
 *
 * The URL resolves in three steps so one build is correct everywhere: an
 * explicit NEXT_PUBLIC_SITE_URL wins, then the deployment domain, then
 * localhost.
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
  /** The positioning line under the name, and in the header. */
  role: "AI Product • Strategy & Commercialization",
  headerTag: "Product × Technology × Business × AI",
  about:
    "I have always had an itch to understand how things work, and build them better. From 10+ projects and 0→1 products to MVP launches and $100K+ growth campaigns, I have learned by doing. Today, I work across AI, enterprise products, and commercialization, bringing together technology, business, and product thinking to solve complex problems and create meaningful impact. Wherever I work, I look beyond the role to find ways to build, improve, and make things better.",
  description:
    "AI Product, Strategy & Commercialization. Case studies across enterprise AI at Intellect Design Arena, 0→1 product at Meta Labs Technology, MAVIP Group, IMT Ghaziabad and VJTI Mumbai.",
  email: "sreekarvvg2000@gmail.com",
  linkedin: "https://linkedin.com/in/sreekarvvg",
  github: "https://github.com/sreekarvvg",
  cv: "/Sai-Sreekar-VVG-Product-Management.pdf",
  keywords: [
    "Sai Sreekar VVG",
    "AI Product",
    "Product Manager",
    "AI Commercialization",
    "Product Strategy",
    "Pricing and Monetization",
    "GTM Strategy",
    "Enterprise AI",
    "BFSI",
    "0 to 1 Product",
    "IMT Ghaziabad",
    "VJTI Mumbai",
  ],
} as const;
