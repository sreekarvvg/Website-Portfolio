import type { ArtifactDoc } from "./artifacts";

/**
 * Intellect — milestone 05, carrying the spectrum's rose hue.
 *
 * Copy is drawn from the CV and from the deck on the `Intellect` branch
 * ("A Commercial Architecture for Scaling Purple Fabric"); nothing here is
 * invented. Slide references below are 1-indexed against that deck.
 */

export const intellectMeta = {
  period: "2026 — Present",
  role: "AI Product · Strategy & Commercialization",
  unit: "CCO Office",
  org: "Intellect",
  myRole:
    "I work with Product, Sales, Pre-Sales, Delivery and senior leadership to shape enterprise AI and BFSI opportunities — from customer requirements and product propositions through to pricing, ROI models and commercialization frameworks.",
  problem:
    "Enterprise AI was evolving faster than the way it was priced and packaged — making it hard to turn AI capability into clear customer value, ROI and a commercial proposition.",
  solution:
    "A structured commercialization approach built on the USHO framework — AI economics, pricing, licensing and value realization in one repeatable model — plus 4 license calculators that make complex AI costing fast and consistent.",
} as const;

export const intellectMetrics = [
  { value: "$10M+", label: "Enterprise opportunities supported" },
  { value: "Multiple", label: "RFPs, proposals & enterprise opportunities" },
] as const;

export const intellectSkills = [
  "AI Product Strategy",
  "Commercialization",
  "Pricing & Monetization",
  "ROI Modelling",
  "RFP Strategy",
  "Enterprise Solutions",
  "Stakeholder Management",
] as const;

/** The four models of the framework, as defined on deck slide 4. */
export const usho = [
  {
    letter: "U",
    name: "Usage",
    blurb: "Flexible, variable consumption",
    detail:
      "Priced per workflow execution — for defined, repeatable AI tasks where volume fluctuates.",
  },
  {
    letter: "S",
    name: "Subscription",
    blurb: "Predictable, recurring enterprise access",
    detail:
      "Priced per user or workspace — for enterprise-wide assistants and continuous knowledge access.",
  },
  {
    letter: "H",
    name: "Hybrid",
    blurb: "Platform-scale deployment",
    detail:
      "Predictable platform capacity plus variable execution — for teams building and scaling Digital Experts.",
  },
  {
    letter: "O",
    name: "Outcome",
    blurb: "Measurable business value",
    detail:
      "Priced against a pre-agreed business result — for critical workflows where outcomes can be attributed.",
  },
] as const;

/** The complete deck, offered as the supporting artifact. */
export const intellectDeck: ArtifactDoc = {
  id: "purple-fabric",
  org: "Purple Fabric",
  title: "Pricing AI for Enterprise Value",
  meta: "A commercial architecture framework · 25 slides",
  pages: 25,
  dir: "/intellect/deck",
};

export type EvidenceSlide = { page: number; caption: string };

export type IntellectChapter = {
  id: string;
  index: string;
  label: string;
  title: string;
  standfirst: string;
  points: { head: string; body: string }[];
  evidence: EvidenceSlide[];
};

/**
 * Three chapters that explain the thinking; the deck pages sit alongside as
 * proof rather than as the explanation itself.
 */
export const chapters: IntellectChapter[] = [
  {
    id: "problem",
    index: "02",
    label: "The Problem",
    title: "Enterprise AI outgrew the software pricing model",
    standfirst:
      "Traditional software pricing assumes near-zero marginal cost and value that arrives on deployment. Enterprise AI breaks both assumptions — so the commercial model had to be rebuilt before anything could be sold at scale.",
    points: [
      {
        head: "AI costs are variable",
        body: "Every interaction, workflow and agent execution carries an operating cost behind it. Usage can scale faster than budgets.",
      },
      {
        head: "Value is not automatic",
        body: "Deployment alone does not create business value, and buyers increasingly demand measurable impact before they commit.",
      },
      {
        head: "The dilemma",
        body: "Price too rigidly and adoption stalls on unpredictable cost. Price too generically and value is created but never captured, compressing margin.",
      },
    ],
    evidence: [
      { page: 2, caption: "Three market shifts that broke the old model" },
      { page: 3, caption: "Customer friction vs. value leakage" },
    ],
  },
  {
    id: "framework",
    index: "03",
    label: "The Framework",
    title: "One platform, multiple value pools",
    standfirst:
      "Purple Fabric is not one product with one buying motion — it creates value across different layers of the AI stack. USHO matches the commercial model to the value pool rather than to the underlying AI consumption.",
    points: [
      {
        head: "Price the value pool",
        body: "What the customer is building, what they are accessing, and what business value is delivered each call for a different commercial shape.",
      },
      {
        head: "Two build paths",
        body: "Platform build maps to Hybrid; a delivered use case maps to Subscription for knowledge access, or Usage / Outcome for custom task workloads.",
      },
      {
        head: "A decision, not a menu",
        body: "The model follows from buying motion × value pool × consumption pattern × risk allocation — with guardrails such as compute floors and minimum commitments.",
      },
    ],
    evidence: [
      { page: 4, caption: "The USHO framework — four commercial models" },
      { page: 5, caption: "One platform mapped to its value pools" },
      { page: 24, caption: "The decision logic that selects a model" },
    ],
  },
  {
    id: "operable",
    index: "04",
    label: "Making It Operable",
    title: "Thirteen cost drivers behind five business inputs",
    standfirst:
      "A framework only matters if a commercial team can quote from it. The calculators push the technical economics into the backend and leave the manager five business-level questions — turning a complex AI workload into a budgetary estimate.",
    points: [
      {
        head: "Five inputs, not thirteen",
        body: "Deployment model, task complexity, documents processed, OCR volume and storage. LLM inference, retrieval, orchestration, APIs and infrastructure stay underneath.",
      },
      {
        head: "Three audiences, one engine",
        body: "The AI engineer sees the full backend and can adjust assumptions; the commercial manager sees five variables; the customer sees an annual licence fee.",
      },
      {
        head: "Proven on a live opportunity",
        body: "Bioworld — automated artwork verification against reference images — carried end to end from use case to cost per workflow to annual licence economics.",
      },
    ],
    evidence: [
      { page: 10, caption: "Five inputs turn a workload into an estimate" },
      { page: 9, caption: "Inside the annual licence calculator" },
      { page: 13, caption: "Bioworld — workflow cost to annual economics" },
    ],
  },
];

export const intellectStages = [
  { id: "intro", index: "01", label: "The Role" },
  ...chapters.map((c) => ({ id: c.id, index: c.index, label: c.label })),
];
