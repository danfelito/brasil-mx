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
  title: "New Holland Safety Footwear México | Calzado de Seguridad",
  description:
    "Catálogo 2026 de calzado de seguridad New Holland. Botinas y botas para dama y caballero con puntera de acero, suela antideslizante y tecnología de protección. Compra en línea con tallas y precios en USD.",
  keywords: [
    "New Holland",
    "calzado de seguridad",
    "botinas de seguridad",
    "botas de trabajo",
    "puntera de acero",
    "suela antideslizante",
    "calzado industrial México",
  ],
  authors: [{ name: "New Holland Safety Footwear" }],
  openGraph: {
    title: "New Holland Safety Footwear México",
    description:
      "Calzado de seguridad profesional con tecnología de protección. Catálogo 2026 en español.",
    siteName: "New Holland Safety Footwear",
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
