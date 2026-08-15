import { BackgroundFx } from "@/components/background-fx";
import { ScrollProgress } from "@/components/scroll-progress";
import { Hero } from "@/components/hero";
import { JourneyRoadmap } from "@/components/journey-roadmap";

export default function Home() {
  return (
    <>
      <BackgroundFx />
      <ScrollProgress />
      <main>
        <Hero />
        <JourneyRoadmap />
      </main>
    </>
  );
}
