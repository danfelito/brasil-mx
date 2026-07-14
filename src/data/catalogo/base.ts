export type Marca = "Spessoto" | "New Holland";
export type MaterialOption = { nombre: string; nombrePt: string; color: string; hex: string };
export type Producto = {
  id: string; codigo: string; nombre: string; marca: Marca;
  linea: "dama" | "caballero" | "unisex"; tipo: string; categoria: string;
  precio: number; imagen: string; materiales: MaterialOption[]; tallas: number[];
  suela: string; seguridad: string[]; uso: string; usoTags: string[];
  descripcion: string; destacados: string[]; rating: number; reseñas: number;
  destacado?: boolean; nuevo?: boolean;
};

export const M = {
  napaCafe: { nombre: "Napa Café", nombrePt: "NAPA CAFÉ", color: "Café", hex: "#4a2c17" },
  napaHavana: { nombre: "Napa Havana", nombrePt: "NAPA HAVANA", color: "Havana", hex: "#8a4f2a" },
  napaToscana: { nombre: "Napa Toscana", nombrePt: "NAPA TOSCANA", color: "Toscana", hex: "#744326" },
  floaterBrown: { nombre: "Floater Brown", nombrePt: "FLOATER BROWN", color: "Brown", hex: "#54382c" },
  floaterCafe: { nombre: "Floater Café", nombrePt: "FLOATER CAFÉ", color: "Café", hex: "#3f281f" },
  floaterConhaque: { nombre: "Floater Coñac", nombrePt: "FLOATER CONHAQUE", color: "Coñac", hex: "#a94f1d" },
  nobuckCaramelo: { nombre: "Nobuck Caramelo", nombrePt: "NOBUCK CARAMELO", color: "Caramelo", hex: "#d0a044" },
  nobuckChocolate: { nombre: "Nobuck Chocolate", nombrePt: "NOBUCK CHOCOLATE", color: "Chocolate", hex: "#3a241e" },
  nobuckMarrom: { nombre: "Nobuck Marrón", nombrePt: "NOBUCK MARROM", color: "Marrón", hex: "#754124" },
  nobuckPreto: { nombre: "Nobuck Negro", nombrePt: "NOBUCK PRETO", color: "Negro", hex: "#151515" },
  nobuckAzul: { nombre: "Nobuck Azul Marino", nombrePt: "NOBUCK AZUL", color: "Azul", hex: "#14213d" },
  nobuckZinco: { nombre: "Nobuck Zinc", nombrePt: "NOBUCK ZINCO", color: "Zinc", hex: "#9b8d78" },
  crazyCafe: { nombre: "Crazy Café", nombrePt: "CRAZY CAFÉ", color: "Café", hex: "#3a2b24" },
  crazyPreto: { nombre: "Crazy Negro", nombrePt: "CRAZY PRETO", color: "Negro", hex: "#101010" },
  cafeAreia: { nombre: "Café / Arena", nombrePt: "CAFÉ / AREIA", color: "Bicolor", hex: "#94744d" },
  camurcaCafe: { nombre: "Gamuza Café", nombrePt: "CAMURÇA CAFÉ", color: "Café", hex: "#5b3b28" },
  camurcaFerrugem: { nombre: "Gamuza Óxido", nombrePt: "CAMURÇA FERRUGEM", color: "Óxido", hex: "#9a4b2c" },
} satisfies Record<string, MaterialOption>;

export const img = (catalogo: "serdir" | "bretao", pagina: number) => `/api/catalog-image?catalog=${catalogo}&page=${pagina}`;
export const rango = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
export const base = { marca: "New Holland" as const, rating: 0, reseñas: 0 };
