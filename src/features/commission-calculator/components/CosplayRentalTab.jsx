"use client";
import { useState, useMemo } from "react";
import CustomSelect from "@/features/commission-calculator/components/CustomSelect";

// ============ CONSTANTS (FOR PREVIEW) ============
const LABEL_CLASS = "block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2.5";

const EVENT_OPTIONS = [
  { value: "comifuro", label: "Comic Frontier (Comifuro)" },
  { value: "itb", label: "Indonesia Anime Con (INACON)" },
  { value: "custom", label: "Custom Local Event" },
];

const CHARACTER_OPTIONS = [
  { value: "furina", label: "Furina (Genshin Impact)" },
  { value: "hutao", label: "Hu Tao (Genshin Impact)" },
  { value: "custom", label: "Other Character / Custom" },
];

const ACCOM_OPTIONS = [
  { value: "none", label: "No Lodging (Local)" },
  { value: "shared", label: "Shared Room / Kost" },
  { value: "hotel", label: "Hotel / AirBnB" },
];

export default function CosplayRentalTab() {
  // Mock interactive state for sneak peek preview
  const [form, setForm] = useState({
    eventType: "comifuro",
    isCosplaying: true,
    character: "furina",
    days: 2,
    accommodation: "hotel",
  });

  // Dynamic preview calculation based on user playing with choices
  const previewData = useMemo(() => {
    const baseTicket = form.eventType === "comifuro" ? 150000 : 100000;
    const ticketTotal = baseTicket * form.days;
    const foodAndTransport = 150000 * form.days;
    const lodging = form.accommodation === "hotel" ? 400000 * (form.days - 1) : 0;
    
    let rentalCost = 0;
    let depositCost = 0;
    if (form.isCosplaying) {
      rentalCost = form.character === "furina" ? 180000 : 140000;
      depositCost = 100000; // Refundable
    }

    const realCost = ticketTotal + foodAndTransport + lodging + rentalCost;
    const upfrontTotal = realCost + depositCost;

    return { upfrontTotal, ticketTotal, lodging, rentalCost, depositCost, realCost };
  }, [form]);

  const formatIDR = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="space-y-4 sm:space-y-6 relative">
      
      {/* ===== GLOBAL COMING SOON OVERLAY FLOATER ===== */}
      <div className="absolute inset-x-0 -top-2 bottom-0 z-50 bg-black/40 backdrop-blur-[3px] rounded-2xl flex flex-col items-center justify-center p-4 text-center border border-pink-500/20">
        <div className="max-w-md bg-zinc-900/90 border border-pink-500/30 p-6 rounded-2xl shadow-2xl space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-pink-500/30 bg-pink-500/10 text-pink-400 animate-pulse">
               Coming Soon Feature
          </span>
          <h3 className="text-xl font-black text-white">Ultimate Event & Cosplay Calculator</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Planning to attend **Comifuro**, **AFA**, or local cons? Soon you can calculate your entire event budget—from tickets, transport, hotel, food, down to specific character costume rentals and deposits in one place.
          </p>
          <div className="pt-2 text-[11px] text-pink-400/80 font-medium">
             You can still play with the preview options below!
          </div>
        </div>
      </div>

      {/* ===== SECTION 1: EVENT BASICS ===== */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 pointer-events-auto">
        <h3 className="text-sm font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 text-xs">
            1
          </span>
          Event & Attendance
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <CustomSelect
            label="Target Event"
            value={form.eventType}
            onChange={(val) => setForm(p => ({ ...p, eventType: val }))}
            options={EVENT_OPTIONS}
          />
          <div>
            <label className={LABEL_CLASS}>Event Duration</label>
            <div className="flex items-center gap-3 pt-2">
              <input
                type="range"
                min="1"
                max="3"
                step="1"
                value={form.days}
                onChange={(e) => setForm(p => ({ ...p, days: Number(e.target.value) }))}
                className="w-full h-1.5 rounded-lg cursor-pointer accent-pink-500 relative z-10"
              />
              <span className="text-sm font-bold text-pink-400 w-12 text-right">
                {form.days} Day(s)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== SECTION 2: COSPLAY CONFIG (OPTIONAL TOGGLE) ===== */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 pointer-events-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 text-xs">
              2
            </span>
            Cosplay Plan
          </h3>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-300">
            <input 
              type="checkbox" 
              checked={form.isCosplaying} 
              onChange={(e) => setForm(p => ({ ...p, isCosplaying: e.target.checked }))}
              className="rounded border-gray-700 bg-zinc-900 text-pink-500 focus:ring-pink-500/50 h-4 w-4"
            />
            I want to Cosplay
          </label>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 transition-opacity duration-200 ${form.isCosplaying ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
          <CustomSelect
            label="Character Costume"
            value={form.character}
            onChange={(val) => setForm(p => ({ ...p, character: val }))}
            options={CHARACTER_OPTIONS}
          />
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-center">
            <span className="text-[10px] uppercase text-gray-400 font-bold mb-1">Estimated Deposit</span>
            <span className="text-sm font-bold text-amber-400">{form.isCosplaying ? formatIDR(100000) : formatIDR(0)}</span>
          </div>
        </div>
      </div>

      {/* ===== SECTION 3: LOGISTICS & ACCOMMODATION ===== */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 pointer-events-auto">
        <h3 className="text-sm font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 text-xs">
            3
          </span>
          Logistics & Accommodation
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <CustomSelect
            label="Stay & Lodging"
            value={form.accommodation}
            onChange={(val) => setForm(p => ({ ...p, accommodation: val }))}
            options={ACCOM_OPTIONS}
          />
          <div className="text-[11px] text-gray-400 flex items-center italic pt-2 sm:pt-6">
            * Includes standard local convention transport & meals multiplier per day.
          </div>
        </div>
      </div>

      {/* ===== SNEAK PEEK RESULT CARD ===== */}
      <div className="rounded-2xl border border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-purple-500/5 p-4 sm:p-6 pointer-events-auto">
        
        <div className="flex items-start justify-between mb-4 gap-3">
          <div className="flex-1">
            <p className="text-[11px] uppercase tracking-widest text-pink-400/70 font-bold mb-1">
              Estimated Upfront Budget Needed
            </p>
            <p className="text-3xl sm:text-4xl font-black text-white">
              {formatIDR(previewData.upfrontTotal)}
            </p>
          </div>
          <div className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold border border-amber-500/20 bg-amber-500/5 text-amber-400 whitespace-nowrap">
             {form.isCosplaying ? "Deposit Included" : "No Deposit Needed"}
          </div>
        </div>

        {/* Breakdown Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
          {[
            { label: "Tickets & Logistics", val: previewData.ticketTotal, color: "text-white" },
            { label: "Lodging / Stay", val: previewData.lodging, color: "text-cyan-400" },
            { label: "Costume Rental", val: previewData.rentalCost, color: "text-pink-400" },
            { label: "Refundable Deposit", val: previewData.depositCost, color: "text-amber-400" },
          ].map(({ label, val, color }) => (
            <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-center">
              <p className="text-[10px] text-gray-400 mb-1">{label}</p>
              <p className={`text-xs sm:text-sm font-bold ${color}`}>{formatIDR(val)}</p>
            </div>
          ))}
        </div>

        {/* Real Cost Highlight */}
        <div className="rounded-xl bg-black/20 px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-300">
          <div className="flex justify-between items-center">
            <span>Real Expenses (Uang Habis):</span>
            <span className="font-bold text-red-400">{formatIDR(previewData.realCost)}</span>
          </div>
          {form.isCosplaying && (
            <p className="text-[10px] text-gray-500 mt-1.5 italic">
              * Deposit ({formatIDR(previewData.depositCost)}) tidak dimasukkan ke pengeluaran riil karena uangnya akan kembali setelah event selesai.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}