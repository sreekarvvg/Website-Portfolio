"use client";

import { stages } from "@/lib/metalabs";
import { StageDeck } from "@/components/artifacts/stage-deck";
import { StageProduct } from "./stage-product";
import { StageUnderstand } from "./stage-understand";
import { StageDemand } from "./stage-demand";
import { StageDesign } from "./stage-design";
import { StageBuild } from "./stage-build";
import { StageShip } from "./stage-ship";

export function MetaLabsSection() {
  return (
    <StageDeck
      id="metalabs"
      eyebrow="Product Manager @ Meta Labs"
      accent="var(--s2)"
      stages={[...stages]}
      panels={(goTo) => [
        <StageProduct key="p" onExplore={() => goTo(1)} />,
        <StageUnderstand key="u" />,
        <StageDemand key="d" />,
        <StageDesign key="g" />,
        <StageBuild key="b" />,
        <StageShip key="s" onRestart={() => goTo(0)} />,
      ]}
    />
  );
}
