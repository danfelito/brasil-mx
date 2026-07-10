"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Truck,
  CreditCard,
  ShieldCheck,
  RefreshCw,
  Receipt,
  Building2,
  Clock,
  Phone,
  Mail,
} from "lucide-react";
import { SpessotoMark, NewHollandMark } from "./Logo";

const POLITICAS = [
  {
    icon: Building2,
    titulo: "1. Ventas B2B y pedidos mínimos",
    color: "var(--brand)",
    items: [
      "Brasil MX es un distribuidor B2B enfocado en empresas, constructoras, agrícolas e industria.",
      "Pedido mínimo por orden: 10 pares (mezcla de modelos, tallas y marcas libre).",
      "Para pedidos de 10 a 49 pares: precio de catálogo en MXN.",
      "Para 50 a 99 pares: 5% de descuento por volumen.",
      "Para 100 pares o más: cotización personalizada con descuento corporativo.",
    ],
  },
  {
    icon: FileText,
    titulo: "2. Solicitud de cotización",
    color: "var(--brand)",
    items: [
      "Toda compra inicia con una cotización: vía formulario de la web, correo o teléfono.",
      "Indica modelos, materiales, tallas por trabajador y cantidad de pares.",
      "Respuesta garantizada en menos de 4 horas hábiles.",
      "La cotización incluye precio unitario, descuento por volumen, envío y fecha de entrega estimada.",
      "Validez de la cotización: 15 días naturales.",
    ],
  },
  {
    icon: CreditCard,
    titulo: "3. Formas de pago",
    color: "var(--brand)",
    items: [
      "Transferencia bancaria (SPEI) en MXN al tipo de cambio del día de facturación.",
      "50% de anticipo al confirmar el pedido; 50% contra entrega (o 100% anticipado para envíos foráneos).",
      "Empresas con crédito aprobado: pago a 15, 30 o 45 días según convenio.",
      "No se cobra ningún monto hasta confirmar disponibilidad de tallas y materiales.",
      "Factura electrónica (CFDI) emitida a nombre de la empresa con su RFC.",
    ],
  },
  {
    icon: Truck,
    titulo: "4. Envíos y entregas",
    color: "var(--amber-accent)",
    items: [
      "Envío a todo México. Gratis en pedidos superiores a $200 MXN dentro de la zona metropolitana.",
      "Entrega en CDMX, Estado de México y principales ciudades: 2 a 4 días hábiles.",
      "Zonas foráneas y rurales: 4 a 8 días hábiles, sujeto a paquetería.",
      "Entrega directa en obra, almacén o bodega del cliente (solicítalo en la cotización).",
      "Número de rastreo enviado por correo al despachar el pedido.",
    ],
  },
  {
    icon: Clock,
    titulo: "5. Disponibilidad y tiempos de producción",
    color: "var(--amber-accent)",
    items: [
      "Las tallas marcadas en cada modelo del catálogo son las disponibles al momento de la cotización.",
      "Modelos New Holland con licencia Spessoto: producción bajo pedido, 15 a 25 días hábiles si la talla no está en stock.",
      "Línea premium Spessoto: entrega inmediata desde inventario para tallas estándar (38–45).",
      "Se confirma disponibilidad real antes de cobrar el anticipo.",
    ],
  },
  {
    icon: ShieldCheck,
    titulo: "6. Garantía de calidad y certificación",
    color: "var(--brand)",
    items: [
      "Todo el calzado cumple la norma EPI de seguridad (protección contra impacto, compresión y deslizamiento).",
      "Garantía de fabricación de 90 días por defectos de materiales o costura (no cubre desgaste normal).",
      "Modelos con puntera de acero certificados para impacto de 200 J.",
      "Certificados de cumplimiento disponibles para auditorías de seguridad laboral bajo solicitud.",
    ],
  },
  {
    icon: RefreshCw,
    titulo: "7. Cambios y devoluciones",
    color: "var(--amber-accent)",
    items: [
      "Cambio de talla sin costo dentro de los primeros 15 días, conservando el calzado sin uso y empaque original.",
      "Devolución por defecto de fabricación: reposición o reembolso dentro de los 30 días.",
      "No se aceptan devoluciones por calzado usado o dañado por mal uso.",
      "Los fletes de cambio por talla corren por cuenta del cliente; los de defecto de fábrica por Brasil MX.",
    ],
  },
  {
    icon: Receipt,
    titulo: "8. Facturación y datos fiscales",
    color: "var(--brand)",
    items: [
      "Factura CFDI 4.0 emitida por Brasil MX a nombre de la empresa compradora.",
      "Proporciona razón social, RFC, régimen fiscal, código postal y uso de CFDI al confirmar el pedido.",
      "La factura se envía por correo en un máximo de 3 días hábiles tras la entrega.",
      "Precios en MXN; el pago se realiza al tipo de cambio publicado por Banxico del día.",
    ],
  },
];

export function PoliticasSection() {
  return (
    <section id="politicas" className="py-16 sm:py-24 bg-muted/30 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-light text-brand px-3 py-1 text-xs font-semibold mb-3">
            <FileText className="h-3.5 w-3.5" />
            Políticas de compra B2B
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-tight">
            Políticas comerciales
          </h2>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg">
            Condiciones claras para empresas. Pedido mínimo, cotización, pago, envío, garantía y
            facturación. Brasil MX — distribuidor B2B en México de las marcas Spessoto y New Holland.
          </p>
          <div className="mt-5 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <SpessotoMark className="h-6 w-6" />
              <span className="text-xs font-bold text-foreground">SPESSOTO</span>
            </div>
            <div className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2">
              <NewHollandMark className="h-5 w-5" />
              <span className="text-xs font-bold text-[#003f87]">NEW HOLLAND</span>
            </div>
          </div>
        </div>

        {/* Grid de políticas */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
          {POLITICAS.map((p, i) => (
            <motion.div
              key={p.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (i % 2) * 0.05 }}
              className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 mb-4">
                <div
                  className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `color-mix(in oklch, ${p.color} 14%, transparent)` }}
                >
                  <p.icon className="h-5 w-5" style={{ color: p.color }} />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-foreground leading-tight pt-1.5">
                  {p.titulo}
                </h3>
              </div>
              <ul className="space-y-2">
                {p.items.map((item, k) => (
                  <li key={k} className="flex items-start gap-2 text-sm text-foreground/75 leading-relaxed">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: p.color }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bloque de contacto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-10 rounded-3xl bg-brand text-brand-foreground p-8 sm:p-10 relative overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-amber-accent/15 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: "repeating-linear-gradient(135deg, #fff 0, #fff 1px, transparent 1px, transparent 22px)" }}
          />
          <div className="relative grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight mb-2">
                ¿Listo para equipar a tu equipo?
              </h3>
              <p className="text-brand-foreground/80 text-sm sm:text-base">
                Solicita tu cotización B2B personalizada. Atendemos empresas en todo México con
                calzado de seguridad certificado Spessoto y New Holland.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
              <a
                href="tel:2294648962"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-accent text-amber-foreground font-bold px-5 py-3 hover:bg-amber-accent/90 transition-colors"
              >
                <Phone className="h-4 w-4" />
                229 464 8962
              </a>
              <a
                href="mailto:ventas@brasilmx.mx"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-foreground/10 border border-brand-foreground/20 text-brand-foreground font-semibold px-5 py-3 hover:bg-brand-foreground/15 transition-colors"
              >
                <Mail className="h-4 w-4" />
                ventas@brasilmx.mx
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
