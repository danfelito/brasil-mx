"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, ArrowRight, CheckCircle2, Loader2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Estado = "cerrado" | "formulario" | "enviando" | "exito";

export function CtaCorporativo() {
  const [estado, setEstado] = useState<Estado>("cerrado");
  const [form, setForm] = useState({ empresa: "", contacto: "", email: "", pares: "25" });

  const enviar = async () => {
    if (!form.empresa || !form.email) return;
    setEstado("enviando");
    await new Promise((r) => setTimeout(r, 1100));
    setEstado("exito");
  };

  const cerrar = () => {
    setEstado("cerrado");
    setTimeout(() => {
      setEstado("cerrado");
      setForm({ empresa: "", contacto: "", email: "", pares: "25" });
    }, 250);
  };

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-3xl bg-brand text-brand-foreground p-8 sm:p-12">
          {/* Decoración */}
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-amber-accent/15 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "repeating-linear-gradient(135deg, #fff 0, #fff 1px, transparent 1px, transparent 22px)",
            }}
          />
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-accent/20 px-3 py-1 text-xs font-semibold text-amber-accent mb-4">
                <Users className="h-3.5 w-3.5" />
                Cotización corporativa
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight leading-tight">
                ¿Necesitas equipar a todo tu equipo?
              </h2>
              <p className="mt-3 text-brand-foreground/80 text-base sm:text-lg max-w-md">
                Cotizaciones especiales para pedidos de 10 a 100+ pares. Precios por volumen,
                gestión de tallas por trabajador y facturación a empresa.
              </p>
              <ul className="mt-5 space-y-1.5 text-sm">
                {[
                  "Descuento por volumen desde 10 pares",
                  "Asesoría de seguridad y selección de modelo",
                  "Entrega coordinada a obra o almacén",
                ].map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-accent shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 items-stretch justify-center">
              <Button
                size="lg"
                onClick={() => setEstado("formulario")}
                className="bg-amber-accent text-amber-foreground hover:bg-amber-accent/90 font-bold text-base h-14 px-8 shadow-xl"
              >
                <Building2 className="h-5 w-5" />
                Solicitar cotización
                <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="text-xs text-brand-foreground/70 text-center">
                Respuesta en menos de 4 horas hábiles · Sin compromiso
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de cotización con confirmación deslizante */}
      <Dialog open={estado !== "cerrado"} onOpenChange={(o) => !o && cerrar()}>
        <DialogContent className="max-w-md p-0 overflow-hidden">
          <DialogTitle className="sr-only">Solicitar cotización corporativa</DialogTitle>
          <DialogDescription className="sr-only">
            Formulario para cotización por volumen de calzado de seguridad.
          </DialogDescription>

          <AnimatePresence mode="wait">
            {(estado === "formulario" || estado === "enviando") && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >
                <div className="bg-brand text-brand-foreground px-5 py-4">
                  <h2 className="font-display font-extrabold text-xl">Cotización corporativa</h2>
                  <p className="text-sm text-brand-foreground/80">
                    Cuéntanos sobre tu proyecto y te enviamos una propuesta a medida.
                  </p>
                </div>
                <div className="p-5 space-y-3.5">
                  <div className="space-y-1.5">
                    <Label htmlFor="empresa">Empresa *</Label>
                    <Input
                      id="empresa"
                      value={form.empresa}
                      onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                      placeholder="Nombre de la empresa"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="contacto">Contacto</Label>
                      <Input
                        id="contacto"
                        value={form.contacto}
                        onChange={(e) => setForm({ ...form, contacto: e.target.value })}
                        placeholder="Nombre"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="pares">Pares aprox.</Label>
                      <Input
                        id="pares"
                        type="number"
                        value={form.pares}
                        onChange={(e) => setForm({ ...form, pares: e.target.value })}
                        placeholder="25"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Correo *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="compras@empresa.com"
                    />
                  </div>
                  <Button
                    onClick={enviar}
                    disabled={!form.empresa || !form.email || estado === "enviando"}
                    className="w-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold h-11"
                  >
                    {estado === "enviando" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar solicitud
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            {estado === "exito" && (
              <motion.div
                key="exito"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
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
                <h2 className="font-display font-extrabold text-2xl text-foreground mb-2">
                  ¡Solicitud recibida!
                </h2>
                <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
                  Gracias, <span className="font-semibold text-foreground">{form.empresa}</span>.
                  Nuestro equipo corporativo te contactará en{" "}
                  <span className="font-semibold text-brand">{form.email}</span> en menos de 4
                  horas hábiles con tu cotización a medida.
                </p>
                <Button onClick={cerrar} className="bg-brand text-brand-foreground hover:bg-brand/90 font-semibold">
                  Entendido
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}
