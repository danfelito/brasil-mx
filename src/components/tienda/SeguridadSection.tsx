"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Footprints, Zap, Layers, Droplets, Hammer } from "lucide-react";

const TECNOLOGIAS = [
  {
    icon: ShieldCheck,
    titulo: "Puntera de acero",
    descripcion: "Protección contra impacto de 200 J y compresión de 15 000 N. Cumple norma EPI para riesgo mecánico.",
    modelos: "Cascavel (ENH 2201)",
  },
  {
    icon: Layers,
    titulo: "Suela PU doble densidad",
    descripcion: "Suela inyectada de poliuretano de doble densidad: capa interna suave para confort, capa externa resistente a abrasión.",
    modelos: "Cascavel, Floater Caballero, Napa Ejecutiva",
  },
  {
    icon: Footprints,
    titulo: "Caucho natural vulcanizado",
    descripcion: "Construcción Vira Francesa con vulcanización del cabedal y la suela de caucho natural. Máxima durabilidad y resistencia.",
    modelos: "Premium Vira Francesa, Vira Francesa Dama",
  },
  {
    icon: Droplets,
    titulo: "Resistente a aceites y grasas",
    descripcion: "Suelas formuladas para soportar contacto con aceites, grasas e hidrocarburos sin degradarse.",
    modelos: "Toda la línea industrial",
  },
  {
    icon: Zap,
    titulo: "Aislamiento eléctrico",
    descripcion: "Materiales no conductores que aíslan el pie de contactos eléctricos accidentales en entornos energizados.",
    modelos: "Cascavel (ENH 2201)",
  },
  {
    icon: Hammer,
    titulo: "Suela de látex cosida",
    descripcion: "Construcción agrícola con suela de látex cosida manualmente. Flexibilidad y agarre en terrenos rurales.",
    modelos: "Casaleone (ENH 1012 / 2513P)",
  },
];

export function SeguridadSection() {
  return (
    <section id="seguridad" className="relative py-16 sm:py-24 bg-brand text-brand-foreground overflow-hidden scroll-mt-16">
      {/* Patrón decorativo */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #fff 0, #fff 1px, transparent 1px, transparent 24px)",
        }}
      />
      <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-amber-accent/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-amber-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-accent/20 px-3 py-1 text-xs font-semibold text-amber-accent mb-4">
            <ShieldCheck className="h-3.5 w-3.5" />
            Tecnología de protección
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Diseñados para proteger en cada entorno
          </h2>
          <p className="mt-4 text-brand-foreground/80 text-base sm:text-lg">
            Cada modelo New Holland combina materiales premium con tecnologías de seguridad
            certificadas. Estas son las características más relevantes que encontrarás en
            nuestro catálogo 2026.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECNOLOGIAS.map((t, i) => (
            <motion.div
              key={t.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group rounded-2xl bg-brand-foreground/5 backdrop-blur border border-brand-foreground/10 p-5 hover:bg-brand-foreground/10 transition-colors"
            >
              <div className="h-12 w-12 rounded-xl bg-amber-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <t.icon className="h-6 w-6 text-amber-accent" />
              </div>
              <h3 className="font-display font-bold text-lg mb-1.5">{t.titulo}</h3>
              <p className="text-sm text-brand-foreground/75 leading-relaxed mb-3">{t.descripcion}</p>
              <div className="text-[0.7rem] font-semibold text-amber-accent uppercase tracking-wide">
                {t.modelos}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
