"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowRight, Calculator, } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TOOLS = [
  {
    id: "commission-calculator",
    icon: Calculator,
    badge: "Live",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    title: "Commission Price Calculator",
    description:
      "Not sure what to charge? Get a fair price estimate based on your time, experience, and market rates — Indo, SEA & global.",
    href: "/tools/commission-calculator",
    accent: "group-hover:text-cyan-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]",
    border: "group-hover:border-cyan-500/30",
    cta: "Calculate your price",
    available: true,
  },

];

export default function Tools() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="tools"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0c]"
    >

      {/* Tambahkan ini di paling atas layer children */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/tools.webp" 
          alt="Background"
          fill
          className="object-cover"
          priority 
        />
      </div>
      {/* Ambient glow blobs — consistent with Projects.jsx */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float-delayed" />
      </div>

      {/* Top fade from previous section */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0a0a0c] to-transparent z-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">

        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <span
            className={`px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-[10px] font-black tracking-[0.3em] uppercase backdrop-blur-sm inline-block mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            Free Tools
          </span>

          <h2
            className={`text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tighter text-white mb-6 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            Built for{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              artists & cosplayers
            </span>
          </h2>

          <p
            className={`text-base md:text-lg text-gray-400 leading-relaxed transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            Free tools to help you price your work fairly, protect yourself with
            proper terms, and grow your creative career — no account needed.
          </p>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TOOLS.map((tool, i) => {
            const Icon = tool.icon;
            const Wrapper = tool.available ? Link : "div";
            const wrapperProps = tool.available ? { href: tool.href } : {};

            return (
              <Wrapper
                key={tool.id}
                {...wrapperProps}
                className={`group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 ${tool.glow} ${tool.border} ${tool.available ? "cursor-pointer" : "cursor-default opacity-60"
                  } ${isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                  }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                {/* Badge */}
                <span
                  className={`inline-block text-[10px] font-black tracking-widest uppercase border rounded-full px-3 py-1 mb-4 ${tool.badgeColor}`}
                >
                  {tool.badge}
                </span>

                {/* Icon */}
                <div className={`mb-4 transition-colors duration-300 text-gray-500 ${tool.accent}`}>
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3
                  className={`text-lg font-black text-white mb-2 tracking-tight transition-colors duration-300 ${tool.accent}`}
                >
                  {tool.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  {tool.description}
                </p>

                {/* CTA */}
                <div
                  className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-colors duration-300 ${tool.available ? `text-gray-500 ${tool.accent}` : "text-gray-700"
                    }`}
                >
                  {tool.cta}
                  {tool.available && (
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 4s ease infinite; }
      `}</style>
    </section>
  );
}