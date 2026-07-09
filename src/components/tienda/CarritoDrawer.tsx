"use client";

import { Minus, Plus, Trash2, ShoppingBag, X, ShieldCheck, Truck } from "lucide-react";
import { useCarrito, subtotal, type ItemCarrito } from "@/lib/cart";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkout } from "./Checkout";
import { useState } from "react";

export function CarritoDrawer() {
  const items = useCarrito((s) => s.items);
  const abierto = useCarrito((s) => s.abierto);
  const cerrar = useCarrito((s) => s.cerrar);
  const quitar = useCarrito((s) => s.quitar);
  const cambiarCantidad = useCarrito((s) => s.cambiarCantidad);
  const [checkoutAbierto, setCheckoutAbierto] = useState(false);

  const sub = subtotal(items);
  const envio = sub > 200 || sub === 0 ? 0 : 15;
  const total = sub + envio;

  return (
    <>
      <Sheet open={abierto} onOpenChange={(o) => !o && cerrar()}>
        <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
          <SheetHeader className="px-5 py-4 border-b border-border bg-brand text-brand-foreground">
            <SheetTitle className="flex items-center gap-2 text-brand-foreground">
              <ShoppingBag className="h-5 w-5" />
              Tu carrito
            </SheetTitle>
            <SheetDescription className="text-brand-foreground/80">
              {items.length} artículo{items.length !== 1 ? "s" : ""} en tu pedido
            </SheetDescription>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8 text-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground">Tu carrito está vacío</p>
              <p className="text-sm text-muted-foreground">
                Explora el catálogo y añade tus modelos de calzado de seguridad.
              </p>
              <Button onClick={cerrar} className="mt-2 bg-brand text-brand-foreground hover:bg-brand/90">
                Ver catálogo
              </Button>
            </div>
          ) : (
            <>
              {/* Lista de items */}
              <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-3 space-y-3">
                {items.map((item) => (
                  <ItemLinea
                    key={`${item.productoId}-${item.material}-${item.talla}`}
                    item={item}
                    onQuitar={() => quitar(item.productoId, item.material, item.talla)}
                    onCambiar={(c) => cambiarCantidad(item.productoId, item.material, item.talla, c)}
                  />
                ))}

                <div className="rounded-xl bg-brand-light/50 border border-brand/10 p-3 flex items-start gap-2">
                  {envio === 0 ? (
                    <>
                      <Truck className="h-4 w-4 text-brand mt-0.5 shrink-0" />
                      <p className="text-xs text-foreground/80">
                        <span className="font-semibold text-brand">¡Envío gratis!</span> Tu pedido
                        supera los $200 USD.
                      </p>
                    </>
                  ) : (
                    <>
                      <Truck className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <p className="text-xs text-muted-foreground">
                        Te faltan <span className="font-semibold text-brand">${(200 - sub).toFixed(2)} USD</span> para
                        envío gratis.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Resumen */}
              <div className="border-t border-border px-5 py-4 space-y-2 bg-muted/30">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${sub.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Envío</span>
                  <span className="font-semibold">
                    {envio === 0 ? <span className="text-brand">Gratis</span> : `$${envio.toFixed(2)} USD`}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-display font-extrabold text-2xl text-brand">
                    ${total.toFixed(2)} <span className="text-sm">USD</span>
                  </span>
                </div>
                <Button
                  onClick={() => setCheckoutAbierto(true)}
                  className="w-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold h-11 mt-2"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Proceder al pago
                </Button>
                <p className="text-[0.7rem] text-center text-muted-foreground">
                  Pago seguro · Confirmación de disponibilidad en 24 h
                </p>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Checkout abierto={checkoutAbierto} onCerrar={() => setCheckoutAbierto(false)} />
    </>
  );
}

function ItemLinea({
  item,
  onQuitar,
  onCambiar,
}: {
  item: ItemCarrito;
  onQuitar: () => void;
  onCambiar: (c: number) => void;
}) {
  return (
    <div className="flex gap-3 rounded-xl border border-border bg-card p-2.5">
      <div className="h-20 w-20 rounded-lg overflow-hidden bg-muted shrink-0">
        <img src={item.imagen} alt={item.nombre} className="h-full w-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-[0.65rem] font-bold text-brand tracking-wider">{item.codigo}</div>
            <p className="font-semibold text-sm text-foreground leading-tight truncate">{item.nombre}</p>
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              <Badge variant="secondary" className="text-[0.62rem] font-medium">{item.material}</Badge>
              <Badge variant="outline" className="text-[0.62rem] font-medium">Talla {item.talla}</Badge>
            </div>
          </div>
          <button
            onClick={onQuitar}
            className="text-muted-foreground hover:text-destructive transition-colors p-1"
            aria-label="Quitar"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-border rounded-md overflow-hidden">
            <button
              onClick={() => onCambiar(item.cantidad - 1)}
              className="h-7 w-7 flex items-center justify-center hover:bg-muted"
              aria-label="Reducir"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-7 text-center text-sm font-bold">{item.cantidad}</span>
            <button
              onClick={() => onCambiar(item.cantidad + 1)}
              className="h-7 w-7 flex items-center justify-center hover:bg-muted"
              aria-label="Aumentar"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <div className="font-display font-bold text-foreground">
            ${(item.precio * item.cantidad).toFixed(2)}
            <span className="text-[0.65rem] text-muted-foreground font-medium ml-0.5">USD</span>
          </div>
        </div>
      </div>
    </div>
  );
}
