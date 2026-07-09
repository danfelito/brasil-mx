"use client";

import { motion } from "framer-motion";
import { Ruler, Footprints } from "lucide-react";

const TABLA = [
  { mx: 34, eu: 35, us: 4, cm: 22.0 },
  { mx: 35, eu: 36, us: 5, cm: 22.7 },
  { mx: 36, eu: 37, us: 6, cm: 23.3 },
  { mx: 37, eu: 38, us: 7, cm: 24.0 },
  { mx: 38, eu: 39, us: 7.5, cm: 24.7 },
  { mx: 39, eu: 40, us: 8, cm: 25.3 },
  { mx: 40, eu: 41, us: 9, cm: 26.0 },
  { mx: 41, eu: 42, us: 9.5, cm: 26.7 },
  { mx: 42, eu: 43, us: 10, cm: 27.3 },
  { mx: 43, eu: 44, us: 11, cm: 28.0 },
  { mx: 44, eu: 45, us: 12, cm: 28.7 },
  { mx: 45, eu: 46, us: 13, cm: 29.3 },
  { mx: 46, eu: 47, us: 14, cm: 30.0 },
  { mx: 47, eu: 48, us: 15, cm: 30.7 },
];

export function GuiaTallas() {
  return (
    <section id="guia-tallas" className="py-14 sm:py-20 bg-muted/30 scroll-mt-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-light text-brand px-3 py-1 text-xs font-semibold mb-3">
            <Ruler className="h-3.5 w-3.5" />
            Guía de tallas
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight">
            Encuentra tu talla perfecta
          </h2>
          <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
            Mide tu pie de talón a la punta del dedo más largo y compara con la tabla. Si
            estás entre dos tallas, te recomendamos la mayor para usar con calcetín de trabajo.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm"
        >
          <div className="grid grid-cols-4 bg-brand text-brand-foreground text-xs sm:text-sm font-bold uppercase tracking-wide">
            <div className="p-3 text-center">México</div>
            <div className="p-3 text-center">EU</div>
            <div className="p-3 text-center">USA</div>
            <div className="p-3 text-center">CM (largo pie)</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 divide-border">
            {TABLA.map((t, i) => (
              <div
                key={t.mx}
                className={`grid grid-cols-4 text-sm ${
                  i % 2 === 0 ? "bg-background" : "bg-muted/20"
                }`}
              >
                <div className="p-2.5 text-center font-bold text-brand">{t.mx}</div>
                <div className="p-2.5 text-center text-foreground/80">{t.eu}</div>
                <div className="p-2.5 text-center text-foreground/80">{t.us}</div>
                <div className="p-2.5 text-center text-muted-foreground">{t.cm.toFixed(1)}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-5 flex items-start gap-2 text-xs text-muted-foreground max-w-2xl mx-auto">
          <Footprints className="h-4 w-4 text-brand mt-0.5 shrink-0" />
          <p>
            Las botinas New Holland tienen horma amplia para mayor confort durante jornadas
            largas. La línea dama (NHF) usa horma estrecha; la línea caballero (ENH) usa horma
            estándar. Para uso con calcetín grueso, considera medio número más.
          </p>
        </div>
      </div>
    </section>
  );
}
