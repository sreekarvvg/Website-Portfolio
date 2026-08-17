import { source } from "./engineering-code";

/**
 * Engineering / AI Lab — milestone 01, carrying the spectrum's cyan hue.
 *
 * Slide 1 copy is my own, supplied verbatim. Slide 2 is evidence: every code
 * excerpt is reproduced unaltered from my Deep Research Agent repository, with
 * its real file path and line range, and every explanation describes only what
 * that code actually does.
 */

export const engMeta = {
  role: "B.Tech, Industrial Engineering",
  org: "VJTI, Mumbai",
  unit: "Engineering / AI Lab",
  period: "2018–2022",
  thesis: "Curiosity became a habit. Building became the way I learned.",
  paragraphs: [
    "I've always had the itch to understand new technology by actually trying it. During engineering, I built projects by teaching myself whatever the problem required — from Python, Data Science and Machine Learning to new tools and frameworks — while also earning relevant certifications and publishing a research paper on infrastructure management.",
    "When GenAI started emerging, I began experimenting with it early, building small AI tools and automations for both work and everyday problems. That eventually evolved from simple automations into building complete AI systems.",
    "Today, that curiosity has taken me from Python automations to AI copilots and multi-agent systems.",
  ],
} as const;

export const engSkills = [
  "Python",
  "SQL",
  "Data Science",
  "Machine Learning",
  "Automation",
  "Multi-Agent Systems",
  "Systems Thinking",
] as const;

export type EngProject = {
  id: string;
  index: string;
  name: string;
  status?: string;
  body: string;
};

export const engProjects: EngProject[] = [
  {
    id: "automation",
    index: "01",
    name: "AI & Automation",
    body: "Python and SQL code in Blender software to automate the NFT and metadata creation, and Python to automate the complete business process of the purchase cycle.",
  },
  {
    id: "rm-copilot",
    index: "02",
    name: "RM Copilot",
    body: "An AI assistant designed to help Relationship Managers in banks access information and work more efficiently.",
  },
  {
    id: "dra",
    index: "03",
    name: "Deep Research Agent",
    status: "Current",
    body: "A personal AI research engine that can take a research question, plan the investigation, search and collect information, derive insights, and generate a structured research report.",
  },
];

/** The multi-agent workflow, as designed. */
export const engAgents = [
  {
    name: "Scope Agent",
    body: "Understands the question, clarifies ambiguity and creates the research blueprint.",
  },
  {
    name: "Supervisor / Orchestrator",
    body: "Decides what needs to be researched and coordinates the workflow.",
  },
  {
    name: "Information Collectors",
    body: "Search and gather information from relevant sources.",
  },
  {
    name: "Insight Agent",
    body: "Synthesizes findings, identifies patterns and extracts meaningful insights.",
  },
  {
    name: "Writer Agent",
    body: "Turns the validated research into a structured report.",
  },
  {
    name: "Research Memory",
    body: "Stores useful research and sources for future investigations.",
  },
] as const;

export const engGoal =
  "The goal isn't just to generate an answer. It's to build a system that can research, reason, learn from previous research and produce reliable work.";

export type CodeProof = {
  id: string;
  index: string;
  /** Short nav label. */
  label: string;
  /** The product point the excerpt proves. */
  title: string;
  /** Real path inside the repository. */
  file: string;
  lines: string;
  /** What the code does, and why it was built that way. */
  body: string;
  code: string;
};

export const codeProofs: CodeProof[] = [
  {
    id: "blueprint",
    index: "01",
    label: "The plan is a typed artifact",
    title: "A research plan you can review before it spends anything",
    file: "state_scope.py",
    lines: "45–84",
    body: "Before any searching happens, the system emits a typed plan: outline sections with objectives and key points, research tasks split into concepts, frameworks, examples, case studies and statistics, plus constraints, assumptions and success criteria. Modelling the plan as a schema instead of free text is the product decision here — it makes the plan reviewable, comparable and versionable, and `approval_status` records that sign-off happens outside the graph. A run you can inspect before it starts is a different product from one that simply begins answering.",
    code: source.blueprint,
  },
  {
    id: "clarify",
    index: "02",
    label: "Ask once, never twice",
    title: "The model supplies judgement; the graph keeps control",
    file: "research_agent_scope.py",
    lines: "35–65",
    body: "The first node decides whether the request is answerable at all. A structured-output call returns `need_clarification`, and the routing is a deterministic `Command(goto=...)` — so the model contributes a judgement, never the control flow. The detail that matters is the branch above it: when the operation is an update and a blueprint already exists, clarification is skipped entirely, because that scope was already agreed. Coming back to revise a plan shouldn't feel like starting over.",
    code: source.clarify,
  },
  {
    id: "approval",
    index: "03",
    label: "A human gate, on purpose",
    title: "Three named actions instead of an open-ended prompt",
    file: "research_agent_scope.py",
    lines: "181–195",
    body: "The blueprint is rendered to markdown and handed back with three explicit choices — Approve, Update, Reject. This node makes no model call at all; it formats and stops. Putting the human decision on the critical path, with named actions rather than a free-text invitation, is what turns the plan into a contract instead of a suggestion — and it is what makes the earlier `update` path meaningful.",
    code: source.approval,
  },
  {
    id: "parallel",
    index: "04",
    label: "Parallel, with isolated context",
    title: "Two views of the same research: compressed to reason, raw to write",
    file: "multi_agent_supervisor.py",
    lines: "182–216",
    body: "Delegation fan-out. Each `ConductResearch` call becomes its own researcher invocation with its own message list and topic, and they all run under a single `asyncio.gather`. Every sub-agent returns compressed findings, which are wrapped back as `ToolMessage`s so the supervisor can retrieve them later, while the raw notes are aggregated separately for the report. Keeping one context window per topic — rather than one shared, ever-growing thread — is what keeps a long investigation coherent.",
    code: source.parallel,
  },
  {
    id: "guardrails",
    index: "05",
    label: "Bounded by design",
    title: "An unbounded loop is an unbounded bill",
    file: "multi_agent_supervisor.py",
    lines: "145–155",
    body: "Three exit conditions are checked before anything else runs: the iteration budget is exceeded, no tool calls were made, or the model has explicitly called `ResearchComplete`. With the ceilings set to six researcher iterations and three concurrent researchers, both the depth and the width of a run are capped. Agentic systems tend to fail commercially long before they fail technically, so the budget belongs in the graph rather than in a monitoring dashboard.",
    code: source.guardrails,
  },
  {
    id: "think",
    index: "06",
    label: "Reflection as a tool",
    title: "The docstring is the interface",
    file: "utils.py",
    lines: "213–238",
    body: "`think_tool` does nothing but record a reflection — its entire value is the contract written above the return statement. It specifies when to pause (after each search, before deciding next steps, before concluding) and what the reflection must address: findings, gaps, evidence quality, and the decision to continue or answer. Making the pause a callable tool means it lands in the trace, so the system's reasoning is auditable instead of implicit.",
    code: source.think,
  },
];

/** The models and services the system actually runs on. */
export const engStack = [
  { role: "Orchestration", value: "LangGraph · StateGraph" },
  { role: "Supervisor", value: "claude-sonnet-4-6" },
  { role: "Compression", value: "gpt-4.1" },
  { role: "Summarization", value: "gpt-4.1-mini" },
  { role: "Search", value: "Tavily" },
  { role: "Tools", value: "MCP · filesystem" },
] as const;

export const engStages = [
  { id: "overview", index: "01", label: "The Foundation" },
  { id: "agent", index: "02", label: "Deep Research Agent" },
];
