"use client";

import { useState } from "react";
import { CheckCircle2, Sparkles, Plus, ChevronDown, ChevronUp } from "lucide-react";

// Helper: detect if a hex color is light
function isLightColor(hex) {
  if (!hex || !hex.startsWith("#")) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 155;
}

export default function ColorSwatchGrid({ colorOptions, selectedColors, onToggle }) {
  const [showAll, setShowAll] = useState(false);

  // Separate special options (Surprise Me, Custom) from regular colors
  const specialOptions = colorOptions.filter((c) => c.special || c.custom);
  const regularColors = colorOptions.filter((c) => !c.special && !c.custom);

  // Show first 30 colors initially
  const visibleColors = showAll ? regularColors : regularColors.slice(0, 30);

  return (
    <div className="space-y-3">
      {/* Selected display */}
      {selectedColors.length > 0 && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
          <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold shrink-0">
            Selected:
          </span>
          <div className="flex gap-1.5 flex-wrap">
            {selectedColors.map((val) => {
              const opt = colorOptions.find((c) => c.value === val);
              if (!opt) return null;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => onToggle(val)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold text-white border border-white/20 hover:border-red-400/50 hover:text-red-300 transition-all"
                  style={
                    opt.special
                      ? { borderColor: "rgba(250,204,21,0.5)" }
                      : opt.custom
                      ? { borderColor: "rgba(244,114,182,0.5)" }
                      : { borderColor: `${opt.color}60` }
                  }
                >
                  {opt.special ? (
                    <Sparkles className="w-2.5 h-2.5 text-yellow-400" />
                  ) : opt.custom ? (
                    <Plus className="w-2.5 h-2.5 text-pink-400" />
                  ) : (
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: opt.color }}
                    />
                  )}
                  {opt.label}
                  <span className="text-gray-600">×</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Special options row */}
      <div className="flex gap-2">
        {specialOptions.map((c) => {
          const isSurprise = c.special;
          const isSelected = selectedColors.includes(c.value);
          return (
            <button
              key={c.value}
              type="button"
              onClick={() => onToggle(c.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold border transition-all duration-200 cursor-pointer ${
                isSurprise
                  ? isSelected
                    ? "bg-yellow-400/15 border-yellow-400/70 text-yellow-300 shadow-[0_0_14px_rgba(250,204,21,0.35)]"
                    : "border-yellow-400/30 text-yellow-500/70 hover:bg-yellow-400/10 hover:text-yellow-300"
                  : isSelected
                  ? "bg-pink-400/15 border-pink-400/70 text-pink-300 shadow-[0_0_14px_rgba(244,114,182,0.35)]"
                  : "border-pink-400/30 text-pink-500/70 hover:bg-pink-400/10 hover:text-pink-300"
              }`}
            >
              {isSurprise ? (
                <Sparkles className="w-3.5 h-3.5" />
              ) : (
                <Plus className="w-3.5 h-3.5" />
              )}
              {c.label}
            </button>
          );
        })}
        <span className="ml-auto text-[10px] text-gray-600 self-center font-bold">
          {selectedColors.filter((v) => v !== "surprise").length}/3 chosen
        </span>
      </div>

      {/* Swatch grid */}
      <div
        className="rounded-xl border border-white/8 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        <div className="grid p-3 gap-1.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(28px, 1fr))" }}>
          {visibleColors.map((c) => {
            const isSelected = selectedColors.includes(c.value);
            const canSelect = selectedColors.length < 3 || isSelected;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => canSelect && onToggle(c.value)}
                title={c.label}
                className={`relative w-full aspect-square rounded-lg transition-all duration-200 cursor-pointer group ${
                  isSelected
                    ? "scale-110 ring-2 ring-white ring-offset-1 ring-offset-[#0a0a0c]"
                    : canSelect
                    ? "hover:scale-105 hover:ring-1 hover:ring-white/50"
                    : "opacity-30 cursor-not-allowed"
                }`}
                style={{ backgroundColor: c.color }}
              >
                {isSelected && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <CheckCircle2
                      className="w-3 h-3 drop-shadow-lg"
                      style={{
                        color: isLightColor(c.color) ? "#000" : "#fff",
                      }}
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Show more/less toggle */}
        {regularColors.length > 30 && (
          <button
            type="button"
            onClick={() => setShowAll((p) => !p)}
            className="w-full py-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-cyan-400 border-t border-white/8 flex items-center justify-center gap-1.5 transition-colors"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                +{regularColors.length - 30} More Colors{" "}
                <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
