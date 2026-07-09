import { Header } from "@/components/tienda/Header";
import { Hero } from "@/components/tienda/Hero";
import { Catalogo } from "@/components/tienda/Catalogo";
import { SeguridadSection } from "@/components/tienda/SeguridadSection";
import { Testimonios } from "@/components/tienda/Testimonios";
import { Footer } from "@/components/tienda/Footer";
import { CarritoDrawer } from "@/components/tienda/CarritoDrawer";
import { GuiaTallas } from "@/components/tienda/GuiaTallas";
import { CtaCorporativo } from "@/components/tienda/CtaCorporativo";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Catalogo />
        <SeguridadSection />
        <GuiaTallas />
        <Testimonios />
        <CtaCorporativo />
      </main>
      <Footer />
      <CarritoDrawer />
    </div>
  );
}
