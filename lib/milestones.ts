/**
 * The five milestones. They are the site's navigation: the strip in the hero
 * links straight to each section, so `id` must match the section element's id.
 */
export type Milestone = {
  id: string;
  index: string;
  role: string;
  org: string;
  period: string;
  /** Two-word essence, used as the strip's hover caption. */
  essence: string;
  hue: string;
};

export const milestones: Milestone[] = [
  {
    id: "metalabs",
    index: "01",
    role: "Product Manager",
    org: "Meta Labs Technology",
    period: "2022 — 2024",
    essence: "Zero to One",
    hue: "var(--s2)",
  },
  {
    id: "mba",
    index: "02",
    role: "MBA",
    org: "IMT Ghaziabad",
    period: "2024 — 2026",
    essence: "The Business Lens",
    hue: "var(--s3)",
  },
  {
    id: "mavip",
    index: "03",
    role: "Strategy & Product Management Intern",
    org: "MAVIP Group",
    period: "2025",
    essence: "Concept to MVP",
    hue: "var(--s4)",
  },
  {
    id: "intellect",
    index: "04",
    role: "AI Product · Strategy & Commercialization",
    org: "Intellect",
    period: "2026 — Present",
    essence: "AI at Scale",
    hue: "var(--s5)",
  },
  {
    id: "engineering",
    index: "05",
    role: "AI Lab",
    org: "VJTI, Mumbai",
    period: "2018 — 2022",
    essence: "The Foundation",
    hue: "var(--s1)",
  },
];
