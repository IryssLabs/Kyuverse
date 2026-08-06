"use client";
import { useState, useMemo, useEffect } from "react";
import { calculatePrice, formatPrice, getFairnessStatus, validateCalculatorForm, } from "@/features/commission-calculator/utils/calculatorUtils";
import CustomSelect from "@/features/commission-calculator/components/CustomSelect";
import { CURRENCY_SYMBOLS } from "@/features/commission-calculator/data/calculatorData";

// Modal Imports (Dipindahkan dari page.js)
import FeedbackModal from "@/features/commission-calculator/components/FeedbackModal";
import SuggestionModal from "@/features/commission-calculator/components/SuggestionModal";
import ComingSoonModal from "@/features/commission-calculator/components/ComingSoonModal";

const LABEL_CLASS =
  "block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2.5";

const ART_TYPE_OPTIONS = [
  { value: "sketch", label: "Sketch / Lineart" },
  { value: "chibi", label: "Chibi / SD" },
  { value: "bust", label: "Bust / Half body" },
  { value: "fullbody", label: "Full body" },
  { value: "illustration", label: "Full illustration" },
  { value: "cosphoto", label: "Cosplay photo edit" },
  { value: "ref", label: "Character ref sheet" },
];

const REGION_OPTIONS = [
  { value: "id", label: "Indonesia" },
  { value: "sea", label: "Southeast Asia" },
  { value: "global", label: "Global" },
];

const EXPERIENCE_OPTIONS = [
  { value: "beginner", label: "Beginner (0-1 yr)" },
  { value: "emerging", label: "Emerging (1-3 yr)" },
  { value: "mid", label: "Mid-level (3-5 yr)" },
  { value: "senior", label: "Senior (5+ yr)" },
];

const BACKGROUND_OPTIONS = [
  { value: "none", label: "None / Flat color" },
  { value: "simple", label: "Simple / Gradient" },
  { value: "detailed", label: "Detailed scene" },
];

const COMPLEXITY_OPTIONS = [
  { value: "simple", label: "Simple" },
  { value: "medium", label: "Medium" },
  { value: "complex", label: "Complex" },
];

const COMMERCIAL_OPTIONS = [
  { value: "personal", label: "Personal only" },
  { value: "small", label: "Small commercial" },
  { value: "fullcomm", label: "Full commercial" },
];

const RUSH_OPTIONS = [
  { value: "normal", label: "Normal pace" },
  { value: "rush1w", label: "Rush (<1 week)" },
  { value: "rush3d", label: "Super rush (<3 days)" },
];

const REVISION_OPTIONS = [
  { value: "1", label: "1 revision" },
  { value: "2", label: "2 revisions" },
  { value: "3", label: "3 revisions" },
  { value: "unl", label: "Unlimited" },
];

