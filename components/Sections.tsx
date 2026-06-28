import { ArrowRight, Check } from "lucide-react";
import { BrowserWindow } from "@/components/BrowserWindow";
import { ButtonLink } from "@/components/ButtonLink";
import { ContactForm } from "@/components/ContactForm";
import { ProjectGrid } from "@/components/ProjectGrid";
import { SectionShell } from "@/components/SectionShell";
import { Sticker } from "@/components/Stickers";
import { processSteps, projects, services } from "@/data/site";
import { cn } from "@/lib/utils";

export function WorkSection() {
  return (
    <SectionShell
      id="work"
      eyebrow="Work"
      title="SELECTED WORK. UNUSUALLY BEHAVED."
      className="bg-blue"
      titleClassName="text-cream"
    >
      <ProjectGrid projects={projects} />
    </SectionShell>
  );
}

export function ServicesSection() {
  return (
    <SectionShell id="services" eyebrow="Services" title="STRANGE THINGS. PROPERLY BUILT." className="bg-cream">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <article key={service.title} className="grid min-h-64 gap-8 border-[4px] border-ink bg-cream p-5 shadow-brutal-sm">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-4xl uppercase leading-none">{service.title}</h3>
                <span className={cn("grid size-14 shrink-0 place-items-center border-[3px] border-ink shadow-brutal-sm", service.accent)}>
                  <Icon size={30} aria-hidden="true" />
                </span>
              </div>
              <p className="self-end text-lg font-bold leading-snug">{service.summary}</p>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}

export function ProcessSection() {
  return (
    <SectionShell id="process" eyebrow="Process" title="THERE IS A METHOD TO IT." className="bg-orange">
      <div className="grid gap-4 lg:grid-cols-6">
        {processSteps.map((step, index) => (
          <article
            key={step}
            className="relative min-h-52 border-[4px] border-ink bg-cream p-4 shadow-brutal-sm lg:[&:nth-child(even)]:translate-y-8"
          >
            <p className="mb-8 grid size-12 place-items-center border-[3px] border-ink bg-pink font-display text-2xl shadow-brutal-sm">
              {index + 1}
            </p>
            <h3 className="font-display text-3xl uppercase leading-none">{step}</h3>
            <Check className="absolute bottom-4 right-4" size={34} strokeWidth={3} aria-hidden="true" />
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export function AboutSection() {
  return (
    <SectionShell
      id="about"
      eyebrow="About"
      title="THE PERSON RESPONSIBLE."
      className="bg-blue"
      titleClassName="text-cream"
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative min-h-[420px] overflow-hidden border-[4px] border-ink bg-mint shadow-brutal">
          <Sticker type="spark" className="absolute left-6 top-6 w-28 rotate-[-12deg]" />
          <Sticker type="cursor" className="absolute bottom-6 right-8 w-28 rotate-12" />
          <Sticker type="cube" className="absolute right-10 top-24 w-32 rotate-6" />
          <div className="absolute bottom-0 left-1/2 h-[78%] w-[58%] -translate-x-1/2 border-x-[5px] border-t-[5px] border-ink bg-cream">
            <div className="mx-auto mt-10 aspect-square w-[62%] rounded-full border-[5px] border-ink bg-orange" />
            <div className="mx-auto mt-8 h-16 w-[74%] border-[5px] border-ink bg-pink" />
            <div className="mx-auto mt-4 grid w-[70%] grid-cols-3 gap-2">
              <span className="h-8 border-[4px] border-ink bg-blue" />
              <span className="h-8 border-[4px] border-ink bg-coral" />
              <span className="h-8 border-[4px] border-ink bg-mauve" />
            </div>
          </div>
        </div>
        <BrowserWindow title="about-zac.md" barClassName="bg-orange text-ink">
          <div className="grid gap-5 p-5">
            <p className="text-2xl font-black leading-tight sm:text-3xl">
              I&apos;m Zac, a Perth-based developer working where engineering, visual design and business strategy meet.
              My computer science background keeps the work disciplined. My interest in experimental interaction keeps it
              from becoming another respectable arrangement of rectangles.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {["Engineering", "Visual design", "Business strategy"].map((item) => (
                <span key={item} className="border-[3px] border-ink bg-cream px-3 py-3 font-mono text-xs uppercase shadow-brutal-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </BrowserWindow>
      </div>
    </SectionShell>
  );
}

export function ContactSection() {
  return (
    <SectionShell id="contact" eyebrow="Contact" title="LET'S MAKE SOMETHING STRANGELY EFFECTIVE." className="bg-mint">
      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div className="grid gap-5">
          <div className="border-[4px] border-ink bg-cream p-5 shadow-brutal">
            <p className="text-2xl font-black leading-tight">
              Bring the goal, the constraints and the thing that feels a bit too odd to say out loud yet.
            </p>
          </div>
          <ButtonLink href="mailto:hello@zacdagostino.com" icon={<ArrowRight size={20} aria-hidden="true" />} variant="paper">
            hello@zacdagostino.com
          </ButtonLink>
          <Sticker type="orbit" className="ml-auto w-32 rotate-12" />
        </div>
        <ContactForm />
      </div>
    </SectionShell>
  );
}
