"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const bgRef = useRef(null);
  const rafRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    // Disable parallax di mobile agar ringan
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

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0c]">
      {/* ================= BACKGROUND - OPTIMIZED DARKNESS ================= */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform transition-transform duration-500 ease-out"
      >
        <Image
          src="/heroimage.png" // Menggunakan aset .jpg yang lo upload
          alt="Kyuverse Creative Workspace"
          fill
          priority
          sizes="100vw"
          quality={95}
          className="object-cover opacity-60" // Opacity 60% sesuai selera lo
        />

        {/* Overlay tipis agar gambar lebih 'pop' */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-80" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
        <div className="max-w-4xl space-y-6">
          {/* Badge */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-[10px] font-black tracking-[0.3em] uppercase backdrop-blur-sm">
              Official Kyuverse
            </span>
          </div>

          {/* Heading: Font size clean */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <span className="inline-block hover:text-cyan-400 transition-colors duration-300">
              Creative Web Developer
            </span>{" "}
            <br />
            <span className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
              for Artists, Cosplayers, and Creative Communities
            </span>
          </h1>

          <p
            className={`text-base md:text-lg max-w-xl leading-relaxed text-gray-300 transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Design and build portfolio websites, commission platforms, and
            community spaces for artists and cosplayers to showcase artwork and
            cosplay projects, manage commissions, and grow their audience
            online.
          </p>

          {/* ================= BUTTONS - UPDATED TEXT ================= */}
          <div
            className={`flex gap-4 flex-wrap pt-2 transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <a
              href="#projects"
              onClick={(e) => handleScroll(e, "projects")}
              className="group relative inline-block bg-cyan-500 text-black px-8 py-3.5 rounded-xl font-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] cursor-pointer text-sm tracking-widest uppercase"
            >
              View Artist Projects
            </a>

            <a
              href="#pricing" // Ganti 'workwithme' jadi 'pricing' karena sectionnya sudah digabung
              onClick={(e) => handleScroll(e, "pricing")}
              className="group relative border-2 border-white/10 text-white hover:text-cyan-400 px-8 py-3.5 rounded-xl font-bold backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-cyan-400 inline-block cursor-pointer text-sm tracking-widest uppercase"
            >
              Start Your Artist Website
            </a>
          </div>

          {/* ================= STATS ================= */}
          <div
            className={`flex gap-10 pt-10 border-t border-white/10 transition-all duration-1000 delay-800 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="group">
              <div className="text-2xl font-black text-cyan-400">
                1
              </div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">
                Projects
              </div>
            </div>
            <div className="group">
              <div className="text-2xl font-black text-purple-400">Artist</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">
                Focused
              </div>
            </div>
            <div className="group">
              <div className="text-2xl font-black text-cyan-400">1+</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">
                Year Exp
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations Style */}
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