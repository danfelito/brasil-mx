"use client";

import { SpessotoLogo, NewHollandLogo } from "./Logo";
import { Building2, FileText, Headphones, Mail, MapPin, MessageCircle, Truck } from "lucide-react";
import { CONTACTO, EMAIL_URL, WHATSAPP_URL } from "@/lib/contacto";

const GARANTIAS = [
  { icon: Building2, titulo: "Atención B2B", texto: "Cotizaciones según volumen" },
  { icon: Truck, titulo: "Envíos nacionales", texto: "Costo y plazo en cada propuesta" },
  { icon: Headphones, titulo: "Asesoría especializada", texto: "Modelo adecuado para cada uso" },
  { icon: FileText, titulo: "Facturación empresarial", texto: "Cotización y datos claros en MXN" },
];

const LINKS = [
  { titulo: "Catálogo", items: [{ label: "Todos los modelos", href: "#catalogo" }, { label: "Por uso de trabajo", href: "#usos" }, { label: "Guía de tallas", href: "#guia-tallas" }] },
  { titulo: "Información", items: [{ label: "Tecnología de seguridad", href: "#seguridad" }, { label: "Políticas comerciales", href: "#politicas" }, { label: "Contacto", href: "#contacto" }] },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-brand text-brand-foreground">
      <div className="border-b border-brand-foreground/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 lg:grid-cols-4">
          {GARANTIAS.map((item) => (
            <div key={item.titulo} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-accent/20"><item.icon className="h-5 w-5 text-amber-accent" /></div>
              <div><div className="text-sm font-semibold leading-tight">{item.titulo}</div><div className="text-[0.7rem] leading-tight text-brand-foreground/70">{item.texto}</div></div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-3"><SpessotoLogo variant="light" /><NewHollandLogo variant="light" className="opacity-90" /></div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-foreground/70">Brasil MX distribuye calzado de trabajo Spessoto y la línea con licencia New Holland para empresas en México. Atención por volumen para industria, obra, campo y almacén.</p>
          </div>
          {LINKS.map((grupo) => (
            <div key={grupo.titulo}>
              <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-amber-accent">{grupo.titulo}</h4>
              <ul className="space-y-2">{grupo.items.map((item) => <li key={item.label}><a href={item.href} className="text-sm text-brand-foreground/70 transition hover:text-brand-foreground hover:underline">{item.label}</a></li>)}</ul>
            </div>
          ))}
          <div>
            <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-amber-accent">Contacto</h4>
            <div className="space-y-3 text-sm text-brand-foreground/80">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-brand-foreground"><MessageCircle className="h-4 w-4 text-amber-accent" />{CONTACTO.telefono}</a>
              <a href={EMAIL_URL} className="flex items-start gap-2 break-all hover:text-brand-foreground"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-accent" />{CONTACTO.correo}</a>
              <div className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-accent" /><span>{CONTACTO.ubicacion}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-brand-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-brand-foreground/60 sm:flex-row">
          <p>© 2026 Brasil MX · Distribución B2B de calzado de trabajo en México.</p>
          <div className="flex items-center gap-4"><a href="#politicas" className="hover:text-brand-foreground">Términos y privacidad</a><a href="#contacto" className="hover:text-brand-foreground">Contacto</a></div>
        </div>
      </div>
    </footer>
  );
}
