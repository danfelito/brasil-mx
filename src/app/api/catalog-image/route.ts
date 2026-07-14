import { readFile } from "node:fs/promises";
import path from "node:path";

const CATALOGOS = new Set(["serdir", "bretao"]);

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const catalogo = searchParams.get("catalog") ?? "";
  const pagina = searchParams.get("page") ?? "";

  if (!CATALOGOS.has(catalogo) || !/^\d{1,2}$/.test(pagina)) {
    return Response.json({ error: "Parámetros de catálogo inválidos" }, { status: 400 });
  }

  const numeroPagina = Number(pagina);
  const limite = catalogo === "serdir" ? 24 : 9;

  if (numeroPagina < 1 || numeroPagina > limite) {
    return Response.json({ error: "Página fuera de rango" }, { status: 404 });
  }

  const archivo = path.join(
    process.cwd(),
    "extracted_pdfs",
    `${catalogo}_pages`,
    `page_${String(numeroPagina).padStart(2, "0")}.png`
  );

  try {
    const imagen = await readFile(archivo);
    return new Response(imagen, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return Response.json({ error: "Imagen de catálogo no encontrada" }, { status: 404 });
  }
}
