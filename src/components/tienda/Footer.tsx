"use client";

import { Logo } from "./Logo";
import { ShieldCheck, Truck, Headphones, CreditCard, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const GARANTIAS = [
  { icon: ShieldCheck, titulo: "Calzado certificado", texto: "Cumple norma EPI de seguridad" },
  { icon: Truck, titulo: "Envío a todo México", texto: "Gratis en pedidos +$200 USD" },
  { icon: Headphones, titulo: "Asesoría especializada", texto: "Te ayudamos a elegir la talla" },
  { icon: CreditCard, titulo: "Pago seguro", texto: "Confirmación antes de cobrar" },
];

const LINKS = {
  Catálogo: ["Línea Dama", "Línea Caballero", "Premium Vira Francesa", "Industrial", "Agrícola"],
  Empresa: ["Sobre New Holland", "Casos de éxito", "Tecnología de seguridad", "Distribuidores"],
  Ayuda: ["Guía de tallas", "Política de envíos", "Devoluciones", "Contacto"],
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
            <Logo variant="light" />
            <p className="mt-4 text-sm text-brand-foreground/70 max-w-sm leading-relaxed">
              Calzado de seguridad profesional con licencia oficial New Holland. Botinas y
              botas para dama y caballero, diseñadas para obra, industria, campo y uso
              ejecutivo. Catálogo 2026 con precios en USD para México.
            </p>
            <div className="mt-5 space-y-1.5 text-sm text-brand-foreground/80">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-accent" />
                ventas@newholland-safety.mx
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-accent" />
                +52 55 3721 1348
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-accent" />
                Ciudad de México, México
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
                      href="#catalogo"
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
              Nuevos modelos, ofertas corporativas y guías de seguridad en tu correo.
            </p>
          </div>
          <form
            className="flex w-full sm:w-auto gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="email"
              placeholder="tu@correo.com"
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
          <p>© 2026 New Holland Safety Footwear · Licencia oficial Spessoto · Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-brand-foreground transition-colors">Términos</a>
            <a href="#" className="hover:text-brand-foreground transition-colors">Privacidad</a>
            <a href="#" className="hover:text-brand-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
