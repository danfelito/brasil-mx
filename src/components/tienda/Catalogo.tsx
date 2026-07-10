"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { productos, categorias, marcas, type Producto } from "@/data/productos";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TarjetaProducto } from "./TarjetaProducto";
import { DetalleProducto } from "./DetalleProducto";
import { cn } from "@/lib/utils";

// Etiquetas de uso con icono implícito por texto
const ETIQUETAS_USO = [
  "Obra",
  "Industrial",
  "Campo",
  "Agrícola",
  "Ejecutivo",
  "Almacén",
  "Construcción",
  "Pesado",
] as const;

type Linea = "todas" | "dama" | "caballero" | "unisex";
type Marca = "todas" | "Spessoto" | "New Holland";

export function Catalogo() {
  const [marca, setMarca] = useState<Marca>("todas");
  const [linea, setLinea] = useState<Linea>("todas");
  const [categoria, setCategoria] = useState<string>("todas");
  const [busqueda, setBusqueda] = useState("");
  const [usoActivo, setUsoActivo] = useState<string | null>(null);
  const [productoSel, setProductoSel] = useState<Producto | null>(null);
  const [detalleAbierto, setDetalleAbierto] = useState(false);

  const verDetalle = useCallback((p: Producto) => {
    setProductoSel(p);
    setDetalleAbierto(true);
  }, []);

  const listaSoft = useMemo(() => {
    let lista = productos.filter((p) => {
      if (marca !== "todas" && p.marca !== marca) return false;
      if (linea !== "todas" && p.linea !== linea) return false;
      if (categoria !== "todas" && p.categoria !== categoria) return false;
      if (busqueda.trim()) {
        const q = busqueda.toLowerCase();
        const match =
          p.nombre.toLowerCase().includes(q) ||
          p.codigo.toLowerCase().includes(q) ||
          p.uso.toLowerCase().includes(q) ||
          p.materiales.some((m) => m.nombre.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });

    // Reordenar: si hay uso activo, los que coinciden van arriba (sin filtrar el resto)
    if (usoActivo) {
      lista = [...lista].sort((a, b) => {
        const aMatch = a.usoTags.includes(usoActivo) ? 0 : 1;
        const bMatch = b.usoTags.includes(usoActivo) ? 0 : 1;
        return aMatch - bMatch;
      });
    }
    return lista;
  }, [marca, linea, categoria, busqueda, usoActivo]);

  const limpiarFiltros = () => {
    setMarca("todas");
    setLinea("todas");
    setCategoria("todas");
    setBusqueda("");
    setUsoActivo(null);
  };

  const hayFiltros = marca !== "todas" || linea !== "todas" || categoria !== "todas" || busqueda || usoActivo;

  return (
    <section id="catalogo" className="relative py-14 sm:py-20 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge className="mb-3 bg-brand-light text-brand hover:bg-brand-light border-0">
            Catálogo 2026
          </Badge>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-tight">
            Modelos por marca, uso y seguridad
          </h2>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg">
            {productos.length} modelos de las marcas <span className="font-semibold text-foreground">Spessoto</span> y{" "}
            <span className="font-semibold text-foreground">New Holland</span>, para dama y caballero.
            Filtra por uso para encontrar el calzado ideal para tu entorno de trabajo.
          </p>
        </div>

        {/* Etiquetas de uso (interactivas, glow + reorder) */}
        <div id="usos" className="mb-8">
          <div className="flex items-center gap-2 mb-3 justify-center">
            <Sparkles className="h-4 w-4 text-amber-accent" />
            <span className="text-sm font-semibold text-foreground">Filtra por uso de trabajo</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {ETIQUETAS_USO.map((u) => (
              <UseTag
                key={u}
                etiqueta={u}
                activo={usoActivo === u}
                onClick={() => setUsoActivo((cur) => (cur === u ? null : u))}
              />
            ))}
          </div>
        </div>

        {/* Filtros */}
        <div className="sticky top-16 z-20 -mx-4 px-4 py-3 bg-background/80 backdrop-blur-md border-y border-border mb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar modelo, código o material..."
                className="pl-9"
              />
            </div>

            {/* Filtro marca */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <Segmento
                valor={marca}
                onChange={(v) => setMarca(v as Marca)}
                opciones={[
                  { v: "todas", l: "Todas" },
                  { v: "Spessoto", l: "Spessoto" },
                  { v: "New Holland", l: "New Holland" },
                ]}
              />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap sm:ml-auto">
              <Segmento
                valor={linea}
                onChange={(v) => setLinea(v as Linea)}
                opciones={[
                  { v: "todas", l: "Todos" },
                  { v: "dama", l: "Dama" },
                  { v: "caballero", l: "Cab." },
                  { v: "unisex", l: "Unisex" },
                ]}
              />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground hidden sm:block" />
              <Chip activo={categoria === "todas"} onClick={() => setCategoria("todas")}>
                Todas
              </Chip>
              {categorias.map((c) => (
                <Chip key={c} activo={categoria === c} onClick={() => setCategoria(c)}>
                  {c}
                </Chip>
              ))}
            </div>
          </div>
        </div>

        {/* Resultado */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">{listaSoft.length}</span> modelo{listaSoft.length !== 1 ? "s" : ""}
            {usoActivo && (
              <span className="ml-1">
                · ordenados por <span className="font-semibold text-brand">{usoActivo}</span>
              </span>
            )}
            {marca !== "todas" && (
              <span className="ml-1">· <span className="font-semibold text-brand">{marca}</span></span>
            )}
          </p>
          {hayFiltros && (
            <Button variant="ghost" size="sm" onClick={limpiarFiltros} className="text-muted-foreground">
              <X className="h-3.5 w-3.5" />
              Limpiar filtros
            </Button>
          )}
        </div>

        {/* Grid */}
        {listaSoft.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No se encontraron modelos con esos filtros.</p>
            <Button variant="outline" onClick={limpiarFiltros} className="mt-4">
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            <AnimatePresence mode="popLayout">
              {listaSoft.map((p) => (
                <TarjetaProducto
                  key={p.id}
                  producto={p}
                  prioridad={!!usoActivo && p.usoTags.includes(usoActivo)}
                  onVerDetalle={verDetalle}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <DetalleProducto
        producto={productoSel}
        abierto={detalleAbierto}
        onCerrar={() => setDetalleAbierto(false)}
      />
    </section>
  );
}

function UseTag({
  etiqueta,
  activo,
  onClick,
}: {
  etiqueta: string;
  activo: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border",
        activo
          ? "bg-brand text-brand-foreground border-brand shadow-lg shadow-brand/25 scale-105"
          : "bg-background text-foreground/70 border-border hover:border-brand/50 hover:text-brand hover:shadow-md hover:shadow-brand/10 hover:-translate-y-0.5"
      )}
    >
      <span
        className={cn(
          "absolute inset-0 rounded-full transition-opacity duration-300",
          activo ? "opacity-0" : "opacity-0 group-hover:opacity-100"
        )}
        style={{ boxShadow: "0 0 0 2px var(--brand), 0 0 18px 2px color-mix(in oklch, var(--brand) 45%, transparent)" }}
      />
      <span className="relative">{etiqueta}</span>
      {activo && <span className="relative ml-1">✓</span>}
    </button>
  );
}

function Segmento({
  valor,
  onChange,
  opciones,
}: {
  valor: string;
  onChange: (v: string) => void;
  opciones: { v: string; l: string }[];
}) {
  return (
    <div className="inline-flex items-center rounded-lg bg-muted p-0.5">
      {opciones.map((o) => (
        <button
          key={o.v}
          onClick={() => onChange(o.v)}
          className={cn(
            "px-3 py-1.5 text-sm font-semibold rounded-md transition-all",
            valor === o.v
              ? "bg-background text-brand shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {o.l}
        </button>
      ))}
    </div>
  );
}

function Chip({
  activo,
  onClick,
  children,
}: {
  activo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 text-xs font-semibold rounded-full transition-all border",
        activo
          ? "bg-brand text-brand-foreground border-brand"
          : "bg-background text-foreground/70 border-border hover:border-brand/50 hover:text-brand"
      )}
    >
      {children}
    </button>
  );
}
