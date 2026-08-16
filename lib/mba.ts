import type { ArtifactDoc } from "./artifacts";

/**
 * MBA — IMT Ghaziabad, 2024–2026. Milestone 03, so this section carries the
 * spectrum's amber hue. Artifacts come from the `MBA` branch.
 */

export const mbaMeta = {
  school: "IMT Ghaziabad",
  period: "2024–2026",
  standing: "Top 1% of the cohort academically",
  journey:
    "My MBA turned business theory into real-world problem solving — through case competitions, international exposure, and an internship in the UAE.",
} as const;

export const lessons = [
  {
    index: "01",
    title: "Think in systems",
    body: "Business problems rarely exist in isolation. Strategy requires connecting customers, markets, competition, operations and economics before deciding what to do.",
  },
  {
    index: "02",
    title: "Turn insight into action",
    body: "Research is only valuable when it changes a decision. Case competitions taught me to move quickly from ambiguous information to a clear, defensible strategy.",
  },
  {
    index: "03",
    title: "Think globally",
    body: "Working across different markets and cultures showed me that the same product, strategy or message cannot simply be copied from one market to another.",
  },
  {
    index: "04",
    title: "Balance data with judgement",
    body: "Strong decisions need both analytical evidence and the ability to make trade-offs when information is incomplete.",
  },
] as const;

/** Single-page winning solution — shown as one document card. */
export const thoucentric: ArtifactDoc = {
  id: "thoucentric",
  org: "Thoucentric",
  title: "Management Consulting Case Competition",
  meta: "Winning solution · Colorico Paints",
  pages: 1,
  dir: "/mba/thoucentric",
};

/** Three-page deck — shown as an auto-cycling stack. */
export const loreal: ArtifactDoc = {
  id: "loreal",
  org: "L'Oréal",
  title: "Product Discovery & Innovation",
  meta: "Case competition · Plumeo by In-Scentive",
  pages: 3,
  dir: "/mba/loreal",
};
