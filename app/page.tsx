import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { MetaLabsSection } from "@/components/metalabs/section";
import { MbaSection } from "@/components/mba/section";
import { MavipSection } from "@/components/mavip/section";
import { IntellectSection } from "@/components/intellect/section";
import { EngineeringSection } from "@/components/engineering/section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <MetaLabsSection />
        <MbaSection />
        <MavipSection />
        <IntellectSection />
        <EngineeringSection />
      </main>
    </>
  );
}
