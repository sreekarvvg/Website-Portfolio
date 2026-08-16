import { Atmosphere } from "@/components/atmosphere";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Cursor } from "@/components/cursor";
import { Curtain } from "@/components/curtain";
import { Hero } from "@/components/hero";
import { JourneyRail } from "@/components/journey-rail";

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
      </main>
    </>
  );
}
