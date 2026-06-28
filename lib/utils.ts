export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function getAccentClasses(accent: string) {
  const map: Record<string, string> = {
    pink: "bg-pink",
    blue: "bg-blue",
    orange: "bg-orange",
    mint: "bg-mint",
    coral: "bg-coral",
    mauve: "bg-mauve"
  };

  return map[accent] ?? "bg-orange";
}
