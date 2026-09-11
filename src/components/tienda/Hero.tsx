"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Building2, Factory, Truck, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpessotoLogo, NewHollandLogo } from "./Logo";
import { EMAIL_URL, WHATSAPP_URL } from "@/lib/contacto";

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

            <div className="flex flex-wrap items-center gap-4 mb-5"><SpessotoLogo /><NewHollandLogo /></div>

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

            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
              <span className="mr-1 text-muted-foreground">Cotizaciones:</span>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-[#168C45] px-3 py-2 font-semibold text-white hover:bg-[#12753A]">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a href={EMAIL_URL} className="inline-flex items-center gap-1.5 rounded-lg border border-brand/25 px-3 py-2 font-semibold text-brand hover:bg-brand-light">
                <Mail className="h-4 w-4" /> Email
              </a>
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
              className="relative aspect-[7/4] rounded-3xl overflow-hidden shadow-2xl shadow-brand/20 ring-1 ring-brand/10 [perspective:1000px]"
            >
              <motion.div
                animate={{ rotateX: tilt.x, rotateY: tilt.y }}
                transition={{ type: "spring", stiffness: 150, damping: 18 }}
                className="absolute inset-0 [transform-style:preserve-3d]"
              >
                <img
                  src="/products/hero-b2b-models.webp"
                  alt="Modelos usando botas de trabajo Spessoto y New Holland en un almacén"
                  className="h-full w-full object-cover"
                  loading="eager"
                />

              </motion.div>

            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-brand/10 bg-white p-4">
              <div className="flex items-center gap-3"><ShieldCheck className="h-6 w-6 shrink-0 text-brand" /><div><p className="text-sm font-bold">Calzado certificado EPI</p><p className="text-xs text-muted-foreground">Protección para tu jornada de trabajo</p></div></div>
              <div className="text-brand"><span className="block text-xs text-muted-foreground">Desde · FOB</span><span className="font-display text-2xl font-extrabold">$421 <span className="text-sm">MXN</span></span></div>
            </div>
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
