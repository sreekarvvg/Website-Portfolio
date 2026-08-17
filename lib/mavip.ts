import type { ArtifactDoc } from "./artifacts";

/**
 * MAVIP — milestone 04, carrying the spectrum's orange hue.
 * Artifacts come from the `MAVIP` branch.
 */

export const mavipMeta = {
  period: "2025–2026",
  lede: "Led complete development of quotnt — The Founders' Quotient, defining product strategy, multi-stakeholder GTM, UI/UX, platform architecture and launch requirements; collaborated with developers and designers to deliver a launch-ready MVP in 6 months.",
  events:
    "Directed end-to-end delivery of 5 large-scale tech events (Oracle × Mindware, Redington, GISEC outreach, GII × Eureka).",
} as const;

export const mavipMetrics = [
  { value: ">$100K", label: "Budget managed" },
  { value: "20+", label: "Stakeholders" },
  { value: "95%+", label: "Satisfaction from partners" },
] as const;

/** The Summer Internship deck — the detailed work proof. */
export const sipDeck: ArtifactDoc = {
  id: "sip",
  org: "quotnt",
  title: "Summer Internship Presentation",
  meta: "Product strategy · GTM · UI/UX · Platform",
  pages: 15,
  dir: "/mavip/sip",
};

export const eventsBanner = {
  src: "/mavip/events-banner.webp",
  w: 1800,
  h: 1074,
  org: "Events",
  title: "End-to-end event management",
  meta: "Oracle × Mindware · Redington · GISEC · GII × Eureka",
};
