// Catálogo de calzado de seguridad — Brasil MX (distribuidor B2B en México)
// Marcas: Spessoto (marca principal, desde 1915) y New Holland (línea con licencia).
// Fuente de datos:
//  - Tabela NH 02-2026 Mexico 10.xlsx  → modelos New Holland, tallas exactas y precios MXN
//  - Catálogos NH 2026 (Bretão / SER-Dir)   → imagen y características de cada modelo NH
//  - lojaspessoto.com.br/categoria/linha-premium/ → línea premium Spessoto (Chelsea, Palermo, Vira Francesa)
// Precios en MXN (tipo de cambio: 1 USD = 17.54 MXN, actualizado 2026-07-10). Materiales traducidos del portugués al español.

export type Marca = "Spessoto" | "New Holland";

export type MaterialOption = {
  nombre: string; // nombre en español
  nombrePt: string; // nombre original en portugués
  color: string; // nombre del color
  hex: string; // color representativo
};

export type Producto = {
  id: string;
  codigo: string; // ej. NHF 2243
  nombre: string; // nombre comercial en español
  marca: Marca;
  linea: "dama" | "caballero" | "unisex";
  tipo: string; // botina, bota
  categoria: string; // premium, ejecutiva, industrial, agrícola, económica
  precio: number; // MXN
  imagen: string; // ruta de imagen
  materiales: MaterialOption[];
  tallas: number[]; // tallas disponibles exactas por modelo
  suela: string; // tecnología de suela
  seguridad: string[]; // características de seguridad
  uso: string; // uso recomendado
  usoTags: string[]; // etiquetas de uso (obra, agrícola, industrial...)
  descripcion: string;
  destacados: string[]; // características más relevantes
  rating: number;
  reseñas: number;
  destacado?: boolean;
  nuevo?: boolean;
};

// Paleta de materiales (Portugués → Español + color representativo)
const M: Record<string, MaterialOption> = {
  napaHavana: { nombre: "Napa Havana", nombrePt: "NAPA HAVANA", color: "Havana", hex: "#6b4226" },
  napaToscana: { nombre: "Napa Toscana", nombrePt: "NAPA TOSCANA", color: "Toscana", hex: "#8b5a2b" },
  napaCafe: { nombre: "Napa Café", nombrePt: "NAPA CAFÉ", color: "Café", hex: "#4a2c17" },
  floaterBrown: { nombre: "Floater Brown", nombrePt: "FLOATER BROWN", color: "Brown", hex: "#5d4037" },
  floaterCafe: { nombre: "Floater Café", nombrePt: "FLOATER CAFÉ", color: "Café", hex: "#4e342e" },
  floaterMel: { nombre: "Floater Miel", nombrePt: "FLOATER MEL", color: "Miel", hex: "#c8a35d" },
  floaterConhaque: { nombre: "Floater Coñac", nombrePt: "FLOATER CONHAQUE", color: "Coñac", hex: "#7c3a12" },
  nobuckCaramelo: { nombre: "Nobuck Caramelo", nombrePt: "NOBUCK CARAMELO", color: "Caramelo", hex: "#d2b48c" },
  nobuckChocolate: { nombre: "Nobuck Chocolate", nombrePt: "NOBUCK CHOCOLATE", color: "Chocolate", hex: "#3e2723" },
  nobuckMarrom: { nombre: "Nobuck Marrón", nombrePt: "NOBUCK MARROM", color: "Marrón", hex: "#6d4c33" },
  nobuckPreto: { nombre: "Nobuck Negro", nombrePt: "NOBUCK PRETO", color: "Negro", hex: "#1a1a1a" },
  nobuckAzulMarinho: { nombre: "Nobuck Azul Marino", nombrePt: "NOBUCK AZUL MARINHO", color: "Azul Marino", hex: "#1a237e" },
  nobuckZinco: { nombre: "Nobuck Zinc", nombrePt: "NOBUCK ZINCO", color: "Zinc", hex: "#7a7a7a" },
  nobuckTaupe: { nombre: "Nobuck Taupe", nombrePt: "NOBUCK TAUPE", color: "Taupe", hex: "#8a7d6b" },
  niobuckChocolate: { nombre: "Niobuck Chocolate", nombrePt: "NIOBUCK CHOCOLATE", color: "Chocolate", hex: "#3e2723" },
  crazyCafe: { nombre: "Crazy Café", nombrePt: "CRAZY CAFÉ", color: "Café", hex: "#3d2817" },
  crazyPreto: { nombre: "Crazy Negro", nombrePt: "CRAZY PRETO", color: "Negro", hex: "#161616" },
  fossilChocolate: { nombre: "Fósil Chocolate", nombrePt: "FOSSIL CHOCOLATE", color: "Chocolate", hex: "#4a3526" },
  fossilTan: { nombre: "Fósil Tan", nombrePt: "FOSSIL TAN", color: "Tan", hex: "#9c6b3f" },
  cafeAreia: { nombre: "Café / Arena", nombrePt: "CAFÉ / AREIA", color: "Bicolor", hex: "#a07b4e" },
  camurcaCafe: { nombre: "Camurça Café", nombrePt: "CAMURÇA CAFÉ", color: "Café", hex: "#5a3d22" },
  camurcaFerrugem: { nombre: "Camurça Ferrugem", nombrePt: "CAMURÇA FERRUGEM", color: "Ferrugem", hex: "#9c4a2a" },
};

