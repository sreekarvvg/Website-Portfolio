import { Atmosphere } from "@/components/atmosphere";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Cursor } from "@/components/cursor";
import { Curtain } from "@/components/curtain";
import { Hero } from "@/components/hero";
import { JourneyRail } from "@/components/journey-rail";
import { MetaLabsSection } from "@/components/metalabs/section";
import { MbaSection } from "@/components/mba/section";
import { MavipSection } from "@/components/mavip/section";
import { IntellectSection } from "@/components/intellect/section";
import { EngineeringSection } from "@/components/engineering/section";

export default function Home() {
  return (
    <>
      <Atmosphere />
      <SmoothScroll />
      <Cursor />
      <Curtain />
      <main>
        <Hero />
        <JourneyRail />
        <MetaLabsSection />
        <MbaSection />
        <MavipSection />
        <IntellectSection />
        {/* Engineering closes the journey rather than opening it — the
            foundation reads best once you know what it led to. */}
        <EngineeringSection />
      </main>
    </>
  );
}
