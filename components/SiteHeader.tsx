import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navItems, site } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b-[4px] border-ink bg-cream/95 backdrop-blur">
      <nav className="mx-auto flex max-w-[1800px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="#top"
          className="border-[3px] border-ink bg-blue px-3 py-2 font-display text-sm uppercase text-cream shadow-brutal-sm transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-coral"
        >
          {site.name}
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-[3px] border-ink bg-cream px-3 py-2 font-mono text-xs uppercase transition hover:bg-orange focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-pink"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href="#contact"
          className="inline-flex items-center gap-2 border-[3px] border-ink bg-pink px-3 py-2 font-display text-sm uppercase text-ink shadow-brutal-sm transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-blue"
        >
          Start
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
