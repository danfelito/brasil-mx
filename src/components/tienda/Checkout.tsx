"use client";

import { useState } from "react";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { useCarrito, subtotal } from "@/lib/cart";
import { CONTACTO } from "@/lib/contacto";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function Checkout({ abierto, onCerrar }: { abierto: boolean; onCerrar: () => void }) {
  const items = useCarrito((s) => s.items);
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", empresa: "", destino: "" });
  const sub = subtotal(items);

  const solicitar = () => {
    if (!form.nombre || !form.email || !form.empresa || items.length === 0) return;
    const detalle = items.map((item) => `• ${item.codigo} · ${item.nombre} · ${item.material} · talla ${item.talla} · ${item.cantidad} par(es)`).join("\n");
    const mensaje = [
      "Hola, deseo solicitar una cotización B2B.",
      "",
      `Empresa: ${form.empresa}`,
      `Contacto: ${form.nombre}`,
      `Correo: ${form.email}`,
      form.telefono ? `Teléfono: ${form.telefono}` : "",
      form.destino ? `Destino: ${form.destino}` : "",
      "",
      "Productos:",
      detalle,
      "",
      `Subtotal estimado del catálogo: $${sub.toFixed(2)} MXN`,
      "Solicito confirmar disponibilidad, envío y condiciones comerciales.",
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${CONTACTO.telefonoInternacional}?text=${encodeURIComponent(mensaje)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={abierto} onOpenChange={(open) => !open && onCerrar()}>
      <DialogContent className="max-w-lg overflow-hidden p-0">
        <DialogTitle className="sr-only">Solicitar cotización B2B</DialogTitle>
        <DialogDescription className="sr-only">Envía por WhatsApp los productos seleccionados y los datos de tu empresa.</DialogDescription>
        <div className="bg-brand px-5 py-4 text-brand-foreground">
          <h2 className="font-display text-xl font-extrabold">Solicitar cotización B2B</h2>
          <p className="text-sm text-brand-foreground/80">Revisa la selección y continúa la conversación por WhatsApp.</p>
        </div>
        <div className="max-h-[72vh] space-y-4 overflow-y-auto p-5">
          <div className="space-y-2 rounded-xl bg-muted/40 p-3">
            {items.map((item) => (
              <div key={`${item.productoId}-${item.material}-${item.talla}`} className="flex justify-between gap-3 text-xs">
                <span className="text-foreground/80"><strong>{item.codigo}</strong> · {item.material} · T{item.talla} ×{item.cantidad}</span>
                <span className="whitespace-nowrap font-semibold">${(item.precio * item.cantidad).toFixed(2)} MXN</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between text-sm"><span>Subtotal estimado</span><strong className="text-brand">${sub.toFixed(2)} MXN</strong></div>
            <p className="text-[0.7rem] text-muted-foreground">Envío, existencias y condiciones se confirman en la cotización.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 space-y-1.5"><Label htmlFor="empresa">Empresa *</Label><Input id="empresa" value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} placeholder="Nombre de la empresa" /></div>
            <div className="col-span-2 space-y-1.5 sm:col-span-1"><Label htmlFor="nombre">Nombre *</Label><Input id="nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Persona de contacto" /></div>
            <div className="col-span-2 space-y-1.5 sm:col-span-1"><Label htmlFor="telefono">Teléfono</Label><Input id="telefono" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} placeholder="Teléfono de contacto" /></div>
            <div className="col-span-2 space-y-1.5"><Label htmlFor="email">Correo *</Label><Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="compras@empresa.com" /></div>
            <div className="col-span-2 space-y-1.5"><Label htmlFor="destino">Ciudad o C.P. de entrega</Label><Input id="destino" value={form.destino} onChange={(e) => setForm({ ...form, destino: e.target.value })} placeholder="Ciudad, estado o código postal" /></div>
          </div>

          <Button onClick={solicitar} disabled={!form.nombre || !form.email || !form.empresa || items.length === 0} className="h-12 w-full bg-[#168C45] font-semibold text-white hover:bg-[#12753A]">
            <MessageCircle className="h-4 w-4" /> Enviar solicitud por WhatsApp
          </Button>
          <p className="flex items-center justify-center gap-1.5 text-center text-[0.7rem] text-muted-foreground"><ShieldCheck className="h-3.5 w-3.5" />No se realiza ningún cobro desde esta página.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
