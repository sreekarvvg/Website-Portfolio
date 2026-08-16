/**
 * MetaLabs case-study data.
 *
 * Every figure here is transcribed from the artifacts on the `Metalabs`
 * branch. Where a metric was specified but not supplied, the literal "XX"
 * placeholder is preserved rather than invented.
 */

export const STAGE_COUNT = 6;

export const stages = [
  { id: "product", index: "01", label: "The Product" },
  { id: "understand", index: "02", label: "Understand" },
  { id: "demand", index: "03", label: "Create Demand" },
  { id: "design", index: "04", label: "Design the Product" },
  { id: "build", index: "05", label: "Build & Iterate" },
  { id: "ship", index: "06", label: "Ship & Scale" },
] as const;

/* ── Stage 01 ─────────────────────────────────────────── */

export const headlineMetrics = [
  { value: "10.5K+", label: "Twitter Followers" },
  { value: "2.5K+", label: "Discord Members" },
  { value: "7,000+", label: "Digital Assets Generated" },
  { value: "XX", label: "[Metric to be added]", pending: true },
  { value: "XX", label: "[Metric to be added]", pending: true },
  { value: "XX", label: "[Metric to be added]", pending: true },
] as const;

export const theIdea =
  "The CEO envisioned an open-world game blending blockchain, AR, VR and Unity — connecting real and virtual worlds, enabling play-to-earn, and allowing digital assets to move across games.";

export const collaboration = [
  "Product",
  "Design",
  "Art",
  "Development",
  "Marketing",
  "Community",
] as const;

/* ── Stage 02 ─────────────────────────────────────────── */

export const PERSONA_COUNT = 9;
export const personaPages = Array.from(
  { length: PERSONA_COUNT },
  (_, i) => `/metalabs/personas/p${String(i + 1).padStart(2, "0")}.webp`,
);

export const researchMetrics = [
  { value: "9", label: "Audience Personas" },
  { value: "XX%", label: "[Research metric]", pending: true },
] as const;

export const competitiveMetrics = [
  { value: "30+", label: "Competitors Researched" },
  { value: "XX", label: "[Market / competitor metric]", pending: true },
] as const;

export type Competitor = {
  name: string;
  genre: string;
  chain: string;
  visits: string;
  uniques: string;
  duration: string;
  bounce: string;
  /** why this one earns a place in a six-row strategic comparison */
  read: string;
};

/**
 * Six of the 30+ researched competitors, chosen to span the distinct
 * strategic positions MetaLabs had to place itself against: category
 * leader, virtual world, licensed collectible, deep-engagement economy,
 * free-to-play card game, and the closest mobile-first rival.
 * Figures transcribed from the compiled research (Similarweb, Apr–Jun 2022).
 */
export const competitors: Competitor[] = [
  {
    name: "Axie Infinity",
    genre: "Not recorded",
    chain: "Not recorded",
    visits: "7.979M",
    uniques: "1.901M",
    duration: "06:49",
    bounce: "25.83%",
    read: "Category leader — the benchmark for play-to-earn scale",
  },
  {
    name: "Flufworld",
    genre: "Play2earn",
    chain: "Ethereum",
    visits: "4.755M",
    uniques: "931,410",
    duration: "09:20",
    bounce: "39.67%",
    read: "Collectible-led world with strong session depth",
  },
  {
    name: "NBA Top Shot",
    genre: "Play2earn",
    chain: "Ethereum",
    visits: "3.127M",
    uniques: "780,838",
    duration: "07:17",
    bounce: "40.29%",
    read: "Licensed IP proving mainstream digital ownership",
  },
  {
    name: "Splinterlands",
    genre: "Play2earn",
    chain: "Hive",
    visits: "2.510M",
    uniques: "419,115",
    duration: "17:50",
    bounce: "26.29%",
    read: "Deepest engagement in the set — economy-driven retention",
  },
  {
    name: "Decentraland",
    genre: "Play2earn",
    chain: "Ethereum",
    visits: "1.921M",
    uniques: "825,942",
    duration: "06:38",
    bounce: "42.74%",
    read: "Virtual-world model — the metaverse comparison point",
  },
  {
    name: "Guild of Guardians",
    genre: "Play2earn",
    chain: "Ethereum",
    visits: "170,967",
    uniques: "74,936",
    duration: "01:47",
    bounce: "55.71%",
    read: "Closest direct rival — mobile-first Web3 RPG",
  },
];

export const researchNarrative = [
  {
    step: "01",
    title: "Start broad",
    body: "Mapped the surrounding ecosystem across Play-to-Earn, NFT, metaverse and marketplace products rather than a single competitor set.",
  },
  {
    step: "02",
    title: "Benchmark behaviour",
    body: "Compared audience scale and website engagement using traffic, unique visitors, visit duration, bounce rate, geography and device distribution.",
  },
  {
    step: "03",
    title: "Compare positioning",
    body: "Covered projects with different models, audiences and blockchain ecosystems, letting product and market patterns be viewed side by side.",
  },
  {
    step: "04",
    title: "Feed product decisions",
    body: "The research sat alongside persona work and product/economy design, forming the discovery layer behind the MetaLabs product.",
  },
] as const;

export const RESEARCH_DOC = {
  id: "research",
  category: "Research",
  title: "Competitive Research",
  meta: "Compiled archive · 30 competitors",
  pages: 12,
  dir: "/metalabs/docs/research",
};

/* ── Stage 03 ─────────────────────────────────────────── */

