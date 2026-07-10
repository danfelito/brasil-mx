"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, ShieldCheck, PartyPopper, ArrowRight } from "lucide-react";
import { useCarrito, subtotal } from "@/lib/cart";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type Estado = "formulario" | "enviando" | "exito";

export function Checkout({ abierto, onCerrar }: { abierto: boolean; onCerrar: () => void }) {
  const items = useCarrito((s) => s.items);
  const vaciar = useCarrito((s) => s.vaciar);
  const [estado, setEstado] = useState<Estado>("formulario");
  const [pedidoId, setPedidoId] = useState("");
  const [totalFinal, setTotalFinal] = useState(0);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    direccion: "",
  });

  const sub = subtotal(items);
  const envio = sub > 200 || sub === 0 ? 0 : 15;
  const total = sub + envio;

  const enviar = async () => {
    if (!form.nombre || !form.email) return;
    setEstado("enviando");
    try {
      const resp = await fetch("/api/pedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productoId: i.productoId,
            codigo: i.codigo,
            nombre: i.nombre,
            material: i.material,
            talla: i.talla,
            cantidad: i.cantidad,
            precio: i.precio,
          })),
          cliente: form,
          subtotal: sub,
          envio,
          total,
        }),
      });
      const data = await resp.json();
      if (data.ok) {
        setPedidoId(data.pedidoId);
        setTotalFinal(data.total);
        setEstado("exito");
        vaciar();
      } else {
        setEstado("formulario");
        alert(data.error || "Ocurrió un error");
      }
    } catch {
      setEstado("formulario");
      alert("No se pudo conectar con el servidor");
    }
  };

  const cerrar = () => {
    onCerrar();
    if (estado === "exito") {
      setTimeout(() => {
        setEstado("formulario");
        setForm({ nombre: "", email: "", telefono: "", empresa: "", direccion: "" });
      }, 300);
    }
  };

  return (
    <Dialog
      open={abierto}
      onOpenChange={(o) => {
        if (!o) cerrar();
      }}
    >
      <DialogContent className="max-w-lg p-0 overflow-hidden">
        <DialogTitle className="sr-only">Finalizar compra</DialogTitle>
        <DialogDescription className="sr-only">
          Formulario de pedido de calzado de seguridad New Holland.
        </DialogDescription>

        <AnimatePresence mode="wait">
          {estado === "formulario" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <div className="bg-brand text-brand-foreground px-5 py-4">
                <h2 className="font-display font-extrabold text-xl">Finalizar compra</h2>
                <p className="text-sm text-brand-foreground/80">
                  Completa tus datos y nuestro equipo confirmará disponibilidad y pago.
                </p>
              </div>

              <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto scrollbar-thin">
                {/* Resumen */}
                <div className="rounded-xl bg-muted/40 p-3 space-y-1.5">
                  {items.map((i) => (
                    <div key={`${i.productoId}-${i.material}-${i.talla}`} className="flex justify-between text-xs">
                      <span className="text-foreground/80 truncate pr-2">
                        <span className="font-semibold">{i.codigo}</span> · {i.material} · T{i.talla} ×{i.cantidad}
                      </span>
                      <span className="font-semibold whitespace-nowrap">${(i.precio * i.cantidad).toFixed(2)} MXN</span>
                    </div>
                  ))}
                  <Separator className="my-1.5" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">${sub.toFixed(2)} MXN</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envío</span>
                    <span className="font-semibold">{envio === 0 ? "Gratis" : `$${envio.toFixed(2)} MXN`}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="font-bold">Total</span>
                    <span className="font-display font-extrabold text-xl text-brand">
                      ${total.toFixed(2)} MXN
                    </span>
                  </div>
                </div>

                {/* Formulario */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 space-y-1.5">
                    <Label htmlFor="nombre">Nombre completo *</Label>
                    <Input
                      id="nombre"
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      placeholder="Juan Pérez"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Correo electrónico *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="juan@empresa.com"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      value={form.telefono}
                      onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                      placeholder="+52 55 1234 5678"
                    />
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <Label htmlFor="empresa">Empresa (opcional)</Label>
                    <Input
                      id="empresa"
                      value={form.empresa}
                      onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                      placeholder="Constructora XYZ"
                    />
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <Label htmlFor="direccion">Dirección de entrega</Label>
                    <Input
                      id="direccion"
                      value={form.direccion}
                      onChange={(e) => setForm({ ...form, direccion: e.target.value })}
                      placeholder="Calle, número, colonia, ciudad, CP"
                    />
                  </div>
                </div>

                <Button
                  onClick={enviar}
                  disabled={!form.nombre || !form.email || items.length === 0}
                  className="w-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold h-11"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Confirmar pedido · ${total.toFixed(2)} MXN
                </Button>
                <p className="text-[0.7rem] text-center text-muted-foreground">
                  Al confirmar, recibes un número de pedido. No se cobra hasta confirmar disponibilidad.
                </p>
              </div>
            </motion.div>
          )}

          {estado === "enviando" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 flex flex-col items-center gap-4"
            >
              <Loader2 className="h-10 w-10 text-brand animate-spin" />
              <p className="text-sm text-muted-foreground">Procesando tu pedido...</p>
            </motion.div>
          )}

          {estado === "exito" && (
            <motion.div
              key="exito"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                className="mx-auto h-20 w-20 rounded-full bg-brand/10 flex items-center justify-center mb-4"
              >
                <CheckCircle2 className="h-12 w-12 text-brand" />
              </motion.div>
              <div className="inline-flex items-center gap-1.5 text-amber-accent mb-2">
                <PartyPopper className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Pedido confirmado</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl text-foreground mb-1">
                ¡Gracias por tu pedido!
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Tu número de pedido es
              </p>
              <div className="inline-block rounded-xl bg-brand text-brand-foreground px-5 py-2.5 font-display font-extrabold text-xl tracking-wider mb-4">
                {pedidoId}
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                Total: <span className="font-bold text-foreground">${totalFinal.toFixed(2)} MXN</span>
              </p>
              <p className="text-xs text-muted-foreground mb-6 max-w-sm mx-auto">
                Nuestro equipo de ventas te contactará en menos de 24 horas para confirmar la
                disponibilidad de tallas y coordinar el pago.
              </p>
              <Button onClick={cerrar} className="bg-brand text-brand-foreground hover:bg-brand/90 font-semibold">
                Seguir explorando
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
