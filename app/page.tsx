import { BackgroundFx } from "@/components/background-fx";
import { ScrollProgress } from "@/components/scroll-progress";
import { CursorDot } from "@/components/cursor-dot";
import { DraftingFrame } from "@/components/drafting-frame";
import { Hero } from "@/components/hero";
import { JourneyRoadmap } from "@/components/journey-roadmap";

export default function Home() {
  return (
    <>
      <BackgroundFx />
      <DraftingFrame />
      <ScrollProgress />
      <CursorDot />
      <main>
        <Hero />
        <JourneyRoadmap />
      </main>
    </>
  );
}
