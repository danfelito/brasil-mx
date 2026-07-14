"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { productos, categorias, type Producto } from "@/data/productos";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TarjetaProducto } from "./TarjetaProducto";
import { DetalleProducto } from "./DetalleProducto";
import { cn } from "@/lib/utils";

const ETIQUETAS_USO = [
  "Obra",
  "Industrial",
  "Campo",
  "Agrícola",
  "Ejecutivo",
  "Almacén",
  "Rural",
] as const;

type Coleccion =
  | "todos"
  | "mujer"
  | "hombre"
  | "industriales"
  | "new-holland"
  | "spessoto";

const COLECCIONES: { valor: Coleccion; etiqueta: string }[] = [
  { valor: "todos", etiqueta: "Todos" },
  { valor: "mujer", etiqueta: "Mujer" },
  { valor: "hombre", etiqueta: "Hombre" },
  { valor: "industriales", etiqueta: "Industriales" },
  { valor: "new-holland", etiqueta: "New Holland" },
  { valor: "spessoto", etiqueta: "Spessoto" },
];

function perteneceAColeccion(producto: Producto, coleccion: Coleccion) {
  if (coleccion === "mujer") return producto.linea === "dama";
  if (coleccion === "hombre") return producto.linea === "caballero";
  if (coleccion === "industriales") return producto.categoria === "Industrial";
  if (coleccion === "new-holland") return producto.marca === "New Holland";
  if (coleccion === "spessoto") return producto.marca === "Spessoto";
  return true;
}

export function Catalogo() {
  const [coleccion, setColeccion] = useState<Coleccion>("todos");
  const [categoria, setCategoria] = useState<string>("todas");
  const [busqueda, setBusqueda] = useState("");
  const [usoActivo, setUsoActivo] = useState<string | null>(null);
  const [productoSel, setProductoSel] = useState<Producto | null>(null);
  const [detalleAbierto, setDetalleAbierto] = useState(false);

  const verDetalle = useCallback((producto: Producto) => {
    setProductoSel(producto);
    setDetalleAbierto(true);
  }, []);

  const listaSoft = useMemo(() => {
    let lista = productos.filter((producto) => {
      if (!perteneceAColeccion(producto, coleccion)) return false;
      if (categoria !== "todas" && producto.categoria !== categoria) return false;

      if (busqueda.trim()) {
        const consulta = busqueda.toLowerCase();
        const coincide =
          producto.nombre.toLowerCase().includes(consulta) ||
          producto.codigo.toLowerCase().includes(consulta) ||
          producto.uso.toLowerCase().includes(consulta) ||
          producto.descripcion.toLowerCase().includes(consulta) ||
          producto.materiales.some((material) =>
            material.nombre.toLowerCase().includes(consulta)
          );
        if (!coincide) return false;
      }

      return true;
    });

    if (usoActivo) {
      lista = [...lista].sort((a, b) => {
        const aCoincide = a.usoTags.includes(usoActivo) ? 0 : 1;
        const bCoincide = b.usoTags.includes(usoActivo) ? 0 : 1;
        return aCoincide - bCoincide;
      });
    }

    return lista;
  }, [coleccion, categoria, busqueda, usoActivo]);

  const limpiarFiltros = () => {
    setColeccion("todos");
    setCategoria("todas");
    setBusqueda("");
    setUsoActivo(null);
  };

  const hayFiltros =
    coleccion !== "todos" ||
    categoria !== "todas" ||
    Boolean(busqueda) ||
    Boolean(usoActivo);

  return (
    <section id="catalogo" className="relative py-14 sm:py-20 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <Badge className="mb-3 bg-brand-light text-brand hover:bg-brand-light border-0">
            Catálogo 2026 actualizado
          </Badge>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-tight">
            Modelos organizados por colección y uso
          </h2>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg">
            {productos.length} modelos con ficha resumida, materiales, tallas y precios convertidos a pesos mexicanos.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {COLECCIONES.map((item) => (
              <button
                key={item.valor}
                onClick={() => setColeccion(item.valor)}
                className={cn(
                  "rounded-xl border px-4 py-2.5 text-sm font-bold transition-all",
                  coleccion === item.valor
                    ? "border-brand bg-brand text-brand-foreground shadow-lg shadow-brand/20"
                    : "border-border bg-card text-foreground/75 hover:border-brand/50 hover:text-brand"
                )}
              >
                {item.etiqueta}
                <span className="ml-2 text-[0.68rem] opacity-70">
                  {productos.filter((producto) => perteneceAColeccion(producto, item.valor)).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div id="usos" className="mb-8">
          <div className="flex items-center gap-2 mb-3 justify-center">
            <Sparkles className="h-4 w-4 text-amber-accent" />
            <span className="text-sm font-semibold text-foreground">Ordenar por uso de trabajo</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {ETIQUETAS_USO.map((etiqueta) => (
              <UseTag
                key={etiqueta}
                etiqueta={etiqueta}
                activo={usoActivo === etiqueta}
                onClick={() =>
                  setUsoActivo((actual) => (actual === etiqueta ? null : etiqueta))
                }
              />
            ))}
          </div>
        </div>

        <div className="sticky top-16 z-20 -mx-4 px-4 py-3 bg-background/85 backdrop-blur-md border-y border-border mb-6">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={busqueda}
                onChange={(evento) => setBusqueda(evento.target.value)}
                placeholder="Buscar modelo, código, material o característica..."
                className="pl-9"
              />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap lg:ml-auto">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground hidden sm:block" />
              <Chip activo={categoria === "todas"} onClick={() => setCategoria("todas")}>
                Todas las categorías
              </Chip>
              {categorias.map((item) => (
                <Chip
                  key={item}
                  activo={categoria === item}
                  onClick={() => setCategoria(item)}
                >
                  {item}
                </Chip>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">{listaSoft.length}</span>{" "}
            modelo{listaSoft.length !== 1 ? "s" : ""}
            {coleccion !== "todos" && (
              <span className="ml-1">
                · colección <span className="font-semibold text-brand">{COLECCIONES.find((item) => item.valor === coleccion)?.etiqueta}</span>
              </span>
            )}
            {usoActivo && (
              <span className="ml-1">
                · prioridad <span className="font-semibold text-brand">{usoActivo}</span>
              </span>
            )}
          </p>
          {hayFiltros && (
            <Button variant="ghost" size="sm" onClick={limpiarFiltros} className="text-muted-foreground">
              <X className="h-3.5 w-3.5" />
              Limpiar filtros
            </Button>
          )}
        </div>

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
              {listaSoft.map((producto) => (
                <TarjetaProducto
                  key={producto.id}
                  producto={producto}
                  prioridad={Boolean(usoActivo) && producto.usoTags.includes(usoActivo as string)}
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
      <span className="relative">{etiqueta}</span>
      {activo && <span className="relative ml-1">✓</span>}
    </button>
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
