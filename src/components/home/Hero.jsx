"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Ditambahkan untuk navigasi antar halaman

export default function Hero() {
  const bgRef = useRef(null);
  const rafRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    if (window.innerWidth < 768) return;

    const handleMouseMove = (e) => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 15;
        const y = (e.clientY / window.innerHeight - 0.5) * 15;

        if (bgRef.current) {
          bgRef.current.style.transform = `
            translate3d(${-x}px, ${-y}px, 0)
            scale(1.08)
          `;
        }

        rafRef.current = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0c]">
      {/* ================= BACKGROUND ================= */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform transition-transform duration-500 ease-out"
      >
        <Image
          src="/hero.webp"
          alt="Kyuverse Creative Workspace"
          fill
          priority
          sizes="100vw"
          quality={95}
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-80" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
        <div className="max-w-4xl space-y-6">

          {/* Badge */}
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"
              }`}
          >
            <span className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-[10px] font-black tracking-[0.3em] uppercase backdrop-blur-sm">
              Official Kyuverse
            </span>
          </div>

          {/* Heading */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter transition-all duration-1000 delay-200 ${isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`}
          >
            <span className="inline-block hover:text-cyan-400 transition-colors duration-300">
              Your Creative Platform.
            </span>{" "}

            <span className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
              Tools & Websites for Anime Convention Creators.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className={`text-base md:text-lg max-w-xl leading-relaxed text-gray-300 transition-all duration-1000 delay-400 ${isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`}
          >
            Powerful tools and custom websites for artists, cosplayers, photographers, merchants, and convention communities. Calculate budgets, manage commissions, showcase portfolios, and grow your creative presence.
          </p>

         
          {/* Buttons Container */}
          <div
            className={`flex gap-4 flex-wrap pt-2 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            {/* PRIMARY CTA (Arahkan ke internal aplikasi / halaman Tools) */}
            <Link
              href="/tools"
              className="group relative inline-flex items-center justify-center bg-cyan-500 text-black px-8 py-3.5 rounded-xl font-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] text-sm tracking-widest uppercase"
            >
              <span>Launch  Tools</span>
          
            </Link>

            {/* SECONDARY CTA (Arahkan ke pure jual jasa website premium) */}
            <Link
              href="/service"
              className="group relative inline-flex items-center justify-center border-2 border-white/10 text-white hover:text-cyan-400 px-8 py-3.5 rounded-xl font-bold backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-cyan-400 text-sm tracking-widest uppercase"
            >
              <span>Get Custom Website</span>
            </Link>
          </div>

          {/* ================= STATS ================= */}
          <div
            className={`flex gap-8 pt-10 border-t border-white/10 transition-all duration-1000 delay-800 flex-wrap ${isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`}
          >
            <div className="group">
              <div className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Creator Utilities
              </div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">
               Calculators, budget trackers, and event planners.
              </div>
            </div>

            <div className="group">
              <div className="text-xs font-black text-purple-400 uppercase tracking-widest flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                Custom Websites
              </div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">
                Built for your brand, fully customized
              </div>
            </div>

            <div className="group">
              <div className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Convention Ready
              </div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">
                Built with creators, for creators
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </section>
  );
}