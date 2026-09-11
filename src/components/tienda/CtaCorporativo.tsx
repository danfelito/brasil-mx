"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, MessageCircle, Users } from "lucide-react";
import { EMAIL_URL, WHATSAPP_URL } from "@/lib/contacto";

export function CtaCorporativo() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-brand p-8 text-brand-foreground sm:p-12"
        >
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-amber-accent/15 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-accent/20 px-3 py-1 text-xs font-semibold text-amber-accent">
                <Users className="h-3.5 w-3.5" /> Cotización corporativa
              </div>
              <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                Calzado adecuado para cada puesto de trabajo
              </h2>
              <p className="mt-3 max-w-lg text-base text-brand-foreground/80 sm:text-lg">
                Cuéntanos cuántas personas necesitas equipar y en qué entorno trabajan. Te ayudamos
                a comparar modelos, tallas y condiciones para tu pedido B2B.
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {["Selección por tipo de uso", "Organización de tallas y cantidades", "Cotización en MXN y facturación empresarial"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-accent" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 font-bold text-[#073B20] shadow-xl transition hover:bg-[#3DDF78]">
                <MessageCircle className="h-5 w-5" /> Cotizar por WhatsApp <ArrowRight className="h-4 w-4" />
              </a>
              <a href={EMAIL_URL} className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-brand-foreground/20 bg-brand-foreground/10 px-6 font-semibold text-brand-foreground transition hover:bg-brand-foreground/15">
                <Mail className="h-5 w-5" /> Solicitar por correo
              </a>
              <p className="text-center text-xs text-brand-foreground/65 sm:col-span-2 lg:col-span-1">Atención personalizada · Sin compromiso de compra</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
