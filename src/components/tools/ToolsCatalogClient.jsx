"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TOOL_CATEGORIES, TOOLS_LIST } from "@/data/toolsData";

// Import Icon dari Lucide React
import {
  Calculator,
  TrendingUp,
  Wallet,
  Printer,
  Scaling,
  FileText,
  ClipboardCheck,
  Search,
  ArrowRight,
  Lock,
} from "lucide-react";

// Map nama string ke Komponen Icon Lucide
const iconComponents = {
  Calculator,
  TrendingUp,
  Wallet,
  Printer,
  Scaling,
  FileText,
  ClipboardCheck,
};

// Helper Component untuk render Icon secara aman
function DynamicIcon({ name, className = "w-6 h-6" }) {
  const IconComponent = iconComponents[name] || Calculator;
  return <IconComponent className={className} />;
}

// Helper untuk styling warna kustom tiap kategori
const categoryThemeMap = {
  calculator: {
    iconBg:
      "bg-cyan-500/10 border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40",
    borderHover:
      "hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]",
    textTitleHover: "group-hover:text-cyan-400",
    btnText: "text-cyan-400 group-hover:text-cyan-300",
  },
  converter: {
    iconBg:
      "bg-purple-500/10 border-purple-500/20 text-purple-400 group-hover:bg-purple-500/20 group-hover:border-purple-500/40",
    borderHover:
      "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
    textTitleHover: "group-hover:text-purple-400",
    btnText: "text-purple-400 group-hover:text-purple-300",
  },
  generator: {
    iconBg:
      "bg-blue-500/10 border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20 group-hover:border-blue-500/40",
    borderHover:
      "hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    textTitleHover: "group-hover:text-blue-400",
    btnText: "text-blue-400 group-hover:text-blue-300",
  },
  planner: {
    iconBg:
      "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40",
    borderHover:
      "hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    textTitleHover: "group-hover:text-emerald-400",
    btnText: "text-emerald-400 group-hover:text-emerald-300",
  },
};

export default function ToolsCatalogClient() {
  const bgRef = useRef(null);
  const rafRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsVisible(true);

    if (window.innerWidth < 768) return;

    const handleMouseMove = (e) => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 12;
        const y = (e.clientY / window.innerHeight - 0.5) * 12;

        if (bgRef.current) {
          bgRef.current.style.transform = `
            translate3d(${-x}px, ${-y}px, 0)
            scale(1.05)
          `;
        }

        rafRef.current = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const filteredTools = TOOLS_LIST.filter((tool) => {
    const matchesCategory =
      selectedCategory === "all" || tool.category === selectedCategory;
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-[#0a0a0c] text-white pt-28 pb-20 overflow-hidden">
      {/* ================= BACKGROUND EFFECT (TERANG KONSISTEN) ================= */}
      {/* ================= BACKGROUND EFFECT (GELAP PAS & KETIKAN TETAP FOKUS) ================= */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform transition-transform duration-500 ease-out pointer-events-none"
      >
        <Image
          src="/tool-clean.webp"
          alt="Kyuverse Creative Workspace"
          fill
          priority
          sizes="100vw"
          quality={95}
          /* 1. Opacity gambar diturunkan ke 40% (sebelumnya 60%) agar tidak balapan terang dengan teks */
          className="object-cover opacity-40"
        />

        {/* 2. Overlay hitam diperpekat ke bg-black/60 untuk memberi kontras tinggi pada teks catalog */}
        <div className="absolute inset-0 bg-black/60" />
        {/* 3. Gradient lembut di atas dan bawah agar transisi halaman tetap seamless */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-[#0a0a0c] opacity-90" />
      </div>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ================= HEADER SECTION ================= */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <span className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-[10px] font-black tracking-[0.3em] uppercase backdrop-blur-sm">
              Creator Utilities Suite
            </span>
          </div>

          <h1
            className={`text-4xl sm:text-5xl font-black tracking-tight leading-tight transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            Explore Our{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
              Utility Tools
            </span>
          </h1>

          <p
            className={`text-gray-300 text-base sm:text-lg leading-relaxed transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            A collection of practical, hassle-free web tools built specifically
            to empower artists, cosplayers, merch vendors, and convention
            communities.
          </p>
        </div>

        {/* ================= SEARCH & CATEGORY FILTER ================= */}
        <div
          className={`space-y-6 mb-12 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {TOOL_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 border ${
                      isActive
                        ? "bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                        : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors duration-300 backdrop-blur-md"
              />
              <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* ================= CATALOG GRID (DYNAMICS PER CATEGORY COLOR) ================= */}
        {filteredTools.length > 0 ? (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            {filteredTools.map((tool) => {
              const isActive = tool.status === "active";
              const theme =
                categoryThemeMap[tool.category] || categoryThemeMap.calculator;

              return (
                <div
                  key={tool.id}
                  className={`group relative flex flex-col justify-between rounded-2xl border bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-300 ${
                    isActive
                      ? `border-white/10 ${theme.borderHover} hover:bg-white/[0.06] hover:-translate-y-1`
                      : "border-white/5 opacity-70"
                  }`}
                >
                  <div>
                    {/* Top Section dengan Icon Berwarna Kategori */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 rounded-xl border transition-colors ${theme.iconBg}`}
                      >
                        <DynamicIcon name={tool.iconName} className="w-6 h-6" />
                      </div>

                      {tool.badge ? (
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase border ${
                            tool.badgeColor ||
                            "bg-white/5 border-white/10 text-gray-400"
                          }`}
                        >
                          {tool.badge}
                        </span>
                      ) : !isActive ? (
                        <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase border bg-white/5 border-white/10 text-gray-500">
                          Coming Soon
                        </span>
                      ) : null}
                    </div>

                    <h2
                      className={`text-xl font-bold text-white transition-colors duration-300 mb-2 ${theme.textTitleHover}`}
                    >
                      {tool.title}
                    </h2>
                    <p className="text-sm text-gray-300 leading-relaxed mb-6">
                      {tool.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-white/5">
                    {isActive ? (
                      <Link
                        href={tool.href}
                        className={`inline-flex items-center justify-between w-full text-xs font-black uppercase tracking-wider transition-colors ${theme.btnText}`}
                      >
                        <span>Launch Tool</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <div className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-gray-500 cursor-not-allowed">
                        <span>In Development</span>
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
            <p className="text-gray-400 text-sm">
              No utility tools found matching your search or filter criteria.
            </p>
          </div>
        )}

        {/* ================= FOOTER CTA BANNER ================= */}
        <div className="mt-20 p-8 sm:p-10 rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-950/20 via-purple-950/20 to-black backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl font-black text-white">
              Have a tool idea in mind?
            </h3>
            <p className="text-sm text-gray-400 max-w-xl">
              We update our tool suite continuously. Share your feedback or
              request new features you would like us to build!
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-xs tracking-widest uppercase transition-all duration-300 whitespace-nowrap"
          >
            Request New Tool
          </Link>
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
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
