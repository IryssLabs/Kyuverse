"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const bgRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    // Disable parallax di mobile agar ringan
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e) => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        if (bgRef.current) {
          const x = (e.clientX / window.innerWidth - 0.5) * 15;
          const y = (e.clientY / window.innerHeight - 0.5) * 15;

          // GPU accelerated transform sesuai Hero
          bgRef.current.style.transform = `
                        translate3d(${-x}px, ${-y}px, 0)
                        scale(1.08)
                    `;
        }
        rafRef.current = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="projects"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0c]"
    >
      {/* ================= BACKGROUND - MATCHING HERO VIBE ================= */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform transition-transform duration-500 ease-out"
      >
        <Image
          src="/projects.png" // Menggunakan aset lo
          alt="Artist portfolio websites and cosplay project showcases"
          fill
          priority
          quality={95}
          className="object-cover opacity-60" // Opacity 60% agar gambar 'pop' tapi tetap dark
          sizes="100vw"
        />

        {/* Overlay tipis dan gradient konsisten dengan Hero */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-90" />
      </div>

      {/* Floating shapes - Opacity diperhalus */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float-delayed" />
      </div>

      {/* ================= CONTENT - 100% UNCHANGED TEXT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex justify-center md:justify-end w-full">
        <div className="max-w-3xl space-y-6 text-white text-center md:text-right">
          {/* Title: Ukuran font dikecilkan agar lebih clean & leluasa */}
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tighter transition-all duration-1000 delay-200 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <span className="inline-block hover:text-cyan-400 transition-colors duration-300 cursor-default">
              View Artist Projects
            </span>{" "}
            <span className="inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Projects
            </span>
          </h2>

          {/* Description: Font size disesuaikan dengan Hero */}
          <p
            className={`text-base md:text-lg max-w-2xl mx-auto md:ml-auto md:mr-0 leading-relaxed text-gray-200 transition-all duration-1000 delay-400 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            Custom portfolio websites, commission platforms, and community
            spaces for artists and cosplayers to showcase artwork and cosplay
            projects, manage commissions, and grow their audience online.
          </p>

          {/* Button: Styling disesuaikan dengan tombol Hero */}
          <div
            className={`flex gap-4 flex-wrap justify-center md:justify-end pt-2 transition-all duration-1000 delay-600 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <a
              href="https://www.rilyverse.my.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block bg-cyan-500 text-black px-8 py-3.5 rounded-xl font-black overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] cursor-pointer text-xs tracking-widest uppercase"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Artist Projects
                <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          </div>

          {/* Stats: Font size dikecilkan sesuai standar Hero */}
          <div
            className={`grid grid-cols-3 gap-8 pt-10 border-t border-white/10 transition-all duration-1000 delay-800 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="group cursor-default">
              <div className="text-2xl font-black text-cyan-400 transition-all duration-300 group-hover:scale-105">
                Blazing Fast
              </div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">
                Performance
              </div>
            </div>

            <div className="group cursor-default">
              <div className="text-2xl font-black text-cyan-400 transition-all duration-300 group-hover:scale-105">
                Tailor-Made
              </div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">
                Exclusivity
              </div>
            </div>

            <div className="group cursor-default">
              <div className="text-2xl font-black text-cyan-400 transition-all duration-300 group-hover:scale-105">
                Fast
              </div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">
                Turnaround
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Styling konsisten */}
      <div
        className={`hidden sm:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
            Explore
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-cyan-400 to-transparent" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-30px);
          }
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </section>
  );
}