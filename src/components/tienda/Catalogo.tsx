"use client";

import { useState, useMemo, useCallback } from "react";
import { Search, X } from "lucide-react";
import { productos, type Producto } from "@/data/productos";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TarjetaProducto } from "./TarjetaProducto";
import { DetalleProducto } from "./DetalleProducto";
import { cn } from "@/lib/utils";

const GALERIAS = ["New Holland", "Spessoto"] as const;
type Galeria = (typeof GALERIAS)[number];
const USOS = [
  { id: "todos", nombre: "Todos los usos", tags: [] },
  { id: "industria", nombre: "Industria, obra y almacén", tags: ["Industrial", "Obra", "Almacén"] },
  { id: "campo", nombre: "Campo y agricultura", tags: ["Campo", "Agrícola", "Rural"] },
  { id: "ejecutivo", nombre: "Ejecutivo y comercio", tags: ["Ejecutivo", "Oficina", "Comercial"] },
];
const normalizar = (texto: string) => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
const coincideUso = (producto: Producto, id: string) => id === "todos" || USOS.find((uso) => uso.id === id)!.tags.some((tag) => producto.usoTags.includes(tag));

export function Catalogo() {
  const [galeria, setGaleria] = useState<Galeria>("New Holland");
  const [uso, setUso] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [productoSel, setProductoSel] = useState<Producto | null>(null);
  const [detalleAbierto, setDetalleAbierto] = useState(false);
  const verDetalle = useCallback((producto: Producto) => {
    setProductoSel(producto);
    setDetalleAbierto(true);
  }, []);
  const modelosMarca = useMemo(() => productos.filter((producto) => producto.marca === galeria), [galeria]);
  const buscados = useMemo(() => {
    const consulta = normalizar(busqueda);
    return modelosMarca.filter((producto) => !consulta || normalizar([
      producto.nombre, producto.codigo, producto.uso, producto.descripcion,
      ...producto.materiales.map((material) => material.nombre),
    ].join(" ")).includes(consulta));
  }, [modelosMarca, busqueda]);
  const visibles = useMemo(() => buscados.filter((producto) => coincideUso(producto, uso)), [buscados, uso]);
  const limpiarFiltros = () => { setUso("todos"); setBusqueda(""); };
  const cambiarGaleria = (marca: Galeria) => {
    if (marca === galeria) return;
    setGaleria(marca);
    limpiarFiltros();
    setDetalleAbierto(false);
    setProductoSel(null);
  };
  const hayFiltros = uso !== "todos" || Boolean(busqueda.trim());

  return (
    <section id="catalogo" className="relative py-14 sm:py-20 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <Badge className="mb-3 bg-brand-light text-brand hover:bg-brand-light border-0">Catálogo de calzado</Badge>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-tight">Explora nuestras marcas</h2>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg">Elige una galería y encuentra el calzado para tu trabajo. Consulta materiales, tallas y precios FOB en MXN.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-xl mx-auto mb-8" role="group" aria-label="Galerías por marca">
          {GALERIAS.map((marca) => (
            <button type="button" key={marca} aria-pressed={galeria === marca} aria-controls="galeria-productos" onClick={() => cambiarGaleria(marca)}
              className={cn("rounded-2xl border p-4 sm:p-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand", galeria === marca ? "border-brand bg-brand text-brand-foreground shadow-md" : "border-border bg-card hover:border-brand/50")}>
              <span className="block font-display text-xl font-bold">{marca}</span>
              <span className="mt-1 block text-xs opacity-80">{productos.filter((producto) => producto.marca === marca).length} modelos · Ver galería</span>
            </button>
          ))}
        </div>

        <div id="galeria-productos" aria-labelledby="titulo-galeria">
          <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div><h3 id="titulo-galeria" className="font-display font-bold text-2xl">Galería {galeria}</h3><p className="mt-1 text-sm text-muted-foreground">Todos los modelos de la marca en un solo lugar.</p></div>
              <div className="relative w-full sm:max-w-sm">
                <Search aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input value={busqueda} onChange={(evento) => setBusqueda(evento.target.value)} aria-label={`Buscar en ${galeria}`} placeholder="Buscar modelo, código o material" className="pl-9 pr-10" />
                {busqueda && <button type="button" onClick={() => setBusqueda("")} aria-label="Borrar búsqueda" className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-muted"><X className="h-4 w-4" /></button>}
              </div>
            </div>
            <div id="usos" className="scroll-mt-24">
              <p className="text-sm font-semibold mb-3" id="etiqueta-usos">Filtrar por uso de trabajo</p>
              <div className="flex flex-wrap gap-2" role="group" aria-labelledby="etiqueta-usos">
                {USOS.map((item) => {
                  const total = buscados.filter((producto) => coincideUso(producto, item.id)).length;
                  return <button type="button" key={item.id} aria-pressed={uso === item.id} disabled={total === 0 && uso !== item.id && item.id !== "todos"} onClick={() => setUso(item.id)} className={cn("rounded-full border px-3 py-2 text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand", uso === item.id ? "border-brand bg-brand text-brand-foreground" : "border-border bg-background hover:border-brand/50")}>
                    {item.nombre}<span className="ml-2 text-xs opacity-70">{total}</span>
                  </button>;
                })}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Un modelo puede ser adecuado para más de un uso. Revisa sus características de protección en la ficha.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 min-h-9">
            <p role="status" aria-live="polite" className="text-sm text-muted-foreground"><span className="font-bold text-foreground">{visibles.length}</span> de {modelosMarca.length} modelos · {galeria}{uso !== "todos" && ` · ${USOS.find((item) => item.id === uso)?.nombre}`}</p>
            {hayFiltros && <Button variant="ghost" size="sm" onClick={limpiarFiltros}><X className="h-3.5 w-3.5" />Limpiar filtros</Button>}
          </div>
          {visibles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border text-center py-16 px-4">
              <h4 className="font-semibold text-lg">No encontramos modelos con esa selección</h4>
              <p className="text-muted-foreground mt-2">Prueba otro uso o busca por nombre, código o material dentro de {galeria}.</p>
              <Button variant="outline" onClick={limpiarFiltros} className="mt-4">Ver todos los modelos de {galeria}</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {visibles.map((producto) => <TarjetaProducto key={producto.id} producto={producto} onVerDetalle={verDetalle} />)}
            </div>
          )}
        </div>
      </div>
      <DetalleProducto producto={productoSel} abierto={detalleAbierto} onCerrar={() => setDetalleAbierto(false)} />
    </section>
  );
}
