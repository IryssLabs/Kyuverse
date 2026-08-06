import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Komponen spesifik milik Service Page
import ServiceHero from "@/components/service/ServiceHero";
import Projects from "@/components/service/Projects";
import Discover from "@/components/service/Discover";
import Pricing from "@/components/service/Pricing";

export default function ServicePage() {
  return (
    <>
      <Navbar />
      {/* Tambahkan background dark eksplisit di main */}
      <main className="relative bg-[#0a0a0c] text-white overflow-hidden">
        <ServiceHero />
        <Projects />
        <Discover />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}