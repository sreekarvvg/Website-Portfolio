import type { ArtifactDoc } from "./artifacts";

export const mbaMeta = {
  period: "2024 — 2026",
  degree: "MBA",
  school: "IMT Ghaziabad",
  standing: "Top 10%",
  standingNote: "of the cohort academically",
  summary:
    "An MBA that took me beyond building products — into strategy, business, markets and people. Spent 1 year in Dubai, gaining international exposure and learning alongside leaders, entrepreneurs and professionals from across the world.",
  positioning:
    "My MBA added the business lens to my builder mindset — helping me understand not just what to build, but why it matters, how it creates value, and how to make it work at scale.",
} as const;

export const pillars = [
  {
    index: "01",
    title: "Case Competitions",
    body: "Applied strategy, problem-solving and product thinking to real business problems.",
  },
  {
    index: "02",
    title: "Global Exposure",
    body: "Dubai-based experience with diverse teams, leaders, markets and perspectives.",
  },
  {
    index: "03",
    title: "Leadership Immersion",
    body: "Interactions with business leaders, entrepreneurs and professionals from around the world.",
  },
  {
    index: "04",
    title: "Business Thinking",
    body: "Strategy · Finance · Marketing · Operations · Analytics · Leadership",
  },
] as const;

export const mbaSkills = [
  "Business Strategy",
  "Product Strategy",
  "Market Research",
  "Consumer Behaviour",
  "Marketing",
  "GTM",
  "Pricing",
  "Financial Analysis",
  "Business Models",
  "Competitive Strategy",
  "Data Analysis",
  "Leadership",
  "Negotiation",
  "Problem Solving",
  "Storytelling",
] as const;

export const thoucentric: ArtifactDoc = {
  id: "thoucentric",
  org: "Thoucentric",
  title: "Management Consulting Case Competition",
  meta: "Winning Solution · Colorico Paints",
  pages: 1,
  dir: "/mba/thoucentric",
};

export const loreal: ArtifactDoc = {
  id: "loreal",
  org: "L'Oréal",
  title: "Product Discovery & Innovation",
  meta: "Case Competition · Plumeo by In-Scentive",
  pages: 3,
  dir: "/mba/loreal",
};
