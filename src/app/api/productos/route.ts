import { NextResponse } from "next/server";
import { productos } from "@/data/productos";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({
    total: productos.length,
    productos,
  });
}
