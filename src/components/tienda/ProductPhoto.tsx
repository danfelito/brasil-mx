import { useId } from "react";
import { cn } from "@/lib/utils";
// Viewports isolate the original product photography from catalog captions.
// Coordinates use a 1000 × 2000 catalog page; no product pixels are retouched.
const crops: Record<string, string> = {
  "serdir-13": "50 1200 900 560",
  "bretao-2": "25 220 330 215",
  "bretao-4": "50 1320 380 230",
  "bretao-5": "25 1250 470 350",
  "bretao-6": "35 1260 480 315",
  "bretao-7": "65 210 330 230",
  "bretao-8": "50 210 380 240",
};
export function ProductPhoto({ src, alt, className, loading = "lazy" }: { src: string; alt: string; className?: string; loading?: "lazy" | "eager" }) {
  const clipId = useId();
  const match = src.match(/catalog=(serdir|bretao)&page=(\d+)/);
  if (!match) return <img src={src} alt={alt} loading={loading} className={cn("h-full w-full object-contain bg-white", className)} />;
  const viewport = crops[`${match[1]}-${Number(match[2])}`] || "50 1080 900 680";
  const [x, y, width, height] = viewport.split(" ").map(Number);
  return <div className={cn("h-full w-full bg-white p-5 flex items-center justify-center", className)}><svg role="img" aria-label={alt} viewBox={viewport} preserveAspectRatio="xMidYMid meet" className="h-full w-full overflow-hidden"><defs><clipPath id={clipId}><rect x={x} y={y} width={width} height={height} /></clipPath></defs><image href={src} width="1000" height="2000" clipPath={`url(#${clipId})`} /></svg></div>;
}
