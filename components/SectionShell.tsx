import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  children,
  className,
  titleClassName
}: SectionShellProps) {
  return (
    <section id={id} className={cn("border-t-[4px] border-ink px-4 py-16 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          {eyebrow ? (
            <p className="w-fit border-[3px] border-ink bg-pink px-3 py-2 font-mono text-xs uppercase shadow-brutal-sm">
              {eyebrow}
            </p>
          ) : (
            <span />
          )}
          <h2
            className={cn(
              "font-display text-[clamp(2.5rem,8vw,7.5rem)] uppercase leading-[0.88] tracking-normal",
              titleClassName
            )}
          >
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
