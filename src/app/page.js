import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import Discover from '@/components/Discover';
import Pricing from '@/components/Pricing';   
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
      <Discover />
      <Pricing />
      <Footer />
     
    </>
  );
}