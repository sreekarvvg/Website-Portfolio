import { Atmosphere } from "@/components/atmosphere";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Cursor } from "@/components/cursor";
import { Curtain } from "@/components/curtain";
import { Hero } from "@/components/hero";
import { JourneyRail } from "@/components/journey-rail";
import { MetaLabsSection } from "@/components/metalabs/section";
import { MbaSection } from "@/components/mba/section";
import { MavipSection } from "@/components/mavip/section";

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
      </main>
    </>
  );
}
