"use client";

import { chapters, intellectStages } from "@/lib/intellect";
import { StageDeck } from "@/components/artifacts/stage-deck";
import { StageIntro } from "./stage-intro";
import { StageChapter } from "./stage-chapter";

export function IntellectSection() {
  return (
    <StageDeck
      id="intellect"
      eyebrow="AI Commercialization @ Intellect"
      accent="var(--s5)"
      stages={intellectStages}
      panels={(goTo) => [
        <StageIntro key="intro" onExplore={() => goTo(1)} />,
        ...chapters.map((c) => <StageChapter key={c.id} chapter={c} />),
      ]}
    />
  );
}