export default function FormulaTab({ rates, currency, setCurrency, onPriceChange }) {
  const [form, setForm] = useState({
    artType: "fullbody",
    region: "id",
    experience: "emerging",
    hours: 6,
    chars: 1,
    background: "none",
    commercial: "personal",
    rush: "normal",
    complexity: "medium",
    revisions: "2",
  });

  // State untuk modal aksi
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);

  const setValue = (key) => (val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const handleHoursChange = (newHours) => {
    const validated = Math.max(1, Math.min(100, newHours));
    setForm((prev) => ({ ...prev, hours: validated }));
  };

  const result = useMemo(() => calculatePrice(form), [form]);
  const fairness = getFairnessStatus(result.hourlyEarned, result.minHourly);
  const validationErrors = useMemo(() => validateCalculatorForm(form), [form]);

  useEffect(() => {
    if (onPriceChange && result) {
      onPriceChange(result.mid);
    }
  }, [result.mid, onPriceChange]);

  const fairnessColors = {
    great: "text-green-400 border-green-500/20 bg-green-500/5",
    fair: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
    low: "text-amber-400 border-amber-500/20 bg-amber-500/5",
    danger: "text-red-400 border-red-500/20 bg-red-500/5",
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* ===== CURRENCY SELECTOR (NEW) ===== */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-bold text-white">Target Currency</h4>
          <p className="text-[11px] text-gray-500">Select currency for price conversion</p>
        </div>
        <div className="w-full sm:w-32">
          <CustomSelect
            value={currency}
            onChange={setCurrency}
            options={Object.keys(CURRENCY_SYMBOLS).map((c) => ({
              value: c,
              label: `${CURRENCY_SYMBOLS[c]} ${c}`,
            }))}
          />
        </div>
      </div>

      {/* ===== SECTION 1: PROJECT BASICS ===== */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
        <h3 className="text-sm font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs">
            1
          </span>
          Project Basics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <CustomSelect
            label="Art type"
            value={form.artType}
            onChange={setValue("artType")}
            options={ART_TYPE_OPTIONS}
          />
          <CustomSelect
            label="Market region"
            value={form.region}
            onChange={setValue("region")}
            options={REGION_OPTIONS}
          />
        </div>
      </div>

      {/* ===== SECTION 2: ARTIST LEVEL & TIME ===== */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
        <h3 className="text-sm font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs">
            2
          </span>
          Artist Level & Time
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <CustomSelect
            label="Your experience"
            value={form.experience}
            onChange={setValue("experience")}
            options={EXPERIENCE_OPTIONS}
          />

          <div>
            <label className={LABEL_CLASS}>Hours to complete</label>
            <div className="flex items-center gap-3 pt-2">
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={form.hours}
                onChange={(e) => handleHoursChange(Number(e.target.value))}
                className="w-full h-1.5 rounded-lg cursor-pointer accent-cyan-500 relative z-10"
              />
              <span className="text-sm font-bold text-cyan-400 w-12 text-right">
                {form.hours}h
              </span>
            </div>
            <div className="text-[10px] text-gray-500 mt-1.5">
              1–100 hours
            </div>
          </div>
        </div>
      </div>

      {/* ===== SECTION 3: PROJECT DETAILS ===== */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
        <h3 className="text-sm font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs">
            3
          </span>
          Project Details
        </h3>

        <div className="mb-3 sm:mb-4">
          <label className={LABEL_CLASS}>Characters</label>
          <div className="flex items-center gap-3 pt-2">
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={form.chars}
              onChange={(e) => setForm((p) => ({ ...p, chars: Number(e.target.value) }))}
              className="w-full h-1.5 rounded-lg cursor-pointer accent-cyan-500 relative z-10"
              aria-label="Number of characters"
            />
            <span className="text-sm font-bold text-cyan-400 w-6 text-right">
              {form.chars}
            </span>
          </div>
          <div className="text-[10px] text-gray-500 mt-1.5">
            1st char included • +35% per additional
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
          <CustomSelect
            label="Background"
            value={form.background}
            onChange={setValue("background")}
            options={BACKGROUND_OPTIONS}
          />
          <CustomSelect
            label="Complexity"
            value={form.complexity}
            onChange={setValue("complexity")}
            options={COMPLEXITY_OPTIONS}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <CustomSelect
            label="Usage rights"
            value={form.commercial}
            onChange={setValue("commercial")}
            options={COMMERCIAL_OPTIONS}
          />
          <CustomSelect
            label="Rush order"
            value={form.rush}
            onChange={setValue("rush")}
            options={RUSH_OPTIONS}
          />
          <CustomSelect
            label="Revisions"
            value={form.revisions}
            onChange={setValue("revisions")}
            options={REVISION_OPTIONS}
          />
        </div>
      </div>

      {/* ===== RESULT CARD ===== */}
      <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-4 sm:p-6">
        <div className="flex items-start justify-between mb-4 gap-3">
          <div className="flex-1">
            <p className="text-[11px] uppercase tracking-widest text-cyan-400/70 font-bold mb-1">
              Suggested price
            </p>
            <p className="text-3xl sm:text-4xl font-black text-white">
              {formatPrice(result.mid, currency, rates)}
            </p>
          </div>
          <div
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold border whitespace-nowrap ${fairnessColors[fairness.status]}`}
          >
            {fairness.label}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-5">
          {[
            { label: "Minimum", val: result.min, color: "text-gray-400" },
            { label: "Suggested", val: result.mid, color: "text-cyan-400" },
            { label: "Premium", val: result.max, color: "text-purple-400" },
            { label: "Deposit 50%", val: result.deposit, color: "text-amber-400" },
          ].map(({ label, val, color }) => (
            <div
              key={label}
              className="rounded-xl border border-white/10 bg-white/5 p-2.5 sm:p-3 text-center"
            >
              <p className="text-[10px] text-gray-300 mb-1">{label}</p>
              <p className={`text-xs sm:text-sm font-bold ${color}`}>
                {formatPrice(val, currency, rates)}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-black/20 px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs sm:text-sm text-gray-400">
                Hourly rate:{" "}
                <span className="text-white font-semibold">
                  {formatPrice(result.hourlyEarned, currency, rates)}/hr
                </span>
              </span>
            </div>
            <span className="text-xs text-gray-500">Based on {form.hours}h work</span>
          </div>

          {(fairness.status === "low" || fairness.status === "danger") && (
            <p className="text-xs text-amber-400/80 mt-2 pl-6">
              💡 Consider raising your price or reducing scope to value your time fairly.
            </p>
          )}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
          <div className="text-[10px] text-blue-300/80">
            <strong className="block mb-1 text-xs text-blue-400">How it's calculated:</strong>
            <p className="mb-2 italic text-gray-400">Formula = Max(Base Price, Hourly Rate × Hours) × Modifiers</p>
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>Step 1:</strong> Takes the higher value between your base art price or your hourly effort ({form.hours}h × rate).</li>
              <li><strong>Step 2:</strong> Multiplies the result based on your selected add-ons (characters, background, commercial rights, rush order, etc.).</li>
            </ul>
          </div>
        </div>
        
        <br />
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
          <p className="text-xs text-amber-300">
            ⚠️ <strong>Beta:</strong> These price estimates are based on personal research and experience. Help us improve this tool to better reflect real market rates by sharing your feedback!
          </p>
        </div>
      </div>

      {/* ===== ACTION BUTTONS (MOVED HERE) ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
        <button
          onClick={() => setShowFeedbackModal(true)}
          className="py-3 px-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-semibold text-sm transition-colors w-full"
        >
          Feedback
        </button>

        <button
          onClick={() => setShowComingSoonModal(true)}
          className="py-3 px-4 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-semibold text-sm transition-colors w-full"
        >
          Download Report
        </button>

        <button
          onClick={() => setShowSuggestionModal(true)}
          className="py-3 px-4 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 font-semibold text-sm transition-colors w-full"
        >
          Suggest option
        </button>
      </div>

      {/* Modals Local Container */}
      <FeedbackModal isOpen={showFeedbackModal} onClose={() => setShowFeedbackModal(false)} finalPrice={result.mid} />
      <SuggestionModal isOpen={showSuggestionModal} onClose={() => setShowSuggestionModal(false)} />
      <ComingSoonModal isOpen={showComingSoonModal} onClose={() => setShowComingSoonModal(false)} />
    </div>
  );
}