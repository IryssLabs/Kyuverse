"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { plans, stats, audienceIcons, addOnServices, artistSelfDesignNote } from "@/data/pricingPlans";
import { getAccentClasses } from "@/utils/pricingStyles";

export default function Pricing() {
  const [isVisible, setIsVisible] = useState(false);
  const [currency, setCurrency] = useState("IDR");
  const [activeTooltip, setActiveTooltip] = useState(null);
  const sectionRef = useRef(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveTooltip(null);
    if (activeTooltip) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeTooltip]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative py-32 overflow-hidden bg-[#0a0a0c]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/contactme.png"
          alt="Pricing background"
          fill
          priority
          quality={100}
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/50 to-[#0a0a0c]/50" />
      </div>

      {/* Glow Blobs & Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-2/3 left-1/2 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-10 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-tighter text-white">
            Services for{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Artists & Cosplayers
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            Beautiful websites to showcase your craft and monetize commissions.
            Clear, upfront pricing. Free domain & server for the first year.
          </p>
        </div>

        {/* Currency Toggle */}
        <div
          className={`flex justify-center mb-16 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-xl p-1 backdrop-blur-sm">
            {["IDR", "USD"].map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-300 cursor-pointer ${currency === c
                    ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.3)] scale-105"
                    : "text-gray-500 hover:text-white hover:bg-white/5"
                  }`}
              >
                {c === "IDR" ? "🇮🇩 IDR" : "🌍 USD"}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards — Row 1: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {plans.slice(0, 3).map((plan, index) => {
            const accent = getAccentClasses(plan);
            return (
              <div
                key={plan.id}
                className={`relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  } ${plan.featured ? "md:z-10" : ""}`}
                style={{ transitionDelay: `${200 + index * 120}ms` }}
              >
                <div
                  className={`relative rounded-2xl p-8 border transition-all duration-300 group backdrop-blur-sm h-full flex flex-col ${accent.bg} ${accent.border} ${accent.shadow} ${plan.featured ? "md:py-12" : ""
                    }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className={`text-[9px] font-black uppercase tracking-[0.2em] px-5 py-1.5 rounded-full ${accent.badge}`}>
                        {plan.badge}
                      </div>
                    </div>
                  )}

                  {/* Ideal For Badge */}
                  {plan.idealFor && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {plan.idealFor.map((type) => (
                        <span
                          key={type}
                          className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${type === "cosplayer"
                              ? "bg-pink-500/15 text-pink-400 border border-pink-500/30"
                              : type === "artist"
                                ? "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                                : "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                            }`}
                        >
                          {React.createElement(audienceIcons[type], { className: "w-3 h-3 inline mr-1" })} {type === "cosplayer" ? "Cosplayer" : type === "artist" ? "Artist" : "For All"}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Plan Label */}
                  <div className="mb-6">
                    <p className={`text-[10px] uppercase tracking-[0.3em] font-black mb-2 ${accent.label}`}>
                      {plan.label}
                    </p>
                    <p className="text-gray-400 text-xs leading-relaxed">{plan.tagline}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 pb-8 border-b border-white/10">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-gray-600 text-sm line-through">
                        {currency === "IDR" ? plan.originalPriceIDR : plan.originalPriceUSD}
                      </span>
                      <span className="text-[9px] text-amber-400 uppercase font-black tracking-widest bg-amber-400/10 px-2 py-0.5 rounded">
                        Early Bird
                      </span>
                    </div>
                    <div key={currency} className="transition-all duration-300">
                      <span className={`text-4xl font-black tracking-tight ${plan.featured ? "text-white" : "text-gray-200"}`}>
                        {currency === "IDR" ? plan.priceIDR : plan.priceUSD}
                      </span>
                    </div>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-2 font-bold">
                      Free 1st Yr Domain & Server
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map(({ icon: Icon, text, tooltip }, featureIndex) => {
                      const tooltipId = `${plan.id}-${featureIndex}`;
                      const isActive = activeTooltip === tooltipId;
                      return (
                        <li key={text} className="flex items-start gap-3 group/feature">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${accent.iconBg}`}>
                            <Icon className={`w-3.5 h-3.5 ${accent.iconColor}`} />
                          </div>
                          <div className="relative flex-1">
                            <span 
                              onClick={(e) => {
                                if (tooltip) {
                                  e.stopPropagation();
                                  setActiveTooltip(isActive ? null : tooltipId);
                                }
                              }}
                              className={`text-xs font-medium leading-snug transition-colors inline ${tooltip ? 'text-gray-300 hover:text-white cursor-pointer border-b border-dotted border-gray-500 md:cursor-help' : 'text-gray-300 hover:text-white'}`}
                            >
                              {text}
                            </span>
                            {tooltip && (
                              <div className={`absolute top-full left-0 mt-2 w-64 p-3 bg-[#1a1a1c] border border-white/10 rounded-xl shadow-xl z-50 md:bottom-full md:top-auto md:mt-0 md:mb-2 transition-all duration-200 ${isActive ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover/feature:opacity-100 md:group-hover/feature:visible'}`}>
                                <p className="text-[11px] text-gray-300 leading-relaxed">{tooltip}</p>
                                <div className="absolute bottom-full left-4 w-2 h-2 bg-[#1a1a1c] border-l border-t border-white/10 rotate-45 -mb-1 md:hidden"></div>
                                <div className="hidden md:block md:absolute md:top-full md:left-4 md:w-2 md:h-2 md:bg-[#1a1a1c] md:border-r md:border-b md:border-white/10 md:rotate-45 md:-mt-1"></div>
                              </div>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={`/contact?package=${plan.id}`}
                    className={`block w-full text-center py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 ${accent.cta}`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Cards — Row 2: 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:max-w-3xl md:mx-auto mt-8">
          {plans.slice(3, 5).map((plan, index) => {
            const accent = getAccentClasses(plan);
            return (
              <div
                key={plan.id}
                className={`relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                style={{ transitionDelay: `${560 + index * 120}ms` }}
              >
                <div
                  className={`relative rounded-2xl p-8 border transition-all duration-300 group backdrop-blur-sm h-full flex flex-col ${accent.bg} ${accent.border} ${accent.shadow}`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className={`text-[9px] font-black uppercase tracking-[0.2em] px-5 py-1.5 rounded-full ${accent.badge}`}>
                        {plan.badge}
                      </div>
                    </div>
                  )}

                  {/* Ideal For Badge */}
                  {plan.idealFor && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {plan.idealFor.map((type) => (
                        <span
                          key={type}
                          className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${type === "cosplayer"
                              ? "bg-pink-500/15 text-pink-400 border border-pink-500/30"
                              : type === "artist"
                                ? "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                                : "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                            }`}
                        >
                          {React.createElement(audienceIcons[type], { className: "w-3 h-3 inline mr-1" })} {type === "cosplayer" ? "Cosplayer" : type === "artist" ? "Artist" : "For All"}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Plan Label */}
                  <div className="mb-6">
                    <p className={`text-[10px] uppercase tracking-[0.3em] font-black mb-2 ${accent.label}`}>
                      {plan.label}
                    </p>
                    <p className="text-gray-400 text-xs leading-relaxed">{plan.tagline}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 pb-8 border-b border-white/10">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-gray-600 text-sm line-through">
                        {currency === "IDR" ? plan.originalPriceIDR : plan.originalPriceUSD}
                      </span>
                      <span className="text-[9px] text-amber-400 uppercase font-black tracking-widest bg-amber-400/10 px-2 py-0.5 rounded">
                        Early Bird
                      </span>
                    </div>
                    <div key={currency} className="transition-all duration-300">
                      <span className="text-4xl font-black tracking-tight text-gray-200">
                        {currency === "IDR" ? plan.priceIDR : plan.priceUSD}
                      </span>
                    </div>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-2 font-bold">
                      Free 1st Yr Domain & Server
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map(({ icon: Icon, text, tooltip }, featureIndex) => {
                      const tooltipId = `${plan.id}-${featureIndex}`;
                      const isActive = activeTooltip === tooltipId;
                      return (
                        <li key={text} className="flex items-start gap-3 group/feature">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${accent.iconBg}`}>
                            <Icon className={`w-3.5 h-3.5 ${accent.iconColor}`} />
                          </div>
                          <div className="relative flex-1">
                            <span 
                              onClick={(e) => {
                                if (tooltip) {
                                  e.stopPropagation();
                                  setActiveTooltip(isActive ? null : tooltipId);
                                }
                              }}
                              className={`text-xs font-medium leading-snug transition-colors inline ${tooltip ? 'text-gray-300 hover:text-white cursor-pointer border-b border-dotted border-gray-500 md:cursor-help' : 'text-gray-300 hover:text-white'}`}
                            >
                              {text}
                            </span>
                            {tooltip && (
                              <div className={`absolute top-full left-0 mt-2 w-64 p-3 bg-[#1a1a1c] border border-white/10 rounded-xl shadow-xl z-50 md:bottom-full md:top-auto md:mt-0 md:mb-2 transition-all duration-200 ${isActive ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover/feature:opacity-100 md:group-hover/feature:visible'}`}>
                                <p className="text-[11px] text-gray-300 leading-relaxed">{tooltip}</p>
                                <div className="absolute bottom-full left-4 w-2 h-2 bg-[#1a1a1c] border-l border-t border-white/10 rotate-45 -mb-1 md:hidden"></div>
                                <div className="hidden md:block md:absolute md:top-full md:left-4 md:w-2 md:h-2 md:bg-[#1a1a1c] md:border-r md:border-b md:border-white/10 md:rotate-45 md:-mt-1"></div>
                              </div>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={`/contact?package=${plan.id}`}
                    className={`block w-full text-center py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 ${accent.cta}`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional Add-ons Section */}
        <div
          className={`mt-16 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-2">
                Enhance Your Package
              </p>
              <h3 className="text-xl font-bold text-white mb-2">
                Optional Add-ons
              </h3>
              <p className="text-gray-500 text-xs">
                Customize your site with professional design services
              </p>
            </div>

            {/* Add-on Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {addOnServices.map((service, index) => {
                const ServiceIcon = service.icon;
                return (
                  <div
                    key={service.id}
                    className="group relative rounded-2xl p-6 bg-[#0a0a0c]/80 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-400/5 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] transition-all duration-300 cursor-default"
                    style={{ transitionDelay: `${700 + index * 100}ms` }}
                  >
                    {/* Icon Header */}
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/5 group-hover:border-cyan-400/10 transition-colors duration-300">
                      <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center group-hover:bg-cyan-400/20 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.3)] transition-all duration-300">
                        <ServiceIcon className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                        {service.title}
                      </h4>
                    </div>

                    {/* Description */}
                    <p className="text-[11px] text-gray-400 group-hover:text-gray-300 leading-relaxed mb-4 min-h-[2.5rem] transition-colors duration-300">
                      {service.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-cyan-400 group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-all duration-300">
                        {currency === "IDR" ? service.priceIDR : service.priceUSD}
                      </span>
                      <span className="text-[10px] text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                        {currency === "IDR" ? service.priceUSD : service.priceIDR}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Artist Self-Design Note */}
            <div className="mt-8 p-5 rounded-2xl bg-purple-500/5 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center shrink-0">
                  {(() => {
                    const NoteIcon = artistSelfDesignNote.icon;
                    return <NoteIcon className="w-6 h-6 text-purple-400" />;
                  })()}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-purple-300 mb-1">
                    {artistSelfDesignNote.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {artistSelfDesignNote.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Project CTA */}
        <div
          className={`flex flex-col items-center justify-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <a
            href="https://ig.me/m/kandaputrah?text=Hi%20Kanda!%20I'm%20interested%20in%20collaborating%20with%20you%20on%20a%20custom%20project%20💼✨"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#0a0a0c]/80 border border-white/10 text-white font-black text-xs tracking-widest uppercase hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm shadow-[0_0_30px_rgba(34,211,238,0.1)] hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-2.5">
              Need a Custom Solution? Discuss Your Project
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform text-cyan-400" />
            </span>
          </a>
        </div>

        {/* Fine Print */}
        <div
          className={`flex justify-center mt-8 px-6 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
         
        </div>

        {/* Trust Stats */}
        <div
          className={`grid grid-cols-3 gap-6 mt-16 border-t border-white/5 pt-10 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center group cursor-default">
              <div
                className={`text-2xl font-black group-hover:scale-110 transition-all duration-300 ${stat.color === "cyan"
                    ? "text-cyan-400/80 group-hover:text-cyan-400"
                    : "text-purple-400/80 group-hover:text-purple-400"
                  }`}
              >
                {stat.value}
              </div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient Animation Style */}
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