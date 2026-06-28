import { Hero } from "@/components/Hero";
import { SiteHeader } from "@/components/SiteHeader";
import { AboutSection, ContactSection, ProcessSection } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ProcessSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}
