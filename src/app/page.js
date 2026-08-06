import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import TwoPillars from "@/components/home/TwoPillars";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative bg-[#0a0a0c] text-white overflow-hidden">
        <Hero />
        <TwoPillars/>
      </main>
      <Footer />
    </>
  );
}