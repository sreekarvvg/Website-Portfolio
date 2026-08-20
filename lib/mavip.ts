import type { ArtifactDoc } from "./artifacts";

export const mavipMeta = {
  period: "2025",
  role: "Strategy & Product Management Intern",
  org: "MAVIP Group",
  product: "quotnt — The Founders' Quotient",
  summary:
    "Turn an idea for a founder-focused platform into a product people could actually use. Led quotnt from product strategy to launch-ready MVP — shaping the product, UI/UX, platform architecture, GTM and launch requirements.",
  myRole:
    "I worked across product, strategy and execution, collaborating with international clients, partners and diverse teams across cultures and backgrounds. Working with people from different markets and perspectives taught me to adapt quickly, communicate with empathy, and shape solutions that work beyond a single context.",
} as const;

export const mavipMetrics = [
  { value: "6 months", label: "Concept → launch-ready MVP" },
  { value: "5", label: "Large-scale technology events" },
  { value: "20+", label: "Stakeholders coordinated" },
  { value: "$100K+", label: "Budgets managed" },
  { value: "95%+", label: "Partner satisfaction" },
] as const;

export const mavipTeams = [
  "Product",
  "Design",
  "Engineering",
  "Marketing",
  "Sales",
  "Vendors",
  "Partners",
  "Leadership",
] as const;

export const mavipSkills = [
  "Product Strategy",
  "Product Discovery",
  "UI/UX",
  "MVP Development",
  "GTM",
  "Stakeholder Management",
  "Project Management",
  "Market Research",
  "Competitive Analysis",
  "Vendor Management",
  "Event Strategy",
  "Business Development",
  "Execution",
] as const;

export const sipDeck: ArtifactDoc = {
  id: "mavip-sip",
  org: "MAVIP",
  title: "Summer Internship Presentation",
  meta: "Product Strategy · GTM · UI/UX · Platform",
  pages: 15,
  dir: "/mavip/sip",
};

export const eventsBanner = {
  id: "mavip-events",
  title: "End-to-end event management",
  caption: "Oracle × Mindware · Redington · GISEC · GII × Eureka",
  src: "/mavip/events-banner.webp",
};
