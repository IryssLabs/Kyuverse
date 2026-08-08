"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function TwoPillars() {
  const bgRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
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
    <section className="relative py-24 px-6 overflow-hidden bg-[#0a0a0c] border-t border-b border-white/10">
      {/* ================= 1. SECTION PARALLAX BACKGROUND ================= */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform transition-transform duration-500 ease-out pointer-events-none"
      >
        <Image
          src="/twopillars.webp"
          alt="Kyuverse Ecosystem Background"
          fill
          priority
          sizes="100vw"
          quality={95}
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-[#0a0a0c] opacity-85" />
      </div>

      {/* ================= CONTENT CONTAINER ================= */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* ================= 2. PILAR A: UTILITY TOOLS SUITE ================= */}
          <div className="group relative rounded-3xl border border-white/15 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden flex flex-col justify-between p-8 sm:p-10 min-h-[440px] bg-[#0d0e12]/85 backdrop-blur-md shadow-2xl">
            {/* Background Image Card Pillar A */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <Image
                src="/ctatools.webp"
                alt="Creator Utility Suite"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={95}
                className="object-cover opacity-35 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/60 to-transparent opacity-90" />
            </div>

            {/* Content Top */}
            <div className="relative z-10 space-y-4">
              <div className="inline-block px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[10px] font-black tracking-[0.25em] uppercase">
                Free Utilities
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight drop-shadow-md">
                All-in-One{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-300 bg-clip-text text-transparent animate-gradient">
                  Creator Utilities.
                </span>
              </h3>

              {/* Teks Ringkas, Jelas, & To The Point */}
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed drop-shadow">
                Practical web tools built for artists, cosplayers, and event vendors. Calculate commission prices, budget for conventions, and organize your work instantly.
              </p>
            </div>

            {/* Action Bottom */}
            <div className="relative z-10 pt-6">
              <Link
                href="/tools"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-cyan-500 text-black px-7 py-3 rounded-xl font-black transition-all duration-300 hover:bg-cyan-400 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] text-xs tracking-widest uppercase"
              >
                Launch Tools Catalog
              </Link>
            </div>
          </div>

          {/* ================= 3. PILAR B: CUSTOM WEB SERVICES ================= */}
          <div className="group relative rounded-3xl border border-white/15 hover:border-purple-500/50 transition-all duration-500 overflow-hidden flex flex-col justify-between p-8 sm:p-10 min-h-[440px] bg-[#0d0e12]/85 backdrop-blur-md shadow-2xl">
            {/* Background Image Card Pillar B */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <Image
                src="/ctaweb.webp"
                alt="Custom Web Services"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={95}
                className="object-cover opacity-35 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/60 to-transparent opacity-90" />
            </div>

            {/* Content Top */}
            <div className="relative z-10 space-y-4">
              <div className="inline-block px-3.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[10px] font-black tracking-[0.25em] uppercase">
                Custom Web Service
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight drop-shadow-md">
                High-Performance{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                  Custom Websites.
                </span>
              </h3>

              {/* Teks Ringkas, Hilang Jargon Teknis */}
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed drop-shadow">
                Stand out with tailored portfolios, storefronts, and landing pages built specifically for creative studios, convention communities, and individual creators.
              </p>
            </div>

            {/* Action Bottom */}
            <div className="relative z-10 pt-6">
              <Link
                href="/service"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-purple-600 text-white px-7 py-3 rounded-xl font-black transition-all duration-300 hover:bg-purple-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] text-xs tracking-widest uppercase"
              >
                Explore Web Services
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
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
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </section>
  );
}