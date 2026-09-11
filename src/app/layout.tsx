import type { Metadata } from "next";
import { Geist, Geist_Mono, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brasilbusiness.shop"),
  title: "Brasil MX · Spessoto & New Holland | Calzado de Seguridad B2B México",
  description:
    "Distribuidor B2B en México de calzado de seguridad Spessoto y New Holland. Botinas y botas para dama y caballero. Cotización por volumen en MXN. Contacto: 229 464 8952 · contacto@brasilbusiness.shop",
  keywords: [
    "Spessoto",
    "New Holland",
    "calzado de seguridad",
    "botinas de seguridad",
    "botas de trabajo",
    "puntera de acero",
    "suela antideslizante",
    "calzado industrial México",
    "B2B calzado de seguridad",
    "Brasil MX",
  ],
  authors: [{ name: "Brasil MX" }],
  openGraph: {
    title: "Brasil MX · Spessoto & New Holland — Calzado de Seguridad B2B México",
    description:
      "Calzado de seguridad profesional Spessoto y New Holland. Distribución B2B en México. Catálogo 2026 en español.",
    siteName: "Brasil MX",
    url: "https://brasilbusiness.shop",
    images: [{ url: "/products/hero-b2b-models.webp", width: 1344, height: 768 }],
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${barlowCondensed.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
