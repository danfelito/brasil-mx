import { cn } from "@/lib/utils";
type LogoProps = { className?: string; variant?: "dark" | "light" };
export function SpessotoLogo({ className }: LogoProps) {
  return <img src="/brand/spessoto.png" alt="Spessoto — Artesanalmente produzidas desde 1915" width={2048} height={719} className={cn("w-40 sm:w-44 h-auto rounded-md shrink-0", className)} />;
}
export function NewHollandLogo({ className, variant = "dark" }: LogoProps) {
  return <span className={cn("font-display font-extrabold text-sm tracking-wide whitespace-nowrap", variant === "light" ? "text-white" : "text-[#003f87]", className)}>NEW HOLLAND</span>;
}
export function Logo({ className, variant = "dark" }: LogoProps) {
  return <div className={cn("flex items-center gap-3", className)}><SpessotoLogo /><span className={cn("hidden sm:block h-8 w-px", variant === "light" ? "bg-white/20" : "bg-border")} /><NewHollandLogo className="hidden sm:block" variant={variant} /></div>;
}
