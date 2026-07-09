"use client";

import { SpessotoLogo, NewHollandLogo } from "./Logo";
import { ShieldCheck, Truck, Headphones, CreditCard, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const GARANTIAS = [
  { icon: ShieldCheck, titulo: "Calzado certificado EPI", texto: "Cumple norma de seguridad laboral" },
  { icon: Truck, titulo: "Envío a todo México", texto: "Gratis en pedidos B2B +$200 USD" },
  { icon: Headphones, titulo: "Asesoría B2B especializada", texto: "Selección de modelo por riesgo" },
  { icon: CreditCard, titulo: "Facturación empresarial", texto: "CFDI 4.0 · Crédito a 15/30/45 días" },
];

const LINKS = {
  Catálogo: ["Línea Spessoto Premium", "Línea New Holland", "Botinas Dama", "Botinas Caballero", "Por uso de trabajo"],
  Empresa: ["Sobre Brasil MX", "Marcas Spessoto y New Holland", "Casos de éxito", "Tecnología de seguridad"],
  Ayuda: ["Guía de tallas", "Políticas de compra", "Cotización B2B", "Contacto"],
};

export function Footer() {
  return (
    <footer className="mt-auto bg-brand text-brand-foreground">
      {/* Barra de garantías */}
      <div className="border-b border-brand-foreground/10">
        <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {GARANTIAS.map((g) => (
            <div key={g.titulo} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-accent/20 flex items-center justify-center shrink-0">
                <g.icon className="h-5 w-5 text-amber-accent" />
              </div>
              <div>
                <div className="text-sm font-semibold leading-tight">{g.titulo}</div>
                <div className="text-[0.7rem] text-brand-foreground/70 leading-tight">{g.texto}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            {/* Marca principal: Spessoto + New Holland secundario */}
            <div className="flex flex-col gap-3">
              <SpessotoLogo variant="light" />
              <NewHollandLogo variant="light" className="opacity-90" />
            </div>
            <p className="mt-4 text-sm text-brand-foreground/70 max-w-sm leading-relaxed">
              Brasil MX — distribuidor B2B en México de calzado de seguridad certificado. Representamos
              la marca Spessoto (tradición desde 1915) y la línea con licencia New Holland. Botinas y
              botas para dama y caballero, para obra, industria, campo y uso ejecutivo. Catálogo 2026
              con precios en USD para el mercado mexicano.
            </p>
            <div className="mt-5 space-y-1.5 text-sm text-brand-foreground/80">
              <a href="tel:2294648962" className="flex items-center gap-2 hover:text-brand-foreground transition-colors">
                <Phone className="h-4 w-4 text-amber-accent" />
                229 464 8962
              </a>
              <a href="mailto:ventas@brasilmx.mx" className="flex items-center gap-2 hover:text-brand-foreground transition-colors">
                <Mail className="h-4 w-4 text-amber-accent" />
                ventas@brasilmx.mx
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-accent" />
                México · Atendemos a todo el país
              </div>
            </div>
          </div>

          {Object.entries(LINKS).map(([cat, items]) => (
            <div key={cat}>
              <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-3 text-amber-accent">
                {cat}
              </h4>
              <ul className="space-y-2">
                {items.map((l) => (
                  <li key={l}>
                    <a
                      href={cat === "Ayuda" && l === "Políticas de compra" ? "#politicas" : "#catalogo"}
                      className="text-sm text-brand-foreground/70 hover:text-brand-foreground hover:underline transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-10 rounded-2xl bg-brand-foreground/5 border border-brand-foreground/10 p-5 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <h4 className="font-display font-bold text-lg">Recibe novedades del catálogo</h4>
            <p className="text-sm text-brand-foreground/70">
              Nuevos modelos Spessoto y New Holland, ofertas B2B y guías de seguridad en tu correo.
            </p>
          </div>
          <form
            className="flex w-full sm:w-auto gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="email"
              placeholder="tu@empresa.com"
              className="bg-brand-foreground/10 border-brand-foreground/20 text-brand-foreground placeholder:text-brand-foreground/50 w-full sm:w-56"
            />
            <Button type="submit" className="bg-amber-accent text-amber-foreground hover:bg-amber-accent/90 font-semibold">
              Suscribir
            </Button>
          </form>
        </div>
      </div>

      {/* Pie legal */}
      <div className="border-t border-brand-foreground/10">
        <div className="mx-auto max-w-7xl px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-foreground/60">
          <p>© 2026 Brasil MX · Distribuidor B2B en México · Marcas Spessoto (desde 1915) y New Holland. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#politicas" className="hover:text-brand-foreground transition-colors">Términos</a>
            <a href="#politicas" className="hover:text-brand-foreground transition-colors">Privacidad</a>
            <a href="#politicas" className="hover:text-brand-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
