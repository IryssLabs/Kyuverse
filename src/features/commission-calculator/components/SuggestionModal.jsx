"use client";
import { useState } from "react";
import CustomSelect from "./CustomSelect";

export default function SuggestionModal({ isOpen, onClose }) {
  const [category, setCategory] = useState("");
  const [suggestion, setSuggestion] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | "success" | "error"
  const [errors, setErrors] = useState({});

  const categoryOptions = [
    { value: "add_art_type", label: "Add New Art Type (e.g., Live2D, VTuber, Emotes)" },
    { value: "add_multiplier", label: "Add Pricing Option / Multiplier (e.g., Rush, Background)" },
    { value: "add_commercial", label: "Add Commercial / License Option" },
    { value: "calculator_bug", label: "Report a Bug / Math Error (NaN, Broken UI)" },
    { value: "new_feature", label: "Request New Feature (e.g., PDF Invoice, Save Estimate)" },
    { value: "other", label: "Other Ideas & Feedback" },
  ];

  const clearError = (key) => {
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!category) newErrors.category = "Please select a proposal category.";
    
    if (!suggestion.trim()) {
      newErrors.suggestion = "Proposal details are required.";
    } else if (suggestion.trim().length < 20) {
      newErrors.suggestion = "Please write at least 20 characters so we can understand your idea.";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          suggestion: suggestion.trim(),
        }),
      });
      if (res.ok) {
        setSubmitStatus("success");
        setCategory("");
        setSuggestion("");
        setErrors({});
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const renderFieldError = (key) =>
    errors[key] ? (
      <p role="alert" className="text-[11px] text-red-400 mt-1.5 font-medium pl-1">
        {errors[key]}
      </p>
    ) : null;

  const textareaCls = (hasError) =>
    `w-full bg-[#141418] border rounded-xl p-3 text-white text-sm placeholder-gray-600 focus:outline-none transition-all resize-none ${
      hasError
        ? "border-red-400/60 focus:border-red-400 focus:ring-1 focus:ring-red-400/20"
        : "border-white/15 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
    }`;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#141418] rounded-2xl border border-white/10 p-6 max-w-md w-full shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-1">Feature Request & Bug Report</h2>
        <p className="text-xs text-gray-400 mb-5">Have ideas for new options or found an engine error? Let us know.</p>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Category */}
          <div>
            <CustomSelect
              label="Type of Proposal *"
              value={category}
              onChange={(val) => {
                setCategory(val);
                clearError("category");
              }}
              options={categoryOptions}
            />
            {renderFieldError("category")}
          </div>

          {/* Suggestion Text */}
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                Explain your proposal or bug report <span className="text-red-400">*</span>
              </label>
              <span className={`text-[10px] font-medium ${suggestion.trim().length >= 20 ? "text-emerald-400" : "text-gray-600"}`}>
                {suggestion.trim().length} chars{suggestion.trim().length < 20 ? " (min 20)" : ""}
              </span>
            </div>
            <textarea
              value={suggestion}
              onChange={(e) => {
                setSuggestion(e.target.value);
                clearError("suggestion");
              }}
              placeholder="e.g., Please add a 'Live2D Rigging' art type option... / When clicking custom currency, the output turns into NaN on iOS safari..."
              className={textareaCls(errors.suggestion)}
              rows="4"
            />
            {renderFieldError("suggestion")}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-black text-xs uppercase tracking-widest transition-all disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.2)]"
            >
              {isSubmitting ? "Sending..." : "Submit Proposal"}
            </button>
          </div>

          {/* Global Status Message */}
          {submitStatus === "success" && (
            <div role="status" className="text-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mt-3">
              <p className="text-emerald-400 text-xs font-bold">Proposal sent! Thank you for helping us plan future updates.</p>
            </div>
          )}
          {submitStatus === "error" && (
            <div role="alert" className="text-center p-3 rounded-xl bg-red-500/10 border border-red-500/20 mt-3">
              <p className="text-red-400 text-xs font-bold">Something went wrong. Please try again.</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}