export type Milestone = {
  id: string;
  index: string;
  /** The role — led with, because what I did matters before where I did it. */
  role: string;
  /** The organisation, as supporting context. */
  org: string;
  /** Kept for compact contexts; equals the org. */
  title: string;
  period: string;
  /** One line on what was done and the value created. */
  impact: string;
  /** Two-word essence, used in the spectrum rail and section transitions. */
  essence: string;
  description: string;
  skills: string[];
  /** CSS custom-property name carrying this milestone's spectrum hue. */
  hueVar: string;
  hue: string;
};

export const milestones: Milestone[] = [
  {
    id: "engineering",
    index: "01",
    role: "B.Tech, Industrial Engineering",
    org: "VJTI, Mumbai",
    title: "Engineering",
    period: "2018–2022",
    impact:
      "Built the technical foundation — systems thinking, Python and data — that everything since has been built on. 8.35 GPA.",
    essence: "The Foundation",
    description:
      "Built my foundation in technology through AI projects, experimentation and hands-on problem solving. This is where my curiosity for understanding systems began.",
    skills: ["AI", "Python", "Data", "Problem Solving", "Technical Thinking"],
    hueVar: "--s1",
    hue: "#45c8f0",
  },
  {
    id: "metalabs",
    index: "02",
    role: "Product Manager",
    org: "Meta Labs Technology",
    title: "Metalabs Technology",
    period: "2022–2024",
    impact:
      "Owned product from concept to MVP across 3 apps — scaled the team 4→15, lifted development efficiency 80%, and grew the community to 10.5K followers in 4 weeks.",
    essence: "Zero to One",
    description:
      "Built a product from 0→1 and worked across product, users, design, development, marketing, growth and automation. I learned to own problems end-to-end and turn ideas into working products.",
    skills: ["Product", "0→1", "Growth", "UX", "Research", "Automation", "GTM"],
    hueVar: "--s2",
    hue: "#3ddcae",
  },
  {
    id: "mba",
    index: "03",
    role: "MBA, Marketing",
    org: "IMT Ghaziabad",
    title: "MBA",
    period: "2024–2026",
    impact:
      "Turned business theory into structured problem solving through case competitions, strategy and international exposure. 82.1%.",
    essence: "The Wider Lens",
    description:
      "Expanded my perspective from building products to understanding the business problems behind them — sharpened through case competitions, strategy and structured problem solving.",
    skills: [
      "Strategy",
      "Business",
      "Analytics",
      "Problem Solving",
      "Communication",
    ],
    hueVar: "--s3",
    hue: "#f5c451",
  },
  {
    id: "mavip",
    index: "04",
    role: "Strategy & Product Management Intern",
    org: "MAVIP Group",
    title: "MAVIP",
    period: "2025–2026",
    impact:
      "Led quotnt from strategy to launch-ready MVP in 6 months, and directed 5 large-scale tech events across 20+ stakeholders and >$100K of budget.",
    essence: "Applied Thinking",
    description:
      "Applied my product and business thinking in a new environment, working across research, product, GTM, UX and execution during my MBA.",
    skills: ["Product", "Research", "GTM", "UX", "Stakeholders", "Execution"],
    hueVar: "--s4",
    hue: "#fb8f4a",
  },
  {
    id: "intellect",
    index: "05",
    role: "AI Commercialization & Strategy",
    org: "Intellect Design Arena",
    title: "Intellect",
    period: "2026–Present",
    impact:
      "Designed the commercial architecture for an enterprise AI platform — the 4-model USHO framework and its pricing calculators — supporting opportunities beyond USD 10M.",
    essence: "AI at Scale",
    description:
      "Working at the intersection of AI, enterprise products and commercialization — figuring out how powerful AI systems become viable products and businesses.",
    skills: [
      "AI",
      "Product Strategy",
      "Commercialization",
      "Pricing",
      "Enterprise",
      "BFSI",
    ],
    hueVar: "--s5",
    hue: "#fb6f8d",
  },
];
