// Catálogo 2026. Precios convertidos el 13-07-2026 con 1 USD = 17.5082 MXN.
// ENH 2285 se convirtió desde BRL con 1 BRL = 3.3996 MXN.
import { mujer } from "./catalogo/mujer";
import { hombre } from "./catalogo/hombre";
import { industrial } from "./catalogo/industrial";
import { spessoto } from "./catalogo/spessoto";
export type { Producto, Marca, MaterialOption } from "./catalogo/base";
export const productos = [...mujer, ...hombre, ...industrial, ...spessoto];
export const categorias = ["Premium", "Ejecutiva", "Industrial", "Agrícola"] as const;
export const marcas = ["Spessoto", "New Holland"] as const;
export const lineas = ["dama", "caballero", "unisex"] as const;
export const etiquetasUso = ["Obra","Industrial","Campo","Agrícola","Ejecutivo","Oficina","Comercial","Almacén","Rural","Pesado","Ligero"] as const;
export const getProductosDestacados = () => productos.filter((p) => p.destacado);
export const getProductoById = (id: string) => productos.find((p) => p.id === id);
