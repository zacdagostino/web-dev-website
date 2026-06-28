import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BrowserWindowProps = {
  title: string;
  children: ReactNode;
  className?: string;
  barClassName?: string;
};

export function BrowserWindow({ title, children, className, barClassName }: BrowserWindowProps) {
  return (
    <div className={cn("overflow-hidden border-[4px] border-ink bg-cream shadow-brutal", className)}>
      <div
        className={cn(
          "flex min-h-10 items-center gap-2 border-b-[4px] border-ink bg-blue px-3 font-mono text-xs uppercase text-cream",
          barClassName
        )}
      >
        <span className="size-3 rounded-full border-2 border-ink bg-pink" aria-hidden="true" />
        <span className="size-3 rounded-full border-2 border-ink bg-coral" aria-hidden="true" />
        <span className="size-3 rounded-full border-2 border-ink bg-orange" aria-hidden="true" />
        <span className="ml-2 truncate">{title}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}
