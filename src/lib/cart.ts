"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ItemCarrito = {
  productoId: string;
  codigo: string;
  nombre: string;
  imagen: string;
  precio: number;
  material: string; // nombre del material elegido
  talla: number;
  cantidad: number;
};

type EstadoCarrito = {
  items: ItemCarrito[];
  abierto: boolean;
  agregar: (item: Omit<ItemCarrito, "cantidad">, cantidad?: number) => void;
  quitar: (productoId: string, material: string, talla: number) => void;
  cambiarCantidad: (
    productoId: string,
    material: string,
    talla: number,
    cantidad: number
  ) => void;
  vaciar: () => void;
  abrir: () => void;
  cerrar: () => void;
  toggle: () => void;
};

const mismaLinea = (
  a: { productoId: string; material: string; talla: number },
  b: { productoId: string; material: string; talla: number }
) => a.productoId === b.productoId && a.material === b.material && a.talla === b.talla;

export const useCarrito = create<EstadoCarrito>()(
  persist(
    (set) => ({
      items: [],
      abierto: false,
      agregar: (item, cantidad = 1) =>
        set((state) => {
          const idx = state.items.findIndex((i) =>
            mismaLinea(i, { productoId: item.productoId, material: item.material, talla: item.talla })
          );
          if (idx >= 0) {
            const items = [...state.items];
            items[idx] = { ...items[idx], cantidad: items[idx].cantidad + cantidad };
            return { items, abierto: true };
          }
          return { items: [...state.items, { ...item, cantidad }], abierto: true };
        }),
      quitar: (productoId, material, talla) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !mismaLinea(i, { productoId, material, talla })
          ),
        })),
      cambiarCantidad: (productoId, material, talla, cantidad) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              mismaLinea(i, { productoId, material, talla })
                ? { ...i, cantidad: Math.max(1, cantidad) }
                : i
            )
            .filter((i) => i.cantidad > 0),
        })),
      vaciar: () => set({ items: [] }),
      abrir: () => set({ abierto: true }),
      cerrar: () => set({ abierto: false }),
      toggle: () => set((s) => ({ abierto: !s.abierto })),
    }),
    { name: "nh-carrito" }
  )
);

export const totalItems = (items: ItemCarrito[]) =>
  items.reduce((acc, i) => acc + i.cantidad, 0);

export const subtotal = (items: ItemCarrito[]) =>
  items.reduce((acc, i) => acc + i.cantidad * i.precio, 0);
