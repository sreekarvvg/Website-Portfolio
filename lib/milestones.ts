/**
 * The journey, in the order it happened.
 *
 * These drive the timeline in the hero, which is the site's navigation, so
 * `id` must match the section element's id. Order here is chronological by
 * start date — it is a timeline, not the page's section order.
 */
export type Milestone = {
  id: string;
  index: string;
  role: string;
  org: string;
  /** What the step was, as shown on the timeline. */
  short: string;
  /** The year the step starts — the timeline's tick label. */
  year: string;
  period: string;
  hue: string;
};

export const milestones: Milestone[] = [
  {
    id: "engineering",
    index: "01",
    role: "B.Tech · AI Lab",
    org: "VJTI, Mumbai",
    short: "Engineering (VJTI, Mumbai)",
    year: "2018",
    period: "2018 — 2022",
    hue: "var(--s1)",
  },
  {
    id: "metalabs",
    index: "02",
    role: "Product Manager",
    org: "Metalabs Technology",
    short: "Product Manager",
    year: "2022",
    period: "2022 — 2024",
    hue: "var(--s2)",
  },
  {
    id: "mba",
    index: "03",
    role: "MBA",
    org: "IMT Ghaziabad",
    short: "MBA @ IMT G",
    year: "2024",
    period: "2024 — 2026",
    hue: "var(--s3)",
  },
  {
    id: "mavip",
    index: "04",
    role: "Strategy & Product Management Intern",
    org: "MAVIP Group",
    short: "Product & Strategy Manager",
    year: "2025",
    period: "2025",
    hue: "var(--s4)",
  },
  {
    id: "intellect",
    index: "05",
    role: "AI Product · Strategy & Commercialization",
    org: "Intellect",
    short: "CCO Office @ Intellect Design",
    year: "2026",
    period: "2026 — Present",
    hue: "var(--s5)",
  },
];