export const channels = [
  { name: "Twitter", value: "10.5K+", label: "Active Followers" },
  { name: "Discord", value: "2.5K+", label: "Active Members Ready to Buy" },
  { name: "Reddit", value: "20K+", label: "Members" },
  { name: "Other", value: "30K+", label: "Reach on each post combined" },
] as const;

export const demandPillars = [
  {
    key: "Story",
    body: "Built the narrative, lore and world around the product.",
  },
  {
    key: "Content",
    body: "Turned the product vision into stories, campaigns, visual content and marketing assets.",
  },
  {
    key: "Community",
    body: "Built conversations around the world, characters, assets and the future experience.",
  },
  {
    key: "Growth",
    body: "Connected content, community and product through an integrated marketing communication and growth loop.",
  },
] as const;

export type Artifact = {
  src: string;
  w: number;
  h: number;
  caption: string;
  kind: string;
};

export const campaignWall: Artifact[] = [
  {
    src: "/metalabs/campaign/rx669-poster.webp",
    w: 561,
    h: 756,
    caption: "RX 669 — key art / campaign poster",
    kind: "Poster",
  },
  {
    src: "/metalabs/campaign/street-scene.webp",
    w: 681,
    h: 1211,
    caption: "In-world key visual",
    kind: "Key visual",
  },
  {
    src: "/metalabs/campaign/comic-panels.webp",
    w: 1200,
    h: 446,
    caption: "Serialised comic — lore delivered as content",
    kind: "Narrative",
  },
  {
    src: "/metalabs/campaign/storyboards.webp",
    w: 1200,
    h: 418,
    caption: "Panel storyboarding — shape and mood studies",
    kind: "Storyboard",
  },
];

/* ── Stage 04 ─────────────────────────────────────────── */

export const personaLed = [
  {
    who: "Collectors",
    body: "High-detail sculpting and premium visual fidelity.",
  },
  {
    who: "Casual Majority",
    body: "Readable silhouettes and mobile-legible environments.",
  },
  {
    who: "Web3 Players",
    body: "Ownership, rewards and utility embedded into the experience.",
  },
] as const;

export const visualDevelopment = [
  "Concept Art",
  "Environment Direction",
  "Mood Sketching",
  "Panel Storyboarding",
  "Character Development",
  "World Building",
] as const;

export const conceptGallery: Artifact[] = [
  {
    src: "/metalabs/concept/vault-interior.webp",
    w: 1200,
    h: 675,
    caption: "Vault interior — environment direction",
    kind: "Environment",
  },
  {
    src: "/metalabs/concept/lab.webp",
    w: 1200,
    h: 600,
    caption: "Laboratory — story environment",
    kind: "Environment",
  },
  {
    src: "/metalabs/concept/garage.webp",
    w: 1200,
    h: 711,
    caption: "Garage — colour and lighting study",
    kind: "Environment",
  },
  {
    src: "/metalabs/concept/street-exterior.webp",
    w: 1200,
    h: 675,
    caption: "Street exterior — world building",
    kind: "World",
  },
  {
    src: "/metalabs/concept/greybox.webp",
    w: 1000,
    h: 740,
    caption: "Greybox blockout — level geometry test",
    kind: "Alpha",
  },
];

/* ── Stage 05 ─────────────────────────────────────────── */

export type DocSpec = {
  id: string;
  /** the documentation category this artifact evidences */
  category: string;
  title: string;
  meta: string;
  pages: number;
  dir: string;
};

export const documents: DocSpec[] = [
  {
    id: "technical",
    category: "Technical Documentation",
    title: "Character NFT — Technical Description",
    meta: "Technical spec",
    pages: 2,
    dir: "/metalabs/docs/technical",
  },
  {
    id: "whitepaper",
    category: "Whitepapers",
    title: "Obverse Whitepaper",
    meta: "June 2022",
    pages: 18,
    dir: "/metalabs/docs/whitepaper",
  },
  {
    id: "economy",
    category: "Game Economy",
    title: "RX 669 S — Game XP & Economy",
    meta: "Game design doc · 1st draft",
    pages: 16,
    dir: "/metalabs/docs/economy",
  },
];

export const documentationTypes = [
  "PRDs",
  "Pitch Decks",
  "Game Design Documents",
  "Product Specifications",
  "Product Roadmaps",
] as const;

export const productLoop = [
  "Customer Feedback",
  "Product Decision",
  "Documentation",
  "Development",
  "Testing",
  "Feedback & Iteration",
] as const;

/* ── Stage 06 ─────────────────────────────────────────── */

export const pipeline = [
  "Excel",
  "Python",
  "SQL",
  "Blender",
  "Generation",
  "Validation",
  "Metadata",
  "Ship",
] as const;

export const collectionSteps = [
  "Sculpted Characters",
  "Trait Layering",
  "Rarity Distribution",
  "Metadata",
  "Validation",
  "Final Collection",
] as const;

export const collection: Artifact[] = [
  {
    src: "/metalabs/collection/rx-1.webp",
    w: 950,
    h: 950,
    caption: "RX_Series_1",
    kind: "Token 1",
  },
  {
    src: "/metalabs/collection/rx-2.webp",
    w: 950,
    h: 950,
    caption: "RX_Series_2",
    kind: "Token 2",
  },
  {
    src: "/metalabs/collection/rx-3.webp",
    w: 950,
    h: 950,
    caption: "RX_Series_3",
    kind: "Token 3",
  },
];
