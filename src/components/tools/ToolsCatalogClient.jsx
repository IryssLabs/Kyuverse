"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { TOOL_CATEGORIES, USER_ROLES, TOOLS_LIST } from "@/data/toolsData";
import { Search, ArrowRight, Lock, ChevronLeft, ChevronRight, UserCheck, Share2, Sparkles, Clock } from "lucide-react";

// Official Library Imports (React Icons)
import { 
  TbCalculator, 
  TbBuildingStore, 
  TbLuggage, 
  TbReceipt2, 
  TbPrinter, 
  TbCalendarTime, 
  TbShieldCheck, 
  TbScissors, 
  TbCashRegister,
  TbTransform,
  TbPhoto,
  TbEye,
  TbRuler2,
  TbMusic,
  TbTrophy,
  TbLayoutGrid,
  TbCameraCheck,
  TbWorld,
  TbTicket,
  TbPalette,
  TbMasksTheater,
  TbCamera,
  TbMicrophone,
  TbTent
} from "react-icons/tb";
import { FaShirt, FaClipboardCheck, FaTags } from "react-icons/fa6";
import { MdOutlineTimer } from "react-icons/md";

// Registry Komponen Ikon Resmi
const ICON_REGISTRY = {
  TbCalculator,
  TbBuildingStore,
  TbLuggage,
  TbReceipt2,
  TbPrinter,
  TbCalendarTime,
  TbShieldCheck,
  TbScissors,
  TbCashRegister,
  TbTransform,
  TbPhoto,
  TbEye,
  TbRuler2,
  TbMusic,
  TbTrophy,
  TbLayoutGrid,
  TbCameraCheck,
  TbWorld,
  TbTicket,
  TbPalette,
  TbMasksTheater,
  TbCamera,
  TbMicrophone,
  TbTent,
  FaShirt,
  FaClipboardCheck,
  FaTags,
  MdOutlineTimer
};

function DynamicLibraryIcon({ name, className = "w-5 h-5" }) {
  const Component = ICON_REGISTRY[name] || TbWorld;
  return <Component className={className} />;
}

// Styling Tema Modern untuk Kategori
const categoryThemeMap = {
  calculator: {
    iconBg: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40",
    borderHover: "hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]",
    textTitleHover: "group-hover:text-cyan-400",
    btnText: "text-cyan-400 group-hover:text-cyan-300",
    activeTab: "bg-cyan-500/15 text-cyan-300 border-cyan-400/60 shadow-[0_0_20px_rgba(34,211,238,0.25)] backdrop-blur-md",
  },
  converter: {
    iconBg: "bg-purple-500/10 border-purple-500/20 text-purple-400 group-hover:bg-purple-500/20 group-hover:border-purple-500/40",
    borderHover: "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
    textTitleHover: "group-hover:text-purple-400",
    btnText: "text-purple-400 group-hover:text-purple-300",
    activeTab: "bg-purple-500/15 text-purple-300 border-purple-400/60 shadow-[0_0_20px_rgba(168,85,247,0.25)] backdrop-blur-md",
  },
  generator: {
    iconBg: "bg-blue-500/10 border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20 group-hover:border-blue-500/40",
    borderHover: "hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    textTitleHover: "group-hover:text-blue-400",
    btnText: "text-blue-400 group-hover:text-blue-300",
    activeTab: "bg-blue-500/15 text-blue-300 border-blue-400/60 shadow-[0_0_20px_rgba(59,130,246,0.25)] backdrop-blur-md",
  },
  planner: {
    iconBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40",
    borderHover: "hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    textTitleHover: "group-hover:text-emerald-400",
    btnText: "text-emerald-400 group-hover:text-emerald-300",
    activeTab: "bg-emerald-500/15 text-emerald-300 border-emerald-400/60 shadow-[0_0_20px_rgba(16,185,129,0.25)] backdrop-blur-md",
  },
  cosplay: {
    iconBg: "bg-pink-500/10 border-pink-500/20 text-pink-400 group-hover:bg-pink-500/20 group-hover:border-pink-500/40",
    borderHover: "hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]",
    textTitleHover: "group-hover:text-pink-400",
    btnText: "text-pink-400 group-hover:text-pink-300",
    activeTab: "bg-pink-500/15 text-pink-300 border-pink-400/60 shadow-[0_0_20px_rgba(236,72,153,0.25)] backdrop-blur-md",
  },
  media: {
    iconBg: "bg-amber-500/10 border-amber-500/20 text-amber-400 group-hover:bg-amber-500/20 group-hover:border-amber-500/40",
    borderHover: "hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    textTitleHover: "group-hover:text-amber-400",
    btnText: "text-amber-400 group-hover:text-amber-300",
    activeTab: "bg-amber-500/15 text-amber-300 border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.25)] backdrop-blur-md",
  },
  stage: {
    iconBg: "bg-rose-500/10 border-rose-500/20 text-rose-400 group-hover:bg-rose-500/20 group-hover:border-rose-500/40",
    borderHover: "hover:border-rose-500/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]",
    textTitleHover: "group-hover:text-rose-400",
    btnText: "text-rose-400 group-hover:text-rose-300",
    activeTab: "bg-rose-500/15 text-rose-300 border-rose-400/60 shadow-[0_0_20px_rgba(244,63,94,0.25)] backdrop-blur-md",
  },
  all: {
    activeTab: "bg-cyan-500/15 text-cyan-300 border-cyan-400/60 shadow-[0_0_20px_rgba(34,211,238,0.25)] backdrop-blur-md",
  }
};

