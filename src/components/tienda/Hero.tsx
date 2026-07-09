"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Building2, Factory, Truck, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpessotoMark, NewHollandMark } from "./Logo";

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
              <Building2 className="h-3.5 w-3.5" />
              Ventas B2B para empresas en México · Brasil MX
            </div>

            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center gap-2">
                <SpessotoMark className="h-8 w-8" />
                <div className="leading-tight">
                  <div className="font-display font-extrabold text-lg text-foreground">SPESSOTO</div>
                  <div className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Desde 1915
                  </div>
                </div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex items-center gap-2">
                <NewHollandMark className="h-7 w-7" />
                <div className="leading-tight">
                  <div className="font-display font-extrabold text-sm text-[#003f87]">NEW HOLLAND</div>
                  <div className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Safety Footwear
                  </div>
                </div>
              </div>
            </div>

            <h1 className="font-display font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-foreground">
              Calzado de seguridad
              <span className="block text-brand">para la industria mexicana</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Distribución B2B de calzado de seguridad certificado. Línea premium{" "}
              <span className="font-semibold text-foreground">Spessoto</span> y la línea con licencia{" "}
              <span className="font-semibold text-foreground">New Holland</span>: botinas y botas para
              dama y caballero, con puntera de acero, suela antideslizante y tecnología de protección.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90 font-semibold text-base h-12 px-7">
                <a href="#catalogo">
                  Ver catálogo
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base h-12 px-7 border-brand/30 text-brand hover:bg-brand-light/60">
                <a href="#politicas">Políticas de compra</a>
              </Button>
            </div>

            {/* Indicadores B2B */}
            <div className="mt-9 grid grid-cols-3 gap-4 max-w-md">
              <Stat icon={<ShieldCheck className="h-5 w-5" />} valor="25+" etiqueta="Modelos 2026" />
              <Stat icon={<Factory className="h-5 w-5" />} valor="B2B" etiqueta="Empresas y obra" />
              <Stat icon={<Truck className="h-5 w-5" />} valor="MX" etiqueta="Envío a todo México" />
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 text-brand" />
              <span>Cotizaciones:</span>
              <a href="tel:2294648962" className="font-semibold text-brand hover:underline">229 464 8962</a>
              <span>·</span>
              <a href="mailto:ventas@brasilmx.mx" className="font-semibold text-brand hover:underline">ventas@brasilmx.mx</a>
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
                  src="/products/hero-b2b-team.png"
                  alt="Equipo de trabajo industrial en México usando calzado de seguridad Spessoto y New Holland"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand/50 via-transparent to-transparent" />
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
                    <div className="text-sm font-bold text-foreground leading-tight">Calzado certificado EPI</div>
                    <div className="text-[0.7rem] text-muted-foreground">Puntera de acero · Antideslizante</div>
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
