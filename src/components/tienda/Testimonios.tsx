"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronDown, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Caso = {
  empresa: string;
  sector: string;
  responsable: string;
  cargo: string;
  iniciales: string;
  color: string;
  modelos: string;
  pares: number;
  rating: number;
  resumen: string;
  cita: string;
};

const CASOS: Caso[] = [
  {
    empresa: "Constructora Atlas",
    sector: "Construcción civil",
    responsable: "Roberto Mendoza",
    cargo: "Jefe de Seguridad e Higiene",
    iniciales: "CA",
    color: "#0B3D91",
    modelos: "Cascavel · Floater Caballero",
    pares: 480,
    rating: 5,
    resumen:
      "Equipamos a 480 obreros con la bota Cascavel. Reducción del 35% en incidentes de pie en obra.",
    cita: "La Cascavel con puntera de acero aguantó el ritmo de obra durante 14 meses sin fallar. El equipo de ventas nos ayudó a elegir la talla correcta para cada trabajador. Invertir en New Holland fue invertir en seguridad real.",
  },
  {
    empresa: "Agroindustrias del Valle",
    sector: "Sector agrícola",
    responsable: "Laura Fernández",
    cargo: "Gerente de Recursos Humanos",
    iniciales: "AV",
    color: "#2E7D32",
    modelos: "Casaleone · Vira Francesa Dama",
    pares: 210,
    rating: 5,
    resumen:
      "La línea agrícola Casaleone dio flexibilidad y agarre en campo. Las mujeres valoraron la línea dama.",
    cita: "Necesitábamos calzado que aguantara barro, humedad y jornadas largas en el campo. La Casaleone con suela de látex cosida fue perfecta. Y por fin encontramos botinas de dama de verdad, no tallas pequeñas de hombre.",
  },
  {
    empresa: "Logística Express MX",
    sector: "Almacén y logística",
    responsable: "Carlos Ramírez",
    cargo: "Director de Operaciones",
    iniciales: "LE",
    color: "#C2410C",
    modelos: "Nobuck Dama · Crazy Dama",
    pares: 150,
    rating: 4,
    resumen:
      "Suela antideslizante PU en pasillos de almacén. Cero resbalones en 8 meses.",
    cita: "En almacén, el suelo se mancha de aceites constantemente. La suela PU antideslizante de los modelos Nobuck y Crazy eliminó los resbalones. El comfort para jornadas de 8 horas de pie fue el bonus que no esperábamos.",
  },
  {
    empresa: "Talleres Industriales Nova",
    sector: "Manufactura metalmecánica",
    responsable: "Patricia Moreno",
    cargo: "Coordinadora de EPP",
    iniciales: "TN",
    color: "#6B21A8",
    modelos: "Cascavel · Premium Vira Francesa",
    pares: 95,
    rating: 5,
    resumen:
      "Aislamiento eléctrico y puntera de acero para metalmecánica. Cumplimiento total de norma EPI.",
    cita: "En metalmecánica tenemos riesgo eléctrico y de impacto. La Cascavel con aislamiento eléctrico y puntera de acero cubrió ambos. La auditoría de seguridad pasó sin una sola observación en calzado. New Holland entendió nuestra operación.",
  },
];

export function Testimonios() {
  const [abierto, setAbierto] = useState<number | null>(0);

  return (
    <section id="empresa" className="py-16 sm:py-24 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-accent/15 px-3 py-1 text-xs font-semibold text-amber-accent mb-3">
            <Star className="h-3.5 w-3.5 fill-amber-accent" />
            Casos de éxito
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-tight">
            Empresas que confían en New Holland
          </h2>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg">
            Más de 935 pares entregados a equipos de trabajo en obra, campo, industria y
            logística. Toca una tarjeta para leer la experiencia completa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
          {CASOS.map((c, i) => {
            const open = abierto === i;
            return (
              <div
                key={c.empresa}
                className={cn(
                  "rounded-2xl border bg-card overflow-hidden transition-all duration-300",
                  open ? "border-brand/40 shadow-xl shadow-brand/10" : "border-border hover:border-brand/30 hover:shadow-md"
                )}
              >
                <button
                  onClick={() => setAbierto(open ? null : i)}
                  className="w-full text-left p-5 flex items-start gap-4"
                >
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center font-display font-extrabold text-white shrink-0"
                    style={{ backgroundColor: c.color }}
                  >
                    {c.iniciales}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                      <h3 className="font-display font-bold text-lg text-foreground leading-tight">
                        {c.empresa}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{c.sector}</p>
                    <p className="text-sm text-foreground/80 mt-2">{c.resumen}</p>
                    <div className="flex items-center gap-3 mt-3 text-[0.7rem]">
                      <span className="flex items-center gap-0.5 text-amber-accent font-semibold">
                        {Array.from({ length: 5 }).map((_, k) => (
                          <Star
                            key={k}
                            className={cn("h-3 w-3", k < c.rating ? "fill-amber-accent" : "fill-muted-foreground/30 text-muted-foreground/30")}
                          />
                        ))}
                      </span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground font-medium">{c.pares} pares</span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground font-medium truncate">{c.modelos}</span>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300",
                      open && "rotate-180 text-brand"
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0">
                        <div className="relative rounded-xl bg-brand-light/50 border border-brand/10 p-5 pl-14">
                          {/* Comilla animada */}
                          <motion.div
                            initial={{ scale: 0, rotate: -20, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                            className="absolute top-3 left-4"
                          >
                            <Quote className="h-8 w-8 text-brand/40 fill-brand/20" />
                          </motion.div>
                          <p className="text-sm text-foreground/90 italic leading-relaxed">
                            “{c.cita}”
                          </p>
                          <div className="mt-3 pt-3 border-t border-brand/10">
                            <p className="font-semibold text-sm text-foreground">{c.responsable}</p>
                            <p className="text-xs text-muted-foreground">{c.cargo}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
