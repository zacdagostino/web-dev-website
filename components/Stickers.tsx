import { cn } from "@/lib/utils";

type StickerProps = {
  type: "spark" | "cursor" | "cube" | "bolt" | "orbit";
  className?: string;
};

export function Sticker({ type, className }: StickerProps) {
  return (
    <svg
      className={cn("pointer-events-none block", className)}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {type === "spark" ? (
        <>
          <path
            d="M58 8L68 44L108 34L78 61L106 91L68 78L55 113L47 76L10 88L38 60L13 28L49 43L58 8Z"
            fill="#FB803D"
            stroke="#212026"
            strokeWidth="7"
            strokeLinejoin="round"
          />
          <path d="M56 43L63 61L48 72" stroke="#212026" strokeWidth="6" strokeLinecap="round" />
        </>
      ) : null}
      {type === "cursor" ? (
        <>
          <path
            d="M25 11L95 69L62 75L48 108L25 11Z"
            fill="#FDE8CD"
            stroke="#212026"
            strokeWidth="7"
            strokeLinejoin="round"
          />
          <path d="M63 75L83 103" stroke="#212026" strokeWidth="7" strokeLinecap="round" />
          <path d="M42 44L72 67" stroke="#FC98BB" strokeWidth="7" strokeLinecap="round" />
        </>
      ) : null}
      {type === "cube" ? (
        <>
          <path d="M24 42L60 20L96 42V82L60 103L24 82V42Z" fill="#3D6EBA" stroke="#212026" strokeWidth="7" />
          <path d="M24 42L60 63L96 42M60 63V103" stroke="#212026" strokeWidth="7" strokeLinejoin="round" />
          <path d="M45 34L81 55" stroke="#FDE8CD" strokeWidth="7" strokeLinecap="round" />
        </>
      ) : null}
      {type === "bolt" ? (
        <path
          d="M69 8L22 67H54L44 112L99 47H66L69 8Z"
          fill="#D2E1D9"
          stroke="#212026"
          strokeWidth="7"
          strokeLinejoin="round"
        />
      ) : null}
      {type === "orbit" ? (
        <>
          <circle cx="60" cy="60" r="22" fill="#F47781" stroke="#212026" strokeWidth="7" />
          <path
            d="M13 77C24 101 60 104 88 82C115 60 114 28 88 20C62 12 24 35 13 77Z"
            stroke="#212026"
            strokeWidth="7"
          />
          <circle cx="93" cy="32" r="10" fill="#5D5C7E" stroke="#212026" strokeWidth="6" />
        </>
      ) : null}
    </svg>
  );
}
