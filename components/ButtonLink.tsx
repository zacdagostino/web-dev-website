import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  variant?: "solid" | "paper";
  className?: string;
};

export function ButtonLink({ href, children, icon, variant = "solid", className }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-3 border-[3px] border-ink px-5 py-3 font-display text-sm uppercase tracking-normal shadow-brutal-sm transition duration-150 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0_#212026] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-blue active:translate-x-1 active:translate-y-1 active:shadow-none",
        variant === "solid" ? "bg-pink text-ink" : "bg-cream text-ink",
        className
      )}
    >
      <span>{children}</span>
      {icon ? <span aria-hidden="true">{icon}</span> : null}
    </Link>
  );
}
