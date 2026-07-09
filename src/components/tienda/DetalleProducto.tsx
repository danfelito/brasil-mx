"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Star,
  Minus,
  Plus,
  ShoppingBag,
  X,
  CheckCircle2,
  HardHat,
  Layers,
  Footprints,
  Factory,
} from "lucide-react";
import type { Producto } from "@/data/productos";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCarrito } from "@/lib/cart";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function DetalleProducto({
  producto,
  abierto,
  onCerrar,
}: {
  producto: Producto | null;
  abierto: boolean;
  onCerrar: () => void;
}) {
  const [materialIdx, setMaterialIdx] = useState(0);
  const [talla, setTalla] = useState<number | null>(null);
  const [cantidad, setCantidad] = useState(1);
  const [prevId, setPrevId] = useState<string | undefined>(producto?.id);
  const agregar = useCarrito((s) => s.agregar);

  // Reset selectors when the selected product changes (React render-time pattern)
  if (producto && producto.id !== prevId) {
    setPrevId(producto.id);
    setMaterialIdx(0);
    setTalla(null);
    setCantidad(1);
  }

  if (!producto) return null;
  const material = producto.materiales[materialIdx];

  const agregarAlCarrito = () => {
    if (!talla) {
      toast.error("Selecciona una talla", { description: "Elige la talla antes de añadir al carrito." });
      return;
    }
    agregar({
      productoId: producto.id,
      codigo: producto.codigo,
      nombre: producto.nombre,
      imagen: producto.imagen,
      precio: producto.precio,
      material: material.nombre,
      talla,
      cantidad,
    });
    toast.success("Añadido al carrito", {
      description: `${producto.nombre} · ${material.nombre} · Talla ${talla} ×${cantidad}`,
    });
    onCerrar();
  };

  return (
    <Dialog open={abierto} onOpenChange={(o) => !o && onCerrar()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden gap-0 max-h-[92vh] overflow-y-auto scrollbar-thin">
        <DialogTitle className="sr-only">{producto.nombre}</DialogTitle>
        <DialogDescription className="sr-only">
          Detalle del producto {producto.codigo} con características de seguridad y selector de talla.
        </DialogDescription>

        <div className="grid md:grid-cols-2">
          {/* Imagen */}
          <div className="relative bg-muted/40 aspect-square md:aspect-auto md:min-h-[460px]">
            <img
              src={producto.imagen}
              alt={`${producto.nombre} - ${producto.codigo}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {producto.nuevo && (
                <Badge className="bg-amber-accent text-amber-foreground font-bold w-fit">NUEVO 2026</Badge>
              )}
              {producto.destacado && (
                <Badge className="bg-brand text-brand-foreground font-bold w-fit">DESTACADO</Badge>
              )}
            </div>
            <button
              onClick={onCerrar}
              className="md:hidden absolute top-3 right-3 h-9 w-9 rounded-full bg-background/90 flex items-center justify-center shadow"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Detalle */}
          <div className="flex flex-col p-5 sm:p-6 gap-4">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold text-brand tracking-widest">{producto.codigo}</span>
                <Badge variant="outline" className="font-semibold">
                  {producto.linea === "dama" ? "Línea Dama" : "Línea Caballero"}
                </Badge>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground leading-tight">
                {producto.nombre}
              </h2>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3.5 w-3.5",
                        i < Math.round(producto.rating)
                          ? "fill-amber-accent text-amber-accent"
                          : "text-muted-foreground/40"
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {producto.rating} · {producto.reseñas} reseñas
                </span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{producto.descripcion}</p>

            {/* Precio */}
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl text-foreground">
                ${producto.precio.toFixed(2)}
              </span>
              <span className="text-sm font-bold text-muted-foreground">USD / par</span>
            </div>

            <Separator />

            {/* Selector de material */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">Material / Color</span>
                <span className="text-xs text-muted-foreground">{material.nombre}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {producto.materiales.map((m, i) => (
                  <button
                    key={m.nombre}
                    onClick={() => setMaterialIdx(i)}
                    title={m.nombre}
                    className={cn(
                      "relative h-9 w-9 rounded-full ring-2 ring-offset-2 ring-offset-background transition-all",
                      i === materialIdx ? "ring-brand scale-110" : "ring-border hover:ring-brand/50"
                    )}
                    style={{ backgroundColor: m.hex }}
                    aria-label={m.nombre}
                  >
                    {i === materialIdx && (
                      <CheckCircle2 className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de talla */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">Talla</span>
                <a href="#guia-tallas" className="text-xs text-brand hover:underline">Guía de tallas</a>
              </div>
              <div className="grid grid-cols-6 sm:grid-cols-7 gap-1.5">
                {producto.tallas.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTalla(t)}
                    className={cn(
                      "h-9 rounded-lg text-sm font-bold transition-all border",
                      talla === t
                        ? "bg-brand text-brand-foreground border-brand shadow"
                        : "bg-background border-border text-foreground hover:border-brand hover:bg-brand-light/50"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Cantidad + Añadir */}
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                  className="h-10 w-10 flex items-center justify-center hover:bg-muted"
                  aria-label="Reducir cantidad"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-bold">{cantidad}</span>
                <button
                  onClick={() => setCantidad((c) => c + 1)}
                  className="h-10 w-10 flex items-center justify-center hover:bg-muted"
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button
                onClick={agregarAlCarrito}
                className="flex-1 bg-brand text-brand-foreground hover:bg-brand/90 font-semibold h-10"
              >
                <ShoppingBag className="h-4 w-4" />
                Añadir · ${(producto.precio * cantidad).toFixed(2)}
              </Button>
            </div>

            <Separator />

            {/* Seguridad */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-4 w-4 text-brand" />
                <span className="text-sm font-semibold text-foreground">Características de seguridad</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-1.5">
                {producto.seguridad.map((s) => (
                  <div key={s} className="flex items-start gap-1.5 text-xs text-foreground/80">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand mt-0.5 shrink-0" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Uso recomendado */}
            <div className="rounded-xl bg-brand-light/50 border border-brand/10 p-3">
              <div className="flex items-center gap-2 mb-2">
                <HardHat className="h-4 w-4 text-brand" />
                <span className="text-sm font-semibold text-foreground">Uso recomendado</span>
              </div>
              <p className="text-xs text-foreground/80 mb-2">{producto.uso}</p>
              <div className="flex flex-wrap gap-1.5">
                {producto.usoTags.map((t) => (
                  <Badge key={t} variant="secondary" className="text-[0.65rem] font-semibold">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Especificaciones */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Espec icon={<Layers className="h-3.5 w-3.5" />} label="Suela" valor={producto.suela} />
              <Espec icon={<Footprints className="h-3.5 w-3.5" />} label="Tipo" valor={producto.tipo} />
              <Espec icon={<Factory className="h-3.5 w-3.5" />} label="Categoría" valor={producto.categoria} />
              <Espec icon={<ShieldCheck className="h-3.5 w-3.5" />} label="Línea" valor={producto.linea === "dama" ? "Dama" : "Caballero"} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Espec({ icon, label, valor }: { icon: React.ReactNode; label: string; valor: string }) {
  return (
    <div className="rounded-lg border border-border p-2.5">
      <div className="flex items-center gap-1.5 text-muted-foreground mb-0.5">
        {icon}
        <span className="text-[0.65rem] uppercase tracking-wide">{label}</span>
      </div>
      <div className="font-semibold text-foreground text-[0.78rem] leading-tight">{valor}</div>
    </div>
  );
}