// Características de seguridad comunes (en español)
const SEG = {
  punteraAcero: "Puntera de acero contra impacto (200 J)",
  punteraComposite: "Puntera composite no metálica",
  antideslizante: "Suela antideslizante",
  antiperforante: "Plantilla antiperforante",
  puDoble: "Suela de PU inyectado de doble densidad",
  puInyectado: "Suela de PU inyectado",
  cauchoVulcanizado: "Suela de caucho natural vulcanizada",
  latexCosida: "Suela de látex cosida",
  aislamientoElectrico: "Aislamiento eléctrico",
  costuraManual: "Costura manual reforzada",
  resistenteAceites: "Resistente a aceites y grasas",
  amortiguacion: "Amortiguación de impactos",
  viraFrancesa: "Construcción Vira Francesa vulcanizada",
  fullInject: "Construcción Full Inject monoblock",
};

export const productos: Producto[] = [
  // ====================== LÍNEA NEW HOLLAND - DAMA ======================
  // --- NHF: línea dama / ejecutiva / premium ---
  {
    id: "nhf-2243",
    codigo: "NHF 2243",
    nombre: "Premium Vira Francesa Dama",
    marca: "New Holland",
    linea: "dama",
    tipo: "Botina",
    categoria: "Premium",
    precio: 684, // 39 USD
    imagen: "/products/boot-vira-francesa.png",
    materiales: [M.napaHavana, M.napaToscana],
    tallas: [41, 42, 43, 44, 45, 46],
    suela: "Caucho natural vulcanizada con entresuela",
    seguridad: [SEG.viraFrancesa, SEG.cauchoVulcanizado, SEG.costuraManual, SEG.antideslizante, SEG.resistenteAceites],
    uso: "Trabajo profesional ejecutivo y de campo",
    usoTags: ["Obra", "Campo", "Ejecutivo"],
    descripcion:
      "Botina premium para dama con construcción Vira Francesa. Cabedal en cuero Napa de primera calidad vulcanizado con sola de caucho natural y entresuela, reforzado con segunda costura manual. Diseño elegante y resistente para uso profesional exigente.",
    destacados: [
      "Construcción Vira Francesa vulcanizada de alta durabilidad",
      "Cuero Napa premium con costura manual reforzada",
      "Suela de caucho natural antideslizante y resistente a aceites",
    ],
    rating: 4.9,
    reseñas: 128,
    destacado: true,
    nuevo: true,
  },
  {
    id: "nhf-2284",
    codigo: "NHF 2284",
    nombre: "Premium Floater Dama",
    marca: "New Holland",
    linea: "dama",
    tipo: "Botina",
    categoria: "Premium",
    precio: 684, // 39 USD
    imagen: "/products/boot-floater-brown.png",
    materiales: [M.floaterBrown, M.floaterCafe, M.nobuckCaramelo],
    tallas: [41, 42, 43, 44, 45, 46],
    suela: "Caucho natural vulcanizada",
    seguridad: [SEG.viraFrancesa, SEG.cauchoVulcanizado, SEG.costuraManual, SEG.antideslizante, SEG.resistenteAceites],
    uso: "Trabajo profesional y de campo",
    usoTags: ["Obra", "Campo", "Ejecutivo"],
    descripcion:
      "Botina premium Vira Francesa en cuero Floater y Nobuck. Construcción vulcanizada con costura manual para máxima durabilidad en entornos de trabajo exigentes.",
    destacados: [
      "Construcción vulcanizada Vira Francesa",
      "Disponible en Floater y Nobuck",
      "Suela de caucho natural resistente a aceites",
    ],
    rating: 4.8,
    reseñas: 96,
    destacado: true,
  },
  {
    id: "nhf-2520",
    codigo: "NHF 2520",
    nombre: "Vira Francesa Dama",
    marca: "New Holland",
    linea: "dama",
    tipo: "Botina",
    categoria: "Premium",
    precio: 954, // 54.4 USD
    imagen: "/products/boot-vira-francesa.png",
    materiales: [M.floaterBrown, M.nobuckCaramelo],
    tallas: [46],
    suela: "Caucho natural vulcanizada",
    seguridad: [SEG.viraFrancesa, SEG.cauchoVulcanizado, SEG.costuraManual, SEG.antideslizante, SEG.amortiguacion, SEG.resistenteAceites],
    uso: "Trabajo pesado de obra y campo",
    usoTags: ["Obra", "Campo", "Industrial", "Pesado"],
    descripcion:
      "Botina Vira Francesa para dama, línea premium de máxima resistencia. Construcción vulcanizada con costura manual, ideal para trabajos pesados que exigen protección y durabilidad superior.",
    destacados: [
      "Línea premium Vira Francesa de máxima resistencia",
      "Protección contra impactos y compresión",
      "Suela vulcanizada antideslizante y resistente a aceites",
    ],
    rating: 4.9,
    reseñas: 154,
    destacado: true,
  },
  {
    id: "nhf-2295",
    codigo: "NHF 2295",
    nombre: "Crazy Premium Dama",
    marca: "New Holland",
    linea: "dama",
    tipo: "Botina",
    categoria: "Premium",
    precio: 864, // 49.2 USD
    imagen: "/products/boot-crazy-dark.png",
    materiales: [M.crazyCafe, M.crazyPreto, M.nobuckCaramelo],
    tallas: [34, 35, 36, 37],
    suela: "Caucho natural vulcanizada",
    seguridad: [SEG.cauchoVulcanizado, SEG.antideslizante, SEG.amortiguacion, SEG.resistenteAceites],
    uso: "Trabajo pesado industrial",
    usoTags: ["Industrial", "Obra", "Pesado"],
    descripcion:
      "Botina premium para dama en cuero Crazy con suela vulcanizada de caucho natural. Máxima resistencia para trabajos pesados con protección superior.",
    destacados: [
      "Cuero Crazy de máxima resistencia",
      "Suela vulcanizada de caucho natural",
      "Protección superior para trabajo pesado",
    ],
    rating: 4.8,
    reseñas: 67,
  },
  {
    id: "nhf-2507",
    codigo: "NHF 2507",
    nombre: "Napa Ejecutiva Dama",
    marca: "New Holland",
    linea: "dama",
    tipo: "Botina",
    categoria: "Ejecutiva",
    precio: 712, // 40.6 USD
    imagen: "/products/boot-women-napa.png",
    materiales: [M.napaCafe, M.napaHavana],
    tallas: [41, 42, 43, 44, 45, 46],
    suela: "PU inyectado de doble densidad",
    seguridad: [SEG.puDoble, SEG.antideslizante, SEG.amortiguacion, SEG.resistenteAceites],
    uso: "Uso profesional diario y de oficina industrial",
    usoTags: ["Oficina", "Industrial", "Ejecutivo"],
    descripcion:
      "Botina ejecutiva para dama en cuero Napa suave. Suela de PU inyectado de doble densidad que ofrece confort durante toda la jornada laboral con excelente amortiguación.",
    destacados: [
      "Cuero Napa suave de alta calidad",
      "Suela PU doble densidad con amortiguación",
      "Diseño elegante para uso profesional diario",
    ],
    rating: 4.7,
    reseñas: 84,
  },
  {
    id: "nhf-2524",
    codigo: "NHF 2524",
    nombre: "Napa Clásica Dama",
    marca: "New Holland",
    linea: "dama",
    tipo: "Botina",
    categoria: "Ejecutiva",
    precio: 747, // 42.6 USD
    imagen: "/products/boot-women-napa.png",
    materiales: [M.napaHavana, M.napaToscana],
    tallas: [41, 42, 43, 44, 45, 46],
    suela: "PU inyectado de doble densidad",
    seguridad: [SEG.puDoble, SEG.antideslizante, SEG.amortiguacion, SEG.resistenteAceites],
    uso: "Uso profesional y comercial",
    usoTags: ["Oficina", "Comercial", "Ejecutivo"],
    descripcion:
      "Botina clásica para dama en cuero Napa con acabado premium. Suela de PU doble densidad que combina confort y seguridad para el día a día profesional.",
    destacados: [
      "Cuero Napa con acabado premium",
      "Suela PU doble densidad antideslizante",
      "Confort para jornadas largas",
    ],
    rating: 4.7,
    reseñas: 72,
  },
  {
    id: "nhf-2525",
    codigo: "NHF 2525",
    nombre: "Napa Tradicional Dama",
    marca: "New Holland",
    linea: "dama",
    tipo: "Botina",
    categoria: "Ejecutiva",
    precio: 747, // 42.6 USD
    imagen: "/products/boot-women-napa.png",
    materiales: [M.napaCafe, M.napaHavana, M.napaToscana],
    tallas: [41, 42, 43, 44, 45, 46],
    suela: "PU inyectado de doble densidad",
    seguridad: [SEG.puDoble, SEG.antideslizante, SEG.amortiguacion, SEG.resistenteAceites],
    uso: "Uso profesional y comercial",
    usoTags: ["Oficina", "Comercial", "Ejecutivo"],
    descripcion:
      "Botina tradicional para dama disponible en tres tonos de cuero Napa. Suela de PU doble densidad con excelente amortiguación y resistencia.",
    destacados: [
      "Tres tonos de cuero Napa disponibles",
      "Suela PU doble densidad con amortiguación",
      "Diseño versátil para múltiples entornos",
    ],
    rating: 4.6,
    reseñas: 61,
  },
  {
    id: "nhf-2296",
    codigo: "NHF 2296",
    nombre: "Crazy Dama",
    marca: "New Holland",
    linea: "dama",
    tipo: "Botina",
    categoria: "Industrial",
    precio: 737, // 42 USD
    imagen: "/products/boot-crazy-dark.png",
    materiales: [M.crazyCafe, M.crazyPreto, M.nobuckCaramelo],
    tallas: [34, 35, 36, 37, 46],
    suela: "PU inyectado",
    seguridad: [SEG.puInyectado, SEG.antideslizante, SEG.resistenteAceites, SEG.amortiguacion],
    uso: "Ambientes industriales y de obra",
    usoTags: ["Industrial", "Obra", "Campo"],
    descripcion:
      "Botina para dama en cuero Crazy de aspecto robusto y resistente. Suela de PU inyectado antideslizante, ideal para entornos industriales con riesgo de deslizamiento.",
    destacados: [
      "Cuero Crazy de alta resistencia al desgaste",
      "Suela PU inyectado antideslizante",
      "Tres tonos disponibles incluyendo Nobuck Caramelo",
    ],
    rating: 4.6,
    reseñas: 58,
  },
  {
    id: "nhf-2550",
    codigo: "NHF 2550",
    nombre: "Bicolor Dama",
    marca: "New Holland",
    linea: "dama",
    tipo: "Botina",
    categoria: "Económica",
    precio: 421, // 24 USD
    imagen: "/products/nh/boot-bicolor-cafe-arena.png",
    materiales: [M.cafeAreia],
    tallas: [34, 35, 36, 37, 45, 46],
    suela: "PU inyectado",
    seguridad: [SEG.puInyectado, SEG.antideslizante, SEG.resistenteAceites],
    uso: "Uso ligero y comercial",
    usoTags: ["Comercial", "Oficina", "Ligero"],
    descripcion:
      "Botina económica para dama en combinación bicolor Café/Arena. Opción accesible con suela de PU inyectado antideslizante para trabajos de carga ligera.",
    destacados: [
      "Mejor relación calidad-precio del catálogo",
      "Diseño bicolor Café/Arena",
      "Suela PU inyectado antideslizante",
    ],
    rating: 4.4,
    reseñas: 43,
  },
  {
    id: "nhf-2519d",
    codigo: "NHF 2519D",
    nombre: "Floater Dama",
    marca: "New Holland",
    linea: "dama",
    tipo: "Botina",
    categoria: "Industrial",
    precio: 662, // 37.8 USD
    imagen: "/products/boot-floater-brown.png",
    materiales: [M.floaterCafe],
    tallas: [34, 35, 36, 46],
    suela: "PU inyectado",
    seguridad: [SEG.puInyectado, SEG.antideslizante, SEG.resistenteAceites, SEG.amortiguacion],
    uso: "Trabajo industrial y de almacén",
    usoTags: ["Industrial", "Almacén", "Obra"],
    descripcion:
      "Botina para dama en cuero Floater Café. Suela de PU inyectado con amortiguación, diseñada para jornadas de trabajo en entornos industriales.",
    destacados: [
      "Cuero Floater resistente",
      "Suela PU inyectado con amortiguación",
      "Confort para trabajo industrial continuo",
    ],
    rating: 4.5,
    reseñas: 37,
  },
  {
    id: "nhf-2552",
    codigo: "NHF 2552",
    nombre: "Fósil Dama",
    marca: "New Holland",
    linea: "dama",
    tipo: "Botina",
    categoria: "Industrial",
    precio: 730, // 41.6 USD
    imagen: "/products/nh/boot-fossil-chocolate.png",
    materiales: [M.fossilChocolate, M.fossilTan],
    tallas: [34, 35, 36, 46],
    suela: "PU inyectado",
    seguridad: [SEG.puInyectado, SEG.antideslizante, SEG.resistenteAceites, SEG.amortiguacion],
    uso: "Trabajo industrial y de campo",
    usoTags: ["Industrial", "Campo", "Obra"],
    descripcion:
      "Botina para dama en cuero Fósil con acabado texturizado único. Suela de PU inyectado antideslizante, combina estilo y protección para entornos industriales.",
    destacados: [
      "Cuero Fósil con acabado texturizado",
      "Tonos Chocolate y Tan disponibles",
      "Suela PU inyectado antideslizante",
    ],
    rating: 4.5,
    reseñas: 34,
  },
  {
    id: "nhf-3023",
    codigo: "NHF 3023",
    nombre: "Nobuck Dama",
    marca: "New Holland",
    linea: "dama",
    tipo: "Botina",
    categoria: "Industrial",
    precio: 684, // 39 USD
    imagen: "/products/boot-nobuck-caramel.png",
    materiales: [M.crazyCafe, M.crazyPreto, M.nobuckCaramelo],
    tallas: [34, 35, 36, 45, 46],
    suela: "PU inyectado",
    seguridad: [SEG.puInyectado, SEG.antideslizante, SEG.resistenteAceites, SEG.amortiguacion],
    uso: "Trabajo industrial y de almacén",
    usoTags: ["Industrial", "Almacén", "Obra"],
    descripcion:
      "Botina para dama en cuero Crazy y Nobuck. Suela de PU inyectado antideslizante, versátil para múltiples entornos de trabajo industrial.",
    destacados: [
      "Disponible en Crazy y Nobuck Caramelo",
      "Suela PU inyectado antideslizante",
      "Versátil para múltiples entornos",
    ],
    rating: 4.5,
    reseñas: 41,
  },
  {
    id: "nhf-2545",
    codigo: "NHF 2545",
    nombre: "Crazy Clásica Dama",
    marca: "New Holland",
    linea: "dama",
    tipo: "Botina",
    categoria: "Industrial",
    precio: 715, // 40.8 USD
    imagen: "/products/boot-crazy-dark.png",
    materiales: [M.crazyCafe, M.crazyPreto, M.nobuckCaramelo],
    tallas: [34, 35, 36, 37, 38, 39, 40],
    suela: "PU inyectado",
    seguridad: [SEG.puInyectado, SEG.antideslizante, SEG.resistenteAceites, SEG.amortiguacion],
    uso: "Trabajo industrial general",
    usoTags: ["Industrial", "Obra", "Almacén"],
    descripcion:
      "Botina clásica para dama en cuero Crazy con acabado resistente. Suela de PU inyectado para trabajo industrial general con buena relación costo-beneficio.",
    destacados: [
      "Cuero Crazy resistente al desgaste",
      "Suela PU inyectado antideslizante",
      "Excelente relación costo-beneficio",
    ],
    rating: 4.5,
    reseñas: 38,
  },
  {
    id: "nhf-2543",
    codigo: "NHF 2543",
    nombre: "Nobuck Clásica Dama",
    marca: "New Holland",
    linea: "dama",
    tipo: "Botina",
    categoria: "Industrial",
    precio: 715, // 40.8 USD
    imagen: "/products/boot-nobuck-caramel.png",
    materiales: [M.crazyCafe, M.nobuckCaramelo, M.nobuckZinco],
    tallas: [41, 42, 43, 44, 45, 46],
    suela: "PU inyectado",
    seguridad: [SEG.puInyectado, SEG.antideslizante, SEG.resistenteAceites, SEG.amortiguacion],
    uso: "Trabajo industrial general",
    usoTags: ["Industrial", "Obra", "Almacén"],
    descripcion:
      "Botina para dama en cuero Crazy y Nobuck, incluyendo el tono exclusivo Nobuck Zinc. Suela de PU inyectado antideslizante para uso industrial versátil.",
    destacados: [
      "Tono exclusivo Nobuck Zinc",
      "Suela PU inyectado antideslizante",
      "Cuero Nobuck y Crazy combinados",
    ],
    rating: 4.6,
    reseñas: 45,
  },
  {
    id: "nhf-2213",
    codigo: "NHF 2213",
    nombre: "Floater Clásica Dama",
    marca: "New Holland",
    linea: "dama",
    tipo: "Botina",
    categoria: "Industrial",
    precio: 644, // 36.8 USD
    imagen: "/products/boot-floater-brown.png",
    materiales: [M.floaterBrown, M.floaterMel],
    tallas: [34, 35, 36, 37, 46],
    suela: "Caucho natural vulcanizada",
    seguridad: [SEG.cauchoVulcanizado, SEG.antideslizante, SEG.amortiguacion, SEG.resistenteAceites],
    uso: "Trabajo de campo e industrial",
    usoTags: ["Campo", "Industrial", "Obra"],
    descripcion:
      "Botina clásica para dama en cuero Floater con suela vulcanizada de caucho natural. Resistente y duradera para trabajo de campo e industrial.",
    destacados: [
      "Cuero Floater en Brown y Miel",
      "Suela vulcanizada de caucho natural",
      "Durabilidad para trabajo de campo",
    ],
    rating: 4.6,
    reseñas: 52,
  },

  // ====================== LÍNEA NEW HOLLAND - CABALLERO ======================
  {
    id: "enh-2201",
    codigo: "ENH 2201",
    nombre: "Cascavel",
    marca: "New Holland",
    linea: "caballero",
    tipo: "Bota",
    categoria: "Industrial",
    precio: 522, // 29.8 USD
    imagen: "/products/nh/boot-cascavel-black.png",
    materiales: [M.floaterCafe, M.nobuckAzulMarinho, M.nobuckCaramelo, M.niobuckChocolate, M.nobuckMarrom, M.nobuckPreto],
    tallas: [38, 39, 40, 41, 42, 43, 44, 45, 46],
    suela: "PU inyectado de doble densidad",
    seguridad: [SEG.puDoble, SEG.punteraAcero, SEG.antideslizante, SEG.aislamientoElectrico, SEG.resistenteAceites],
    uso: "Construcción civil e industrial pesada",
    usoTags: ["Obra", "Industrial", "Construcción", "Pesado"],
    descripcion:
      "La bota Cascavel es el modelo estrella para caballero, con puntera de acero y suela de PU inyectado de doble densidad. Cuero genuíno con aislamiento eléctrico, ideal para construcción civil e industria pesada.",
    destacados: [
      "Puntera de acero contra impacto y compresión",
      "Suela PU doble densidad con aislamiento eléctrico",
      "6 tonos disponibles incluyendo Azul Marino",
    ],
    rating: 4.9,
    reseñas: 312,
    destacado: true,
    nuevo: true,
  },
  {
    id: "enh-2277",
    codigo: "ENH 2277",
    nombre: "Floater Caballero",
    marca: "New Holland",
    linea: "caballero",
    tipo: "Botina",
    categoria: "Industrial",
    precio: 766, // 43.8 USD
    imagen: "/products/boot-floater-brown.png",
    materiales: [M.floaterBrown, M.floaterMel],
    tallas: [34, 35, 36, 45, 46],
    suela: "PU inyectado de doble densidad",
    seguridad: [SEG.puDoble, SEG.antideslizante, SEG.amortiguacion, SEG.resistenteAceites],
    uso: "Trabajo industrial y de obra",
    usoTags: ["Industrial", "Obra", "Almacén"],
    descripcion:
      "Botina para caballero en cuero Floater con suela de PU doble densidad. Excelente amortiguación y resistencia para trabajos industriales exigentes.",
    destacados: [
      "Cuero Floater en tonos Brown y Miel",
      "Suela PU doble densidad con amortiguación",
      "Resistente a aceites y grasas",
    ],
    rating: 4.7,
    reseñas: 89,
  },
  {
    id: "enh-2278",
    codigo: "ENH 2278",
    nombre: "Floater Clásico Caballero",
    marca: "New Holland",
    linea: "caballero",
    tipo: "Botina",
    categoria: "Industrial",
    precio: 766, // 43.8 USD
    imagen: "/products/boot-floater-brown.png",
    materiales: [M.floaterCafe, M.floaterBrown],
    tallas: [34, 35, 36, 45, 46],
    suela: "PU inyectado de doble densidad",
    seguridad: [SEG.puDoble, SEG.antideslizante, SEG.amortiguacion, SEG.resistenteAceites],
    uso: "Trabajo industrial y de obra",
    usoTags: ["Industrial", "Obra", "Almacén"],
    descripcion:
      "Botina clásica para caballero en cuero Floater con suela antideslizante de PU doble densidad. Robusta y cómoda para el trabajo diario en obra e industria.",
    destacados: [
      "Cuero Floater Café y Brown",
      "Suela antideslizante PU doble densidad",
      "Diseño robusto para obra e industria",
    ],
    rating: 4.6,
    reseñas: 77,
  },
  {
    id: "enh-1012",
    codigo: "ENH 1012",
    nombre: "Casaleone",
    marca: "New Holland",
    linea: "caballero",
    tipo: "Botina",
    categoria: "Agrícola",
    precio: 522, // 29.8 USD
    imagen: "/products/nh/boot-casaleone-caramel.png",
    materiales: [M.nobuckCaramelo, M.nobuckChocolate, M.nobuckMarrom],
    tallas: [34, 35, 46],
    suela: "Látex cosida",
    seguridad: [SEG.latexCosida, SEG.antideslizante, SEG.resistenteAceites, SEG.amortiguacion],
    uso: "Sector agrícola y rural",
    usoTags: ["Agrícola", "Campo", "Rural"],
    descripcion:
      "La botina Casaleone para caballero, diseñada para el sector agrícola. Suela de látex cosida que ofrece flexibilidad y agarre en terrenos rurales, con cuero Nobuck resistente.",
    destacados: [
      "Suela de látex cosida flexible y resistente",
      "Diseñada para el sector agrícola",
      "Cuero Nobuck en 3 tonos",
    ],
    rating: 4.7,
    reseñas: 198,
    destacado: true,
  },
  {
    id: "enh-2513p",
    codigo: "ENH 2513P",
    nombre: "Casaleone Suela Negra",
    marca: "New Holland",
    linea: "caballero",
    tipo: "Botina",
    categoria: "Agrícola",
    precio: 496, // 28.4 USD
    imagen: "/products/nh/boot-casaleone-caramel.png",
    materiales: [M.nobuckCaramelo, M.nobuckChocolate, M.nobuckMarrom],
    tallas: [34, 35, 46],
    suela: "Látex negra cosida",
    seguridad: [SEG.latexCosida, SEG.antideslizante, SEG.resistenteAceites, SEG.amortiguacion],
    uso: "Sector agrícola y rural",
    usoTags: ["Agrícola", "Campo", "Rural"],
    descripcion:
      "Variante de la Casaleone con suela de látex negra cosida. Misma robustez agrícola con un acabado más discreto, ideal para trabajo rural diario.",
    destacados: [
      "Suela de látex negra cosida",
      "Variante agrícola de acabado discreto",
      "Cuero Nobuck resistente",
    ],
    rating: 4.6,
    reseñas: 142,
  },
  {
    id: "enh-2535",
    codigo: "ENH 2535",
    nombre: "Floater Tradicional",
    marca: "New Holland",
    linea: "caballero",
    tipo: "Botina",
    categoria: "Industrial",
    precio: 557, // 31.8 USD
    imagen: "/products/boot-floater-brown.png",
    materiales: [M.floaterCafe, M.floaterConhaque, M.nobuckCaramelo, M.nobuckChocolate, M.nobuckMarrom],
    tallas: [46],
    suela: "PU inyectado",
    seguridad: [SEG.puInyectado, SEG.antideslizante, SEG.resistenteAceites, SEG.amortiguacion],
    uso: "Trabajo industrial y de almacén",
    usoTags: ["Industrial", "Almacén", "Obra"],
    descripcion:
      "Botina tradicional para caballero con 5 opciones de material entre Floater y Nobuck. Suela de PU inyectado antideslizante para trabajo industrial versátil.",
    destacados: [
      "5 opciones de material Floater y Nobuck",
      "Suela PU inyectado antideslizante",
      "Versatilidad para múltiples entornos",
    ],
    rating: 4.5,
    reseñas: 88,
  },
  {
    id: "enh-2537",
    codigo: "ENH 2537",
    nombre: "Floater Clásico",
    marca: "New Holland",
    linea: "caballero",
    tipo: "Botina",
    categoria: "Industrial",
    precio: 557, // 31.8 USD
    imagen: "/products/boot-floater-brown.png",
    materiales: [M.floaterCafe, M.floaterConhaque, M.nobuckCaramelo, M.nobuckChocolate, M.nobuckMarrom],
    tallas: [46],
    suela: "PU inyectado",
    seguridad: [SEG.puInyectado, SEG.antideslizante, SEG.resistenteAceites, SEG.amortiguacion],
    uso: "Trabajo industrial y de almacén",
    usoTags: ["Industrial", "Almacén", "Obra"],
    descripcion:
      "Botina clásica para caballero en cuero Floater y Nobuck. Suela de PU inyectado con amortiguación, diseñada para jornadas industriales prolongadas.",
    destacados: [
      "Cuero Floater y Nobuck en 5 tonos",
      "Suela PU inyectado con amortiguación",
      "Confort para jornadas prolongadas",
    ],
    rating: 4.5,
    reseñas: 76,
  },

  // ====================== LÍNEA PREMIUM SPESSOTO (marca principal, desde 1915) ======================
  {
    id: "sp-chelsea",
    codigo: "SPE-CH",
    nombre: "Spessoto Chelsea",
    marca: "Spessoto",
    linea: "unisex",
    tipo: "Bota",
    categoria: "Premium",
    precio: 1561, // 89 USD
    imagen: "/products/spessoto/chelsea-cafe.png",
    materiales: [M.camurcaCafe, M.camurcaFerrugem],
    tallas: [38, 39, 40, 41, 42, 43, 44, 45],
    suela: "Caucho natural vulcanizada",
    seguridad: [SEG.cauchoVulcanizado, SEG.antideslizante, SEG.amortiguacion, SEG.resistenteAceites],
    uso: "Uso ejecutivo premium y de campo",
    usoTags: ["Ejecutivo", "Campo", "Oficina"],
    descripcion:
      "La bota Spessoto Chelsea representa 110 años de tradición en calzado de seguridad. Construcción premium en camurça con elásticos laterales y suela vulcanizada, ideal para ejecutivos que exigen elegancia y protección.",
    destacados: [
      "Línea Premium Spessoto · Desde 1915",
      "Camurça Café y Ferrugem de alta calidad",
      "Construcción Chelsea con elásticos laterales",
    ],
    rating: 4.9,
    reseñas: 76,
    destacado: true,
    nuevo: true,
  },
  {
    id: "sp-palermo",
    codigo: "SPE-PA",
    nombre: "Spessoto Palermo",
    marca: "Spessoto",
    linea: "unisex",
    tipo: "Botina",
    categoria: "Premium",
    precio: 1666, // 95 USD
    imagen: "/products/spessoto/palermo-havana.png",
    materiales: [M.napaCafe, M.napaHavana, M.napaToscana],
    tallas: [38, 39, 40, 41, 42, 43, 44, 45],
    suela: "PU inyectado de doble densidad",
    seguridad: [SEG.puDoble, SEG.antideslizante, SEG.amortiguacion, SEG.resistenteAceites],
    uso: "Uso ejecutivo premium profesional",
    usoTags: ["Ejecutivo", "Oficina", "Comercial"],
    descripcion:
      "La botina Palermo es el equilibrio perfecto entre tradición y tecnología. Cuero Napa premium en tres tonos con suela de PU doble densidad, diseñada para el ejecutivo que no compromete seguridad ni estilo.",
    destacados: [
      "Línea Premium Spessoto · Desde 1915",
      "Cuero Napa en tonos Café, Havana y Toscana",
      "Suela PU doble densidad con amortiguación",
    ],
    rating: 4.8,
    reseñas: 64,
    destacado: true,
  },
  {
    id: "sp-vira-francesa",
    codigo: "SPE-VF",
    nombre: "Spessoto Vira Francesa",
    marca: "Spessoto",
    linea: "unisex",
    tipo: "Botina",
    categoria: "Premium",
    precio: 1491, // 85 USD
    imagen: "/products/spessoto/vira-francesa-floater.png",
    materiales: [M.floaterBrown, M.nobuckMarrom, M.nobuckTaupe],
    tallas: [38, 39, 40, 41, 42, 43, 44, 45],
    suela: "Caucho natural vulcanizada",
    seguridad: [SEG.viraFrancesa, SEG.cauchoVulcanizado, SEG.costuraManual, SEG.antideslizante, SEG.resistenteAceites],
    uso: "Trabajo profesional pesado y de campo",
    usoTags: ["Obra", "Campo", "Pesado", "Ejecutivo"],
    descripcion:
      "La Vira Francesa Spessoto es el máximo exponente de la artesanía tradicional. Construcción vulcanizada con costura manual, cuero Floater y Nobuck, para quienes exigen la mayor durabilidad de la línea premium.",
    destacados: [
      "Línea Premium Spessoto · Desde 1915",
      "Construcción Vira Francesa vulcanizada con costura manual",
      "Floater Brown, Nobuck Marrom y Nobuck Taupe",
    ],
    rating: 4.9,
    reseñas: 91,
    destacado: true,
  },
];

// Etiquetas de uso para filtros
export const etiquetasUso = [
  "Obra",
  "Industrial",
  "Campo",
  "Agrícola",
  "Ejecutivo",
  "Oficina",
  "Comercial",
  "Almacén",
  "Construcción",
  "Rural",
  "Pesado",
  "Ligero",
] as const;

// Categorías para filtros
export const categorias = ["Premium", "Ejecutiva", "Industrial", "Agrícola", "Económica"] as const;

// Marcas
export const marcas = ["Spessoto", "New Holland"] as const;

// Líneas
export const lineas = ["dama", "caballero", "unisex"] as const;

export function getProductosDestacados() {
  return productos.filter((p) => p.destacado);
}

export function getProductoById(id: string) {
  return productos.find((p) => p.id === id);
}