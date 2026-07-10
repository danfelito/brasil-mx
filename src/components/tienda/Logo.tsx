import { cn } from "@/lib/utils";

// ===== SPESSOTO — marca principal (distribuida en México por Brasil MX) =====
export function SpessotoLogo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const text = variant === "light" ? "#fff" : "var(--brand)";
  const sub = variant === "light" ? "rgba(255,255,255,0.75)" : "var(--muted-foreground)";
  const accent = "var(--amber-accent)";
  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      <SpessotoMark className="h-9 w-9 shrink-0" />
      <div className="leading-none">
        <div
          className="font-display font-extrabold tracking-tight text-[1.2rem] sm:text-[1.4rem]"
          style={{ color: text, letterSpacing: "0.02em" }}
        >
          SPESSOTO
        </div>
        <div
          className="text-[0.58rem] sm:text-[0.62rem] font-semibold uppercase tracking-[0.22em] flex items-center gap-1"
          style={{ color: sub }}
        >
          <span style={{ color: accent }}>●</span> Desde 1915 · Brasil MX
        </div>
      </div>
    </div>
  );
}

export function SpessotoMark({ className }: { className?: string }) {
  // Monograma "S" estilizado en azul Spessoto con acento ámbar
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="sp-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.45 0.17 258)" />
          <stop offset="100%" stopColor="oklch(0.32 0.13 258)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="11" fill="url(#sp-grad)" />
      {/* "S" estilizada */}
      <path
        d="M32 17c-1.6-2.4-4.3-3.6-7.6-3.6-3.9 0-6.8 2-6.8 5 0 2.6 2 3.9 5.4 4.6l2.6.5c3.2.6 6.4 1.9 6.4 5.7 0 3.6-3.2 6-7.7 6-3.8 0-6.7-1.5-8.3-4"
        fill="none"
        stroke="#fff"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="40" r="2.2" fill="oklch(0.78 0.16 75)" />
    </svg>
  );
}

// ===== NEW HOLLAND — línea con licencia (logo secundario) =====
export function NewHollandLogo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const text = variant === "light" ? "#fff" : "#0047AB";
  const sub = variant === "light" ? "rgba(255,255,255,0.7)" : "var(--muted-foreground)";
  return (
    <div className={cn("flex items-center gap-2 select-none", className)}>
      <NewHollandMark className="h-8 w-8 shrink-0" />
      <div className="leading-none">
        <div
          className="font-display font-extrabold tracking-tight text-[0.95rem] sm:text-[1.05rem]"
          style={{ color: text, letterSpacing: "0.01em" }}
        >
          NEW HOLLAND
        </div>
        <div
          className="text-[0.55rem] sm:text-[0.6rem] font-semibold uppercase tracking-[0.2em]"
          style={{ color: sub }}
        >
          Safety Footwear
        </div>
      </div>
    </div>
  );
}

export function NewHollandMark({ className }: { className?: string }) {
  // Emblema azul New Holland con hoja estilizada y acento ámbar
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="nh-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a5fb4" />
          <stop offset="100%" stopColor="#003f87" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="10" fill="url(#nh-grad)" />
      {/* hoja estilizada */}
      <path
        d="M24 10c6 4 9 9 9 15 0 5-3.5 9-9 13-5.5-4-9-8-9-13 0-6 3-11 9-15z"
        fill="#fff"
        opacity="0.95"
      />
      <path
        d="M24 13c0 8 0 14 0 22"
        stroke="#003f87"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="24" cy="40" r="2.4" fill="#f5a623" />
    </svg>
  );
}

// ===== Logo compuesto: Spessoto (principal) + New Holland (secundario) =====
export function Logo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  return (
    <div className={cn("flex items-center gap-3 select-none", className)}>
      <SpessotoLogo variant={variant} />
      <div
        className={cn(
          "hidden sm:block h-8 w-px",
          variant === "light" ? "bg-white/20" : "bg-border"
        )}
      />
      <NewHollandLogo
        className={cn("hidden sm:flex", variant === "light" && "[&_div]:text-white")}
        variant={variant}
      />
    </div>
  );
}
