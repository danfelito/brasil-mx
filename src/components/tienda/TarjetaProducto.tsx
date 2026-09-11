"use client";
import { ProductPhoto } from "./ProductPhoto";

import { motion } from "framer-motion";
import { Star, ShieldCheck, Plus, ChevronRight, Check } from "lucide-react";
import type { Producto } from "@/data/productos";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const formatoPrecio = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export function TarjetaProducto({
  producto,
  prioridad,
  onVerDetalle,
}: {
  producto: Producto;
  prioridad?: boolean;
  onVerDetalle: (producto: Producto) => void;
}) {
  const esSpessoto = producto.marca === "Spessoto";

  return (
    <motion.div
      layout
      layoutId={`card-${producto.id}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "group relative flex flex-col rounded-2xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand/10 hover:border-brand/30 transition-all duration-300",
        prioridad && "ring-2 ring-amber-accent/60",
        esSpessoto && "border-[#003f87]/25"
      )}
    >
      <button
        onClick={() => onVerDetalle(producto)}
        className="relative aspect-square overflow-hidden bg-white block"
        aria-label={`Ver ${producto.nombre}`}
      >
        <ProductPhoto
          src={producto.imagen}
          alt={`${producto.nombre} - ${producto.codigo} (${producto.marca})`}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />

      </button>

      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex justify-between text-xs font-semibold text-brand"><span>{producto.marca}</span><span className="text-muted-foreground">{producto.linea === "dama" ? "Mujer" : producto.linea === "caballero" ? "Hombre" : "Unisex"}</span></div>
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[0.68rem] font-bold text-brand tracking-wider">{producto.codigo}</span>
            {producto.rating > 0 ? (
              <span className="flex items-center gap-0.5 text-[0.72rem] font-semibold text-foreground">
                <Star className="h-3 w-3 fill-amber-accent text-amber-accent" />
                {producto.rating}
                <span className="text-muted-foreground font-normal">({producto.reseñas})</span>
              </span>
            ) : (
              <span className="text-[0.65rem] font-semibold text-muted-foreground">Catálogo 2026</span>
            )}
          </div>
          <h3 className="font-display font-bold text-lg leading-tight text-foreground line-clamp-1">
            {producto.nombre}
          </h3>
          <p className="text-[0.76rem] text-muted-foreground mt-1 line-clamp-3 leading-relaxed">
            {producto.descripcion}
          </p>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {producto.materiales.slice(0, 5).map((material) => (
            <span
              key={material.nombre}
              title={material.nombre}
              className="h-5 w-5 rounded-full ring-1 ring-border shadow-sm border border-background"
              style={{ backgroundColor: material.hex }}
            />
          ))}
          {producto.materiales.length > 5 && (
            <span className="text-[0.65rem] text-muted-foreground font-medium">
              +{producto.materiales.length - 5}
            </span>
          )}
        </div>

        <div className="space-y-1.5 min-h-[3.25rem]">
          {producto.destacados.slice(0, 2).map((destacado) => (
            <div key={destacado} className="flex items-start gap-1.5 text-[0.7rem] text-foreground/75">
              <Check className="h-3.5 w-3.5 text-brand mt-0.5 shrink-0" />
              <span className="line-clamp-1">{destacado}</span>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-1.5 text-[0.72rem] text-muted-foreground min-h-[2.5rem]">
          <ShieldCheck className="h-3.5 w-3.5 text-brand mt-0.5 shrink-0" />
          <span className="line-clamp-2">{producto.seguridad[0]}</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap text-[0.7rem]">
          <span className="text-muted-foreground font-medium">Tallas:</span>
          <span className="font-semibold text-foreground">
            {producto.tallas.length <= 4
              ? producto.tallas.join(", ")
              : `${producto.tallas[0]}–${producto.tallas[producto.tallas.length - 1]}`}
          </span>
          <span className="text-muted-foreground">({producto.tallas.length})</span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2 border-t border-border/60">
          <div>
            <div className="text-[0.65rem] text-muted-foreground uppercase tracking-wide">Precio B2B · FOB</div>
            <div className="font-display font-extrabold text-2xl text-foreground leading-none">
              {formatoPrecio.format(producto.precio)}
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => onVerDetalle(producto)}
            className="bg-brand text-brand-foreground hover:bg-brand/90 font-semibold"
          >
            <Plus className="h-4 w-4" />
            Elegir
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
