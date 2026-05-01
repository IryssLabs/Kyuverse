"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const categories = ["Cosplay Stars", "Creative Artists", "Circle & Groups"];

// Data Network Kyuverse
const networkData = {
  "Cosplay Stars": [
    {
      name: "ririlily_",
      role: "香港 | 創作人",
      img: "/ririlily/cos1.jpg",
      link: "https://rilyverse.my.id/", // Link khusus Ririlily
    },

    {
      name: "Next Star?",
      role: "Is it you?",
      img: "/nextstar.png",
      isPlaceholder: true,
    },
  ],
  "Creative Artists": [
    {
      name: "Soon",
      role: "Artistic Soul",
      img: "/artist.jpeg",
      isPlaceholder: true,
    },
  ],
  "Circle & Groups": [
    {
      name: "Kyuverse Circle",
      role: "Growing Community",
      img: "/comunity.png",
      isPlaceholder: true,
    },
  ],
};

export default function Discover() {
  const [activeTab, setActiveTab] = useState("Cosplay Stars");
  const bgRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // Performance Check: Parallax hanya aktif di desktop agar mobile super ringan
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        if (bgRef.current) {
          const x = (e.clientX / window.innerWidth - 0.5) * 15;
          const y = (e.clientY / window.innerHeight - 0.5) * 15;
          bgRef.current.style.transform = `translate3d(${-x}px, ${-y}px, 0) scale(1.08)`;
        }
        rafRef.current = null;
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="discover"
      className="relative py-24 overflow-hidden bg-[#0a0a0c]"
    >
      {/* ================= BACKGROUND ================= */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform transition-transform duration-500 ease-out"
      >
        <Image
          src="/discover.png"
          alt="Kyuverse Creative Hub Background"
          fill
          className="object-cover opacity-60"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header - COPYWRITING DIPERBAIKI (Lebih fokus ke Artist) */}
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tighter">
            Discover Our <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
              Creative Friends
            </span>
          </h2>
          <p className="text-gray-300 max-w-xl text-base md:text-lg leading-relaxed md:mx-0 mx-auto">
            Shining a light on amazing talent. Discover incredible{" "}
            <b>Cosplayers</b>, gifted <b>Artists</b>, and vibrant{" "}
            <b>Communities</b> sharing their creativity and passion with the
            world.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-300 border-2 ${
                activeTab === tab
                  ? "bg-cyan-500 border-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                  : "border-white/10 text-gray-400 hover:border-cyan-400/50 hover:text-white backdrop-blur-md"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Network Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {networkData[activeTab].map((item, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-3 
              ${
                item.isPlaceholder
                  ? "border-2 border-dashed border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40"
                  : "bg-[#ffffff05] backdrop-blur-md border border-white/10 hover:border-cyan-500/50 hover:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.2)] hover:bg-[#ffffff0a]"
              }`}
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src={item.img}
                  alt={
                    item.isPlaceholder
                      ? "Coming Soon "
                      : `${item.name} Portfolio`
                  }
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    !item.isPlaceholder ? "group-hover:scale-110" : ""
                  }`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-black/50 to-transparent opacity-90" />
              </div>

              <div className="absolute bottom-0 left-0 p-8 w-full z-20">
                <h4 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors">
                  {item.name}
                </h4>
                <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-2">
                  {item.role}
                </p>

                {/* Active Button with External Link Support */}
                {!item.isPlaceholder && (
                  <div className="mt-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    <a
                      href={item.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-400 hover:to-cyan-400 text-white text-xs font-black rounded-xl tracking-widest uppercase shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-[1.02]">
                        Visit World
                      </button>
                    </a>
                  </div>
                )}
                {/* Placeholder Indicator */}
                {item.isPlaceholder && (
                  <div className="mt-6 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] text-purple-300/70 font-black tracking-widest uppercase">
                      Coming Soon 🎀
                    </span>
                  </div>
                )}
              </div>

              {/* Glow effect only for active cards */}
              {!item.isPlaceholder && (
                <div className="absolute inset-0 border-2 border-cyan-500/0 rounded-2xl group-hover:border-cyan-500/20 transition-all duration-500 pointer-events-none z-30"></div>
              )}
            </div>
          ))}
        </div>
      </div>

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
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
