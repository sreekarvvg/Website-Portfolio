export type Milestone = {
  id: string;
  index: string;
  title: string;
  period: string;
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
    title: "Engineering",
    period: "2018–2022",
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
    title: "Metalabs Technology",
    period: "2022–2024",
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
    title: "MBA",
    period: "2024–2026",
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
    title: "MAVIP",
    period: "2025–2026",
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
    title: "Intellect",
    period: "2026–Present",
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
