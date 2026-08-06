"use client";
import { useState } from "react";
import CustomSelect from "./CustomSelect";

// Helper function to format live preview currency accurately (No decimals)
const formatPreviewCurrency = (value, currency) => {
  if (!value || isNaN(value)) return "";

  const num = parseFloat(value);

  switch (currency) {
    case "IDR":
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(num);
    case "USD":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(num);
    case "MYR":
      return new Intl.NumberFormat("ms-MY", {
        style: "currency",
        currency: "MYR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(num);
    case "SGD":
      return new Intl.NumberFormat("en-SG", {
        style: "currency",
        currency: "SGD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(num);
    case "PHP":
      return new Intl.NumberFormat("fil-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(num);
    default:
      return num.toLocaleString();
  }
};

export default function FeedbackModal({ isOpen, onClose, finalPrice }) {
  const [rating, setRating] = useState(0);
  const [issueType, setIssueType] = useState("");
  const [artType, setArtType] = useState("");
  const [marketTarget, setMarketTarget] = useState("");
  const [suggestedPrice, setSuggestedPrice] = useState("");
  const [suggestedCurrency, setSuggestedCurrency] = useState("USD");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | "success" | "error"
  const [errors, setErrors] = useState({});

  const issueOptions = [
    { value: "too_low", label: "Too Cheap (Underpriced)" },
    { value: "too_high", label: "Too Expensive (Overpriced)" },
    { value: "multiplier_wrong", label: "Incorrect Multipliers" },
    { value: "hourly_wrong", label: "Inaccurate Hourly Rate" },
    { value: "other_issue", label: "Other Pricing Issues" },
  ];

  const artTypeOptions = [
    { value: "sketch", label: "Sketch / Lineart" },
    { value: "chibi", label: "Chibi / SD" },
    { value: "bust", label: "Bust / Half body" },
    { value: "fullbody", label: "Full body" },
    { value: "illustration", label: "Full illustration" },
    { value: "cosphoto", label: "Cosplay photo edit" },
    { value: "ref", label: "Character ref sheet" },
  ];

  const marketOptions = [
    { value: "id", label: "Local / Indonesia (IDR)" },
    { value: "sea", label: "Southeast Asia (SEA)" },
    { value: "global", label: "Global / International (USD)" },
  ];

  const currencyOptions = [
    { value: "USD", label: "USD ($)" },
    { value: "IDR", label: "IDR (Rp)" },
    { value: "MYR", label: "MYR (RM)" },
    { value: "SGD", label: "SGD (S$)" },
    { value: "PHP", label: "PHP (₱)" },
  ];

  // Inline error handler function
  const clearError = (key) => {
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (rating === 0) newErrors.rating = "Please select a star rating.";
    if (!issueType) newErrors.issueType = "Please select how you view this pricing.";
    if (!artType) newErrors.artType = "Please select the relevant art type.";
    if (!marketTarget) newErrors.marketTarget = "Please select the target region.";
    if (!suggestedPrice.trim()) newErrors.suggestedPrice = "Please enter your suggested price.";

    if (!message.trim()) {
      newErrors.message = "Context reasoning is required.";
    } else if (message.trim().length < 20) {
      newErrors.message = "Please write at least 20 characters.";
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
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          issueType,
          artType,
          marketTarget,
          suggestedPrice: parseFloat(suggestedPrice),
          suggestedCurrency,
          message: message.trim(),
          finalPrice,
        }),
      });
      if (res.ok) {
        setSubmitStatus("success");
        setRating(0);
        setIssueType("");
        setArtType("");
        setMarketTarget("");
        setSuggestedPrice("");
        setSuggestedCurrency("USD");
        setMessage("");
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

  // Shared error render template style from ContactForm
  const renderFieldError = (key) =>
    errors[key] ? (
      <p role="alert" className="text-[11px] text-red-400 mt-1.5 font-medium pl-1">
        {errors[key]}
      </p>
    ) : null;

  const inputCls = (hasError) =>
    `w-full bg-[#141418] border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none transition-all ${hasError
      ? "border-red-400/60 focus:border-red-400 focus:ring-1 focus:ring-red-400/20"
      : "border-white/15 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
    }`;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#141418] rounded-2xl border border-white/10 p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl 
  [&::-webkit-scrollbar]:w-1.5 
  [&::-webkit-scrollbar-track]:bg-white/5 
  [&::-webkit-scrollbar-track]:rounded-full 
  [&::-webkit-scrollbar-thumb]:bg-cyan-500/50 
  [&::-webkit-scrollbar-thumb]:rounded-full 
  [&::-webkit-scrollbar-thumb]:hover:bg-cyan-500/80">
        <h2 className="text-xl font-bold text-white mb-1">Evaluate Price Accuracy</h2>
        <p className="text-xs text-gray-400 mb-5">Help us fine-tune the pricing logic to match real market standards.</p>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Star rating */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2.5">
              How accurate is the total price estimate? <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setRating(star);
                    clearError("rating");
                  }}
                  className={`text-2xl transition-all hover:scale-110 cursor-pointer ${rating >= star ? "text-amber-400" : "text-gray-600"}`}
                >
                  ★
                </button>
              ))}
            </div>
            {renderFieldError("rating")}
          </div>

          {/* Pricing Evaluation */}
          <div>
            <CustomSelect
              label="How do you view this pricing? *"
              value={issueType}
              onChange={(val) => {
                setIssueType(val);
                clearError("issueType");
              }}
              options={issueOptions}
            />
            {renderFieldError("issueType")}
          </div>

          {/* Art Type Selection */}
          <div>
            <CustomSelect
              label="Which art type is inaccurate? *"
              value={artType}
              onChange={(val) => {
                setArtType(val);
                clearError("artType");
              }}
              options={artTypeOptions}
            />
            {renderFieldError("artType")}
          </div>

          {/* Target Market */}
          <div>
            <CustomSelect
              label="Which region is inaccurate? *"
              value={marketTarget}
              onChange={(val) => {
                setMarketTarget(val);
                clearError("marketTarget");
              }}
              options={marketOptions}
            />
            {renderFieldError("marketTarget")}
          </div>

          {/* Specific Price Suggestion with Live Preview */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2.5">
              What should the correct price be? <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-2">
              <div className="w-1/3">
                <CustomSelect
                  value={suggestedCurrency}
                  onChange={setSuggestedCurrency}
                  options={currencyOptions}
                />
              </div>
              <div className="w-2/3">
                <input
                  type="number"
                  value={suggestedPrice}
                  onChange={(e) => {
                    setSuggestedPrice(e.target.value);
                    clearError("suggestedPrice");
                  }}
                  placeholder={suggestedCurrency === "IDR" ? "e.g., 2500000" : "e.g., 150"}
                  className={inputCls(errors.suggestedPrice)}
                />
              </div>
            </div>
            {renderFieldError("suggestedPrice")}

            {suggestedPrice && !errors.suggestedPrice && (
              <div className="mt-1.5 text-xs text-cyan-400 font-medium pl-1 animate-fadeIn">
                Preview: {formatPreviewCurrency(suggestedPrice, suggestedCurrency)}
              </div>
            )}
          </div>

          {/* Breakdown Textarea with Character Count Counter */}
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                Context / Reasoning <span className="text-red-400">*</span>
              </label>
              <span className={`text-[10px] font-medium ${message.trim().length >= 20 ? "text-emerald-400" : "text-gray-600"}`}>
                {message.trim().length} chars{message.trim().length < 20 ? " (min 20)" : ""}
              </span>
            </div>
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                clearError("message");
              }}
              placeholder="e.g., At senior level, fullbody base price should start at this amount because..."
              className={`${inputCls(errors.message)} resize-none`}
              rows="3"
            />
            {renderFieldError("message")}
          </div>

          {/* Submit / Cancel Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              key="cancel-btn"
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              key="submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-black font-black text-xs uppercase tracking-widest transition-all disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            >
              {isSubmitting ? "Sending..." : "Submit Review"}
            </button>
          </div>

          {/* Global Status Message */}
          {submitStatus === "success" && (
            <div role="status" className="text-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mt-3">
              <p className="text-emerald-400 text-xs font-bold">Feedback sent! Thank you for improving the market accuracy.</p>
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