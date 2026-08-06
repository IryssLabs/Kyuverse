"use client";
import { Download, Sparkles, Clock, } from "lucide-react";

export default function ComingSoonModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-md w-full rounded-2xl border border-orange-500/40 bg-gradient-to-br from-[#1a1a1e] to-[#0f0f12] p-5 sm:p-6 shadow-2xl shadow-orange-500/10 mx-4">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center text-center">

          {/* Icon */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-orange-500/20 flex items-center justify-center mb-3 sm:mb-4">
            <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-orange-400" />
          </div>

          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-orange-500/25 mb-3">
            Coming Soon
          </span>

          <h2 className="text-base sm:text-lg font-bold text-white mb-2">
            Export & Download
          </h2>

          <p className="text-orange-400 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
            We're actively working on this feature
          </p>

          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-5 sm:mb-6">
            Invoice exports, PDF downloads, and market price reports are in active development. We're committed to delivering a polished experience when it launches.
          </p>

          {/* Support box */}
          <div className="mb-5 sm:mb-6 rounded-xl border border-white/5 bg-white/5 p-3 flex items-start gap-2.5 w-full">
            <p className="text-xs text-gray-400 leading-relaxed italic text-left">
              <strong className="text-orange-400 font-semibold">Help us grow:</strong> Share your feedback and support . Every bit of support matters!
            </p>
          </div>

          {/* CTA Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Got It, Stay Tuned!
          </button>

        </div>
      </div>
    </div>
  );
}