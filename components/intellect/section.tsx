"use client";

import { chapters, intellectStages } from "@/lib/intellect";
import { StageDeck } from "@/components/artifacts/stage-deck";
import { StageIntro } from "./stage-intro";
import { StageChapter } from "./stage-chapter";

export function IntellectSection() {
  return (
    <StageDeck
      id="intellect"
      eyebrow="AI Product · Strategy & Commercialization @ Intellect"
      accent="var(--s5)"
      stages={intellectStages}
      exploreLabel="Read the deck explained"
      exploreNote="3 chapters — the thinking behind the deck"
      panels={() => [
        <StageIntro key="intro" />,
        ...chapters.map((c) => <StageChapter key={c.id} chapter={c} />),
      ]}
    />
  );
}
