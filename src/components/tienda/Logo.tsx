import { cn } from "@/lib/utils";

export function Logo({ className, variant = "dark" }: { className?: string; variant?: "dark" | "light" }) {
  const text = variant === "light" ? "#fff" : "var(--brand)";
  const sub = variant === "light" ? "rgba(255,255,255,0.7)" : "var(--muted-foreground)";
  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      <LogoMark className="h-9 w-9 shrink-0" />
      <div className="leading-none">
        <div
          className="font-display font-extrabold tracking-tight text-[1.15rem] sm:text-[1.3rem]"
          style={{ color: text, letterSpacing: "0.01em" }}
        >
          NEW HOLLAND
        </div>
        <div
          className="text-[0.62rem] sm:text-[0.66rem] font-semibold uppercase tracking-[0.22em]"
          style={{ color: sub }}
        >
          Safety Footwear
        </div>
      </div>
    </div>
  );
}

export function LogoMark({ className }: { className?: string }) {
  // Emblema estilo hoja/flama en azul NH con acento ámbar
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="nh-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.45 0.17 258)" />
          <stop offset="100%" stopColor="oklch(0.34 0.14 258)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="11" fill="url(#nh-grad)" />
      {/* hoja estilizada */}
      <path
        d="M24 10c6 4 9 9 9 15 0 5-3.5 9-9 13-5.5-4-9-8-9-13 0-6 3-11 9-15z"
        fill="#fff"
        opacity="0.95"
      />
      <path
        d="M24 13c0 8 0 14 0 22"
        stroke="oklch(0.34 0.14 258)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="24" cy="40" r="2.4" fill="oklch(0.78 0.16 75)" />
    </svg>
  );
}
