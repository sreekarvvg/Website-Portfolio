"use client";

import { stages } from "@/lib/metalabs";
import { StageDeck } from "@/components/artifacts/stage-deck";
import { Film } from "./film";
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
      eyebrow="Product Manager · Metalabs Technology"
      accent="var(--s2)"
      stages={[...stages]}
      exploreLabel="Explore the journey"
      exploreNote="6 stages — research, design, build, launch"
      backdrop={(stage) => <Film visible={stage === 0} />}
      panels={(goTo) => [
        <StageProduct key="p" />,
        <StageUnderstand key="u" />,
        <StageDemand key="d" />,
        <StageDesign key="g" />,
        <StageBuild key="b" />,
        <StageShip key="s" onRestart={() => goTo(0)} />,
      ]}
    />
  );
}
