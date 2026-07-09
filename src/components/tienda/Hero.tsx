"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Star, Truck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -8, y: px * 10 });
  };
  const onLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 nh-grid-bg opacity-60" />
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-amber-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-light/60 px-3 py-1 text-xs font-semibold text-brand mb-5">
              <Award className="h-3.5 w-3.5" />
              Licencia oficial New Holland · Catálogo 2026
            </div>

            <h1 className="font-display font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-foreground">
              Calzado de seguridad
              <span className="block text-brand">que protege lo que más vale</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Botinas y botas profesionales para dama y caballero, con puntera de acero,
              suela antideslizante y tecnología de protección certificada. Diseñadas para
              obra, industria, campo y uso ejecutivo.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90 font-semibold text-base h-12 px-7">
                <a href="#catalogo">
                  Ver catálogo
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base h-12 px-7 border-brand/30 text-brand hover:bg-brand-light/60">
                <a href="#seguridad">Tecnología de seguridad</a>
              </Button>
            </div>

            {/* Indicadores */}
            <div className="mt-9 grid grid-cols-3 gap-4 max-w-md">
              <Stat icon={<ShieldCheck className="h-5 w-5" />} valor="22" etiqueta="Modelos 2026" />
              <Stat icon={<Star className="h-5 w-5" />} valor="4.7★" etiqueta="Valoración media" />
              <Stat icon={<Truck className="h-5 w-5" />} valor="+200" etiqueta="Envío gratis USD" />
            </div>
          </motion.div>

          {/* Imagen con parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            <div
              ref={ref}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl shadow-brand/20 ring-1 ring-brand/10 [perspective:1000px]"
            >
              <motion.div
                animate={{ rotateX: tilt.x, rotateY: tilt.y }}
                transition={{ type: "spring", stiffness: 150, damping: 18 }}
                className="absolute inset-0 [transform-style:preserve-3d]"
              >
                <img
                  src="/products/hero-boots.png"
                  alt="Botas de seguridad New Holland premium en cuero café sobre superficie industrial"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand/40 via-transparent to-transparent" />
              </motion.div>

              {/* Sello flotante */}
              <motion.div
                animate={{ rotateX: tilt.x, rotateY: tilt.y }}
                transition={{ type: "spring", stiffness: 150, damping: 18 }}
                className="absolute bottom-4 left-4 rounded-2xl bg-background/95 backdrop-blur px-4 py-3 shadow-lg ring-1 ring-border [transform:translateZ(40px)]"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-accent/20 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-amber-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground leading-tight">Puntera de acero</div>
                    <div className="text-[0.7rem] text-muted-foreground">Protección 200 J · Norma EPI</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Tarjeta de precio flotante */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-5 right-2 sm:right-6 rounded-2xl bg-brand text-brand-foreground px-4 py-3 shadow-xl"
            >
              <div className="text-[0.65rem] uppercase tracking-wider opacity-80">Desde</div>
              <div className="font-display font-extrabold text-2xl leading-none">$24<span className="text-base font-bold"> USD</span></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, valor, etiqueta }: { icon: React.ReactNode; valor: string; etiqueta: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-brand">{icon}</div>
      <div className="font-display font-bold text-xl text-foreground leading-none">{valor}</div>
      <div className="text-[0.7rem] text-muted-foreground leading-tight">{etiqueta}</div>
    </div>
  );
}
