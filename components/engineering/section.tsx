"use client";

import { engStages } from "@/lib/engineering";
import { StageDeck } from "@/components/artifacts/stage-deck";
import { StageOverview } from "./stage-overview";
import { StageAgent } from "./stage-agent";

export function EngineeringSection() {
  return (
    <StageDeck
      id="engineering"
      eyebrow="Engineering / AI Lab @ VJTI"
      accent="var(--s1)"
      stages={engStages}
      panels={(goTo) => [
        <StageOverview key="overview" onExplore={() => goTo(1)} />,
        <StageAgent key="agent" />,
      ]}
    />
  );
}
