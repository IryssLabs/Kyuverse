"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Wrench,
  Sparkles,
  Layers,
} from "lucide-react";

// Official Library Imports untuk Dropdown Navbar
import { 
  TbCalculator, 
  TbPrinter, 
  TbReceipt2, 
  TbClipboardCheck,
  TbScissors,
  TbCamera,
  TbTrophy
} from "react-icons/tb";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dropdown Tools Kategori dengan Tema Warna Neon Glass Kyuverse
  const toolCategories = [
    {
      label: "Calculators & Financial",
      desc: "Commission & booth profit simulators",
      href: "/tools?category=calculator",
      icon: TbCalculator,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      isAvailable: true,
    },
    {
      label: "Converter & File",
      desc: "Print-spec & social asset resizers",
      href: "/tools?category=converter",
      icon: TbPrinter,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      isAvailable: false,
    },
    {
      label: "Generators & Docs",
      desc: "Instant PDF invoices & receipts",
      href: "/tools?category=generator",
      icon: TbReceipt2,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      isAvailable: false,
    },
    {
      label: "Checklist & Planners",
      desc: "Convention setup & travel lists",
      href: "/tools?category=planner",
      icon: TbClipboardCheck,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      isAvailable: false,
    },
    {
      label: "Cosplay & Crafting",
      desc: "Measurement & prop dimension tools",
      href: "/tools?category=cosplay",
      icon: TbScissors,
      color: "text-pink-400 bg-pink-500/10 border-pink-500/20",
      isAvailable: false,
    },
    {
      label: "Photographer & Media",
      desc: "Photo drive & schedule generators",
      href: "/tools?category=media",
      icon: TbCamera,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      isAvailable: false,
    },
    {
      label: "Stage & Community",
      desc: "Cosplay rubrics & performance timers",
      href: "/tools?category=stage",
      icon: TbTrophy,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      isAvailable: false,
    },
  ];

  // Logic Smart Navigation
  const isHomePage = pathname === "/";
  const isToolsPage = pathname.startsWith("/tools");
  const isServicePage = pathname.startsWith("/service");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/50"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* ================= LOGO + BRAND ================= */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <div className="relative w-10 h-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/kyuverse.svg"
                alt="Kyuverse Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>

            <span className="text-xl font-black uppercase tracking-[0.25em] bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
              Kyuverse
            </span>
          </Link>

          {/* ================= DESKTOP NAV LINKS ================= */}
          <div className="hidden md:flex items-center gap-2">
            
            {/* Home Link */}
            <Link
              href="/"
              className={`relative px-4 py-2 text-[11px] font-black uppercase tracking-widest transition-all duration-300 rounded-lg focus:outline-none ${
                isHomePage ? "text-cyan-400" : "text-gray-400 hover:text-white"
              }`}
            >
              Home
              {isHomePage && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
              )}
            </Link>

            {/* DROPDOWN MENU: TOOLS SUITE */}
            <div
              className="relative"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <Link
                href="/tools"
                className={`relative flex items-center gap-1 px-4 py-2 text-[11px] font-black uppercase tracking-widest transition-all duration-300 rounded-lg focus:outline-none ${
                  isToolsPage ? "text-cyan-400" : "text-gray-400 hover:text-white"
                }`}
              >
                <span>Tools Suite</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    toolsDropdownOpen ? "rotate-180 text-cyan-400" : ""
                  }`}
                />
                {isToolsPage && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                )}
              </Link>

              {/* Dropdown Content */}
              {toolsDropdownOpen && (
                <div className="absolute top-full -left-4 w-80 bg-[#0d0e12]/95 border border-white/10 rounded-2xl p-3 shadow-2xl backdrop-blur-2xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-gray-500 border-b border-white/5 mb-1">
                    <span>Utility Categories</span>
          
                  </div>
                  
                  <div className="max-h-[320px] overflow-y-auto custom-scrollbar pr-1 space-y-1">
                    {toolCategories.map((cat, idx) => {
                      const Icon = cat.icon;

                      if (cat.isAvailable) {
                        return (
                          <Link
                            key={idx}
                            href={cat.href}
                            onClick={() => setToolsDropdownOpen(false)}
                            className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors group"
                          >
                            <div className={`p-2 rounded-lg border ${cat.color}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                                {cat.label}
                              </div>
                              <div className="text-[10px] text-gray-400 leading-tight">
                                {cat.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      }

                      {/* Non-active / Coming Soon Item */}
                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-2 rounded-xl opacity-40 cursor-not-allowed select-none"
                        >
                          <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-500">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-gray-400">
                                {cat.label}
                              </span>
                              <span className="text-[8px] font-black uppercase bg-white/10 text-gray-400 px-1.5 py-0.5 rounded border border-white/10">
                                In Development
                              </span>
                            </div>
                            <div className="text-[10px] text-gray-500 leading-tight">
                              {cat.desc}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explore All Tools */}
                  <div className="pt-2 border-t border-white/5 mt-1">
                    <Link
                      href="/tools"
                      onClick={() => setToolsDropdownOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 text-xs font-bold hover:bg-cyan-500/20 transition-colors border border-cyan-500/20"
                    >
                      <span className="flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Explore All Catalog</span>
                      </span>
                      <Wrench className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Custom Website Services Link */}
            <Link
              href="/service"
              className={`relative flex items-center gap-2 px-4 py-2 text-[11px] font-black uppercase tracking-widest transition-all duration-300 rounded-lg focus:outline-none ${
                isServicePage ? "text-cyan-400" : "text-gray-400 hover:text-white"
              }`}
            >
              <span>Custom Website</span>
              <span className="px-1.5 py-0.5 text-[8px] font-black bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full">
                Service
              </span>
              {isServicePage && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
              )}
            </Link>

          </div>

          {/* ================= RIGHT CTA BUTTON ================= */}
          <div className="hidden md:flex items-center">
            <Link
              href="/tools"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-black text-xs uppercase tracking-wider hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 transform hover:scale-105"
            >
              Launch Tools
            </Link>
          </div>

          {/* ================= MOBILE MENU TOGGLE ================= */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU DRAWER ================= */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#0a0a0c]/95 backdrop-blur-xl border-t border-white/[0.06] px-6 py-6 space-y-4">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={`block text-[11px] font-black uppercase tracking-widest ${
              isHomePage ? "text-cyan-400" : "text-gray-300"
            }`}
          >
            Home
          </Link>

          {/* Mobile Tools Category List */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <Link
              href="/tools"
              onClick={() => setMenuOpen(false)}
              className="block text-[11px] font-black uppercase text-cyan-400 tracking-widest"
            >
              Tools Suite Catalog
            </Link>
            {toolCategories.map((cat, idx) => {
              if (cat.isAvailable) {
                return (
                  <Link
                    key={idx}
                    href={cat.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-xs text-gray-300 hover:text-white pl-3 py-1 border-l border-cyan-500/50"
                  >
                    {cat.label}
                  </Link>
                );
              }
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs text-gray-600 pl-3 py-1 border-l border-white/5 select-none cursor-not-allowed"
                >
                  <span>{cat.label}</span>
                  <span className="text-[8px] uppercase tracking-widest text-gray-600 bg-white/5 px-1.5 py-0.5 rounded">Soon</span>
                </div>
              );
            })}
          </div>

          <Link
            href="/service"
            onClick={() => setMenuOpen(false)}
            className={`block text-[11px] font-black uppercase tracking-widest pt-2 border-t border-white/5 ${
              isServicePage ? "text-cyan-400" : "text-gray-300"
            }`}
          >
            Custom Website Services
          </Link>

          <div className="pt-2">
            <Link
              href="/tools"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center py-3 rounded-xl bg-cyan-500 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            >
              Launch Tools
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}