export default function ToolsCatalogClient() {
  const bgRef = useRef(null);
  const rafRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    setIsVisible(true);
    checkScroll();

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

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -220 : 220;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Handler Copy Link Tool menggunakan Sonner Toast
  const handleShareTool = (e, tool) => {
    e.preventDefault();
    e.stopPropagation();

    const fullUrl = `${window.location.origin}${tool.href}`;
    navigator.clipboard.writeText(fullUrl);

    toast.success("Link copied to clipboard!", {
      description: `Share "${tool.title}" with your community.`,
    });
  };

  // Filter Logic
  const filteredTools = TOOLS_LIST.filter((tool) => {
    const matchesRole =
      selectedRole === "all" || (tool.roles && tool.roles.includes(selectedRole));
    const matchesCategory =
      selectedCategory === "all" || tool.category === selectedCategory;
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesRole && matchesCategory && matchesSearch;
  });

  // Dynamic Counter Calculations
  const totalCount = TOOLS_LIST.length;
  const filteredCount = filteredTools.length;
  const activeCount = filteredTools.filter((t) => t.status === "active").length;
  const inDevCount = filteredCount - activeCount;

  return (
    <div className="relative min-h-screen bg-[#0a0a0c] text-white pt-28 pb-20 overflow-hidden">
      {/* ================= BACKGROUND EFFECT ================= */}
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
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-[#0a0a0c] opacity-90" />
      </div>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ================= HEADER SECTION ================= */}
        <div className="max-w-3xl mb-8 space-y-4">
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

        {/* ================= SECTION 1: ROLE / PERSONA FILTER ================= */}
        <div
          className={`mb-6 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <UserCheck className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-black uppercase tracking-widest text-gray-400">
              Filter By Your Role:
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
            {USER_ROLES.map((role) => {
              const isActive = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 border focus:outline-none focus:ring-0 select-none ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 font-extrabold border-cyan-400/80 shadow-[0_0_15px_rgba(34,211,238,0.25)] backdrop-blur-md scale-[1.02]"
                      : "bg-white/[0.03] text-gray-400 border-white/5 hover:border-white/20 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <DynamicLibraryIcon name={role.iconName} className="w-4 h-4" />
                  <span>{role.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= SECTION 2: CATEGORY SCROLL & SEARCH ================= */}
        <div
          className={`mb-8 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-white/[0.02] border border-white/10 p-2 sm:p-3 rounded-2xl backdrop-blur-md">
            
            {/* CATEGORY SCROLL AREA */}
            <div className="relative flex-1 min-w-0 flex items-center group">
              {canScrollLeft && (
                <button
                  onClick={() => handleScroll("left")}
                  className="absolute left-0 z-20 p-1.5 rounded-lg bg-[#0a0a0c]/90 border border-white/20 text-white shadow-lg hover:bg-cyan-500 hover:text-black transition-all focus:outline-none focus:ring-0"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="flex items-center gap-2 overflow-x-auto custom-scrollbar scroll-smooth py-1 px-1 w-full"
              >
                {TOOL_CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  const catTheme = categoryThemeMap[cat.id] || categoryThemeMap.calculator;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 border shrink-0 focus:outline-none focus:ring-0 select-none ${
                        isActive
                          ? catTheme.activeTab
                          : "bg-white/[0.03] text-gray-400 border-white/5 hover:border-white/20 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {canScrollRight && (
                <button
                  onClick={() => handleScroll("right")}
                  className="absolute right-0 z-20 p-1.5 rounded-lg bg-[#0a0a0c]/90 border border-white/20 text-white shadow-lg hover:bg-cyan-500 hover:text-black transition-all focus:outline-none focus:ring-0"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* SEARCH INPUT */}
            <div className="relative w-full lg:w-[280px] shrink-0">
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/80 transition-colors duration-300"
              />
              <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

          </div>
        </div>

        {/* ================= DYNAMIC TOOL COUNTER BAR ================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-1">
          <div className="text-xs text-gray-400 font-bold tracking-wide">
            Showing{" "}
            <span className="text-cyan-400 font-extrabold">{filteredCount}</span> of{" "}
            <span className="text-white font-extrabold">{totalCount}</span> tools
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-black tracking-wider uppercase">

              <span>{activeCount} Active</span>
            </div>

            {inDevCount > 0 && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[11px] font-black tracking-wider uppercase">
                <Clock className="w-3 h-3 text-gray-400" />
                <span>{inDevCount} In Dev</span>
              </div>
            )}
          </div>
        </div>

        {/* ================= CATALOG GRID ================= */}
        {filteredTools.length > 0 ? (
          <div
            key={`${selectedRole}-${selectedCategory}-${searchQuery}`}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ${
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
                    {/* Top Section */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 rounded-xl border transition-colors ${theme.iconBg}`}
                      >
                        <DynamicLibraryIcon name={tool.iconName} className="w-6 h-6" />
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Share Button */}
                        <button
                          onClick={(e) => handleShareTool(e, tool)}
                          title="Share Tool Link"
                          className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all focus:outline-none focus:ring-0"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>

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
          <div className="text-center py-20 border border-white/5 bg-white/[0.01] rounded-2xl backdrop-blur-md">
            <p className="text-gray-400 text-sm">
              No utility tools found matching your current role or category filters.
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
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }

        .custom-scrollbar::-webkit-scrollbar {
          height: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.8);
        }
      `}</style>
    </div>
  );
}