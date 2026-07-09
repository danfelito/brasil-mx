import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type ItemPedido = {
  productoId: string;
  codigo: string;
  nombre: string;
  material: string;
  talla: number;
  cantidad: number;
  precio: number;
};

type BodyPedido = {
  items: ItemPedido[];
  cliente: {
    nombre: string;
    email: string;
    telefono?: string;
    empresa?: string;
    direccion?: string;
  };
  subtotal: number;
  envio: number;
  total: number;
};

// Almacén simple en memoria para los pedidos (demo)
const pedidos: Array<BodyPedido & { id: string; fecha: string; estado: string }> = [];

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BodyPedido;

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { ok: false, error: "El carrito está vacío" },
        { status: 400 }
      );
    }
    if (!body.cliente?.nombre || !body.cliente?.email) {
      return NextResponse.json(
        { ok: false, error: "Faltan datos del cliente (nombre y email son obligatorios)" },
        { status: 400 }
      );
    }

    // Recalcular el total en el servidor para evitar manipulaciones
    const subtotalCalc = body.items.reduce(
      (acc, i) => acc + i.precio * i.cantidad,
      0
    );
    const envioCalc = subtotalCalc > 200 || subtotalCalc === 0 ? 0 : 15;
    const totalCalc = subtotalCalc + envioCalc;

    const id = `NH-${Date.now().toString(36).toUpperCase()}`;
    const pedido = {
      ...body,
      subtotal: Number(subtotalCalc.toFixed(2)),
      envio: envioCalc,
      total: Number(totalCalc.toFixed(2)),
      id,
      fecha: new Date().toISOString(),
      estado: "Recibido",
    };

    pedidos.push(pedido);

    return NextResponse.json({
      ok: true,
      pedidoId: id,
      estado: "Recibido",
      total: pedido.total,
      fecha: pedido.fecha,
      mensaje: `Pedido ${id} recibido. Nuestro equipo de ventas te contactará en ${body.cliente.email} para confirmar la disponibilidad de tallas y el pago.`,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "No se pudo procesar el pedido" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ total: pedidos.length, pedidos });
}
