"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck, Plus, ChevronRight } from "lucide-react";
import type { Producto } from "@/data/productos";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SpessotoMark, NewHollandMark } from "./Logo";
import { cn } from "@/lib/utils";

export function TarjetaProducto({
  producto,
  prioridad,
  onVerDetalle,
}: {
  producto: Producto;
  prioridad?: boolean;
  onVerDetalle: (p: Producto) => void;
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
      {/* Imagen */}
      <button
        onClick={() => onVerDetalle(producto)}
        className="relative aspect-square overflow-hidden bg-muted/40 block"
        aria-label={`Ver ${producto.nombre}`}
      >
        <img
          src={producto.imagen}
          alt={`${producto.nombre} - ${producto.codigo} (${producto.marca})`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Badge de marca */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <div
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide shadow",
              esSpessoto
                ? "bg-[#003f87] text-white"
                : "bg-white text-[#003f87]"
            )}
          >
            {esSpessoto ? <SpessotoMark className="h-3 w-3" /> : <NewHollandMark className="h-3 w-3" />}
            {producto.marca}
          </div>
          {producto.nuevo && (
            <Badge className="bg-amber-accent text-amber-foreground hover:bg-amber-accent font-bold text-[0.65rem] shadow w-fit">
              NUEVO 2026
            </Badge>
          )}
          {producto.destacado && (
            <Badge className="bg-brand text-brand-foreground hover:bg-brand font-bold text-[0.65rem] shadow w-fit">
              DESTACADO
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur font-semibold text-[0.65rem]">
            {producto.linea === "dama" ? "DAMA" : producto.linea === "caballero" ? "CABALLERO" : "UNISEX"}
          </Badge>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand/60 via-brand/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
          <span className="text-white text-sm font-semibold flex items-center gap-1 translate-y-2 group-hover:translate-y-0 transition-transform">
            Ver detalle <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </button>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[0.68rem] font-bold text-brand tracking-wider">{producto.codigo}</span>
            <span className="flex items-center gap-0.5 text-[0.72rem] font-semibold text-foreground">
              <Star className="h-3 w-3 fill-amber-accent text-amber-accent" />
              {producto.rating}
              <span className="text-muted-foreground font-normal">({producto.reseñas})</span>
            </span>
          </div>
          <h3 className="font-display font-bold text-lg leading-tight text-foreground line-clamp-1">
            {producto.nombre}
          </h3>
          <p className="text-[0.78rem] text-muted-foreground mt-0.5 line-clamp-1">{producto.uso}</p>
        </div>

        {/* Materiales (swatches) */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {producto.materiales.slice(0, 5).map((m) => (
            <span
              key={m.nombre}
              title={m.nombre}
              className="h-5 w-5 rounded-full ring-1 ring-border shadow-sm border border-background"
              style={{ backgroundColor: m.hex }}
            />
          ))}
          {producto.materiales.length > 5 && (
            <span className="text-[0.65rem] text-muted-foreground font-medium">
              +{producto.materiales.length - 5}
            </span>
          )}
        </div>

        {/* Seguridad destacada */}
        <div className="flex items-start gap-1.5 text-[0.72rem] text-muted-foreground min-h-[2.5rem]">
          <ShieldCheck className="h-3.5 w-3.5 text-brand mt-0.5 shrink-0" />
          <span className="line-clamp-2">{producto.seguridad[0]}</span>
        </div>

        {/* Tallas disponibles */}
        <div className="flex items-center gap-1.5 flex-wrap text-[0.7rem]">
          <span className="text-muted-foreground font-medium">Tallas:</span>
          <span className="font-semibold text-foreground">
            {producto.tallas.length <= 4
              ? producto.tallas.join(", ")
              : `${producto.tallas[0]}–${producto.tallas[producto.tallas.length - 1]}`}
          </span>
          <span className="text-muted-foreground">({producto.tallas.length})</span>
        </div>

        {/* Precio + CTA */}
        <div className="mt-auto flex items-end justify-between gap-2 pt-2 border-t border-border/60">
          <div>
            <div className="text-[0.65rem] text-muted-foreground uppercase tracking-wide">Precio B2B</div>
            <div className="font-display font-extrabold text-2xl text-foreground leading-none">
              ${producto.precio.toFixed(2)}
              <span className="text-xs font-bold text-muted-foreground ml-1">MXN</span>
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
