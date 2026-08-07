"use client";

import { useState } from "react";
import { useExchangeRates } from "@/features/commission-calculator/hooks/useExchangeRates";
import BetaModal from "@/features/commission-calculator/components/BetaModal";
import CosplayRentalTab from "@/features/commission-calculator/components/CosplayRentalTab";
import FormulaTab from "@/features/commission-calculator/components/FormulaTab";
import Image from "next/image";

const TABS = [
  { id: "formula", label: "Price calculator" },
  { id: "rental", label: "Cosplay Rental" },
];

export default function CommissionCalculatorClient() {
  const [activeTab, setActiveTab] = useState("formula");
  const [currency, setCurrency] = useState("IDR");
  const [showModal, setShowModal] = useState(true);
  const { rates, loading, isLive } = useExchangeRates();
  const [finalPrice, setFinalPrice] = useState(null);

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white relative">
      {/* Background Image Layer */}
      <div className="fixed inset-0 z-0 opacity-15 pointer-events-none">
        <Image
          src="/tool-clean.webp"
          alt="Pricing background"
          fill
          priority
          quality={100}
          className="object-cover opacity-50"
          sizes="100vw"
        />
      </div>

      {/* Overlay */}
      <div className="fixed inset-0 -z-10 bg-[#0a0a0c]/20 pointer-events-none" />

      {/* Header */}
      <div className="border-b border-white/10 bg-[#0a0a0c]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <a
              href="/tools"
              className="flex-shrink-0 flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">Back</span>
            </a>
            <div className="hidden sm:block h-4 w-px bg-white/10 flex-shrink-0" />
            <div className="min-w-0">
              <h1 className="text-sm sm:text-lg font-black tracking-tight leading-tight truncate">
                Commission Price Calculator
              </h1>
              <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 hidden sm:block">
                For digital artists & cosplayers — Indo, SEA & global
              </p>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="relative flex h-1.5 w-1.5">
                {!loading && isLive && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                )}
                <div
                  className={`relative inline-flex rounded-full w-1.5 h-1.5 ${
                    loading ? "bg-gray-500 animate-pulse" : isLive ? "bg-green-400" : "bg-amber-400"
                  }`}
                />
              </div>
              <span className="text-[10px] text-gray-500 hidden sm:inline">
                {loading ? "loading rates..." : isLive ? "live Rates" : "cached rates"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Disclaimer Card */}
        <div className="mb-6 sm:mb-8 rounded-2xl border border-amber-500/30 bg-black/40 backdrop-blur-md px-4 sm:px-5 py-3 sm:py-4 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-amber-400 font-bold mb-1 flex items-center gap-2">
                Beta Calculator — Data still being refined
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                The calculator suggests a fair starting point based on your time, experience, and estimated market rates. You always set your own final price — charge more if your portfolio justifies it, adjust for returning clients, or price differently for passion projects.
                <span className="text-amber-400/80 font-medium"> Your art, your rules.</span>
              </p>
              <p className="text-xs text-gray-500 mt-2 italic">
                These estimates are continuously improving. Help us match real market rates by sharing your feedback!
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 sm:mb-8 border-b border-white/10 pb-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 text-xs sm:text-sm font-bold tracking-tight border-b-2 transition-all duration-200 ${
                activeTab === tab.id
                  ? "border-cyan-500 text-white"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "formula" && (
          <FormulaTab 
            rates={rates} 
            currency={currency} 
            setCurrency={setCurrency} 
            onPriceChange={setFinalPrice} 
          />
        )}

        {activeTab === "rental" && (
          <CosplayRentalTab onPriceChange={setFinalPrice} />
        )}

        {/* Footer */}
        <div className="mt-10 sm:mt-12 text-center">
          <p className="text-[11px] text-gray-600">
            © 2026 Kyuverse. All rights reserved.{" "}
            <a href="https://www.kyuverse.my.id" className="text-cyan-600 hover:text-cyan-400 transition-colors">
              Kyuverse
            </a>{" "}
            — free tool for the artist & cosplay community
          </p>
        </div>
      </div>

      <BetaModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </main>
  );
}