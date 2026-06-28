import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  LifeBuoy,
  MonitorSmartphone,
  Orbit,
  RefreshCw,
  ShoppingBag
} from "lucide-react";

export type Project = {
  title: string;
  category: string;
  status: "Real" | "Concept";
  problem: string;
  weird: string;
  work: string;
  result: string;
  accent: "pink" | "blue" | "orange" | "mint" | "coral" | "mauve";
};

export type Service = {
  title: string;
  summary: string;
  icon: LucideIcon;
  accent: string;
};

export const site = {
  name: "Zac Dagostino",
  role: "Web Developer & Interactive Designer",
  location: "Perth, Australia",
  message: "MAKE IT WEIRD. MAKE IT WORK.",
  description:
    "Distinctive websites, ecommerce experiences and digital products with personality above the surface and serious engineering underneath.",
  url: "https://zacdagostino.com"
};

export const projects: Project[] = [
  {
    title: "Inside Cats",
    category: "Ecommerce",
    status: "Concept",
    problem: "A pet retail experience needs to feel warm and specific without slowing down the path to purchase.",
    weird: "A bright shelf system, sticker-like product moments and tiny behavioural surprises around browsing.",
    work: "Product taxonomy, fast collection pages, clear cart states and a checkout flow designed for repeat orders.",
    result: "An ecommerce concept shaped around discovery first, then a low-friction buying path.",
    accent: "pink"
  },
  {
    title: "Ember & Salt",
    category: "Restaurant concept",
    status: "Concept",
    problem: "Restaurant sites often look polished but bury menus, bookings and venue personality.",
    weird: "Charcoal block layouts, stamped menu fragments and punchy motion inspired by open-flame cooking.",
    work: "Menu hierarchy, booking calls-to-action, location details and accessible mobile-first reading.",
    result: "A hospitality concept that makes the venue memorable while keeping booking decisions obvious.",
    accent: "coral"
  },
  {
    title: "Lumen Psychology",
    category: "Professional-services concept",
    status: "Concept",
    problem: "A clinical service has to feel calm and credible without becoming anonymous.",
    weird: "Soft editorial pacing, clear visual anchors and carefully restrained interactive details.",
    work: "Service pathways, practitioner trust signals, responsive content structure and accessible forms.",
    result: "A professional-services concept that balances reassurance with a distinct point of view.",
    accent: "mint"
  },
  {
    title: "Axis Operations",
    category: "Dashboard concept",
    status: "Concept",
    problem: "Operational software can become visually dense before users know what matters.",
    weird: "Chunky status modules, animated state changes and a deliberately tactile control language.",
    work: "Scan-friendly data hierarchy, keyboardable controls, predictable states and resilient layouts.",
    result: "A dashboard concept built for repeated use, quick comparison and fewer mystery interactions.",
    accent: "blue"
  }
];

export const services: Service[] = [
  {
    title: "Business websites",
    summary: "Sharp positioning, robust page systems and CMS-ready content structures.",
    icon: MonitorSmartphone,
    accent: "bg-pink"
  },
  {
    title: "Ecommerce",
    summary: "Product discovery, conversion paths, carts and storefronts with a bit of bite.",
    icon: ShoppingBag,
    accent: "bg-orange"
  },
  {
    title: "Interactive WebGL experiences",
    summary: "Playful scenes and product moments tuned for real devices, not just demo machines.",
    icon: Orbit,
    accent: "bg-mint"
  },
  {
    title: "Custom web applications",
    summary: "Dashboards, workflow tools and bespoke interfaces with maintainable architecture.",
    icon: Boxes,
    accent: "bg-blue"
  },
  {
    title: "Website redesigns",
    summary: "Better hierarchy, sharper behaviour and a more useful system underneath the look.",
    icon: RefreshCw,
    accent: "bg-coral"
  },
  {
    title: "Ongoing support",
    summary: "Practical improvements, performance care, content support and sensible iteration.",
    icon: LifeBuoy,
    accent: "bg-mauve"
  }
];

export const processSteps = [
  "Find the point",
  "Define the personality",
  "Design the behaviour",
  "Build the system",
  "Test everything",
  "Release responsibly"
] as const;

export const projectTypes = [
  "Business website",
  "Ecommerce",
  "Interactive experience",
  "Custom web application",
  "Website redesign",
  "Ongoing support"
] as const;

export const budgetRanges = [
  "Under $5k",
  "$5k-$10k",
  "$10k-$20k",
  "$20k+",
  "Still figuring it out"
] as const;

export const navItems = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" }
] as const;
