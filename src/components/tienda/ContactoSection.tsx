"use client";

import { motion } from "framer-motion";
import { Building2, Mail, MapPin, MessageCircle } from "lucide-react";
import { CONTACTO, EMAIL_URL, WHATSAPP_URL } from "@/lib/contacto";

export function ContactoSection() {
  return (
    <section id="contacto" className="py-16 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden rounded-3xl border border-brand/15 bg-card shadow-xl shadow-brand/5"
        >
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative overflow-hidden bg-brand p-8 text-brand-foreground sm:p-10">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-amber-accent/15 blur-3xl" />
              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-foreground/10 px-3 py-1 text-xs font-semibold">
                  <Building2 className="h-3.5 w-3.5 text-amber-accent" />
                  Atención a empresas
                </div>
                <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Hablemos de las necesidades de tu equipo
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-brand-foreground/80 sm:text-base">
                  Te ayudamos a seleccionar modelos, tallas y cantidades para industria, obra,
                  campo, almacén y uso ejecutivo. Atendemos pedidos B2B en todo México.
                </p>
              </div>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-10">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-border bg-background p-5 transition hover:border-[#25D366]/50 hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366]/12">
                  <MessageCircle className="h-5 w-5 text-[#168C45]" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">WhatsApp comercial</h3>
                <p className="mt-1 text-sm text-muted-foreground">{CONTACTO.telefono}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-brand group-hover:underline">
                  Iniciar conversación
                </span>
              </a>

              <a
                href={EMAIL_URL}
                className="group rounded-2xl border border-border bg-background p-5 transition hover:border-brand/40 hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light">
                  <Mail className="h-5 w-5 text-brand" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">Correo electrónico</h3>
                <p className="mt-1 break-all text-sm text-muted-foreground">{CONTACTO.correo}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-brand group-hover:underline">
                  Enviar correo
                </span>
              </a>

              <div className="rounded-2xl border border-border bg-muted/25 p-5 sm:col-span-2">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-accent" />
                  <div>
                    <h3 className="font-display font-bold text-foreground">Ubicación comercial</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{CONTACTO.ubicacion}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      Atención y cotizaciones por WhatsApp o correo. Envíos sujetos a destino,
                      volumen y disponibilidad confirmados en cada propuesta.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
