"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X, ShieldCheck } from "lucide-react";
import { Logo } from "./Logo";
import { useCarrito, totalItems } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Catálogo", href: "#catalogo" },
  { label: "Por uso", href: "#usos" },
  { label: "Seguridad", href: "#seguridad" },
  { label: "Empresa", href: "#empresa" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const items = useCarrito((s) => s.items);
  const abrirCarrito = useCarrito((s) => s.abrir);
  const count = totalItems(items);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Barra de anuncio */}
      <div className="bg-brand text-brand-foreground text-[0.7rem] sm:text-xs font-medium">
        <div className="mx-auto max-w-7xl px-4 py-1.5 flex items-center justify-center gap-2 text-center">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
          <span>
            Calzado de seguridad certificado · Envío gratis en pedidos +$200 USD · Catálogo 2026
          </span>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-background border-b border-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            <a href="#inicio" aria-label="Inicio New Holland">
              <Logo />
            </a>

            <nav className="hidden md:flex items-center gap-1">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-brand transition-colors rounded-md hover:bg-brand-light/60"
                >
                  {n.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button
                onClick={abrirCarrito}
                className="relative bg-brand text-brand-foreground hover:bg-brand/90 font-semibold"
                size="sm"
              >
                <ShoppingBag className="h-4 w-4" />
                <span className="hidden sm:inline">Carrito</span>
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 min-w-5 px-1 rounded-full bg-amber-accent text-amber-foreground text-[0.7rem] font-bold flex items-center justify-center ring-2 ring-background">
                    {count}
                  </span>
                )}
              </Button>
              <button
                className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-muted"
                onClick={() => setMenuAbierto((v) => !v)}
                aria-label="Menú"
              >
                {menuAbierto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil */}
        {menuAbierto && (
          <nav className="md:hidden border-t border-border bg-background">
            <div className="mx-auto max-w-7xl px-4 py-2 flex flex-col">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuAbierto(false)}
                  className="px-2 py-3 text-sm font-medium text-foreground/80 hover:text-brand border-b border-border/60 last:border-0"
                >
                  {n.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
